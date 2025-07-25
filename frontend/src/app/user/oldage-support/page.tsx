// src/app/user/oldage-support/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import OldAgeSupportClient from '@/components/user/oldage-support/OldageSupportClient';

export const metadata: Metadata = {
  title: 'Senior Mental Health Support | Elderly Care | Melete',
  description: 'Professional mental health services for seniors. Therapy for depression, anxiety, loneliness, and cognitive wellness tailored for older adults.',
  keywords: [
    'senior mental health',
    'elderly therapy',
    'senior depression',
    'elderly counselling',
    'geriatric mental health',
    'senior anxiety treatment',
    'cognitive wellness seniors',
    'elderly care services'
  ],
  authors: [{ name: 'Melete Wellness' }],
  creator: 'Melete Wellness',
  alternates: {
    canonical: 'https://www.meletewellness.com/user/oldage-support'
  },
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: 'Senior Mental Health Support | Elderly Care | Melete',
    description: 'Professional mental health services for seniors. Therapy for depression, anxiety, loneliness, and cognitive wellness tailored for older adults.',
    url: 'https://www.meletewellness.com/user/oldage-support',
    siteName: 'Melete Wellness',
    type: 'website',
    images: [
      {
        url: 'https://www.meletewellness.com/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Senior Mental Health Support Services'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Senior Mental Health Support | Melete',
    description: 'Professional mental health services for seniors and elderly individuals.'
  },
  category: 'Senior Mental Health'
};

// Structured Data
const structuredData = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Senior Mental Health Support",
  "description": "Mental health services for seniors and elderly individuals",
  "url": "https://www.meletewellness.com/user/oldage-support",
  "mainEntity": {
    "@type": "MedicalOrganization",
    "name": "Melete Wellness",
    "url": "https://www.meletewellness.com",
    "medicalSpecialty": ["Geriatric Mental Health", "Senior Counseling"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalService",
            "name": "Senior Depression Therapy",
            "serviceType": "Mental Health Treatment"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalService",
            "name": "Anxiety Treatment for Seniors",
            "serviceType": "Mental Health Treatment"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalService",
            "name": "Cognitive Wellness Programs",
            "serviceType": "Mental Health Treatment"
          }
        }
      ]
    }
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.meletewellness.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Old Age Support",
        "item": "https://www.meletewellness.com/user/oldage-support"
      }
    ]
  }
};

const OldAgeSupportPage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 pt-7">
        <OldAgeSupportClient />
      </main>
    </>
  );
};

export default OldAgeSupportPage;