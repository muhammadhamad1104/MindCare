import React from 'react';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import errorIllustration from '../assets/images/illustrations/error-illustration.jpeg';

const NotFound = () => {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <img 
            src={errorIllustration} 
            alt="404 Error" 
            className="w-64 mx-auto mb-8"
          />
          <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
          <h2 className="text-2xl font-medium text-gray-600 mb-6">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button as="a" href="/" className="bg-indigo-600 hover:bg-indigo-700">
            Return Home
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;