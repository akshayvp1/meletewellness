// src/app/user/experts/page.tsx
import type { Metadata } from 'next';
import ExpertData from '@/components/user/experts/ClientExpertsPage';
import SEO from '@/components/SEO';

export const metadata: Metadata = {
  title: 'Meet Our Mental Health Experts | Melete',
  description:
    'Connect with certified therapists and experienced counsellors at Melete for personalized mental health guidance and support.',
  keywords: [
    'mental health experts',
    'therapists',
    'counsellors',
    'professional therapy',
    'mental health specialists',
  ],
  openGraph: {
    title: 'Meet Our Mental Health Experts | Melete',
    description:
      'Connect with certified therapists and experienced counsellors at Melete for personalized mental health guidance and support.',
    url: 'https://meletewellness.com/user/experts',
    siteName: 'Melete Wellness',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meet Our Mental Health Experts | Melete',
    description:
      'Connect with certified therapists and experienced counsellors at Melete for personalized mental health guidance and support.',
  },
};

export default function ExpertPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 pt-7">
      <SEO />
      <ExpertData />
    </div>
  );
}
