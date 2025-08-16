import api from './api';
import { validateEmail } from '../utils/validation';

export const authService = {
  // User login
  login: async (email, password) => {
    if (!validateEmail(email)) {
      throw new Error('Invalid email format');
    }
    
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  },

  // Password reset request
  forgotPassword: async (email) => {
    if (!validateEmail(email)) {
      throw new Error('Invalid email format');
    }
    
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      console.error('Password reset failed', error);
      throw error;
    }
  },

  // Complete password reset
  resetPassword: async (token, newPassword) => {
    try {
      const response = await api.post('/auth/reset-password', { token, newPassword });
      return response.data;
    } catch (error) {
      console.error('Password reset failed', error);
      throw error;
    }
  },

  // Verify email
  verifyEmail: async (token) => {
    try {
      const response = await api.post('/auth/verify-email', { token });
      return response.data;
    } catch (error) {
      console.error('Email verification failed', error);
      throw error;
    }
  },

  // Get current user data
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      console.error('Failed to get user data', error);
      throw error;
    }
  },

  // Update user password
  updatePassword: async (currentPassword, newPassword) => {
    try {
      const response = await api.put('/auth/password', { currentPassword, newPassword });
      return response.data;
    } catch (error) {
      console.error('Password update failed', error);
      throw error;
    }
  },

  // Logout
  logout: async () => {
    try {
      const response = await api.post('/auth/logout');
      return response.data;
    } catch (error) {
      console.error('Logout failed', error);
      throw error;
    }
  }
};