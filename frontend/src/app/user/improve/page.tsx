// src/app/user/improve-with-us/page.tsx

import type { Metadata } from 'next';
import TherapyImprovementsSection from '@/components/user/improve-with-us/TherapyImprovementSecond';
import SEO from '@/components/SEO';

export const metadata: Metadata = {
  title: 'Improve Your Mental Well-being | Melete',
  description:
    'Explore ways to improve your mental health through therapy, mindfulness, and guided self-help programs at Melete.',
  keywords: [
    'mental well-being',
    'self improvement therapy',
    'mental health improvement',
    'mindfulness programs',
    'mental resilience',
  ],
  openGraph: {
    title: 'Improve Your Mental Well-being | Melete',
    description:
      'Explore ways to improve your mental health through therapy, mindfulness, and guided self-help programs at Melete.',
    url: 'https://meletewellness.com/user/improve-with-us',
    siteName: 'Melete Wellness',
    type: 'website',
    images: [
      {
        url: 'https://meletewellness.com/images/improve-og.jpg', // Replace with actual image
        width: 1200,
        height: 630,
        alt: 'Improve Your Mental Well-being',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Improve Your Mental Well-being | Melete',
    description:
      'Explore ways to improve your mental health through therapy, mindfulness, and guided self-help programs at Melete.',
    images: ['https://meletewellness.com/images/improve-og.jpg'],
  },
};

export default function ImproveWithUsPage() {
  return (
    <>
      <SEO />
      <main className="pt-7 min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
        <TherapyImprovementsSection />
      </main>
    </>
  );
}
