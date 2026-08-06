import express from 'express';
import { db } from '../database.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Calculate standard BMI & body fat estimate formula
const calculateMetrics = (weightKg, heightCm, sex, waistCm) => {
  const heightM = heightCm / 100;
  const bmi = parseFloat((weightKg / (heightM * heightM)).toFixed(1));

  let category = 'Normal';
  let categoryColor = '#10b981';
  let explanation = 'Your weight is in a balanced, healthy standard range for your height.';

  if (bmi < 18.5) {
    category = 'Underweight';
    categoryColor = '#f59e0b';
    explanation = 'Your BMI is below the standard recommendation. Focus on nutrient-dense meals and mild muscle building.';
  } else if (bmi >= 25 && bmi < 29.9) {
    category = 'Overweight';
    categoryColor = '#f59e0b';
    explanation = 'Your weight is slightly above average for your height. Small consistent diet tweaks will bring steady progress.';
  } else if (bmi >= 30) {
    category = 'Obese';
    categoryColor = '#ef4444';
    explanation = 'Your BMI is elevated. Prioritize gradual, balanced nutrition without drastic calorie skipping.';
  }

  // Simple formula-based body fat estimation (not clinical)
  let bodyFatPct = null;
  if (waistCm && heightCm) {
    if (sex === 'male') {
      bodyFatPct = parseFloat((64 - (20 * (heightCm / waistCm))).toFixed(1));
    } else {
      bodyFatPct = parseFloat((76 - (20 * (heightCm / waistCm))).toFixed(1));
    }
    if (bodyFatPct < 3) bodyFatPct = 5;
    if (bodyFatPct > 55) bodyFatPct = 50;
  }

  return {
    bmi,
    category,
    categoryColor,
    explanation,
    bodyFatPct,
    disclaimer: 'Note: BMI and estimated body fat percentages are basic statistical guides for general awareness and are not medical advice or clinical diagnostics.'
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
    const computed = calculateMetrics(lastLog.weightKg, height, sex, lastLog.waistCm);
    latestMetric = { ...lastLog, ...computed };
  }

  // Calculate milestones (e.g. initial vs current)
  let milestone = null;
  if (logs.length >= 2) {
    const initial = logs[0].weightKg;
    const current = logs[logs.length - 1].weightKg;
    const diff = parseFloat((current - initial).toFixed(1));
    if (diff < 0) {
      milestone = `Down ${Math.abs(diff)} kg since starting WeightBuddy! 🎉`;
    } else if (diff > 0) {
      milestone = `Gained ${diff} kg towards your target goal! 💪`;
    } else {
      milestone = `Weight is steady and consistent. Great stability! ⚖️`;
    }
  }

  return res.json({ logs, latestMetric, milestone });
});

// 2. Add Weight Log Entry
router.post('/log', requireAuth, (req, res) => {
  const { weightKg, waistCm, date } = req.body;

  if (!weightKg || isNaN(weightKg) || Number(weightKg) <= 0) {
    return res.status(400).json({ error: 'Please enter a valid weight in kg.' });
  }

  const onboarding = db.getOnboarding(req.user.id);
  const heightCm = onboarding ? onboarding.heightCm : 170;
  const sex = onboarding ? onboarding.sex : 'other';

  const metrics = calculateMetrics(Number(weightKg), heightCm, sex, waistCm ? Number(waistCm) : null);

  const logEntry = {
    id: 'log_' + Date.now(),
    userId: req.user.id,
    date: date || new Date().toISOString().split('T')[0],
    weightKg: Number(weightKg),
    waistCm: waistCm ? Number(waistCm) : null,
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
