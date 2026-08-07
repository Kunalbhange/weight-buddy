import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Floating3DFoodCanvas } from './components/Floating3DFoodCanvas';
import { motion, AnimatePresence } from 'framer-motion';


// Dedicated Standalone Frontend View Components
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
  // Always default to 'landing' so site link opens directly on the Front Page
  const [activeTab, setActiveTab] = useState('landing');

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
        return <LandingPage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      <Floating3DFoodCanvas activeTab={activeTab} />

      {activeTab !== 'landing' && (
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
      <main style={{ flex: 1, zIndex: 2, position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: '100%', minHeight: '100%' }}
          >
            {renderCurrentPage()}
          </motion.div>
        </AnimatePresence>
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
