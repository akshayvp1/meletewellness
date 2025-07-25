import type { Metadata } from 'next';
import AdultSupportClient from '@/components/user/adult-support/AdultSupportClient';

export const metadata: Metadata = {
  title: 'Adult Mental Health Support | Therapy & Counseling | Melete',
  description:"24/7 adult mental health support with licensed therapists for anxiety, depression, and stress management. Online and confidential.",
  keywords: [
    'adult mental health support',
    'online therapy adults',
    'anxiety treatment',
    'depression counseling',
    'stress management',
    'relationship therapy',
    'mental wellness',
    'licensed therapists'
  ],
  authors: [{ name: 'Melete Wellness Team' }],
  creator: 'Melete Wellness',
  publisher: 'Melete Wellness',
  alternates: {
    canonical: 'https://www.meletewellness.com/user/adult-support'
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    title: 'Adult Mental Health Support | Professional Counseling & Therapy | Melete',
    description: 'Professional adult mental health support with licensed therapists. Get help with anxiety, depression, stress management, and relationship counseling.',
    url: 'https://www.meletewellness.com/user/adult-support',
    siteName: 'Melete Wellness',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://www.meletewellness.com/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Adult Mental Health Support - Professional Therapy and Counseling Services',
        type: 'image/jpeg'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MeleteWellness',
    creator: '@MeleteWellness',
    title: 'Adult Mental Health Support | Professional Counseling & Therapy | Melete',
    description: 'Professional adult mental health support with licensed therapists. Get help with anxiety, depression, stress management, and relationship counseling.',
    images: [
      {
        url: 'https://www.meletewellness.com/images/logo.png',
        alt: 'Adult Mental Health Support Services'
      }
    ]
  },
  category: 'Mental Health Services',
  classification: 'Adult Mental Health Care',
};

// JSON-LD Structured Data
const structuredData = {
  "@context": "https://schema.org",
  "@type": ["WebPage", "MedicalWebPage"],
  "name": "Adult Mental Health Support Services",
  "description": "Professional mental health support and therapy services for adults",
  "url": "https://www.meletewellness.com/user/adult-support",
  "mainEntity": {
    "@type": "MedicalOrganization",
    "name": "Melete Wellness",
    "url": "https://www.meletewellness.com",
    "logo": "https://www.meletewellness.com/images/logo.png",
    "medicalSpecialty": ["Mental Health", "Psychology", "Counseling"],
    "serviceType": "Adult Mental Health Services",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Adult Mental Health Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalService",
            "name": "Adult Anxiety Treatment",
            "description": "Professional anxiety therapy and services for adults",
            "serviceType": "Mental Health Treatment"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "MedicalService",
            "name": "Depression Counseling",
            "description": "Expert depression therapy and counseling services",
            "serviceType": "Mental Health Treatment"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalService", 
            "name": "Stress Management Therapy",
            "description": "Professional stress management and coping strategies",
            "serviceType": "Mental Health Treatment"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalService",
            "name": "Relationship Counseling",
            "description": "Expert relationship and couples therapy services",
            "serviceType": "Mental Health Treatment"
          }
        }
      ]
    },
    "areaServed": "Worldwide",
    "availableLanguage": "English"
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
        "name": "Adult Mental Health Support",
        "item": "https://www.meletewellness.com/user/adult-support"
      }
    ]
  }
};

export default function AdultSupportPage() {
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
        <AdultSupportClient />
      </div>
    </>
  );
}