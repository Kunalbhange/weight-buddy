import React from 'react';
import { Flame, Dumbbell, Wheat, Droplet } from 'lucide-react';

export const MacroChartView = ({ calories = 2100, protein = 130, carbs = 240, fat = 60 }) => {
  const pCal = protein * 4;
  const cCal = carbs * 4;
  const fCal = fat * 9;
  const totalCal = pCal + cCal + fCal || 1;

  const pPct = Math.round((pCal / totalCal) * 100);
  const cPct = Math.round((cCal / totalCal) * 100);
  const fPct = Math.round((fCal / totalCal) * 100);

  return (
    <div style={{ width: '100%' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.25rem',
        marginBottom: '1.5rem'
      }}>
        {/* Protein Card - Warm Gold */}
        <div style={{
          padding: '1.25rem',
          background: 'rgba(245, 158, 11, 0.1)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid rgba(245, 158, 11, 0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', marginBottom: '0.4rem', fontWeight: 800 }}>
            <Dumbbell size={18} color="#fbbf24" />
            <span style={{ fontSize: '0.95rem' }}>Protein ({pPct}%)</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff' }}>{protein}g</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{pCal} kcal • Muscle & Recovery</div>
        </div>

        {/* Carbs Card - Sapphire Blue */}
        <div style={{
          padding: '1.25rem',
          background: 'rgba(37, 99, 235, 0.1)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid rgba(37, 99, 235, 0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#60a5fa', marginBottom: '0.4rem', fontWeight: 800 }}>
            <Wheat size={18} color="#60a5fa" />
            <span style={{ fontSize: '0.95rem' }}>Carbohydrates ({cPct}%)</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff' }}>{carbs}g</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{cCal} kcal • Brain & Daily Energy</div>
        </div>

        {/* Fats Card - Platinum Slate */}
        <div style={{
          padding: '1.25rem',
          background: 'rgba(255, 255, 255, 0.06)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid rgba(255, 255, 255, 0.16)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e5e7eb', marginBottom: '0.4rem', fontWeight: 800 }}>
            <Droplet size={18} color="#e5e7eb" />
            <span style={{ fontSize: '0.95rem' }}>Healthy Fats ({fPct}%)</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff' }}>{fat}g</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{fCal} kcal • Hormones & Health</div>
        </div>
      </div>

      {/* Visual Macro Bar */}
      <div style={{ marginTop: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', fontWeight: 600 }}>
          <span>Daily Macro Ratio Distribution</span>
          <strong style={{ color: '#ffffff' }}>{calories} Target kcal</strong>
        </div>
        <div style={{ height: '14px', borderRadius: '7px', display: 'flex', overflow: 'hidden', background: '#11131a', border: '1px solid var(--border-subtle)' }}>
          <div style={{ width: `${pPct}%`, background: '#f59e0b', title: `Protein ${pPct}%` }} />
          <div style={{ width: `${cPct}%`, background: '#2563eb', title: `Carbs ${cPct}%` }} />
          <div style={{ width: `${fPct}%`, background: '#9ca3af', title: `Fats ${fPct}%` }} />
        </div>
      </div>
    </div>
  );
};
