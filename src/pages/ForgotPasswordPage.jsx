import React, { useState } from 'react';
import { KeyRound, Mail, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';

export const ForgotPasswordPage = ({ setActiveTab }) => {
  const [email, setEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // 1 = Request, 2 = Reset Form
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleRequestToken = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to request reset token.');

      setMessage(data.message);
      if (data.resetToken) {
        setResetToken(data.resetToken);
        setStep(2);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: resetToken, newPassword })
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to reset password.');

      setMessage(data.message);
      setTimeout(() => {
        setActiveTab('login');
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{
      maxWidth: '440px',
      margin: '4rem auto',
      padding: '0 1.5rem'
    }}>
      <div className="glass-card" style={{
        padding: '2.5rem 2rem',
        background: '#141414',
        border: '1px solid var(--border-medium)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: 'rgba(245, 158, 11, 0.15)',
            color: '#fbbf24',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem'
          }}>
            <KeyRound size={24} />
          </div>
          <h2 className="font-heading" style={{ fontSize: '1.75rem', fontWeight: 800 }}>Reset Password</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            {step === 1 ? 'Enter your email to receive a single-use reset token.' : 'Enter your reset token and new password.'}
          </p>
        </div>

        {message && (
          <div style={{
            padding: '0.75rem 1rem',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 'var(--radius-sm)',
            color: '#34d399',
            fontSize: '0.85rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <CheckCircle2 size={18} />
            <div>{message}</div>
          </div>
        )}

        {error && (
          <div style={{
            padding: '0.75rem 1rem',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: 'var(--radius-sm)',
            color: '#fca5a5',
            fontSize: '0.85rem',
            marginBottom: '1.25rem'
          }}>
            {error}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleRequestToken}>
            <div className="form-group">
              <label className="form-label">Student Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="email" 
                  placeholder="student@university.edu"
                  className="form-input"
                  style={{ paddingLeft: '2.5rem', width: '100%' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '0.85rem' }} disabled={loading}>
              {loading ? 'Generating Token...' : 'Generate Single-Use Reset Token'} <ArrowRight size={18} />
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <div className="form-group">
              <label className="form-label">Single-Use Reset Token</label>
              <input 
                type="text" 
                className="form-input"
                value={resetToken}
                onChange={(e) => setResetToken(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">New Password</label>
              <input 
                type="password" 
                placeholder="At least 6 characters"
                className="form-input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                minLength={6}
                required
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '0.85rem' }} disabled={loading}>
              {loading ? 'Resetting Password...' : 'Save New Password'} <ArrowRight size={18} />
            </button>
          </form>
        )}

        <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Remembered your password?{' '}
          <button 
            onClick={() => setActiveTab('login')}
            style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', fontWeight: 700, cursor: 'pointer' }}
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};
