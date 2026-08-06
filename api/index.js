import express from 'express';
import cors from 'cors';
import authRoutes from '../server/routes/authRoutes.js';
import userRoutes from '../server/routes/userRoutes.js';
import metricsRoutes from '../server/routes/metricsRoutes.js';
import dietRoutes from '../server/routes/dietRoutes.js';
import aiRoutes from '../server/routes/aiRoutes.js';
import automationRoutes from '../server/routes/automationRoutes.js';
import privacyRoutes from '../server/routes/privacyRoutes.js';

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use((req, res, next) => {
  req.cookies = {};
  const cookieHeader = req.headers.cookie;
  if (cookieHeader) {
    cookieHeader.split(';').forEach(cookie => {
      const parts = cookie.split('=');
      if (parts.length >= 2) {
        req.cookies[parts[0].trim()] = decodeURIComponent(parts.slice(1).join('=').trim());
      }
    });
  }
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/metrics', metricsRoutes);
app.use('/api/diet', dietRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/automations', automationRoutes);
app.use('/api/privacy', privacyRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', name: 'WeightBuddy Serverless API', time: new Date().toISOString() });
});

export default app;
