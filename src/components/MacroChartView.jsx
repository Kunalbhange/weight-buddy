import React from 'react';
import { Dumbbell, Wheat, Droplet } from 'lucide-react';

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
        {/* Protein Card - Electric Violet */}
        <div style={{
          padding: '1.25rem',
          background: 'rgba(139, 92, 246, 0.12)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid rgba(139, 92, 246, 0.35)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#a78bfa', marginBottom: '0.4rem', fontWeight: 800 }}>
            <Dumbbell size={18} color="#a78bfa" />
            <span style={{ fontSize: '0.95rem' }}>Protein ({pPct}%)</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ffffff' }}>{protein}g</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{pCal} kcal • Muscle & Recovery</div>
        </div>

        {/* Carbs Card - Cyber Cyan */}
        <div style={{
          padding: '1.25rem',
          background: 'rgba(6, 182, 212, 0.12)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid rgba(6, 182, 212, 0.35)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#22d3ee', marginBottom: '0.4rem', fontWeight: 800 }}>
            <Wheat size={18} color="#22d3ee" />
            <span style={{ fontSize: '0.95rem' }}>Carbohydrates ({cPct}%)</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ffffff' }}>{carbs}g</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{cCal} kcal • Brain & Daily Energy</div>
        </div>

        {/* Fats Card - Platinum Slate */}
        <div style={{
          padding: '1.25rem',
          background: 'rgba(255, 255, 255, 0.06)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid rgba(255, 255, 255, 0.18)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e2e8f0', marginBottom: '0.4rem', fontWeight: 800 }}>
            <Droplet size={18} color="#e2e8f0" />
            <span style={{ fontSize: '0.95rem' }}>Healthy Fats ({fPct}%)</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ffffff' }}>{fat}g</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{fCal} kcal • Hormones & Health</div>
        </div>
      </div>

      {/* Visual Macro Bar */}
      <div style={{ marginTop: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', fontWeight: 600 }}>
          <span>Daily Macro Ratio Distribution</span>
          <strong style={{ color: '#ffffff' }}>{calories} Target kcal</strong>
        </div>
        <div style={{ height: '14px', borderRadius: '7px', display: 'flex', overflow: 'hidden', background: '#0d0e14', border: '1px solid var(--border-subtle)' }}>
          <div style={{ width: `${pPct}%`, background: '#8b5cf6', title: `Protein ${pPct}%` }} />
          <div style={{ width: `${cPct}%`, background: '#06b6d4', title: `Carbs ${cPct}%` }} />
          <div style={{ width: `${fPct}%`, background: '#94a3b8', title: `Fats ${fPct}%` }} />
        </div>
      </div>
    </div>
  );
};
