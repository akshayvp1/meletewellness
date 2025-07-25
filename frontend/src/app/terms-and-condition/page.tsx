
import TermsAndConditions from '@/components/user/terms-and-conditions/TermsAndCondition';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Melete Mental Health Platform - User Agreement & Service Terms',
  description: 'Review Melete\'s comprehensive terms and conditions for using our mental health support services, including telehealth sessions, app features, and platform access. Understand your rights and responsibilities.',
  keywords: [
    'telehealth terms of service',
    'therapy platform user agreement',
    'mental health app terms',
    'counseling service terms',
    'mental wellness platform policy',
    'Melete terms conditions',
  ],
  alternates: {
    canonical: 'https://www.meletewellness.com/terms-and-condition'
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Terms & Conditions | Melete Mental Health Platform',
    description: 'Review Melete\'s terms and conditions for using our mental health support services and understand your user agreement.',
    url: 'https://www.meletewellness.com/terms-and-condition',
    siteName: 'Melete Wellness',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms & Conditions | Melete Mental Health Platform',
    description: 'Review Melete\'s terms and conditions for using our mental health support services and platform features.',
  },
};

// Simple JSON-LD for better search visibility
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Terms & Conditions - Melete Mental Health Platform",
  "description": "Terms and conditions for using Melete's mental health support services and platform",
  "url": "https://www.meletewellness.com/terms-and-condition",
  "about": {
    "@type": "Organization",
    "name": "Melete Wellness",
    "url": "https://www.meletewellness.com"
  },
  "mainEntity": {
    "@type": "Article",
    "headline": "Terms & Conditions - Mental Health Service Agreement",
    "description": "Legal terms governing the use of Melete mental health platform and services",
    "dateModified": new Date().toISOString(),
    "author": {
      "@type": "Organization",
      "name": "Melete Wellness Legal Team"
    }
  }
};

export default function TermsAndConditionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      
      <div className="min-h-screen bg-white">
        <TermsAndConditions />
      </div>
    </>
  );
}