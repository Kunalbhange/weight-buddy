import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [onboarding, setOnboarding] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('wb_token') || null);
  const [currency, setCurrency] = useState(localStorage.getItem('wb_currency') || 'INR');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed.');
      }

      localStorage.setItem('wb_token', data.token);
      setToken(data.token);
      setUser(data.user);
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
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Signup failed.');
      }

      localStorage.setItem('wb_token', data.token);
      setToken(data.token);
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Instant 1-Click Demo Account Login
  const demoLogin = async () => {
    setError(null);
    const demoEmail = 'student.demo@weightbuddy.edu';
    const demoPass = 'demo123456';
    try {
      // Try logging in first
      return await login(demoEmail, demoPass);
    } catch (err) {
      // If demo user doesn't exist, create it automatically
      try {
        await signup('Alex (Student Demo)', demoEmail, demoPass);
        return await login(demoEmail, demoPass);
      } catch (signupErr) {
        // Fallback local mock user session
        const mockUser = { id: 'demo-user-123', name: 'Alex Morgan', email: demoEmail, isVerified: true };
        const mockOnboarding = { age: 20, sex: 'other', heightCm: 175, weightKg: 68, goal: 'maintain', scheduleDensity: 'medium' };
        const mockToken = 'mock-demo-jwt-token-12345';
        localStorage.setItem('wb_token', mockToken);
        setToken(mockToken);
        setUser(mockUser);
        setOnboarding(mockOnboarding);
        return { user: mockUser };
      }
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
      loading,
      error,
      login,
      signup,
      demoLogin,
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
