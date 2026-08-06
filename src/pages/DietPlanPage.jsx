import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/currency';
import { MealSwapperModal } from '../components/MealSwapperModal';
import { Utensils, RefreshCw, DollarSign, Clock, Flame, Sparkles, AlertCircle } from 'lucide-react';

export const DietPlanPage = () => {
  const { onboarding, currency } = useAuth();
  const [plan, setPlan] = useState(null);
  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  // Meal swap modal
  const [swapModalState, setSwapModalState] = useState({ isOpen: false, dayName: '', mealType: '', currentMeal: null });

  const fetchPlan = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('wb_token');
      const res = await fetch('/api/diet/plan', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setPlan(data.plan);
    } catch (err) {
      console.error('Failed to fetch plan:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlan();
  }, []);

  const days = plan?.days || [];
  const currentDay = days[activeDayIdx] || days[0];

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
          <div className="badge badge-emerald" style={{ marginBottom: '0.4rem' }}>
            <Sparkles size={14} /> Rule-Based Student Diet Engine
          </div>
          <h1 className="font-heading" style={{ fontSize: '2rem', fontWeight: 800 }}>Weekly Diet Plan</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            Customized for your {onboarding?.goal || 'maintain'} goal • Daily Calorie Target: <strong>{plan?.dailyCalorieTarget || 2100} kcal</strong>
          </p>
        </div>

        <button 
          className="btn-secondary" 
          onClick={async () => {
            const token = localStorage.getItem('wb_token');
            await fetch('/api/diet/generate', { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } });
            fetchPlan();
          }}
          style={{ padding: '0.6rem 1.1rem', fontSize: '0.85rem' }}
        >
          <RefreshCw size={14} /> Regenerate Full Week
        </button>
      </div>

      {/* DAY SELECTION TABS */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        overflowX: 'auto',
        paddingBottom: '0.5rem',
        marginBottom: '2rem'
      }}>
        {days.map((d, idx) => {
          const isActive = activeDayIdx === idx;
          return (
            <button
              key={d.day}
              onClick={() => setActiveDayIdx(idx)}
              style={{
                padding: '0.75rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                background: isActive ? 'var(--accent-primary)' : 'rgba(24, 24, 27, 0.7)',
                color: isActive ? '#000' : 'var(--text-primary)',
                fontWeight: 700,
                fontSize: '0.88rem',
                border: isActive ? 'none' : '1px solid var(--border-subtle)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
            >
              {d.day}
            </button>
          );
        })}
      </div>

      {/* DAY MEALS DISPLAY */}
      {currentDay && (
        <div>
          {/* Day Totals Summary */}
          <div style={{
            display: 'flex',
            justify: 'space-around',
            gap: '1rem',
            padding: '1.25rem',
            background: 'rgba(24, 24, 27, 0.7)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '2rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>DAY CALORIES</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent-primary)' }}>{currentDay.totals.calories} kcal</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PROTEIN</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>{currentDay.totals.protein}g</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>CARBS</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>{currentDay.totals.carbs}g</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>FAT</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>{currentDay.totals.fat}g</div>
            </div>
          </div>

          {/* Meal Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {['breakfast', 'lunch', 'dinner', 'snack'].map((type) => {
              const meal = currentDay.meals[type];
              if (!meal) return null;
              const formattedPrice = formatCurrency(meal.priceInr || 50, currency);
              return (
                <div key={type} className="glass-card" style={{ padding: '1.5rem', background: '#141414', border: '1px solid var(--border-medium)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                      {type}
                    </span>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      {meal.isBudget && (
                        <span className="badge badge-amber" style={{ fontSize: '0.7rem' }}>
                          Budget ({formattedPrice})
                        </span>
                      )}
                      <span className="badge badge-zinc" style={{ fontSize: '0.7rem' }}>
                        <Clock size={12} /> {meal.prepMinutes} min prep
                      </span>
                    </div>
                  </div>

                  <h3 className="font-heading" style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>{meal.name}</h3>

                  <div style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: 700, marginBottom: '1rem' }}>
                    {meal.calories} kcal • P: {meal.protein}g • C: {meal.carbs}g • F: {meal.fat}g
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>INGREDIENTS:</div>
                    <ul style={{ paddingLeft: '1.2rem', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                      {meal.ingredients.map((ing, i) => (
                        <li key={i}>{ing}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>QUICK PREP:</div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>{meal.instructions}</p>
                  </div>

                  <button 
                    onClick={() => setSwapModalState({ isOpen: true, dayName: currentDay.day, mealType: type, currentMeal: meal })}
                    className="btn-secondary"
                    style={{ width: '100%', padding: '0.5rem', fontSize: '0.8rem' }}
                  >
                    <RefreshCw size={14} /> Swap This Meal
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SWAP MODAL */}
      <MealSwapperModal 
        isOpen={swapModalState.isOpen}
        onClose={() => setSwapModalState({ isOpen: false, dayName: '', mealType: '', currentMeal: null })}
        dayName={swapModalState.dayName}
        mealType={swapModalState.mealType}
        currentMeal={swapModalState.currentMeal}
        onSwapSuccess={fetchPlan}
      />
    </div>
  );
};
