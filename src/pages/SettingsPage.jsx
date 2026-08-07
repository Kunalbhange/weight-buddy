import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CURRENCY_MAP } from '../utils/currency';
import { AutomationHubWidget } from '../components/AutomationHubWidget';
import { Settings, User, Globe, Download, Trash2, ShieldCheck, CheckCircle2, AlertTriangle, Zap } from 'lucide-react';

export const SettingsPage = ({ setActiveTab }) => {
  const { user, fetchMe, logout, currency, changeCurrency } = useAuth();
  const [name, setName] = useState(user?.name || '');
  
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

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
        <h1 className="font-heading" style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff' }}>Account & Settings</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Manage your student profile, default currency formatting, and automated campus preferences.
        </p>
      </div>

      {message && (
        <div style={{ padding: '0.85rem 1.25rem', background: 'rgba(217, 119, 6, 0.15)', border: '1px solid rgba(217, 119, 6, 0.3)', color: '#fbbf24', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={18} color="#fbbf24" /> {message}
        </div>
      )}

      {error && (
        <div style={{ padding: '0.85rem 1.25rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#fca5a5', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
          {error}
        </div>
      )}

      {/* SECTION 1: AUTOMATIONS CONTROL HUB */}
      <div style={{ marginBottom: '2rem' }}>
        <AutomationHubWidget />
      </div>

      {/* SECTION 2: PROFILE DETAILS */}
      <div className="glass-card" style={{ padding: '2rem', background: '#14141a', border: '1.5px solid var(--border-medium)', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <User size={20} color="#ffffff" />
          <h2 className="font-heading" style={{ fontSize: '1.3rem', color: '#ffffff' }}>Profile Information</h2>
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

      {/* SECTION 3: CURRENCY FORMATTING */}
      <div className="glass-card" style={{ padding: '2rem', background: '#14141a', border: '1.5px solid var(--border-medium)', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <Globe size={20} color="#d97706" />
          <h2 className="font-heading" style={{ fontSize: '1.3rem', color: '#ffffff' }}>Preferred Currency</h2>
        </div>

        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          Default currency is set to <strong>INR (₹)</strong> for Indian students. Select a different currency to automatically convert meal prices across all plans.
        </p>

        <div className="form-group" style={{ maxWidth: '320px' }}>
          <label className="form-label">Select Active Currency</label>
          <select 
            value={currency} 
            onChange={(e) => changeCurrency(e.target.value)}
            className="form-select"
          >
            {Object.keys(CURRENCY_MAP).map(code => (
              <option key={code} value={code}>
                {CURRENCY_MAP[code].label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* SECTION 4: PRIVACY, DATA EXPORT & DELETION */}
      <div className="glass-card" style={{ padding: '2rem', background: '#14141a', border: '1.5px solid var(--border-medium)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <ShieldCheck size={20} color="#d97706" />
          <h2 className="font-heading" style={{ fontSize: '1.3rem', color: '#ffffff' }}>Privacy & Data Ownership</h2>
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
          justify: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div className="glass-card" style={{ maxWidth: '440px', width: '100%', padding: '2rem', background: '#14141a', border: '1.5px solid rgba(239, 68, 68, 0.4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fca5a5', marginBottom: '1rem' }}>
              <AlertTriangle size={24} />
              <h3 className="font-heading" style={{ fontSize: '1.3rem', color: '#ffffff' }}>Confirm Permanent Deletion</h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '1.5rem' }}>
              Are you sure you want to delete your WeightBuddy account? This will permanently purge all your weight logs, custom meal plans, and chat history.
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
