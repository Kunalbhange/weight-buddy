import React from 'react';
import { ShieldCheck, Lock, EyeOff, FileText, Trash2, HeartHandshake } from 'lucide-react';

export const PrivacyPage = () => {
  return (
    <div className="animate-fade-in" style={{ maxWidth: '840px', margin: '2rem auto', padding: '0 1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>
          <ShieldCheck size={14} /> Zero Data Selling Guarantee
        </div>
        <h1 className="font-heading" style={{ fontSize: '2.5rem', fontWeight: 800 }}>Privacy Policy & Student Data Charter</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '0.4rem' }}>
          Transparent, plain-language explanations of how your health data is stored and protected.
        </p>
      </div>

      <div className="glass-card" style={{ padding: '2.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-medium)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h3 className="font-heading" style={{ fontSize: '1.25rem', color: 'var(--accent-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Lock size={20} /> 1. What We Collect & Why
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              WeightBuddy only collects the absolute minimum information necessary to generate your meal plans and track your BMI metrics over time:
            </p>
            <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.5rem', lineHeight: '1.6' }}>
              <li><strong>Account Credentials:</strong> Email address and salted bcrypt password hash.</li>
              <li><strong>Body Metrics:</strong> Height, weight logs, age, sex, activity level, and optional waist measurement.</li>
              <li><strong>Student Preferences:</strong> Class schedule density (heavy/moderate/light), dietary restrictions (vegetarian/vegan/halal/kosher), and core weight goals.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading" style={{ fontSize: '1.25rem', color: 'var(--accent-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <EyeOff size={20} /> 2. Zero Third-Party Analytics or Trackers
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              We do not embed third-party analytics pixels, advertising scripts, or data brokers. All AI intelligence, calculations, and chart visualizations run in-house. Your health and diet logs are never sold or rented to insurance providers or ad networks.
            </p>
          </div>

          <div>
            <h3 className="font-heading" style={{ fontSize: '1.25rem', color: 'var(--accent-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={20} /> 3. Right to Access & Data Export
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              You own your data. At any time, you can visit your <strong>Settings</strong> page and download a complete JSON file export containing every log, meal plan, and chat message stored under your account.
            </p>
          </div>

          <div>
            <h3 className="font-heading" style={{ fontSize: '1.25rem', color: 'var(--accent-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Trash2 size={20} /> 4. Right to be Forgotten (Full Account Deletion)
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              If you decide to stop using WeightBuddy, clicking "Delete Account" immediately executes a cascading delete in our database. All records tied to your account are permanently erased.
            </p>
          </div>

          <div>
            <h3 className="font-heading" style={{ fontSize: '1.25rem', color: 'var(--accent-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <HeartHandshake size={20} /> 5. Non-Clinical Tone & Age Appropriateness
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              For students under 18 or those navigating university stress, WeightBuddy maintains a non-shaming, supportive tone. We strictly avoid extreme caloric restriction advice, body shaming language, or clinical diagnostics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
