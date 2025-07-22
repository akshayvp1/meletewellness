
'use client';
import React from 'react';

import { HeroSection } from '@/components/user/pregnant-support/HeroSection';
import { ServicesSection } from '@/components/user/pregnant-support/ServicesSection';
import { ApproachSection } from '@/components/user/pregnant-support/ApproachSection';
import Counsellors from '@/components/user/experts/ExpertCounsellors';


const PregnancySupportPage: React.FC = () => {
  return (
    <>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 pt-7">
        <HeroSection />
        <ServicesSection />
        <ApproachSection />
        <Counsellors />
      </div>
    </>
  );
};

export default PregnancySupportPage;
