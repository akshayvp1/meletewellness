"use client";

import React from 'react';
import Head from 'next/head';
import { HeroSection } from '@/components/user/parent-support/HeroSection';
import { ServicesSection } from '@/components/user/parent-support/ServicesSection';
import { ApproachSection } from '@/components/user/parent-support/ApproachSection';
import Counsellors from '@/components/user/experts/ExpertCounsellors';
import ParentImage from '@/../public/assets/parent.webp';

const ParentSupportPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Parent Mental Health Support | Melete</title>
        <meta
          name="description"
          content="Find specialized mental health support for parents to manage parenting stress, anxiety, and family-related issues."
        />
        <meta
          name="keywords"
          content="parent mental health, parenting support, family therapy, stress relief for parents, parenting counselling"
        />
      </Head>

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
