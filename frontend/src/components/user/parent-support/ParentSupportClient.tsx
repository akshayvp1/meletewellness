
'use client';
import React from 'react';
import { HeroSection } from '@/components/user/parent-support/HeroSection';
import { ServicesSection } from '@/components/user/parent-support/ServicesSection';
import { ApproachSection } from '@/components/user/parent-support/ApproachSection';
import Counsellors from '@/components/user/experts/ExpertCounsellors';
import ParentImage from '@/../public/assets/parent.webp';



const ParentSupportPage: React.FC = () => {
  return (
    <>
      
      <div className="min-h-screen bg-white pt-7">
        <HeroSection parentImage={ParentImage.src} />
        <ServicesSection />
        <ApproachSection />
        <Counsellors />
      </div>
    </>
  );
};

export default ParentSupportPage;
