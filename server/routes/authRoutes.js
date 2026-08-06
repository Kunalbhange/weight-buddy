import express from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { db } from '../database.js';
import { generateToken, requireAuth } from '../middleware/auth.js';
import { createRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Strict rate limiter for login and password reset
const authLimiter = createRateLimiter({ windowMs: 15 * 60 * 1000, max: 10 });

// 0. Quick Demo Guest Login (Skip Sign In for temporary testing)
router.post('/demo-login', async (req, res) => {
  try {
    const demoEmail = 'guest_student@weightbuddy.app';
    let demoUser = db.findUserByEmail(demoEmail);

    if (!demoUser) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash('demopass123', salt);
      demoUser = {
        id: 'usr_guest_demo_2026',
        email: demoEmail,
        name: 'Guest Student',
        passwordHash,
        isVerified: true,
        createdAt: new Date().toISOString()
      };
      db.addUser(demoUser);

      // Pre-fill demo onboarding
      db.saveOnboarding(demoUser.id, {
        age: 21,
        sex: 'female',
        heightCm: 168,
        weightKg: 64,
        activityLevel: 'light',
        scheduleDensity: 'heavy',
        dietaryRestrictions: ['vegetarian'],
        goal: 'maintain'
      });

      // Add baseline weight log
      db.addWeightLog({
        id: 'log_demo_initial',
        userId: demoUser.id,
        date: new Date().toISOString().split('T')[0],
        weightKg: 64,
        weightLbs: 141.1,
        bmi: 22.7,
        category: 'Normal',
        timestamp: new Date().toISOString()
      });
    }

    const token = generateToken(demoUser);

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.json({
      message: 'Logged in as Demo Guest Student!',
      token,
      user: { id: demoUser.id, email: demoUser.email, name: demoUser.name, isVerified: true }
    });
  } catch (err) {
    console.error('Demo login error:', err);
    return res.status(500).json({ error: 'Failed to initiate guest demo session.' });
  }
});

// 1. Signup
router.post('/signup', async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    const existingUser = db.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const userId = 'usr_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);

    const newUser = {
      id: userId,
      email: email.toLowerCase().trim(),
      name: name.trim(),
      passwordHash,
      isVerified: false,
      createdAt: new Date().toISOString()
    };

    db.addUser(newUser);

    const verificationToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    db.createVerificationToken(userId, verificationToken, expiresAt);

    const token = generateToken(newUser);

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(201).json({
      message: 'Account created successfully!',
      user: { id: newUser.id, email: newUser.email, name: newUser.name, isVerified: newUser.isVerified },
      token,
      verificationToken
    });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ error: 'Internal server error during registration.' });
  }
});

// 2. Email Verification Flow
router.post('/verify-email', (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: 'Verification token is required.' });

  const record = db.findVerificationToken(token);
  if (!record) {
    return res.status(400).json({ error: 'Invalid or expired email verification token.' });
  }

  db.updateUser(record.userId, { isVerified: true });
  db.removeVerificationToken(token);

  return res.json({ message: 'Email verified successfully! Welcome to WeightBuddy.' });
});

// 3. Login
router.post('/login', authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = db.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials. Check your email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials. Check your email or password.' });
    }

    const token = generateToken(user);

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email, name: user.name, isVerified: user.isVerified }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Server error during login authentication.' });
  }
});

// 4. Logout
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'Logged out successfully.' });
});

// 5. Forgot Password Request
router.post('/forgot-password', authLimiter, (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email address is required.' });

  const user = db.findUserByEmail(email);
  if (!user) {
    return res.json({ message: 'If an account exists with this email, a reset token has been generated.' });
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
  db.createResetToken(user.id, resetToken, expiresAt);

  return res.json({
    message: 'Reset token generated successfully.',
    resetToken
  });
});

// 6. Reset Password Confirmation
router.post('/reset-password', authLimiter, async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ error: 'Reset token and new password are required.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    const record = db.findResetToken(token);
    if (!record) {
      return res.status(400).json({ error: 'Invalid, expired, or already-used reset token.' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    db.updateUser(record.userId, { passwordHash });
    db.markResetTokenUsed(token);

    return res.json({ message: 'Password reset successfully! You can now log in with your new password.' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to reset password.' });
  }
});

// 7. Get Current User Profile (`/me`)
router.get('/me', requireAuth, (req, res) => {
  const onboarding = db.getOnboarding(req.user.id);
  return res.json({
    user: {
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
      isVerified: req.user.isVerified,
      createdAt: req.user.createdAt
    },
    onboarding
  });
});

export default router;
