import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { lbsToKg, inchesToCm, feetInchesToCm } from '../utils/bmiCalculator';
import { Sparkles, ArrowRight, ArrowLeft, Check, Calendar, Utensils, Target } from 'lucide-react';

export const OnboardingPage = ({ setActiveTab }) => {
  const { updateOnboardingState } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Independent Height & Weight Unit Selection
  const [heightUnit, setHeightUnit] = useState('cm'); // 'cm' | 'ft_in'
  const [weightUnit, setWeightUnit] = useState('kg'); // 'kg' | 'lbs'

  // Input Values
  const [age, setAge] = useState(20);
  const [sex, setSex] = useState('female');
  
  const [heightCm, setHeightCm] = useState(168);
  const [heightFeet, setHeightFeet] = useState(5);
  const [heightInches, setHeightInches] = useState(6);

  const [weightVal, setWeightVal] = useState(64); // kg or lbs

  const [activityLevel, setActivityLevel] = useState('light');
  const [scheduleDensity, setScheduleDensity] = useState('heavy');
  const [dietaryRestrictions, setDietaryRestrictions] = useState(['none']);
  const [goal, setGoal] = useState('maintain');

  const toggleRestriction = (tag) => {
    if (tag === 'none') {
      setDietaryRestrictions(['none']);
      return;
    }
    let updated = dietaryRestrictions.filter(r => r !== 'none');
    if (updated.includes(tag)) {
      updated = updated.filter(r => r !== tag);
    } else {
      updated.push(tag);
    }
    if (updated.length === 0) updated = ['none'];
    setDietaryRestrictions(updated);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('wb_token');

      // Standardize Height to cm
      let finalHeightCm = Number(heightCm);
      if (heightUnit === 'ft_in') {
        finalHeightCm = feetInchesToCm(heightFeet, heightInches);
      }

      // Standardize Weight to kg
      let finalWeightKg = Number(weightVal);
      if (weightUnit === 'lbs') {
        finalWeightKg = lbsToKg(weightVal);
      }

      const payload = {
        age: Number(age),
        sex,
        heightCm: Math.round(finalHeightCm),
        weightKg: parseFloat(finalWeightKg.toFixed(1)),
        activityLevel,
        scheduleDensity,
        dietaryRestrictions,
        goal
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

      if (!res.ok) throw new Error(data.error || 'Failed to submit onboarding.');

      updateOnboardingState(data.onboarding);

      // Automatically trigger meal plan generation
      await fetch('/api/diet/generate', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      setActiveTab('dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{
      maxWidth: '640px',
      margin: '3rem auto',
      padding: '0 1.5rem'
    }}>
      {/* Progress Bar */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
          <span>STEP {step} OF 4</span>
          <span>{step === 1 ? 'Body Metrics & Units' : step === 2 ? 'Schedule & Activity' : step === 3 ? 'Diet & Preferences' : 'Target Goal'}</span>
        </div>
        <div style={{ height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ width: `${(step / 4) * 100}%`, height: '100%', background: 'var(--accent-primary)', transition: 'width 0.3s ease' }} />
        </div>
      </div>

      <div className="glass-card" style={{ padding: '2.5rem', background: '#141414', border: '1px solid var(--border-medium)' }}>
        {error && (
          <div style={{ padding: '0.75rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
            {error}
          </div>
        )}

        {/* STEP 1: BASICS & FLEXIBLE UNITS */}
        {step === 1 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Sparkles size={20} color="var(--accent-primary)" />
              <h2 className="font-heading" style={{ fontSize: '1.6rem', fontWeight: 800 }}>Basic Metrics</h2>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>
              Select height and weight units independently (e.g. <strong>lbs + cm</strong>, <strong>ft/in + kgs</strong>).
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label">Age (years)</label>
                <input type="number" min="15" max="99" value={age} onChange={(e) => setAge(e.target.value)} className="form-input" />
              </div>

              <div className="form-group">
                <label className="form-label">Biological Sex</label>
                <select value={sex} onChange={(e) => setSex(e.target.value)} className="form-select">
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other / Prefer not to say</option>
                </select>
              </div>

              {/* HEIGHT INPUT WITH UNIT TOGGLE */}
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
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
                  <input 
                    type="number" step="0.5" placeholder="e.g. 168"
                    value={heightCm} onChange={(e) => setHeightCm(e.target.value)} 
                    className="form-input" 
                  />
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label className="form-label" style={{ fontSize: '0.8rem' }}>Feet (ft)</label>
                      <input type="number" min="3" max="8" value={heightFeet} onChange={(e) => setHeightFeet(e.target.value)} className="form-input" />
                    </div>
                    <div>
                      <label className="form-label" style={{ fontSize: '0.8rem' }}>Inches (in)</label>
                      <input type="number" min="0" max="11" value={heightInches} onChange={(e) => setHeightInches(e.target.value)} className="form-input" />
                    </div>
                  </div>
                )}
              </div>

              {/* WEIGHT INPUT WITH UNIT TOGGLE */}
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <label className="form-label">Weight Unit</label>
                  <div className="unit-toggle-group">
                    <button
                      type="button"
                      className={`unit-toggle-btn ${weightUnit === 'kg' ? 'active' : ''}`}
                      onClick={() => setWeightUnit('kg')}
                    >
                      kgs
                    </button>
                    <button
                      type="button"
                      className={`unit-toggle-btn ${weightUnit === 'lbs' ? 'active' : ''}`}
                      onClick={() => setWeightUnit('lbs')}
                    >
                      lbs
                    </button>
                  </div>
                </div>
                <input 
                  type="number" step="0.5" placeholder={weightUnit === 'kg' ? 'e.g. 64.0' : 'e.g. 141.0'}
                  value={weightVal} onChange={(e) => setWeightVal(e.target.value)} 
                  className="form-input" 
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: LIFESTYLE & SCHEDULE DENSITY */}
        {step === 2 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <Calendar size={20} color="var(--accent-primary)" />
              <h2 className="font-heading" style={{ fontSize: '1.6rem', fontWeight: 800 }}>Schedule & Activity</h2>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>
              College schedules vary drastically! Help us tailor recipes to your actual available time.
            </p>

            <div className="form-group">
              <label className="form-label">Class Schedule Density</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginTop: '0.25rem' }}>
                {[
                  { id: 'heavy', label: 'Heavy Schedule', desc: 'Back-to-back classes, 5-10 min quick prep' },
                  { id: 'moderate', label: 'Moderate', desc: 'Standard class load, 15 min cook time' },
                  { id: 'light', label: 'Light Schedule', desc: 'More free time, full dorm cooking' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setScheduleDensity(opt.id)}
                    style={{
                      padding: '1rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      background: scheduleDensity === opt.id ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      border: scheduleDensity === opt.id ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                      color: scheduleDensity === opt.id ? '#fff' : 'var(--text-secondary)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem', color: scheduleDensity === opt.id ? 'var(--accent-primary)' : '#fff' }}>
                      {opt.label}
                    </div>
                    <div style={{ fontSize: '0.78rem', lineHeight: '1.3' }}>{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '1.5rem' }}>
              <label className="form-label">General Physical Activity Level</label>
              <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)} className="form-select">
                <option value="sedentary">Sedentary (Desk work, mostly sitting)</option>
                <option value="light">Lightly Active (Walking across campus daily)</option>
                <option value="moderate">Moderately Active (Light exercise 3-4 days/wk)</option>
                <option value="active">Active (Intense workouts / sports 5+ days/wk)</option>
              </select>
            </div>
          </div>
        )}

        {/* STEP 3: DIETARY PREFERENCES */}
        {step === 3 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <Utensils size={20} color="var(--accent-primary)" />
              <h2 className="font-heading" style={{ fontSize: '1.6rem', fontWeight: 800 }}>Dietary Preferences</h2>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>
              Select any dietary guidelines or restrictions you follow.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
              {[
                { id: 'none', label: 'No Restrictions' },
                { id: 'vegetarian', label: 'Vegetarian' },
                { id: 'vegan', label: 'Vegan' },
                { id: 'halal', label: 'Halal' },
                { id: 'kosher', label: 'Kosher' },
              ].map(item => {
                const isSelected = dietaryRestrictions.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleRestriction(item.id)}
                    style={{
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      background: isSelected ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      border: isSelected ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                      color: isSelected ? 'var(--accent-primary)' : 'var(--text-primary)',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer'
                    }}
                  >
                    <span>{item.label}</span>
                    {isSelected && <Check size={16} />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: GOAL */}
        {step === 4 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <Target size={20} color="var(--accent-primary)" />
              <h2 className="font-heading" style={{ fontSize: '1.6rem', fontWeight: 800 }}>Your Core Goal</h2>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>
              What is your primary focus for this semester?
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { id: 'maintain', label: 'Maintain Healthy Weight', desc: 'Balanced calorie intake to keep your current energy steady.' },
                { id: 'lose', label: 'Gradual Weight Loss', desc: 'Mild 20% calorie deficit without extreme skipping or starving.' },
                { id: 'gain_weight', label: 'Healthy Weight Gain', desc: 'Nutrient-dense 15% calorie surplus for energy.' },
                { id: 'gain_muscle', label: 'Build Muscle & Strength', desc: 'High-protein surplus tailored for campus gym goers.' },
              ].map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setGoal(item.id)}
                  style={{
                    padding: '1rem 1.25rem',
                    borderRadius: 'var(--radius-sm)',
                    background: goal === item.id ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    border: goal === item.id ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                    color: goal === item.id ? '#fff' : 'var(--text-secondary)',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: goal === item.id ? 'var(--accent-primary)' : '#fff', marginBottom: '0.2rem' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '0.82rem' }}>{item.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* NAVIGATION BUTTONS */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
          {step > 1 ? (
            <button className="btn-secondary" onClick={() => setStep(step - 1)} disabled={loading}>
              <ArrowLeft size={16} /> Back
            </button>
          ) : <div />}

          {step < 4 ? (
            <button className="btn-primary" onClick={() => setStep(step + 1)}>
              Next Step <ArrowRight size={16} />
            </button>
          ) : (
            <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Generating Custom Plan...' : 'Finish & View Plan'} <Check size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
