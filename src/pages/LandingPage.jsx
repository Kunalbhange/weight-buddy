import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { calculateBmiFlexible, kgToLbs, lbsToKg } from '../utils/bmiCalculator';
import { formatCurrency } from '../utils/currency';
import { ArrowRight, ShieldCheck, Clock, DollarSign, Bot, Activity, Check, Sparkles, Scale } from 'lucide-react';

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
    <div className="animate-fade-in" style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem 1.5rem' }}>
      {/* FRONT HERO SECTION WITH COMPACT EMBEDDED BMI CALCULATOR */}
      <section style={{
        padding: '2.5rem 1rem 2rem',
        position: 'relative'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2.5rem',
          alignItems: 'center'
        }}>
          {/* HERO LEFT: TEXT & CTA */}
          <div>
            <div className="badge badge-emerald" style={{ marginBottom: '1rem' }}>
              <ShieldCheck size={14} /> 100% Free Forever • Zero Ads • No Credit Card
            </div>

            <h1 className="font-heading" style={{
              fontSize: 'clamp(2.1rem, 4.5vw, 3.4rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '1rem'
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
              fontSize: '0.98rem',
              color: 'var(--text-secondary)',
              marginBottom: '1.75rem',
              lineHeight: 1.6
            }}>
              Built for busy college students juggling classes & exams. Get personalized dorm-friendly diet plans (priced from {minPrice} to {maxPrice}), track your metrics, and get instant AI guidance.
            </p>

            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <button className="btn-primary" onClick={() => setActiveTab('signup')} style={{ padding: '0.85rem 2rem', fontSize: '0.95rem' }}>
                Start Free Plan Now <ArrowRight size={18} />
              </button>
              <button className="btn-secondary" onClick={() => setActiveTab('login')} style={{ padding: '0.85rem 1.6rem', fontSize: '0.95rem' }}>
                Student Sign In
              </button>
            </div>

            <div style={{
              display: 'flex',
              gap: '1.5rem',
              flexWrap: 'wrap',
              color: 'var(--text-muted)',
              fontSize: '0.82rem'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Check size={15} color="var(--accent-primary)" /> Quick 5-10 Min Meals
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Check size={15} color="var(--accent-primary)" /> Under {minPrice} – {maxPrice} / Meal
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Check size={15} color="var(--accent-primary)" /> Multi-Language AI Companion
              </span>
            </div>
          </div>

          {/* HERO RIGHT: REFINED COMPACT EMBEDDED BMI & UNIT CALCULATOR CARD */}
          <div className="glass-card" style={{
            padding: '1.5rem',
            background: '#141414',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-md)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 800, fontSize: '0.95rem' }}>
                <Scale size={18} color="var(--accent-primary)" />
                <span>Live Interactive BMI Calculator</span>
              </div>
              <span className="badge badge-emerald" style={{ fontSize: '0.68rem' }}>Instant Calculation</span>
            </div>

            {/* HEIGHT INPUT CONTROL */}
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                <label className="form-label" style={{ fontSize: '0.78rem' }}>Height</label>
                <div className="unit-toggle-group">
                  <button type="button" className={`unit-toggle-btn ${heightUnit === 'cm' ? 'active' : ''}`} onClick={() => setHeightUnit('cm')}>cm</button>
                  <button type="button" className={`unit-toggle-btn ${heightUnit === 'ft_in' ? 'active' : ''}`} onClick={() => setHeightUnit('ft_in')}>ft + in</button>
                </div>
              </div>

              {heightUnit === 'cm' ? (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>
                    <span>Centimeters</span>
                    <strong>{heightCm} cm</strong>
                  </div>
                  <input type="range" min="130" max="220" value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--accent-primary)' }} />
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
                  <input type="number" min="3" max="8" value={heightFeet} onChange={(e) => setHeightFeet(Number(e.target.value))} className="form-input" placeholder="Feet" style={{ padding: '0.45rem 0.6rem', fontSize: '0.82rem' }} />
                  <input type="number" min="0" max="11" value={heightInches} onChange={(e) => setHeightInches(Number(e.target.value))} className="form-input" placeholder="Inches" style={{ padding: '0.45rem 0.6rem', fontSize: '0.82rem' }} />
                </div>
              )}
            </div>

            {/* WEIGHT INPUT CONTROL */}
            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                <label className="form-label" style={{ fontSize: '0.78rem' }}>Weight</label>
                <div className="unit-toggle-group">
                  <button type="button" className={`unit-toggle-btn ${weightUnit === 'kg' ? 'active' : ''}`} onClick={() => { if (weightUnit === 'lbs') setWeightVal(lbsToKg(weightVal)); setWeightUnit('kg'); }}>kgs</button>
                  <button type="button" className={`unit-toggle-btn ${weightUnit === 'lbs' ? 'active' : ''}`} onClick={() => { if (weightUnit === 'kg') setWeightVal(kgToLbs(weightVal)); setWeightUnit('lbs'); }}>lbs</button>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>
                <span>Weight Value</span>
                <strong>{weightVal} {weightUnit}</strong>
              </div>
              <input type="range" min={weightUnit === 'kg' ? "40" : "88"} max={weightUnit === 'kg' ? "160" : "350"} value={weightVal} onChange={(e) => setWeightVal(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--accent-primary)' }} />
            </div>

            {/* MINIMAL RESULT BOX */}
            <div style={{
              background: 'rgba(0,0,0,0.6)',
              borderRadius: 'var(--radius-sm)',
              padding: '1rem',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>CALCULATED BMI</div>
                <div className="font-heading" style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
                  {metrics.bmi}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div className={`badge ${metrics.badgeClass}`} style={{ fontSize: '0.75rem', marginBottom: '0.3rem' }}>
                  {metrics.category}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                  {metrics.weightKg} kg ({metrics.weightLbs} lbs)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES GRID */}
      <section style={{ margin: '4rem 0 3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 className="font-heading" style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.4rem' }}>
            Everything A College Student Needs
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Designed around tight schedules, hostel kitchens, and zero budget.</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem'
        }}>
          <div className="glass-card glass-card-interactive" style={{ padding: '1.5rem' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)', marginBottom: '1rem' }}>
              <Clock size={20} />
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>Schedule Density Aware</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>
              Heavy class day? WeightBuddy prioritizes 5-10 minute grab-and-go meal suggestions like peanut butter oats, egg bhurji wraps, and high-protein shakes.
            </p>
          </div>

          <div className="glass-card glass-card-interactive" style={{ padding: '1.5rem' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fbbf24', marginBottom: '1rem' }}>
              <DollarSign size={20} />
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>Student Budget Friendly</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>
              No expensive organic meal subscriptions. Every recipe uses accessible, cheap ingredients tagged with cost estimates from {minPrice} to {maxPrice}.
            </p>
          </div>

          <div className="glass-card glass-card-interactive" style={{ padding: '1.5rem' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)', marginBottom: '1rem' }}>
              <Bot size={20} />
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>Multi-Language AI Companion</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>
              Ask questions in English, Hinglish, Hindi, Spanish, or French. Self-contained intelligence helps you adjust meals and understand trends.
            </p>
          </div>

          <div className="glass-card glass-card-interactive" style={{ padding: '1.5rem' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)', marginBottom: '1rem' }}>
              <Activity size={20} />
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>Milestone & Trend Tracking</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>
              Mix and match units (lbs, kgs, cm, ft+in). View smooth SVG trendlines and clear milestone markers celebrating your progress.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA BANNER */}
      <section className="glass-card" style={{
        padding: '3rem 2rem',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(20, 20, 20, 0.95) 100%)',
        border: '1px solid rgba(16, 185, 129, 0.3)'
      }}>
        <h2 className="font-heading" style={{ fontSize: '2.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Ready To Take Control Of Your Student Diet?
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto 1.75rem' }}>
          Create your free account in under 60 seconds. No subscription traps, no external trackers.
        </p>
        <button className="btn-primary" onClick={() => setActiveTab('signup')} style={{ padding: '0.85rem 2.2rem', fontSize: '0.95rem' }}>
          Get Started For Free <ArrowRight size={18} />
        </button>
      </section>
    </div>
  );
};
