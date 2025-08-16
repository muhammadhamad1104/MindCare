import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from './components/common/Loading';
import { USER_ROLES } from './utils/constants';
import PrivateRoute from './components/auth/PrivateRoute';

// Lazy-loaded pages
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const HowItWorks = React.lazy(() => import('./pages/HowItWorks'));
const Psychologists = React.lazy(() => import('./pages/Psychologists'));
const PsychologistDetail = React.lazy(() => import('./pages/PsychologistDetail'));
const Login = React.lazy(() => import('./pages/Auth/Login'));
const ForgotPassword = React.lazy(() => import('./pages/Auth/ForgotPassword'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

// Protected pages
const PortalDashboard = React.lazy(() => import('./pages/Portal/Dashboard'));
const PortalProfile = React.lazy(() => import('./pages/Portal/Profile'));
const AdminDashboard = React.lazy(() => import('./pages/Admin/Dashboard'));
const AdminPsychologists = React.lazy(() => import('./pages/Admin/Psychologists/ListPsychologists'));

function App() {
  return (
    <Suspense fallback={<Loading fullScreen />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/psychologists" element={<Psychologists />} />
        <Route path="/psychologists/:slug" element={<PsychologistDetail />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Psychologist Portal Routes */}
        <Route path="/portal" element={
          <PrivateRoute allowedRoles={[USER_ROLES.PSYCHOLOGIST]}>
            <PortalDashboard />
          </PrivateRoute>
        } />
        <Route path="/portal/profile" element={
          <PrivateRoute allowedRoles={[USER_ROLES.PSYCHOLOGIST]}>
            <PortalProfile />
          </PrivateRoute>
        } />
        
        {/* Admin Routes */}
        <Route path="/admin" element={
          <PrivateRoute allowedRoles={[USER_ROLES.ADMIN]}>
            <AdminDashboard />
          </PrivateRoute>
        } />
        <Route path="/admin/psychologists" element={
          <PrivateRoute allowedRoles={[USER_ROLES.ADMIN]}>
            <AdminPsychologists />
          </PrivateRoute>
        } />
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;