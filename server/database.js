import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import { createClient } from '@supabase/supabase-js';

const { Pool } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase PostgreSQL Connection Credentials
const SUPABASE_PROJECT_ID = 'yguremfshazxizbwsmfk';
const SUPABASE_HOST = `db.${SUPABASE_PROJECT_ID}.supabase.co`;
const SUPABASE_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co`;

const DATABASE_URL = process.env.DATABASE_URL || `postgresql://postgres:${process.env.SUPABASE_DB_PASSWORD || 'postgres'}@${SUPABASE_HOST}:5432/postgres`;

// Configure Postgres Connection Pool
let pool = null;
if (process.env.DATABASE_URL || process.env.SUPABASE_DB_PASSWORD) {
  try {
    pool = new Pool({
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });
    console.log('✅ Supabase PostgreSQL Pool initialized.');
  } catch (e) {
    console.warn('⚠️ Supabase Postgres pool fallback:', e.message);
  }
}

// Fallback File Path
const DB_FILE = process.env.VERCEL 
  ? path.join('/tmp', 'weightbuddy_db.json')
  : path.join(__dirname, 'data', 'weightbuddy_db.json');

const MEALS_FILE = path.join(__dirname, 'data', 'studentMeals.json');

const initialData = {
  users: [],
  onboarding: {},
  weightLogs: [],
  mealPlans: {},
  verificationTokens: [],
  resetTokens: [],
  chatHistory: {},
  reminders: {},
};

class UnifiedDatabase {
  constructor() {
    this.ensureDirectory();
    this.data = this.loadData();
    this.initPostgresSchema();
  }

