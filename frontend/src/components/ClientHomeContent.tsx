// src/app/ClientHomeContent.tsx
'use client';

import React from 'react';
import Improve from '@/components/user/melete-provide/SupportGroups';
import TherapyImprovementsSection from '@/components/user/improve-with-us/TherapyImprovementsSection';
import Experts from '@/components/user/experts/ExpertCounsellors';
import WhatWeOffer from '@/components/user/service/what-we-offer';
import SessionPlans from '@/components/user/service/session-plans';
// import SupportSubscription from '@/components/user/support-subscription/MentalHealthCTA';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function ClientHomeContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9F9F9] to-white font-sans overflow-x-hidden text-gray-900">
      <main className="pt-16" role="main">
        <Improve />
        <TherapyImprovementsSection />
        <Experts />
        <WhatWeOffer />
        <SessionPlans />
        {/* <SupportSubscription /> */}
      </main>
      <WhatsAppButton />
    </div>
  );
}
