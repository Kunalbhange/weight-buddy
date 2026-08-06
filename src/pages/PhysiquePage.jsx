import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Dumbbell, Target, Flame, Zap, Trophy, ShieldCheck, HeartPulse, Check, ArrowRight } from 'lucide-react';

export const PhysiquePage = () => {
  const { onboarding } = useAuth();
  const [selectedGoal, setSelectedGoal] = useState(onboarding?.goal || 'gain_muscle');

  const goalsData = [
    {
      id: 'lose',
      title: 'Weight Loss (Cut)',
      subtitle: 'Gradual fat loss without extreme skipping or muscle loss',
      badge: 'Fat Loss Focus',
      color: '#f59e0b',
      caloriesTip: 'Mild 20% deficit (~1,700 - 1,900 kcal/day)',
      macrosRatio: '30% Protein • 45% Carbs • 25% Fat',
      physiqueTarget: 'Lean Athletic & Toned',
      dormFoods: ['Oats chilla with mint chutney', 'Sprouted moong chaat', 'Egg bhurji with 1 roti', 'Black coffee / Green tea'],
      trainingStrategy: '10,000 steps daily across campus + 3-4 days weight training to preserve lean tissue.',
      examTip: 'During exam weeks, avoid sugary late-night snacks; swap for sliced apples with peanut butter.'
    },
    {
      id: 'maintain',
      title: 'Healthy Weight Maintenance',
      subtitle: 'Steady energy, stamina, and zero weight fluctuation',
      badge: 'Stamina & Focus',
      color: '#10b981',
      caloriesTip: 'Balanced TDEE (~2,000 - 2,200 kcal/day)',
      macrosRatio: '25% Protein • 50% Carbs • 25% Fat',
      physiqueTarget: 'Balanced Fit & Energized',
      dormFoods: ['Peanut butter banana oats', 'Chickpea & hung curd wrap', 'Rajma rice bowl', 'Greek yogurt cups'],
      trainingStrategy: '3 days full-body workout or recreational campus sports (badminton, basketball, swimming).',
      examTip: 'Hydrate continuously during long library sessions to avoid fatigue mistaken for hunger.'
    },
    {
      id: 'gain_weight',
      title: 'Healthy Weight Gain (Clean Bulk)',
      subtitle: 'Nutrient-dense calorie surplus for skinny students',
      badge: 'Calorie Surplus',
      color: '#3b82f6',
      caloriesTip: '15% surplus (~2,400 - 2,700 kcal/day)',
      macrosRatio: '25% Protein • 55% Carbs • 20% Fat',
      physiqueTarget: 'Fuller & Stronger Frame',
      dormFoods: ['High-speed banana protein shake', 'Paneer tikka quinoa bowl', 'Soy chunks pulao', 'Roasted chana & nuts'],
      trainingStrategy: 'Focus on compound movements (Squats, Deadlifts, Bench Press) 4 days a week with 2 min rest.',
      examTip: 'Keep a bag of roasted almonds and chana in your backpack to snack between back-to-back lectures.'
    },
    {
      id: 'gain_muscle',
      title: 'Build Muscle (Hypertrophy)',
      subtitle: 'High-protein diet tailored for student gym goers',
      badge: 'V-Taper Hypertrophy',
      color: '#f43f5e',
      caloriesTip: 'High Protein Surplus (~2,300 - 2,600 kcal/day)',
      macrosRatio: '35% Protein • 45% Carbs • 20% Fat (1.8g - 2.2g / kg)',
      physiqueTarget: 'Aesthetic V-Taper & Broad Shoulders',
      dormFoods: ['Grilled chicken energy bowl', 'Soy chunks pulao (32g protein)', 'Eggs & whole wheat toast', 'Cottage cheese cup'],
      trainingStrategy: 'Student Push/Pull/Legs 3 to 6 day split. Focus on progressive overload in 8-12 rep range.',
      examTip: 'Consume 25g protein within 2 hours post-workout to maximize muscle protein synthesis.'
    }
  ];

  const currentGoal = goalsData.find(g => g.id === selectedGoal) || goalsData[3];

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div className="badge badge-emerald" style={{ marginBottom: '0.4rem' }}>
          <Dumbbell size={14} /> Student Physique & Goal Strategy Hub
        </div>
        <h1 className="font-heading" style={{ fontSize: '2rem', fontWeight: 800 }}>Goal & Physique Strategy Hub</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Explore custom nutrition, macro splits, and student gym strategies for your specific body target.
        </p>
      </div>

      {/* GOAL SELECTION PILLS */}
      <div style={{
        display: 'flex',
        gap: '0.75rem',
        overflowX: 'auto',
        paddingBottom: '0.5rem',
        marginBottom: '2rem'
      }}>
        {goalsData.map(g => {
          const isActive = selectedGoal === g.id;
          return (
            <button
              key={g.id}
              onClick={() => setSelectedGoal(g.id)}
              style={{
                padding: '0.75rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                background: isActive ? g.color : 'rgba(24, 24, 27, 0.75)',
                color: isActive ? (g.id === 'lose' ? '#000' : '#fff') : 'var(--text-primary)',
                fontWeight: 700,
                fontSize: '0.88rem',
                border: isActive ? 'none' : '1px solid var(--border-subtle)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                boxShadow: isActive ? `0 0 20px ${g.color}40` : 'none'
              }}
            >
              {g.title}
            </button>
          );
        })}
      </div>

      {/* SELECTED GOAL STRATEGY DISPLAY */}
      <div className="glass-card" style={{
        padding: '2.25rem',
        background: '#141414',
        border: `1px solid ${currentGoal.color}40`
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <span className="badge" style={{ background: `${currentGoal.color}20`, color: currentGoal.color, border: `1px solid ${currentGoal.color}40`, marginBottom: '0.4rem' }}>
              {currentGoal.badge}
            </span>
            <h2 className="font-heading" style={{ fontSize: '1.75rem', fontWeight: 800 }}>{currentGoal.title}</h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{currentGoal.subtitle}</p>
          </div>

          <div style={{
            padding: '1rem 1.5rem',
            background: 'rgba(0,0,0,0.5)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>TARGET PHYSIQUE</div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: currentGoal.color }}>{currentGoal.physiqueTarget}</div>
          </div>
        </div>

        {/* METRICS & MACROS BANNER */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}>
          <div style={{ padding: '1.25rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>DAILY CALORIE STRATEGY</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>{currentGoal.caloriesTip}</div>
          </div>

          <div style={{ padding: '1.25rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>MACRO SPLIT RATIO</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>{currentGoal.macrosRatio}</div>
          </div>
        </div>

        {/* STRATEGY SECTIONS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {/* Section 1: Recommended Dorm Foods */}
          <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1rem', color: 'var(--accent-primary)', marginBottom: '0.75rem' }}>
              <Flame size={18} /> Best Dorm & Hostel Foods
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {currentGoal.dormFoods.map((food, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <Check size={14} color="var(--accent-primary)" /> {food}
                </li>
              ))}
            </ul>
          </div>

          {/* Section 2: Student Workout & Activity */}
          <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1rem', color: '#fbbf24', marginBottom: '0.75rem' }}>
              <Trophy size={18} /> Student Training & Campus Activity
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              {currentGoal.trainingStrategy}
            </p>
          </div>

          {/* Section 3: Exam Week Advice */}
          <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', gridColumn: '1 / -1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1rem', color: '#38bdf8', marginBottom: '0.5rem' }}>
              <Zap size={18} /> Exam & Midterm Week Protocol
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              {currentGoal.examTip}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
