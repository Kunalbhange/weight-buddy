import express from 'express';
import { db } from '../database.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Helper to filter meals based on user dietary preference (Veg / Non-Veg / Vegan)
const filterMealsByDiet = (meals, userDiet = []) => {
  if (!userDiet || userDiet.length === 0) return meals;

  const isVegan = userDiet.includes('vegan');
  const isVeg = userDiet.includes('vegetarian') || userDiet.includes('veg');
  const isNonVeg = userDiet.includes('non-veg') || userDiet.includes('non_veg') || userDiet.includes('nonvegetarian');

  return meals.filter(m => {
    if (isVegan) {
      return m.dietaryCategory === 'vegan' || m.dietaryTags?.includes('vegan');
    }
    if (isVeg && !isNonVeg) {
      return m.dietaryCategory === 'vegetarian' || m.dietaryCategory === 'vegan' || m.dietaryTags?.includes('vegetarian') || m.dietaryTags?.includes('vegan');
    }
    if (isNonVeg) {
      // Non-veg users eat everything (non-veg, veg, vegan)
      return true;
    }
    return true;
  });
};

// Mifflin-St Jeor Formula implementation for TDEE & Target Calorie calculation
const calculateTargets = (onboarding) => {
  const { weightKg = 70, heightCm = 175, age = 22, sex = 'male', activityLevel = 'moderate', goal = 'maintain' } = onboarding || {};

  let bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age);
  if (sex === 'male') {
    bmr += 5;
  } else {
    bmr -= 161;
  }

  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725
  };

  const mult = activityMultipliers[activityLevel] || 1.375;
  const tdee = Math.round(bmr * mult);

  let targetCalories = tdee;
  if (goal === 'lose') targetCalories -= 400; // ~20% deficit
  if (goal === 'gain_weight' || goal === 'gain_muscle') targetCalories += 350; // Surplus

  targetCalories = Math.max(1400, Math.min(3500, targetCalories));

  // Macro splits
  const proteinGrams = Math.round((targetCalories * 0.25) / 4);
  const carbsGrams = Math.round((targetCalories * 0.50) / 4);
  const fatGrams = Math.round((targetCalories * 0.25) / 9);

  return {
    tdee,
    targetCalories,
    macroSplit: { protein: proteinGrams, carbs: carbsGrams, fat: fatGrams }
  };
};

// Generate full 7-day meal plan
const generateWeeklyPlan = (onboarding, allMeals) => {
  const { targetCalories, macroSplit } = calculateTargets(onboarding);
  const filteredMeals = filterMealsByDiet(allMeals, onboarding?.dietaryRestrictions || []);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const getMealsForType = (type) => {
    const pool = filteredMeals.filter(m => m.type === type);
    return pool.length > 0 ? pool : allMeals.filter(m => m.type === type);
  };

  const bPool = getMealsForType('breakfast');
  const lPool = getMealsForType('lunch');
  const dPool = getMealsForType('dinner');
  const sPool = getMealsForType('snack');

  const weeklyDays = days.map((day, idx) => {
    const b = bPool[idx % bPool.length];
    const l = lPool[idx % lPool.length];
    const d = dPool[idx % dPool.length];
    const s = sPool[idx % sPool.length];

    const dayCalories = b.calories + l.calories + d.calories + s.calories;
    const dayProtein = b.protein + l.protein + d.protein + s.protein;
    const dayCarbs = b.carbs + l.carbs + d.carbs + s.carbs;
    const dayFat = b.fat + l.fat + d.fat + s.fat;

    return {
      day,
      meals: { breakfast: b, lunch: l, dinner: d, snack: s },
      totals: { calories: dayCalories, protein: dayProtein, carbs: dayCarbs, fat: dayFat }
    };
  });

  return {
    dailyCalorieTarget: targetCalories,
    macroSplit,
    days: weeklyDays,
    generatedAt: new Date().toISOString()
  };
};

// 1. Get Current Meal Plan
router.get('/plan', requireAuth, (req, res) => {
  let plan = db.getMealPlan(req.user.id);
  const onboarding = db.getOnboarding(req.user.id);
  const allMeals = db.getMeals();

  if (!plan) {
    plan = generateWeeklyPlan(onboarding, allMeals);
    db.saveMealPlan(req.user.id, plan);
  }

  return res.json({ plan, onboarding });
});

// 2. Force Regenerate Full Week
router.post('/generate', requireAuth, (req, res) => {
  const onboarding = db.getOnboarding(req.user.id);
  const allMeals = db.getMeals();

  const plan = generateWeeklyPlan(onboarding, allMeals);
  db.saveMealPlan(req.user.id, plan);

  return res.json({ message: 'New diet plan generated!', plan });
});

// 3. Swap a Single Meal
router.post('/swap-meal', requireAuth, (req, res) => {
  const { dayName, mealType, newMealId } = req.body;
  if (!dayName || !mealType || !newMealId) {
    return res.status(400).json({ error: 'dayName, mealType, and newMealId are required.' });
  }

  const plan = db.getMealPlan(req.user.id);
  if (!plan) return res.status(404).json({ error: 'Meal plan not found. Generate a plan first.' });

  const allMeals = db.getMeals();
  const replacement = allMeals.find(m => m.id === newMealId);
  if (!replacement) return res.status(404).json({ error: 'Target replacement meal not found.' });

  const dayObj = plan.days.find(d => d.day.toLowerCase() === dayName.toLowerCase());
  if (!dayObj) return res.status(400).json({ error: 'Invalid day specified.' });

  dayObj.meals[mealType] = replacement;

  // Recalculate day totals
  const { breakfast, lunch, dinner, snack } = dayObj.meals;
  dayObj.totals = {
    calories: breakfast.calories + lunch.calories + dinner.calories + snack.calories,
    protein: breakfast.protein + lunch.protein + dinner.protein + snack.protein,
    carbs: breakfast.carbs + lunch.carbs + dinner.carbs + snack.carbs,
    fat: breakfast.fat + lunch.fat + dinner.fat + snack.fat
  };

  db.saveMealPlan(req.user.id, plan);
  return res.json({ message: 'Meal swapped successfully!', plan });
});

// 4. Get Available Alternative Swaps for a meal type
router.get('/swaps', requireAuth, (req, res) => {
  const { type } = req.query;
  const onboarding = db.getOnboarding(req.user.id);
  const allMeals = db.getMeals();

  let matches = allMeals.filter(m => m.type === type);
  matches = filterMealsByDiet(matches, onboarding?.dietaryRestrictions || []);

  return res.json({ meals: matches });
});

export default router;
