import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ChartView } from '../components/ChartView';
import { WeightLogModal } from '../components/WeightLogModal';
import { Activity, Scale, AlertTriangle, Plus, Calendar, Info, Award } from 'lucide-react';

export const BmiMetricsPage = () => {
  const { onboarding } = useAuth();
  const [logs, setLogs] = useState([]);
  const [latestMetric, setLatestMetric] = useState(null);
  const [milestone, setMilestone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

  // Live Calculator inputs
  const [calcWeight, setCalcWeight] = useState(onboarding?.weightKg || 70);
  const [calcHeight, setCalcHeight] = useState(onboarding?.heightCm || 170);
  const [calcWaist, setCalcWaist] = useState(78);

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

  // Compute live preview numbers
  const heightM = Number(calcHeight) / 100;
  const computedBmi = heightM > 0 ? parseFloat((Number(calcWeight) / (heightM * heightM)).toFixed(1)) : 22.0;

  let category = 'Normal';
  let categoryBadgeClass = 'badge-emerald';
  let explanation = 'Your weight is in a healthy, balanced standard range for your height.';

  if (computedBmi < 18.5) {
    category = 'Underweight';
    categoryBadgeClass = 'badge-amber';
    explanation = 'Your BMI is below the standard recommendation. Focus on nutrient-dense meals and steady energy.';
  } else if (computedBmi >= 25 && computedBmi < 30) {
    category = 'Overweight';
    categoryBadgeClass = 'badge-amber';
    explanation = 'Your weight is slightly above average for your height. Small consistent diet tweaks yield steady results.';
  } else if (computedBmi >= 30) {
    category = 'Obese';
    categoryBadgeClass = 'badge-zinc';
    explanation = 'Your BMI is elevated. Focus on gradual, sustainable habits without drastic calorie restrictions.';
  }

  // Body fat calculation
  let computedBodyFat = null;
  if (calcWaist && calcHeight) {
    const sex = onboarding?.sex || 'other';
    if (sex === 'male') {
      computedBodyFat = parseFloat((64 - (20 * (calcHeight / calcWaist))).toFixed(1));
    } else {
      computedBodyFat = parseFloat((76 - (20 * (calcHeight / calcWaist))).toFixed(1));
    }
    if (computedBodyFat < 5) computedBodyFat = 5;
    if (computedBodyFat > 50) computedBodyFat = 50;
  }

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
          <div className="badge badge-emerald" style={{ marginBottom: '0.4rem' }}>Body Composition & Trends</div>
          <h1 className="font-heading" style={{ fontSize: '2rem', fontWeight: 800 }}>BMI & Measurement Calculator</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Instant mathematical BMI calculation, waist ratio analysis, and timestamped progress history.
          </p>
        </div>

        <button className="btn-primary" onClick={() => setIsLogModalOpen(true)} style={{ padding: '0.66rem 1.25rem' }}>
          <Plus size={16} /> Log New Weight
        </button>
      </div>

      {/* CALCULATOR & LIVE METRICS SECTION */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {/* Input Card */}
        <div className="glass-card" style={{ padding: '1.75rem', background: '#141414' }}>
          <h3 className="font-heading" style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>Live Calculator Input</h3>

          <div className="form-group">
            <label className="form-label">Height (cm)</label>
            <input type="number" value={calcHeight} onChange={(e) => setCalcHeight(e.target.value)} className="form-input" />
          </div>

          <div className="form-group">
            <label className="form-label">Weight (kg)</label>
            <input type="number" step="0.1" value={calcWeight} onChange={(e) => setCalcWeight(e.target.value)} className="form-input" />
          </div>

          <div className="form-group">
            <label className="form-label">Waist Circumference (cm) [Optional]</label>
            <input type="number" step="0.5" value={calcWaist} onChange={(e) => setCalcWaist(e.target.value)} className="form-input" />
          </div>
        </div>

        {/* Results Card */}
        <div className="glass-card" style={{ padding: '1.75rem', background: '#141414', textAlign: 'center' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Computed Body Mass Index</div>
          <div className="font-heading" style={{ fontSize: '3.6rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.2rem 0' }}>
            {computedBmi}
          </div>
          <div className={`badge ${categoryBadgeClass}`} style={{ fontSize: '0.85rem', padding: '0.4rem 1rem' }}>
            {category}
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '1.25rem', lineHeight: '1.5' }}>
            {explanation}
          </p>

          {computedBodyFat && (
            <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Estimated Body Fat: </span>
              <strong style={{ color: 'var(--text-primary)' }}>{computedBodyFat}%</strong>
            </div>
          )}
        </div>
      </div>

      {/* STANDARD CATEGORIES RANGE REFERENCE */}
      <div className="glass-card" style={{ padding: '1.5rem', background: '#141414', marginBottom: '2.5rem' }}>
        <h3 className="font-heading" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Standard BMI Category Ranges</h3>
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
        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
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
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No log entries saved yet. Click "Log New Weight" above to add your first entry.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-medium)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem' }}>Date</th>
                  <th style={{ padding: '0.75rem' }}>Weight</th>
                  <th style={{ padding: '0.75rem' }}>BMI</th>
                  <th style={{ padding: '0.75rem' }}>Category</th>
                  <th style={{ padding: '0.75rem' }}>Waist</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '0.75rem', color: 'var(--text-primary)', fontWeight: 600 }}>{log.date}</td>
                    <td style={{ padding: '0.75rem', color: 'var(--accent-primary)', fontWeight: 700 }}>{log.weightKg} kg</td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-primary)' }}>{log.bmi}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>{log.category}</span>
                    </td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{log.waistCm ? `${log.waistCm} cm` : '—'}</td>
                  </tr>
                ))}
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
