import React, { useState } from 'react';
import Button from '../../common/Button';
import FormInput from '../../common/FormInput';
import successIllustration from '../../../assets/images/illustrations/success-illustration.jpg';
import errorIllustration from '../../../assets/images/illustrations/error-illustration.jpeg';
import loadingAnimation from '../../../assets/images/ui/loading-animation.gif';

const BookingForm = ({ psychologist }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferredTimes: ''
  });
  
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      // Simulate API call to submit booking request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Randomly decide success or failure for demo
      const isSuccess = Math.random() > 0.2;
      
      if (isSuccess) {
        setStatus('success');
        // Reset form on success
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          preferredTimes: ''
        });
      } else {
        setStatus('error');
        setErrorMessage('Failed to send booking request. Please try again later.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  };
  
  if (status === 'success') {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 text-center mt-6">
        <img 
          src={successIllustration} 
          alt="Success" 
          className="w-32 mx-auto mb-6" 
        />
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          Request Sent Successfully!
        </h3>
        <p className="text-gray-600 mb-6">
          Your booking request has been sent to {psychologist.name}'s inbox. 
          They will contact you directly to confirm your appointment.
        </p>
        <Button 
          onClick={() => setStatus('idle')}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Send Another Request
        </Button>
      </div>
    );
  }
  
  if (status === 'error') {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 text-center mt-6">
        <img 
          src={errorIllustration} 
          alt="Error" 
          className="w-32 mx-auto mb-6" 
        />
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          Failed to Send Request
        </h3>
        <p className="text-gray-600 mb-4">
          {errorMessage}
        </p>
        <Button 
          onClick={() => setStatus('idle')}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Request a Session
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Your Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="John Doe"
          />
          
          <FormInput
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="john@example.com"
          />
          
          <FormInput
            label="Phone (Optional)"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(123) 456-7890"
          />
          
          <FormInput
            label="Preferred Times (Optional)"
            name="preferredTimes"
            type="text"
            value={formData.preferredTimes}
            onChange={handleChange}
            placeholder="e.g., Weekday evenings"
          />
        </div>
        
        <div className="mt-6">
          <label className="block text-gray-700 font-medium mb-2">
            What would you like to discuss?
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            placeholder="Briefly describe what you'd like to work on..."
          />
        </div>
        
        <div className="mt-6">
          <p className="text-sm text-gray-600 mb-4">
            By submitting this form, you agree that {psychologist.name} will contact you 
            directly via the email or phone number you provided. This is not a confirmed 
            appointment until you hear back from them.
          </p>
          
          <Button 
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? (
              <>
                <img 
                  src={loadingAnimation} 
                  alt="Loading" 
                  className="w-5 h-5 mr-2" 
                />
                Sending Request...
              </>
            ) : (
              'Send Booking Request'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;