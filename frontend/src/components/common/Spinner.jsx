import React from 'react';

const Spinner = ({ 
  size = 'md', 
  color = 'blue',
  className = '' 
}) => {
  const sizes = {
    xs: 'h-4 w-4 border-2',
    sm: 'h-6 w-6 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-10 w-10 border-4',
    xl: 'h-12 w-12 border-4'
  };
  
  const colors = {
    blue: 'border-blue-600 border-t-transparent',
    teal: 'border-teal-500 border-t-transparent',
    white: 'border-white border-t-transparent',
    gray: 'border-gray-400 border-t-transparent'
  };
  
  return (
    <div 
      className={`inline-block rounded-full animate-spin ${sizes[size]} ${colors[color]} ${className}`}
      role="status"
    />
  );
};

export default Spinner;