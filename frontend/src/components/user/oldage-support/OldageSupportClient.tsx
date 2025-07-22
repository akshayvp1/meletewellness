// src/app/user/oldage-support/page.tsx
'use client';
import React from 'react';
import {HeroSection} from '@/components/user/oldage-support/HeroSection';
import {ServicesSection} from '@/components/user/oldage-support/ServiceSection';
import {ApproachSection} from '@/components/user/oldage-support/ApproachSection';
import Counsellors from '@/components/user/experts/ExpertCounsellors';


const OldAgeSupportPage: React.FC = () => {
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

export default OldAgeSupportPage;
