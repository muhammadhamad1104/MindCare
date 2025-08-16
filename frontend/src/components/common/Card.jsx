import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './Button';

const Card = ({ 
  title, 
  subtitle, 
  description, 
  image, 
  tags = [], 
  actionText, 
  actionIcon, 
  onClick,
  className = ''
}) => {
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 ${className}`}>
      {image && (
        <div className="h-48 bg-gray-200 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            {subtitle && (
              <p className="text-blue-600 text-sm">{subtitle}</p>
            )}
          </div>
        </div>
        
        {description && (
          <p className="text-gray-600 mb-4">{description}</p>
        )}
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {actionText && (
          <Button
            variant="secondary"
            onClick={onClick}
            icon={actionIcon}
            className="w-full"
          >
            {actionText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Card;