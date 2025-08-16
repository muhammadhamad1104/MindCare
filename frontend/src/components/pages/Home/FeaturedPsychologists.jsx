import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../../common/Carousel';
import Card from '../../common/Card';
import placeholder from '../../../assets/images/ui/psychologist-placeholder.png';
import verificationBadge from '../../../assets/images/ui/verification-badge.jpeg';

const FeaturedPsychologists = () => {
  const [psychologists, setPsychologists] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate API call to get featured psychologists
  useEffect(() => {
    // In real app, this would come from API
    const mockData = [
      {
        id: 1,
        name: "Dr. Sarah Johnson",
        specializations: ["Anxiety", "Depression", "Trauma"],
        location: "New York, NY",
        experience: 12,
        image: null
      },
      {
        id: 2,
        name: "Dr. Michael Chen",
        specializations: ["Couples Therapy", "Relationships"],
        location: "San Francisco, CA",
        experience: 8,
        image: null
      },
      {
        id: 3,
        name: "Dr. Emily Rodriguez",
        specializations: ["Child & Teen", "Family Therapy"],
        location: "Austin, TX",
        experience: 10,
        image: null
      },
      {
        id: 4,
        name: "Dr. James Wilson",
        specializations: ["PTSD", "Trauma", "Veterans"],
        location: "Chicago, IL",
        experience: 15,
        image: null
      },
      {
        id: 5,
        name: "Dr. Priya Patel",
        specializations: ["Stress Management", "Mindfulness"],
        location: "Seattle, WA",
        experience: 7,
        image: null
      },
      {
        id: 6,
        name: "Dr. Robert Thompson",
        specializations: ["OCD", "Anxiety Disorders"],
        location: "Boston, MA",
        experience: 11,
        image: null
      }
    ];

    setTimeout(() => {
      setPsychologists(mockData);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Featured Psychologists
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Loading our top professionals...
            </p>
          </div>
          <div className="flex justify-center">
            <div className="animate-pulse bg-gray-200 rounded-xl w-32 h-32" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Featured Psychologists
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Highly-rated professionals currently accepting new clients
          </p>
        </div>

        <Carousel>
          {psychologists.map((psych) => (
            <div key={psych.id} className="px-4 py-2">
              <Card className="h-full">
                <div className="flex flex-col h-full">
                  <div className="relative">
                    <img 
                      src={psych.image || placeholder} 
                      alt={psych.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <img 
                      src={verificationBadge} 
                      alt="Verified Professional"
                      className="absolute bottom-0 right-0 w-16 h-16 transform translate-x-2 translate-y-2"
                    />
                  </div>
                  <div className="p-6 flex-grow">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {psych.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {psych.specializations.slice(0, 3).map((spec, idx) => (
                        <span 
                          key={idx}
                          className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                    <div className="text-gray-600 mb-4">
                      <p className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {psych.location}
                      </p>
                      <p className="flex items-center mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {psych.experience}+ years experience
                      </p>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <Link 
                      to={`/psychologists/${psych.id}`}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 block text-center"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default FeaturedPsychologists;