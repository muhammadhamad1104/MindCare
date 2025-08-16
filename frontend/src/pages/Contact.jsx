import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import FormInput from '../components/common/FormInput';
import Button from '../components/common/Button';
import Select from '../components/common/Select';
import Textarea from '../components/common/Textarea';
import contactFormBg from '../assets/images/contact-form-bg.jpeg';
import { useLocation } from 'react-router-dom';

const Contact = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const inquiryType = queryParams.get('inquiry') || 'general';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: inquiryType,
    practiceLocations: '',
    yearsExperience: '',
    specializations: '',
    languages: '',
    website: '',
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

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
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        inquiryType: inquiryType,
        practiceLocations: '',
        yearsExperience: '',
        specializations: '',
        languages: '',
        website: '',
        message: ''
      });
    } catch (err) {
      setError('Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section 
        className="relative py-20 text-white"
        style={{ backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.85), url(${contactFormBg})` }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Have questions or want to list your practice? Get in touch with our team.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              {success ? (
                <div className="text-center py-8">
                  <div className="text-green-500 text-5xl mb-4">✓</div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Message Sent!</h2>
                  <p className="text-gray-600 mb-6">
                    Thank you for contacting us. We'll get back to you as soon as possible.
                  </p>
                  <Button as="a" href="/" className="bg-indigo-600 hover:bg-indigo-700">
                    Return Home
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex border-b border-gray-200 mb-8">
                    <button
                      className={`px-6 py-3 font-medium ${
                        formData.inquiryType === 'general' 
                          ? 'text-indigo-600 border-b-2 border-indigo-600' 
                          : 'text-gray-600'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, inquiryType: 'general' }))}
                    >
                      General Inquiry
                    </button>
                    <button
                      className={`px-6 py-3 font-medium ${
                        formData.inquiryType === 'psychologist' 
                          ? 'text-indigo-600 border-b-2 border-indigo-600' 
                          : 'text-gray-600'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, inquiryType: 'psychologist' }))}
                    >
                      For Psychologists
                    </button>
                  </div>
                  
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
                      {error}
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormInput
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                      
                      <FormInput
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <FormInput
                      label="Phone (Optional)"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    
                    {formData.inquiryType === 'psychologist' && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormInput
                            label="Practice Location(s)"
                            name="practiceLocations"
                            value={formData.practiceLocations}
                            onChange={handleChange}
                            placeholder="City, State"
                            required
                          />
                          
                          <FormInput
                            label="Years of Experience"
                            name="yearsExperience"
                            type="number"
                            value={formData.yearsExperience}
                            onChange={handleChange}
                            min="0"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormInput
                            label="Specializations"
                            name="specializations"
                            value={formData.specializations}
                            onChange={handleChange}
                            placeholder="Anxiety, Depression, etc."
                            required
                          />
                          
                          <FormInput
                            label="Languages"
                            name="languages"
                            value={formData.languages}
                            onChange={handleChange}
                            placeholder="English, Spanish, etc."
                          />
                        </div>
                        
                        <FormInput
                          label="Website (Optional)"
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          placeholder="https://yourwebsite.com"
                        />
                      </>
                    )}
                    
                    <Textarea
                      label="Your Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="How can we help you?"
                    />
                    
                    <div className="pt-4">
                      <Button 
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 py-3"
                        disabled={loading}
                      >
                        {loading ? 'Sending...' : 'Send Message'}
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;