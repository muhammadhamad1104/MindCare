import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const [activePolicy, setActivePolicy] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  const policies = {
    terms: {
      title: "Terms & Conditions",
      content: (
        <ul className="space-y-2">
          <li>• All psychologists listed are licensed professionals verified by our team.</li>
          <li>• We connect clients with psychologists but don't provide therapy services directly.</li>
          <li>• Booking requests go directly to each psychologist's email.</li>
          <li>• We don't handle payments - all financial arrangements are between client and psychologist.</li>
          <li>• Profiles are maintained by each psychologist with admin oversight.</li>
        </ul>
      )
    },
    privacy: {
      title: "Privacy Policy",
      content: (
        <p className="text-sm leading-relaxed">
          We take your privacy seriously. When you submit a booking request, your information is sent directly 
          to the psychologist you selected. We store minimal data to facilitate connections and improve our service. 
          Psychologists on our platform are responsible for maintaining client confidentiality according to their 
          professional ethics. We don't share your information with third parties except as necessary to operate 
          the service. Analytics are collected anonymously to improve the platform.
        </p>
      )
    },
    cancellation: {
      title: "Cancellation Policy",
      content: (
        <ul className="space-y-2">
          <li>• Cancellation policies are set by each individual psychologist.</li>
          <li>• Please contact your psychologist directly for any scheduling changes.</li>
          <li>• We recommend discussing cancellation policies during your initial consultation.</li>
        </ul>
      )
    },
    psychologist: {
      title: "For Psychologists",
      content: (
        <ul className="space-y-2">
          <li>• Flat monthly fee with no per-client charges.</li>
          <li>• You maintain full control over your practice and client relationships.</li>
          <li>• We handle marketing and client connections, you focus on therapy.</li>
          <li>• Easy profile management through your private portal.</li>
          <li>• Detailed analytics on profile views and booking requests.</li>
        </ul>
      )
    }
  };

  const togglePolicy = (policy) => {
    if (activePolicy === policy || !activePolicy) {
      setIsClosing(false);
      setActivePolicy(policy);
    } else {
      setIsClosing(true);
      setTimeout(() => {
        setActivePolicy(policy);
        setIsClosing(false);
      }, 300);
    }
  };

  const closePolicy = () => {
    setIsClosing(true);
    setTimeout(() => {
      setActivePolicy(null);
      setIsClosing(false);
    }, 300);
  };

  return (
    <div className="relative">
      {/* Policy Overlay with improved styling */}
      <div className={`fixed inset-x-0 bottom-0 z-50 bg-slate-950 text-white transition-all duration-300 ease-in-out transform ${
        activePolicy ? (isClosing ? 'translate-y-full' : 'translate-y-0') : 'translate-y-full'
      } h-1/3.5 max-h-96 overflow-y-auto rounded-t-lg shadow-xl`}>
        <div className="container mx-auto px-6 py-4 relative">
          {/* Chevron (V) button - now properly positioned and styled */}
          <div className="absolute top-6 -right-8 -translate-x-1/2 z-50">
  <button
    onClick={closePolicy}
    className="flex items-center gap-1 bg-gradient-to-r from-teal-500 to-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-md hover:from-teal-600 hover:to-blue-700 hover:scale-105 transition-all"
    aria-label="Close policy"
  >
    Close
    <FontAwesomeIcon icon={faChevronDown} className="text-sm" />
  </button>
</div>

          
          <h3 className="text-xl font-bold pt-2 pr-8">{activePolicy && policies[activePolicy].title}</h3>
          <div className="text-sm mt-4 pb-6">
            {activePolicy && policies[activePolicy].content}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <footer className="bg-blue-950 text-gray-200 pt-12 pb-8 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* About Section */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-teal-300 mb-4 flex items-center">
                <FontAwesomeIcon icon="handshake" className="mr-2 w-5 h-5" />
                TherapyConnect
              </h3>
              <p className="mb-4 text-gray-300 text-sm">
                Connecting clients with licensed psychologists across the country. 
                Our platform makes it easy to find the right mental health professional 
                for your needs.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-teal-300 hover:text-white transition-all duration-300">
                  <FontAwesomeIcon icon={['fab', 'facebook']} className="w-5 h-5" />
                </a>
                <a href="#" className="text-teal-300 hover:text-white transition-all duration-300">
                  <FontAwesomeIcon icon={['fab', 'twitter']} className="w-5 h-5" />
                </a>
                <a href="#" className="text-teal-300 hover:text-white transition-all duration-300">
                  <FontAwesomeIcon icon={['fab', 'instagram']} className="w-5 h-5" />
                </a>
                <a href="#" className="text-teal-300 hover:text-white transition-all duration-300">
                  <FontAwesomeIcon icon={['fab', 'linkedin']} className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-teal-300 mb-4">Quick Links</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <ul className="space-y-3">
                    <li>
                      <a href="/" className="text-gray-300 hover:text-teal-300 flex items-center transition-all duration-300 text-sm">
                        <FontAwesomeIcon icon="heart" className="mr-2 text-teal-300 w-4 h-4" />
                        Home
                      </a>
                    </li>
                    <li>
                      <a href="/psychologists" className="text-gray-300 hover:text-teal-300 flex items-center transition-all duration-300 text-sm">
                        <FontAwesomeIcon icon="search" className="mr-2 text-teal-300 w-4 h-4" />
                        Find a Psychologist
                      </a>
                    </li>
                    <li>
                      <a href="/how-it-works" className="text-gray-300 hover:text-teal-300 flex items-center transition-all duration-300 text-sm">
                        <FontAwesomeIcon icon="question-circle" className="mr-2 text-teal-300 w-4 h-4" />
                        How It Works
                      </a>
                    </li>
                    <li>
                      <a href="/about" className="text-gray-300 hover:text-teal-300 flex items-center transition-all duration-300 text-sm">
                        <FontAwesomeIcon icon="users" className="mr-2 text-teal-300 w-4 h-4" />
                        About Us
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-3">
                    <li>
                      <a href="/contact" className="text-gray-300 hover:text-teal-300 flex items-center transition-all duration-300 text-sm">
                        <FontAwesomeIcon icon="comment" className="mr-2 text-teal-300 w-4 h-4" />
                        Contact
                      </a>
                    </li>
                    <li>
                      <button 
                        onClick={() => togglePolicy('psychologist')} 
                        className="text-gray-300 hover:text-teal-300 flex items-center transition-all duration-300 w-full text-left text-sm"
                      >
                        <FontAwesomeIcon icon="user-md" className="mr-2 text-teal-300 w-4 h-4" />
                        For Psychologists
                      </button>
                    </li>
                    <li>
                      <a href="/faq" className="text-gray-300 hover:text-teal-300 flex items-center transition-all duration-300 text-sm">
                        <FontAwesomeIcon icon="question-circle" className="mr-2 text-teal-300 w-4 h-4" />
                        FAQ
                      </a>
                    </li>
                    <li>
                      <a href="/blog" className="text-gray-300 hover:text-teal-300 flex items-center transition-all duration-300 text-sm">
                        <FontAwesomeIcon icon="newspaper" className="mr-2 text-teal-300 w-4 h-4" />
                        Blog
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* For Psychologists Section */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-teal-300 mb-4">For Psychologists</h3>
              <ul className="space-y-3">
                <li className="flex items-start text-sm">
                  <FontAwesomeIcon icon="user-md" className="mt-1 mr-3 text-teal-300 w-4 h-4" />
                  <span>Join our network of licensed professionals</span>
                </li>
                <li className="flex items-start text-sm">
                  <FontAwesomeIcon icon="handshake" className="mt-1 mr-3 text-teal-300 w-4 h-4" />
                  <span>Simple flat monthly fee - no per-client charges</span>
                </li>
                <li className="flex items-start text-sm">
                  <FontAwesomeIcon icon="calendar-alt" className="mt-1 mr-3 text-teal-300 w-4 h-4" />
                  <span>Manage your profile and availability</span>
                </li>
                <li className="mt-3">
                  <a 
                    href="/contact" 
                    className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center transition-all duration-300 shadow-md hover:shadow-lg text-sm"
                  >
                    <FontAwesomeIcon icon="user-md" className="mr-2 w-4 h-4" />
                    List Your Practice
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info Section */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-teal-300 mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start text-sm">
                  <FontAwesomeIcon icon="envelope" className="mt-1 mr-3 text-teal-300 w-4 h-4" />
                  <a href="mailto:info@therapyconnect.com" className="hover:text-teal-300 transition-all duration-300">
                    info@therapyconnect.com
                  </a>
                </li>
                <li className="flex items-start text-sm">
                  <FontAwesomeIcon icon="phone" className="mt-1 mr-3 text-teal-300 w-4 h-4" />
                  <a href="tel:+18005551234" className="hover:text-teal-300 transition-all duration-300">
                    (800) 555-1234
                  </a>
                </li>
                <li className="flex items-start text-sm">
                  <FontAwesomeIcon icon="map-marker-alt" className="mt-1 mr-3 text-teal-300 w-4 h-4" />
                  <span>123 Wellness Way, Suite 100<br />Mental Health City, MH 12345</span>
                </li>
                <li className="flex items-start text-sm">
                  <FontAwesomeIcon icon="clock" className="mt-1 mr-3 text-teal-300 w-4 h-4" />
                  <span>Support Hours: Mon-Fri, 9 AM - 5 PM</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="border-t border-blue-700 mt-8 pt-6 text-center text-gray-300">
            <p className="text-sm">© {new Date().getFullYear()} TherapyConnect. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-3 text-sm">
              <button 
                onClick={() => togglePolicy('privacy')} 
                className="hover:text-teal-300 transition-all duration-300"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => togglePolicy('terms')} 
                className="hover:text-teal-300 transition-all duration-300"
              >
                Terms of Service
              </button>
              <button 
                onClick={() => togglePolicy('cancellation')} 
                className="hover:text-teal-300 transition-all duration-300"
              >
                Cancellation Info
              </button>
              <button 
                onClick={() => togglePolicy('psychologist')} 
                className="hover:text-teal-300 transition-all duration-300"
              >
                For Professionals
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;