import React, { useState } from 'react';
import AdminLayout from '../../../components/layout/AdminLayout';
import FormInput from '../../../components/common/FormInput';
import Button from '../../../components/common/Button';
import { useNavigate } from 'react-router-dom';

const CreatePsychologist = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    credentials: '',
    specializations: [],
    languages: [],
    location: '',
    experience: '',
    about: '',
    contactEmail: '',
    status: 'draft'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/admin/psychologists');
      }, 2000);
    } catch (err) {
      setError('Failed to create psychologist profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Create New Psychologist</h1>
          <Button 
            onClick={() => navigate('/admin/psychologists')}
            className="bg-gray-600 hover:bg-gray-700"
          >
            Back to List
          </Button>
        </div>
        
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg">
            Psychologist profile created successfully! Redirecting...
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Dr. Jane Smith"
            />
            
            <FormInput
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="jane@example.com"
            />
            
            <FormInput
              label="Credentials"
              name="credentials"
              value={formData.credentials}
              onChange={handleChange}
              required
              placeholder="PhD, LCSW, PsyD, etc."
            />
            
            <FormInput
              label="Contact Email"
              name="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={handleChange}
              required
              placeholder="For booking requests"
              description="This is where booking requests will be sent"
            />
            
            <FormInput
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="City, State"
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
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Specializations (comma separated)
            </label>
            <textarea
              name="specializations"
              value={formData.specializations.join(', ')}
              onChange={(e) => setFormData(prev => ({
                ...prev, 
                specializations: e.target.value.split(',').map(s => s.trim())
              }))}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Anxiety, Depression, Couples Therapy"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Languages (comma separated)
            </label>
            <textarea
              name="languages"
              value={formData.languages.join(', ')}
              onChange={(e) => setFormData(prev => ({
                ...prev, 
                languages: e.target.value.split(',').map(s => s.trim())
              }))}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="English, Spanish, French"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              About
            </label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Tell potential clients about your approach, experience, and specialties..."
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
              className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <label htmlFor="featured" className="ml-2 text-gray-700">
              Featured Psychologist
            </label>
          </div>
          
          <div className="flex justify-end space-x-4">
            <Button 
              type="button"
              onClick={() => navigate('/admin/psychologists')}
              className="bg-gray-600 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Psychologist'}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default CreatePsychologist;