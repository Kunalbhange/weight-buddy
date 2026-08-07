import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CURRENCY_MAP } from '../utils/currency';
import { LayoutDashboard, Utensils, Activity, Bot, Settings, LogOut, Menu, X, Globe, Dumbbell, Sparkles } from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab }) => {
  const { user, logout, currency, changeCurrency } = useAuth();
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
      background: 'rgba(5, 5, 7, 0.95)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1.5px solid var(--border-subtle)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0.75rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between'
      }}>
        {/* Clean Brand Logo */}
        <div 
          onClick={() => setActiveTab(user ? 'dashboard' : 'landing')} 
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.65rem' }}
        >
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '8px',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            fontWeight: 900,
            color: '#050507',
            fontSize: '1.2rem',
            fontFamily: 'var(--font-heading)',
            boxShadow: '0 4px 14px rgba(255, 255, 255, 0.25)',
            flexShrink: 0
          }}>
            W
          </div>
          <div>
            <div className="font-heading" style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Weight<span style={{ color: '#d97706' }}>Buddy</span>
            </div>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontSize: '0.6rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.05em',
              fontWeight: 700,
              textTransform: 'uppercase',
              marginTop: '0.1rem'
            }}>
              <Sparkles size={9} color="#d97706" /> Student Fitness Engine
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {/* Currency Selector */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            background: 'rgba(255,255,255,0.08)',
            padding: '0.35rem 0.65rem',
            borderRadius: 'var(--radius-sm)',
            border: '1.5px solid var(--border-medium)'
          }}>
            <Globe size={14} color="#d97706" />
            <select
              value={currency}
              onChange={(e) => changeCurrency(e.target.value)}
              style={{
                background: 'none',
                border: 'none',
                color: '#ffffff',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              {Object.keys(CURRENCY_MAP).map(code => (
                <option key={code} value={code} style={{ background: '#0e0e12', color: '#fff' }}>
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
                      padding: '0.45rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      color: isActive ? '#050507' : 'var(--text-secondary)',
                      background: isActive ? '#ffffff' : 'transparent',
                      border: isActive ? 'none' : '1.5px solid transparent',
                      cursor: 'pointer',
                      transition: 'var(--transition-normal)',
                      boxShadow: isActive ? '0 4px 15px rgba(255, 255, 255, 0.3)' : 'none'
                    }}
                  >
                    <Icon size={15} color={isActive ? '#050507' : 'currentColor'} />
                    {item.label}
                  </button>
                );
              })}
              <button
                onClick={logout}
                title="Logout"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1.5px solid var(--border-medium)',
                  borderRadius: 'var(--radius-sm)',
                  color: '#ffffff',
                  cursor: 'pointer',
                  padding: '0.45rem 0.6rem',
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '0.2rem'
                }}
              >
                <LogOut size={15} color="#ffffff" />
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

          {/* Mobile Menu Button Toggle */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid var(--border-medium)',
              color: '#ffffff',
              borderRadius: 'var(--radius-sm)',
              padding: '0.4rem 0.55rem',
              cursor: 'pointer',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {mobileMenuOpen ? <X size={20} color="#ffffff" /> : <Menu size={20} color="#ffffff" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          padding: '1rem 1.25rem',
          background: '#0e0e12',
          borderBottom: '1.5px solid var(--border-subtle)',
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
                      color: activeTab === item.id ? '#050507' : '#ffffff',
                      background: activeTab === item.id ? '#ffffff' : 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--border-subtle)',
                      width: '100%',
                      textAlign: 'left'
                    }}
                  >
                    <Icon size={18} color={activeTab === item.id ? '#050507' : '#ffffff'} />
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
                  color: '#ffffff',
                  background: 'rgba(239, 68, 68, 0.25)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  borderRadius: 'var(--radius-sm)',
                  marginTop: '0.4rem',
                  fontWeight: 800
                }}
              >
                <LogOut size={18} color="#ffffff" />
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
