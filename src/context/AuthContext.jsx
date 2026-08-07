import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedName = localStorage.getItem('wb_student_name');
    return savedName ? { id: 'student_active', name: savedName } : { id: 'student_active', name: 'Campus Student' };
  });

  const [onboarding, setOnboarding] = useState({
    age: 21,
    sex: 'male',
    heightCm: 175,
    weightKg: 70,
    activityLevel: 'moderate',
    scheduleDensity: 'moderate',
    dietaryRestrictions: ['vegetarian'],
    goal: 'gain_muscle'
  });

  const [currency, setCurrency] = useState(localStorage.getItem('wb_currency') || 'INR');
  const [theme, setTheme] = useState(localStorage.getItem('wb_theme') || 'dark');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('wb_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const changeCurrency = (code) => {
    setCurrency(code);
    localStorage.setItem('wb_currency', code);
  };

  // Instant Name Setup without Login Hassle
  const setStudentName = (name) => {
    const cleanName = name.trim() || 'Campus Student';
    localStorage.setItem('wb_student_name', cleanName);
    setUser({ id: 'student_active', name: cleanName });
  };

  const logout = () => {
    localStorage.removeItem('wb_student_name');
    setUser({ id: 'student_active', name: 'Campus Student' });
  };

  const updateOnboardingState = (data) => {
    setOnboarding(prev => ({ ...prev, ...data }));
  };

  return (
    <AuthContext.Provider value={{
      user,
      onboarding,
      currency,
      changeCurrency,
      theme,
      toggleTheme,
      setTheme,
      loading,
      setStudentName,
      logout,
      updateOnboardingState
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
