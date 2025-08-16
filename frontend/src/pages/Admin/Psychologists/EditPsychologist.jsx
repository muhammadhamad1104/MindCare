import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../../components/layout/AdminLayout';
import FormInput from '../../../components/common/FormInput';
import Button from '../../../components/common/Button';
import { usePsychologists } from '../../../hooks/usePsychologists';

const EditPsychologist = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { psychologists, updatePsychologist } = usePsychologists();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (psychologists && psychologists.length > 0) {
      const psychologist = psychologists.find(p => p.id === id);
      if (psychologist) {
        setFormData(psychologist);
        setLoading(false);
      } else {
        setError('Psychologist not found');
        setLoading(false);
      }
    }
  }, [id, psychologists]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update in context
      updatePsychologist(id, formData);
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to update psychologist profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading psychologist data...</p>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          {error}
        </div>
        <Button 
          onClick={() => navigate('/admin/psychologists')}
          className="mt-4 bg-gray-600 hover:bg-gray-700"
        >
          Back to List
        </Button>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Edit Psychologist</h1>
          <Button 
            onClick={() => navigate('/admin/psychologists')}
            className="bg-gray-600 hover:bg-gray-700"
          >
            Back to List
          </Button>
        </div>
        
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg">
            Psychologist profile updated successfully!
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
            {error}
          </div>
        )}
        
        {formData && (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              
              <FormInput
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              
              <FormInput
                label="Credentials"
                name="credentials"
                value={formData.credentials}
                onChange={handleChange}
                required
              />
              
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
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
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
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="acceptingNewClients"
                  name="acceptingNewClients"
                  checked={formData.acceptingNewClients}
                  onChange={(e) => setFormData(prev => ({ ...prev, acceptingNewClients: e.target.checked }))}
                  className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <label htmlFor="acceptingNewClients" className="ml-2 text-gray-700">
                  Accepting New Clients
                </label>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Status"
                name="status"
                as="select"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="draft">Draft</option>
                <option value="review">Review</option>
                <option value="published">Published</option>
                <option value="unlisted">Unlisted</option>
              </FormInput>
              
              <FormInput
                label="Rate"
                name="rate"
                value={formData.rate}
                onChange={handleChange}
                placeholder="$120/session or contact for rates"
              />
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
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
};

export default EditPsychologist;