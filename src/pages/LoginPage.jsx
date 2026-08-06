import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogIn, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Play, Sparkles, Utensils, Dumbbell } from 'lucide-react';

export const LoginPage = ({ setActiveTab }) => {
  const { login, demoLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      setActiveTab('dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoBypass = async () => {
    setDemoLoading(true);
    setError(null);
    try {
      await demoLogin();
      setActiveTab('dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{
      maxWidth: '1100px',
      margin: '2.5rem auto',
      padding: '0 1.5rem'
    }}>
      {/* SPLIT LAYOUT: LOGIN FORM ON LEFT + NUTRITION POSTERS GALLERY ON RIGHT */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '2.5rem',
        alignItems: 'start'
      }}>
        {/* LEFT COLUMN: LOGIN & INSTANT DEMO BYPASS */}
        <div className="glass-card" style={{
          padding: '2.25rem 2rem',
          background: '#141414',
          border: '1px solid var(--border-medium)'
        }}>
          {/* INSTANT DEMO BYPASS BANNER */}
          <div style={{
            padding: '1rem',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(10, 10, 10, 0.9) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '1.75rem',
            textAlign: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', color: 'var(--accent-primary)', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
              <Sparkles size={16} /> TEMPORARY DEMO ACCESS
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', lineHeight: '1.4' }}>
              Want to skip signing in? Test all features instantly with one click.
            </p>
            <button 
              className="btn-demo" 
              onClick={handleDemoBypass}
              disabled={demoLoading}
              style={{ width: '100%', padding: '0.65rem', fontSize: '0.85rem' }}
            >
              <Play size={16} />
              {demoLoading ? 'Launching Demo Session...' : 'Instant Demo Login (Skip Sign In)'}
            </button>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 0.75rem'
            }}>
              <LogIn size={20} />
            </div>
            <h2 className="font-heading" style={{ fontSize: '1.5rem', fontWeight: 800 }}>Student Account Sign In</h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              Enter your registered student email and password below.
            </p>
          </div>

          {error && (
            <div style={{
              padding: '0.75rem 1rem',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: 'var(--radius-sm)',
              color: '#fca5a5',
              fontSize: '0.82rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.5rem'
            }}>
              <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="email" 
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
                  style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', fontSize: '0.75rem', cursor: 'pointer' }}
                >
                  Forgot Password?
                </button>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
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

            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.75rem', padding: '0.75rem' }} disabled={loading}>
              {loading ? 'Authenticating...' : 'Sign In'} <ArrowRight size={16} />
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Don't have an account yet?{' '}
            <button 
              onClick={() => setActiveTab('signup')}
              style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', fontWeight: 700, cursor: 'pointer' }}
            >
              Create Free Account
            </button>
          </div>

          <div style={{
            marginTop: '1.75rem',
            paddingTop: '0.85rem',
            borderTop: '1px solid var(--border-subtle)',
            textAlign: 'center',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem'
          }}>
            <ShieldCheck size={14} color="var(--accent-primary)" /> Protected by bcrypt password hashing & rate-limiting.
          </div>
        </div>

        {/* RIGHT COLUMN: FRONT PAGE NUTRITION & FITNESS POSTERS SHOWCASE */}
        <div>
          <div style={{ marginBottom: '1rem' }}>
            <div className="badge badge-emerald" style={{ marginBottom: '0.3rem' }}>
              <Utensils size={12} /> Student Health Gallery
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.35rem', fontWeight: 800 }}>
              Smart Student Nutrition Posters
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Built for campus life: dorm nutrition guides & high-energy fitness motivation.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Poster 1: Nutrition Infographic Poster */}
            <div className="glass-card" style={{ overflow: 'hidden', border: '1px solid var(--border-medium)' }}>
              <img 
                src="/images/nutrition_poster.jpg" 
                alt="Smart Student Nutrition Infographic" 
                style={{ width: '100%', height: '260px', objectFit: 'cover' }} 
              />
              <div style={{ padding: '0.85rem 1rem', background: 'rgba(0,0,0,0.6)' }}>
                <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--accent-primary)' }}>SMART STUDENT NUTRITION</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Avocados, oats, berries & eggs for sustained brain fuel and energy.</div>
              </div>
            </div>

            {/* Poster 2: Gym & Athletics Poster */}
            <div className="glass-card" style={{ overflow: 'hidden', border: '1px solid var(--border-medium)' }}>
              <img 
                src="/images/poster1.jpg" 
                alt="Discipline Over Excuses" 
                style={{ width: '100%', height: '180px', objectFit: 'cover' }} 
              />
              <div style={{ padding: '0.85rem 1rem', background: 'rgba(0,0,0,0.6)' }}>
                <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#fff' }}>DISCIPLINE OVER EXCUSES</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>High-protein dorm meals fuel your physical & academic gains.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
