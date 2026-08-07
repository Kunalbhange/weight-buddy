import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [onboarding, setOnboarding] = useState(null);
  const [currency, setCurrency] = useState(localStorage.getItem('wb_currency') || 'INR');
  const [theme, setTheme] = useState(localStorage.getItem('wb_theme') || 'dark');
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('wb_token');
      if (!token) {
        setLoading(false);
        return;
      }
      const res = await fetch('/api/auth/me', {
        credentials: 'same-origin',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.user) {
        setUser(data.user);
        if (data.onboarding) setOnboarding(data.onboarding);
      } else {
        localStorage.removeItem('wb_token');
      }
    } catch (err) {
      console.error('Check auth error', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('wb_theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
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
    setUser(data.user);
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
    setUser(data.user);
  };

  const logout = async () => {
    const token = localStorage.getItem('wb_token');
    await fetch('/api/auth/logout', { 
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Authorization': `Bearer ${token}` } 
    });
    localStorage.removeItem('wb_token');
    setUser(null);
    setOnboarding(null);
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
      login,
      signup,
      logout,
      updateOnboardingState
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
