import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { calculateBmiFlexible, kgToLbs, lbsToKg } from '../utils/bmiCalculator';
import { formatCurrency } from '../utils/currency';
import { ArrowRight, Scale, Zap, Star, HelpCircle, ChevronDown, ShieldCheck } from 'lucide-react';

export const LandingPage = ({ setActiveTab }) => {
  const { currency } = useAuth();
  const [weightUnit, setWeightUnit] = useState('kg');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [heightCm, setHeightCm] = useState(175);
  const [heightFeet, setHeightFeet] = useState(5);
  const [heightInches, setHeightInches] = useState(9);
  const [weightVal, setWeightVal] = useState(70);
  const [openFaq, setOpenFaq] = useState(0);

  const metrics = calculateBmiFlexible({
    weightVal, weightUnit, heightVal: heightCm, heightUnit, heightFeet, heightInchesVal: heightInches, sex: 'other'
  });

  const minPrice = formatCurrency(40, currency);
  const maxPrice = formatCurrency(120, currency);

  const faqs = [
    { q: "Is WeightBuddy really 100% free?", a: "Yes — completely free with no hidden subscriptions, paywalls, or premium tiers. Built specifically for college students." },
    { q: "How does meal planning work for hostel kitchens?", a: "Our engine prioritizes low-cost, accessible ingredients like peanut butter, oats, lentils, and eggs that can be prepared in 5–10 minutes in dorm rooms." },
    { q: "Can I use this on my phone?", a: "Absolutely. WeightBuddy is mobile-first with responsive layouts, touch controls, and fast load times." },
    { q: "Is my health data private?", a: "Your data stays local and private. We never sell or share student data with third parties." }
  ];

  return (
    <div className="animate-fade-in">
      {/* ═══ BRANDING HEADER ═══ */}
      <header style={{ maxWidth: '1140px', margin: '0 auto', padding: '1.5rem 1.5rem 0', display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '9px',
            background: 'var(--accent-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            color: '#ffffff',
            fontSize: '1.1rem',
            fontFamily: 'var(--font-heading)'
          }}>
            W
          </div>
          <div>
            <div className="font-heading" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>
              Weight<span style={{ color: 'var(--accent-gold)' }}>Buddy</span>
            </div>
            <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.04em' }}>
              Student Nutrition
            </div>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '4rem 1.5rem 5rem' }}>
        {/* ═══ HERO ═══ */}
      <section style={{ paddingBottom: '5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        
        <span className="badge badge-zinc" style={{ marginBottom: '2rem', padding: '0.4rem 1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
          <ShieldCheck size={14} style={{ color: 'var(--accent-gold)' }} /> Free Student Platform
        </span>

        <h1 className="font-heading" style={{ fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', fontWeight: 900, lineHeight: 1.05, marginBottom: '1.5rem', maxWidth: '800px' }}>
          Your campus nutrition, <br/>
          <span className="text-gradient-gold">beautifully simplified.</span>
        </h1>

        <p style={{ fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: 1.7, fontWeight: 450, maxWidth: '600px', color: 'var(--text-secondary)' }}>
          Personalized meal plans from {minPrice}–{maxPrice} per serving. 5-minute hostel-friendly recipes, body tracking, and an AI nutrition coach — all completely free.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '4rem' }}>
          <button className="btn-primary" onClick={() => setActiveTab('dashboard')} style={{ padding: '0.9rem 2.2rem', fontSize: '0.95rem' }}>
            Open Student Portal <ArrowRight size={16} />
          </button>
          <button className="btn-secondary" onClick={() => setActiveTab('onboarding')} style={{ padding: '0.9rem 2.2rem', fontSize: '0.95rem' }}>
            Set Up Profile
          </button>
        </div>

        <div style={{ display: 'flex', gap: '3rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem', marginBottom: '5rem', justifyContent: 'center', width: '100%', maxWidth: '600px' }}>
          {[
            { value: '15k+', label: 'Students' },
            { value: '99%', label: 'Satisfaction' },
            { value: 'Free', label: 'Forever' }
          ].map(stat => (
            <div key={stat.label}>
              <div className="font-heading" style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-primary)' }}>{stat.value}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* BMI Calculator Card (Centered & Premium) */}
        <div style={{ width: '100%', maxWidth: '540px', margin: '0 auto' }}>
          <div className="glass-card float-slow" style={{ padding: '2.5rem', textAlign: 'left', position: 'relative' }}>
            
            {/* Subtle glow effect behind card */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '80%', background: 'var(--accent-gold)', filter: 'blur(100px)', opacity: 0.05, zIndex: -1, pointerEvents: 'none' }}></div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Scale size={18} className="text-gradient-gold" style={{ color: 'var(--accent-gold-light)' }} />
                </div>
                <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>Quick Calculator</span>
              </div>
              <span className="badge badge-amber pulse-glow">Live</span>
            </div>

            {/* Height */}
            <div className="form-group" style={{ marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label className="form-label" style={{ fontSize: '0.75rem' }}>Height</label>
                <div className="unit-toggle-group">
                  <button type="button" className={`unit-toggle-btn ${heightUnit === 'cm' ? 'active' : ''}`} onClick={() => setHeightUnit('cm')}>cm</button>
                  <button type="button" className={`unit-toggle-btn ${heightUnit === 'ft_in' ? 'active' : ''}`} onClick={() => setHeightUnit('ft_in')}>ft/in</button>
                </div>
              </div>
              {heightUnit === 'cm' ? (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 600 }}>
                    <span>Value</span>
                    <strong style={{ color: 'var(--text-primary)' }}>{heightCm} cm</strong>
                  </div>
                  <input type="range" min="130" max="220" value={heightCm} onChange={e => setHeightCm(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--accent-gold)' }} />
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <input type="number" min="3" max="8" value={heightFeet} onChange={e => setHeightFeet(Number(e.target.value))} className="form-input" placeholder="Feet" />
                  <input type="number" min="0" max="11" value={heightInches} onChange={e => setHeightInches(Number(e.target.value))} className="form-input" placeholder="Inches" />
                </div>
              )}
            </div>

            {/* Weight */}
            <div className="form-group" style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label className="form-label" style={{ fontSize: '0.75rem' }}>Weight</label>
                <div className="unit-toggle-group">
                  <button type="button" className={`unit-toggle-btn ${weightUnit === 'kg' ? 'active' : ''}`}
                    onClick={() => { if (weightUnit === 'lbs') setWeightVal(lbsToKg(weightVal)); setWeightUnit('kg'); }}>kg</button>
                  <button type="button" className={`unit-toggle-btn ${weightUnit === 'lbs' ? 'active' : ''}`}
                    onClick={() => { if (weightUnit === 'kg') setWeightVal(kgToLbs(weightVal)); setWeightUnit('lbs'); }}>lbs</button>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 600 }}>
                <span>Value</span>
                <strong style={{ color: 'var(--text-primary)' }}>{weightVal} {weightUnit}</strong>
              </div>
              <input type="range" min={weightUnit === 'kg' ? "40" : "88"} max={weightUnit === 'kg' ? "160" : "350"}
                value={weightVal} onChange={e => setWeightVal(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-gold)' }} />
            </div>

            {/* Result */}
            <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-md)', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.2)' }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, marginBottom: '0.2rem' }}>Your BMI</div>
                <div className="font-heading text-gradient" style={{ fontSize: '3rem', fontWeight: 900, lineHeight: 1 }}>{metrics.bmi}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="badge badge-amber" style={{ marginBottom: '0.5rem' }}>{metrics.category}</span>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>{metrics.weightKg} kg · {metrics.weightLbs} lbs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section style={{ margin: '3rem 0 4rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="badge badge-amber" style={{ marginBottom: '0.5rem' }}><Zap size={11} /> How It Works</span>
          <h2 className="font-heading" style={{ fontSize: '2rem' }}>Three simple steps</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {[
            { step: '1', title: 'Set your baseline', desc: 'Enter height, weight, dietary preference, and class schedule.' },
            { step: '2', title: 'Get meal plans', desc: '5–10 minute hostel recipes with calories, protein, and cost estimates.' },
            { step: '3', title: 'Track & improve', desc: 'Log weight over time, view trends, and ask the AI coach questions.' }
          ].map(item => (
            <div key={item.step} className="glass-card glass-card-interactive" style={{ padding: '1.75rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--accent-gold)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.1rem', marginBottom: '1rem' }}>
                {item.step}
              </div>
              <h3 className="font-heading" style={{ fontSize: '1.15rem', marginBottom: '0.4rem' }}>{item.title}</h3>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.6, fontWeight: 450 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section style={{ margin: '3rem 0 4rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="badge badge-amber" style={{ marginBottom: '0.5rem' }}><Star size={11} /> Student Reviews</span>
          <h2 className="font-heading" style={{ fontSize: '2rem' }}>What students say</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {[
            { quote: "Saved me ₹3,000/month on food while gaining 4kg of lean muscle. The meal plans are genuinely useful.", name: "Rohan S.", role: "Engineering, 3rd Year" },
            { quote: "The grab-and-go suggestions during midterms were a lifesaver. Finally eating properly between exams.", name: "Ananya M.", role: "Medical, 2nd Year" }
          ].map((review, i) => (
            <div key={i} className="glass-card" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1rem' }}>
                {[...Array(5)].map((_, j) => <Star key={j} size={15} fill="var(--accent-gold-light)" color="var(--accent-gold-light)" />)}
              </div>
              <p style={{ fontSize: '0.92rem', lineHeight: 1.65, fontStyle: 'italic', marginBottom: '1.25rem', fontWeight: 450 }}>
                "{review.quote}"
              </p>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{review.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{review.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section style={{ margin: '3rem 0 4rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="badge badge-amber" style={{ marginBottom: '0.5rem' }}><HelpCircle size={11} /> FAQ</span>
          <h2 className="font-heading" style={{ fontSize: '2rem' }}>Common questions</h2>
        </div>

        <div style={{ maxWidth: '720px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {faqs.map((faq, idx) => (
            <div key={idx} className="glass-card" onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
              style={{ padding: '1.15rem 1.5rem', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>{faq.q}</h4>
                <ChevronDown size={18} color="var(--text-muted)" style={{ transform: openFaq === idx ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s ease', flexShrink: 0 }} />
              </div>
              {openFaq === idx && (
                <p style={{ marginTop: '0.75rem', fontSize: '0.88rem', lineHeight: 1.6, fontWeight: 450 }}>{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="glass-card" style={{ padding: '3rem 2rem', textAlign: 'center', boxShadow: 'var(--shadow-float)' }}>
        <h2 className="font-heading" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Start your free nutrition plan</h2>
        <p style={{ maxWidth: '480px', margin: '0 auto 1.75rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
          No signup required. No credit card. Just better nutrition.
        </p>
        <button className="btn-primary" onClick={() => setActiveTab('dashboard')} style={{ padding: '0.85rem 2.2rem' }}>
          Open Portal <ArrowRight size={16} />
        </button>
      </section>
      </div>
    </div>
  );
};
