import React from 'react';
import HeroSection from '@/components/user/adult-support/HeroSection';
import ServicesSection from '@/components/user/adult-support/ServicesSection';
import ApproachSection from '@/components/user/adult-support/ApproachSection';
import Counsellors from '@/components/user/experts/ExpertCounsellors';

const AdultSupportPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <HeroSection />
      <ServicesSection />
      <ApproachSection />
      <Counsellors />
    </div>
  );
};

export default AdultSupportPage;