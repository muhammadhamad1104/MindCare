import React from 'react';

const Tabs = ({ 
  tabs, 
  activeTab, 
  onTabChange,
  variant = 'default',
  className = ''
}) => {
  const variants = {
    default: 'border-b border-gray-200',
    pills: 'space-x-3',
    underline: 'border-b border-gray-200'
  };
  
  const tabVariants = {
    default: {
      active: 'border-blue-500 text-blue-600 border-b-2',
      inactive: 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
    },
    pills: {
      active: 'bg-gradient-to-r from-blue-600 to-teal-500 text-white',
      inactive: 'text-gray-700 hover:bg-gray-100'
    },
    underline: {
      active: 'text-blue-600 border-b-2 border-blue-500',
      inactive: 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
    }
  };
  
  return (
    <div className={`${variants[variant] || variants.default} ${className}`}>
      <nav className={`flex ${variant === 'pills' ? '-mb-px' : ''}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`mr-8 py-4 px-1 text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? tabVariants[variant].active
                : tabVariants[variant].inactive
            }`}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                activeTab === tab.id 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Tabs;