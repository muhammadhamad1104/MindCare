import React from 'react';

const ServicesSection = ({ psychologist }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Services & Approach</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Specializations */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Specializations</h3>
          <ul className="space-y-2">
            {psychologist.specializations.map((spec, idx) => (
              <li key={idx} className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">{spec}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Services */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Services Offered</h3>
          <ul className="space-y-2">
            {psychologist.services.map((service, idx) => (
              <li key={idx} className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">{service}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Approach */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Therapeutic Approach</h3>
        <p className="text-gray-700">
          {psychologist.approach || "This professional hasn't provided information about their therapeutic approach yet."}
        </p>
      </div>
      
      {/* Rates & Availability */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Rates</h3>
          <p className="text-gray-700">
            {psychologist.rate || "Contact for rate information"}
          </p>
          {psychologist.insuranceAccepted && (
            <div className="mt-2">
              <p className="text-gray-700">
                <span className="font-medium">Insurance Accepted:</span> {psychologist.insuranceAccepted}
              </p>
            </div>
          )}
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Availability</h3>
          <p className="text-gray-700">
            {psychologist.availability || "Contact for availability"}
          </p>
          <div className="mt-2">
            <p className={`font-medium ${
              psychologist.acceptingNewClients 
                ? 'text-green-700' 
                : 'text-red-700'
            }`}>
              {psychologist.acceptingNewClients 
                ? 'Currently accepting new clients' 
                : 'Currently not accepting new clients'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;