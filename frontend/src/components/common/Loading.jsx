import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Loading = ({ text = 'Loading...', fullScreen = true }) => {
  return (
    <div className={`flex items-center justify-center ${
      fullScreen ? 'fixed inset-0 bg-white bg-opacity-80 z-50' : 'py-12'
    }`}>
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4">
          <FontAwesomeIcon 
            icon={faSpinner} 
            className="text-blue-600 text-xl" 
          />
        </div>
        <p className="text-gray-700 font-medium">{text}</p>
      </div>
    </div>
  );
};

export default Loading;