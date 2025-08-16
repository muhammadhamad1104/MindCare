import React from 'react';
import Layout from '../components/layout/Layout';
import HeroSection from '../components/pages/Home/HeroSection';
import HowItWorks from '../components/pages/Home/HowItWorks';
import PopularSpecializations from '../components/pages/Home/PopularSpecializations';
import FeaturedPsychologists from '../components/pages/Home/FeaturedPsychologists';
import TrustSignals from '../components/pages/Home/TrustSignals';
import PsychologistCallout from '../components/pages/Home/PsychologistCallout';

const Home = () => {
  return (
    <Layout>
      <HeroSection />
      <HowItWorks />
      <PopularSpecializations />
      <FeaturedPsychologists />
      <TrustSignals />
      <PsychologistCallout />
    </Layout>
  );
};

export default Home;