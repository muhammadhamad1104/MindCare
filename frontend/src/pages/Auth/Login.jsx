import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Layout from '../../components/layout/Layout';
import LoginForm from '../../components/auth/LoginForm';
import loginBg from '../../assets/images/backgrounds/login-bg.webp';
import Loading from '../../components/common/Loading';

const Login = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const redirectPath = user.role === USER_ROLES.ADMIN ? '/admin' : '/portal';
      navigate(redirectPath, { replace: true });
    }
  }, [user, navigate]);

  if (loading) {
    return <Loading fullScreen />;
  }

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