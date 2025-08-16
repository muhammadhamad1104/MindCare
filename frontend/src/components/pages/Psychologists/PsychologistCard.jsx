import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../common/Card';
import Chip from '../../common/Chip';
import verificationBadge from '../../../assets/images/ui/verification-badge.jpeg';
import placeholder from '../../../assets/images/ui/psychologist-placeholder.png';

const PsychologistCard = ({ psychologist }) => {
  return (
    <Card className="h-full transform transition-all hover:scale-[1.02] hover:shadow-lg">
      <div className="flex flex-col h-full">
        {/* Header with image and verification badge */}
        <div className="relative">
          <div className="bg-gray-200 border-2 border-dashed rounded-t-xl w-full h-48" />
          <div className="absolute -bottom-10 left-4">
            <div className="bg-white p-1 rounded-full">
              <img 
                src={psychologist.image || placeholder} 
                alt={psychologist.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-white"
              />
              {psychologist.verified && (
                <img 
                  src={verificationBadge} 
                  alt="Verified Professional"
                  className="absolute bottom-1 right-1 w-6 h-6"
                />
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-12 px-4 pb-4 flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                {psychologist.name}
              </h3>
              <p className="text-gray-600 text-sm">
                {psychologist.credentials}
              </p>
            </div>
            
            {psychologist.featured && (
              <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded">
                Featured
              </span>
            )}
          </div>

          <div className="mt-3 mb-4">
            <div className="flex items-center text-gray-600 text-sm mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {psychologist.location}
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              {psychologist.experience} years experience
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {psychologist.specializations.slice(0, 3).map((spec, idx) => (
              <Chip 
                key={idx}
                label={spec}
                className="bg-indigo-100 text-indigo-800"
              />
            ))}
            {psychologist.specializations.length > 3 && (
              <span className="text-sm text-gray-500">
                +{psychologist.specializations.length - 3} more
              </span>
            )}
          </div>

          <div className="mt-4 mb-2">
            <p className="text-gray-700 font-medium">
              {psychologist.rate ? `~ ${psychologist.rate}` : 'Contact for rates'}
            </p>
          </div>
        </div>

        {/* Footer with CTA */}
        <div className="px-4 pb-4">
          <Link 
            to={`/psychologists/${psychologist.slug}`}
            className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white text-center font-medium py-2 px-4 rounded-lg transition duration-300"
          >
            View Profile
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default PsychologistCard;