import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ChartView } from '../components/ChartView';
import { WeightLogModal } from '../components/WeightLogModal';
import { calculateBmiFlexible, kgToLbs, lbsToKg, cmToInches, inchesToCm, cmToFeetInches } from '../utils/bmiCalculator';
import { Activity, Scale, AlertTriangle, Plus, Calendar, Info, Award } from 'lucide-react';

export const BmiMetricsPage = () => {
  const { onboarding } = useAuth();
  const [logs, setLogs] = useState([]);
  const [latestMetric, setLatestMetric] = useState(null);
  const [milestone, setMilestone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

  // Independent Unit Toggles!
  const [weightUnit, setWeightUnit] = useState('kg'); // 'kg' | 'lbs'
  const [heightUnit, setHeightUnit] = useState('cm'); // 'cm' | 'ft_in'
  const [waistUnit, setWaistUnit] = useState('cm'); // 'cm' | 'in'

  // Input Values
  const [heightCm, setHeightCm] = useState(onboarding?.heightCm || 170);
  const [heightFeet, setHeightFeet] = useState(5);
  const [heightInches, setHeightInches] = useState(7);
  const [weightVal, setWeightVal] = useState(onboarding?.weightKg || 70);
  const [waistVal, setWaistVal] = useState(78);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('wb_token');
      const res = await fetch('/api/metrics/logs', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setLogs(data.logs || []);
        setLatestMetric(data.latestMetric || null);
        setMilestone(data.milestone || null);
      }
    } catch (err) {
      console.error('Failed to fetch metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const sex = onboarding?.sex || 'other';
  const computed = calculateBmiFlexible({
    weightVal,
    weightUnit,
    heightVal: heightCm,
    heightUnit,
    heightFeet,
    heightInchesVal: heightInches,
    sex,
    waistVal,
    waistUnit
  });

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <div style={{
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div>
          <div className="badge badge-emerald" style={{ marginBottom: '0.4rem' }}>Flexible Unit Calculators</div>
          <h1 className="font-heading" style={{ fontSize: '2rem', fontWeight: 800 }}>BMI & Measurement Calculator</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Mix height & weight units freely: <strong>lbs + cm</strong>, <strong>ft/in + kgs</strong>, or <strong>lbs + ft/in</strong>.
          </p>
        </div>

        <button className="btn-primary" onClick={() => setIsLogModalOpen(true)} style={{ padding: '0.66rem 1.25rem' }}>
          <Plus size={16} /> Log New Weight
        </button>
      </div>

      {/* CALCULATOR & LIVE METRICS WITH SEPARATE TOGGLES */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {/* Input Card */}
        <div className="glass-card" style={{ padding: '1.75rem', background: '#141414' }}>
          <h3 className="font-heading" style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>Live Calculator Input</h3>

          {/* HEIGHT INPUT WITH UNIT TOGGLE */}
          <div className="form-group">
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
                type="number" step="0.5" placeholder="e.g. 175"
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
          <div className="form-group" style={{ marginTop: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label className="form-label">Weight Unit</label>
              <div className="unit-toggle-group">
                <button
                  type="button"
                  className={`unit-toggle-btn ${weightUnit === 'kg' ? 'active' : ''}`}
                  onClick={() => {
                    if (weightUnit === 'lbs') setWeightVal(lbsToKg(weightVal));
                    setWeightUnit('kg');
                  }}
                >
                  kgs
                </button>
                <button
                  type="button"
                  className={`unit-toggle-btn ${weightUnit === 'lbs' ? 'active' : ''}`}
                  onClick={() => {
                    if (weightUnit === 'kg') setWeightVal(kgToLbs(weightVal));
                    setWeightUnit('lbs');
                  }}
                >
                  lbs
                </button>
              </div>
            </div>
            <input 
              type="number" step="0.1" placeholder={weightUnit === 'kg' ? 'e.g. 68.5' : 'e.g. 151.0'}
              value={weightVal} onChange={(e) => setWeightVal(e.target.value)} 
              className="form-input" 
            />
          </div>

          {/* WAIST INPUT WITH UNIT TOGGLE */}
          <div className="form-group" style={{ marginTop: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label className="form-label">Waist Measurement</label>
              <div className="unit-toggle-group">
                <button
                  type="button"
                  className={`unit-toggle-btn ${waistUnit === 'cm' ? 'active' : ''}`}
                  onClick={() => setWaistUnit('cm')}
                >
                  cm
                </button>
                <button
                  type="button"
                  className={`unit-toggle-btn ${waistUnit === 'in' ? 'active' : ''}`}
                  onClick={() => setWaistUnit('in')}
                >
                  inches
                </button>
              </div>
            </div>
            <input 
              type="number" step="0.1" placeholder={waistUnit === 'cm' ? 'e.g. 78' : 'e.g. 30.7'}
              value={waistVal} onChange={(e) => setWaistVal(e.target.value)} 
              className="form-input" 
            />
          </div>
        </div>

        {/* Results Card */}
        <div className="glass-card" style={{ padding: '1.75rem', background: '#141414', textAlign: 'center' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Computed Body Mass Index</div>
          <div className="font-heading" style={{ fontSize: '3.6rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.2rem 0' }}>
            {computed.bmi}
          </div>
          <div className={`badge ${computed.badgeClass}`} style={{ fontSize: '0.85rem', padding: '0.4rem 1rem' }}>
            {computed.category}
          </div>

          {/* Dual Unit Conversions Display */}
          <div style={{
            marginTop: '1.25rem',
            padding: '1rem',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            justify: 'space-around',
            fontSize: '0.88rem'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>METRIC</div>
              <strong style={{ color: 'var(--text-primary)' }}>{computed.weightKg} kg</strong> • {computed.heightCm} cm
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>IMPERIAL</div>
              <strong style={{ color: 'var(--text-primary)' }}>{computed.weightLbs} lbs</strong> • {computed.heightFtIn}
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '1.25rem', lineHeight: '1.5' }}>
            {computed.explanation}
          </p>

          {computed.bodyFatPct && (
            <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Estimated Body Fat: </span>
              <strong style={{ color: 'var(--text-primary)' }}>{computed.bodyFatPct}%</strong>
            </div>
          )}
        </div>
      </div>

      {/* STANDARD CATEGORIES RANGE REFERENCE */}
      <div className="glass-card" style={{ padding: '1.5rem', background: '#141414', marginBottom: '2.5rem' }}>
        <h3 className="font-heading" style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>Standard BMI Category Ranges</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '0.75rem', background: 'rgba(245, 158, 11, 0.08)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
            <div style={{ fontWeight: 700, color: '#fbbf24', fontSize: '0.85rem' }}>Underweight</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>BMI &lt; 18.5</div>
          </div>
          <div style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.08)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <div style={{ fontWeight: 700, color: '#34d399', fontSize: '0.85rem' }}>Normal Weight</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>BMI 18.5 – 24.9</div>
          </div>
          <div style={{ padding: '0.75rem', background: 'rgba(245, 158, 11, 0.08)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
            <div style={{ fontWeight: 700, color: '#fbbf24', fontSize: '0.85rem' }}>Overweight</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>BMI 25.0 – 29.9</div>
          </div>
          <div style={{ padding: '0.75rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ fontWeight: 700, color: '#d4d4d8', fontSize: '0.85rem' }}>Obese</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>BMI ≥ 30.0</div>
          </div>
        </div>
        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <Info size={16} color="var(--accent-primary)" />
          <span>This calculator is an educational statistical model and is explicitly <strong>not medical advice</strong>.</span>
        </div>
      </div>

      {/* SVG TREND CHART */}
      <div className="glass-card" style={{ padding: '1.75rem', background: '#141414', marginBottom: '2.5rem' }}>
        <h3 className="font-heading" style={{ fontSize: '1.3rem', marginBottom: '1.25rem' }}>Weight & BMI History Trend</h3>
        <ChartView logs={logs} goal={onboarding?.goal} />
      </div>

      {/* HISTORICAL LOGS TABLE */}
      <div className="glass-card" style={{ padding: '1.75rem', background: '#141414' }}>
        <h3 className="font-heading" style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Timestamped Weight Log History</h3>

        {logs.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>No log entries saved yet. Click "Log New Weight" above to add your first entry.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-medium)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem' }}>Date</th>
                  <th style={{ padding: '0.75rem' }}>Weight (kgs)</th>
                  <th style={{ padding: '0.75rem' }}>Weight (lbs)</th>
                  <th style={{ padding: '0.75rem' }}>BMI</th>
                  <th style={{ padding: '0.75rem' }}>Category</th>
                  <th style={{ padding: '0.75rem' }}>Waist</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => {
                  const lbsVal = log.weightLbs || kgToLbs(log.weightKg);
                  return (
                    <tr key={log.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '0.75rem', color: 'var(--text-primary)', fontWeight: 600 }}>{log.date}</td>
                      <td style={{ padding: '0.75rem', color: 'var(--accent-primary)', fontWeight: 700 }}>{log.weightKg} kg</td>
                      <td style={{ padding: '0.75rem', color: '#fbbf24', fontWeight: 700 }}>{lbsVal} lbs</td>
                      <td style={{ padding: '0.75rem', color: 'var(--text-primary)' }}>{log.bmi}</td>
                      <td style={{ padding: '0.75rem' }}>
                        <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>{log.category}</span>
                      </td>
                      <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>
                        {log.waistCm ? `${log.waistCm} cm (${cmToInches(log.waistCm)} in)` : '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <WeightLogModal 
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        onLogSuccess={fetchLogs}
      />
    </div>
  );
};
