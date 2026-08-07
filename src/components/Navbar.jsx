import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CURRENCY_MAP } from '../utils/currency';
import { LayoutDashboard, Utensils, Activity, Bot, Settings, Menu, X, Globe, Dumbbell, Moon, Sun, User, Check, Edit2 } from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab }) => {
  const { user, setStudentName, currency, changeCurrency, theme, toggleTheme } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(user?.name || 'Student');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'diet', label: 'Diet Plan', icon: Utensils },
    { id: 'bmi', label: 'BMI', icon: Activity },
    { id: 'physique', label: 'Physique', icon: Dumbbell },
    { id: 'ai', label: 'AI Coach', icon: Bot },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleSaveName = (e) => {
    e.preventDefault();
    setStudentName(tempName);
    setIsEditingName(false);
  };

  const controlStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border-medium)',
    borderRadius: 'var(--radius-sm)',
    padding: '0.4rem 0.7rem',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '0.8rem',
    transition: 'var(--transition-fast)',
    fontFamily: 'var(--font-body)'
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'var(--bg-surface)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-subtle)',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0.85rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.25rem'
      }}>
        {/* Brand */}
        <div
          onClick={() => setActiveTab('landing')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}
        >
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '9px',
            background: 'var(--accent-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            color: '#ffffff',
            fontSize: '1.1rem',
            fontFamily: 'var(--font-heading)'
          }}>
            W
          </div>
          <div>
            <div className="font-heading" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>
              Weight<span style={{ color: 'var(--accent-gold)' }}>Buddy</span>
            </div>
            <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.04em' }}>
              Student Nutrition
            </div>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'nowrap' }}>
          {/* Student Name */}
          {isEditingName ? (
            <form onSubmit={handleSaveName} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <input type="text" value={tempName} onChange={e => setTempName(e.target.value)} autoFocus
                style={{ ...controlStyle, width: '110px', border: '1px solid var(--accent-gold)' }} />
              <button type="submit" style={{ ...controlStyle, background: 'var(--accent-gold)', color: '#fff', border: 'none', padding: '0.4rem 0.5rem' }}>
                <Check size={13} />
              </button>
            </form>
          ) : (
            <button onClick={() => setIsEditingName(true)} style={{ ...controlStyle, color: 'var(--accent-gold)', borderColor: 'var(--border-accent)' }}>
              <User size={13} />
              <span style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name || 'Student'}</span>
              <Edit2 size={10} style={{ opacity: 0.6 }} />
            </button>
          )}

          {/* Theme */}
          <button onClick={toggleTheme} title="Toggle theme" style={controlStyle}>
            {theme === 'dark' ? <Sun size={14} color="#fbbf24" /> : <Moon size={14} />}
          </button>

          {/* Currency */}
          <div style={controlStyle}>
            <Globe size={13} color="var(--accent-gold)" />
            <select value={currency} onChange={e => changeCurrency(e.target.value)}
              style={{ background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', outline: 'none', fontFamily: 'inherit' }}>
              {Object.keys(CURRENCY_MAP).map(code => (
                <option key={code} value={code} style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}>
                  {CURRENCY_MAP[code].label}
                </option>
              ))}
            </select>
          </div>

          {/* Desktop Nav */}
          <nav className="desktop-nav" style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button key={item.id} onClick={() => setActiveTab(item.id)} style={{
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  padding: '0.45rem 0.85rem', borderRadius: 'var(--radius-sm)',
                  fontSize: '0.82rem', fontWeight: isActive ? 700 : 600,
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  background: isActive ? 'var(--accent-gold)' : 'transparent',
                  border: 'none', cursor: 'pointer',
                  transition: 'var(--transition-fast)'
                }}>
                  <Icon size={14} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Toggle */}
          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ ...controlStyle, display: 'none' }}>
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          padding: '1rem 1.25rem',
          background: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex', flexDirection: 'column', gap: '0.5rem'
        }}>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button key={item.id}
                onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.6rem',
                  padding: '0.7rem 1rem', borderRadius: 'var(--radius-sm)',
                  fontSize: '0.88rem', fontWeight: isActive ? 700 : 600,
                  color: isActive ? '#ffffff' : 'var(--text-primary)',
                  background: isActive ? 'var(--accent-gold)' : 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                  width: '100%', textAlign: 'left', cursor: 'pointer'
                }}>
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
