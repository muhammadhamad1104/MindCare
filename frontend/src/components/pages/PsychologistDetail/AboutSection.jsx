import React from 'react';
import licenseSeal from '../../../assets/images/ui/license-seal.jpeg';

const AboutSection = ({ psychologist }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">About Me</h2>
      
      <div className="prose max-w-none text-gray-700">
        {psychologist.about || (
          <p className="text-gray-600">
            This professional hasn't provided an about section yet. 
            Check back soon or contact them directly for more information.
          </p>
        )}
      </div>
      
      {/* Credentials */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Credentials</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Education</h4>
            <ul className="list-disc pl-5 text-gray-600">
              {psychologist.education.map((edu, idx) => (
                <li key={idx}>{edu}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Licenses & Certifications</h4>
            <div className="flex items-start">
              <img 
                src={licenseSeal} 
                alt="License Seal" 
                className="w-12 h-12 mr-3 mt-1" 
              />
              <ul className="list-disc pl-5 text-gray-600">
                {psychologist.licenses.map((license, idx) => (
                  <li key={idx}>{license}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;