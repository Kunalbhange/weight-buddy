import express from 'express';
import { db } from '../database.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Save or update onboarding answers
router.post('/onboarding', requireAuth, (req, res) => {
  const { age, sex, heightCm, weightKg, activityLevel, scheduleDensity, dietaryRestrictions, goal } = req.body;

  if (!age || !sex || !heightCm || !weightKg || !activityLevel || !scheduleDensity || !goal) {
    return res.status(400).json({ error: 'Please complete all required onboarding fields.' });
  }

  const onboardingData = {
    age: Number(age),
    sex, // 'male' | 'female' | 'other'
    heightCm: Number(heightCm),
    weightKg: Number(weightKg),
    activityLevel, // 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
    scheduleDensity, // 'light' | 'moderate' | 'heavy'
    dietaryRestrictions: Array.isArray(dietaryRestrictions) ? dietaryRestrictions : [], // ['vegetarian', 'vegan', 'none', etc.]
    goal, // 'lose' | 'maintain' | 'gain_weight' | 'gain_muscle'
  };

  const saved = db.saveOnboarding(req.user.id, onboardingData);

  // Also log the initial weight into weightLogs if no weight log exists yet
  const existingLogs = db.getWeightLogs(req.user.id);
  if (existingLogs.length === 0) {
    const heightM = Number(heightCm) / 100;
    const bmi = parseFloat((Number(weightKg) / (heightM * heightM)).toFixed(1));
    let category = 'Normal';
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi >= 25 && bmi < 30) category = 'Overweight';
    else if (bmi >= 30) category = 'Obese';

    db.addWeightLog({
      id: 'log_' + Date.now(),
      userId: req.user.id,
      date: new Date().toISOString().split('T')[0],
      weightKg: Number(weightKg),
      bmi,
      category,
      timestamp: new Date().toISOString()
    });
  }

  return res.json({ message: 'Onboarding completed successfully!', onboarding: saved });
});

// Update Profile
router.put('/profile', requireAuth, (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name cannot be empty.' });

  const updated = db.updateUser(req.user.id, { name: name.trim() });
  return res.json({ message: 'Profile updated successfully.', user: { id: updated.id, name: updated.name, email: updated.email } });
});

export default router;
