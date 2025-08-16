import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import HeaderSection from '../components/pages/PsychologistDetail/HeaderSection';
import AboutSection from '../components/pages/PsychologistDetail/AboutSection';
import ServicesSection from '../components/pages/PsychologistDetail/ServicesSection';
import BookingForm from '../components/pages/PsychologistDetail/BookingForm';
import { usePsychologists } from '../hooks/usePsychologists';
import { useAnalytics } from '../hooks/useAnalytics';
import Loading from '../components/common/Loading';

const PsychologistDetail = () => {
  const { slug } = useParams();
  const { 
    currentPsychologist, 
    getPsychologistBySlug,
    loading,
    error
  } = usePsychologists();
  const { trackEvent } = useAnalytics();

  // Load psychologist data
  useEffect(() => {
    if (slug) {
      getPsychologistBySlug(slug);
    }
  }, [slug, getPsychologistBySlug]);

  // Track page view
  useEffect(() => {
    if (currentPsychologist) {
      trackEvent('profile_view', {
        psychologistId: currentPsychologist.id,
        psychologistName: currentPsychologist.name
      });
    }
  }, [currentPsychologist, trackEvent]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center py-20">
          <Loading size="lg" />
        </div>
      </Layout>
    );
  }

  if (error || !currentPsychologist) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg max-w-2xl mx-auto">
            {error || 'Psychologist not found'}
          </div>
          <Button as="a" href="/psychologists" className="mt-6 bg-indigo-600 hover:bg-indigo-700">
            Browse Psychologists
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <HeaderSection psychologist={currentPsychologist} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            <AboutSection psychologist={currentPsychologist} />
            <ServicesSection psychologist={currentPsychologist} />
          </div>
          <div className="lg:col-span-1">
            <BookingForm psychologist={currentPsychologist} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PsychologistDetail;