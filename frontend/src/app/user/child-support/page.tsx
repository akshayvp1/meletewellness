"use client";

import React from 'react';
import HeroSection from '@/components/user/child-support/HeroSection';
import ServicesSection from '@/components/user/child-support/ServicesSection';
import ApproachSection from '@/components/user/child-support/ApproachSection';
import Counellors from '@/components/user/experts/ExpertCounsellors';

const ChildSupportPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <HeroSection />
      <ServicesSection />
      <ApproachSection />
      <Counellors />
    </div>
  );
};

export default ChildSupportPage;