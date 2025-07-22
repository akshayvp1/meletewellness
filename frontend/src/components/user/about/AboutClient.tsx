// src/app/about/AboutClient.tsx
'use client';

import React from 'react';
import HeroSection from '@/components/user/about/HeroSection';
import MissionVisionSection from '@/components/user/main-service/AboutSection';
import WhyChooseSection from '@/components/user/about/WhyChooseSection';
import SpecialtiesSection from '@/components/user/about/SpecialtiesSection';
import HelpSection from '@/components/user/about/HelpSection';
import AppDownloadSection from '@/components/user/about/AppDownloadSection';

export default function AboutClient() {
  return (
    <main className="min-h-screen bg-white pt-7">
      <HeroSection />
      <MissionVisionSection />
      <WhyChooseSection />
      <SpecialtiesSection />
      <HelpSection />
      <AppDownloadSection />
    </main>
  );
}
