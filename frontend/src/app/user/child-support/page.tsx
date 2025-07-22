

import React from 'react';
import type { Metadata } from 'next';
import ChildSupportClient from '@/components/user/child-support/ChildSupportClient';
import SEO from '@/components/SEO';

export const metadata: Metadata = {
  title: 'Child Mental Health Support | Melete',
  description:
    'Dedicated mental health support for children, including emotional guidance, therapy, and wellness activities.',
  keywords:
    'child mental health, child counselling, therapy for kids, mental wellness for children, emotional support for kids',
  openGraph: {
    title: 'Child Mental Health Support | Melete',
    description:
      'Dedicated mental health support for children, including emotional guidance, therapy, and wellness activities.',
    url: 'https://meletewellness.com/user/child-support',
    siteName: 'Melete Wellness',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Child Mental Health Support | Melete',
    description:
      'Dedicated mental health support for children, including emotional guidance, therapy, and wellness activities.',
  },
};

const ChildSupportPage: React.FC = () => {
  return (
    <>
      <SEO />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 pt-7">
        <ChildSupportClient />
      </div>
    </>
  );
};

export default ChildSupportPage;
