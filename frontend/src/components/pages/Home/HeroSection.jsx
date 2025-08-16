import React from 'react';
import { Link } from 'react-router-dom';
import heroBg from '../../../assets/images/backgrounds/hero-bg.jpeg';

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Calming therapy scene" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-indigo-900 opacity-70"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Find the right psychologist, fast.
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-indigo-100 animate-fade-in delay-150">
            Connect with licensed professionals who understand your needs. 
            No platform fees, just direct support.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in delay-300">
            <Link 
              to="/psychologists" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 text-lg"
            >
              Browse Psychologists
            </Link>
            <Link 
              to="/how-it-works" 
              className="bg-white hover:bg-indigo-50 text-indigo-800 font-bold py-3 px-8 rounded-full transition duration-300 text-lg"
            >
              How It Works
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;