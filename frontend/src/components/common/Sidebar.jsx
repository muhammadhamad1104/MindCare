import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from './Avatar';

const Sidebar = ({ 
  items, 
  user, 
  className = '' 
}) => {
  return (
    <div className={`bg-white h-full shadow-md rounded-lg overflow-hidden ${className}`}>
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <Avatar 
            src={user?.avatar} 
            initials={user?.name?.split(' ').map(n => n[0]).join('')} 
            size="md"
          />
          <div className="ml-4">
            <h3 className="font-medium text-gray-900">{user?.name}</h3>
            <p className="text-sm text-gray-500">{user?.role}</p>
          </div>
        </div>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-50 to-teal-50 text-blue-600 border-l-4 border-blue-500'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                {item.icon && (
                  <FontAwesomeIcon 
                    icon={item.icon} 
                    className="mr-3 text-lg" 
                  />
                )}
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;