import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { calculateBmiFlexible, kgToLbs, lbsToKg } from '../utils/bmiCalculator';
import { formatCurrency } from '../utils/currency';
import { ArrowRight, ShieldCheck, Clock, DollarSign, Bot, Activity, Check, Scale, Zap, Sparkles } from 'lucide-react';

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
      {/* HERO SECTION WITH DYNAMIC ZOOM BMI CALCULATOR */}
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
            <div className="badge badge-amber float-animation" style={{ marginBottom: '1.25rem' }}>
              <ShieldCheck size={15} color="#b45309" /> Free Student Fitness & Nutrition Engine
            </div>

            <h1 className="font-heading" style={{
              fontSize: 'clamp(2.5rem, 5.2vw, 4rem)',
              fontWeight: 900,
              lineHeight: 1.12,
              marginBottom: '1.25rem',
              color: '#0f172a'
            }}>
              Nail Your College Nutrition <br />
              <span style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #d97706 70%, #b45309 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Without Breaking Your Budget
              </span>
            </h1>

            <p style={{
              fontSize: '1.08rem',
              color: '#334155',
              marginBottom: '2.25rem',
              lineHeight: 1.65
            }}>
              Built for modern campus life. Get personalized 5-10 min grab & go diet plans (priced from {minPrice} to {maxPrice}), track your metrics over time, and ask our multi-language AI anything.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <button className="btn-primary" onClick={() => setActiveTab('signup')} style={{ padding: '0.95rem 2.4rem', fontSize: '1.02rem' }}>
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
              fontWeight: 800,
              color: '#1e293b'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Check size={16} color="#d97706" /> 5-10 Min Hostel Meals
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Check size={16} color="#d97706" /> Under {minPrice} – {maxPrice} / Meal
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Check size={16} color="#d97706" /> Multi-Language AI Companion
              </span>
            </div>
          </div>

          {/* HERO RIGHT: ZOOM IN / ZOOM OUT LIVE BMI CALCULATOR CARD */}
          <div className="glass-card zoom-pulse-animation" style={{
            padding: '2.25rem',
            background: '#ffffff',
            border: '1.5px solid #cbd5e1',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-float)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 800, fontSize: '1.1rem', color: '#0f172a' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a' }}>
                  <Scale size={20} />
                </div>
                <span>Live Interactive BMI Engine</span>
              </div>
              <span className="badge badge-amber pulse-glow">Real-Time</span>
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: '#475569', marginBottom: '0.3rem' }}>
                    <span>Centimeters</span>
                    <strong style={{ color: '#0f172a', fontSize: '1rem' }}>{heightCm} cm</strong>
                  </div>
                  <input type="range" min="130" max="220" value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value))} style={{ width: '100%', accentColor: '#0f172a' }} />
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
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: '#475569', marginBottom: '0.3rem' }}>
                <span>Weight Value</span>
                <strong style={{ color: '#0f172a', fontSize: '1rem' }}>{weightVal} {weightUnit}</strong>
              </div>
              <input type="range" min={weightUnit === 'kg' ? "40" : "88"} max={weightUnit === 'kg' ? "160" : "350"} value={weightVal} onChange={(e) => setWeightVal(Number(e.target.value))} style={{ width: '100%', accentColor: '#0f172a' }} />
            </div>

            {/* RESULT STAT CARD */}
            <div style={{
              background: '#f8fafc',
              borderRadius: 'var(--radius-sm)',
              padding: '1.35rem',
              border: '1.5px solid #cbd5e1',
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 800 }}>CALCULATED BMI</div>
                <div className="font-heading" style={{ fontSize: '2.8rem', fontWeight: 900, color: '#0f172a', lineHeight: 1, marginTop: '0.2rem' }}>
                  {metrics.bmi}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div className="badge badge-amber" style={{ fontSize: '0.82rem', padding: '0.45rem 1rem', marginBottom: '0.4rem' }}>
                  {metrics.category}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#334155', fontWeight: 700 }}>
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
          <div className="badge badge-amber float-animation" style={{ marginBottom: '0.5rem' }}>
            <Zap size={12} color="#b45309" /> Student Essential Features
          </div>
          <h2 className="font-heading" style={{ fontSize: '2.4rem', fontWeight: 900, color: '#0f172a' }}>
            Built For Modern Campus Life
          </h2>
          <p style={{ color: '#475569', fontSize: '1rem', marginTop: '0.2rem' }}>
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
            <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', marginBottom: '1.25rem', boxShadow: '0 6px 16px rgba(15,23,42,0.2)' }}>
              <Clock size={22} color="#ffffff" />
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#0f172a' }}>Schedule Density Aware</h3>
            <p style={{ color: '#334155', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Heavy class day? WeightBuddy prioritizes 5-10 minute grab-and-go meal suggestions like peanut butter oats, egg bhurji wraps, and high-protein shakes.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="glass-card glass-card-interactive" style={{ padding: '1.75rem' }}>
            <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b45309', marginBottom: '1.25rem', border: '1.5px solid #fcd34d' }}>
              <DollarSign size={22} color="#b45309" />
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#0f172a' }}>Student Budget Friendly</h3>
            <p style={{ color: '#334155', fontSize: '0.9rem', lineHeight: '1.6' }}>
              No expensive organic meal subscriptions. Every recipe uses accessible, cheap ingredients tagged with cost estimates from {minPrice} to {maxPrice}.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="glass-card glass-card-interactive" style={{ padding: '1.75rem' }}>
            <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', marginBottom: '1.25rem', boxShadow: '0 6px 16px rgba(15,23,42,0.2)' }}>
              <Bot size={22} color="#ffffff" />
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#0f172a' }}>Multi-Language AI Companion</h3>
            <p style={{ color: '#334155', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Ask questions in English, Hinglish, Hindi, Spanish, or French. Self-contained intelligence helps you adjust meals and understand trends.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="glass-card glass-card-interactive" style={{ padding: '1.75rem' }}>
            <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', marginBottom: '1.25rem', boxShadow: '0 6px 16px rgba(15,23,42,0.2)' }}>
              <Activity size={22} color="#ffffff" />
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#0f172a' }}>Milestone & Trend Tracking</h3>
            <p style={{ color: '#334155', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Mix and match units (lbs, kgs, cm, ft+in). View smooth SVG trendlines and clear milestone markers celebrating your progress.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL RETRO CTA BANNER */}
      <section className="glass-card" style={{
        padding: '3.5rem 2.5rem',
        textAlign: 'center',
        background: '#ffffff',
        border: '1.5px solid #cbd5e1',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-float)'
      }}>
        <h2 className="font-heading" style={{ fontSize: '2.4rem', fontWeight: 900, marginBottom: '0.6rem', color: '#0f172a' }}>
          Ready To Take Control Of Your Student Diet?
        </h2>
        <p style={{ color: '#334155', fontSize: '1.05rem', maxWidth: '620px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
          Create your free account in under 60 seconds. No subscription traps, no external trackers.
        </p>
        <button className="btn-primary" onClick={() => setActiveTab('signup')} style={{ padding: '1rem 2.6rem', fontSize: '1.05rem' }}>
          Get Started For Free <ArrowRight size={20} />
        </button>
      </section>
    </div>
  );
};
