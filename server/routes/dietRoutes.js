import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from '../database.js';
import { requireAuth } from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mealsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'data', 'studentMeals.json'), 'utf-8')
);

const router = express.Router();

// Calculate TDEE using Mifflin-St Jeor Formula
const calculateTdee = (age, sex, heightCm, weightKg, activityLevel, goal) => {
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
    active: 1.725,
    very_active: 1.9,
  };

  const mult = activityMultipliers[activityLevel] || 1.375;
  const maintenance = Math.round(bmr * mult);

  let targetCalories = maintenance;
  if (goal === 'lose') {
    targetCalories = Math.round(maintenance * 0.80); // 20% deficit
  } else if (goal === 'gain_weight' || goal === 'gain_muscle') {
    targetCalories = Math.round(maintenance * 1.15); // 15% surplus
  }

  // Ensure reasonable minimums
  if (targetCalories < 1200) targetCalories = 1200;

  // Macro split calculation (Protein: 25-30%, Carbs: 45-50%, Fat: 25%)
  let proteinGrams = Math.round((targetCalories * 0.25) / 4);
  if (goal === 'gain_muscle') {
    proteinGrams = Math.round((targetCalories * 0.30) / 4);
  }
  const fatGrams = Math.round((targetCalories * 0.25) / 9);
  const carbGrams = Math.round((targetCalories - (proteinGrams * 4) - (fatGrams * 9)) / 4);

  return {
    maintenance,
    targetCalories,
    macroSplit: {
      protein: proteinGrams,
      carbs: carbGrams,
      fat: fatGrams
    }
  };
};

// Generate Rule-Based Weekly Plan
const generateWeeklyPlan = (onboarding) => {
  const { age, sex, heightCm, weightKg, activityLevel, scheduleDensity, dietaryRestrictions, goal } = onboarding;
  const { targetCalories, macroSplit } = calculateTdee(age, sex, heightCm, weightKg, activityLevel, goal);

  const restrictions = Array.isArray(dietaryRestrictions) ? dietaryRestrictions.map(r => r.toLowerCase()) : [];

  // Filter valid meals based on dietary restrictions
  const filterMeal = (meal) => {
    if (restrictions.includes('none') || restrictions.length === 0) return true;
    
    // If user is vegetarian/vegan, exclude non-veg
    if (restrictions.includes('vegetarian') && !meal.dietaryTags.includes('vegetarian') && !meal.dietaryTags.includes('vegan')) {
      return false;
    }
    if (restrictions.includes('vegan') && !meal.dietaryTags.includes('vegan')) {
      return false;
    }
    if (restrictions.includes('halal') && !meal.dietaryTags.includes('halal')) {
      return false;
    }
    if (restrictions.includes('kosher') && !meal.dietaryTags.includes('kosher')) {
      return false;
    }
    return true;
  };

  const validMeals = mealsData.filter(filterMeal);

  // Separate by type
  const breakfasts = validMeals.filter(m => m.type === 'breakfast');
  const lunches = validMeals.filter(m => m.type === 'lunch');
  const dinners = validMeals.filter(m => m.type === 'dinner');
  const snacks = validMeals.filter(m => m.type === 'snack');

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const days = daysOfWeek.map((dayName, idx) => {
    // Pick meal variants based on index
    const breakfast = breakfasts[idx % breakfasts.length] || mealsData[0];
    const lunch = lunches[idx % lunches.length] || mealsData[4];
    const dinner = dinners[idx % dinners.length] || mealsData[8];
    const snack = snacks[idx % snacks.length] || mealsData[12];

    const dayTotalCalories = breakfast.calories + lunch.calories + dinner.calories + snack.calories;
    const dayTotalProtein = breakfast.protein + lunch.protein + dinner.protein + snack.protein;
    const dayTotalCarbs = breakfast.carbs + lunch.carbs + dinner.carbs + snack.carbs;
    const dayTotalFat = breakfast.fat + lunch.fat + dinner.fat + snack.fat;

    return {
      day: dayName,
      meals: {
        breakfast,
        lunch,
        dinner,
        snack
      },
      totals: {
        calories: dayTotalCalories,
        protein: dayTotalProtein,
        carbs: dayTotalCarbs,
        fat: dayTotalFat
      }
    };
  });

  return {
    generatedAt: new Date().toISOString(),
    dailyCalorieTarget: targetCalories,
    macroSplit,
    scheduleDensity,
    goal,
    days
  };
};

