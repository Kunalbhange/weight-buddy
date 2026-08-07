import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CURRENCY_MAP } from '../utils/currency';
import { LayoutDashboard, Utensils, Activity, Bot, Settings, Menu, X, Globe, Dumbbell, Sparkles, Moon, Sun, User, Check, Edit2 } from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab }) => {
  const { user, setStudentName, currency, changeCurrency, theme, toggleTheme } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(user?.name || 'Campus Student');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'diet', label: 'Diet Plan', icon: Utensils },
    { id: 'bmi', label: 'BMI & Trends', icon: Activity },
    { id: 'physique', label: 'Physique & Goals', icon: Dumbbell },
    { id: 'ai', label: 'AI Assistant', icon: Bot },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleSaveName = (e) => {
    e.preventDefault();
    setStudentName(tempName);
    setIsEditingName(false);
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: theme === 'dark' ? 'rgba(5, 5, 7, 0.96)' : 'rgba(255, 255, 255, 0.96)',
      backdropFilter: 'blur(20px)',
      borderBottom: theme === 'dark' ? '1.5px solid var(--border-subtle)' : '1.5px solid #e2e8f0',
      boxShadow: '0 6px 24px rgba(0, 0, 0, 0.06)',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        maxWidth: '1320px',
        margin: '0 auto',
        padding: '1.1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        gap: '1.5rem'
      }}>
        {/* Brand Logo with Spacious Padding */}
        <div 
          onClick={() => setActiveTab('dashboard')} 
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.85rem' }}
          className="float-animation"
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '11px',
            background: theme === 'dark' ? '#ffffff' : '#050507',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            fontWeight: 900,
            color: theme === 'dark' ? '#050507' : '#ffffff',
            fontSize: '1.25rem',
            fontFamily: 'var(--font-heading)',
            boxShadow: '0 6px 18px rgba(0, 0, 0, 0.25)',
            flexShrink: 0
          }}>
            W
          </div>
          <div>
            <div className="font-heading" style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Weight<span style={{ color: '#d97706' }}>Buddy</span>
            </div>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.64rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.06em',
              fontWeight: 800,
              textTransform: 'uppercase',
              marginTop: '0.15rem'
            }}>
              <Sparkles size={10} color="#d97706" /> Student Fitness Engine
            </span>
          </div>
        </div>

        {/* Navigation Controls with Generous Spacing */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem' }}>
          {/* STUDENT NAME BADGE / INSTANT EDIT */}
          {isEditingName ? (
            <form onSubmit={handleSaveName} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                autoFocus
                style={{
                  padding: '0.4rem 0.75rem',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  borderRadius: 'var(--radius-sm)',
                  border: '1.5px solid #d97706',
                  background: theme === 'dark' ? '#14141a' : '#ffffff',
                  color: 'var(--text-primary)',
                  width: '130px'
                }}
              />
              <button type="submit" style={{ background: '#d97706', border: 'none', color: '#fff', padding: '0.4rem 0.65rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
                <Check size={14} />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setIsEditingName(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: theme === 'dark' ? 'rgba(217, 119, 6, 0.18)' : '#fef3c7',
                border: '1.5px solid rgba(217, 119, 6, 0.45)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.45rem 0.9rem',
                color: '#d97706',
                fontWeight: 900,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              <User size={15} color="#d97706" />
              <span>{user?.name || 'Campus Student'}</span>
              <Edit2 size={12} color="#d97706" />
            </button>
          )}

          {/* DARK / LIGHT MODE TOGGLE */}
          <button
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#f1f5f9',
              border: theme === 'dark' ? '1.5px solid rgba(255,255,255,0.25)' : '1.5px solid #cbd5e1',
              borderRadius: 'var(--radius-sm)',
              padding: '0.45rem 0.8rem',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              fontWeight: 800,
              fontSize: '0.82rem',
              transition: 'var(--transition-normal)'
            }}
          >
            {theme === 'dark' ? <Sun size={15} color="#fbbf24" /> : <Moon size={15} color="#0f172a" />}
            <span>{theme === 'dark' ? 'LIGHT' : 'DARK'}</span>
          </button>

          {/* Currency Selector */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#f1f5f9',
            padding: '0.45rem 0.8rem',
            borderRadius: 'var(--radius-sm)',
            border: theme === 'dark' ? '1.5px solid rgba(255,255,255,0.25)' : '1.5px solid #cbd5e1'
          }}>
            <Globe size={15} color="#d97706" />
            <select
              value={currency}
              onChange={(e) => changeCurrency(e.target.value)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '0.82rem',
                fontWeight: 800,
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              {Object.keys(CURRENCY_MAP).map(code => (
                <option key={code} value={code} style={{ background: theme === 'dark' ? '#14141a' : '#ffffff', color: theme === 'dark' ? '#ffffff' : '#0f172a' }}>
                  {CURRENCY_MAP[code].label}
                </option>
              ))}
            </select>
          </div>

          {/* Desktop Navigation with Spaced Items */}
          <nav className="desktop-nav" style={{ display: 'flex', gap: '0.55rem', alignItems: 'center' }}>
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.55rem 1.05rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.88rem',
                    fontWeight: 800,
                    color: isActive ? (theme === 'dark' ? '#050507' : '#ffffff') : 'var(--text-secondary)',
                    background: isActive ? (theme === 'dark' ? '#ffffff' : '#0f172a') : 'transparent',
                    border: isActive ? 'none' : '1.5px solid transparent',
                    cursor: 'pointer',
                    transition: 'var(--transition-normal)',
                    boxShadow: isActive ? '0 6px 18px rgba(0,0,0,0.2)' : 'none'
                  }}
                >
                  <Icon size={16} color={isActive ? (theme === 'dark' ? '#050507' : '#ffffff') : 'currentColor'} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#f1f5f9',
              border: theme === 'dark' ? '1.5px solid rgba(255,255,255,0.25)' : '1.5px solid #cbd5e1',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.45rem 0.65rem',
              cursor: 'pointer',
              display: 'none',
              alignItems: 'center',
              justify: 'center'
            }}
          >
            {mobileMenuOpen ? <X size={20} color="currentColor" /> : <Menu size={20} color="currentColor" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          padding: '1.25rem 1.5rem',
          background: theme === 'dark' ? '#0e0e12' : '#ffffff',
          borderBottom: theme === 'dark' ? '1.5px solid var(--border-subtle)' : '1.5px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.85rem 1.1rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.94rem',
                  fontWeight: 800,
                  color: activeTab === item.id ? (theme === 'dark' ? '#050507' : '#ffffff') : 'var(--text-primary)',
                  background: activeTab === item.id ? (theme === 'dark' ? '#ffffff' : '#0f172a') : (theme === 'dark' ? '#14141a' : '#f8fafc'),
                  border: '1.5px solid var(--border-medium)',
                  width: '100%',
                  textAlign: 'left'
                }}
              >
                <Icon size={18} color={activeTab === item.id ? (theme === 'dark' ? '#050507' : '#ffffff') : 'currentColor'} />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
