import React, { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Tabs from '../../components/common/Tabs';
import Button from '../../components/common/Button';
import FormInput from '../../components/common/FormInput';

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [content, setContent] = useState({
    home: {
      heroTitle: "Find the right psychologist, fast.",
      heroSubtitle: "Connect with licensed professionals who understand your needs. No platform fees, just direct support.",
      featuredTitle: "Featured Psychologists",
      featuredSubtitle: "Highly-rated professionals currently accepting new clients"
    },
    about: {
      mission: "Our mission is to connect individuals with licensed psychologists in a simple, transparent way.",
      team: "Our team consists of healthcare technology experts passionate about mental health accessibility.",
      contact: "Have questions? Contact us anytime for more information."
    },
    howItWorks: {
      steps: [
        "Browse our directory of licensed psychologists",
        "View detailed profiles and specialties",
        "Send a booking request directly to the psychologist"
      ],
      forPsychologists: "We help psychologists connect with clients looking for their expertise. We handle the marketing, you focus on care."
    }
  });
  
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (section, field, value) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    setSaving(true);
    setSuccess(false);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  const tabs = [
    { id: 'home', label: 'Home Page' },
    { id: 'about', label: 'About Page' },
    { id: 'howItWorks', label: 'How It Works' }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Content Management</h1>
          <Button 
            onClick={handleSave}
            className="bg-indigo-600 hover:bg-indigo-700"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
        
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg">
            Content updated successfully!
          </div>
        )}
        
        <Tabs 
          tabs={tabs} 
          activeTab={activeTab} 
          onChange={setActiveTab} 
        />
        
        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'home' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Home Page Content</h2>
              
              <FormInput
                label="Hero Title"
                name="heroTitle"
                value={content.home.heroTitle}
                onChange={(e) => handleChange('home', 'heroTitle', e.target.value)}
                required
              />
              
              <FormInput
                label="Hero Subtitle"
                name="heroSubtitle"
                value={content.home.heroSubtitle}
                onChange={(e) => handleChange('home', 'heroSubtitle', e.target.value)}
                required
                as="textarea"
                rows={3}
              />
              
              <FormInput
                label="Featured Psychologists Title"
                name="featuredTitle"
                value={content.home.featuredTitle}
                onChange={(e) => handleChange('home', 'featuredTitle', e.target.value)}
                required
              />
              
              <FormInput
                label="Featured Psychologists Subtitle"
                name="featuredSubtitle"
                value={content.home.featuredSubtitle}
                onChange={(e) => handleChange('home', 'featuredSubtitle', e.target.value)}
                required
              />
            </div>
          )}
          
          {activeTab === 'about' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">About Page Content</h2>
              
              <FormInput
                label="Mission Statement"
                name="mission"
                value={content.about.mission}
                onChange={(e) => handleChange('about', 'mission', e.target.value)}
                required
                as="textarea"
                rows={3}
              />
              
              <FormInput
                label="Team Description"
                name="team"
                value={content.about.team}
                onChange={(e) => handleChange('about', 'team', e.target.value)}
                required
                as="textarea"
                rows={3}
              />
              
              <FormInput
                label="Contact Message"
                name="contact"
                value={content.about.contact}
                onChange={(e) => handleChange('about', 'contact', e.target.value)}
                required
                as="textarea"
                rows={2}
              />
            </div>
          )}
          
          {activeTab === 'howItWorks' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">How It Works Content</h2>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Steps</label>
                {content.howItWorks.steps.map((step, index) => (
                  <div key={index} className="flex items-start mb-3">
                    <span className="mr-2 mt-1 text-indigo-600 font-bold">{index + 1}.</span>
                    <FormInput
                      value={step}
                      onChange={(e) => {
                        const newSteps = [...content.howItWorks.steps];
                        newSteps[index] = e.target.value;
                        handleChange('howItWorks', 'steps', newSteps);
                      }}
                      className="flex-grow"
                    />
                  </div>
                ))}
              </div>
              
              <FormInput
                label="For Psychologists Section"
                name="forPsychologists"
                value={content.howItWorks.forPsychologists}
                onChange={(e) => handleChange('howItWorks', 'forPsychologists', e.target.value)}
                required
                as="textarea"
                rows={4}
              />
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ContentManagement;