import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { calculateBmiFlexible, feetInchesToCm, lbsToKg } from '../utils/bmiCalculator';
import { ArrowRight, ArrowLeft, Check, Sparkles, Utensils, Scale, Activity, Flame, ShieldCheck, CheckCircle2, Calendar, Dumbbell } from 'lucide-react';

export const OnboardingPage = ({ setActiveTab }) => {
  const { fetchMe, updateOnboardingState } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Form State - Step 1: Basic Stats
  const [age, setAge] = useState(21);
  const [sex, setSex] = useState('male');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [heightCm, setHeightCm] = useState(172);
  const [heightFeet, setHeightFeet] = useState(5);
  const [heightInches, setHeightInches] = useState(8);
  const [weightUnit, setWeightUnit] = useState('kg');
  const [weightVal, setWeightVal] = useState(68);

  // Step 2: Activity Level
  const [activityLevel, setActivityLevel] = useState('moderate');

  // Step 3: Schedule Density & Dietary Preference
  const [scheduleDensity, setScheduleDensity] = useState('moderate');
  const [dietaryCategory, setDietaryCategory] = useState('vegetarian');

  // Step 4: Primary Goal
  const [goal, setGoal] = useState('gain_muscle');

  // Compute preview metrics
  const previewMetrics = calculateBmiFlexible({
    weightVal,
    weightUnit,
    heightVal: heightCm,
    heightUnit,
    heightFeet,
    heightInchesVal: heightInches,
    sex
  });

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('wb_token');
      
      let finalHeightCm = heightUnit === 'cm' ? Number(heightCm) : feetInchesToCm(heightFeet, heightInches);
      let finalWeightKg = weightUnit === 'kg' ? Number(weightVal) : lbsToKg(weightVal);

      if (!finalHeightCm || finalHeightCm <= 0) finalHeightCm = 172;
      if (!finalWeightKg || finalWeightKg <= 0) finalWeightKg = 68;

      const payload = {
        age: Number(age) || 21,
        sex: sex || 'male',
        heightCm: Number(finalHeightCm),
        weightKg: Number(finalWeightKg),
        activityLevel: activityLevel || 'moderate',
        scheduleDensity: scheduleDensity || 'moderate',
        dietaryRestrictions: [dietaryCategory || 'vegetarian'],
        goal: goal || 'gain_muscle'
      };

      const res = await fetch('/api/user/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save onboarding data.');

      updateOnboardingState(data.onboarding || payload);
      if (fetchMe) await fetchMe();
      setActiveTab('dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '840px', margin: '2.5rem auto', padding: '0 1.5rem' }}>
      <div className="glass-card" style={{ padding: '2.5rem 2.25rem', background: 'var(--bg-card)', border: '1.5px solid var(--border-medium)', boxShadow: 'var(--shadow-float)' }}>
        
        {/* PROGRESS STEP INDICATOR */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <span className="badge badge-amber" style={{ marginBottom: '0.3rem' }}>
              <Sparkles size={12} color="#b45309" /> Step {step} of 4
            </span>
            <h2 className="font-heading" style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--text-primary)' }}>
              {step === 1 && 'Basic Stats & Body Metrics'}
              {step === 2 && 'Daily Activity & Energy Output'}
              {step === 3 && 'Campus Schedule & Diet Preferences'}
              {step === 4 && 'Primary Target & Physique Goal'}
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {[1, 2, 3, 4].map(i => (
              <div 
                key={i} 
                style={{
                  width: step === i ? '28px' : '10px',
                  height: '10px',
                  borderRadius: '5px',
                  background: step === i ? 'var(--text-primary)' : 'var(--border-medium)',
                  transition: 'all 0.3s ease'
                }} 
              />
            ))}
          </div>
        </div>

        {error && (
          <div style={{ padding: '0.75rem 1rem', background: '#fef2f2', border: '1.5px solid #fecaca', color: '#dc2626', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}

        {/* STEP 1: BASIC STATS & METRICS */}
        {step === 1 && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div className="form-group">
                <label className="form-label">Age (Years)</label>
                <input type="number" min="15" max="80" value={age} onChange={(e) => setAge(e.target.value)} className="form-input" />
              </div>

              <div className="form-group">
                <label className="form-label">Sex / Biological Profile</label>
                <select value={sex} onChange={(e) => setSex(e.target.value)} className="form-select">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other / Rather not say</option>
                </select>
              </div>
            </div>

            {/* HEIGHT CONTROLS */}
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label className="form-label">Height Measurement Unit</label>
                <div className="unit-toggle-group">
                  <button type="button" className={`unit-toggle-btn ${heightUnit === 'cm' ? 'active' : ''}`} onClick={() => setHeightUnit('cm')}>cm</button>
                  <button type="button" className={`unit-toggle-btn ${heightUnit === 'ft_in' ? 'active' : ''}`} onClick={() => setHeightUnit('ft_in')}>ft + in</button>
                </div>
              </div>

              {heightUnit === 'cm' ? (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.3rem', fontWeight: 700 }}>
                    <span>Centimeters Value</span>
                    <strong style={{ color: 'var(--text-primary)', fontSize: '1.05rem' }}>{heightCm} cm</strong>
                  </div>
                  <input type="range" min="130" max="220" value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--text-primary)' }} />
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <input type="number" min="3" max="8" value={heightFeet} onChange={(e) => setHeightFeet(Number(e.target.value))} className="form-input" placeholder="Feet" />
                  <input type="number" min="0" max="11" value={heightInches} onChange={(e) => setHeightInches(Number(e.target.value))} className="form-input" placeholder="Inches" />
                </div>
              )}
            </div>

            {/* WEIGHT CONTROLS */}
            <div className="form-group" style={{ marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label className="form-label">Weight Measurement Unit</label>
                <div className="unit-toggle-group">
                  <button type="button" className={`unit-toggle-btn ${weightUnit === 'kg' ? 'active' : ''}`} onClick={() => setWeightUnit('kg')}>kgs</button>
                  <button type="button" className={`unit-toggle-btn ${weightUnit === 'lbs' ? 'active' : ''}`} onClick={() => setWeightUnit('lbs')}>lbs</button>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.3rem', fontWeight: 700 }}>
                <span>Current Weight Value</span>
                <strong style={{ color: 'var(--text-primary)', fontSize: '1.05rem' }}>{weightVal} {weightUnit}</strong>
              </div>
              <input type="range" min={weightUnit === 'kg' ? "35" : "75"} max={weightUnit === 'kg' ? "160" : "350"} value={weightVal} onChange={(e) => setWeightVal(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--text-primary)' }} />
            </div>

            {/* PREVIEW BASELINE CARD */}
            <div style={{ padding: '1.25rem', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--border-medium)', textAlign: 'center', marginBottom: '1.75rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 900 }}>REAL-TIME CALCULATED BMI BASELINE</div>
              <div className="font-heading" style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-primary)', margin: '0.2rem 0' }}>{previewMetrics.bmi}</div>
              <div className={`badge ${previewMetrics.badgeClass}`} style={{ fontSize: '0.85rem' }}>{previewMetrics.category}</div>
            </div>

            <button className="btn-primary" onClick={() => setStep(2)} style={{ width: '100%', padding: '0.85rem' }}>
              Next: Activity Level <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* STEP 2: ACTIVITY LEVEL */}
        {step === 2 && (
          <div>
            <label className="form-label" style={{ fontSize: '1rem', fontWeight: 900, marginBottom: '1rem', display: 'block', color: 'var(--text-primary)' }}>
              How active is your average day?
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginBottom: '1.75rem' }}>
              {[
                { id: 'sedentary', title: '🪑 Sedentary', desc: 'Mostly sitting (studying in library, desk work, minimal walking)' },
                { id: 'light', title: '🚶 Lightly Active', desc: 'Walking around campus between classes (5,000–8,000 steps daily)' },
                { id: 'moderate', title: '🏋️ Moderately Active', desc: 'Gym sessions 3–4 days a week + campus walking' },
                { id: 'active', title: '⚡ Highly Active', desc: 'Daily intense workouts, sports, or physical campus jobs' }
              ].map((opt) => (
                <div 
                  key={opt.id}
                  onClick={() => setActivityLevel(opt.id)}
                  style={{
                    padding: '1.25rem 1.5rem',
                    borderRadius: 'var(--radius-md)',
                    background: activityLevel === opt.id ? 'var(--bg-elevated)' : 'var(--bg-card)',
                    border: activityLevel === opt.id ? '2.5px solid var(--accent-gold)' : '1.5px solid var(--border-medium)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    justify: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 900, fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                      {opt.title}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                      {opt.desc}
                    </div>
                  </div>
                  {activityLevel === opt.id && <CheckCircle2 size={20} color="var(--accent-gold)" />}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn-secondary" onClick={() => setStep(1)} style={{ flex: 1, padding: '0.8rem' }}>
                <ArrowLeft size={16} /> Back
              </button>
              <button className="btn-primary" onClick={() => setStep(3)} style={{ flex: 2, padding: '0.8rem' }}>
                Next: Diet & Schedule <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: DIETARY PREFERENCE & SCHEDULE */}
        {step === 3 && (
          <div>
            <div style={{ marginBottom: '1.75rem' }}>
              <label className="form-label" style={{ fontSize: '1rem', fontWeight: 900, marginBottom: '0.8rem', display: 'block', color: 'var(--text-primary)' }}>
                Select Your Primary Dietary Preference
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                {/* Veg Option */}
                <div 
                  onClick={() => setDietaryCategory('vegetarian')}
                  style={{
                    padding: '1.35rem 1.1rem',
                    borderRadius: 'var(--radius-md)',
                    background: dietaryCategory === 'vegetarian' ? 'var(--bg-elevated)' : 'var(--bg-card)',
                    border: dietaryCategory === 'vegetarian' ? '2.5px solid var(--accent-emerald)' : '1.5px solid var(--border-medium)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '2.2rem', marginBottom: '0.4rem' }}>🥦</div>
                  <div style={{ fontWeight: 900, fontSize: '1.05rem', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                    Vegetarian {dietaryCategory === 'vegetarian' && <CheckCircle2 size={16} color="var(--accent-emerald)" />}
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.35rem', fontWeight: 600 }}>Paneer, lentils, oats, seeds & dairy. (No meat or eggs)</p>
                </div>

                {/* Non-Veg Option */}
                <div 
                  onClick={() => setDietaryCategory('non-veg')}
                  style={{
                    padding: '1.35rem 1.1rem',
                    borderRadius: 'var(--radius-md)',
                    background: dietaryCategory === 'non-veg' ? 'var(--bg-elevated)' : 'var(--bg-card)',
                    border: dietaryCategory === 'non-veg' ? '2.5px solid #e11d48' : '1.5px solid var(--border-medium)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '2.2rem', marginBottom: '0.4rem' }}>🍗</div>
                  <div style={{ fontWeight: 900, fontSize: '1.05rem', color: '#e11d48', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                    Non-Vegetarian {dietaryCategory === 'non-veg' && <CheckCircle2 size={16} color="#e11d48" />}
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.35rem', fontWeight: 600 }}>Eggs, chicken breast, fish bowls & all foods.</p>
                </div>

                {/* Vegan Option */}
                <div 
                  onClick={() => setDietaryCategory('vegan')}
                  style={{
                    padding: '1.35rem 1.1rem',
                    borderRadius: 'var(--radius-md)',
                    background: dietaryCategory === 'vegan' ? 'var(--bg-elevated)' : 'var(--bg-card)',
                    border: dietaryCategory === 'vegan' ? '2.5px solid var(--accent-emerald)' : '1.5px solid var(--border-medium)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '2.2rem', marginBottom: '0.4rem' }}>🌿</div>
                  <div style={{ fontWeight: 900, fontSize: '1.05rem', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                    Vegan {dietaryCategory === 'vegan' && <CheckCircle2 size={16} color="var(--accent-emerald)" />}
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.35rem', fontWeight: 600 }}>100% plant-based (Soya, tofu, fruit, nuts; no dairy/eggs)</p>
                </div>
              </div>
            </div>

            {/* CAMPUS SCHEDULE DENSITY */}
            <div className="form-group" style={{ marginBottom: '1.75rem' }}>
              <label className="form-label">Campus Class Schedule Density</label>
              <select value={scheduleDensity} onChange={(e) => setScheduleDensity(e.target.value)} className="form-select">
                <option value="heavy">⚡ Heavy Class Schedule (Quick 5-10 minute grab & go meals)</option>
                <option value="moderate">⚖️ Moderate Schedule (Standard 10-15 minute meals)</option>
                <option value="light">🌿 Light Schedule (Time for cooking & prep)</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn-secondary" onClick={() => setStep(2)} style={{ flex: 1, padding: '0.8rem' }}>
                <ArrowLeft size={16} /> Back
              </button>
              <button className="btn-primary" onClick={() => setStep(4)} style={{ flex: 2, padding: '0.8rem' }}>
                Next: Fitness Goal <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: FITNESS GOAL SELECTION */}
        {step === 4 && (
          <div>
            <div style={{ marginBottom: '1.75rem' }}>
              <label className="form-label" style={{ fontSize: '1rem', fontWeight: 900, marginBottom: '0.8rem', display: 'block', color: 'var(--text-primary)' }}>
                Select Your Primary Body Target
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div 
                  onClick={() => setGoal('lose')}
                  style={{
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    background: goal === 'lose' ? 'var(--bg-elevated)' : 'var(--bg-card)',
                    border: goal === 'lose' ? '2.5px solid var(--accent-gold)' : '1.5px solid var(--border-medium)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontWeight: 900, fontSize: '1.05rem', color: '#b45309', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>📉 Weight Loss (Cut)</span>
                    {goal === 'lose' && <CheckCircle2 size={16} color="var(--accent-gold)" />}
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Gradual fat loss without skipping meals or muscle degradation</p>
                </div>

                <div 
                  onClick={() => setGoal('maintain')}
                  style={{
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    background: goal === 'maintain' ? 'var(--bg-elevated)' : 'var(--bg-card)',
                    border: goal === 'maintain' ? '2.5px solid var(--accent-emerald)' : '1.5px solid var(--border-medium)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontWeight: 900, fontSize: '1.05rem', color: 'var(--accent-emerald)', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>⚖️ Maintain Weight</span>
                    {goal === 'maintain' && <CheckCircle2 size={16} color="var(--accent-emerald)" />}
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Steady energy, stamina, and zero weight fluctuation</p>
                </div>

                <div 
                  onClick={() => setGoal('gain_weight')}
                  style={{
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    background: goal === 'gain_weight' ? 'var(--bg-elevated)' : 'var(--bg-card)',
                    border: goal === 'gain_weight' ? '2.5px solid #0284c7' : '1.5px solid var(--border-medium)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontWeight: 900, fontSize: '1.05rem', color: '#0284c7', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>📈 Weight Gain (Bulk)</span>
                    {goal === 'gain_weight' && <CheckCircle2 size={16} color="#0284c7" />}
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Nutrient-dense calorie surplus for skinny frame</p>
                </div>

                <div 
                  onClick={() => setGoal('gain_muscle')}
                  style={{
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    background: goal === 'gain_muscle' ? 'var(--bg-elevated)' : 'var(--bg-card)',
                    border: goal === 'gain_muscle' ? '2.5px solid #e11d48' : '1.5px solid var(--border-medium)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontWeight: 900, fontSize: '1.05rem', color: '#e11d48', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>💪 Build Muscle (Hypertrophy)</span>
                    {goal === 'gain_muscle' && <CheckCircle2 size={16} color="#e11d48" />}
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>High protein ratio for broad shoulders & V-taper physique</p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn-secondary" onClick={() => setStep(3)} style={{ flex: 1, padding: '0.8rem' }}>
                <ArrowLeft size={16} /> Back
              </button>
              <button className="btn-primary" onClick={handleSubmit} disabled={loading} style={{ flex: 2, padding: '0.8rem' }}>
                {loading ? 'Building Personalized Plan...' : 'Generate My Student Plan 🎉'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
