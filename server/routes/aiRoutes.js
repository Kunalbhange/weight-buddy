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

// Helper for AI processing
const handleAiMessage = (req, res, userMessage) => {
  if (!userMessage || !userMessage.trim()) {
    return res.status(400).json({ error: 'Message content cannot be empty.' });
  }

  const userId = req.user.id;
  const user = req.user;
  const weightLogs = db.getWeightLogs(userId);
  const onboarding = db.getOnboarding(userId);
  const mealPlan = db.getMealPlan(userId);

  // Save User Message
  db.appendChatMessage(userId, 'user', userMessage.trim());

  // Context bundle for local AI engine
  const context = {
    userName: user.name,
    weightLogs,
    onboarding,
    mealPlan
  };

  // Generate In-House AI Response
  const aiResult = processAiQuery(userMessage, context);

  // Save Assistant Response
  db.appendChatMessage(userId, 'assistant', aiResult.message);

  return res.json({
    userMessage: userMessage.trim(),
    response: aiResult.message,
    reply: aiResult.message,
    requiresMedicalNotice: aiResult.requiresMedicalNotice || false,
    history: db.getChatHistory(userId)
  });
};

// 2. Post Chat Message & Get In-House AI Response (/chat)
router.post('/chat', requireAuth, (req, res) => {
  const { message } = req.body;
  return handleAiMessage(req, res, message);
});

// 3. Post Query (/query alias)
router.post('/query', requireAuth, (req, res) => {
  const { query, message } = req.body;
  return handleAiMessage(req, res, query || message);
});

export default router;
