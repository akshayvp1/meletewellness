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
      <Head>
        <title>About MELETE - Professional Mental Health Platform</title>
        <meta 
          name="description" 
          content="Learn about MELETE, a certified mental health platform connecting you with licensed therapists and evidence-based resources for your well-being." 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="mental health, therapy, licensed therapists, mental wellness, professional counseling, MELETE" />
        <meta property="og:title" content="About MELETE - Professional Mental Health Platform" />
        <meta property="og:description" content="Discover how MELETE transforms mental health care with professional expertise and innovative digital solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://meletewellness.com/user/about" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About MELETE - Professional Mental Health Platform" />
        <meta name="twitter:description" content="Learn about our mission to provide accessible, professional mental health care through our secure digital platform." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://meletewellness.com/user/about" />
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