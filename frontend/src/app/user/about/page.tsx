import React from 'react';
import Head from 'next/head';
import HeroSection from '@/components/user/about/HeroSection';
import MissionVisionSection from '@/components/user/main-service/AboutSection';
import WhyChooseSection from '@/components/user/about/WhyChooseSection';
import SpecialtiesSection from '@/components/user/about/SpecialtiesSection';
import HelpSection from '@/components/user/about/HelpSection';
import AppDownloadSection from '@/components/user/about/AppDownloadSection';

const AboutPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>About Melete | Your Trusted Mental Health Support Partner</title>
        <meta
          name="description"
          content="Learn about Melete’s mission to provide 24/7 mental health support for individuals, colleges, corporates, and institutions worldwide."
        />
        <meta
          name="keywords"
          content="about Melete, mental health support, mental health mission, mental health services, 24/7 mental wellness"
        />
      </Head>

      <main className="min-h-screen bg-white">
        <HeroSection />
        <MissionVisionSection />
        <WhyChooseSection />
        <SpecialtiesSection />
        <HelpSection />
        <AppDownloadSection />
      </main>
    </>
  );
};

export default AboutPage;
