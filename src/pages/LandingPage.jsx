import React, { useState } from 'react';
import { calculateBmiFlexible, kgToLbs, lbsToKg } from '../utils/bmiCalculator';
import { ArrowRight, ShieldCheck, Clock, DollarSign, Bot, Activity, Check, Play, X } from 'lucide-react';

export const LandingPage = ({ setActiveTab }) => {
  const [showDemoModal, setShowDemoModal] = useState(false);

  // Independent demo unit selections
  const [weightUnit, setWeightUnit] = useState('kg');
  const [heightUnit, setHeightUnit] = useState('cm');

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
        padding: '4.5rem 1rem 3.5rem',
        position: 'relative'
      }}>
        <div className="badge badge-emerald" style={{ marginBottom: '1.25rem' }}>
          <ShieldCheck size={14} /> 100% Free Forever • Zero Ads • No Credit Card
        </div>

        <h1 className="font-heading" style={{
          fontSize: 'clamp(2.3rem, 5.5vw, 3.8rem)',
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
          fontSize: '1.05rem',
          color: 'var(--text-secondary)',
          maxWidth: '680px',
          margin: '0 auto 2.25rem',
          lineHeight: 1.6
        }}>
          Built for busy college students juggling classes, exams, and late nights. Get personalized dorm-friendly diet plans (priced in ₹ INR), track your body metrics, and get instant AI guidance.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={() => setActiveTab('signup')} style={{ padding: '0.9rem 2.2rem', fontSize: '1rem' }}>
            Start Free Plan Now <ArrowRight size={18} />
          </button>
          <button className="btn-secondary" onClick={() => setShowDemoModal(true)} style={{ padding: '0.9rem 2rem', fontSize: '1rem' }}>
            <Play size={16} color="var(--accent-primary)" /> Try Unit Calculator
          </button>
        </div>

        {/* Value Prop Badges */}
        <div style={{
          display: 'flex',
          justify: 'center',
          gap: '2rem',
          marginTop: '3.5rem',
          flexWrap: 'wrap',
          color: 'var(--text-muted)',
          fontSize: '0.88rem'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Check size={16} color="var(--accent-primary)" /> Quick 5-10 Min Grab & Go Meals
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Check size={16} color="var(--accent-primary)" /> Under ₹40 – ₹120 / Meal Budget Tags
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Check size={16} color="var(--accent-primary)" /> In-House Local AI Companion
          </span>
        </div>
      </section>

      {/* CORE FEATURES GRID */}
      <section style={{ marginBottom: '5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="font-heading" style={{ fontSize: '2.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Everything A College Student Needs
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Designed around tight schedules, hostel kitchens, and zero budget.</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          <div className="glass-card glass-card-interactive" style={{ padding: '2rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)', marginBottom: '1.25rem' }}>
              <Clock size={24} />
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Schedule Density Aware</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.6' }}>
              Heavy class day? WeightBuddy prioritizes 5-10 minute grab-and-go meal suggestions like peanut butter oats, egg bhurji wraps, and high-protein shakes.
            </p>
          </div>

          <div className="glass-card glass-card-interactive" style={{ padding: '2rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fbbf24', marginBottom: '1.25rem' }}>
              <DollarSign size={24} />
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Student INR Budget Friendly</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.6' }}>
              No expensive organic meal subscriptions. Every recipe uses accessible, cheap ingredients tagged with cost estimates from ₹40 to ₹120.
            </p>
          </div>

          <div className="glass-card glass-card-interactive" style={{ padding: '2rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)', marginBottom: '1.25rem' }}>
              <Bot size={24} />
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>In-House AI Companion</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.6' }}>
              Ask questions in plain English without shaming or guilt. Self-contained intelligence engine helps you adjust meals, prep for exams, and understand trends.
            </p>
          </div>

          <div className="glass-card glass-card-interactive" style={{ padding: '2rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
              <Activity size={24} />
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Milestone & Trend Tracking</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.6' }}>
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
        <h2 className="font-heading" style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.75rem' }}>
          Ready To Take Control Of Your Student Diet?
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Create your free account in under 60 seconds. No subscription traps, no external trackers.
        </p>
        <button className="btn-primary" onClick={() => setActiveTab('signup')} style={{ padding: '0.9rem 2.2rem', fontSize: '1rem' }}>
          Get Started For Free <ArrowRight size={18} />
        </button>
      </section>

      {/* SEPARATE INTERACTIVE DEMO MODAL */}
      {showDemoModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div className="glass-card animate-fade-in" style={{
            maxWidth: '720px',
            width: '100%',
            padding: '2rem',
            background: '#141414',
            border: '1px solid var(--border-medium)',
            position: 'relative'
          }}>
            <button onClick={() => setShowDemoModal(false)} style={{
              position: 'absolute', top: '1.25rem', right: '1.25rem',
              background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer'
            }}>
              <X size={22} />
            </button>

            <div style={{ marginBottom: '1.5rem' }}>
              <span className="badge badge-zinc" style={{ marginBottom: '0.3rem' }}>Separate Interactive Calculator</span>
              <h3 className="font-heading" style={{ fontSize: '1.4rem', fontWeight: 700 }}>Interactive BMI & Unit Calculator</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div>
                {/* HEIGHT CONTROL */}
                <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <label className="form-label">Height Unit</label>
                    <div className="unit-toggle-group">
                      <button type="button" className={`unit-toggle-btn ${heightUnit === 'cm' ? 'active' : ''}`} onClick={() => setHeightUnit('cm')}>cm</button>
                      <button type="button" className={`unit-toggle-btn ${heightUnit === 'ft_in' ? 'active' : ''}`} onClick={() => setHeightUnit('ft_in')}>ft + in</button>
                    </div>
                  </div>

                  {heightUnit === 'cm' ? (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.2rem' }}>
                        <span>Centimeters</span>
                        <strong>{heightCm} cm</strong>
                      </div>
                      <input type="range" min="130" max="220" value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--accent-primary)' }} />
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                      <input type="number" min="3" max="8" value={heightFeet} onChange={(e) => setHeightFeet(Number(e.target.value))} className="form-input" placeholder="Feet" />
                      <input type="number" min="0" max="11" value={heightInches} onChange={(e) => setHeightInches(Number(e.target.value))} className="form-input" placeholder="Inches" />
                    </div>
                  )}
                </div>

                {/* WEIGHT CONTROL */}
                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <label className="form-label">Weight Unit</label>
                    <div className="unit-toggle-group">
                      <button type="button" className={`unit-toggle-btn ${weightUnit === 'kg' ? 'active' : ''}`} onClick={() => { if (weightUnit === 'lbs') setWeightVal(lbsToKg(weightVal)); setWeightUnit('kg'); }}>kgs</button>
                      <button type="button" className={`unit-toggle-btn ${weightUnit === 'lbs' ? 'active' : ''}`} onClick={() => { if (weightUnit === 'kg') setWeightVal(kgToLbs(weightVal)); setWeightUnit('lbs'); }}>lbs</button>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.2rem' }}>
                    <span>Weight Value</span>
                    <strong>{weightVal} {weightUnit}</strong>
                  </div>
                  <input type="range" min={weightUnit === 'kg' ? "40" : "88"} max={weightUnit === 'kg' ? "160" : "350"} value={weightVal} onChange={(e) => setWeightVal(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--accent-primary)' }} />
                </div>
              </div>

              {/* DEMO RESULT */}
              <div style={{ background: 'rgba(0,0,0,0.6)', borderRadius: 'var(--radius-md)', padding: '1.5rem', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Calculated BMI</div>
                <div className="font-heading" style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-primary)' }}>{metrics.bmi}</div>
                <div className={`badge ${metrics.badgeClass}`}>{metrics.category}</div>
                <div style={{ marginTop: '0.85rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <strong>{metrics.weightKg} kg</strong> / <strong>{metrics.weightLbs} lbs</strong> • <strong>{metrics.heightCm} cm</strong> / <strong>{metrics.heightFtIn}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
