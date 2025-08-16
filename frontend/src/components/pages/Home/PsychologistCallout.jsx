import React from 'react';
import { Link } from 'react-router-dom';
import patternLight from '../../../assets/images/home-pattern-light.jpeg';

const PsychologistCallout = () => {
  return (
    <section 
      className="py-16 relative"
      style={{ backgroundImage: `url(${patternLight})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-white opacity-90"></div>
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-indigo-100">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Are You a Psychologist?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our network of professionals and connect with clients looking 
            for your expertise. We handle the marketing, you focus on care.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/contact?inquiry=psychologist" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 text-lg"
            >
              List Your Practice
            </Link>
            <Link 
              to="/how-it-works" 
              className="bg-white hover:bg-indigo-50 text-indigo-800 font-bold py-3 px-8 rounded-full border border-indigo-300 transition duration-300 text-lg"
            >
              Learn More
            </Link>
          </div>
          
          <div className="mt-10 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="p-4 bg-indigo-50 rounded-lg">
                <h3 className="font-bold text-lg text-indigo-800 mb-2">Fixed Monthly Fee</h3>
                <p className="text-gray-700">No commissions or per-client charges</p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <h3 className="font-bold text-lg text-indigo-800 mb-2">Full Control</h3>
                <p className="text-gray-700">Manage your profile and availability</p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <h3 className="font-bold text-lg text-indigo-800 mb-2">Client Matching</h3>
                <p className="text-gray-700">Get matched with clients needing your expertise</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PsychologistCallout;