  async initPostgresSchema() {
    if (!pool) return;
    try {
      const client = await pool.connect();
      await client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id VARCHAR(100) PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          name VARCHAR(255) NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          is_verified BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS onboarding (
          user_id VARCHAR(100) PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
          data JSONB NOT NULL,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS weight_logs (
          id VARCHAR(100) PRIMARY KEY,
          user_id VARCHAR(100) REFERENCES users(id) ON DELETE CASCADE,
          date VARCHAR(50) NOT NULL,
          weight_kg NUMERIC NOT NULL,
          bmi NUMERIC,
          waist_cm NUMERIC,
          body_fat_pct NUMERIC,
          category VARCHAR(100),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS meal_plans (
          user_id VARCHAR(100) PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
          plan JSONB NOT NULL,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `);
      client.release();
      console.log('✅ Supabase PostgreSQL Schema verified.');
    } catch (err) {
      console.warn('⚠️ Supabase Postgres Schema initialization notice:', err.message);
    }
  }

  ensureDirectory() {
    const dataDir = path.dirname(DB_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
  }

  loadData() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        return { ...initialData, ...JSON.parse(raw) };
      }
    } catch (err) {
      console.error('Error reading database file:', err);
    }
    this.saveData(initialData);
    return initialData;
  }

  saveData(data = this.data) {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to persist local database backup:', err);
    }
  }

  getMeals() {
    try {
      if (fs.existsSync(MEALS_FILE)) {
        const raw = fs.readFileSync(MEALS_FILE, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (err) {
      console.error('Failed to read studentMeals.json:', err);
    }
    return [];
  }

  findUserByEmail(email) {
    const normalized = email.toLowerCase().trim();
    return this.data.users.find(u => u.email.toLowerCase() === normalized);
  }

  findUserById(id) {
    return this.data.users.find(u => u.id === id);
  }

  addUser(user) {
    this.data.users.push(user);
    this.saveData();

    // Async sync to Supabase Postgres if connected
    if (pool) {
      pool.query(
        'INSERT INTO users (id, email, name, password_hash, is_verified, created_at) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (email) DO UPDATE SET password_hash = $4',
        [user.id, user.email, user.name, user.passwordHash, user.isVerified, user.createdAt]
      ).catch(err => console.warn('Postgres user sync:', err.message));
    }
    return user;
  }

  updateUser(id, updates) {
    const userIndex = this.data.users.findIndex(u => u.id === id);
    if (userIndex !== -1) {
      this.data.users[userIndex] = { ...this.data.users[userIndex], ...updates };
      this.saveData();

      if (pool && updates.passwordHash) {
        pool.query('UPDATE users SET password_hash = $1 WHERE id = $2', [updates.passwordHash, id])
          .catch(err => console.warn('Postgres password update:', err.message));
      }
      return this.data.users[userIndex];
    }
    return null;
  }

  deleteUser(userId) {
    this.data.users = this.data.users.filter(u => u.id !== userId);
    delete this.data.onboarding[userId];
    this.data.weightLogs = this.data.weightLogs.filter(w => w.userId !== userId);
    delete this.data.mealPlans[userId];
    this.saveData();

    if (pool) {
      pool.query('DELETE FROM users WHERE id = $1', [userId])
        .catch(err => console.warn('Postgres user delete:', err.message));
    }
    return true;
  }

  saveOnboarding(userId, onboardingData) {
    this.data.onboarding[userId] = {
      ...onboardingData,
      updatedAt: new Date().toISOString(),
    };
    this.saveData();

    if (pool) {
      pool.query(
        'INSERT INTO onboarding (user_id, data, updated_at) VALUES ($1, $2, NOW()) ON CONFLICT (user_id) DO UPDATE SET data = $2, updated_at = NOW()',
        [userId, JSON.stringify(onboardingData)]
      ).catch(err => console.warn('Postgres onboarding sync:', err.message));
    }
    return this.data.onboarding[userId];
  }

  getOnboarding(userId) {
    return this.data.onboarding[userId] || null;
  }

  addWeightLog(log) {
    this.data.weightLogs.push(log);
    this.data.weightLogs.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    this.saveData();

    if (pool) {
      pool.query(
        'INSERT INTO weight_logs (id, user_id, date, weight_kg, bmi, waist_cm, body_fat_pct, category) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        [log.id, log.userId, log.date, log.weightKg, log.bmi, log.waistCm, log.bodyFatPct, log.category]
      ).catch(err => console.warn('Postgres weight log sync:', err.message));
    }
    return log;
  }

  getWeightLogs(userId) {
    return this.data.weightLogs.filter(w => w.userId === userId);
  }

  saveMealPlan(userId, plan) {
    this.data.mealPlans[userId] = plan;
    this.saveData();

    if (pool) {
      pool.query(
        'INSERT INTO meal_plans (user_id, plan, updated_at) VALUES ($1, $2, NOW()) ON CONFLICT (user_id) DO UPDATE SET plan = $2, updated_at = NOW()',
        [userId, JSON.stringify(plan)]
      ).catch(err => console.warn('Postgres meal plan sync:', err.message));
    }
    return plan;
  }

  getMealPlan(userId) {
    return this.data.mealPlans[userId] || null;
  }

  createVerificationToken(userId, token, expiresAt) {
    this.data.verificationTokens = this.data.verificationTokens.filter(t => t.userId !== userId);
    const entry = { token, userId, expiresAt };
    this.data.verificationTokens.push(entry);
    this.saveData();
    return entry;
  }

  findVerificationToken(token) {
    return this.data.verificationTokens.find(t => t.token === token && new Date(t.expiresAt) > new Date());
  }

  removeVerificationToken(token) {
    this.data.verificationTokens = this.data.verificationTokens.filter(t => t.token !== token);
    this.saveData();
  }

  createResetToken(userId, token, expiresAt) {
    this.data.resetTokens = this.data.resetTokens.filter(t => t.userId !== userId);
    const entry = { token, userId, expiresAt, used: false };
    this.data.resetTokens.push(entry);
    this.saveData();
    return entry;
  }

  findResetToken(token) {
    return this.data.resetTokens.find(t => t.token === token && !t.used && new Date(t.expiresAt) > new Date());
  }

  markResetTokenUsed(token) {
    const entry = this.data.resetTokens.find(t => t.token === token);
    if (entry) {
      entry.used = true;
      this.saveData();
    }
  }

  getChatHistory(userId) {
    return this.data.chatHistory[userId] || [];
  }

  appendChatMessage(userId, role, message) {
    if (!this.data.chatHistory[userId]) {
      this.data.chatHistory[userId] = [];
    }
    const entry = { role, message, timestamp: new Date().toISOString() };
    this.data.chatHistory[userId].push(entry);
    this.saveData();
    return entry;
  }

  getReminders(userId) {
    return this.data.reminders[userId] || { weightLogReminder: true, examDates: [], mealPrepAlerts: true };
  }

  saveReminders(userId, reminders) {
    this.data.reminders[userId] = reminders;
    this.saveData();
    return this.data.reminders[userId];
  }
}

export const db = new UnifiedDatabase();
