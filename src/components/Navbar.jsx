import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CURRENCY_MAP } from '../utils/currency';
import { LayoutDashboard, Utensils, Activity, Bot, Settings, LogOut, Menu, X, Globe, Dumbbell, Sparkles, Moon, Sun } from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab }) => {
  const { user, logout, currency, changeCurrency, theme, toggleTheme } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'diet', label: 'Diet Plan', icon: Utensils },
    { id: 'bmi', label: 'BMI & Trends', icon: Activity },
    { id: 'physique', label: 'Physique & Goals', icon: Dumbbell },
    { id: 'ai', label: 'AI Assistant', icon: Bot },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: theme === 'dark' ? 'rgba(5, 5, 7, 0.95)' : 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(16px)',
      borderBottom: theme === 'dark' ? '1.5px solid var(--border-subtle)' : '1.5px solid #e2e8f0',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
      transition: 'background 0.3s ease, border-color 0.3s ease'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0.75rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between'
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab(user ? 'dashboard' : 'landing')} 
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.65rem' }}
          className="float-animation"
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: theme === 'dark' ? '#ffffff' : '#050507',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            fontWeight: 900,
            color: theme === 'dark' ? '#050507' : '#ffffff',
            fontSize: '1.2rem',
            fontFamily: 'var(--font-heading)',
            boxShadow: '0 6px 18px rgba(0, 0, 0, 0.25)',
            flexShrink: 0
          }}>
            W
          </div>
          <div>
            <div className="font-heading" style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Weight<span style={{ color: '#d97706' }}>Buddy</span>
            </div>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontSize: '0.62rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.05em',
              fontWeight: 800,
              textTransform: 'uppercase',
              marginTop: '0.1rem'
            }}>
              <Sparkles size={10} color="#d97706" /> Student Fitness Engine
            </span>
          </div>
        </div>

        {/* Navigation Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {/* DARK / LIGHT MODE TOGGLE BUTTON */}
          <button
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#f1f5f9',
              border: theme === 'dark' ? '1.5px solid rgba(255,255,255,0.25)' : '1.5px solid #cbd5e1',
              borderRadius: 'var(--radius-sm)',
              padding: '0.35rem 0.65rem',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              fontWeight: 800,
              fontSize: '0.78rem',
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
            gap: '0.3rem',
            background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#f1f5f9',
            padding: '0.35rem 0.65rem',
            borderRadius: 'var(--radius-sm)',
            border: theme === 'dark' ? '1.5px solid rgba(255,255,255,0.25)' : '1.5px solid #cbd5e1'
          }}>
            <Globe size={14} color="#d97706" />
            <select
              value={currency}
              onChange={(e) => changeCurrency(e.target.value)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '0.8rem',
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

          {/* Desktop Navigation */}
          {user ? (
            <nav className="desktop-nav" style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
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
                      gap: '0.45rem',
                      padding: '0.5rem 0.95rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      color: isActive ? (theme === 'dark' ? '#050507' : '#ffffff') : 'var(--text-secondary)',
                      background: isActive ? (theme === 'dark' ? '#ffffff' : '#0f172a') : 'transparent',
                      border: isActive ? 'none' : '1.5px solid transparent',
                      cursor: 'pointer',
                      transition: 'var(--transition-normal)',
                      boxShadow: isActive ? '0 6px 18px rgba(0,0,0,0.2)' : 'none'
                    }}
                  >
                    <Icon size={15} color={isActive ? (theme === 'dark' ? '#050507' : '#ffffff') : 'currentColor'} />
                    {item.label}
                  </button>
                );
              })}
              <button
                onClick={logout}
                title="Logout"
                style={{
                  background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#f1f5f9',
                  border: theme === 'dark' ? '1.5px solid rgba(255,255,255,0.25)' : '1.5px solid #cbd5e1',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  padding: '0.5rem 0.65rem',
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '0.2rem'
                }}
              >
                <LogOut size={15} color="currentColor" />
              </button>
            </nav>
          ) : (
            <div className="desktop-nav" style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
              <button className="btn-secondary" onClick={() => setActiveTab('login')} style={{ padding: '0.45rem 1.1rem', fontSize: '0.85rem' }}>
                Sign In
              </button>
              <button className="btn-primary" onClick={() => setActiveTab('signup')} style={{ padding: '0.45rem 1.1rem', fontSize: '0.85rem' }}>
                Get Started Free
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#f1f5f9',
              border: theme === 'dark' ? '1.5px solid rgba(255,255,255,0.25)' : '1.5px solid #cbd5e1',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.4rem 0.55rem',
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
          padding: '1rem 1.25rem',
          background: theme === 'dark' ? '#0e0e12' : '#ffffff',
          borderBottom: theme === 'dark' ? '1.5px solid var(--border-subtle)' : '1.5px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem'
        }}>
          {user ? (
            <>
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
                      padding: '0.8rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.92rem',
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
              <button
                onClick={() => { logout(); setMobileMenuOpen(false); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.8rem 1rem',
                  color: '#dc2626',
                  background: '#fef2f2',
                  border: '1.5px solid #fecaca',
                  borderRadius: 'var(--radius-sm)',
                  marginTop: '0.4rem',
                  fontWeight: 800
                }}
              >
                <LogOut size={18} color="#dc2626" />
                Logout Account
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button 
                className="btn-primary" 
                onClick={() => { setActiveTab('signup'); setMobileMenuOpen(false); }} 
                style={{ width: '100%', padding: '0.85rem' }}
              >
                Get Started Free
              </button>
              <button 
                className="btn-secondary" 
                onClick={() => { setActiveTab('login'); setMobileMenuOpen(false); }} 
                style={{ width: '100%', padding: '0.85rem' }}
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
