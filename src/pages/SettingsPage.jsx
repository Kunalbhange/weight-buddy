import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CURRENCY_MAP } from '../utils/currency';
import { AutomationHubWidget } from '../components/AutomationHubWidget';
import { Settings, User, Globe, Download, Trash2, ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';

export const SettingsPage = ({ setActiveTab }) => {
  const { user, logout, currency, changeCurrency, setStudentName, theme } = useAuth();
  const [name, setName] = useState(user?.name || '');
  
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setStudentName(name);
    setMessage('Student name updated successfully!');
  };

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      studentName: user?.name,
      currency,
      exportedAt: new Date().toISOString()
    }));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "weightbuddy_student_data.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleDeleteAccount = () => {
    setLoading(true);
    try {
      // Purge student data from local session
      logout();
      setShowDeleteModal(false);
      // Transfer user immediately to front / landing page
      setActiveTab('landing');
    } catch (err) {
      setError('Failed to purge student data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="font-heading" style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-primary)' }}>Account & Settings</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>
          Manage your student profile, default currency formatting, and automated campus preferences.
        </p>
      </div>

      {message && (
        <div style={{ padding: '0.85rem 1.25rem', background: 'rgba(217, 119, 6, 0.15)', border: '1.5px solid rgba(217, 119, 6, 0.3)', color: 'var(--accent-gold)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={18} color="var(--accent-gold)" /> {message}
        </div>
      )}

      {error && (
        <div style={{ padding: '0.85rem 1.25rem', background: '#fef2f2', border: '1.5px solid #fecaca', color: '#dc2626', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1.5rem' }}>
          {error}
        </div>
      )}

      {/* SECTION 1: AUTOMATIONS CONTROL HUB */}
      <div style={{ marginBottom: '2rem' }}>
        <AutomationHubWidget />
      </div>

      {/* SECTION 2: PROFILE DETAILS */}
      <div className="glass-card" style={{ padding: '2rem', background: 'var(--bg-card)', border: '1.5px solid var(--border-medium)', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <User size={20} color="var(--text-primary)" />
          <h2 className="font-heading" style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>Profile Information</h2>
        </div>

        <form onSubmit={handleUpdateProfile}>
          <div className="form-group">
            <label className="form-label">Student Display Name</label>
            <input type="text" className="form-input" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <button type="submit" className="btn-secondary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}>
            Save Name Changes
          </button>
        </form>
      </div>

      {/* SECTION 3: CURRENCY FORMATTING */}
      <div className="glass-card" style={{ padding: '2rem', background: 'var(--bg-card)', border: '1.5px solid var(--border-medium)', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <Globe size={20} color="var(--accent-gold)" />
          <h2 className="font-heading" style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>Preferred Currency</h2>
        </div>

        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', fontWeight: 600 }}>
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
      <div className="glass-card" style={{ padding: '2rem', background: 'var(--bg-card)', border: '1.5px solid var(--border-medium)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <ShieldCheck size={20} color="var(--accent-gold)" />
          <h2 className="font-heading" style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>Privacy & Data Ownership</h2>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.5', fontWeight: 600 }}>
          WeightBuddy adheres strictly to standard data protection policies. Your health data is stored locally and never sold or shared with third parties.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="btn-secondary" onClick={handleExportData} style={{ padding: '0.75rem 1.25rem', fontSize: '0.85rem' }}>
            <Download size={16} /> Export All My Data (JSON)
          </button>
          <button className="btn-danger" onClick={() => setShowDeleteModal(true)}>
            <Trash2 size={16} /> Delete Data & Reset Session
          </button>
        </div>
      </div>

      {/* DELETE DATA CONFIRMATION MODAL */}
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
          <div className="glass-card" style={{ maxWidth: '440px', width: '100%', padding: '2rem', background: 'var(--bg-card)', border: '1.5px solid rgba(239, 68, 68, 0.4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#dc2626', marginBottom: '1rem' }}>
              <AlertTriangle size={24} color="#dc2626" />
              <h3 className="font-heading" style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>Confirm Permanent Deletion</h3>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '1.5rem', fontWeight: 600 }}>
              Are you sure you want to purge your data? This will clear your student session and transfer you directly back to the Front Landing Page.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button className="btn-secondary" onClick={() => setShowDeleteModal(false)} disabled={loading}>
                Cancel
              </button>
              <button className="btn-danger" onClick={handleDeleteAccount} disabled={loading}>
                {loading ? 'Deleting...' : 'Yes, Delete & Return to Front Page'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
