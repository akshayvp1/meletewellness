"use client";

import React from 'react';
import Head from 'next/head';
import { HeroSection } from '@/components/user/oldage-support/HeroSection';
import { ServicesSection } from '@/components/user/oldage-support/ServiceSection';
import { ApproachSection } from '@/components/user/oldage-support/ApproachSection';
import Counsellors from '@/components/user/experts/ExpertCounsellors';

const SeniorSupportPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Senior & Old Age Mental Health Support | Melete</title>
        <meta
          name="description"
          content="Comprehensive mental health services for seniors, including therapy for loneliness, cognitive wellness, and emotional care."
        />
        <meta
          name="keywords"
          content="senior mental health, old age therapy, elderly counselling, mental wellness for seniors, senior emotional support"
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

export default SeniorSupportPage;
