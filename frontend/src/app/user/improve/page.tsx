// src/app/user/improve-with-us/page.tsx

import type { Metadata } from 'next';
import TherapyImprovementsSection from '@/components/user/improve-with-us/TherapyImprovementSecond';

export const metadata: Metadata = {
  title: 'Improve Your Mental Well-being | Therapy & Self-Help Programs | Melete',
  description: 'Transform your mental health with guided therapy, mindfulness programs, and self-improvement tools. Professional support for lasting mental wellness growth.',
  keywords: [
    'mental well-being',
    'self improvement therapy',
    'mindfulness programs',
    'mental health improvement',
    'mental resilience',
    'wellness programs',
    'personal growth',
    'mental fitness'
  ],
  authors: [{ name: 'Melete Wellness Team' }],
  creator: 'Melete Wellness',
  publisher: 'Melete Wellness',
  alternates: {
    canonical: 'https://www.meletewellness.com/user/improve'
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    title: 'Improve Your Mental Well-being | Therapy & Self-Help Programs | Melete',
    description: 'Transform your mental health with guided therapy, mindfulness programs, and self-improvement tools. Professional support for lasting mental wellness growth.',
    url: 'https://www.meletewellness.com/user/improve',
    siteName: 'Melete Wellness',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://www.meletewellness.com/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Improve Your Mental Well-being - Therapy and Self-Help Programs',
        type: 'image/jpeg'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MeleteWellness',
    creator: '@MeleteWellness',
    title: 'Improve Your Mental Well-being | Therapy & Self-Help Programs | Melete',
    description: 'Transform your mental health with guided therapy, mindfulness programs, and self-improvement tools. Professional support for lasting mental wellness growth.',
    images: [
      {
        url: 'https://www.meletewellness.com/images/logo.png',
        alt: 'Mental Well-being Improvement Programs'
      }
    ]
  },
  category: 'Mental Health Programs',
  classification: 'Self-Improvement & Wellness Services',
};

// JSON-LD Structured Data
const structuredData = {
  "@context": "https://schema.org",
  "@type": ["WebPage", "MedicalWebPage"],
  "name": "Mental Well-being Improvement Programs",
  "description": "Professional mental health improvement programs including therapy, mindfulness, and self-help tools",
  "url": "https://www.meletewellness.com/user/improve",
  "mainEntity": {
    "@type": "MedicalOrganization",
    "name": "Melete Wellness",
    "url": "https://www.meletewellness.com",
    "logo": "https://www.meletewellness.com/images/logo.png",
    "medicalSpecialty": ["Mental Health", "Wellness Programs", "Self-Improvement", "Mindfulness"],
    "serviceType": "Mental Health Improvement Programs",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Mental Well-being Programs",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Guided Therapy Programs",
            "description": "Professional guided therapy sessions for mental health improvement",
            "serviceType": "Mental Health Program",
            "category": "Therapy Services"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Mindfulness Training",
            "description": "Structured mindfulness programs for mental wellness and stress reduction",
            "serviceType": "Mental Health Program",
            "category": "Mindfulness Services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Self-Help Programs",
            "description": "Guided self-improvement tools and resources for personal growth",
            "serviceType": "Mental Health Program",
            "category": "Self-Improvement Services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mental Resilience Building",
            "description": "Professional programs to build mental strength and emotional resilience",
            "serviceType": "Mental Health Program",
            "category": "Resilience Training"
          }
        }
      ]
    },
    "areaServed": "Worldwide",
    "availableLanguage": "English"
  },
  "about": {
    "@type": "Thing",
    "name": "Mental Health Improvement",
    "description": "Comprehensive approach to improving mental well-being through professional guidance"
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
        "name": "Improve With Us",
        "item": "https://www.meletewellness.com/user/improve"
      }
    ]
  }
};

export default function ImproveWithUsPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      
      <main className="pt-7 min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
        <TherapyImprovementsSection />
      </main>
    </>
  );
}