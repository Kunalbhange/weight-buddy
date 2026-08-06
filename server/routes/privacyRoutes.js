import express from 'express';
import { db } from '../database.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// 1. Full Data Export (Right to Access)
router.get('/export-data', requireAuth, (req, res) => {
  const userId = req.user.id;

  const exportPayload = {
    exportDate: new Date().toISOString(),
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      createdAt: req.user.createdAt
    },
    onboarding: db.getOnboarding(userId),
    weightLogs: db.getWeightLogs(userId),
    mealPlan: db.getMealPlan(userId),
    reminders: db.getReminders(userId),
    chatHistory: db.getChatHistory(userId),
    privacyNotice: 'WeightBuddy does not track or sell your data. All records are exported directly from our self-contained database.'
  };

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', `attachment; filename="weightbuddy_data_export_${userId}.json"`);
  return res.send(JSON.stringify(exportPayload, null, 2));
});

// 2. Full Account Deletion (Right to be Forgotten)
router.delete('/delete-account', requireAuth, (req, res) => {
  const userId = req.user.id;

  db.deleteUser(userId);
  res.clearCookie('token');

  return res.json({ message: 'Your WeightBuddy account and all associated data have been permanently deleted.' });
});

export default router;
