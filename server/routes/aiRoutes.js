import express from 'express';
import { db } from '../database.js';
import { requireAuth } from '../middleware/auth.js';
import { processAiQuery } from '../../src/utils/aiEngine.js';

const router = express.Router();

// 1. Get Chat History
router.get('/history', requireAuth, (req, res) => {
  const history = db.getChatHistory(req.user.id);
  return res.json({ history });
});

// 2. Post Chat Message & Get In-House AI Response
router.post('/chat', requireAuth, (req, res) => {
  const { message } = req.body;
  if (!message || !message.trim()) {
    return res.status(400).json({ error: 'Message content cannot be empty.' });
  }

  const userId = req.user.id;
  const user = req.user;
  const weightLogs = db.getWeightLogs(userId);
  const onboarding = db.getOnboarding(userId);
  const mealPlan = db.getMealPlan(userId);

  // Save User Message
  db.appendChatMessage(userId, 'user', message.trim());

  // Context bundle for local AI engine
  const context = {
    userName: user.name,
    weightLogs,
    onboarding,
    mealPlan
  };

  // Generate In-House AI Response
  const aiResult = processAiQuery(message, context);

  // Save Assistant Response
  db.appendChatMessage(userId, 'assistant', aiResult.message);

  return res.json({
    userMessage: message,
    reply: aiResult.message,
    history: db.getChatHistory(userId)
  });
});

export default router;
