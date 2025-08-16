// src/pages/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faChartLine, faEnvelope, faUsers, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';

// Image imports
import missionBg from '../assets/images/backgrounds/about-mission-bg.jpeg';
import teamPhoto from '../assets/images/about-team.jpeg';

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white">
        <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 slide-up">
            Our Mission: Connecting You with Trusted Mental Health Professionals
          </h1>
          <p className="text-xl max-w-3xl mx-auto fade-in">
            We're building a platform where quality care meets accessibility - 
            helping psychologists thrive while clients find the perfect match.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How Our Platform Works
            </h2>
            <div className="w-24 h-1 bg-teal-500 mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
              A simple, ethical model that benefits both psychologists and clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: faHandshake,
                title: "For Psychologists",
                description: "We handle marketing and client referrals for a fixed monthly fee - you focus on providing care.",
                color: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100"
              },
              {
                icon: faChartLine,
                title: "Transparent Model",
                description: "No per-client commissions or hidden fees. One predictable monthly cost.",
                color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
              },
              {
                icon: faEnvelope,
                title: "Direct Connection",
                description: "Clients contact you directly - you manage your own schedule and payments.",
                color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100"
              }
            ].map((item, index) => (
              <div key={index} className="card scale-in">
                <div className={`${item.color} w-16 h-16 rounded-full flex items-center justify-center mb-6`}>
                  <FontAwesomeIcon icon={item.icon} className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section 
        className="section-padding relative bg-cover bg-center"
        style={{ backgroundImage: `url(${missionBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-teal-800/90 z-0" />
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="w-16 h-1 bg-teal-400 mb-6"></div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Commitment to Quality Care
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {[
                {
                  icon: faUsers,
                  title: "Vetted Professionals",
                  description: "Every psychologist is licensed and undergoes a thorough verification process"
                },
                {
                  icon: faLightbulb,
                  title: "Client-Centered Approach",
                  description: "We prioritize matching clients with specialists who fit their specific needs"
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-teal-500 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <FontAwesomeIcon icon={item.icon} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <p className="text-lg mb-8">
              We believe mental health care should be accessible, transparent, and focused on 
              creating meaningful connections between clients and professionals. Our platform 
              removes barriers so psychologists can focus on what they do best - providing 
              exceptional care.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img 
                src={teamPhoto} 
                alt="Our Team" 
                className="rounded-xl shadow-xl w-full max-h-[500px] object-cover"
              />
            </div>
            
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Story
              </h2>
              <div className="w-24 h-1 bg-teal-500 mb-6"></div>
              
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Founded by mental health advocates and technology experts, our platform 
                emerged from a shared frustration with the barriers in mental health care access.
              </p>
              
              <p className="mb-6 text-gray-700 dark:text-gray-300">
                We saw talented psychologists struggling with marketing and administration, 
                while clients faced challenges finding the right specialist. Our solution 
                creates a win-win for everyone involved.
              </p>
              
              <div className="bg-teal-50 dark:bg-gray-700 p-6 rounded-lg border-l-4 border-teal-500">
                <p className="italic text-gray-700 dark:text-gray-300">
                  "We're not just building a directory - we're creating a community where 
                  mental health professionals thrive and clients find compassionate, 
                  specialized care."
                </p>
                <p className="mt-4 font-medium">— The MindConnect Team</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-teal-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Community
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-xl">
            Whether you're a psychologist looking to grow your practice or someone 
            seeking mental health support, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact">
              <Button primary className="px-8 py-4 text-lg hover-glow">
                For Psychologists
              </Button>
            </Link>
            <Link to="/psychologists">
              <Button secondary className="px-8 py-4 text-lg bg-white text-blue-800 hover:bg-blue-50">
                Browse Professionals
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;