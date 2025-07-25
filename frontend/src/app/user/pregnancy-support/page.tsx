// src/app/pregnant-support/page.tsx

import React from 'react';
import type { Metadata } from 'next';
import PregnancySupportClient from '@/components/user/pregnant-support/PregnantSupportClient';

export const metadata: Metadata = {
  title: 'Pregnancy & Postpartum Support | Melete Wellness',
  description: 'Professional mental health support for pregnant women and new mothers. Manage prenatal anxiety, postpartum depression, and maternal stress with specialized therapy.',
  keywords: [
    'pregnancy mental health',
    'postpartum depression',
    'prenatal anxiety',
    'maternity counselling',
    'postpartum support',
    'pregnancy stress',
    'maternal mental health',
    'perinatal therapy',
    'new mother support'
  ],
  authors: [{ name: 'Melete Wellness' }],
  creator: 'Melete Wellness',
  alternates: {
    canonical: 'https://www.meletewellness.com/user/pregnancy-support'
  },
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: 'Pregnancy & Postpartum Mental Health Support | Melete',
    description: 'Professional mental health support for pregnant women and new mothers. Manage prenatal anxiety, postpartum depression, and maternal stress with specialized therapy.',
    url: 'https://www.meletewellness.com/user/pregnancy-support',
    siteName: 'Melete Wellness',
    type: 'website',
    images: [
      {
        url: 'https://www.meletewellness.com/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Pregnancy and Postpartum Mental Health Support Services'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pregnancy & Postpartum Mental Health | Melete',
    description: 'Specialized mental health support for pregnant women and new mothers dealing with anxiety and depression.'
  },
  category: 'Maternal Mental Health'
};

// Structured Data
const structuredData = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Pregnancy & Postpartum Mental Health Support",
  "description": "Specialized mental health services for pregnant women and new mothers",
  "url": "https://www.meletewellness.com/user/pregnancy-support",
  "mainEntity": {
    "@type": "MedicalOrganization",
    "name": "Melete Wellness",
    "url": "https://www.meletewellness.com",
    "medicalSpecialty": ["Perinatal Mental Health", "Maternal Psychology", "Postpartum Care"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalService",
            "name": "Prenatal Anxiety Treatment",
            "serviceType": "Mental Health Treatment"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalService",
            "name": "Postpartum Depression Therapy",
            "serviceType": "Mental Health Treatment"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalService",
            "name": "Pregnancy Stress Management",
            "serviceType": "Mental Health Treatment"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalService",
            "name": "New Mother Emotional Support",
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
        "name": "Pregnancy Support",
        "item": "https://www.meletewellness.com/user/pregnancy-support"
      }
    ]
  }
};

const PregnancySupportPage: React.FC = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 pt-7">
        <PregnancySupportClient />
      </main>
    </>
  );
};

export default PregnancySupportPage;