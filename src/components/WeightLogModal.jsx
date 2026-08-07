import React, { useState } from 'react';
import { X, Scale, CheckCircle } from 'lucide-react';

export const WeightLogModal = ({ isOpen, onClose, onLogSuccess }) => {
  const [weightUnit, setWeightUnit] = useState('kg'); // 'kg' | 'lbs'
  const [waistUnit, setWaistUnit] = useState('cm'); // 'cm' | 'in'
  
  const [weightVal, setWeightVal] = useState('');
  const [waistVal, setWaistVal] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('wb_token');
      // Pass weightUnit and waistUnit separately
      const unitSystem = weightUnit === 'lbs' ? 'imperial' : 'metric';
      
      const res = await fetch('/api/metrics/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ weightVal, waistVal, unitSystem, date })
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to log weight.');

      onLogSuccess(data);
      onClose();
      setWeightVal('');
      setWaistVal('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div className="glass-card animate-fade-in" style={{
        maxWidth: '460px',
        width: '100%',
        padding: '1.75rem',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-medium)',
        position: 'relative'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute',
          top: '1.25rem',
          right: '1.25rem',
          background: 'none',
          border: 'none',
          color: 'var(--text-muted)',
          cursor: 'pointer'
        }}>
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Scale size={22} color="var(--accent-primary)" />
          <h3 className="font-heading" style={{ fontSize: '1.3rem' }}>Log Weight Entry</h3>
        </div>

        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          Mix units as you prefer. BMI and history logs will compute conversions automatically.
        </p>

        {error && (
          <div style={{ padding: '0.75rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* WEIGHT FIELD WITH UNIT TOGGLE */}
          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
              <label className="form-label">Weight</label>
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
              type="number" 
              step="0.1" 
              placeholder={weightUnit === 'kg' ? 'e.g. 68.5' : 'e.g. 151.0'}
              className="form-input"
              value={weightVal}
              onChange={(e) => setWeightVal(e.target.value)}
              required
            />
          </div>

          {/* WAIST FIELD WITH UNIT TOGGLE */}
          <div className="form-group" style={{ marginTop: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
              <label className="form-label">Waist Measurement [Optional]</label>
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
              type="number" 
              step="0.1" 
              placeholder={waistUnit === 'cm' ? 'e.g. 78' : 'e.g. 30.7'}
              className="form-input"
              value={waistVal}
              onChange={(e) => setWaistVal(e.target.value)}
            />
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Used for formula-based body fat estimation.</span>
          </div>

          <div className="form-group" style={{ marginTop: '1.25rem' }}>
            <label className="form-label">Date</label>
            <input 
              type="date" 
              className="form-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
            <button type="button" className="btn-secondary" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              <CheckCircle size={16} />
              {loading ? 'Saving...' : 'Save Log'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
