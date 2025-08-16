import React from 'react';
import Chip from '../../common/Chip';
import Select from '../../common/Select';
import Slider from '../../common/Slider';

const Filters = ({ 
  specializations, 
  languages, 
  locations, 
  filters, 
  onFilterChange 
}) => {
  // Popular specializations (could come from constants)
  const popularSpecializations = [
    "Anxiety", "Depression", "Couples Therapy", 
    "Trauma", "Child & Teen", "Stress"
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Filters</h3>
        <button 
          onClick={() => onFilterChange({ type: 'RESET' })}
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          Clear all
        </button>
      </div>

      {/* Specialization Filter */}
      <div className="mb-8">
        <h4 className="font-bold text-gray-700 mb-3">Specializations</h4>
        <div className="flex flex-wrap gap-2">
          {popularSpecializations.map((spec) => (
            <Chip
              key={spec}
              label={spec}
              active={filters.specializations?.includes(spec)}
              onClick={() => onFilterChange({ 
                type: 'TOGGLE_SPECIALIZATION', 
                value: spec 
              })}
              className="cursor-pointer"
            />
          ))}
        </div>
      </div>

      {/* Location Filter */}
      <div className="mb-8">
        <h4 className="font-bold text-gray-700 mb-3">Location</h4>
        <Select
          options={locations}
          placeholder="Select location"
          value={filters.location || ''}
          onChange={(value) => onFilterChange({ 
            type: 'SET_LOCATION', 
            value 
          })}
          className="w-full"
        />
      </div>

      {/* Language Filter */}
      <div className="mb-8">
        <h4 className="font-bold text-gray-700 mb-3">Language</h4>
        <Select
          options={languages}
          placeholder="Select language"
          value={filters.language || ''}
          onChange={(value) => onFilterChange({ 
            type: 'SET_LANGUAGE', 
            value 
          })}
          className="w-full"
          isMulti
        />
      </div>

      {/* Experience Filter */}
      <div className="mb-8">
        <h4 className="font-bold text-gray-700 mb-3">Experience</h4>
        <Slider
          min={0}
          max={30}
          value={filters.experience || [0, 30]}
          onChange={(value) => onFilterChange({ 
            type: 'SET_EXPERIENCE', 
            value 
          })}
          labelFormatter={(val) => `${val} years`}
        />
      </div>

      {/* Availability Filter */}
      <div className="mb-8">
        <h4 className="font-bold text-gray-700 mb-3">Availability</h4>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="accepting-new-clients"
            checked={filters.acceptingNewClients || false}
            onChange={(e) => onFilterChange({ 
              type: 'SET_ACCEPTING_CLIENTS', 
              value: e.target.checked 
            })}
            className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
          />
          <label 
            htmlFor="accepting-new-clients" 
            className="ml-2 text-gray-700"
          >
            Accepting new clients
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filters;