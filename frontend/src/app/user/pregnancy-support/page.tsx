"use client";

import Head from 'next/head';
import { HeroSection } from '@/components/user/pregnant-support/HeroSection';
import { ServicesSection } from '@/components/user/pregnant-support/ServicesSection';
import { ApproachSection } from '@/components/user/pregnant-support/ApproachSection';
import Counsellors from '@/components/user/experts/ExpertCounsellors';

export default function PregnancySupportPage() {
  return (
    <>
      <Head>
        <title>Pregnancy & Postpartum Mental Health Support | Melete</title>
        <meta
          name="description"
          content="Emotional and psychological support for pregnant women and new mothers to manage stress, anxiety, and mood changes."
        />
        <meta
          name="keywords"
          content="pregnancy mental health, postpartum support, maternity counselling, pregnancy stress, emotional support for mothers"
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
}
