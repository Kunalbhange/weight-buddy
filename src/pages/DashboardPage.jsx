import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/currency';
import { ChartView } from '../components/ChartView';
import { MacroChartView } from '../components/MacroChartView';
import { WeightLogModal } from '../components/WeightLogModal';
import { MealSwapperModal } from '../components/MealSwapperModal';
import { 
  Utensils, Activity, Bot, Sparkles, Scale, RefreshCw, ChevronLeft, ChevronRight, 
  DollarSign, Clock, AlertTriangle, Lightbulb, Flame, Dumbbell 
} from 'lucide-react';

export const DashboardPage = ({ setActiveTab }) => {
  const { user, onboarding, currency } = useAuth();
  const [activeSlide, setActiveSlide] = useState(0);
  const [mealPlan, setMealPlan] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [swapModalState, setSwapModalState] = useState({ isOpen: false, dayName: '', mealType: '', currentMeal: null });

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('wb_token');
      const headers = { 'Authorization': `Bearer ${token}` };

      const [planRes, metricsRes] = await Promise.all([
        fetch('/api/diet/plan', { headers }),
        fetch('/api/metrics/logs', { headers })
      ]);

      const planData = await planRes.json();
      const metricsData = await metricsRes.json();

      if (planRes.ok) setMealPlan(planData.plan);
      if (metricsRes.ok) {
        setLogs(metricsData.logs || []);
        setMetrics(metricsData.latestMetric || null);
      }
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todayPlan = mealPlan?.days?.find(d => d.day.toLowerCase() === todayName.toLowerCase()) || mealPlan?.days?.[0];

  // 6 Clean Dashboard Slides (Automations Removed)
  const slides = [
    { id: 'meals', title: "Today's Meal Plan", icon: Utensils },
    { id: 'bmi', title: "BMI Snapshot", icon: Activity },
    { id: 'trend', title: "Weight Trend Chart", icon: Scale },
    { id: 'macros', title: "Nutrition & Macro Distribution", icon: Flame },
    { id: 'aiTip', title: "AI Tip of the Day", icon: Bot },
    { id: 'gymPosters', title: "Gym & Fitness Motivation", icon: Dumbbell }
  ];

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* HEADER GREETING & QUICK ACTIONS */}
      <div style={{
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div>
          <h1 className="font-heading" style={{ fontSize: '2.1rem', fontWeight: 800 }}>
            Hey, {user?.name || 'Student'}! 👋
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.2rem' }}>
            {onboarding?.scheduleDensity === 'heavy' ? '⚡ Heavy Schedule Mode Active (Quick 5-10m Meals)' : '🎯 Active Goal: Maintain & Build Energy'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn-secondary" onClick={() => setIsLogModalOpen(true)} style={{ padding: '0.6rem 1.1rem', fontSize: '0.9rem' }}>
            <Scale size={16} /> Log Weight
          </button>
          <button className="btn-primary" onClick={() => setActiveTab('ai')} style={{ padding: '0.6rem 1.1rem', fontSize: '0.9rem' }}>
            <Bot size={16} /> Ask AI Assistant
          </button>
        </div>
      </div>

      {/* SLIDE CARDS TAB NAVIGATOR */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '1.5rem',
        overflowX: 'auto',
        paddingBottom: '0.5rem'
      }}>
        {slides.map((slide, idx) => {
          const Icon = slide.icon;
          const isActive = activeSlide === idx;
          return (
            <button
              key={slide.id}
              onClick={() => setActiveSlide(idx)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.6rem 1.2rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.88rem',
                fontWeight: 700,
                color: isActive ? '#000' : 'var(--text-secondary)',
                background: isActive ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.03)',
                border: isActive ? 'none' : '1px solid var(--border-subtle)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              <Icon size={16} color={isActive ? '#000' : 'currentColor'} />
              {slide.title}
            </button>
          );
        })}
      </div>

      {/* SLIDE DISPLAY CONTAINER */}
      <div className="glass-card" style={{
        padding: '2rem',
        background: '#141414',
        border: '1px solid var(--border-medium)',
        minHeight: '440px',
        position: 'relative'
      }}>

        {/* SLIDE 1: TODAY'S MEAL PLAN */}
        {activeSlide === 0 && (
          <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <span className="badge badge-emerald" style={{ marginBottom: '0.3rem' }}>{todayName}'s Menu</span>
                <h3 className="font-heading" style={{ fontSize: '1.4rem' }}>Today's Balanced Meal Plan</h3>
              </div>
              <button 
                onClick={() => setActiveTab('diet')}
                style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer' }}
              >
                View Full Week →
              </button>
            </div>

            {todayPlan ? (
              <div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  {['breakfast', 'lunch', 'dinner', 'snack'].map((type) => {
                    const meal = todayPlan.meals[type];
                    const priceFormatted = formatCurrency(meal.priceInr || 45, currency);
                    return (
                      <div key={type} style={{
                        padding: '1.1rem',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-subtle)',
                        display: 'flex',
                        flexDirection: 'column',
                        justify: 'space-between'
                      }}>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>{type}</span>
                            {meal.isBudget && <span className="badge badge-amber" style={{ fontSize: '0.7rem' }}>Budget ({priceFormatted})</span>}
                          </div>
                          <h4 style={{ fontSize: '0.98rem', fontWeight: 700, marginBottom: '0.4rem' }}>{meal.name}</h4>
                          <div style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: 600, marginBottom: '0.6rem' }}>
                            {meal.calories} kcal • {meal.protein}g protein
                          </div>
                        </div>

                        <button 
                          onClick={() => setSwapModalState({ isOpen: true, dayName: todayPlan.day, mealType: type, currentMeal: meal })}
                          style={{
                            background: 'none',
                            border: '1px solid var(--border-subtle)',
                            color: 'var(--text-secondary)',
                            fontSize: '0.78rem',
                            padding: '0.4rem 0.65rem',
                            borderRadius: 'var(--radius-sm)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            width: 'fit-content',
                            marginTop: '0.5rem'
                          }}
                        >
                          <RefreshCw size={12} /> Swap
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div style={{
                  padding: '1rem',
                  background: 'rgba(16, 185, 129, 0.08)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  display: 'flex',
                  justify: 'space-around',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  fontSize: '0.9rem',
                  textAlign: 'center'
                }}>
                  <div>Target Calories: <strong>{mealPlan.dailyCalorieTarget} kcal</strong></div>
                  <div>Protein Target: <strong>{mealPlan.macroSplit.protein}g</strong></div>
                  <div>Carbs Target: <strong>{mealPlan.macroSplit.carbs}g</strong></div>
                  <div>Fat Target: <strong>{mealPlan.macroSplit.fat}g</strong></div>
                </div>
              </div>
            ) : <p>Loading meal plan...</p>}
          </div>
        )}

        {/* SLIDE 2: BMI & BODY SNAPSHOT */}
        {activeSlide === 1 && (
          <div className="animate-fade-in">
            <div style={{ marginBottom: '1.5rem' }}>
              <span className="badge badge-emerald" style={{ marginBottom: '0.3rem' }}>Metrics Overview</span>
              <h3 className="font-heading" style={{ fontSize: '1.4rem' }}>BMI & Body Composition Snapshot</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
              <div style={{
                padding: '2rem',
                background: 'rgba(0,0,0,0.4)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Current BMI Baseline</div>
                <div className="font-heading" style={{ fontSize: '3.8rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.2rem 0' }}>
                  {metrics?.bmi || '21.5'}
                </div>
                <div className="badge badge-emerald" style={{ fontSize: '0.85rem', padding: '0.4rem 1rem' }}>
                  {metrics?.category || 'Normal Weight'}
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '1rem', lineHeight: '1.5' }}>
                  {metrics?.explanation || 'Your weight is in a healthy, balanced standard range for your height.'}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ padding: '1.25rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Latest Weight Entry</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {metrics?.weightKg || onboarding?.weightKg || 68} kg / {metrics?.weightLbs || 150} lbs
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Logged on {metrics?.date || 'Today'}</div>
                </div>

                <div style={{ padding: '1.25rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Body Fat Estimate (Formula-based)</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>{metrics?.bodyFatPct ? `${metrics.bodyFatPct}%` : '18.2%'}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Non-clinical math estimation</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 3: WEIGHT TREND CHART */}
        {activeSlide === 2 && (
          <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <span className="badge badge-emerald" style={{ marginBottom: '0.3rem' }}>Progress History</span>
                <h3 className="font-heading" style={{ fontSize: '1.4rem' }}>Weight & BMI Trajectory</h3>
              </div>
              <button className="btn-secondary" onClick={() => setIsLogModalOpen(true)} style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}>
                <Scale size={14} /> Add Log Entry
              </button>
            </div>

            <ChartView logs={logs} goal={onboarding?.goal} />
          </div>
        )}

        {/* SLIDE 4: NUTRITION & MACRO DISTRIBUTION CHART */}
        {activeSlide === 3 && (
          <div className="animate-fade-in">
            <div style={{ marginBottom: '1.5rem' }}>
              <span className="badge badge-emerald" style={{ marginBottom: '0.3rem' }}>Macro Breakdown</span>
              <h3 className="font-heading" style={{ fontSize: '1.4rem' }}>Nutrition & Energy Ratio Chart</h3>
            </div>

            <MacroChartView 
              calories={mealPlan?.dailyCalorieTarget || 2100}
              protein={mealPlan?.macroSplit?.protein || 130}
              carbs={mealPlan?.macroSplit?.carbs || 240}
              fat={mealPlan?.macroSplit?.fat || 60}
            />
          </div>
        )}

        {/* SLIDE 5: AI NUTRITION TIP OF THE DAY */}
        {activeSlide === 4 && (
          <div className="animate-fade-in">
            <div style={{ marginBottom: '1.5rem' }}>
              <span className="badge badge-emerald" style={{ marginBottom: '0.3rem' }}>Daily Guidance</span>
              <h3 className="font-heading" style={{ fontSize: '1.4rem' }}>In-House AI Nutrition Tip</h3>
            </div>

            <div style={{
              padding: '2rem',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(20, 20, 20, 0.6) 100%)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(16, 185, 129, 0.3)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-primary)', marginBottom: '0.75rem' }}>
                <Lightbulb size={24} />
                <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Smart Student Tip for Midterm Week</span>
              </div>
              <p style={{ fontSize: '1rem', color: 'var(--text-primary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                "When studying late, pair fast carbs (apples or toast) with healthy fats or protein (peanut butter, eggs, Greek yogurt). This keeps your blood sugar steady so you don't crash halfway through your assignments!"
              </p>

              <button className="btn-primary" onClick={() => setActiveTab('ai')}>
                <Bot size={18} /> Chat With AI Companion
              </button>
            </div>
          </div>
        )}

        {/* SLIDE 6: MOTIVATIONAL GYM POSTERS GALLERY */}
        {activeSlide === 5 && (
          <div className="animate-fade-in">
            <div style={{ marginBottom: '1.5rem' }}>
              <span className="badge badge-emerald" style={{ marginBottom: '0.3rem' }}>Student Fitness Motivation</span>
              <h3 className="font-heading" style={{ fontSize: '1.4rem' }}>Gym & Athletics Motivation Wall</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              <div className="glass-card" style={{ overflow: 'hidden', border: '1px solid var(--border-medium)' }}>
                <img 
                  src="/images/poster1.jpg" 
                  alt="Discipline Over Excuses" 
                  style={{ width: '100%', height: '240px', objectFit: 'cover' }} 
                />
                <div style={{ padding: '1rem', textAlign: 'center' }}>
                  <h4 style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)' }}>DISCIPLINE OVER EXCUSES</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Consistency in the dorm, consistency in the gym.</p>
                </div>
              </div>

              <div className="glass-card" style={{ overflow: 'hidden', border: '1px solid var(--border-medium)' }}>
                <img 
                  src="/images/poster2.jpg" 
                  alt="Fuel Your Ambition" 
                  style={{ width: '100%', height: '240px', objectFit: 'cover' }} 
                />
                <div style={{ padding: '1rem', textAlign: 'center' }}>
                  <h4 style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--accent-primary)' }}>FUEL YOUR AMBITION</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Proper student nutrition fuels academic & physical gains.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Slide Controls Footer */}
        <div style={{
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          marginTop: '2rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--border-subtle)'
        }}>
          <button 
            onClick={() => setActiveSlide((activeSlide - 1 + slides.length) % slides.length)}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.88rem' }}
          >
            <ChevronLeft size={18} /> Previous Slide
          </button>

          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {slides.map((_, idx) => (
              <div 
                key={idx} 
                onClick={() => setActiveSlide(idx)} 
                style={{
                  width: activeSlide === idx ? '20px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: activeSlide === idx ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }} 
              />
            ))}
          </div>

          <button 
            onClick={() => setActiveSlide((activeSlide + 1) % slides.length)}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.88rem' }}
          >
            Next Slide <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* MODALS */}
      <WeightLogModal 
        isOpen={isLogModalOpen} 
        onClose={() => setIsLogModalOpen(false)} 
        onLogSuccess={fetchData} 
      />

      <MealSwapperModal 
        isOpen={swapModalState.isOpen}
        onClose={() => setSwapModalState({ isOpen: false, dayName: '', mealType: '', currentMeal: null })}
        dayName={swapModalState.dayName}
        mealType={swapModalState.mealType}
        currentMeal={swapModalState.currentMeal}
        onSwapSuccess={fetchData}
      />
    </div>
  );
};
