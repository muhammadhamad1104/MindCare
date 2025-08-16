import React from 'react';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faUser, 
  faEnvelope,
  faCalendarAlt,
  faChartLine,
  faHandHoldingUsd
} from '@fortawesome/free-solid-svg-icons';
import onboardingSteps from '../assets/images/illustrations/onboarding-steps.jpeg';

const HowItWorks = () => {
  const clientSteps = [
    {
      icon: faSearch,
      title: "Browse Professionals",
      description: "Search our directory of licensed psychologists by specialization, location, and other criteria."
    },
    {
      icon: faUser,
      title: "View Profiles",
      description: "Review detailed profiles including credentials, approach, rates, and availability."
    },
    {
      icon: faEnvelope,
      title: "Send Request",
      description: "Submit a booking request that goes directly to the psychologist's email."
    }
  ];

  const psychologistSteps = [
    {
      icon: faChartLine,
      title: "Get Listed",
      description: "Submit your practice details for review and approval by our team."
    },
    {
      icon: faUser,
      title: "Manage Profile",
      description: "Update your availability, specialties, and profile information anytime."
    },
    {
      icon: faHandHoldingUsd,
      title: "Receive Clients",
      description: "Get matched with clients and pay a simple fixed monthly fee with no commissions."
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">How It Works</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Simple steps to connect with mental health professionals or list your practice
          </p>
        </div>
      </section>
      
      {/* For Clients */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">For Clients</h2>
              <p className="text-xl text-gray-600">
                Find and connect with the right psychologist in three simple steps
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
              {clientSteps.map((step, index) => (
                <div key={index} className="bg-indigo-50 rounded-xl p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-6 mx-auto">
                    <FontAwesomeIcon 
                      icon={step.icon} 
                      className="text-indigo-600 text-2xl" 
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Button as="a" href="/psychologists" className="bg-indigo-600 hover:bg-indigo-700">
                Browse Psychologists
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* For Psychologists */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">For Psychologists</h2>
              <p className="text-xl text-gray-600">
                Join our platform and start connecting with clients in need of your expertise
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
              {psychologistSteps.map((step, index) => (
                <div key={index} className="bg-white rounded-xl shadow p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-6 mx-auto">
                    <FontAwesomeIcon 
                      icon={step.icon} 
                      className="text-indigo-600 text-2xl" 
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Button as="a" href="/contact?inquiry=psychologist" className="bg-indigo-600 hover:bg-indigo-700">
                List Your Practice
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            </div>
            
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Is there a fee for clients to use the platform?</h3>
                <p className="text-gray-600">
                  No, clients can browse psychologists and send booking requests completely free of charge. 
                  We never charge clients any fees.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">How do psychologists pay for the service?</h3>
                <p className="text-gray-600">
                  Psychologists pay a fixed monthly subscription fee. There are no commissions or 
                  per-client charges. You'll know exactly what you're paying each month.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">How are booking requests handled?</h3>
                <p className="text-gray-600">
                  When a client submits a booking request through your profile, it is sent directly 
                  to your contact email. You then coordinate directly with the client to schedule 
                  sessions and handle payments.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">What information is included in a booking request?</h3>
                <p className="text-gray-600">
                  Each request includes the client's name, email, phone (if provided), message, 
                  preferred times, and the profile page they were viewing when they made the request.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HowItWorks;