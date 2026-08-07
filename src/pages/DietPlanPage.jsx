import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/currency';
import { MealSwapperModal } from '../components/MealSwapperModal';
import { Utensils, RefreshCw, DollarSign, Clock, Flame, Sparkles, AlertCircle, ShoppingCart, CheckCircle2, ChevronRight, Layers, Filter } from 'lucide-react';

// Fallback student meal dataset for instant client rendering
const DEFAULT_STUDENT_MEALS = {
  Monday: {
    day: 'Monday',
    totals: { calories: 2150, protein: 135, carbs: 240, fat: 55 },
    meals: {
      breakfast: { id: 'b1', name: 'Peanut Butter & Banana Oats', calories: 450, protein: 18, carbs: 62, fat: 14, priceInr: 45, prepMinutes: 5, isBudget: true, ingredients: ['1 cup Oats', '2 tbsp Peanut Butter', '1 Sliced Banana', '1 cup Milk'], instructions: 'Microwave oats with milk for 2 mins, stir in peanut butter and top with banana slices.' },
      lunch: { id: 'l1', name: 'Paneer Bhurji with 2 Roti & Salad', calories: 580, protein: 32, carbs: 54, fat: 22, priceInr: 65, prepMinutes: 12, isBudget: true, ingredients: ['150g Crumbled Paneer', '2 Whole Wheat Rotis', '1 Chopped Onion & Tomato', 'Cucumber salad'], instructions: 'Saute onions and tomatoes in 1 tsp ghee, fold in paneer and spices. Serve hot with rotis.' },
      dinner: { id: 'd1', name: 'Dal Tadka with Steamed Rice', calories: 620, protein: 28, carbs: 88, fat: 12, priceInr: 40, prepMinutes: 15, isBudget: true, ingredients: ['1 bowl Yellow Dal', '1.5 cup Rice', 'Garlic & Cumin Tadka', 'Steamed Veggies'], instructions: 'Pressure cook dal with turmeric, temper with garlic & cumin ghee tadka, serve over rice.' },
      snack: { id: 's1', name: 'Roasted Chana & Green Tea', calories: 220, protein: 12, carbs: 32, fat: 4, priceInr: 20, prepMinutes: 2, isBudget: true, ingredients: ['50g Roasted Chana', '1 bag Green Tea'], instructions: 'Munch on roasted chana while sipping warm green tea during study sessions.' }
    }
  },
  Tuesday: {
    day: 'Tuesday',
    totals: { calories: 2200, protein: 140, carbs: 230, fat: 58 },
    meals: {
      breakfast: { id: 'b2', name: 'Egg Bhurji Roll (2 Whole Eggs)', calories: 420, protein: 22, carbs: 38, fat: 16, priceInr: 40, prepMinutes: 8, isBudget: true, ingredients: ['2 Whole Eggs', '1 Whole Wheat Paratha', 'Onion & Green Chili'], instructions: 'Scramble eggs with onions, wrap tightly inside toasted paratha.' },
      lunch: { id: 'l2', name: 'Soya Chunks Pulao & Curd', calories: 560, protein: 38, carbs: 65, fat: 10, priceInr: 45, prepMinutes: 15, isBudget: true, ingredients: ['50g Soya Chunks', '1 cup Basmati Rice', '1/2 cup Curd / Dahi', 'Spices'], instructions: 'Boil soya chunks, cook with spiced rice in 1-pot hostel cooker. Serve with fresh dahi.' },
      dinner: { id: 'd2', name: 'Rajma Masala with Brown Rice', calories: 640, protein: 30, carbs: 92, fat: 14, priceInr: 50, prepMinutes: 20, isBudget: true, ingredients: ['1 bowl Boiled Rajma', '1 cup Rice', 'Tomato Gravy'], instructions: 'Simmer boiled rajma in tomato-ginger gravy, serve with warm steamed rice.' },
      snack: { id: 's2', name: 'Handful Almonds & Sprouts Chaat', calories: 240, protein: 14, carbs: 22, fat: 10, priceInr: 30, prepMinutes: 3, isBudget: true, ingredients: ['15 Almonds', '1 cup Boiled Sprouts', 'Lemon juice & Chaat Masala'], instructions: 'Toss sprouts with lemon juice and chaat masala, eat with almonds.' }
    }
  },
  Wednesday: {
    day: 'Wednesday',
    totals: { calories: 2100, protein: 132, carbs: 225, fat: 54 },
    meals: {
      breakfast: { id: 'b3', name: 'High-Protein Moong Dal Chilla (2 pcs)', calories: 410, protein: 24, carbs: 50, fat: 9, priceInr: 35, prepMinutes: 10, isBudget: true, ingredients: ['1 cup Soaked Moong Batter', 'Paneer stuffing', 'Green Chutney'], instructions: 'Spread batter on non-stick pan, stuff with paneer, cook till golden brown.' },
      lunch: { id: 'l3', name: 'Chana Masala with 2 Chapattis', calories: 540, protein: 26, carbs: 75, fat: 12, priceInr: 45, prepMinutes: 15, isBudget: true, ingredients: ['1 cup Boiled Kabuli Chana', '2 Chapattis', 'Onion Salad'], instructions: 'Cook chana in spiced tomato gravy, eat with hot chapattis.' },
      dinner: { id: 'd3', name: 'Paneer Butter Masala (Fit Version) & Rice', calories: 650, protein: 34, carbs: 70, fat: 22, priceInr: 75, prepMinutes: 18, isBudget: false, ingredients: ['150g Paneer cubes', 'Low-fat milk gravy', 'Rice'], instructions: 'Cook paneer in low-calorie tomato-milk gravy without heavy cream.' },
      snack: { id: 's3', name: 'Banana Peanut Butter Smoothie', calories: 280, protein: 12, carbs: 38, fat: 9, priceInr: 35, prepMinutes: 3, isBudget: true, ingredients: ['1 Banana', '1 tbsp Peanut Butter', '1 cup Milk'], instructions: 'Blend all ingredients in dorm blender for 30 seconds.' }
    }
  },
  Thursday: {
    day: 'Thursday',
    totals: { calories: 2180, protein: 138, carbs: 235, fat: 56 },
    meals: {
      breakfast: { id: 'b1', name: 'Peanut Butter & Banana Oats', calories: 450, protein: 18, carbs: 62, fat: 14, priceInr: 45, prepMinutes: 5, isBudget: true, ingredients: ['1 cup Oats', '2 tbsp Peanut Butter', '1 Sliced Banana'], instructions: 'Microwave oats with milk for 2 mins, stir in peanut butter.' },
      lunch: { id: 'l2', name: 'Soya Chunks Pulao & Curd', calories: 560, protein: 38, carbs: 65, fat: 10, priceInr: 45, prepMinutes: 15, isBudget: true, ingredients: ['50g Soya Chunks', 'Basmati Rice', 'Curd'], instructions: 'Boil soya chunks, cook with spiced rice.' },
      dinner: { id: 'd1', name: 'Dal Tadka with Steamed Rice', calories: 620, protein: 28, carbs: 88, fat: 12, priceInr: 40, prepMinutes: 15, isBudget: true, ingredients: ['Yellow Dal', 'Rice', 'Garlic Tadka'], instructions: 'Pressure cook dal, serve hot over rice.' },
      snack: { id: 's1', name: 'Roasted Chana & Green Tea', calories: 220, protein: 12, carbs: 32, fat: 4, priceInr: 20, prepMinutes: 2, isBudget: true, ingredients: ['50g Roasted Chana', 'Green Tea'], instructions: 'Munch during lectures.' }
    }
  },
  Friday: {
    day: 'Friday',
    totals: { calories: 2250, protein: 142, carbs: 245, fat: 59 },
    meals: {
      breakfast: { id: 'b2', name: 'Egg Bhurji Roll (2 Whole Eggs)', calories: 420, protein: 22, carbs: 38, fat: 16, priceInr: 40, prepMinutes: 8, isBudget: true, ingredients: ['2 Eggs', 'Whole Wheat Paratha'], instructions: 'Scramble eggs, wrap inside paratha.' },
      lunch: { id: 'l1', name: 'Paneer Bhurji with 2 Roti', calories: 580, protein: 32, carbs: 54, fat: 22, priceInr: 65, prepMinutes: 12, isBudget: true, ingredients: ['Paneer', '2 Rotis', 'Salad'], instructions: 'Saute paneer with onions.' },
      dinner: { id: 'd2', name: 'Rajma Masala with Rice', calories: 640, protein: 30, carbs: 92, fat: 14, priceInr: 50, prepMinutes: 20, isBudget: true, ingredients: ['Boiled Rajma', 'Rice'], instructions: 'Simmer in tomato gravy.' },
      snack: { id: 's2', name: 'Sprouts Chaat & Almonds', calories: 240, protein: 14, carbs: 22, fat: 10, priceInr: 30, prepMinutes: 3, isBudget: true, ingredients: ['Sprouts', 'Almonds', 'Lemon'], instructions: 'Toss with chaat masala.' }
    }
  },
  Saturday: {
    day: 'Saturday',
    totals: { calories: 2150, protein: 136, carbs: 230, fat: 55 },
    meals: {
      breakfast: { id: 'b3', name: 'Moong Dal Chilla (2 pcs)', calories: 410, protein: 24, carbs: 50, fat: 9, priceInr: 35, prepMinutes: 10, isBudget: true, ingredients: ['Moong Batter', 'Paneer'], instructions: 'Spread on pan.' },
      lunch: { id: 'l3', name: 'Chana Masala with Chapattis', calories: 540, protein: 26, carbs: 75, fat: 12, priceInr: 45, prepMinutes: 15, isBudget: true, ingredients: ['Kabuli Chana', '2 Chapattis'], instructions: 'Cook in tomato gravy.' },
      dinner: { id: 'd3', name: 'Fit Paneer Masala & Rice', calories: 650, protein: 34, carbs: 70, fat: 22, priceInr: 75, prepMinutes: 18, isBudget: false, ingredients: ['Paneer', 'Milk gravy', 'Rice'], instructions: 'Cook without heavy cream.' },
      snack: { id: 's3', name: 'Banana Peanut Smoothie', calories: 280, protein: 12, carbs: 38, fat: 9, priceInr: 35, prepMinutes: 3, isBudget: true, ingredients: ['Banana', 'Peanut Butter', 'Milk'], instructions: 'Blend for 30s.' }
    }
  },
  Sunday: {
    day: 'Sunday',
    totals: { calories: 2220, protein: 140, carbs: 240, fat: 58 },
    meals: {
      breakfast: { id: 'b1', name: 'Oats with Peanut Butter', calories: 450, protein: 18, carbs: 62, fat: 14, priceInr: 45, prepMinutes: 5, isBudget: true, ingredients: ['Oats', 'Peanut Butter', 'Banana'], instructions: 'Microwave for 2 mins.' },
      lunch: { id: 'l2', name: 'Soya Chunks Pulao & Dahi', calories: 560, protein: 38, carbs: 65, fat: 10, priceInr: 45, prepMinutes: 15, isBudget: true, ingredients: ['Soya Chunks', 'Basmati Rice', 'Curd'], instructions: 'Cook 1-pot pulao.' },
      dinner: { id: 'd1', name: 'Dal Tadka & Steamed Rice', calories: 620, protein: 28, carbs: 88, fat: 12, priceInr: 40, prepMinutes: 15, isBudget: true, ingredients: ['Yellow Dal', 'Rice'], instructions: 'Pressure cook dal.' },
      snack: { id: 's1', name: 'Roasted Chana', calories: 220, protein: 12, carbs: 32, fat: 4, priceInr: 20, prepMinutes: 2, isBudget: true, ingredients: ['Roasted Chana'], instructions: 'Munch during study.' }
    }
  }
};

