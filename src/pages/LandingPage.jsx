import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { calculateBmiFlexible, kgToLbs, lbsToKg } from '../utils/bmiCalculator';
import { formatCurrency } from '../utils/currency';
import { 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  Bot, 
  Activity, 
  Check, 
  Scale, 
  Zap, 
  Sparkles, 
  Star, 
  HelpCircle, 
  TrendingUp, 
  ChevronDown, 
  Award,
  Users,
  CheckCircle2
} from 'lucide-react';

export const LandingPage = ({ setActiveTab }) => {
  const { currency, theme } = useAuth();

  // Independent demo unit selections
  const [weightUnit, setWeightUnit] = useState('kg');
  const [heightUnit, setHeightUnit] = useState('cm');

  // Input states
  const [heightCm, setHeightCm] = useState(175);
  const [heightFeet, setHeightFeet] = useState(5);
  const [heightInches, setHeightInches] = useState(9);
  const [weightVal, setWeightVal] = useState(70);

  // FAQ Accordion Toggle State
  const [openFaq, setOpenFaq] = useState(0);

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

  const faqs = [
    {
      q: "Is WeightBuddy really 100% free for students?",
      a: "Yes! WeightBuddy is completely free with zero hidden subscriptions, paywalls, or premium tiers. Built specifically for college and university students."
    },
    {
      q: "How does the meal generator adapt to hostel kitchens and tight budgets?",
      a: "Our rule-based engine prioritizes low-cost, accessible ingredients like peanut butter, oats, lentils, paneer, and eggs that can be prepared in 5-10 minutes in dorm rooms."
    },
    {
      q: "Can I use WeightBuddy on my mobile phone between classes?",
      a: "Absolutely! WeightBuddy is built mobile-first with touch-optimized controls, fast loading speed, and responsive layouts."
    },
    {
      q: "Is my personal body health data safe?",
      a: "Your health data stays private and stored locally. WeightBuddy never sells or shares student data with third-party advertisers."
    }
  ];

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1240px', margin: '0 auto', padding: '2.5rem 1.75rem' }}>
      
      {/* 1. PROFESSIONAL HERO SECTION WITH LIVE STATS */}
      <section style={{ padding: '2.5rem 1rem 3.5rem', position: 'relative' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '3.5rem',
          alignItems: 'center'
        }}>
          {/* HERO LEFT */}
          <div>
            <div className="badge badge-amber float-animation" style={{ marginBottom: '1.25rem', background: 'rgba(217, 119, 6, 0.15)', color: '#d97706', border: '1.5px solid rgba(217, 119, 6, 0.45)' }}>
              <ShieldCheck size={15} color="#d97706" /> Official Free Student Fitness Engine
            </div>

            <h1 className="font-heading" style={{
              fontSize: 'clamp(2.6rem, 5.4vw, 4.2rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: '1.35rem',
              color: 'var(--text-primary)'
            }}>
              Nail Campus Nutrition <br />
              <span style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #d97706 70%, #b45309 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Without Spending a Fortune
              </span>
            </h1>

            <p style={{
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
              marginBottom: '2.25rem',
              lineHeight: 1.65,
              fontWeight: 600
            }}>
              Engineered for busy college schedules. Get personalized 5-10 minute hostel-friendly meal plans (priced from {minPrice} to {maxPrice}), track body metrics, and consult your multi-language AI assistant.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.75rem' }}>
              <button className="btn-primary" onClick={() => setActiveTab('dashboard')} style={{ padding: '1rem 2.5rem', fontSize: '1.05rem' }}>
                Access Portal Now <ArrowRight size={18} />
              </button>
              <button className="btn-secondary" onClick={() => setActiveTab('onboarding')} style={{ padding: '1rem 2.2rem', fontSize: '1.05rem' }}>
                Setup My Profile
              </button>
            </div>

            {/* LIVE PLATFORM METRIC BADGES */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1.25rem',
              paddingTop: '1.5rem',
              borderTop: '1.5px solid var(--border-medium)'
            }}>
              <div>
                <div className="font-heading" style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-primary)' }}>15,000+</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Active Students</div>
              </div>
              <div>
                <div className="font-heading" style={{ fontSize: '1.8rem', fontWeight: 900, color: '#d97706' }}>99.4%</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Satisfaction Score</div>
              </div>
              <div>
                <div className="font-heading" style={{ fontSize: '1.8rem', fontWeight: 900, color: '#10b981' }}>100% Free</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Zero Subscription</div>
              </div>
            </div>
          </div>

          {/* HERO RIGHT: INTERACTIVE BMI CALCULATOR ENGINE */}
          <div className="glass-card zoom-pulse-animation" style={{
            padding: '2.25rem',
            background: theme === 'dark' ? '#14141a' : '#ffffff',
            border: '1.5px solid var(--border-medium)',
            boxShadow: 'var(--shadow-float)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Scale size={20} color="#d97706" />
                </div>
                <span>Interactive BMI Engine</span>
              </div>
              <span className="badge badge-amber pulse-glow">Real-Time</span>
            </div>

            {/* HEIGHT CONTROL */}
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '0.3rem', fontWeight: 700 }}>
                    <span>Centimeters</span>
                    <strong style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>{heightCm} cm</strong>
                  </div>
                  <input type="range" min="130" max="220" value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--text-primary)' }} />
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <input type="number" min="3" max="8" value={heightFeet} onChange={(e) => setHeightFeet(Number(e.target.value))} className="form-input" placeholder="Feet" />
                  <input type="number" min="0" max="11" value={heightInches} onChange={(e) => setHeightInches(Number(e.target.value))} className="form-input" placeholder="Inches" />
                </div>
              )}
            </div>

            {/* WEIGHT CONTROL */}
            <div className="form-group" style={{ marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <label className="form-label">Weight Baseline</label>
                <div className="unit-toggle-group">
                  <button type="button" className={`unit-toggle-btn ${weightUnit === 'kg' ? 'active' : ''}`} onClick={() => { if (weightUnit === 'lbs') setWeightVal(lbsToKg(weightVal)); setWeightUnit('kg'); }}>kgs</button>
                  <button type="button" className={`unit-toggle-btn ${weightUnit === 'lbs' ? 'active' : ''}`} onClick={() => { if (weightUnit === 'kg') setWeightVal(kgToLbs(weightVal)); setWeightUnit('lbs'); }}>lbs</button>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '0.3rem', fontWeight: 700 }}>
                <span>Weight Value</span>
                <strong style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>{weightVal} {weightUnit}</strong>
              </div>
              <input type="range" min={weightUnit === 'kg' ? "40" : "88"} max={weightUnit === 'kg' ? "160" : "350"} value={weightVal} onChange={(e) => setWeightVal(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--text-primary)' }} />
            </div>

            {/* RESULT STAT CARD */}
            <div style={{
              background: theme === 'dark' ? '#0e0e12' : '#f8fafc',
              borderRadius: 'var(--radius-sm)',
              padding: '1.35rem',
              border: '1.5px solid var(--border-medium)',
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 900 }}>CALCULATED BMI</div>
                <div className="font-heading" style={{ fontSize: '2.8rem', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1, marginTop: '0.2rem' }}>
                  {metrics.bmi}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div className="badge badge-amber" style={{ fontSize: '0.85rem', padding: '0.45rem 1rem', marginBottom: '0.4rem' }}>
                  {metrics.category}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 700 }}>
                  {metrics.weightKg} kg ({metrics.weightLbs} lbs)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS - 3-STEP PROFESSIONAL WORKFLOW */}
      <section style={{ margin: '5rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="badge badge-amber" style={{ marginBottom: '0.5rem' }}>
            <Zap size={12} color="#d97706" /> Simple 3-Step Campus Workflow
          </div>
          <h2 className="font-heading" style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-primary)' }}>
            How WeightBuddy Works
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', fontWeight: 600 }}>
            Get your personalized nutrition and fitness baseline in under 60 seconds.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {/* Step 1 */}
          <div className="glass-card glass-card-interactive" style={{ padding: '2rem', background: theme === 'dark' ? '#14141a' : '#ffffff' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#d97706', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.3rem', marginBottom: '1.25rem' }}>
              1
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.3rem', marginBottom: '0.6rem', color: 'var(--text-primary)' }}>Set Student Baseline</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, fontWeight: 600 }}>
              Enter your age, height, weight, dietary preference (Veg / Non-Veg / Vegan), and class schedule density.
            </p>
          </div>

          {/* Step 2 */}
          <div className="glass-card glass-card-interactive" style={{ padding: '2rem', background: theme === 'dark' ? '#14141a' : '#ffffff' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'var(--text-primary)', color: 'var(--bg-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.3rem', marginBottom: '1.25rem' }}>
              2
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.3rem', marginBottom: '0.6rem', color: 'var(--text-primary)' }}>Get Budget Meal Plan</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, fontWeight: 600 }}>
              WeightBuddy generates 5-10 minute hostel recipes with exact calories, protein macros, and cheap cost estimates.
            </p>
          </div>

          {/* Step 3 */}
          <div className="glass-card glass-card-interactive" style={{ padding: '2rem', background: theme === 'dark' ? '#14141a' : '#ffffff' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#10b981', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.3rem', marginBottom: '1.25rem' }}>
              3
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.3rem', marginBottom: '0.6rem', color: 'var(--text-primary)' }}>Track & Consult AI</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, fontWeight: 600 }}>
              Log your weight history on smooth SVG trend charts and ask our multi-language AI coach questions anytime.
            </p>
          </div>
        </div>
      </section>

      {/* 3. STUDENT TESTIMONIALS & REVIEWS SECTION */}
      <section style={{ margin: '5rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="badge badge-amber" style={{ marginBottom: '0.5rem' }}>
            <Star size={12} color="#d97706" /> Student Success Stories
          </div>
          <h2 className="font-heading" style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-primary)' }}>
            Loved by Campus Students
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.75rem' }}>
          {/* Review 1 */}
          <div className="glass-card" style={{ padding: '2rem', background: theme === 'dark' ? '#14141a' : '#ffffff' }}>
            <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem', color: '#fbbf24' }}>
              <Star size={18} fill="#fbbf24" /><Star size={18} fill="#fbbf24" /><Star size={18} fill="#fbbf24" /><Star size={18} fill="#fbbf24" /><Star size={18} fill="#fbbf24" />
            </div>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.6, fontWeight: 600, fontStyle: 'italic', marginBottom: '1.25rem' }}>
              "WeightBuddy saved me over ₹3,000 a month on expensive hostel food while helping me gain 4kg of lean muscle!"
            </p>
            <div style={{ fontWeight: 900, color: '#d97706', fontSize: '0.95rem' }}>— Rohan S., Engineering Student</div>
          </div>

          {/* Review 2 */}
          <div className="glass-card" style={{ padding: '2rem', background: theme === 'dark' ? '#14141a' : '#ffffff' }}>
            <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem', color: '#fbbf24' }}>
              <Star size={18} fill="#fbbf24" /><Star size={18} fill="#fbbf24" /><Star size={18} fill="#fbbf24" /><Star size={18} fill="#fbbf24" /><Star size={18} fill="#fbbf24" />
            </div>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.6, fontWeight: 600, fontStyle: 'italic', marginBottom: '1.25rem' }}>
              "The 5-minute grab-and-go meal suggestions during midterm exam weeks were an absolute lifesaver."
            </p>
            <div style={{ fontWeight: 900, color: '#d97706', fontSize: '0.95rem' }}>— Ananya M., Medical Student</div>
          </div>
        </div>
      </section>

      {/* 4. FAQ ACCORDION SECTION */}
      <section style={{ margin: '5rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="badge badge-amber" style={{ marginBottom: '0.5rem' }}>
            <HelpCircle size={12} color="#d97706" /> Frequently Asked Questions
          </div>
          <h2 className="font-heading" style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--text-primary)' }}>
            Got Questions? We Have Answers.
          </h2>
        </div>

        <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="glass-card"
              onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
              style={{
                padding: '1.35rem 1.75rem',
                cursor: 'pointer',
                background: theme === 'dark' ? '#14141a' : '#ffffff',
                border: '1.5px solid var(--border-medium)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 className="font-heading" style={{ fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: 800 }}>{faq.q}</h4>
                <ChevronDown size={20} color="#d97706" style={{ transform: openFaq === idx ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }} />
              </div>
              {openFaq === idx && (
                <p style={{ marginTop: '0.85rem', fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, fontWeight: 600 }}>
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 5. FINAL PROFESSIONAL CTA BANNER */}
      <section className="glass-card" style={{
        padding: '3.5rem 2.5rem',
        textAlign: 'center',
        background: theme === 'dark' ? '#14141a' : '#ffffff',
        border: '1.5px solid var(--border-medium)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-float)'
      }}>
        <h2 className="font-heading" style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.6rem', color: 'var(--text-primary)' }}>
          Start Your Free Student Fitness Plan Today
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '620px', margin: '0 auto 2rem', lineHeight: '1.6', fontWeight: 600 }}>
          Zero subscription fees, no credit card required. Built for students by students.
        </p>
        <button className="btn-primary" onClick={() => setActiveTab('dashboard')} style={{ padding: '1rem 2.6rem', fontSize: '1.05rem' }}>
          Access Student Portal <ArrowRight size={20} />
        </button>
      </section>
    </div>
  );
};
