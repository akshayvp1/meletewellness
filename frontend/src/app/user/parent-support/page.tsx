// src/app/user/parent-support/page.tsx

import React from 'react';
import type { Metadata } from 'next';
import ParentSupportClient from '@/components/user/parent-support/ParentSupportClient';

export const metadata: Metadata = {
  title: 'Parent Mental Health Support | Family Therapy | Melete',
  description: 'Specialized mental health support for parents. Manage parenting stress, anxiety, postpartum depression, and family challenges with professional therapy.',
  keywords: [
    'parent mental health',
    'parenting support',
    'family therapy',
    'parenting stress',
    'mom mental health',
    'dad mental health',
    'postpartum depression',
    'parental anxiety',
    'family counselling'
  ],
  authors: [{ name: 'Melete Wellness' }],
  creator: 'Melete Wellness',
  alternates: {
    canonical: 'https://www.meletewellness.com/user/parent-support'
  },
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: 'Parent Mental Health Support | Family Therapy | Melete',
    description: 'Specialized mental health support for parents. Manage parenting stress, anxiety, postpartum depression, and family challenges with professional therapy.',
    url: 'https://www.meletewellness.com/user/parent-support',
    siteName: 'Melete Wellness',
    type: 'website',
    images: [
      {
        url: 'https://www.meletewellness.com/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Parent Mental Health Support Services'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Parent Mental Health Support | Melete',
    description: 'Professional mental health support for parents dealing with stress, anxiety, and family challenges.'
  },
  category: 'Parent Mental Health'
};

// Structured Data
const structuredData = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Parent Mental Health Support",
  "description": "Mental health services specifically designed for parents and families",
  "url": "https://www.meletewellness.com/user/parent-support",
  "mainEntity": {
    "@type": "MedicalOrganization",
    "name": "Melete Wellness",
    "url": "https://www.meletewellness.com",
    "medicalSpecialty": ["Family Therapy", "Parental Mental Health", "Postpartum Care"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalService",
            "name": "Parenting Stress Management",
            "serviceType": "Mental Health Treatment"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalService",
            "name": "Postpartum Depression Support",
            "serviceType": "Mental Health Treatment"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalService",
            "name": "Family Counseling",
            "serviceType": "Mental Health Treatment"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalService",
            "name": "Parental Anxiety Treatment",
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
        "name": "Parent Support",
        "item": "https://www.meletewellness.com/user/parent-support"
      }
    ]
  }
};

const ParentSupportPage: React.FC = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      
      <main className="min-h-screen bg-white pt-7">
        <ParentSupportClient />
      </main>
    </>
  );
};

export default ParentSupportPage;