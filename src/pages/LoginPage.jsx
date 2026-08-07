import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogIn, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Utensils, Dumbbell, Sparkles } from 'lucide-react';

export const LoginPage = ({ setActiveTab }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email.trim(), password);
      setActiveTab('dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{
      maxWidth: '1100px',
      margin: '2.5rem auto',
      padding: '0 1.5rem'
    }}>
      {/* SPLIT LAYOUT: SECURE AUTH LOGIN FORM ON LEFT + AI NUTRITION & FITNESS POSTERS GALLERY ON RIGHT */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '2.5rem',
        alignItems: 'start'
      }}>
        {/* LEFT COLUMN: SECURE AUTHENTICATION LOGIN FORM */}
        <div className="glass-card" style={{
          padding: '2.25rem 2rem',
          background: '#ffffff',
          border: '1.5px solid #cbd5e1',
          boxShadow: 'var(--shadow-float)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: '#0f172a',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              margin: '0 auto 0.75rem',
              boxShadow: '0 6px 16px rgba(15,23,42,0.2)'
            }}>
              <LogIn size={22} color="#ffffff" />
            </div>
            <h2 className="font-heading" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>Student Account Sign In</h2>
            <p style={{ fontSize: '0.85rem', color: '#475569', marginTop: '0.2rem', fontWeight: 600 }}>
              Enter your registered student credentials to access your portal.
            </p>
          </div>

          {error && (
            <div style={{
              padding: '0.75rem 1rem',
              background: '#fef2f2',
              border: '1.5px solid #fecaca',
              borderRadius: 'var(--radius-sm)',
              color: '#dc2626',
              fontSize: '0.85rem',
              fontWeight: 700,
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.5rem'
            }}>
              <AlertCircle size={16} color="#dc2626" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label">Email Address / Student ID</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="text" 
                  placeholder="student@university.edu"
                  className="form-input"
                  style={{ paddingLeft: '2.4rem', width: '100%' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">Password</label>
                <button 
                  type="button" 
                  onClick={() => setActiveTab('forgot-password')}
                  style={{ background: 'none', border: 'none', color: '#d97706', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer' }}
                >
                  Forgot Password?
                </button>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="form-input"
                  style={{ paddingLeft: '2.4rem', width: '100%' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.75rem', padding: '0.8rem' }} disabled={loading}>
              {loading ? 'Authenticating...' : 'Sign In'} <ArrowRight size={16} />
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: '#334155', fontWeight: 600 }}>
            Don't have an account yet?{' '}
            <button 
              onClick={() => setActiveTab('signup')}
              style={{ background: 'none', border: 'none', color: '#d97706', fontWeight: 800, cursor: 'pointer' }}
            >
              Create Free Account
            </button>
          </div>

          <div style={{
            marginTop: '1.75rem',
            paddingTop: '0.85rem',
            borderTop: '1px solid #e2e8f0',
            textAlign: 'center',
            fontSize: '0.78rem',
            color: '#64748b',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            gap: '0.4rem'
          }}>
            <ShieldCheck size={14} color="#d97706" /> Encrypted with bcrypt password hashing & rate-limiting protection.
          </div>
        </div>

        {/* RIGHT COLUMN: AI NUTRITION & FITNESS POSTERS GALLERY */}
        <div>
          <div style={{ marginBottom: '1rem' }}>
            <div className="badge badge-amber" style={{ marginBottom: '0.3rem' }}>
              <Utensils size={12} color="#b45309" /> Student AI Nutrition Posters
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a' }}>
              Campus Nutrition & Fitness Showcase
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 600 }}>
              Self-contained AI posters for hostel meal fuel & athletic motivation.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* AI Nutrition Poster */}
            <div className="glass-card" style={{ overflow: 'hidden', border: '1.5px solid #cbd5e1' }}>
              <img 
                src="/images/nutrition_poster.jpg" 
                alt="Smart Student Nutrition Infographic" 
                style={{ width: '100%', height: '260px', objectFit: 'cover' }} 
              />
              <div style={{ padding: '0.85rem 1rem', background: '#0f172a' }}>
                <div style={{ fontWeight: 900, fontSize: '0.9rem', color: '#fbbf24' }}>SMART STUDENT NUTRITION</div>
                <div style={{ fontSize: '0.8rem', color: '#e2e8f0', fontWeight: 500 }}>Avocados, oats, berries & eggs for sustained brain fuel and energy.</div>
              </div>
            </div>

            {/* AI Gym Motivation Posters Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="glass-card" style={{ overflow: 'hidden', border: '1.5px solid #cbd5e1' }}>
                <img 
                  src="/images/poster1.jpg" 
                  alt="Discipline Over Excuses" 
                  style={{ width: '100%', height: '140px', objectFit: 'cover' }} 
                />
                <div style={{ padding: '0.6rem', textAlign: 'center', background: '#0f172a' }}>
                  <div style={{ fontWeight: 900, fontSize: '0.78rem', color: '#ffffff' }}>DISCIPLINE OVER EXCUSES</div>
                </div>
              </div>

              <div className="glass-card" style={{ overflow: 'hidden', border: '1.5px solid #cbd5e1' }}>
                <img 
                  src="/images/poster2.jpg" 
                  alt="Fuel Your Ambition" 
                  style={{ width: '100%', height: '140px', objectFit: 'cover' }} 
                />
                <div style={{ padding: '0.6rem', textAlign: 'center', background: '#0f172a' }}>
                  <div style={{ fontWeight: 900, fontSize: '0.78rem', color: '#fbbf24' }}>FUEL YOUR AMBITION</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
