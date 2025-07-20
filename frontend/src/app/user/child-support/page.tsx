"use client";

import React from 'react';
import Head from 'next/head';
import HeroSection from '@/components/user/child-support/HeroSection';
import ServicesSection from '@/components/user/child-support/ServicesSection';
import ApproachSection from '@/components/user/child-support/ApproachSection';
import Counellors from '@/components/user/experts/ExpertCounsellors';
import SEO from '@/components/SEO';
const ChildSupportPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Child Mental Health Support | Melete</title>
        <meta
          name="description"
          content="Dedicated mental health support for children, including emotional guidance, therapy, and wellness activities."
        />
        <meta
          name="keywords"
          content="child mental health, child counselling, therapy for kids, mental wellness for children, emotional support for kids"
        />
      </Head>
      <SEO />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 pt-7">
        <HeroSection />
        <ServicesSection />
        <ApproachSection />
        <Counellors />
      </div>
    </>
  );
};

export default ChildSupportPage;
