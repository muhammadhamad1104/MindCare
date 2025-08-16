import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faClock, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import verificationBadge from '../../../assets/images/ui/verification-badge.jpeg';
import placeholder from '../../../assets/images/ui/psychologist-placeholder.png';
import featuredBadge from '../../../assets/images/ui/featured-badge.jpeg';

const HeaderSection = ({ psychologist }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Cover image */}
      <div className="bg-gray-200 border-2 border-dashed h-48 w-full" />
      
      {/* Profile header */}
      <div className="relative px-6 pb-6">
        <div className="flex flex-col md:flex-row">
          {/* Profile image */}
          <div className="relative -mt-16 md:mr-6">
            <div className="bg-white p-1 rounded-full shadow-lg">
              <img 
                src={psychologist.image || placeholder} 
                alt={psychologist.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white"
              />
              {psychologist.verified && (
                <img 
                  src={verificationBadge} 
                  alt="Verified Professional"
                  className="absolute bottom-2 right-2 w-8 h-8"
                />
              )}
            </div>
          </div>
          
          {/* Profile info */}
          <div className="flex-grow mt-4 md:mt-0">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start">
              <div>
                <div className="flex items-center">
                  <h1 className="text-3xl font-bold text-gray-800">
                    {psychologist.name}
                  </h1>
                  {psychologist.featured && (
                    <img 
                      src={featuredBadge} 
                      alt="Featured Professional"
                      className="w-8 h-8 ml-2"
                    />
                  )}
                </div>
                
                <p className="text-gray-600 text-lg mt-1">
                  {psychologist.credentials}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {psychologist.specializations.map((spec, idx) => (
                    <span 
                      key={idx}
                      className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 flex flex-col items-end">
                <div className="flex items-center">
                  <FontAwesomeIcon 
                    icon={faUserCheck} 
                    className={`text-lg mr-2 ${
                      psychologist.acceptingNewClients 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`} 
                  />
                  <span className={
                    psychologist.acceptingNewClients 
                      ? 'text-green-700 font-medium' 
                      : 'text-red-700 font-medium'
                  }>
                    {psychologist.acceptingNewClients 
                      ? 'Accepting new clients' 
                      : 'Not accepting new clients'}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Meta info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center">
                <FontAwesomeIcon 
                  icon={faMapMarkerAlt} 
                  className="text-gray-500 text-lg mr-3" 
                />
                <div>
                  <p className="text-gray-600 text-sm">Location</p>
                  <p className="font-medium">{psychologist.location}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-gray-600 text-sm">Experience</p>
                  <p className="font-medium">{psychologist.experience} years</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <FontAwesomeIcon 
                  icon={faClock} 
                  className="text-gray-500 text-lg mr-3" 
                />
                <div>
                  <p className="text-gray-600 text-sm">Response Time</p>
                  <p className="font-medium">{psychologist.responseTime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;