import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { calculateBmiFlexible, kgToLbs, lbsToKg } from '../utils/bmiCalculator';
import { formatCurrency } from '../utils/currency';
import { 
  Scale, 
  Flame, 
  Utensils, 
  TrendingUp, 
  Bot, 
  Award, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  CheckCircle, 
  Droplet, 
  Plus, 
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Trophy,
  Zap,
  BookOpen,
  Camera,
  Image as ImageIcon
} from 'lucide-react';

export const DashboardPage = ({ setActiveTab }) => {
  const { user, onboarding, currency, theme } = useAuth();

  // Carousel State
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoAdvancing, setIsAutoAdvancing] = useState(true);

  // Quick Weight Log Modal State
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [logWeight, setLogWeight] = useState(onboarding?.weightKg || 70);
  const [logUnit, setLogUnit] = useState('kg');
  const [logWaist, setLogWaist] = useState(78);
  const [logBodyFat, setLogBodyFat] = useState(16);

  // Quick Food Scanner State
  const [scannedFood, setScannedFood] = useState(null);
  const [scanning, setScanning] = useState(false);

  // Hydration Log State
  const [waterGlasses, setWaterGlasses] = useState(5);

  // User Weight Logs History State
  const [weightHistory, setWeightHistory] = useState([
    { id: '1', date: '2026-08-01', weightKg: 71.5, bmi: '23.3', category: 'Normal weight' },
    { id: '2', date: '2026-08-04', weightKg: 70.8, bmi: '23.1', category: 'Normal weight' },
    { id: '3', date: '2026-08-07', weightKg: (onboarding?.weightKg || 70), bmi: '22.8', category: 'Normal weight' }
  ]);

  // Compute live metrics
  const currentWeightKg = weightHistory.length > 0 ? weightHistory[weightHistory.length - 1].weightKg : (onboarding?.weightKg || 70);
  const metrics = calculateBmiFlexible({
    weightVal: currentWeightKg,
    weightUnit: 'kg',
    heightVal: onboarding?.heightCm || 175,
    heightUnit: 'cm',
    sex: onboarding?.sex || 'male'
  });

  // Slide Carousel Configuration with Vibrant Color Grading
  const slides = [
    {
      id: 'meal_plan',
      title: "Today's Balanced Meal Plan",
      icon: Utensils,
      activeColor: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
      glowColor: "rgba(139, 92, 246, 0.4)",
      textAccent: "#a78bfa",
      badgeBg: "rgba(139, 92, 246, 0.15)",
      badgeBorder: "rgba(139, 92, 246, 0.35)"
    },
    {
      id: 'food_scanner',
      title: "AI Campus Meal Scanner",
      icon: Camera,
      activeColor: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
      glowColor: "rgba(6, 182, 212, 0.4)",
      textAccent: "#22d3ee",
      badgeBg: "rgba(6, 182, 212, 0.15)",
      badgeBorder: "rgba(6, 182, 212, 0.35)"
    },
    {
      id: 'hydration',
      title: "Hydration Tracker",
      icon: Droplet,
      activeColor: "linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)",
      glowColor: "rgba(56, 189, 248, 0.4)",
      textAccent: "#38bdf8",
      badgeBg: "rgba(56, 189, 248, 0.15)",
      badgeBorder: "rgba(56, 189, 248, 0.35)"
    },
    {
      id: 'bmi_snapshot',
      title: "BMI Baseline Snapshot",
      icon: Scale,
      activeColor: "linear-gradient(135deg, #10b981 0%, #047857 100%)",
      glowColor: "rgba(16, 185, 129, 0.4)",
      textAccent: "#34d399",
      badgeBg: "rgba(16, 185, 129, 0.15)",
      badgeBorder: "rgba(16, 185, 129, 0.35)"
    },
    {
      id: 'weight_trend',
      title: "Weight Trend Progress",
      icon: TrendingUp,
      activeColor: "linear-gradient(135deg, #f59e0b 0%, #b45309 100%)",
      glowColor: "rgba(245, 158, 11, 0.4)",
      textAccent: "#fbbf24",
      badgeBg: "rgba(245, 158, 11, 0.15)",
      badgeBorder: "rgba(245, 158, 11, 0.35)"
    },
    {
      id: 'macro_distribution',
      title: "Target Macro Split",
      icon: Layers,
      activeColor: "linear-gradient(135deg, #f43f5e 0%, #be123c 100%)",
      glowColor: "rgba(244, 63, 94, 0.4)",
      textAccent: "#fb7185",
      badgeBg: "rgba(244, 63, 94, 0.15)",
      badgeBorder: "rgba(244, 63, 94, 0.35)"
    },
    {
      id: 'ai_coach',
      title: "AI Campus Coach",
      icon: Bot,
      activeColor: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
      glowColor: "rgba(99, 102, 241, 0.4)",
      textAccent: "#818cf8",
      badgeBg: "rgba(99, 102, 241, 0.15)",
      badgeBorder: "rgba(99, 102, 241, 0.35)"
    },
    {
      id: 'motivation_wall',
      title: "Campus Motivation Wall",
      icon: Trophy,
      activeColor: "linear-gradient(135deg, #eab308 0%, #ca8a04 100%)",
      glowColor: "rgba(234, 179, 8, 0.4)",
      textAccent: "#fde047",
      badgeBg: "rgba(234, 179, 8, 0.15)",
      badgeBorder: "rgba(234, 179, 8, 0.35)"
    }
  ];

  // Auto Advance Carousel
  useEffect(() => {
    let interval = null;
    if (isAutoAdvancing) {
      interval = setInterval(() => {
        setActiveSlide(prev => (prev + 1) % slides.length);
      }, 7000);
    }
    return () => clearInterval(interval);
  }, [isAutoAdvancing, slides.length]);

  const currentSlide = slides[activeSlide];

  // Food scanner simulation
  const sampleFoods = [
    { name: 'Oatmeal with Peanut Butter & Banana', calories: 420, protein: 16, carbs: 58, fats: 14, cost: 45 },
    { name: 'Paneer Bhurji with 2 Chapattis', calories: 510, protein: 24, carbs: 42, fats: 22, cost: 65 },
    { name: 'Egg Bhurji Roll (2 Whole Eggs)', calories: 380, protein: 20, carbs: 32, fats: 16, cost: 40 },
    { name: 'Soya Chunks Rice Bowl', calories: 460, protein: 32, carbs: 54, fats: 8, cost: 50 }
  ];

  const handleSimulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      const randomFood = sampleFoods[Math.floor(Math.random() * sampleFoods.length)];
      setScannedFood(randomFood);
      setScanning(false);
    }, 1200);
  };

  const handleSaveWeightLog = (e) => {
    e.preventDefault();
    const finalKg = logUnit === 'kg' ? Number(logWeight) : lbsToKg(logWeight);
    const newLog = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      weightKg: Number(finalKg.toFixed(1)),
      bmi: metrics.bmi,
      category: metrics.category
    };
    setWeightHistory(prev => [...prev, newLog]);
    setIsLogModalOpen(false);
  };

  const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1140px', margin: '0 auto', padding: '2.5rem 1.75rem' }}>
      {/* HEADER GREETING & STREAK BADGES WITH CLEAN SPACING */}
      <div style={{
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.25rem',
        marginBottom: '2.25rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
            <span className="badge badge-amber">
              <Trophy size={14} color="#fbbf24" /> 🔥 5-Day Gym Streak Active
            </span>
            <span className="badge badge-zinc">
              <CheckCircle size={14} /> 100% Student Verified
            </span>
          </div>
          <h1 className="font-heading" style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.15 }}>
            Welcome, {user?.name || 'Campus Student'}! 👋
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '0.2rem' }}>
            Your student fitness hub & daily nutrition portal.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
          <button className="btn-secondary" onClick={() => setIsLogModalOpen(true)} style={{ padding: '0.65rem 1.25rem', fontSize: '0.9rem' }}>
            <Scale size={16} /> Quick Weight Log
          </button>
          <button className="btn-primary" onClick={() => setActiveTab('ai')} style={{ padding: '0.65rem 1.35rem', fontSize: '0.9rem' }}>
            <Bot size={16} /> Ask AI Assistant
          </button>
        </div>
      </div>

      {/* VIBRANT OPTION PILLS CONTAINER WITH GENEROUS SPACING & CLEAN MARGINS */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Interactive Dashboard Slides ({activeSlide + 1}/{slides.length})
          </span>
          <span style={{ fontSize: '0.78rem', color: '#d97706', fontWeight: 800 }}>
            {isAutoAdvancing ? '⚡ Auto-Rotating (7s)' : '⏸️ Paused'}
          </span>
        </div>

        <div 
          className="no-scrollbar"
          onMouseEnter={() => setIsAutoAdvancing(false)}
          onMouseLeave={() => setIsAutoAdvancing(true)}
          style={{
            display: 'flex',
            gap: '0.85rem',
            overflowX: 'auto',
            padding: '0.4rem 0.2rem 1.25rem',
            scrollSnapType: 'x mandatory'
          }}
        >
          {slides.map((slide, idx) => {
            const Icon = slide.icon;
            const isActive = activeSlide === idx;
            return (
              <button
                key={slide.id}
                onClick={() => { setActiveSlide(idx); setIsAutoAdvancing(false); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.75rem 1.4rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  color: '#ffffff',
                  background: isActive ? slide.activeColor : (theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : '#ffffff'),
                  border: isActive ? `1.5px solid ${slide.activeColor}` : (theme === 'dark' ? '1.5px solid var(--border-subtle)' : '1.5px solid #cbd5e1'),
                  opacity: isActive ? 1 : 0.85,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isActive ? `0 8px 24px ${slide.glowColor}` : '0 4px 12px rgba(0,0,0,0.04)',
                  transform: isActive ? 'translateY(-3px)' : 'none',
                  scrollSnapAlign: 'start'
                }}
              >
                <Icon size={16} color={isActive ? '#ffffff' : (theme === 'dark' ? '#ffffff' : '#0f172a')} />
                <span style={{ color: isActive ? '#ffffff' : (theme === 'dark' ? '#ffffff' : '#0f172a') }}>
                  {slide.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SLIDE DISPLAY CONTAINER WITH SPACIOUS INTERIOR PADDING */}
      <div 
        className="glass-card" 
        onMouseEnter={() => setIsAutoAdvancing(false)}
        onMouseLeave={() => setIsAutoAdvancing(true)}
        style={{
          padding: '2.5rem 2.25rem',
          minHeight: '440px',
          position: 'relative',
          marginBottom: '3rem',
          border: `1.5px solid ${currentSlide.textAccent}45`,
          boxShadow: 'var(--shadow-float)'
        }}
      >
        {/* SLIDE 1: TODAY'S MEAL PLAN */}
        {activeSlide === 0 && (
          <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span className="badge badge-amber" style={{ marginBottom: '0.4rem' }}>
                  {todayName}'s Featured Menu
                </span>
                <h3 className="font-heading" style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>Today's Student Meal Plan</h3>
              </div>
              <button className="btn-secondary" onClick={() => setActiveTab('diet')} style={{ padding: '0.55rem 1.15rem', fontSize: '0.85rem' }}>
                Full 7-Day Plan <ArrowRight size={15} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              {/* Breakfast */}
              <div style={{ padding: '1.35rem', background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#f8fafc', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--border-medium)' }}>
                <div style={{ fontSize: '0.78rem', color: '#d97706', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.3rem' }}>BREAKFAST (8:00 AM)</div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>Oats with Peanut Butter & Banana</h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>🔥 420 kcal | 💡 5-min dorm prep</div>
                <span className="badge badge-amber" style={{ fontSize: '0.75rem' }}>{formatCurrency(45, currency)} per serving</span>
              </div>

              {/* Lunch */}
              <div style={{ padding: '1.35rem', background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#f8fafc', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--border-medium)' }}>
                <div style={{ fontSize: '0.78rem', color: '#d97706', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.3rem' }}>LUNCH (1:30 PM)</div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>Paneer Bhurji / Egg Roll with Chapatti</h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>🔥 510 kcal | 💡 High protein fuel</div>
                <span className="badge badge-amber" style={{ fontSize: '0.75rem' }}>{formatCurrency(65, currency)} per serving</span>
              </div>

              {/* Dinner */}
              <div style={{ padding: '1.35rem', background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#f8fafc', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--border-medium)' }}>
                <div style={{ fontSize: '0.78rem', color: '#d97706', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.3rem' }}>DINNER (8:30 PM)</div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>Dal Tadka with Steamed Rice & Salad</h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>🔥 480 kcal | 💡 Cheap hostel staple</div>
                <span className="badge badge-amber" style={{ fontSize: '0.75rem' }}>{formatCurrency(40, currency)} per serving</span>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 2: AI MEAL SCANNER */}
        {activeSlide === 1 && (
          <div className="animate-fade-in">
            <div style={{ marginBottom: '1.75rem' }}>
              <span className="badge badge-amber" style={{ marginBottom: '0.4rem' }}>Instant AI Analysis</span>
              <h3 className="font-heading" style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>AI Campus Food & Calorie Scanner</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.25rem' }}>
                Simulate scanning your hostel mess or mess tiffin meal to estimate calories and protein.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ padding: '2rem', background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#f8fafc', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border-medium)', textAlign: 'center' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#06b6d4', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', boxShadow: '0 8px 20px rgba(6, 182, 212, 0.35)' }}>
                  <Camera size={26} />
                </div>
                <button className="btn-primary" onClick={handleSimulateScan} disabled={scanning} style={{ width: '100%', padding: '0.85rem' }}>
                  {scanning ? 'Analyzing Meal Photo...' : 'Simulate Meal Scan 📷'}
                </button>
              </div>

              {scannedFood ? (
                <div style={{ padding: '1.5rem', background: theme === 'dark' ? '#0e0e12' : '#ffffff', borderRadius: 'var(--radius-md)', border: '1.5px solid #06b6d4' }}>
                  <span className="badge badge-amber" style={{ marginBottom: '0.4rem' }}>Analysis Complete</span>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.6rem' }}>{scannedFood.name}</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem' }}>
                    <div><strong>Calories:</strong> {scannedFood.calories} kcal</div>
                    <div><strong>Protein:</strong> {scannedFood.protein}g</div>
                    <div><strong>Carbs:</strong> {scannedFood.carbs}g</div>
                    <div><strong>Fats:</strong> {scannedFood.fats}g</div>
                  </div>
                </div>
              ) : (
                <div style={{ padding: '1.5rem', border: '1.5px dashed var(--border-medium)', borderRadius: 'var(--radius-md)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                  Tap the scan button to simulate instant AI meal recognition!
                </div>
              )}
            </div>
          </div>
        )}

        {/* SLIDE 3: HYDRATION TRACKER */}
        {activeSlide === 2 && (
          <div className="animate-fade-in">
            <div style={{ marginBottom: '1.75rem' }}>
              <span className="badge badge-amber" style={{ marginBottom: '0.4rem' }}>Daily Target: 2.5 Liters (10 Glasses)</span>
              <h3 className="font-heading" style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>Campus Hydration Tracker</h3>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center', flex: 1, minWidth: '200px' }}>
                <div className="font-heading" style={{ fontSize: '3.5rem', fontWeight: 900, color: '#38bdf8', lineHeight: 1 }}>
                  {waterGlasses} <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>/ 10 Glasses</span>
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.4rem', fontWeight: 700 }}>
                  ({(waterGlasses * 0.25).toFixed(2)} L logged today)
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button className="btn-primary" onClick={() => setWaterGlasses(prev => Math.min(15, prev + 1))} style={{ padding: '0.8rem 1.4rem' }}>
                  <Plus size={18} /> Add 1 Glass (250ml)
                </button>
                <button className="btn-secondary" onClick={() => setWaterGlasses(0)} style={{ padding: '0.8rem 1.2rem' }}>
                  <RefreshCw size={16} /> Reset
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 4: BMI SNAPSHOT */}
        {activeSlide === 3 && (
          <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span className="badge badge-amber" style={{ marginBottom: '0.4rem' }}>Personal Baseline</span>
                <h3 className="font-heading" style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>BMI Baseline Snapshot</h3>
              </div>
              <button className="btn-secondary" onClick={() => setActiveTab('bmi')} style={{ padding: '0.55rem 1.15rem', fontSize: '0.85rem' }}>
                View BMI Calculator <ArrowRight size={15} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
              <div style={{ padding: '1.35rem', background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#f8fafc', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--border-medium)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800 }}>BMI SCORE</div>
                <div className="font-heading" style={{ fontSize: '2.5rem', fontWeight: 900, color: '#10b981', marginTop: '0.2rem' }}>{metrics.bmi}</div>
                <div className={`badge ${metrics.badgeClass}`}>{metrics.category}</div>
              </div>

              <div style={{ padding: '1.35rem', background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#f8fafc', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--border-medium)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800 }}>CURRENT WEIGHT</div>
                <div className="font-heading" style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: '0.2rem' }}>{metrics.weightKg} kg</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 700 }}>({metrics.weightLbs} lbs)</div>
              </div>

              <div style={{ padding: '1.35rem', background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#f8fafc', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--border-medium)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800 }}>HEIGHT BASELINE</div>
                <div className="font-heading" style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: '0.2rem' }}>{onboarding?.heightCm || 175} cm</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 700 }}>Standard Height</div>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 5: WEIGHT TREND */}
        {activeSlide === 4 && (
          <div className="animate-fade-in">
            <div style={{ marginBottom: '1.75rem' }}>
              <span className="badge badge-amber" style={{ marginBottom: '0.4rem' }}>Progress Trend</span>
              <h3 className="font-heading" style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>Weight Trend History</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {weightHistory.map(log => (
                <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem', background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#f8fafc', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--border-medium)' }}>
                  <div>
                    <strong style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>{log.date}</strong>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginLeft: '0.75rem' }}>BMI: {log.bmi}</span>
                  </div>
                  <div style={{ fontWeight: 900, fontSize: '1.1rem', color: '#f59e0b' }}>
                    {log.weightKg} kg
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SLIDE 6: MACRO SPLIT */}
        {activeSlide === 5 && (
          <div className="animate-fade-in">
            <div style={{ marginBottom: '1.75rem' }}>
              <span className="badge badge-amber" style={{ marginBottom: '0.4rem' }}>Daily Target Split</span>
              <h3 className="font-heading" style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>Macro Distribution Target</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
              <div style={{ padding: '1.35rem', background: theme === 'dark' ? 'rgba(244,63,94,0.1)' : '#fff1f2', borderRadius: 'var(--radius-sm)', border: '1.5px solid #f43f5e' }}>
                <div style={{ color: '#f43f5e', fontWeight: 900, fontSize: '0.82rem' }}>PROTEIN (30%)</div>
                <div className="font-heading" style={{ fontSize: '2.2rem', fontWeight: 900, color: '#f43f5e', marginTop: '0.2rem' }}>140g</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Paneer, soya, eggs, lentils</p>
              </div>

              <div style={{ padding: '1.35rem', background: theme === 'dark' ? 'rgba(56,189,248,0.1)' : '#f0f9ff', borderRadius: 'var(--radius-sm)', border: '1.5px solid #38bdf8' }}>
                <div style={{ color: '#38bdf8', fontWeight: 900, fontSize: '0.82rem' }}>CARBS (50%)</div>
                <div className="font-heading" style={{ fontSize: '2.2rem', fontWeight: 900, color: '#38bdf8', marginTop: '0.2rem' }}>230g</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Oats, rice, chapattis, bananas</p>
              </div>

              <div style={{ padding: '1.35rem', background: theme === 'dark' ? 'rgba(245,158,11,0.1)' : '#fffbe6', borderRadius: 'var(--radius-sm)', border: '1.5px solid #f59e0b' }}>
                <div style={{ color: '#f59e0b', fontWeight: 900, fontSize: '0.82rem' }}>FATS (20%)</div>
                <div className="font-heading" style={{ fontSize: '2.2rem', fontWeight: 900, color: '#f59e0b', marginTop: '0.2rem' }}>55g</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Peanut butter, almonds, seeds</p>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 7: AI COACH */}
        {activeSlide === 6 && (
          <div className="animate-fade-in">
            <div style={{ marginBottom: '1.75rem' }}>
              <span className="badge badge-amber" style={{ marginBottom: '0.4rem' }}>Multi-Language AI Assistant</span>
              <h3 className="font-heading" style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>Your Personal Campus AI Coach</h3>
            </div>

            <div style={{ padding: '1.75rem', background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#f8fafc', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border-medium)' }}>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                "Hey! Remember to keep your water bottle handy during lectures today. Aiming for 140g protein on a student budget is easy with peanut butter oats and soya chunk rolls!"
              </p>
              <button className="btn-primary" onClick={() => setActiveTab('ai')}>
                Chat With AI Coach <Bot size={16} />
              </button>
            </div>
          </div>
        )}

        {/* SLIDE 8: MOTIVATION WALL */}
        {activeSlide === 7 && (
          <div className="animate-fade-in">
            <div style={{ marginBottom: '1.75rem' }}>
              <span className="badge badge-amber" style={{ marginBottom: '0.4rem' }}>Campus Student Inspiration</span>
              <h3 className="font-heading" style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>Campus Motivation Wall</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
              <div style={{ padding: '1.35rem', background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#f8fafc', borderRadius: 'var(--radius-sm)', border: '1.5px solid #eab308' }}>
                <div style={{ fontWeight: 900, color: '#eab308', fontSize: '0.85rem', marginBottom: '0.4rem' }}>⚡ HABIT BUILDING</div>
                <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 700 }}>"Exams are temporary, gains are forever. 15 mins of dorm pushups beat 0 mins."</p>
              </div>

              <div style={{ padding: '1.35rem', background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#f8fafc', borderRadius: 'var(--radius-sm)', border: '1.5px solid #10b981' }}>
                <div style={{ fontWeight: 900, color: '#10b981', fontSize: '0.85rem', marginBottom: '0.4rem' }}>💡 HOSTEL HACKS</div>
                <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 700 }}>"Taking stairs instead of hostel elevator adds 1,500 extra steps daily."</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* QUICK LOG MODAL */}
      {isLogModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.85)',
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div className="glass-card" style={{ maxWidth: '440px', width: '100%', padding: '2rem', background: theme === 'dark' ? '#14141a' : '#ffffff', border: '1.5px solid #d97706' }}>
            <h3 className="font-heading" style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>Quick Weight Log</h3>
            
            <form onSubmit={handleSaveWeightLog}>
              <div className="form-group">
                <label className="form-label">Weight Baseline</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input type="number" step="0.1" value={logWeight} onChange={(e) => setLogWeight(e.target.value)} className="form-input" style={{ flex: 1 }} required />
                  <select value={logUnit} onChange={(e) => setLogUnit(e.target.value)} className="form-select" style={{ width: '90px' }}>
                    <option value="kg">kg</option>
                    <option value="lbs">lbs</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.75rem' }}>
                <button type="button" className="btn-secondary" onClick={() => setIsLogModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Save Log</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
