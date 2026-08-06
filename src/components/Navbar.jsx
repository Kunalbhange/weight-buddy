import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CURRENCY_MAP } from '../utils/currency';
import { LayoutDashboard, Utensils, Activity, Bot, Settings, LogOut, Menu, X, Globe, Dumbbell, Sparkles, Flame, Zap } from 'lucide-react';

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
        padding: '0.85rem 1.75rem',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between'
      }}>
        {/* Unique, Ultra-Attractive Brand Logo */}
        <div 
          onClick={() => setActiveTab(user ? 'dashboard' : 'landing')} 
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.85rem' }}
        >
          {/* Unique Emblem Container with Flame & Dumbbell Overlay */}
          <div style={{
            position: 'relative',
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #ffffff 0%, #1a1a24 100%)',
            padding: '2px',
            boxShadow: '0 6px 20px rgba(255, 255, 255, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              background: '#050507',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Distinctive W Lettermark with Flame Badge */}
              <span className="font-heading" style={{
                fontSize: '1.4rem',
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1,
                letterSpacing: '-0.05em'
              }}>
                W
              </span>
              <div style={{
                position: 'absolute',
                bottom: '2px',
                right: '2px',
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                background: '#d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 8px rgba(217, 119, 6, 0.8)'
              }}>
                <Flame size={9} color="#ffffff" />
              </div>
            </div>
          </div>

          <div>
            <div className="font-heading" style={{
              fontSize: '1.4rem',
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '-0.03em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem'
            }}>
              Weight<span style={{ color: '#fbbf24' }}>Buddy</span>
              <Sparkles size={14} color="#fbbf24" style={{ marginLeft: '0.1rem' }} />
            </div>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.66rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.08em',
              fontWeight: 800,
              textTransform: 'uppercase'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#d97706', display: 'inline-block' }} />
              AI Student Fitness Engine
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
            borderRadius: 'var(--radius-sm)',
            border: '1.5px solid var(--border-medium)'
          }}>
            <Globe size={15} color="#fbbf24" />
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
                <option key={code} value={code} style={{ background: '#0e0e12', color: '#fff' }}>
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
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.88rem',
                      fontWeight: 800,
                      color: isActive ? '#050507' : 'var(--text-secondary)',
                      background: isActive ? '#ffffff' : 'transparent',
                      border: isActive ? 'none' : '1.5px solid transparent',
                      cursor: 'pointer',
                      transition: 'var(--transition-normal)',
                      boxShadow: isActive ? '0 4px 15px rgba(255, 255, 255, 0.3)' : 'none'
                    }}
                  >
                    <Icon size={16} color={isActive ? '#050507' : 'currentColor'} />
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
          background: '#0e0e12',
          borderBottom: '1.5px solid var(--border-subtle)',
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
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  color: activeTab === item.id ? '#050507' : '#ffffff',
                  background: activeTab === item.id ? '#ffffff' : 'transparent',
                  border: 'none',
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
              gap: '0.65rem',
              padding: '0.8rem 1rem',
              color: '#ffffff',
              background: 'rgba(239, 68, 68, 0.25)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
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
