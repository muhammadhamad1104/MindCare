import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Loading from '../common/Loading';

const PrivateRoute = ({ children, roles = [] }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return <Loading fullScreen />;
  }
  
  if (!isAuthenticated) {
    // Redirect to login page, saving the current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Check if user has required role
  if (roles.length > 0 && !roles.includes(user.role)) {
    // Redirect to unauthorized page or home
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default PrivateRoute;