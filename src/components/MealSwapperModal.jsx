import React, { useState } from 'react';
import { X, RefreshCw, CheckCircle } from 'lucide-react';

export const MealSwapperModal = ({ isOpen, onClose, dayName, mealType, currentMeal, onSwapSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSwap = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('wb_token');
      const res = await fetch('/api/diet/swap-meal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ dayName, mealType })
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to swap meal.');

      onSwapSuccess(data);
      onClose();
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
        maxWidth: '480px',
        width: '100%',
        padding: '1.75rem',
        background: '#141414',
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

        <h3 className="font-heading" style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>
          Swap {mealType ? mealType.charAt(0).toUpperCase() + mealType.slice(1) : 'Meal'} ({dayName})
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          Don't feel like eating <strong>{currentMeal?.name}</strong>? Click below to replace it with an alternative student-friendly meal matching your dietary preferences.
        </p>

        {currentMeal && (
          <div style={{
            padding: '1rem',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '1.25rem'
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Current Selection</div>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{currentMeal.name}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-accent)' }}>
              {currentMeal.calories} kcal • P: {currentMeal.protein}g • C: {currentMeal.carbs}g • F: {currentMeal.fat}g
            </div>
          </div>
        )}

        {error && (
          <div style={{ padding: '0.75rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <button className="btn-secondary" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleSwap} disabled={loading}>
            <RefreshCw size={16} className={loading ? 'spin' : ''} />
            {loading ? 'Finding Replacement...' : 'Swap This Meal'}
          </button>
        </div>
      </div>
    </div>
  );
};
