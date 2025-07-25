import React from 'react';
import type { Metadata } from 'next';
import ServiceClient from '@/components/user/main-service/ServiceClient';

export const metadata: Metadata = {
  title: 'Mental Health Services & Therapy Programs | Melete Wellness',
  description: 'Comprehensive mental health services including individual therapy, group counselling, wellness programs, stress management, and specialized care for all ages and life stages.',
  keywords: [
    'mental health services',
    'therapy programs',
    'counselling services',
    'wellness programs',
    'stress management',
    'individual therapy',
    'group therapy',
    'mental health treatment',
    'psychological services'
  ],
  authors: [{ name: 'Melete Wellness' }],
  creator: 'Melete Wellness',
  alternates: {
    canonical: 'https://www.meletewellness.com/user/service'
  },
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: 'Mental Health Services & Therapy Programs | Melete Wellness',
    description: 'Comprehensive mental health services including individual therapy, group counselling, wellness programs, stress management, and specialized care for all ages and life stages.',
    url: 'https://www.meletewellness.com/user/service',
    siteName: 'Melete Wellness',
    type: 'website',
    images: [
      {
        url: 'https://www.meletewellness.com/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Comprehensive Mental Health Services and Therapy Programs'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mental Health Services & Therapy | Melete',
    description: 'Comprehensive mental health services, therapy programs, and wellness solutions for all ages.'
  },
  category: 'Mental Health Services'
};

// Structured Data
const structuredData = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Mental Health Services & Therapy Programs",
  "description": "Comprehensive mental health services and therapy programs for individuals of all ages",
  "url": "https://www.meletewellness.com/user/service",
  "mainEntity": {
    "@type": "MedicalOrganization",
    "name": "Melete Wellness",
    "url": "https://www.meletewellness.com",
    "medicalSpecialty": [
      "Mental Health Services",
      "Psychotherapy",
      "Counseling Services",
      "Wellness Programs"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Mental Health Service Catalog",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalService",
            "name": "Individual Therapy",
            "serviceType": "Mental Health Treatment"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalService",
            "name": "Group Counseling",
            "serviceType": "Mental Health Treatment"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalService",
            "name": "Stress Management Programs",
            "serviceType": "Mental Health Treatment"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalService",
            "name": "Wellness and Mindfulness Programs",
            "serviceType": "Mental Health Treatment"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalService",
            "name": "Specialized Age-Specific Care",
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
        "name": "Services",
        "item": "https://www.meletewellness.com/user/service"
      }
    ]
  }
};

const MeleteServicesPage: React.FC = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-[#F9F9F9] to-white font-sans overflow-x-hidden text-gray-900">
        <main className="pt-10 m-0 l-0 pr-0">
          <ServiceClient />
        </main>
      </div>
    </>
  );
};

export default MeleteServicesPage;