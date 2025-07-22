// src/app/about/page.tsx
import type { Metadata } from 'next';
import AboutClient from '@/components/user/about/AboutClient';
import SEO from '@/components/SEO';

export const metadata: Metadata = {
  title: 'About Melete | Your Trusted Mental Health Support Partner',
  description: 'Learn about Melete’s mission to provide 24/7 mental health support worldwide.',
  keywords: [
    'about Melete',
    'mental health support',
    'mental health mission',
    'mental health services',
    '24/7 mental wellness',
  ],
  openGraph: {
    title: 'About Melete | Your Trusted Mental Health Support Partner',
    description: 'Learn about Melete’s mission to provide 24/7 mental health support worldwide.',
    url: 'https://meletewellness.com/user/about',
    siteName: 'Melete Wellness',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Melete | Your Trusted Mental Health Support Partner',
    description: 'Learn about Melete’s mission to provide 24/7 mental health support worldwide.',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 pt-7">
      <SEO />
      <AboutClient />
    </div>
  );
}
