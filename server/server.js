import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import metricsRoutes from './routes/metricsRoutes.js';
import dietRoutes from './routes/dietRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import automationRoutes from './routes/automationRoutes.js';
import privacyRoutes from './routes/privacyRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// Basic Middlewares
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple Cookie Parser middleware
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

// API Routes Binding
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/metrics', metricsRoutes);
app.use('/api/diet', dietRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/automations', automationRoutes);
app.use('/api/privacy', privacyRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', name: 'WeightBuddy API Server', time: new Date().toISOString() });
});

// Serve frontend static build if in production
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) {
      res.send('WeightBuddy API Server running.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 WeightBuddy Server running on http://localhost:${PORT}`);
});
