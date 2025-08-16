import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Avatar = ({ src, size = 'md', initials, className = '' }) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-24 h-24 text-xl'
  };
  
  return (
    <div className={`relative rounded-full overflow-hidden flex-shrink-0 ${sizes[size]} ${className}`}>
      {src ? (
        <img 
          src={src} 
          alt="Avatar" 
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center text-white">
          {initials ? (
            <span className="font-bold">{initials}</span>
          ) : (
            <FontAwesomeIcon icon={faUser} />
          )}
        </div>
      )}
    </div>
  );
};

export default Avatar;