import React from 'react';
import Head from 'next/head';
import HeroSection from '@/components/user/adult-support/HeroSection';
import ServicesSection from '@/components/user/adult-support/ServicesSection';
import ApproachSection from '@/components/user/adult-support/ApproachSection';
import Counsellors from '@/components/user/experts/ExpertCounsellors';

const AdultSupportPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Adult Mental Health Support | Melete</title>
        <meta
          name="description"
          content="Access adult-focused mental health support, counselling, stress management, and personal growth tools at Melete."
        />
        <meta
          name="keywords"
          content="adult mental health, adult counselling, stress management, mental health therapy, wellness programs for adults"
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
        <HeroSection />
        <ServicesSection />
        <ApproachSection />
        <Counsellors />
      </div>
    </>
  );
};

export default AdultSupportPage;
