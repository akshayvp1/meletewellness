
import React from 'react';
import type { Metadata } from 'next';
import ServiceClient from '@/components/user/main-service/ServiceClient';
import SEO from '@/components/SEO';
export const metadata: Metadata = {
  title: 'Our Mental Health Services | Melete',
  description:
    'Discover Melete’s wide range of mental health services including therapy, counselling, relaxation tools, and wellness programs for all ages.',
  keywords:
    'mental health services, therapy services, wellness programs, mental health counselling, stress relief tools',
  openGraph: {
    title: 'Our Mental Health Services | Melete',
    description:
      'Discover Melete’s wide range of mental health services including therapy, counselling, relaxation tools, and wellness programs for all ages.',
    url: 'https://meletewellness.com/user/service',
    siteName: 'Melete Wellness',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Mental Health Services | Melete',
    description:
      'Discover Melete’s wide range of mental health services including therapy, counselling, relaxation tools, and wellness programs for all ages.',
  },
};

const MeleteServicesPage: React.FC = () => {
  return (

    <div className="min-h-screen bg-gradient-to-b from-[#F9F9F9] to-white font-sans overflow-x-hidden text-gray-900">
      <main className="pt-10 m-0 l-0 pr-0">
        <SEO/>
        <ServiceClient />
        
      </main>
    </div>
  );
};

export default MeleteServicesPage;
