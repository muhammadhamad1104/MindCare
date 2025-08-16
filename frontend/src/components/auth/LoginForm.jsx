import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import FormInput from '../common/FormInput';
import Button from '../common/Button';
import { useAuth } from '../../hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import loadingAnimation from '../../assets/images/ui/loading-animation.gif';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      // Navigation after login is handled in AuthProvider
    } catch (err) {
      // Error is already handled by useAuth
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
      <div className="text-center mb-8">
        <div className="mx-auto bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
          <FontAwesomeIcon icon={faUser} className="text-indigo-600 text-2xl" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Sign In</h2>
        <p className="text-gray-600 mt-2">
          Access your psychologist portal or admin dashboard
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
          <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="Email Address"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="your@email.com"
          icon={faEnvelope}
        />
        
        <div>
          <FormInput
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            icon={faLock}
          />
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="show-password"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <label htmlFor="show-password" className="ml-2 text-sm text-gray-700">
              Show password
            </label>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">
              Remember me
            </label>
          </div>
          
          <Link 
            to="/forgot-password" 
            className="text-sm text-indigo-600 hover:text-indigo-800"
          >
            Forgot password?
          </Link>
        </div>
        
        <Button 
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <img 
                src={loadingAnimation} 
                alt="Loading" 
                className="w-5 h-5 mr-2" 
              />
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </Button>
      </form>
      
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Are you a psychologist looking to join our platform?
        </p>
        <Link 
          to="/contact?inquiry=psychologist" 
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          Contact us to list your practice
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;