// 1. Get current plan or auto-generate if missing
router.get('/plan', requireAuth, (req, res) => {
  let plan = db.getMealPlan(req.user.id);
  const onboarding = db.getOnboarding(req.user.id);

  if (!onboarding) {
    return res.status(400).json({ error: 'Please complete onboarding questionnaire first.' });
  }

  if (!plan) {
    plan = generateWeeklyPlan(onboarding);
    db.saveMealPlan(req.user.id, plan);
  }

  return res.json({ plan });
});

// 2. Force regenerate meal plan
router.post('/generate', requireAuth, (req, res) => {
  const onboarding = db.getOnboarding(req.user.id);
  if (!onboarding) {
    return res.status(400).json({ error: 'Please complete onboarding questionnaire first.' });
  }

  const plan = generateWeeklyPlan(onboarding);
  db.saveMealPlan(req.user.id, plan);

  return res.json({ message: 'Fresh meal plan generated!', plan });
});

// 3. Swap individual meal
router.post('/swap-meal', requireAuth, (req, res) => {
  const { dayName, mealType } = req.body; // e.g. dayName: 'Monday', mealType: 'lunch'

  if (!dayName || !mealType) {
    return res.status(400).json({ error: 'dayName and mealType are required.' });
  }

  const plan = db.getMealPlan(req.user.id);
  if (!plan) return res.status(400).json({ error: 'No active meal plan found.' });

  const onboarding = db.getOnboarding(req.user.id);
  const restrictions = onboarding && Array.isArray(onboarding.dietaryRestrictions) 
    ? onboarding.dietaryRestrictions.map(r => r.toLowerCase()) 
    : [];

  // Filter candidate replacement meals
  const candidates = mealsData.filter(m => {
    if (m.type !== mealType) return false;
    if (restrictions.includes('vegetarian') && !m.dietaryTags.includes('vegetarian') && !m.dietaryTags.includes('vegan')) return false;
    if (restrictions.includes('vegan') && !m.dietaryTags.includes('vegan')) return false;
    return true;
  });

  if (candidates.length === 0) {
    return res.status(400).json({ error: 'No alternative meal available matching dietary restrictions.' });
  }

  const targetDay = plan.days.find(d => d.day.toLowerCase() === dayName.toLowerCase());
  if (!targetDay) return res.status(400).json({ error: 'Day not found in meal plan.' });

  const currentMealId = targetDay.meals[mealType]?.id;
  const alternateMeals = candidates.filter(m => m.id !== currentMealId);
  const newMeal = alternateMeals.length > 0 
    ? alternateMeals[Math.floor(Math.random() * alternateMeals.length)] 
    : candidates[0];

  targetDay.meals[mealType] = newMeal;

  // Recalculate day totals
  targetDay.totals = {
    calories: targetDay.meals.breakfast.calories + targetDay.meals.lunch.calories + targetDay.meals.dinner.calories + targetDay.meals.snack.calories,
    protein: targetDay.meals.breakfast.protein + targetDay.meals.lunch.protein + targetDay.meals.dinner.protein + targetDay.meals.snack.protein,
    carbs: targetDay.meals.breakfast.carbs + targetDay.meals.lunch.carbs + targetDay.meals.dinner.carbs + targetDay.meals.snack.carbs,
    fat: targetDay.meals.breakfast.fat + targetDay.meals.lunch.fat + targetDay.meals.dinner.fat + targetDay.meals.snack.fat,
  };

  db.saveMealPlan(req.user.id, plan);

  return res.json({
    message: `Swapped ${mealType} for ${dayName} with ${newMeal.name}!`,
    newMeal,
    updatedDay: targetDay,
    plan
  });
});

export default router;
