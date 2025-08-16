import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ 
  placeholder = 'Search...', 
  onSearch, 
  delay = 300,
  className = ''
}) => {
  const [query, setQuery] = useState('');
  
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(query);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [query, delay, onSearch]);
  
  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };
  
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FontAwesomeIcon icon={faSearch} className="h-5 w-5 text-gray-400" />
      </div>
      
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="block w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
      />
      
      {query && (
        <button
          onClick={clearSearch}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <FontAwesomeIcon 
            icon={faTimes} 
            className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" 
          />
        </button>
      )}
    </div>
  );
};

export default SearchBar;