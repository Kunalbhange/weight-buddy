import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { calculateBmiFlexible, feetInchesToCm, lbsToKg } from '../utils/bmiCalculator';
import { ArrowRight, ArrowLeft, Check, Sparkles, Utensils, Scale, Activity, Flame, ShieldCheck } from 'lucide-react';

export const OnboardingPage = ({ setActiveTab }) => {
  const { fetchMe, updateOnboardingState } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Form State
  const [age, setAge] = useState(21);
  const [sex, setSex] = useState('male');
  
  // Height & Weight independent unit controls
  const [heightUnit, setHeightUnit] = useState('cm');
  const [heightCm, setHeightCm] = useState(172);
  const [heightFeet, setHeightFeet] = useState(5);
  const [heightInches, setHeightInches] = useState(8);

  const [weightUnit, setWeightUnit] = useState('kg');
  const [weightVal, setWeightVal] = useState(68);

  const [activityLevel, setActivityLevel] = useState('moderate');
  const [scheduleDensity, setScheduleDensity] = useState('moderate');
  
  // Dietary Preference (Veg, Non-Veg, Vegan)
  const [dietaryCategory, setDietaryCategory] = useState('vegetarian');

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
      
      // Calculate final Height in CM & Weight in KG
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

      updateOnboardingState(data.onboarding);
      await fetchMe();
      setActiveTab('dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '780px', margin: '2rem auto', padding: '0 1.5rem' }}>
      <div className="glass-card" style={{ padding: '2.5rem 2rem', background: '#141414', border: '1px solid var(--border-medium)' }}>
        
        {/* PROGRESS STEP INDICATOR */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <span className="badge badge-emerald" style={{ marginBottom: '0.3rem' }}>Step {step} of 3</span>
            <h2 className="font-heading" style={{ fontSize: '1.6rem', fontWeight: 800 }}>
              {step === 1 && 'Student Profile & Body Baseline'}
              {step === 2 && 'Dietary Preference & Campus Schedule'}
              {step === 3 && 'Fitness & Physique Target'}
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {[1, 2, 3].map(i => (
              <div 
                key={i} 
                style={{
                  width: step === i ? '24px' : '10px',
                  height: '8px',
                  borderRadius: '4px',
                  background: step === i ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease'
                }} 
              />
            ))}
          </div>
        </div>

        {error && (
          <div style={{ padding: '0.75rem 1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#fca5a5', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}

        {/* STEP 1: BODY BASELINE & UNITS */}
        {step === 1 && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.2rem' }}>
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

            {/* WEIGHT CONTROLS */}
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <label className="form-label">Weight Unit</label>
                <div className="unit-toggle-group">
                  <button type="button" className={`unit-toggle-btn ${weightUnit === 'kg' ? 'active' : ''}`} onClick={() => setWeightUnit('kg')}>kgs</button>
                  <button type="button" className={`unit-toggle-btn ${weightUnit === 'lbs' ? 'active' : ''}`} onClick={() => setWeightUnit('lbs')}>lbs</button>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.2rem' }}>
                <span>Current Weight</span>
                <strong>{weightVal} {weightUnit}</strong>
              </div>
              <input type="range" min={weightUnit === 'kg' ? "35" : "75"} max={weightUnit === 'kg' ? "160" : "350"} value={weightVal} onChange={(e) => setWeightVal(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--accent-primary)' }} />
            </div>

            {/* PREVIEW BASELINE CARD */}
            <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.5)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>CALCULATED BASELINE BMI</div>
              <div className="font-heading" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>{previewMetrics.bmi}</div>
              <div className={`badge ${previewMetrics.badgeClass}`}>{previewMetrics.category}</div>
            </div>

            <button className="btn-primary" onClick={() => setStep(2)} style={{ width: '100%', padding: '0.75rem' }}>
              Next: Dietary Preferences <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* STEP 2: DIETARY PREFERENCE (VEG / NON-VEG / VEGAN) & SCHEDULE */}
        {step === 2 && (
          <div>
            {/* DIETARY PREFERENCE SELECTION */}
            <div style={{ marginBottom: '1.75rem' }}>
              <label className="form-label" style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.6rem', display: 'block' }}>
                Select Your Dietary Preference
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {/* Veg Option */}
                <div 
                  onClick={() => setDietaryCategory('vegetarian')}
                  style={{
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    background: dietaryCategory === 'vegetarian' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    border: dietaryCategory === 'vegetarian' ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>🥦</div>
                  <div style={{ fontWeight: 800, fontSize: '1.05rem', color: dietaryCategory === 'vegetarian' ? 'var(--accent-primary)' : '#fff' }}>Veg (Vegetarian)</div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>Includes dairy, cottage cheese (paneer), legumes, & oats (No meat or eggs)</p>
                </div>

                {/* Non-Veg Option */}
                <div 
                  onClick={() => setDietaryCategory('non-veg')}
                  style={{
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    background: dietaryCategory === 'non-veg' ? 'rgba(244, 63, 94, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    border: dietaryCategory === 'non-veg' ? '2px solid #f43f5e' : '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>🍗</div>
                  <div style={{ fontWeight: 800, fontSize: '1.05rem', color: dietaryCategory === 'non-veg' ? '#f43f5e' : '#fff' }}>Non-Veg (Non-Vegetarian)</div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>Includes eggs, grilled chicken breast, tuna bowls, & all foods</p>
                </div>

                {/* Vegan Option */}
                <div 
                  onClick={() => setDietaryCategory('vegan')}
                  style={{
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    background: dietaryCategory === 'vegan' ? 'rgba(52, 211, 153, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    border: dietaryCategory === 'vegan' ? '2px solid #34d399' : '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>🌿</div>
                  <div style={{ fontWeight: 800, fontSize: '1.05rem', color: dietaryCategory === 'vegan' ? '#34d399' : '#fff' }}>Vegan (Plant-Based)</div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>100% plant-based (soya chunks, chickpeas, fruit, nuts; no dairy/eggs)</p>
                </div>
              </div>
            </div>

            {/* CAMPUS SCHEDULE DENSITY */}
            <div className="form-group" style={{ marginBottom: '1.75rem' }}>
              <label className="form-label">Campus Schedule Density</label>
              <select value={scheduleDensity} onChange={(e) => setScheduleDensity(e.target.value)} className="form-select">
                <option value="heavy">⚡ Heavy Class Schedule (Quick 5-10 minute grab & go meals)</option>
                <option value="moderate">⚖️ Moderate Schedule (Standard 10-15 minute meals)</option>
                <option value="light">🌿 Light Schedule (Time for cooking & prep)</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn-secondary" onClick={() => setStep(1)} style={{ flex: 1, padding: '0.75rem' }}>
                <ArrowLeft size={16} /> Back
              </button>
              <button className="btn-primary" onClick={() => setStep(3)} style={{ flex: 2, padding: '0.75rem' }}>
                Next: Fitness Goal <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: FITNESS GOAL SELECTION */}
        {step === 3 && (
          <div>
            <div style={{ marginBottom: '1.75rem' }}>
              <label className="form-label" style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.6rem', display: 'block' }}>
                Select Your Primary Body Goal
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div 
                  onClick={() => setGoal('lose')}
                  style={{
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    background: goal === 'lose' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    border: goal === 'lose' ? '2px solid #f59e0b' : '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#f59e0b', marginBottom: '0.2rem' }}>📉 Weight Loss (Cut)</div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Gradual fat loss without extreme skipping or muscle loss</p>
                </div>

                <div 
                  onClick={() => setGoal('maintain')}
                  style={{
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    background: goal === 'maintain' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    border: goal === 'maintain' ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--accent-primary)', marginBottom: '0.2rem' }}>⚖️ Maintain Weight</div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Steady energy, stamina, and zero weight fluctuation</p>
                </div>

                <div 
                  onClick={() => setGoal('gain_weight')}
                  style={{
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    background: goal === 'gain_weight' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    border: goal === 'gain_weight' ? '2px solid #3b82f6' : '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#3b82f6', marginBottom: '0.2rem' }}>📈 Weight Gain (Clean Bulk)</div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Nutrient-dense calorie surplus for skinny frame</p>
                </div>

                <div 
                  onClick={() => setGoal('gain_muscle')}
                  style={{
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    background: goal === 'gain_muscle' ? 'rgba(244, 63, 94, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    border: goal === 'gain_muscle' ? '2px solid #f43f5e' : '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#f43f5e', marginBottom: '0.2rem' }}>💪 Build Muscle (Hypertrophy)</div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>High protein ratio for broad shoulders & V-taper physique</p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn-secondary" onClick={() => setStep(2)} style={{ flex: 1, padding: '0.75rem' }}>
                <ArrowLeft size={16} /> Back
              </button>
              <button className="btn-primary" onClick={handleSubmit} disabled={loading} style={{ flex: 2, padding: '0.75rem' }}>
                {loading ? 'Building Personalized Plan...' : 'Generate My Student Plan 🎉'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
