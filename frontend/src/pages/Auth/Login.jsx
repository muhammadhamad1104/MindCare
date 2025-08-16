
import React, { useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import LoginForm from '../../components/auth/LoginForm';
import loginBg from '../../assets/images/backgrounds/login-bg.webp';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Layout noHeader noFooter>
      <div 
        className="min-h-screen flex items-center justify-center p-4"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.85), url(${loginBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <LoginForm />
      </div>
    </Layout>
  );
};

export default Login;