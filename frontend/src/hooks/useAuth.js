import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// This hook provides a simpler interface to the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return {
    user: context.user,
    loading: context.loading,
    error: context.error,
    isAuthenticated: context.isAuthenticated,
    isAdmin: context.isAdmin,
    isPsychologist: context.isPsychologist,
    login: context.login,
    logout: context.logout,
    updateUser: context.updateUser,
    resetPassword: context.resetPassword
  };
};