
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FormInput from '../../components/common/FormInput';
import Button from '../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import loadingAnimation from '../../assets/images/ui/loading-animation.gif';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
          <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 text-2xl" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Check Your Email</h2>
        <p className="text-gray-600 mb-6">
          We've sent a password reset link to <span className="font-medium">{email}</span>. 
          Please check your inbox and follow the instructions.
        </p>
        <Button 
          as={Link}
          to="/login"
          className="w-full bg-indigo-600 hover:bg-indigo-700"
        >
          Return to Login
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Reset Password</h2>
        <p className="text-gray-600 mt-2">
          Enter your email to receive a password reset link
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
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
              Sending...
            </>
          ) : (
            'Send Reset Link'
          )}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <Link 
          to="/login" 
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          Return to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;