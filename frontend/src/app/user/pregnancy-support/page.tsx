// src/app/pregnant-support/page.tsx

import React from 'react';
import type { Metadata } from 'next';
import PregnancySupportClient from '@/components/user/pregnant-support/PregnantSupportClient';
import SEO from '@/components/SEO';

export const metadata: Metadata = {
  title: 'Pregnancy & Postpartum Mental Health Support | Melete',
  description:
    'Emotional and psychological support for pregnant women and new mothers to manage stress, anxiety, and mood changes.',
  keywords:
    'pregnancy mental health, postpartum support, maternity counselling, pregnancy stress, emotional support for mothers',
  openGraph: {
    title: 'Pregnancy & Postpartum Mental Health Support | Melete',
    description:
      'Emotional and psychological support for pregnant women and new mothers to manage stress, anxiety, and mood changes.',
    url: 'https://meletewellness.com/user/pregnant-support',
    siteName: 'Melete Wellness',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pregnancy & Postpartum Mental Health Support | Melete',
    description:
      'Emotional and psychological support for pregnant women and new mothers to manage stress, anxiety, and mood changes.',
  },
};

const PregnancySupportPage: React.FC = () => {
  return (
    <>
      <SEO />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 pt-7">
        <PregnancySupportClient />
        
      </div>
    </>
  );
};

export default PregnancySupportPage;
