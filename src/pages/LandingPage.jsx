import React, { useState } from 'react';
import { calculateBmiFlexible, kgToLbs, lbsToKg, cmToFeetInches, feetInchesToCm } from '../utils/bmiCalculator';
import { ArrowRight, ShieldCheck, Clock, DollarSign, Bot, Activity, Check } from 'lucide-react';

export const LandingPage = ({ setActiveTab }) => {
  // Independent unit selections!
  const [weightUnit, setWeightUnit] = useState('kg'); // 'kg' | 'lbs'
  const [heightUnit, setHeightUnit] = useState('cm'); // 'cm' | 'ft_in'

  // Input states
  const [heightCm, setHeightCm] = useState(175);
  const [heightFeet, setHeightFeet] = useState(5);
  const [heightInches, setHeightInches] = useState(9);
  const [weightVal, setWeightVal] = useState(70);

  const metrics = calculateBmiFlexible({
    weightVal,
    weightUnit,
    heightVal: heightCm,
    heightUnit,
    heightFeet,
    heightInchesVal: heightInches,
    sex: 'other'
  });

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* HERO SECTION */}
      <section style={{
        textAlign: 'center',
        padding: '4rem 1rem 3rem',
        position: 'relative'
      }}>
        <div className="badge badge-emerald" style={{ marginBottom: '1.25rem' }}>
          <ShieldCheck size={14} /> 100% Free Forever • Zero Ads • No Credit Card
        </div>

        <h1 className="font-heading" style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.2rem)',
          fontWeight: 800,
          lineHeight: 1.1,
          marginBottom: '1.25rem',
          maxWidth: '900px',
          margin: '0 auto 1.25rem'
        }}>
          Nail Your College Nutrition <br />
          <span style={{
            background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Without Breaking Your Budget
          </span>
        </h1>

        <p style={{
          fontSize: '1.1rem',
          color: 'var(--text-secondary)',
          maxWidth: '680px',
          margin: '0 auto 2rem',
          lineHeight: 1.6
        }}>
          Built for busy college students juggling classes, exams, and late nights. Get personalized dorm-friendly diet plans, track your body metrics over time, and get instant AI guidance.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={() => setActiveTab('signup')} style={{ padding: '0.9rem 2.2rem', fontSize: '1.05rem' }}>
            Start Free Plan Now <ArrowRight size={18} />
          </button>
          <button className="btn-secondary" onClick={() => setActiveTab('login')} style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}>
            Sign In To Account
          </button>
        </div>

        {/* Value Prop Badges */}
        <div style={{
          display: 'flex',
          justify: 'center',
          gap: '2rem',
          marginTop: '3rem',
          flexWrap: 'wrap',
          color: 'var(--text-muted)',
          fontSize: '0.9rem'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Check size={16} color="var(--accent-primary)" /> Quick 5-10 Min Grab & Go Meals
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Check size={16} color="var(--accent-primary)" /> Under $2.50 / Meal Budget Tags
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Check size={16} color="var(--accent-primary)" /> In-House Local AI Companion
          </span>
        </div>
      </section>

      {/* DEMO BMI CALCULATOR WITH INDEPENDENT HEIGHT & WEIGHT UNITS */}
      <section style={{ marginTop: '2rem', marginBottom: '5rem' }}>
        <div className="glass-card" style={{
          maxWidth: '860px',
          margin: '0 auto',
          padding: '2.5rem',
          background: 'linear-gradient(180deg, rgba(24, 24, 27, 0.8) 0%, rgba(10, 10, 10, 0.95) 100%)',
          border: '1px solid var(--border-medium)',
          boxShadow: 'var(--shadow-card)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div className="badge badge-zinc" style={{ marginBottom: '0.4rem' }}>Interactive Demo</div>
            <h2 className="font-heading" style={{ fontSize: '1.8rem', fontWeight: 700 }}>Instant BMI Calculator</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
              Mix and match units freely: <strong>lbs + cm</strong>, <strong>ft/in + kg</strong>, or any combination!
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'center' }}>
            <div>
              {/* HEIGHT CONTROL WITH INDEPENDENT TOGGLE */}
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <label className="form-label">Height Unit</label>
                  <div className="unit-toggle-group">
                    <button
                      type="button"
                      className={`unit-toggle-btn ${heightUnit === 'cm' ? 'active' : ''}`}
                      onClick={() => setHeightUnit('cm')}
                    >
                      cm
                    </button>
                    <button
                      type="button"
                      className={`unit-toggle-btn ${heightUnit === 'ft_in' ? 'active' : ''}`}
                      onClick={() => setHeightUnit('ft_in')}
                    >
                      ft + in
                    </button>
                  </div>
                </div>

                {heightUnit === 'cm' ? (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                      <span>Centimeters</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{heightCm} cm</strong>
                    </div>
                    <input 
                      type="range" min="130" max="220" value={heightCm} 
                      onChange={(e) => setHeightCm(Number(e.target.value))}
                      style={{ width: '100%', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
                    />
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label className="form-label" style={{ fontSize: '0.8rem' }}>Feet (ft)</label>
                      <input 
                        type="number" min="3" max="8" value={heightFeet} 
                        onChange={(e) => setHeightFeet(Number(e.target.value))} 
                        className="form-input" 
                      />
                    </div>
                    <div>
                      <label className="form-label" style={{ fontSize: '0.8rem' }}>Inches (in)</label>
                      <input 
                        type="number" min="0" max="11" value={heightInches} 
                        onChange={(e) => setHeightInches(Number(e.target.value))} 
                        className="form-input" 
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* WEIGHT CONTROL WITH INDEPENDENT TOGGLE */}
              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <label className="form-label">Weight Unit</label>
                  <div className="unit-toggle-group">
                    <button
                      type="button"
                      className={`unit-toggle-btn ${weightUnit === 'kg' ? 'active' : ''}`}
                      onClick={() => {
                        if (weightUnit === 'lbs') setWeightVal(lbsToKg(weightVal));
                        setWeightUnit('kg');
                      }}
                    >
                      kgs
                    </button>
                    <button
                      type="button"
                      className={`unit-toggle-btn ${weightUnit === 'lbs' ? 'active' : ''}`}
                      onClick={() => {
                        if (weightUnit === 'kg') setWeightVal(kgToLbs(weightVal));
                        setWeightUnit('lbs');
                      }}
                    >
                      lbs
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                  <span>Weight Value</span>
                  <strong style={{ color: 'var(--text-primary)' }}>{weightVal} {weightUnit}</strong>
                </div>
                <input 
                  type="range" 
                  min={weightUnit === 'kg' ? "40" : "88"} 
                  max={weightUnit === 'kg' ? "160" : "350"} 
                  value={weightVal} 
                  onChange={(e) => setWeightVal(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
                />
              </div>
            </div>

            {/* RESULTS CARD WITH BOTH CONVERSIONS */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.6)',
              borderRadius: 'var(--radius-md)',
              padding: '1.75rem',
              border: '1px solid var(--border-subtle)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Calculated BMI</div>
              <div className="font-heading" style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.2rem 0' }}>
                {metrics.bmi}
              </div>
              <div className={`badge ${metrics.badgeClass}`} style={{ fontSize: '0.85rem', padding: '0.4rem 1rem' }}>
                {metrics.category}
              </div>

              {/* Conversions display */}
              <div style={{
                marginTop: '1.25rem',
                padding: '0.85rem',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.85rem',
                display: 'flex',
                justify: 'space-around'
              }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>WEIGHT</div>
                  <strong>{metrics.weightKg} kg</strong> / <strong>{metrics.weightLbs} lbs</strong>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>HEIGHT</div>
                  <strong>{metrics.heightCm} cm</strong> / <strong>{metrics.heightFtIn}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES GRID */}
      <section style={{ marginBottom: '5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="font-heading" style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Everything A College Student Needs
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>Designed around tight schedules, dorm kitchens, and zero budget.</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}>
          <div className="glass-card glass-card-interactive" style={{ padding: '2rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)', marginBottom: '1.25rem' }}>
              <Clock size={24} />
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Schedule Density Aware</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Heavy class day? WeightBuddy prioritizes 5-10 minute grab-and-go meal suggestions like peanut butter oats, egg wraps, and high-protein shakes.
            </p>
          </div>

          <div className="glass-card glass-card-interactive" style={{ padding: '2rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fbbf24', marginBottom: '1.25rem' }}>
              <DollarSign size={24} />
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Student Budget Friendly</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              No expensive organic meal subscriptions. Every recipe uses accessible, cheap ingredients tagged with cost estimates under $2.50.
            </p>
          </div>

          <div className="glass-card glass-card-interactive" style={{ padding: '2rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)', marginBottom: '1.25rem' }}>
              <Bot size={24} />
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>In-House AI Companion</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Ask questions in plain English without shaming or guilt. Self-contained intelligence engine helps you adjust meals, prep for exams, and understand trends.
            </p>
          </div>

          <div className="glass-card glass-card-interactive" style={{ padding: '2rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
              <Activity size={24} />
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Milestone & Trend Tracking</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Mix and match units (lbs, kgs, cm, ft+in). View smooth SVG trendlines and clear milestone markers celebrating your progress.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA BANNER */}
      <section className="glass-card" style={{
        padding: '3.5rem 2rem',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(20, 20, 20, 0.95) 100%)',
        border: '1px solid rgba(16, 185, 129, 0.3)'
      }}>
        <h2 className="font-heading" style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '0.75rem' }}>
          Ready To Take Control Of Your Student Diet?
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Create your free account in under 60 seconds. No subscription traps, no external trackers.
        </p>
        <button className="btn-primary" onClick={() => setActiveTab('signup')} style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
          Get Started For Free <ArrowRight size={20} />
        </button>
      </section>
    </div>
  );
};
