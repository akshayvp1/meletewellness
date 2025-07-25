import React from 'react';
import type { Metadata } from 'next';
import ChildSupportClient from '@/components/user/child-support/ChildSupportClient';

export const metadata: Metadata = {
  title: 'Child Therapy & Mental Health Support | Melete Wellness',
  description: "Specialized child mental health support with licensed therapists. Therapy for anxiety, emotional guidance, and well-being.",
  keywords: [
    'child mental health',
    'therapy for kids',
    'child counseling',
    'kids anxiety treatment',
    'child emotional support',
    'pediatric mental health',
    'children therapy online',
    'child wellness'
  ],
  authors: [{ name: 'Melete Wellness Team' }],
  creator: 'Melete Wellness',
  publisher: 'Melete Wellness',
  alternates: {
    canonical: 'https://www.meletewellness.com/user/child-support'
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    title: 'Child Mental Health Support | Professional Therapy for Kids | Melete',
    description: 'Professional mental health support for children with licensed therapists. Specialized therapy for kids anxiety, emotional guidance, and child wellness activities.',
    url: 'https://www.meletewellness.com/user/child-support',
    siteName: 'Melete Wellness',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://www.meletewellness.com/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Child Mental Health Support - Professional Therapy Services for Kids',
        type: 'image/jpeg'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MeleteWellness',
    creator: '@MeleteWellness',
    title: 'Child Mental Health Support | Professional Therapy for Kids | Melete',
    description: 'Professional mental health support for children with licensed therapists. Specialized therapy for kids anxiety, emotional guidance, and child wellness activities.',
    images: [
      {
        url: 'https://www.meletewellness.com/images/logo.png',
        alt: 'Child Mental Health Support Services'
      }
    ]
  },
  category: 'Child Mental Health Services',
  classification: 'Pediatric Mental Health Care',
};

// JSON-LD Structured Data
const structuredData = {
  "@context": "https://schema.org",
  "@type": ["WebPage", "MedicalWebPage"],
  "name": "Child Mental Health Support Services",
  "description": "Professional mental health support and therapy services for children",
  "url": "https://www.meletewellness.com/user/child-support",
  "mainEntity": {
    "@type": "MedicalOrganization",
    "name": "Melete Wellness",
    "url": "https://www.meletewellness.com",
    "logo": "https://www.meletewellness.com/images/logo.png",
    "medicalSpecialty": ["Child Psychology", "Pediatric Mental Health", "Child Counseling"],
    "serviceType": "Child Mental Health Services",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Child Mental Health Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalService",
            "name": "Child Anxiety Treatment",
            "description": "Professional anxiety therapy and treatment for children",
            "serviceType": "Child Mental Health Treatment"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "MedicalService",
            "name": "Child Emotional Support",
            "description": "Expert emotional guidance and support services for kids",
            "serviceType": "Child Mental Health Treatment"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalService", 
            "name": "Child Behavioral Therapy",
            "description": "Professional behavioral therapy and coping strategies for children",
            "serviceType": "Child Mental Health Treatment"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalService",
            "name": "Child Wellness Activities",
            "description": "Therapeutic wellness activities and mental health programs for kids",
            "serviceType": "Child Mental Health Treatment"
          }
        }
      ]
    },
    "areaServed": "Worldwide",
    "availableLanguage": "English",
    "audience": {
      "@type": "PeopleAudience",
      "suggestedMinAge": 5,
      "suggestedMaxAge": 17
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
        "name": "Child Mental Health Support",
        "item": "https://www.meletewellness.com/user/child-support"
      }
    ]
  }
};

const ChildSupportPage: React.FC = () => {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 pt-7">
        <ChildSupportClient />
      </div>
    </>
  );
};

export default ChildSupportPage;