import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DashboardCard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon, 
  color = 'indigo',
  description 
}) => {
  const colorClasses = {
    indigo: {
      bg: 'bg-indigo-100',
      text: 'text-indigo-800',
      icon: 'text-indigo-500'
    },
    teal: {
      bg: 'bg-teal-100',
      text: 'text-teal-800',
      icon: 'text-teal-500'
    },
    amber: {
      bg: 'bg-amber-100',
      text: 'text-amber-800',
      icon: 'text-amber-500'
    },
    violet: {
      bg: 'bg-violet-100',
      text: 'text-violet-800',
      icon: 'text-violet-500'
    }
  };
  
  const currentColor = colorClasses[color] || colorClasses.indigo;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between">
        <div>
          <p className="text-gray-600 font-medium mb-1">{title}</p>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-800">{value}</span>
            {change !== undefined && (
              <span className={`ml-2 text-sm font-medium ${
                changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {changeType === 'increase' ? '↑' : '↓'} {change}%
              </span>
            )}
          </div>
        </div>
        
        <div className={`${currentColor.bg} w-12 h-12 rounded-full flex items-center justify-center`}>
          <FontAwesomeIcon 
            icon={icon} 
            className={`text-xl ${currentColor.icon}`} 
          />
        </div>
      </div>
      
      {description && (
        <p className="text-gray-600 text-sm mt-3">
          {description}
        </p>
      )}
    </div>
  );
};

export default DashboardCard;