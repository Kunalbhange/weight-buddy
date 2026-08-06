import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { calculateBmiFlexible, kgToLbs, lbsToKg } from '../utils/bmiCalculator';
import { formatCurrency } from '../utils/currency';
import { ArrowRight, ShieldCheck, Clock, DollarSign, Bot, Activity, Check, Scale, Zap } from 'lucide-react';

export const LandingPage = ({ setActiveTab }) => {
  const { currency } = useAuth();

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

  const minPrice = formatCurrency(40, currency);
  const maxPrice = formatCurrency(120, currency);

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1240px', margin: '0 auto', padding: '2.5rem 1.75rem' }}>
      {/* HERO SECTION */}
      <section style={{
        padding: '2.5rem 1rem 3rem',
        position: 'relative'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '3rem',
          alignItems: 'center'
        }}>
          {/* HERO LEFT */}
          <div>
            <div className="badge badge-emerald" style={{ marginBottom: '1.25rem' }}>
              <ShieldCheck size={15} /> 100% Free Student Health & Nutrition Platform
            </div>

            <h1 className="font-heading" style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '1.25rem',
              color: 'var(--text-primary)'
            }}>
              Nail Your College Nutrition <br />
              <span style={{ color: 'var(--accent-emerald-light)' }}>
                Without Breaking Your Budget
              </span>
            </h1>

            <p style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              marginBottom: '2.25rem',
              lineHeight: 1.65
            }}>
              Built for busy college students juggling classes & exams. Get personalized dorm-friendly diet plans (priced from {minPrice} to {maxPrice}), track your metrics over time, and get instant AI guidance.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <button className="btn-primary" onClick={() => setActiveTab('signup')} style={{ padding: '0.9rem 2.2rem', fontSize: '1rem' }}>
                Start Free Plan Now <ArrowRight size={18} />
              </button>
              <button className="btn-secondary" onClick={() => setActiveTab('login')} style={{ padding: '0.9rem 1.8rem', fontSize: '1rem' }}>
                Student Sign In
              </button>
            </div>

            {/* CLASSIC VALUE PROPS */}
            <div style={{
              display: 'flex',
              gap: '1.75rem',
              flexWrap: 'wrap',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: 'var(--text-secondary)'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Check size={16} color="var(--accent-emerald-light)" /> 5-10 Min Hostel Meals
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Check size={16} color="var(--accent-emerald-light)" /> Under {minPrice} – {maxPrice} / Meal
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Check size={16} color="var(--accent-emerald-light)" /> Multi-Language AI Companion
              </span>
            </div>
          </div>

          {/* HERO RIGHT: CLASSIC LIVE BMI CALCULATOR CARD */}
          <div className="glass-card" style={{
            padding: '2rem',
            background: '#14161d',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-md)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.05rem' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34d399' }}>
                  <Scale size={18} />
                </div>
                <span>Live Interactive BMI Engine</span>
              </div>
              <span className="badge badge-emerald">Instant Calculation</span>
            </div>

            {/* HEIGHT INPUT CONTROL */}
            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <label className="form-label">Height Baseline</label>
                <div className="unit-toggle-group">
                  <button type="button" className={`unit-toggle-btn ${heightUnit === 'cm' ? 'active' : ''}`} onClick={() => setHeightUnit('cm')}>cm</button>
                  <button type="button" className={`unit-toggle-btn ${heightUnit === 'ft_in' ? 'active' : ''}`} onClick={() => setHeightUnit('ft_in')}>ft + in</button>
                </div>
              </div>

              {heightUnit === 'cm' ? (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                    <span>Centimeters</span>
                    <strong style={{ color: '#fff', fontSize: '0.95rem' }}>{heightCm} cm</strong>
                  </div>
                  <input type="range" min="130" max="220" value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value))} style={{ width: '100%', accentColor: '#10b981' }} />
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <input type="number" min="3" max="8" value={heightFeet} onChange={(e) => setHeightFeet(Number(e.target.value))} className="form-input" placeholder="Feet" />
                  <input type="number" min="0" max="11" value={heightInches} onChange={(e) => setHeightInches(Number(e.target.value))} className="form-input" placeholder="Inches" />
                </div>
              )}
            </div>

            {/* WEIGHT INPUT CONTROL */}
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <label className="form-label">Weight Baseline</label>
                <div className="unit-toggle-group">
                  <button type="button" className={`unit-toggle-btn ${weightUnit === 'kg' ? 'active' : ''}`} onClick={() => { if (weightUnit === 'lbs') setWeightVal(lbsToKg(weightVal)); setWeightUnit('kg'); }}>kgs</button>
                  <button type="button" className={`unit-toggle-btn ${weightUnit === 'lbs' ? 'active' : ''}`} onClick={() => { if (weightUnit === 'kg') setWeightVal(kgToLbs(weightVal)); setWeightUnit('lbs'); }}>lbs</button>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                <span>Weight Value</span>
                <strong style={{ color: '#fff', fontSize: '0.95rem' }}>{weightVal} {weightUnit}</strong>
              </div>
              <input type="range" min={weightUnit === 'kg' ? "40" : "88"} max={weightUnit === 'kg' ? "160" : "350"} value={weightVal} onChange={(e) => setWeightVal(Number(e.target.value))} style={{ width: '100%', accentColor: '#10b981' }} />
            </div>

            {/* RESULT STAT CARD */}
            <div style={{
              background: '#0c0d10',
              borderRadius: 'var(--radius-sm)',
              padding: '1.25rem',
              border: '1px solid var(--border-medium)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>CALCULATED BMI</div>
                <div className="font-heading" style={{ fontSize: '2.6rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1, marginTop: '0.2rem' }}>
                  {metrics.bmi}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div className={`badge ${metrics.badgeClass}`} style={{ fontSize: '0.8rem', padding: '0.4rem 0.9rem', marginBottom: '0.4rem' }}>
                  {metrics.category}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                  {metrics.weightKg} kg ({metrics.weightLbs} lbs)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURE CARDS GRID */}
      <section style={{ margin: '4.5rem 0 3.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="font-heading" style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Everything A College Student Needs
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Designed around tight schedules, hostel kitchens, and zero budget.</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {/* Feature 1 */}
          <div className="glass-card glass-card-interactive" style={{ padding: '1.75rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34d399', marginBottom: '1.25rem' }}>
              <Clock size={22} />
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Schedule Density Aware</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Heavy class day? WeightBuddy prioritizes 5-10 minute grab-and-go meal suggestions like peanut butter oats, egg bhurji wraps, and high-protein shakes.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="glass-card glass-card-interactive" style={{ padding: '1.75rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fbbf24', marginBottom: '1.25rem' }}>
              <DollarSign size={22} />
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Student Budget Friendly</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              No expensive organic meal subscriptions. Every recipe uses accessible, cheap ingredients tagged with cost estimates from {minPrice} to {maxPrice}.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="glass-card glass-card-interactive" style={{ padding: '1.75rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34d399', marginBottom: '1.25rem' }}>
              <Bot size={22} />
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Multi-Language AI Companion</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Ask questions in English, Hinglish, Hindi, Spanish, or French. Self-contained intelligence helps you adjust meals and understand trends.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="glass-card glass-card-interactive" style={{ padding: '1.75rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
              <Activity size={22} />
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Milestone & Trend Tracking</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Mix and match units (lbs, kgs, cm, ft+in). View smooth SVG trendlines and clear milestone markers celebrating your progress.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CLASSIC CTA BANNER */}
      <section className="glass-card" style={{
        padding: '3.5rem 2.5rem',
        textAlign: 'center',
        background: '#14161d',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-md)'
      }}>
        <h2 className="font-heading" style={{ fontSize: '2.3rem', fontWeight: 800, marginBottom: '0.6rem' }}>
          Ready To Take Control Of Your Student Diet?
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '620px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
          Create your free account in under 60 seconds. No subscription traps, no external trackers.
        </p>
        <button className="btn-primary" onClick={() => setActiveTab('signup')} style={{ padding: '0.95rem 2.5rem', fontSize: '1.02rem' }}>
          Get Started For Free <ArrowRight size={20} />
        </button>
      </section>
    </div>
  );
};