export const DietPlanPage = () => {
  const { onboarding, currency } = useAuth();
  const [plan, setPlan] = useState(null);
  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [mealFilter, setMealFilter] = useState('all'); // 'all' | 'breakfast' | 'lunch' | 'dinner' | 'snack'
  const [showGroceryModal, setShowGroceryModal] = useState(false);

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
      if (res.ok && data.plan) {
        setPlan(data.plan);
      } else {
        setPlan({
          dailyCalorieTarget: 2150,
          days: Object.values(DEFAULT_STUDENT_MEALS)
        });
      }
    } catch (err) {
      setPlan({
        dailyCalorieTarget: 2150,
        days: Object.values(DEFAULT_STUDENT_MEALS)
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlan();
  }, []);

  const daysList = (plan?.days && plan.days.length > 0) 
    ? plan.days 
    : Object.values(DEFAULT_STUDENT_MEALS);

  const currentDay = daysList[activeDayIdx] || daysList[0];

  // Calculate day total cost in INR
  const totalDayCostInr = currentDay ? Object.values(currentDay.meals).reduce((sum, m) => sum + (m.priceInr || 45), 0) : 170;

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1140px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* HEADER SECTION */}
      <div style={{
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.25rem',
        marginBottom: '2rem'
      }}>
        <div>
          <div className="badge badge-emerald" style={{ marginBottom: '0.4rem' }}>
            <Sparkles size={13} /> 100% Student Dorm-Friendly Meal Engine
          </div>
          <h1 className="font-heading" style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.15 }}>
            Student Weekly Diet Plan 🥗
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '0.2rem', fontWeight: 600 }}>
            Customized for <strong>{onboarding?.goal?.replace('_', ' ') || 'muscle gain'}</strong> • Daily Target: <strong>{plan?.dailyCalorieTarget || 2150} kcal</strong>
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button 
            className="btn-secondary" 
            onClick={() => setShowGroceryModal(true)}
            style={{ padding: '0.65rem 1.15rem', fontSize: '0.85rem' }}
          >
            <ShoppingCart size={15} /> Weekly Grocery List
          </button>
          <button 
            className="btn-primary" 
            onClick={async () => {
              setLoading(true);
              try {
                const token = localStorage.getItem('wb_token');
                await fetch('/api/diet/generate', { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } });
                await fetchPlan();
              } catch (e) {
                fetchPlan();
              } finally {
                setLoading(false);
              }
            }}
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} /> Regenerate Full Week
          </button>
        </div>
      </div>

      {/* DAY SELECTION PILLS */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.6rem' }}>
          SELECT DAY OF THE WEEK
        </div>
        <div className="no-scrollbar" style={{ display: 'flex', gap: '0.65rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
          {daysList.map((d, idx) => {
            const isActive = activeDayIdx === idx;
            return (
              <button
                key={d.day || idx}
                onClick={() => setActiveDayIdx(idx)}
                style={{
                  padding: '0.75rem 1.4rem',
                  borderRadius: 'var(--radius-md)',
                  background: isActive ? 'var(--accent-gold)' : 'var(--bg-card)',
                  color: isActive ? '#ffffff' : 'var(--text-primary)',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  border: isActive ? '1.5px solid var(--accent-gold)' : '1.5px solid var(--border-medium)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                  boxShadow: isActive ? '0 6px 18px rgba(217, 119, 6, 0.25)' : 'none'
                }}
              >
                {d.day}
              </button>
            );
          })}
        </div>
      </div>

      {/* DAY MACRO DASHBOARD & HOSTEL BUDGET BANNER */}
      {currentDay && (
        <div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem',
            padding: '1.5rem',
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-md)',
            border: '1.5px solid var(--border-medium)',
            marginBottom: '2rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>DAY CALORIES</div>
              <div className="font-heading" style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--accent-gold)' }}>
                {currentDay.totals.calories} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>kcal</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 700, marginTop: '0.1rem' }}>
                Target: {plan?.dailyCalorieTarget || 2150} kcal
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>PROTEIN TARGET</div>
              <div className="font-heading" style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--accent-emerald)' }}>
                {currentDay.totals.protein}g
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 700, marginTop: '0.1rem' }}>
                Build & preserve lean muscle
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>CARBS & FATS</div>
              <div className="font-heading" style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                {currentDay.totals.carbs}g <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ {currentDay.totals.fat}g</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 700, marginTop: '0.1rem' }}>
                High stamina for lectures & workouts
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>HOSTEL BUDGET</div>
              <div className="font-heading" style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--accent-gold)' }}>
                {formatCurrency(totalDayCostInr, currency)}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 700, marginTop: '0.1rem' }}>
                100% Student Pocket Friendly
              </div>
            </div>
          </div>

          {/* MEAL FILTER BUTTONS */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Filter size={16} color="var(--text-muted)" />
              <span style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-primary)' }}>Filter Meal Times:</span>
            </div>

            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {['all', 'breakfast', 'lunch', 'dinner', 'snack'].map(filterKey => (
                <button
                  key={filterKey}
                  onClick={() => setMealFilter(filterKey)}
                  style={{
                    padding: '0.4rem 0.85rem',
                    borderRadius: 'var(--radius-full)',
                    background: mealFilter === filterKey ? 'var(--accent-gold)' : 'var(--bg-elevated)',
                    color: mealFilter === filterKey ? '#ffffff' : 'var(--text-secondary)',
                    border: '1px solid var(--border-medium)',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {filterKey}
                </button>
              ))}
            </div>
          </div>

          {/* MEAL CARDS GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {['breakfast', 'lunch', 'dinner', 'snack']
              .filter(type => mealFilter === 'all' || mealFilter === type)
              .map((type) => {
                const meal = currentDay.meals[type];
                if (!meal) return null;
                const formattedPrice = formatCurrency(meal.priceInr || 45, currency);
                return (
                  <div key={type} className="glass-card" style={{ padding: '1.6rem', background: 'var(--bg-card)', border: '1.5px solid var(--border-medium)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                      <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 900, color: 'var(--accent-gold)', letterSpacing: '0.05em' }}>
                        {type}
                      </span>
                      <div style={{ display: 'flex', gap: '0.45rem' }}>
                        <span className="badge badge-amber" style={{ fontSize: '0.72rem' }}>
                          {formattedPrice}
                        </span>
                        <span className="badge badge-zinc" style={{ fontSize: '0.72rem' }}>
                          <Clock size={12} /> {meal.prepMinutes} min prep
                        </span>
                      </div>
                    </div>

                    <h3 className="font-heading" style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>{meal.name}</h3>

                    <div style={{ fontSize: '0.88rem', color: 'var(--accent-emerald)', fontWeight: 800, marginBottom: '1.15rem' }}>
                      🔥 {meal.calories} kcal • P: {meal.protein}g • C: {meal.carbs}g • F: {meal.fat}g
                    </div>

                    {/* INGREDIENTS LIST */}
                    <div style={{ marginBottom: '1.15rem', padding: '0.85rem', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-secondary)', marginBottom: '0.35rem', textTransform: 'uppercase' }}>INGREDIENTS:</div>
                      <ul style={{ paddingLeft: '1.2rem', fontSize: '0.82rem', color: 'var(--text-primary)', lineHeight: '1.5', fontWeight: 600 }}>
                        {meal.ingredients?.map((ing, i) => (
                          <li key={i}>{ing}</li>
                        ))}
                      </ul>
                    </div>

                    {/* PREP INSTRUCTIONS */}
                    <div style={{ marginBottom: '1.35rem' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-secondary)', marginBottom: '0.3rem', textTransform: 'uppercase' }}>DORM PREP INSTRUCTIONS:</div>
                      <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: '1.5', fontWeight: 600 }}>{meal.instructions}</p>
                    </div>

                    <button 
                      onClick={() => setSwapModalState({ isOpen: true, dayName: currentDay.day, mealType: type, currentMeal: meal })}
                      className="btn-secondary"
                      style={{ width: '100%', padding: '0.65rem', fontSize: '0.85rem', fontWeight: 800 }}
                    >
                      <RefreshCw size={15} /> Swap This Meal
                    </button>
                  </div>
                );
            })}
          </div>
        </div>
      )}

      {/* WEEKLY GROCERY LIST MODAL */}
      {showGroceryModal && (
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
          <div className="glass-card" style={{ maxWidth: '520px', width: '100%', padding: '2rem', background: 'var(--bg-card)', border: '1.5px solid var(--accent-gold)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShoppingCart size={22} color="var(--accent-gold)" />
                <h3 className="font-heading" style={{ fontSize: '1.4rem', color: 'var(--text-primary)' }}>Student Weekly Grocery List</h3>
              </div>
              <button className="btn-secondary" onClick={() => setShowGroceryModal(false)} style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}>✕</button>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', fontWeight: 600 }}>
              Buy these budget staples at your local supermarket or campus grocery store for the entire week:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.75rem', fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              <div style={{ padding: '0.65rem', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>🥦 Oats & Peanut Butter</div>
              <div style={{ padding: '0.65rem', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>🧀 Paneer (1 kg)</div>
              <div style={{ padding: '0.65rem', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>🥚 Eggs / Soya Chunks</div>
              <div style={{ padding: '0.65rem', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>🍌 Bananas & Milk</div>
              <div style={{ padding: '0.65rem', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>🌾 Basmati Rice & Whole Wheat Roti</div>
              <div style={{ padding: '0.65rem', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>🫘 Yellow Dal & Rajma</div>
            </div>

            <button className="btn-primary" onClick={() => setShowGroceryModal(false)} style={{ width: '100%', padding: '0.75rem' }}>
              Got It! Close Grocery List
            </button>
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
