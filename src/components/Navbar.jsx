import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, LayoutDashboard, Utensils, Activity, Bot, Settings, LogOut, Menu, X } from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab }) => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'diet', label: 'Diet Plan', icon: Utensils },
    { id: 'bmi', label: 'BMI & Trends', icon: Activity },
    { id: 'ai', label: 'AI Assistant', icon: Bot },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(10, 10, 10, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0.85rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab(user ? 'dashboard' : 'landing')} 
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.6rem' }}
        >
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            color: '#000',
            fontSize: '1.2rem',
            fontFamily: 'var(--font-heading)'
          }}>
            W
          </div>
          <div>
            <span className="font-heading" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Weight<span style={{ color: 'var(--accent-primary)' }}>Buddy</span>
            </span>
            <span style={{
              display: 'block',
              fontSize: '0.65rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              100% Free For Students
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        {user ? (
          <nav className="desktop-nav" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
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
                    gap: '0.4rem',
                    padding: '0.5rem 0.9rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    background: isActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                    border: isActive ? '1px solid var(--border-medium)' : '1px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Icon size={16} color={isActive ? 'var(--accent-primary)' : 'currentColor'} />
                  {item.label}
                </button>
              );
            })}
            <button
              onClick={logout}
              title="Logout"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <LogOut size={18} />
            </button>
          </nav>
        ) : (
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button className="btn-secondary" onClick={() => setActiveTab('login')} style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
              Sign In
            </button>
            <button className="btn-primary" onClick={() => setActiveTab('signup')} style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
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

      {/* Mobile Drawer */}
      {user && mobileMenuOpen && (
        <div style={{
          padding: '1rem',
          background: '#141414',
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
                  gap: '0.6rem',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.9rem',
                  color: activeTab === item.id ? 'var(--accent-primary)' : 'var(--text-primary)',
                  background: activeTab === item.id ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
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
              gap: '0.6rem',
              padding: '0.75rem 1rem',
              color: '#fca5a5',
              background: 'rgba(239, 68, 68, 0.1)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              marginTop: '0.5rem'
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
