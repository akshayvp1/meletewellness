// pages/about.tsx
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