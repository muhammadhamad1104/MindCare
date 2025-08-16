// src/routes.jsx
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ErrorBoundary from './components/common/ErrorBoundary';
import PrivateRoute from './components/auth/PrivateRoute';
import { USER_ROLES } from './utils/constants';

// Public pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import HowItWorks from './pages/HowItWorks';
import Psychologists from './pages/Psychologists';
import PsychologistDetail from './pages/PsychologistDetail';
import NotFound from './pages/NotFound';

// Auth pages
import Login from './pages/Auth/Login';
import ForgotPassword from './pages/Auth/ForgotPassword';

// Portal pages (Psychologist)
import PortalDashboard from './pages/Portal/Dashboard';
import PortalProfile from './pages/Portal/Profile';
import PortalAnalytics from './pages/Portal/Analytics';
import PortalSettings from './pages/Portal/Settings';

// Admin pages
import AdminDashboard from './pages/Admin/Dashboard';
import AdminAnalytics from './pages/Admin/Analytics';
import AdminBookings from './pages/Admin/Bookings';
import AdminContent from './pages/Admin/ContentManagement';
import PsychologistList from './pages/Admin/Psychologists/ListPsychologists';
import CreatePsychologist from './pages/Admin/Psychologists/CreatePsychologist';
import EditPsychologist from './pages/Admin/Psychologists/EditPsychologist';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      // Public routes
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'how-it-works', element: <HowItWorks /> },
      { path: 'psychologists', element: <Psychologists /> },
      { path: 'psychologists/:slug', element: <PsychologistDetail /> },
      
      // Auth routes
      { path: 'login', element: <Login /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      
      // Psychologist portal routes
      {
        path: 'portal',
        element: <PrivateRoute allowedRoles={[USER_ROLES.PSYCHOLOGIST]} />,
        children: [
          { index: true, element: <PortalDashboard /> },
          { path: 'profile', element: <PortalProfile /> },
          { path: 'analytics', element: <PortalAnalytics /> },
          { path: 'settings', element: <PortalSettings /> },
        ]
      },
      
      // Admin routes
      {
        path: 'admin',
        element: <PrivateRoute allowedRoles={[USER_ROLES.ADMIN]} />,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: 'analytics', element: <AdminAnalytics /> },
          { path: 'bookings', element: <AdminBookings /> },
          { path: 'content', element: <AdminContent /> },
          { path: 'psychologists', element: <PsychologistList /> },
          { path: 'psychologists/create', element: <CreatePsychologist /> },
          { path: 'psychologists/:id/edit', element: <EditPsychologist /> },
        ]
      },
      
      // 404 route
      { path: '*', element: <NotFound /> }
    ]
  }
]);

export default router;