import React from 'react';
import patternDark from '../../../assets/images/home-pattern-dark.jpeg';
import licenseSeal from '../../../assets/images/ui/license-seal.jpeg';

const TrustSignals = () => {
  const signals = [
    {
      title: "Licensed Professionals",
      description: "All psychologists are verified and licensed in their practice regions."
    },
    {
      title: "No Platform Fees",
      description: "We never charge clients fees - psychologists pay a fixed monthly subscription."
    },
    {
      title: "Privacy First",
      description: "Your information is protected with industry-standard security measures."
    }
  ];

  return (
    <section 
      className="py-20 text-white relative"
      style={{ backgroundImage: `url(${patternDark})` }}
    >
      <div className="absolute inset-0 bg-indigo-900 opacity-90"></div>
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/3 mb-10 md:mb-0 flex justify-center">
            <div className="relative">
              <img 
                src={licenseSeal} 
                alt="License Verification Seal" 
                className="w-64 h-64"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white rounded-full w-48 h-48 flex items-center justify-center">
                  <span className="text-indigo-800 text-4xl font-bold">100%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3 md:pl-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Why Trust Our Platform
            </h2>
            
            <div className="space-y-8">
              {signals.map((signal, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-indigo-500 rounded-full w-8 h-8 flex items-center justify-center">
                      <span className="font-bold">{index + 1}</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold mb-2">{signal.title}</h3>
                    <p className="text-indigo-100">{signal.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 bg-white bg-opacity-10 p-6 rounded-xl border border-indigo-300">
              <p className="italic">
                "We maintain the highest standards for our professionals to ensure 
                you receive quality care from experienced, credentialed providers."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;