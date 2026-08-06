import React from 'react';
import { ShieldCheck, Heart, Lock } from 'lucide-react';

export const Footer = ({ setActiveTab }) => {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-subtle)',
      background: '#0a0a0a',
      padding: '3rem 1.5rem 2rem',
      marginTop: '4rem',
      color: 'var(--text-muted)',
      fontSize: '0.85rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '2.5rem'
        }}>
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Weight<span style={{ color: 'var(--accent-primary)' }}>Buddy</span>
            </div>
            <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
              The free, student-focused diet and nutrition platform. Built for busy college schedules, budget dorm meals, and effortless weight tracking.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', fontSize: '0.8rem', fontWeight: 600 }}>
              <ShieldCheck size={16} /> 100% In-House & Zero Third-Party Trackers
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Quick Navigation</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><button onClick={() => setActiveTab('landing')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>Home</button></li>
              <li><button onClick={() => setActiveTab('privacy')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>Privacy Policy & Data Security</button></li>
              <li><button onClick={() => setActiveTab('bmi')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>BMI Calculator</button></li>
            </ul>
          </div>

          <div>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Health Notice</div>
            <p style={{ fontSize: '0.8rem', lineHeight: '1.5' }}>
              WeightBuddy is an educational tool for dietary awareness. It does not provide medical diagnosis, treatment, or clinical advice. Consult a healthcare professional or campus wellness center for health concerns.
            </p>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          paddingTop: '1.5rem',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            © {new Date().getFullYear()} WeightBuddy. Original Student Product.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            Built with <Heart size={14} color="var(--accent-primary)" fill="var(--accent-primary)" /> for students everywhere.
          </div>
        </div>
      </div>
    </footer>
  );
};
