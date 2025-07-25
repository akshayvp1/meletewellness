// src/app/privacy/page.tsx
import Privacy from '@/components/user/privacy/Privacy';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Melete Mental Health Services - Data Protection & Confidentiality',
  description: 'Melete\'s comprehensive privacy policy ensures complete confidentiality and data protection for all mental health services. Learn how we safeguard your personal information and therapy records.',
  keywords: [
    'mental health data protection', 
    'therapy session confidentiality',
    'secure mental health platform',
    'patient privacy rights',
    'mental health data security',
    'confidential therapy services',
    'telehealth privacy policy',
    'Melete privacy policy'
  ],
  alternates: {
    canonical: 'https://www.meletewellness.com/privacy'
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Privacy Policy | Melete Mental Health Services',
    description: 'Melete\'s privacy policy ensures your mental health data remains completely confidential and secure.',
    url: 'https://www.meletewellness.com/privacy',
    siteName: 'Melete Wellness',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | Melete Mental Health Services',
    description: 'Complete privacy protection for your mental health journey. Learn how Melete safeguards your personal information.',
  },
};

// Simple JSON-LD for better search visibility
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Privacy Policy - Melete Mental Health Services",
  "description": "Privacy policy for Melete mental health services ensuring data protection and confidentiality",
  "url": "https://www.meletewellness.com/privacy",
  "about": {
    "@type": "Organization",
    "name": "Melete Wellness",
    "url": "https://www.meletewellness.com"
  }
};

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      
      <div className="min-h-screen bg-white font-sans text-gray-900">
        <Privacy />
      </div>
    </>
  );
}