import React, { forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FormInput = forwardRef(({
  label,
  icon,
  error,
  description,
  variant = 'default',
  className = '',
  ...props
}, ref) => {
  const variants = {
    default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
    error: 'border-red-500 focus:border-red-500 focus:ring-red-500',
    success: 'border-green-500 focus:border-green-500 focus:ring-green-500'
  };
  
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FontAwesomeIcon 
              icon={icon} 
              className={`h-5 w-5 ${
                variant === 'error' ? 'text-red-500' : 
                variant === 'success' ? 'text-green-500' : 'text-gray-400'
              }`} 
            />
          </div>
        )}
        
        <input
          ref={ref}
          className={`block w-full rounded-lg border ${
            variants[variant] || variants.default
          } shadow-sm focus:ring-2 focus:ring-opacity-50 ${
            icon ? 'pl-10' : 'pl-3'
          } pr-3 py-3 transition-all duration-200`}
          {...props}
        />
      </div>
      
      {description && !error && (
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <FontAwesomeIcon icon="exclamation-circle" className="mr-1" />
          {error}
        </p>
      )}
    </div>
  );
});

export default FormInput;