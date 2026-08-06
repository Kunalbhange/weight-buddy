import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { DietPlanPage } from './pages/DietPlanPage';
import { BmiMetricsPage } from './pages/BmiMetricsPage';
import { PhysiquePage } from './pages/PhysiquePage';
import { AiChatPage } from './pages/AiChatPage';
import { SettingsPage } from './pages/SettingsPage';
import { PrivacyPage } from './pages/PrivacyPage';

const AppContent = () => {
  const { user, onboarding, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('landing');

  // Handle default tab routing based on auth state
  useEffect(() => {
    if (!loading) {
      if (user) {
        if (!onboarding) {
          setActiveTab('onboarding');
        } else if (activeTab === 'landing' || activeTab === 'login' || activeTab === 'signup') {
          setActiveTab('dashboard');
        }
      }
    }
  }, [user, onboarding, loading]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#08080a',
        color: 'var(--text-primary)'
      }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800,
          fontSize: '1.3rem',
          marginBottom: '1rem'
        }}>
          W
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Loading WeightBuddy Session...</div>
      </div>
    );
  }

  const renderCurrentPage = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage setActiveTab={setActiveTab} />;
      case 'login':
        return <LoginPage setActiveTab={setActiveTab} />;
      case 'signup':
        return <SignupPage setActiveTab={setActiveTab} />;
      case 'forgot-password':
        return <ForgotPasswordPage setActiveTab={setActiveTab} />;
      case 'onboarding':
        return <OnboardingPage setActiveTab={setActiveTab} />;
      case 'dashboard':
        return <DashboardPage setActiveTab={setActiveTab} />;
      case 'diet':
        return <DietPlanPage />;
      case 'bmi':
        return <BmiMetricsPage />;
      case 'physique':
        return <PhysiquePage />;
      case 'ai':
        return <AiChatPage />;
      case 'settings':
        return <SettingsPage setActiveTab={setActiveTab} />;
      case 'privacy':
        return <PrivacyPage />;
      default:
        return <LandingPage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main style={{ flex: 1 }}>
        {renderCurrentPage()}
      </main>
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
