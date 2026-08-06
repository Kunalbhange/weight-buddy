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
      background: 'rgba(7, 7, 10, 0.88)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1.5px solid var(--border-subtle)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0.85rem 1.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab(user ? 'dashboard' : 'landing')} 
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.85rem' }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #10b981 0%, #8b5cf6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            color: '#fff',
            fontSize: '1.4rem',
            fontFamily: 'var(--font-heading)',
            boxShadow: '0 4px 20px rgba(139, 92, 246, 0.45)'
          }}>
            W
          </div>
          <div>
            <div className="font-heading" style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
              Weight<span style={{ background: 'linear-gradient(135deg, #10b981, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Buddy</span>
            </div>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.65rem',
              color: '#a78bfa',
              letterSpacing: '0.06em',
              fontWeight: 800,
              textTransform: 'uppercase'
            }}>
              <Sparkles size={10} color="#a78bfa" /> Student Health & Nutrition Platform
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {/* Currency Selector Pill */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            background: 'rgba(255,255,255,0.06)',
            padding: '0.4rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            border: '1.5px solid var(--border-medium)'
          }}>
            <Globe size={15} color="var(--accent-emerald-light)" />
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
                <option key={code} value={code} style={{ background: '#0f0f15', color: '#fff' }}>
                  {CURRENCY_MAP[code].label}
                </option>
              ))}
            </select>
          </div>

          {user ? (
            <nav className="desktop-nav" style={{ display: 'flex', gap: '0.45rem', alignItems: 'center' }}>
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
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      color: isActive ? '#fff' : 'var(--text-secondary)',
                      background: isActive ? 'var(--grad-emerald)' : 'transparent',
                      border: isActive ? 'none' : '1.5px solid transparent',
                      cursor: 'pointer',
                      transition: 'var(--transition-tactile)',
                      boxShadow: isActive ? '0 4px 18px rgba(16, 185, 129, 0.45)' : 'none'
                    }}
                  >
                    <Icon size={16} color={isActive ? '#fff' : 'currentColor'} />
                    {item.label}
                  </button>
                );
              })}
              <button
                onClick={logout}
                title="Logout"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1.5px solid var(--border-medium)',
                  borderRadius: 'var(--radius-full)',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '0.5rem 0.65rem',
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '0.2rem'
                }}
              >
                <LogOut size={16} />
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
                color: 'var(--text-primary)',
                cursor: 'pointer',
                display: 'none'
              }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {user && mobileMenuOpen && (
        <div style={{
          padding: '1rem',
          background: '#0f0f15',
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
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  color: activeTab === item.id ? '#34d399' : 'var(--text-primary)',
                  background: activeTab === item.id ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
                  border: 'none',
                  width: '100%',
                  textAlign: 'left'
                }}
              >
                <Icon size={18} />
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
              color: '#fca5a5',
              background: 'rgba(239, 68, 68, 0.18)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              marginTop: '0.5rem',
              fontWeight: 800
            }}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </header>
  );
};
