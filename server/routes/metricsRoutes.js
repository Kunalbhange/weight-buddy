import express from 'express';
import { db } from '../database.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

const calculateMetricsServer = (weightVal, heightVal, unitSystem = 'metric', sex = 'other', waistVal = null) => {
  let weightKg = Number(weightVal);
  let heightCm = Number(heightVal);
  let waistCm = waistVal ? Number(waistVal) : null;

  if (unitSystem === 'imperial') {
    weightKg = Number(weightVal) / 2.20462;
    heightCm = Number(heightVal) * 2.54;
    if (waistVal) waistCm = Number(waistVal) * 2.54;
  }

  const heightM = heightCm / 100;
  const bmi = heightM > 0 ? parseFloat((weightKg / (heightM * heightM)).toFixed(1)) : 22.0;

  let category = 'Normal';
  let categoryColor = '#10b981';
  let badgeClass = 'badge-emerald';
  let explanation = 'Your weight is in a healthy, balanced standard range for your height.';

  if (bmi < 18.5) {
    category = 'Underweight';
    categoryColor = '#f59e0b';
    badgeClass = 'badge-amber';
    explanation = 'Your BMI is below standard recommendation. Focus on nutrient-dense meals and steady energy.';
  } else if (bmi >= 25 && bmi < 29.9) {
    category = 'Overweight';
    categoryColor = '#f59e0b';
    badgeClass = 'badge-amber';
    explanation = 'Your weight is slightly above average for your height. Small consistent diet tweaks yield steady progress.';
  } else if (bmi >= 30) {
    category = 'Obese';
    categoryColor = '#ef4444';
    badgeClass = 'badge-zinc';
    explanation = 'Your BMI is elevated. Prioritize gradual, balanced nutrition without drastic calorie skipping.';
  }

  let bodyFatPct = null;
  if (waistCm && heightCm) {
    if (sex === 'male') {
      bodyFatPct = parseFloat((64 - (20 * (heightCm / waistCm))).toFixed(1));
    } else {
      bodyFatPct = parseFloat((76 - (20 * (heightCm / waistCm))).toFixed(1));
    }
    if (bodyFatPct < 5) bodyFatPct = 5;
    if (bodyFatPct > 50) bodyFatPct = 50;
  }

  const weightLbs = parseFloat((weightKg * 2.20462).toFixed(1));
  const heightInches = parseFloat((heightCm / 2.54).toFixed(1));

  return {
    bmi,
    category,
    categoryColor,
    badgeClass,
    explanation,
    weightKg: parseFloat(weightKg.toFixed(1)),
    weightLbs,
    heightCm: parseFloat(heightCm.toFixed(1)),
    heightInches,
    waistCm: waistCm ? parseFloat(waistCm.toFixed(1)) : null,
    waistInches: waistCm ? parseFloat((waistCm / 2.54).toFixed(1)) : null,
    bodyFatPct,
    disclaimer: 'Note: BMI and estimated body fat percentages are basic statistical guides for general awareness and are not medical advice.'
  };
};

// 1. Get Log History
router.get('/logs', requireAuth, (req, res) => {
  const logs = db.getWeightLogs(req.user.id);
  const onboarding = db.getOnboarding(req.user.id);

  let latestMetric = null;
  if (logs.length > 0) {
    const lastLog = logs[logs.length - 1];
    const height = onboarding ? onboarding.heightCm : 170;
    const sex = onboarding ? onboarding.sex : 'other';
    const computed = calculateMetricsServer(lastLog.weightKg, height, 'metric', sex, lastLog.waistCm);
    latestMetric = { ...lastLog, ...computed };
  }

  let milestone = null;
  if (logs.length >= 2) {
    const initial = logs[0].weightKg;
    const current = logs[logs.length - 1].weightKg;
    const diffKg = parseFloat((current - initial).toFixed(1));
    const diffLbs = parseFloat((diffKg * 2.20462).toFixed(1));
    if (diffKg < 0) {
      milestone = `Down ${Math.abs(diffKg)} kg (${Math.abs(diffLbs)} lbs) since starting! 🎉`;
    } else if (diffKg > 0) {
      milestone = `Gained ${diffKg} kg (${diffLbs} lbs) towards target! 💪`;
    } else {
      milestone = `Weight is steady and consistent. Great stability! ⚖️`;
    }
  }

  return res.json({ logs, latestMetric, milestone });
});

// 2. Add Weight Log Entry (Accepts unitSystem: 'metric' | 'imperial')
router.post('/log', requireAuth, (req, res) => {
  const { weightVal, waistVal, unitSystem, date } = req.body;

  if (!weightVal || isNaN(weightVal) || Number(weightVal) <= 0) {
    return res.status(400).json({ error: 'Please enter a valid weight.' });
  }

  const onboarding = db.getOnboarding(req.user.id);
  const heightCm = onboarding ? onboarding.heightCm : 170;
  const sex = onboarding ? onboarding.sex : 'other';

  const metrics = calculateMetricsServer(
    Number(weightVal), 
    heightCm, 
    unitSystem || 'metric', 
    sex, 
    waistVal ? Number(waistVal) : null
  );

  const logEntry = {
    id: 'log_' + Date.now(),
    userId: req.user.id,
    date: date || new Date().toISOString().split('T')[0],
    weightKg: metrics.weightKg,
    weightLbs: metrics.weightLbs,
    waistCm: metrics.waistCm,
    waistInches: metrics.waistInches,
    bmi: metrics.bmi,
    bodyFatPct: metrics.bodyFatPct,
    category: metrics.category,
    timestamp: new Date().toISOString()
  };

  db.addWeightLog(logEntry);

  return res.status(201).json({
    message: 'Weight logged successfully!',
    log: logEntry,
    metrics
  });
});

export default router;
