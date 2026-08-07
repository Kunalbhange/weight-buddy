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
  const [loading, setLoading] = useState(false);
  const theme = 'light';

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('wb_token');
      if (!token) return;
      const res = await fetch('/api/auth/me', {
        credentials: 'same-origin',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.user) {
        setUser(data.user);
        if (data.onboarding) setOnboarding(data.onboarding);
      }
    } catch (err) {
      console.warn('Check auth notice:', err);
    }
  };

  useEffect(() => {
    checkAuth();
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('wb_theme', 'light');
  }, []);

  const setStudentName = (name) => {
    const cleanName = name.trim() || 'Campus Student';
    localStorage.setItem('wb_student_name', cleanName);
    setUser(prev => ({ ...(prev || { id: 'student_active' }), name: cleanName }));
  };

  const changeCurrency = (code) => {
    setCurrency(code);
    localStorage.setItem('wb_currency', code);
  };

  const login = async (email, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    if (data.token) localStorage.setItem('wb_token', data.token);
    if (data.user) setUser(data.user);
    if (data.onboarding) setOnboarding(data.onboarding);
  };

  const signup = async (name, email, password) => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Signup failed');
    if (data.token) localStorage.setItem('wb_token', data.token);
    if (data.user) setUser(data.user);
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('wb_token');
      if (token) {
        await fetch('/api/auth/logout', { 
          method: 'POST',
          credentials: 'same-origin',
          headers: { 'Authorization': `Bearer ${token}` } 
        });
      }
    } catch (e) {}
    localStorage.removeItem('wb_token');
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
      theme: 'light',
      loading,
      login,
      signup,
      logout,
      fetchMe: checkAuth,
      setStudentName,
      updateOnboardingState
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
