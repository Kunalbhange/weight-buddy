import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { calculateBmiFlexible, kgToLbs, lbsToKg } from '../utils/bmiCalculator';
import { formatCurrency } from '../utils/currency';
import { ArrowRight, ShieldCheck, Clock, DollarSign, Bot, Activity, Check, Scale, Zap, Sparkles, Flame, Shield } from 'lucide-react';

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
            <div className="badge badge-purple" style={{ marginBottom: '1.25rem' }}>
              <Sparkles size={14} color="#a78bfa" /> Free Gen Z Student Fitness Platform
            </div>

            <h1 className="font-heading" style={{
              fontSize: 'clamp(2.5rem, 5.2vw, 4rem)',
              fontWeight: 900,
              lineHeight: 1.12,
              marginBottom: '1.25rem',
              color: '#ffffff'
            }}>
              Nail Your College Nutrition <br />
              <span style={{
                background: 'linear-gradient(135deg, #a78bfa 0%, #22d3ee 50%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Without Breaking Your Budget
              </span>
            </h1>

            <p style={{
              fontSize: '1.08rem',
              color: 'var(--text-secondary)',
              marginBottom: '2.25rem',
              lineHeight: 1.65
            }}>
              Built for modern campus life. Get personalized 5-10 min grab & go diet plans (priced from {minPrice} to {maxPrice}), track your metrics over time, and ask our multi-language AI anything.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <button className="btn-glass-primary" onClick={() => setActiveTab('signup')} style={{ padding: '0.95rem 2.4rem', fontSize: '1.02rem' }}>
                Start Free Plan Now <ArrowRight size={18} />
              </button>
              <button className="btn-secondary" onClick={() => setActiveTab('login')} style={{ padding: '0.95rem 2rem', fontSize: '1.02rem' }}>
                Student Sign In
              </button>
            </div>

            {/* VALUE PROPS */}
            <div style={{
              display: 'flex',
              gap: '1.75rem',
              flexWrap: 'wrap',
              fontSize: '0.9rem',
              fontWeight: 700,
              color: 'var(--text-secondary)'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#a78bfa' }}>
                <Check size={16} color="#a78bfa" /> 5-10 Min Hostel Meals
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#22d3ee' }}>
                <Check size={16} color="#22d3ee" /> Under {minPrice} – {maxPrice} / Meal
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#c4b5fd' }}>
                <Check size={16} color="#c4b5fd" /> Multi-Language AI Companion
              </span>
            </div>
          </div>

          {/* HERO RIGHT: SMART LIVE BMI CALCULATOR CARD */}
          <div className="glass-card" style={{
            padding: '2.25rem',
            background: 'rgba(18, 19, 28, 0.85)',
            border: '1.5px solid rgba(139, 92, 246, 0.35)',
            borderRadius: 'var(--radius-lg)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 800, fontSize: '1.1rem', color: '#ffffff' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a78bfa' }}>
                  <Scale size={20} />
                </div>
                <span>Live Interactive BMI Engine</span>
              </div>
              <span className="badge badge-purple">Real-Time</span>
            </div>

            {/* HEIGHT INPUT CONTROL */}
            <div className="form-group" style={{ marginBottom: '1.35rem' }}>
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
                    <strong style={{ color: '#fff', fontSize: '1rem' }}>{heightCm} cm</strong>
                  </div>
                  <input type="range" min="130" max="220" value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value))} style={{ width: '100%', accentColor: '#8b5cf6' }} />
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <input type="number" min="3" max="8" value={heightFeet} onChange={(e) => setHeightFeet(Number(e.target.value))} className="form-input" placeholder="Feet" />
                  <input type="number" min="0" max="11" value={heightInches} onChange={(e) => setHeightInches(Number(e.target.value))} className="form-input" placeholder="Inches" />
                </div>
              )}
            </div>

            {/* WEIGHT INPUT CONTROL */}
            <div className="form-group" style={{ marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <label className="form-label">Weight Baseline</label>
                <div className="unit-toggle-group">
                  <button type="button" className={`unit-toggle-btn ${weightUnit === 'kg' ? 'active' : ''}`} onClick={() => { if (weightUnit === 'lbs') setWeightVal(lbsToKg(weightVal)); setWeightUnit('kg'); }}>kgs</button>
                  <button type="button" className={`unit-toggle-btn ${weightUnit === 'lbs' ? 'active' : ''}`} onClick={() => { if (weightUnit === 'kg') setWeightVal(kgToLbs(weightVal)); setWeightUnit('lbs'); }}>lbs</button>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                <span>Weight Value</span>
                <strong style={{ color: '#fff', fontSize: '1rem' }}>{weightVal} {weightUnit}</strong>
              </div>
              <input type="range" min={weightUnit === 'kg' ? "40" : "88"} max={weightUnit === 'kg' ? "160" : "350"} value={weightVal} onChange={(e) => setWeightVal(Number(e.target.value))} style={{ width: '100%', accentColor: '#8b5cf6' }} />
            </div>

            {/* RESULT STAT CARD */}
            <div style={{
              background: 'rgba(8, 8, 12, 0.9)',
              borderRadius: 'var(--radius-md)',
              padding: '1.35rem',
              border: '1.5px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 800 }}>CALCULATED BMI</div>
                <div className="font-heading" style={{ fontSize: '2.8rem', fontWeight: 900, color: '#ffffff', lineHeight: 1, marginTop: '0.2rem' }}>
                  {metrics.bmi}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div className={`badge ${metrics.badgeClass}`} style={{ fontSize: '0.82rem', padding: '0.45rem 1rem', marginBottom: '0.4rem' }}>
                  {metrics.category}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
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
          <div className="badge badge-purple" style={{ marginBottom: '0.5rem' }}>
            <Zap size={12} color="#a78bfa" /> Student Essential Features
          </div>
          <h2 className="font-heading" style={{ fontSize: '2.4rem', fontWeight: 900, color: '#ffffff' }}>
            Built For Modern Campus Life
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '0.2rem' }}>
            Designed around tight class schedules, hostel kitchens, and zero budget.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {/* Feature 1 */}
          <div className="glass-card glass-card-interactive" style={{ padding: '1.75rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'rgba(139, 92, 246, 0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a78bfa', marginBottom: '1.25rem' }}>
              <Clock size={22} />
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#ffffff' }}>Schedule Density Aware</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Heavy class day? WeightBuddy prioritizes 5-10 minute grab-and-go meal suggestions like peanut butter oats, egg bhurji wraps, and high-protein shakes.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="glass-card glass-card-interactive" style={{ padding: '1.75rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'rgba(6, 182, 212, 0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22d3ee', marginBottom: '1.25rem' }}>
              <DollarSign size={22} />
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#ffffff' }}>Student Budget Friendly</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              No expensive organic meal subscriptions. Every recipe uses accessible, cheap ingredients tagged with cost estimates from {minPrice} to {maxPrice}.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="glass-card glass-card-interactive" style={{ padding: '1.75rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'rgba(139, 92, 246, 0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a78bfa', marginBottom: '1.25rem' }}>
              <Bot size={22} />
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#ffffff' }}>Multi-Language AI Companion</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Ask questions in English, Hinglish, Hindi, Spanish, or French. Self-contained intelligence helps you adjust meals and understand trends.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="glass-card glass-card-interactive" style={{ padding: '1.75rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', marginBottom: '1.25rem' }}>
              <Activity size={22} />
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#ffffff' }}>Milestone & Trend Tracking</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Mix and match units (lbs, kgs, cm, ft+in). View smooth SVG trendlines and clear milestone markers celebrating your progress.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL GLASS CTA BANNER */}
      <section className="glass-card" style={{
        padding: '3.5rem 2.5rem',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.18) 0%, rgba(6, 182, 212, 0.18) 50%, rgba(18, 19, 28, 0.95) 100%)',
        border: '1.5px solid rgba(139, 92, 246, 0.45)',
        borderRadius: 'var(--radius-lg)'
      }}>
        <h2 className="font-heading" style={{ fontSize: '2.4rem', fontWeight: 900, marginBottom: '0.6rem', color: '#ffffff' }}>
          Ready To Take Control Of Your Student Diet?
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '620px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
          Create your free account in under 60 seconds. No subscription traps, no external trackers.
        </p>
        <button className="btn-glass-primary" onClick={() => setActiveTab('signup')} style={{ padding: '1rem 2.6rem', fontSize: '1.05rem' }}>
          Get Started For Free <ArrowRight size={20} />
        </button>
      </section>
    </div>
  );
};
