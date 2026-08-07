import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Bell, Zap, Calendar, ShieldCheck, CheckCircle2, AlertOctagon, Sparkles, Sliders, TrendingUp } from 'lucide-react';

export const AutomationHubWidget = () => {
  const { user } = useAuth();
  const [reminders, setReminders] = useState({
    weightLogReminder: true,
    mealPrepAlerts: true,
    examStressMode: false,
    autoMacroAdjust: true,
  });
  const [saving, setSaving] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const token = localStorage.getItem('wb_token');
      const res = await fetch('/api/automations/reminders', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.reminders) {
        setReminders(prev => ({ ...prev, ...data.reminders }));
      }
    } catch (e) {
      console.warn('Failed to load automation preferences:', e);
    }
  };

  const handleToggle = (key) => {
    setReminders(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      savePreferences(updated);
      return updated;
    });
  };

  const savePreferences = async (updated) => {
    setSaving(true);
    try {
      const token = localStorage.getItem('wb_token');
      await fetch('/api/automations/reminders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updated)
      });
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 2000);
    } catch (e) {
      console.error('Failed to save preferences:', e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="glass-card" style={{
      padding: '1.75rem',
      background: '#14141a',
      border: '1.5px solid var(--border-medium)',
      borderRadius: 'var(--radius-md)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <div className="badge badge-amber" style={{ marginBottom: '0.3rem' }}>
            <Zap size={12} color="#d97706" /> Automated Campus Engine
          </div>
          <h3 className="font-heading" style={{ fontSize: '1.35rem', color: '#ffffff' }}>
            Smart Automations & Reminders
          </h3>
        </div>
        {savedNotice && (
          <span style={{ fontSize: '0.78rem', color: '#d97706', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <CheckCircle2 size={14} color="#d97706" /> Saved Live
          </span>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Automation 1: Exam Stress Mode */}
        <div style={{
          padding: '1rem 1.25rem',
          background: reminders.examStressMode ? 'rgba(217, 119, 6, 0.15)' : 'rgba(255, 255, 255, 0.04)',
          border: reminders.examStressMode ? '1.5px solid #d97706' : '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, color: '#ffffff', fontSize: '0.95rem' }}>
              <Calendar size={16} color={reminders.examStressMode ? '#d97706' : '#ffffff'} />
              🎓 Exam Crunch Week (Stress Mode)
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              Auto-swaps meals to 5-min brain-fuel snacks & 10-min desk stretches.
            </div>
          </div>
          <button
            onClick={() => handleToggle('examStressMode')}
            style={{
              padding: '0.4rem 0.9rem',
              borderRadius: 'var(--radius-full)',
              background: reminders.examStressMode ? '#d97706' : 'rgba(255, 255, 255, 0.1)',
              color: reminders.examStressMode ? '#050507' : '#ffffff',
              border: 'none',
              fontWeight: 900,
              fontSize: '0.78rem',
              cursor: 'pointer'
            }}
          >
            {reminders.examStressMode ? 'ACTIVE ⚡' : 'ENABLE'}
          </button>
        </div>

        {/* Automation 2: Auto Macro Adjustment */}
        <div style={{
          padding: '1rem 1.25rem',
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, color: '#ffffff', fontSize: '0.95rem' }}>
              <TrendingUp size={16} color="#ffffff" />
              ⚡ Real-Time Auto-Macro Recalculation
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              Auto-adjusts TDEE & protein split when you log weight changes.
            </div>
          </div>
          <button
            onClick={() => handleToggle('autoMacroAdjust')}
            style={{
              padding: '0.4rem 0.9rem',
              borderRadius: 'var(--radius-full)',
              background: reminders.autoMacroAdjust ? '#ffffff' : 'rgba(255, 255, 255, 0.1)',
              color: reminders.autoMacroAdjust ? '#050507' : '#ffffff',
              border: 'none',
              fontWeight: 900,
              fontSize: '0.78rem',
              cursor: 'pointer'
            }}
          >
            {reminders.autoMacroAdjust ? 'ON' : 'OFF'}
          </button>
        </div>

        {/* Automation 3: Daily Campus Hydration & Meal Prep Alerts */}
        <div style={{
          padding: '1rem 1.25rem',
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, color: '#ffffff', fontSize: '0.95rem' }}>
              <Bell size={16} color="#ffffff" />
              🍳 Meal Prep & Hydration Campus Alerts
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              Timed alerts for morning breakfast & afternoon 2.5L water target.
            </div>
          </div>
          <button
            onClick={() => handleToggle('mealPrepAlerts')}
            style={{
              padding: '0.4rem 0.9rem',
              borderRadius: 'var(--radius-full)',
              background: reminders.mealPrepAlerts ? '#ffffff' : 'rgba(255, 255, 255, 0.1)',
              color: reminders.mealPrepAlerts ? '#050507' : '#ffffff',
              border: 'none',
              fontWeight: 900,
              fontSize: '0.78rem',
              cursor: 'pointer'
            }}
          >
            {reminders.mealPrepAlerts ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>
    </div>
  );
};
