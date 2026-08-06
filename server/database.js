import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_FILE = path.join(__dirname, 'data', 'weightbuddy_db.json');

// Default Database Structure
const initialData = {
  users: [],             // { id, email, name, passwordHash, isVerified, createdAt }
  onboarding: {},        // { userId: { age, sex, heightCm, weightKg, activityLevel, scheduleDensity, dietaryRestrictions, goal, updatedAt } }
  weightLogs: [],        // [ { id, userId, date, weightKg, bmi, waistCm, bodyFatPct, category, timestamp } ]
  mealPlans: {},         // { userId: { generatedAt, dailyCalorieTarget, macroSplit, days: [...] } }
  verificationTokens: [],// [ { token, userId, expiresAt } ]
  resetTokens: [],       // [ { token, userId, expiresAt, used } ]
  chatHistory: {},       // { userId: [ { role: 'user'|'assistant', message, timestamp } ] }
  reminders: {},         // { userId: { weightLogReminder: bool, examDates: [], mealPrepAlerts: bool } }
};

class JSONDatabase {
  constructor() {
    this.ensureDirectory();
    this.data = this.loadData();
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
      console.error('Error reading database file, resetting to initial standard:', err);
    }
    this.saveData(initialData);
    return initialData;
  }

  saveData(data = this.data) {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to persist database to file:', err);
    }
  }

  // User queries
  findUserByEmail(email) {
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserById(id) {
    return this.data.users.find(u => u.id === id);
  }

  addUser(user) {
    this.data.users.push(user);
    this.saveData();
    return user;
  }

  updateUser(id, updates) {
    const userIndex = this.data.users.findIndex(u => u.id === id);
    if (userIndex !== -1) {
      this.data.users[userIndex] = { ...this.data.users[userIndex], ...updates };
      this.saveData();
      return this.data.users[userIndex];
    }
    return null;
  }

  deleteUser(userId) {
    this.data.users = this.data.users.filter(u => u.id !== userId);
    delete this.data.onboarding[userId];
    this.data.weightLogs = this.data.weightLogs.filter(w => w.userId !== userId);
    delete this.data.mealPlans[userId];
    this.data.verificationTokens = this.data.verificationTokens.filter(t => t.userId !== userId);
    this.data.resetTokens = this.data.resetTokens.filter(t => t.userId !== userId);
    delete this.data.chatHistory[userId];
    delete this.data.reminders[userId];
    this.saveData();
    return true;
  }

  // Onboarding queries
  saveOnboarding(userId, onboardingData) {
    this.data.onboarding[userId] = {
      ...onboardingData,
      updatedAt: new Date().toISOString(),
    };
    this.saveData();
    return this.data.onboarding[userId];
  }

  getOnboarding(userId) {
    return this.data.onboarding[userId] || null;
  }

  // Weight Log queries
  addWeightLog(log) {
    this.data.weightLogs.push(log);
    // Keep sorted by timestamp ascending
    this.data.weightLogs.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    this.saveData();
    return log;
  }

  getWeightLogs(userId) {
    return this.data.weightLogs.filter(w => w.userId === userId);
  }

  // Meal plan queries
  saveMealPlan(userId, plan) {
    this.data.mealPlans[userId] = plan;
    this.saveData();
    return plan;
  }

  getMealPlan(userId) {
    return this.data.mealPlans[userId] || null;
  }

  // Token queries
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

  // AI Chat queries
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

  // Reminders & Automations
  getReminders(userId) {
    return this.data.reminders[userId] || { weightLogReminder: true, examDates: [], mealPrepAlerts: true };
  }

  saveReminders(userId, reminders) {
    this.data.reminders[userId] = reminders;
    this.saveData();
    return this.data.reminders[userId];
  }
}

export const db = new JSONDatabase();
