// src/app/user/oldage-support/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import OldAgeSupportClient from '@/components/user/oldage-support/OldageSupportClient';

export const metadata: Metadata = {
  title: 'Senior & Old Age Mental Health Support | Melete',
  description:
    'Comprehensive mental health services for seniors, including therapy for loneliness, cognitive wellness, and emotional care.',
  keywords:
    'senior mental health, old age therapy, elderly counselling, mental wellness for seniors, senior emotional support',
  openGraph: {
    title: 'Senior & Old Age Mental Health Support | Melete',
    description:
      'Comprehensive mental health services for seniors, including therapy for loneliness, cognitive wellness, and emotional care.',
    url: 'https://meletewellness.com/user/oldage-support',
    siteName: 'Melete Wellness',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Senior & Old Age Mental Health Support | Melete',
    description:
      'Comprehensive mental health services for seniors, including therapy for loneliness, cognitive wellness, and emotional care.',
  },
};

const OldAgeSupportPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 pt-7">
      <OldAgeSupportClient />
    </div>
  );
};

export default OldAgeSupportPage;
