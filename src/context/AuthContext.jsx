import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [onboarding, setOnboarding] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('wb_token') || null);
  const [currency, setCurrency] = useState(localStorage.getItem('wb_currency') || 'INR');
  const [theme, setTheme] = useState(localStorage.getItem('wb_theme') || (localStorage.getItem('wb_token') ? 'dark' : 'light'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sync theme attribute to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('wb_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const fetchMe = async (authToken = token) => {
    if (!authToken) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        setOnboarding(data.onboarding);
        setError(null);
        // Automatically default to dark mode after logging in
        if (!localStorage.getItem('wb_theme')) {
          setTheme('dark');
        }
      } else {
        localStorage.removeItem('wb_token');
        setToken(null);
        setUser(null);
        setOnboarding(null);
      }
    } catch (err) {
      console.error('Failed to fetch authenticated user session:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, [token]);

  const changeCurrency = (code) => {
    setCurrency(code);
    localStorage.setItem('wb_currency', code);
  };

  const login = async (email, password) => {
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed.');
      }

      localStorage.setItem('wb_token', data.token);
      setToken(data.token);
      setUser(data.user);
      // Switch background theme to black (dark mode) after login
      setTheme('dark');
      await fetchMe(data.token);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const signup = async (name, email, password) => {
    setError(null);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), password })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Signup failed.');
      }

      localStorage.setItem('wb_token', data.token);
      setToken(data.token);
      setUser(data.user);
      // Switch background theme to black (dark mode) after signup
      setTheme('dark');
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      // ignore
    }
    localStorage.removeItem('wb_token');
    setToken(null);
    setUser(null);
    setOnboarding(null);
    setTheme('light');
  };

  const updateOnboardingState = (data) => {
    setOnboarding(data);
  };

  return (
    <AuthContext.Provider value={{
      user,
      onboarding,
      token,
      currency,
      changeCurrency,
      theme,
      toggleTheme,
      setTheme,
      loading,
      error,
      login,
      signup,
      logout,
      fetchMe,
      updateOnboardingState,
      setError
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
