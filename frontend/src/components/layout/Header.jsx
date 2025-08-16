import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Button from '../common/Button';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/psychologists?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { path: '/psychologists', label: 'Find a Therapist' },
    { path: '/how-it-works', label: 'How It Works' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const handleAuthAction = () => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'psychologist') {
        navigate('/portal');
      } else {
        navigate('/profile');
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              M
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              MindCare
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <form 
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md mx-6"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search therapists..."
                className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600"
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </form>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => 
                  `font-medium transition-colors ${
                    isActive 
                      ? 'text-blue-600' 
                      : scrolled 
                        ? 'text-gray-700 hover:text-blue-500' 
                        : 'text-white hover:text-blue-300'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Button 
                  variant={scrolled ? "secondary" : "outline"} 
                  className="px-4 py-2 text-sm"
                  onClick={handleAuthAction}
                >
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  {user.name?.split(' ')[0] || 'Dashboard'}
                </Button>
                <Button 
                  variant={scrolled ? "outline" : "secondary"} 
                  className="px-4 py-2 text-sm"
                  onClick={logout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant={scrolled ? "secondary" : "outline"} 
                  className="px-4 py-2 text-sm"
                  onClick={() => navigate('/login')}
                >
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  Login
                </Button>
                <Button 
                  variant="primary" 
                  className="px-4 py-2 text-sm"
                  onClick={() => navigate('/contact?for=psychologists')}
                >
                  List Your Practice
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} size="lg" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg shadow-xl p-4 absolute left-4 right-4 z-50">
            {/* Search Bar - Mobile */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search therapists..."
                  className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600"
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </form>

            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className="font-medium text-gray-700 hover:text-blue-600 py-2 border-b border-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="flex flex-col space-y-3 pt-4">
                {user ? (
                  <>
                    <Button 
                      variant="secondary" 
                      className="w-full"
                      onClick={() => {
                        handleAuthAction();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <FontAwesomeIcon icon={faUser} className="mr-2" />
                      {user.name?.split(' ')[0] || 'Dashboard'}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="secondary" 
                      className="w-full"
                      onClick={() => {
                        navigate('/login');
                        setMobileMenuOpen(false);
                      }}
                    >
                      <FontAwesomeIcon icon={faUser} className="mr-2" />
                      Login
                    </Button>
                    <Button 
                      variant="primary" 
                      className="w-full"
                      onClick={() => {
                        navigate('/contact?for=psychologists');
                        setMobileMenuOpen(false);
                      }}
                    >
                      List Your Practice
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;