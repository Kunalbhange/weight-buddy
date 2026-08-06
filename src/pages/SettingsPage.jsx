import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Settings, User, Bell, Download, Trash2, ShieldCheck, CheckCircle2, AlertTriangle, Calendar } from 'lucide-react';

export const SettingsPage = ({ setActiveTab }) => {
  const { user, fetchMe, logout } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [weightLogReminder, setWeightLogReminder] = useState(true);
  const [mealPrepAlerts, setMealPrepAlerts] = useState(true);
  const [examDate, setExamDate] = useState('');
  const [examDates, setExamDates] = useState([]);
  
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchReminders = async () => {
    try {
      const token = localStorage.getItem('wb_token');
      const res = await fetch('/api/automations/reminders', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.reminders) {
        setWeightLogReminder(data.reminders.weightLogReminder);
        setMealPrepAlerts(data.reminders.mealPrepAlerts);
        setExamDates(data.reminders.examDates || []);
      }
    } catch (err) {
      console.error('Failed to fetch reminders:', err);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    try {
      const token = localStorage.getItem('wb_token');
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMessage('Profile updated successfully!');
      fetchMe();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSaveReminders = async () => {
    setMessage(null);
    setError(null);
    try {
      const token = localStorage.getItem('wb_token');
      const res = await fetch('/api/automations/reminders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ weightLogReminder, examDates, mealPrepAlerts })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMessage('Reminder preferences saved!');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddExamDate = () => {
    if (examDate && !examDates.includes(examDate)) {
      const updated = [...examDates, examDate];
      setExamDates(updated);
      setExamDate('');
    }
  };

  const handleExportData = () => {
    const token = localStorage.getItem('wb_token');
    window.open(`/api/privacy/export-data?token=${token}`, '_blank');
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('wb_token');
      const res = await fetch('/api/privacy/delete-account', {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        logout();
        setActiveTab('landing');
      }
    } catch (err) {
      setError('Failed to delete account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="font-heading" style={{ fontSize: '2rem', fontWeight: 800 }}>Account & Privacy Settings</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Manage your student profile, exam prep automations, and data export.
        </p>
      </div>

      {message && (
        <div style={{ padding: '0.85rem 1.25rem', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#34d399', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={18} /> {message}
        </div>
      )}

      {error && (
        <div style={{ padding: '0.85rem 1.25rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#fca5a5', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
          {error}
        </div>
      )}

      {/* SECTION 1: PROFILE DETAILS */}
      <div className="glass-card" style={{ padding: '2rem', background: '#141414', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <User size={20} color="var(--accent-primary)" />
          <h2 className="font-heading" style={{ fontSize: '1.3rem' }}>Profile Information</h2>
        </div>

        <form onSubmit={handleUpdateProfile}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-input" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-input" value={user?.email || ''} disabled style={{ opacity: 0.6 }} />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Email address cannot be modified.</span>
          </div>
          <button type="submit" className="btn-secondary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}>
            Save Name Changes
          </button>
        </form>
      </div>

      {/* SECTION 2: AUTOMATIONS & EXAM PREP REMINDERS */}
      <div className="glass-card" style={{ padding: '2rem', background: '#141414', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <Bell size={20} color="var(--accent-primary)" />
          <h2 className="font-heading" style={{ fontSize: '1.3rem' }}>Automations & Exam Schedule</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.9rem' }}>
            <input type="checkbox" checked={weightLogReminder} onChange={(e) => setWeightLogReminder(e.target.checked)} style={{ accentColor: 'var(--accent-primary)', width: '18px', height: '18px' }} />
            <span>Enable Weekly Weight-Logging Nudges</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.9rem' }}>
            <input type="checkbox" checked={mealPrepAlerts} onChange={(e) => setMealPrepAlerts(e.target.checked)} style={{ accentColor: 'var(--accent-primary)', width: '18px', height: '18px' }} />
            <span>Enable Exam Week Meal-Prep Alerts</span>
          </label>
        </div>

        {/* Exam Dates Scheduler */}
        <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
          <label className="form-label" style={{ marginBottom: '0.5rem', display: 'block' }}>Upcoming Midterm / Final Exam Dates</label>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
            <input type="date" className="form-input" value={examDate} onChange={(e) => setExamDate(e.target.value)} />
            <button type="button" className="btn-secondary" onClick={handleAddExamDate} style={{ padding: '0.6rem 1rem' }}>
              Add Date
            </button>
          </div>

          {examDates.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {examDates.map((d, i) => (
                <span key={i} className="badge badge-amber" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                  <Calendar size={12} /> {d}
                </span>
              ))}
            </div>
          )}
        </div>

        <button className="btn-primary" onClick={handleSaveReminders} style={{ marginTop: '1.5rem', padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}>
          Save Automation Settings
        </button>
      </div>

      {/* SECTION 3: PRIVACY, DATA EXPORT & DELETION */}
      <div className="glass-card" style={{ padding: '2rem', background: '#141414' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <ShieldCheck size={20} color="var(--accent-primary)" />
          <h2 className="font-heading" style={{ fontSize: '1.3rem' }}>Privacy & Data Ownership</h2>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
          WeightBuddy adheres strictly to standard data protection policies. Your health data is never sold or shared with third parties.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="btn-secondary" onClick={handleExportData} style={{ padding: '0.75rem 1.25rem', fontSize: '0.85rem' }}>
            <Download size={16} /> Export All My Data (JSON)
          </button>
          <button className="btn-danger" onClick={() => setShowDeleteModal(true)}>
            <Trash2 size={16} /> Delete Account & Data
          </button>
        </div>
      </div>

      {/* DELETE ACCOUNT CONFIRMATION MODAL */}
      {showDeleteModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div className="glass-card" style={{ maxWidth: '440px', width: '100%', padding: '2rem', background: '#141414', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fca5a5', marginBottom: '1rem' }}>
              <AlertTriangle size={24} />
              <h3 className="font-heading" style={{ fontSize: '1.3rem' }}>Confirm Permanent Deletion</h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '1.5rem' }}>
              Are you sure you want to delete your WeightBuddy account? This will permanently purge all your weight logs, custom meal plans, and chat history. This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button className="btn-secondary" onClick={() => setShowDeleteModal(false)} disabled={loading}>
                Cancel
              </button>
              <button className="btn-danger" onClick={handleDeleteAccount} disabled={loading}>
                {loading ? 'Deleting...' : 'Yes, Delete Everything'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
