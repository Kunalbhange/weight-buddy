import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Dumbbell, Target, Flame, Zap, Trophy, ShieldCheck, Check, ArrowRight, Home, Building2, Sparkles, BookOpen } from 'lucide-react';

export const PhysiquePage = () => {
  const { onboarding } = useAuth();
  const [selectedGoal, setSelectedGoal] = useState(onboarding?.goal || 'gain_muscle');
  const [exerciseMode, setExerciseMode] = useState('both'); // 'both' | 'gym' | 'home'

  const goalsData = [
    {
      id: 'lose',
      title: 'Weight Loss (Cut)',
      subtitle: 'Gradual fat loss without extreme skipping or muscle loss',
      badge: '🔥 Fat Loss Focus',
      color: '#f59e0b',
      caloriesTip: 'Mild 20% deficit (~1,700 - 1,900 kcal/day)',
      macrosRatio: '30% Protein • 45% Carbs • 25% Fat',
      physiqueTarget: 'Lean Athletic & Toned',
      dormFoods: ['Oats chilla with mint chutney (₹40)', 'Sprouted moong chaat (₹25)', 'Egg bhurji with 1 roti (₹40)', 'Black coffee / Green tea'],
      trainingStrategy: '10,000 steps daily across campus + 3-4 days weight/home training to preserve lean tissue.',
      examTip: 'During exam weeks, avoid sugary late-night snacks; swap for sliced apples with peanut butter.'
    },
    {
      id: 'maintain',
      title: 'Healthy Weight Maintenance',
      subtitle: 'Steady energy, stamina, and zero weight fluctuation',
      badge: '⚖️ Stamina & Focus',
      color: '#10b981',
      caloriesTip: 'Balanced TDEE (~2,000 - 2,200 kcal/day)',
      macrosRatio: '25% Protein • 50% Carbs • 25% Fat',
      physiqueTarget: 'Balanced Fit & Energized',
      dormFoods: ['Peanut butter banana oats (₹45)', 'Chickpea wrap (₹60)', 'Rajma rice bowl (₹55)', 'Greek yogurt cups (₹65)'],
      trainingStrategy: '3 days full-body workout or recreational campus sports (badminton, basketball, swimming).',
      examTip: 'Hydrate continuously during long library sessions to avoid fatigue mistaken for hunger.'
    },
    {
      id: 'gain_weight',
      title: 'Healthy Weight Gain (Clean Bulk)',
      subtitle: 'Nutrient-dense calorie surplus for skinny students',
      badge: '📈 Calorie Surplus',
      color: '#3b82f6',
      caloriesTip: '15% surplus (~2,400 - 2,700 kcal/day)',
      macrosRatio: '25% Protein • 55% Carbs • 20% Fat',
      physiqueTarget: 'Fuller & Stronger Frame',
      dormFoods: ['High-speed banana protein shake (₹75)', 'Paneer tikka quinoa bowl (₹85)', 'Soy chunks pulao (₹45)', 'Roasted chana (₹25)'],
      trainingStrategy: 'Focus on compound movements (Squats, Deadlifts, Bench Press) 4 days a week with 2 min rest.',
      examTip: 'Keep a bag of roasted almonds and chana in your backpack to snack between back-to-back lectures.'
    },
    {
      id: 'gain_muscle',
      title: 'Build Muscle (Hypertrophy)',
      subtitle: 'High-protein diet tailored for student gym goers',
      badge: '💪 V-Taper Hypertrophy',
      color: '#f43f5e',
      caloriesTip: 'High Protein Surplus (~2,300 - 2,600 kcal/day)',
      macrosRatio: '35% Protein • 45% Carbs • 20% Fat (1.8g - 2.2g / kg)',
      physiqueTarget: 'Aesthetic V-Taper & Broad Shoulders',
      dormFoods: ['Grilled chicken energy bowl (₹120)', 'Soy chunks pulao (32g protein - ₹45)', 'Eggs & whole wheat toast (₹50)'],
      trainingStrategy: 'Student Push/Pull/Legs 3 to 6 day split. Focus on progressive overload in 8-12 rep range.',
      examTip: 'Consume 25g protein within 2 hours post-workout to maximize muscle protein synthesis.'
    }
  ];

  // Main Gym Compound Exercises vs Easy Home Alternatives
  const compoundExercises = [
    {
      target: 'Chest & Upper Body',
      gym: 'Barbell / Dumbbell Bench Press',
      home: 'Push-ups / Backpack Weighted Push-ups',
      genZTag: '🔥 Chest Builder',
      easySteps: [
        'Place hands slightly wider than shoulder-width apart.',
        'Keep body straight from head to heels like a rigid plank.',
        'Lower chest slowly until 1 inch off ground, then explode up.'
      ]
    },
    {
      target: 'Legs & Glutes',
      gym: 'Barbell Back Squats',
      home: 'Bodyweight Squats / Textbook Backpack Squats',
      genZTag: '⚡ Leg Day Essential',
      easySteps: [
        'Stand with feet shoulder-width apart, toes turned slightly out.',
        'Sit back as if sitting in an invisible chair, keeping knees tracking over toes.',
        'Push through your heels to return to starting position.'
      ]
    },
    {
      target: 'Back & Lats',
      gym: 'Barbell Deadlifts / Lat Pulldown',
      home: 'Doorframe Pulls / Heavy Backpack Bent-Over Rows',
      genZTag: '💪 Back & V-Taper',
      easySteps: [
        'Hinge forward at hips with knees slightly bent, back straight.',
        'Hold backpack or water bottle jug in both hands.',
        'Pull elbows back toward your hips, squeezing shoulder blades together.'
      ]
    },
    {
      target: 'Shoulders & Arms',
      gym: 'Overhead Barbell Press',
      home: 'Pike Push-ups / Overhead Water Jug Press',
      genZTag: '✨ Broad Shoulders',
      easySteps: [
        'Get into push-up position, then walk feet forward so hips form an inverted V.',
        'Bend elbows to lower top of your head toward the floor slowly.',
        'Push back up through your shoulders.'
      ]
    }
  ];

  const currentGoal = goalsData.find(g => g.id === selectedGoal) || goalsData[3];

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div className="badge badge-emerald" style={{ marginBottom: '0.4rem' }}>
          <Sparkles size={14} /> Gen Z Approved • Gym & Home Workouts
        </div>
        <h1 className="font-heading" style={{ fontSize: '2rem', fontWeight: 800 }}>Goal & Physique Strategy Hub</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
          Explore custom nutrition, INR hostel budgets, and student workouts (Gym vs Easy Home No-Equipment options).
        </p>
      </div>

      {/* GOAL SELECTION PILLS */}
      <div style={{
        display: 'flex',
        gap: '0.65rem',
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
                padding: '0.7rem 1.15rem',
                borderRadius: 'var(--radius-md)',
                background: isActive ? g.color : 'rgba(24, 24, 27, 0.75)',
                color: isActive ? (g.id === 'lose' ? '#000' : '#fff') : 'var(--text-primary)',
                fontWeight: 700,
                fontSize: '0.85rem',
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
        padding: '2rem',
        background: '#141414',
        border: `1px solid ${currentGoal.color}40`,
        marginBottom: '2.5rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <span className="badge" style={{ background: `${currentGoal.color}20`, color: currentGoal.color, border: `1px solid ${currentGoal.color}40`, marginBottom: '0.4rem' }}>
              {currentGoal.badge}
            </span>
            <h2 className="font-heading" style={{ fontSize: '1.6rem', fontWeight: 800 }}>{currentGoal.title}</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{currentGoal.subtitle}</p>
          </div>

          <div style={{
            padding: '0.85rem 1.25rem',
            background: 'rgba(0,0,0,0.5)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>TARGET PHYSIQUE</div>
            <div style={{ fontWeight: 800, fontSize: '1rem', color: currentGoal.color }}>{currentGoal.physiqueTarget}</div>
          </div>
        </div>

        {/* METRICS & MACROS BANNER */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem',
          marginBottom: '1.75rem'
        }}>
          <div style={{ padding: '1.1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>DAILY CALORIE STRATEGY</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>{currentGoal.caloriesTip}</div>
          </div>

          <div style={{ padding: '1.1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>MACRO SPLIT RATIO</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>{currentGoal.macrosRatio}</div>
          </div>
        </div>

        {/* STRATEGY SECTIONS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          <div style={{ padding: '1.25rem', background: 'rgba(0,0,0,0.4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.95rem', color: 'var(--accent-primary)', marginBottom: '0.75rem' }}>
              <Flame size={16} /> Best Dorm & Hostel Foods
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {currentGoal.dormFoods.map((food, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  <Check size={14} color="var(--accent-primary)" /> {food}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ padding: '1.25rem', background: 'rgba(0,0,0,0.4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.95rem', color: '#fbbf24', marginBottom: '0.75rem' }}>
              <Trophy size={16} /> Student Training Focus
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              {currentGoal.trainingStrategy}
            </p>
          </div>
        </div>
      </div>

      {/* COMPOUND EXERCISE LIBRARY (GYM VS HOME NO-EQUIPMENT EASY STEPS) */}
      <div className="glass-card" style={{ padding: '2rem', background: '#141414' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <span className="badge badge-emerald" style={{ marginBottom: '0.3rem' }}>
              <Dumbbell size={12} /> Student Workout Guide
            </span>
            <h3 className="font-heading" style={{ fontSize: '1.5rem', fontWeight: 800 }}>
              Main Compound Exercises (Gym vs Easy Home Alternatives)
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              No gym membership? Easy step-by-step home alternatives using bodyweight or a loaded backpack.
            </p>
          </div>

          {/* Filter toggle */}
          <div className="unit-toggle-group">
            <button
              className={`unit-toggle-btn ${exerciseMode === 'both' ? 'active' : ''}`}
              onClick={() => setExerciseMode('both')}
            >
              All Options
            </button>
            <button
              className={`unit-toggle-btn ${exerciseMode === 'gym' ? 'active' : ''}`}
              onClick={() => setExerciseMode('gym')}
            >
              <Building2 size={12} /> Gym Only
            </button>
            <button
              className={`unit-toggle-btn ${exerciseMode === 'home' ? 'active' : ''}`}
              onClick={() => setExerciseMode('home')}
            >
              <Home size={12} /> Home Only
            </button>
          </div>
        </div>

        {/* Compound Exercise Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {compoundExercises.map((ex, i) => (
            <div key={i} style={{
              padding: '1.25rem',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase' }}>
                    {ex.target}
                  </span>
                  <span className="badge badge-emerald" style={{ fontSize: '0.68rem' }}>{ex.genZTag}</span>
                </div>

                {/* Gym Version */}
                {(exerciseMode === 'both' || exerciseMode === 'gym') && (
                  <div style={{ padding: '0.65rem 0.85rem', background: 'rgba(0,0,0,0.5)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', marginBottom: '0.75rem' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Building2 size={12} /> GYM COMPOUND VERSION
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginTop: '0.1rem' }}>{ex.gym}</div>
                  </div>
                )}

                {/* Home Version */}
                {(exerciseMode === 'both' || exerciseMode === 'home') && (
                  <div style={{ padding: '0.65rem 0.85rem', background: 'rgba(16, 185, 129, 0.08)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(16, 185, 129, 0.25)', marginBottom: '0.75rem' }}>
                    <div style={{ fontSize: '0.72rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Home size={12} /> EASY HOME / DORM ALTERNATIVE
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginTop: '0.1rem' }}>{ex.home}</div>
                  </div>
                )}

                {/* Easy Execution Steps */}
                <div style={{ marginTop: '0.75rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <BookOpen size={12} color="var(--accent-primary)" /> EASY EXECUTION STEPS:
                  </div>
                  <ol style={{ paddingLeft: '1.2rem', fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                    {ex.easySteps.map((step, sIdx) => (
                      <li key={sIdx}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
