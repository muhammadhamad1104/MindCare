import React from 'react';
import { NavLink } from 'react-router-dom';

const MainNav = ({ darkMode = false }) => {
  const navLinks = [
    { path: '/psychologists', label: 'Find a Therapist' },
    { path: '/how-it-works', label: 'How It Works' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="flex items-center space-x-8">
      {navLinks.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) => 
            `font-medium transition-colors ${
              isActive 
                ? 'text-blue-600' 
                : darkMode 
                  ? 'text-gray-200 hover:text-white' 
                  : 'text-gray-700 hover:text-blue-500'
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default MainNav;