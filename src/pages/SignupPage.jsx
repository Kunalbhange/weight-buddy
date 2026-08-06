import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Mail, Lock, User, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const SignupPage = ({ setActiveTab }) => {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [verificationNotice, setVerificationNotice] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await signup(name.trim(), email.trim(), password);
      setVerificationNotice(result.verificationToken);
      // Redirect to onboarding questionnaire
      setTimeout(() => {
        setActiveTab('onboarding');
      }, 1200);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{
      maxWidth: '460px',
      margin: '3.5rem auto',
      padding: '0 1.5rem'
    }}>
      <div className="glass-card" style={{
        padding: '2.5rem 2rem',
        background: '#141414',
        border: '1.5px solid var(--border-medium)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: 'rgba(255, 255, 255, 0.1)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            margin: '0 auto 1rem'
          }}>
            <UserPlus size={24} color="#ffffff" />
          </div>
          <h2 className="font-heading" style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff' }}>Create Account</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Join WeightBuddy for free. No credit card required.
          </p>
        </div>

        {error && (
          <div style={{
            padding: '0.75rem 1rem',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1.5px solid rgba(239, 68, 68, 0.35)',
            borderRadius: 'var(--radius-sm)',
            color: '#ffffff',
            fontSize: '0.85rem',
            marginBottom: '1.25rem'
          }}>
            {error}
          </div>
        )}

        {verificationNotice && (
          <div style={{
            padding: '1rem',
            background: 'rgba(217, 119, 6, 0.15)',
            border: '1.5px solid rgba(217, 119, 6, 0.35)',
            borderRadius: 'var(--radius-sm)',
            color: '#fbbf24',
            fontSize: '0.85rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem'
          }}>
            <CheckCircle2 size={20} color="#fbbf24" />
            <div>
              <strong>Account Created!</strong> Self-hosted email verification token generated. Redirecting to onboarding questionnaire...
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div style={{ position: 'relative' }}>
              <User size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text" 
                placeholder="Alex Morgan"
                className="form-input"
                style={{ paddingLeft: '2.5rem', width: '100%' }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Student Email / Username</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text" 
                placeholder="student@university.edu"
                className="form-input"
                style={{ paddingLeft: '2.5rem', width: '100%' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="password" 
                placeholder="At least 6 characters"
                className="form-input"
                style={{ paddingLeft: '2.5rem', width: '100%' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Passwords are salted & hashed with bcrypt.</span>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '0.85rem' }} disabled={loading}>
            {loading ? 'Creating Account...' : 'Continue to Onboarding'} <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Already registered?{' '}
          <button 
            onClick={() => setActiveTab('login')}
            style={{ background: 'none', border: 'none', color: '#d97706', fontWeight: 800, cursor: 'pointer' }}
          >
            Sign In
          </button>
        </div>

        <div style={{
          marginTop: '1.5rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--border-subtle)',
          textAlign: 'center',
          fontSize: '0.75rem',
          color: 'var(--text-muted)'
        }}>
          100% Free Forever • Zero Data Selling • In-House Privacy
        </div>
      </div>
    </div>
  );
};
