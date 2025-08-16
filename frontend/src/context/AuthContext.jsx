import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth';
import { useNavigate, useLocation } from 'react-router-dom';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize authentication state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const userData = await authService.verifyToken(token);
          setUser(userData);
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        localStorage.removeItem('authToken');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Redirect after login if there's a redirect path
  useEffect(() => {
    if (!loading && user) {
      const redirectPath = location.state?.from?.pathname || 
                           (user.role === 'admin' ? '/admin' : 
                            user.role === 'psychologist' ? '/portal' : '/');
      navigate(redirectPath);
    }
  }, [user, loading, navigate, location]);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { user: userData, token } = await authService.login(email, password);
      localStorage.setItem('authToken', token);
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    navigate('/login');
  };

  const updateUser = (updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }));
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isPsychologist: user?.role === 'psychologist',
    login,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};