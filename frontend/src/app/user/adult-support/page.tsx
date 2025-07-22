// src/app/adult-support/page.tsx

import type { Metadata } from 'next';
import AdultSupporClient from '@/components/user/adult-support/AdultSupportClient';
import SEO from '@/components/SEO';

export const metadata: Metadata = {
  title: 'Adult Mental Health Support | Melete',
  description:
    'Access adult-focused mental health support, counselling, stress management, and personal growth tools at Melete.',
  openGraph: {
    title: 'Adult Mental Health Support | Melete',
    description:
      'Access adult-focused mental health support, counselling, stress management, and personal growth tools at Melete.',
    url: 'https://meletewellness.com/user/adult-support',
    siteName: 'Melete Wellness',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adult Mental Health Support | Melete',
    description:
      'Access adult-focused mental health support, counselling, stress management, and personal growth tools at Melete.',
  },
}

export default function AdultSupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 pt-7">
      <SEO/>
      <AdultSupporClient />
    </div>
  );
}
