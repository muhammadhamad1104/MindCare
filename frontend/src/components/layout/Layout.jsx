import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Loading from '../common/Loading';

const Layout = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
    
    // Simulate loading state
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {loading ? (
          <Loading fullScreen={true} text="Loading content..." />
        ) : (
          children
        )}
      </main>
      
      <Footer />
      
      {/* Fixed "List Your Practice" button for mobile */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <button className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 shadow-lg flex items-center justify-center text-white hover:from-blue-700 hover:to-teal-600 transition-all duration-300">
          <span className="sr-only">List Your Practice</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Layout;