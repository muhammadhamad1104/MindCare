import React from 'react';
import { Link } from 'react-router-dom';
import Chip from '../../common/Chip';

const PopularSpecializations = () => {
  const specializations = [
    { name: "Anxiety", filter: "anxiety" },
    { name: "Depression", filter: "depression" },
    { name: "Couples Therapy", filter: "couples" },
    { name: "Trauma", filter: "trauma" },
    { name: "Child & Teen", filter: "child-teen" },
    { name: "Stress Management", filter: "stress" },
    { name: "Relationship Issues", filter: "relationships" },
    { name: "Grief Counseling", filter: "grief" },
    { name: "OCD", filter: "ocd" },
    { name: "PTSD", filter: "ptsd" }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Popular Specializations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find professionals specializing in your specific needs
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {specializations.map((specialization, index) => (
            <Link 
              key={index}
              to={`/psychologists?specialization=${specialization.filter}`}
            >
              <Chip 
                label={specialization.name} 
                className="bg-white hover:bg-indigo-50 text-indigo-800 border border-indigo-200 text-lg px-6 py-3 transition-all"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularSpecializations;