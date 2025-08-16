import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import patternLight from '../../../assets/images/home-pattern-light.jpeg';

const HowItWorks = () => {
  const steps = [
    {
      icon: faSearch,
      title: "Browse Professionals",
      description: "Explore our directory of licensed psychologists specialized in various areas."
    },
    {
      icon: faUser,
      title: "View Profiles",
      description: "Check credentials, specializations, and approach to find your perfect match."
    },
    {
      icon: faEnvelope,
      title: "Send Request",
      description: "Submit a booking request that goes directly to the psychologist's email."
    }
  ];

  return (
    <section 
      className="py-20 relative"
      style={{ backgroundImage: `url(${patternLight})` }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple steps to connect with the right mental health professional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-lg border border-indigo-100 transform transition-all hover:-translate-y-2"
            >
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-6 mx-auto">
                <FontAwesomeIcon 
                  icon={step.icon} 
                  className="text-indigo-600 text-2xl" 
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                {step.title}
              </h3>
              <p className="text-gray-600 text-center">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;