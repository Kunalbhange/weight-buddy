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
      background: 'rgba(9, 9, 13, 0.92)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0.85rem 1.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Cool Gen Z Electric Violet & Cyan Brand Logo */}
        <div 
          onClick={() => setActiveTab(user ? 'dashboard' : 'landing')} 
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            color: '#ffffff',
            fontSize: '1.3rem',
            fontFamily: 'var(--font-heading)',
            boxShadow: '0 4px 18px rgba(139, 92, 246, 0.4)'
          }}>
            W
          </div>
          <div>
            <div className="font-heading" style={{ fontSize: '1.35rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Weight<span style={{ background: 'linear-gradient(135deg, #a78bfa, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Buddy</span>
            </div>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontSize: '0.65rem',
              color: '#a78bfa',
              letterSpacing: '0.04em',
              fontWeight: 700,
              textTransform: 'uppercase'
            }}>
              <Sparkles size={10} color="#a78bfa" /> Student Fitness Engine
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {/* Currency Selector */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(255,255,255,0.08)',
            padding: '0.4rem 0.8rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-medium)'
          }}>
            <Globe size={15} color="#a78bfa" />
            <select
              value={currency}
              onChange={(e) => changeCurrency(e.target.value)}
              style={{
                background: 'none',
                border: 'none',
                color: '#ffffff',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              {Object.keys(CURRENCY_MAP).map(code => (
                <option key={code} value={code} style={{ background: '#12131a', color: '#fff' }}>
                  {CURRENCY_MAP[code].label}
                </option>
              ))}
            </select>
          </div>

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
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.88rem',
                      fontWeight: 800,
                      color: '#ffffff',
                      background: isActive ? 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)' : 'transparent',
                      border: isActive ? 'none' : '1px solid transparent',
                      opacity: isActive ? 1 : 0.75,
                      cursor: 'pointer',
                      transition: 'var(--transition-normal)',
                      boxShadow: isActive ? '0 4px 15px rgba(139, 92, 246, 0.45)' : 'none'
                    }}
                  >
                    <Icon size={16} color="#ffffff" />
                    {item.label}
                  </button>
                );
              })}
              <button
                onClick={logout}
                title="Logout"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-full)',
                  color: '#ffffff',
                  cursor: 'pointer',
                  padding: '0.5rem 0.65rem',
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '0.2rem'
                }}
              >
                <LogOut size={16} color="#ffffff" />
              </button>
            </nav>
          ) : (
            <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
              <button className="btn-secondary" onClick={() => setActiveTab('login')} style={{ padding: '0.55rem 1.35rem', fontSize: '0.88rem' }}>
                Sign In
              </button>
              <button className="btn-primary" onClick={() => setActiveTab('signup')} style={{ padding: '0.55rem 1.35rem', fontSize: '0.88rem' }}>
                Get Started Free
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          {user && (
            <button 
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'none',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'none'
              }}
            >
              {mobileMenuOpen ? <X size={24} color="#ffffff" /> : <Menu size={24} color="#ffffff" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {user && mobileMenuOpen && (
        <div style={{
          padding: '1rem',
          background: '#12131a',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
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
                  gap: '0.65rem',
                  padding: '0.8rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  color: '#ffffff',
                  background: activeTab === item.id ? '#8b5cf6' : 'transparent',
                  border: 'none',
                  width: '100%',
                  textAlign: 'left'
                }}
              >
                <Icon size={18} color="#ffffff" />
                {item.label}
              </button>
            );
          })}
          <button
            onClick={() => { logout(); setMobileMenuOpen(false); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.8rem 1rem',
              color: '#ffffff',
              background: 'rgba(239, 68, 68, 0.25)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              marginTop: '0.5rem',
              fontWeight: 800
            }}
          >
            <LogOut size={18} color="#ffffff" />
            Logout
          </button>
        </div>
      )}
    </header>
  );
};
