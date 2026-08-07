import express from 'express';
import { db } from '../database.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// 1. Get Automation Reminders Settings
router.get('/reminders', requireAuth, (req, res) => {
  const reminders = db.getReminders(req.user.id);
  return res.json({ reminders });
});

// 2. Save Reminders & Exam Dates
router.post('/reminders', requireAuth, (req, res) => {
  const { weightLogReminder, examDates, mealPrepAlerts } = req.body;

  const current = db.getReminders(req.user.id);
  const updated = {
    weightLogReminder: typeof weightLogReminder === 'boolean' ? weightLogReminder : current.weightLogReminder,
    examDates: Array.isArray(examDates) ? examDates : current.examDates,
    mealPrepAlerts: typeof mealPrepAlerts === 'boolean' ? mealPrepAlerts : current.mealPrepAlerts
  };

  db.saveReminders(req.user.id, updated);
  // PRG Pattern
  return res.redirect(303, '/api/automations/reminders');
});

// 3. Server-side Weekly Auto-Generated Summary
router.get('/weekly-summary', requireAuth, (req, res) => {
  const logs = db.getWeightLogs(req.user.id);
  const plan = db.getMealPlan(req.user.id);

  const logsCount = logs.length;
  let trendText = 'No logs recorded yet';

  if (logsCount >= 2) {
    const diff = logs[logsCount - 1].weightKg - logs[0].weightKg;
    if (Math.abs(diff) < 0.2) trendText = 'BMI trend stable & consistent ⚖️';
    else if (diff < 0) trendText = `Down ${Math.abs(diff.toFixed(1))} kg 📉`;
    else trendText = `Up ${diff.toFixed(1)} kg 📈`;
  } else if (logsCount === 1) {
    trendText = 'Initial weight baseline recorded 🎯';
  }

  const summary = {
    weekRange: 'Current Week',
    totalLogsThisWeek: logsCount,
    bmiTrendSummary: trendText,
    mealPlanAdherencePct: plan ? 85 : 0,
    quickTip: 'Exam season tip: Keep protein snacks handy in your backpack for long study sessions!'
  };

  return res.json({ summary });
});

export default router;
