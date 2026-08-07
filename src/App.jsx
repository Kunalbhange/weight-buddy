import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Floating3DFoodCanvas } from './components/Floating3DFoodCanvas';

// Pages
import { LandingPage } from './pages/LandingPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { DietPlanPage } from './pages/DietPlanPage';
import { BmiMetricsPage } from './pages/BmiMetricsPage';
import { PhysiquePage } from './pages/PhysiquePage';
import { AiChatPage } from './pages/AiChatPage';
import { SettingsPage } from './pages/SettingsPage';
import { PrivacyPage } from './pages/PrivacyPage';

const AppContent = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderCurrentPage = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage setActiveTab={setActiveTab} />;
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
        return <DashboardPage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      <Floating3DFoodCanvas />
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main style={{ flex: 1, zIndex: 2, position: 'relative' }}>
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
