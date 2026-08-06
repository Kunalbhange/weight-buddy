import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [onboarding, setOnboarding] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('wb_token') || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch current user from server on load
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
        // Token invalid
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

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      // ignore server logout error
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
