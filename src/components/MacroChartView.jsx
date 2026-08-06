import React from 'react';
import { PieChart, Flame, Dumbbell, Wheat, Droplet } from 'lucide-react';

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
        {/* Protein Card */}
        <div style={{
          padding: '1.25rem',
          background: 'rgba(16, 185, 129, 0.08)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid rgba(16, 185, 129, 0.25)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34d399', marginBottom: '0.4rem' }}>
            <Dumbbell size={18} />
            <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Protein ({pPct}%)</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>{protein}g</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{pCal} kcal • Muscle & Recovery</div>
        </div>

        {/* Carbs Card */}
        <div style={{
          padding: '1.25rem',
          background: 'rgba(245, 158, 11, 0.08)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid rgba(245, 158, 11, 0.25)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', marginBottom: '0.4rem' }}>
            <Wheat size={18} />
            <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Carbohydrates ({cPct}%)</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>{carbs}g</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{cCal} kcal • Brain & Daily Energy</div>
        </div>

        {/* Fats Card */}
        <div style={{
          padding: '1.25rem',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid rgba(255, 255, 255, 0.12)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#d4d4d8', marginBottom: '0.4rem' }}>
            <Droplet size={18} />
            <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Healthy Fats ({fPct}%)</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>{fat}g</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{fCal} kcal • Hormones & Health</div>
        </div>
      </div>

      {/* Visual Macro Bar */}
      <div style={{ marginTop: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
          <span>Daily Macro Ratio Distribution</span>
          <strong>{calories} Target kcal</strong>
        </div>
        <div style={{ height: '14px', borderRadius: '7px', display: 'flex', overflow: 'hidden', background: '#1a1a1a', border: '1px solid var(--border-subtle)' }}>
          <div style={{ width: `${pPct}%`, background: 'var(--accent-primary)', title: `Protein ${pPct}%` }} />
          <div style={{ width: `${cPct}%`, background: '#f59e0b', title: `Carbs ${cPct}%` }} />
          <div style={{ width: `${fPct}%`, background: '#71717a', title: `Fats ${fPct}%` }} />
        </div>
      </div>
    </div>
  );
};
