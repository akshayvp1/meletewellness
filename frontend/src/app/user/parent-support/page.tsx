// src/app/user/parent-support/page.tsx

import React from 'react';
import type { Metadata } from 'next';
import ParentSupportClient from '@/components/user/parent-support/ParentSupportClient';
import SEO from '@/components/SEO';
import ParentImage from '@/../public/assets/parent.webp';

export const metadata: Metadata = {
  title: 'Parent Mental Health Support | Melete',
  description:
    'Find specialized mental health support for parents to manage parenting stress, anxiety, and family-related issues.',
  keywords:
    'parent mental health, parenting support, family therapy, stress relief for parents, parenting counselling',
  openGraph: {
    title: 'Parent Mental Health Support | Melete',
    description:
      'Find specialized mental health support for parents to manage parenting stress, anxiety, and family-related issues.',
    url: 'https://meletewellness.com/user/parent-support',
    siteName: 'Melete Wellness',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Parent Mental Health Support | Melete',
    description:
      'Find specialized mental health support for parents to manage parenting stress, anxiety, and family-related issues.',
  },
};

const ParentSupportPage: React.FC = () => {
  return (
    <>
      <SEO />
      <div className="min-h-screen bg-white pt-7">
        <ParentSupportClient/>
        
      </div>
    </>
  );
};

export default ParentSupportPage;
