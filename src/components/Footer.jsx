import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Heart } from 'lucide-react';

export const Footer = ({ setActiveTab }) => {
  const { theme } = useAuth();

  return (
    <footer style={{
      borderTop: '1px solid var(--border-subtle)',
      background: 'var(--bg-surface)',
      padding: '3rem 1.5rem 2rem',
      marginTop: '4rem',
      color: 'var(--text-muted)',
      fontSize: '0.85rem'
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2.5rem',
          marginBottom: '2.5rem'
        }}>
          <div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.6rem' }}>
              Weight<span style={{ color: 'var(--accent-gold)' }}>Buddy</span>
            </div>
            <p style={{ lineHeight: '1.7', marginBottom: '1rem', fontSize: '0.84rem' }}>
              Free student-focused nutrition planning. Built for busy college schedules, budget-friendly dorm meals, and simple body tracking.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-gold)', fontSize: '0.78rem', fontWeight: 600 }}>
              <ShieldCheck size={14} /> Zero third-party trackers
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem', fontSize: '0.88rem' }}>Navigation</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {[
                { label: 'Home', tab: 'landing' },
                { label: 'Privacy & Data', tab: 'privacy' },
                { label: 'BMI Calculator', tab: 'bmi' },
                { label: 'Student Portal', tab: 'dashboard' },
              ].map(item => (
                <li key={item.tab}>
                  <button
                    onClick={() => setActiveTab(item.tab)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      fontSize: '0.84rem',
                      fontWeight: 500,
                      padding: '0.15rem 0',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={e => e.target.style.color = 'var(--accent-gold)'}
                    onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem', fontSize: '0.88rem' }}>Disclaimer</div>
            <p style={{ fontSize: '0.8rem', lineHeight: '1.6' }}>
              WeightBuddy is an educational wellness tool. It does not provide medical diagnosis, treatment, or clinical advice. Please consult a healthcare professional for health concerns.
            </p>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.8rem'
        }}>
          <span>© {new Date().getFullYear()} WeightBuddy</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            Made with <Heart size={12} color="var(--accent-gold)" fill="var(--accent-gold)" /> for students
          </span>
        </div>
      </div>
    </footer>
  );
};
