import React, { useState } from 'react';
import FormInput from '../common/FormInput';
import Button from '../common/Button';
import Chip from '../common/Chip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

const ProfileEditor = ({ profile, onSubmit }) => {
  const [formData, setFormData] = useState({
    ...profile,
    specializations: [...profile.specializations],
    languages: [...profile.languages],
    services: [...profile.services],
    newSpecialization: '',
    newLanguage: '',
    newService: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddItem = (field, newItem) => {
    if (newItem && !formData[field].includes(newItem)) {
      setFormData({
        ...formData,
        [field]: [...formData[field], newItem],
        [`new${field.charAt(0).toUpperCase() + field.slice(1)}`]: ''
      });
    }
  };

  const handleRemoveItem = (field, item) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter(i => i !== item)
    });
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.credentials) newErrors.credentials = 'Credentials are required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.about) newErrors.about = 'About section is required';
    if (formData.specializations.length === 0) newErrors.specializations = 'At least one specialization is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (onSubmit) {
        onSubmit({
          ...formData,
          // Remove temporary fields
          newSpecialization: undefined,
          newLanguage: undefined,
          newService: undefined
        });
      }
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h2>
      
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
          Profile updated successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
            
            <div className="space-y-4">
              <FormInput
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                required
              />
              
              <FormInput
                label="Credentials"
                name="credentials"
                value={formData.credentials}
                onChange={handleChange}
                placeholder="PhD, LCSW, PsyD, etc."
                error={errors.credentials}
                required
              />
              
              <FormInput
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, State"
                error={errors.location}
                required
              />
              
              <FormInput
                label="Years of Experience"
                name="experience"
                type="number"
                value={formData.experience}
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
            
            <div className="space-y-4">
              <FormInput
                label="Contact Email"
                name="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={handleChange}
                required
                description="This is where booking requests will be sent"
              />
              
              <FormInput
                label="Phone (Optional)"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              
              <FormInput
                label="Website (Optional)"
                name="website"
                value={formData.website}
                onChange={handleChange}
              />
              
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="acceptingNewClients"
                  name="acceptingNewClients"
                  checked={formData.acceptingNewClients}
                  onChange={(e) => setFormData({...formData, acceptingNewClients: e.target.checked})}
                  className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <label htmlFor="acceptingNewClients" className="ml-2 text-gray-700">
                  Accepting new clients
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Specializations</h3>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.specializations.map((spec, idx) => (
              <div key={idx} className="relative">
                <Chip 
                  label={spec} 
                  className="bg-indigo-100 text-indigo-800 pr-8"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveItem('specializations', spec)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-indigo-600 hover:text-indigo-800"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex">
            <FormInput
              name="newSpecialization"
              value={formData.newSpecialization}
              onChange={handleChange}
              placeholder="Add specialization"
              className="flex-grow"
            />
            <button
              type="button"
              onClick={() => handleAddItem('specializations', formData.newSpecialization)}
              className="ml-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add
            </button>
          </div>
          
          {errors.specializations && (
            <p className="text-red-500 text-sm mt-2">{errors.specializations}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Languages</h3>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {formData.languages.map((lang, idx) => (
                <div key={idx} className="relative">
                  <Chip 
                    label={lang} 
                    className="bg-teal-100 text-teal-800 pr-8"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveItem('languages', lang)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-teal-600 hover:text-teal-800"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex">
              <FormInput
                name="newLanguage"
                value={formData.newLanguage}
                onChange={handleChange}
                placeholder="Add language"
                className="flex-grow"
              />
              <button
                type="button"
                onClick={() => handleAddItem('languages', formData.newLanguage)}
                className="ml-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 flex items-center"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Services Offered</h3>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {formData.services.map((service, idx) => (
                <div key={idx} className="relative">
                  <Chip 
                    label={service} 
                    className="bg-violet-100 text-violet-800 pr-8"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveItem('services', service)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-violet-600 hover:text-violet-800"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex">
              <FormInput
                name="newService"
                value={formData.newService}
                onChange={handleChange}
                placeholder="Add service"
                className="flex-grow"
              />
              <button
                type="button"
                onClick={() => handleAddItem('services', formData.newService)}
                className="ml-2 bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 flex items-center"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add
              </button>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Details</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                About Me
              </label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="Tell potential clients about your approach, experience, and specialties..."
              />
              {errors.about && (
                <p className="text-red-500 text-sm mt-1">{errors.about}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Therapeutic Approach"
                name="approach"
                value={formData.approach}
                onChange={handleChange}
                placeholder="CBT, Psychodynamic, Humanistic, etc."
              />
              
              <FormInput
                label="Rates"
                name="rate"
                value={formData.rate}
                onChange={handleChange}
                placeholder="$120/session or contact for rates"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Availability
              </label>
              <textarea
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="Weekday afternoons, Tuesday evenings, etc."
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Profile'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditor;