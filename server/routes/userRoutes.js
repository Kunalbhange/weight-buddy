import express from 'express';
import { db } from '../database.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Save or update onboarding answers
router.post('/onboarding', requireAuth, (req, res) => {
  const { age, sex, heightCm, weightKg, activityLevel, scheduleDensity, dietaryRestrictions, goal } = req.body;

  const parsedAge = Number(age) || 21;
  const parsedSex = sex || 'male';
  const parsedHeightCm = Number(heightCm) || 172;
  const parsedWeightKg = Number(weightKg) || 68;
  const parsedActivityLevel = activityLevel || 'moderate';
  const parsedScheduleDensity = scheduleDensity || 'moderate';
  const parsedGoal = goal || 'gain_muscle';

  const onboardingData = {
    age: parsedAge,
    sex: parsedSex,
    heightCm: parsedHeightCm,
    weightKg: parsedWeightKg,
    activityLevel: parsedActivityLevel,
    scheduleDensity: parsedScheduleDensity,
    dietaryRestrictions: Array.isArray(dietaryRestrictions) ? dietaryRestrictions : ['vegetarian'],
    goal: parsedGoal,
  };

  const saved = db.saveOnboarding(req.user.id, onboardingData);

  // Also log the initial weight into weightLogs if no weight log exists yet
  const existingLogs = db.getWeightLogs(req.user.id);
  if (existingLogs.length === 0) {
    const heightM = parsedHeightCm / 100;
    const bmi = parseFloat((parsedWeightKg / (heightM * heightM)).toFixed(1));
    let category = 'Normal';
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi >= 25 && bmi < 30) category = 'Overweight';
    else if (bmi >= 30) category = 'Obese';

    db.addWeightLog({
      id: 'log_' + Date.now(),
      userId: req.user.id,
      date: new Date().toISOString().split('T')[0],
      weightKg: parsedWeightKg,
      bmi,
      category,
      timestamp: new Date().toISOString()
    });
  }

  // PRG Pattern: Redirect to GET /me
  return res.redirect(303, '/api/auth/me');
});

// Update Profile
router.put('/profile', requireAuth, (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name cannot be empty.' });

  const updated = db.updateUser(req.user.id, { name: name.trim() });
  // PRG Pattern
  return res.redirect(303, '/api/auth/me');
});

export default router;
