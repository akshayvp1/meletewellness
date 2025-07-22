// src/app/terms-and-conditions/page.tsx
import TermsAndConditions from '@/components/user/terms-and-conditions/TermsAndCondition';
import type { Metadata } from 'next';
import SEO from '@/components/SEO';
export const metadata: Metadata = {
  title: 'Terms & Conditions | Melete Mental Health Platform',
  description:
    'Review Melete’s terms and conditions for using our mental health support services, including app features and website access.',
  keywords:
    'terms and conditions, mental health services terms, usage policy, user agreement, platform terms',
  openGraph: {
    title: 'Terms & Conditions | Melete Mental Health Platform',
    description:
      'Review Melete’s terms and conditions for using our mental health support services, including app features and website access.',
    url: 'https://meletewellness.com/terms-and-condition',
    siteName: 'Melete Wellness',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms & Conditions | Melete Mental Health Platform',
    description:
      'Review Melete’s terms and conditions for using our mental health support services, including app features and website access.',
  },
};

export default function TermsAndConditionPage() {
  return (
    <div className="min-h-screen bg-white">
      <SEO/>
      <TermsAndConditions />
    </div>
  );
}
