import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Chip = ({ 
  label, 
  active = false, 
  onClick, 
  icon, 
  removable = false,
  className = ''
}) => {
  return (
    <div 
      onClick={onClick}
      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all duration-200 ${
        active
          ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-md'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      } ${className}`}
    >
      {icon && (
        <FontAwesomeIcon icon={icon} className={`mr-2 ${active ? 'text-white' : 'text-blue-600'}`} />
      )}
      {label}
      {removable && (
        <span className="ml-2 hover:text-red-500 transition-colors">
          &times;
        </span>
      )}
    </div>
  );
};

export default Chip;