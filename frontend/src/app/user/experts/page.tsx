// src/app/user/experts/page.tsx
import type { Metadata } from 'next';
import ExpertData from '@/components/user/experts/ClientExpertsPage';

export const metadata: Metadata = {
  title: 'Licensed Mental Health Experts & Therapists | Meet Our Team | Melete',
  description: 'Connect with certified therapists and licensed mental health professionals at Melete. Expert counselors specializing in anxiety, depression, and wellness.',
  keywords: [
    'mental health experts',
    'licensed therapists',
    'certified counselors',
    'professional therapy',
    'mental health specialists',
    'experienced psychologists',
    'therapy team',
    'wellness experts'
  ],
  authors: [{ name: 'Melete Wellness Team' }],
  creator: 'Melete Wellness',
  publisher: 'Melete Wellness',
  alternates: {
    canonical: 'https://www.meletewellness.com/user/experts'
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    title: 'Licensed Mental Health Experts & Therapists | Meet Our Team | Melete',
    description: 'Connect with certified therapists and licensed mental health professionals at Melete. Expert counselors specializing in anxiety, depression, and wellness.',
    url: 'https://www.meletewellness.com/user/experts',
    siteName: 'Melete Wellness',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://www.meletewellness.com/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Licensed Mental Health Experts and Therapists at Melete Wellness',
        type: 'image/jpeg'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MeleteWellness',
    creator: '@MeleteWellness',
    title: 'Licensed Mental Health Experts & Therapists | Meet Our Team | Melete',
    description: 'Connect with certified therapists and licensed mental health professionals at Melete. Expert counselors specializing in anxiety, depression, and wellness.',
    images: [
      {
        url: 'https://www.meletewellness.com/images/logo.png',
        alt: 'Mental Health Experts and Therapists Team'
      }
    ]
  },
  category: 'Mental Health Professionals',
  classification: 'Healthcare Provider Directory',
};

// JSON-LD Structured Data
const structuredData = {
  "@context": "https://schema.org",
  "@type": ["WebPage", "MedicalWebPage"],
  "name": "Mental Health Experts and Therapists",
  "description": "Licensed mental health professionals and certified therapists at Melete Wellness",
  "url": "https://www.meletewellness.com/user/experts",
  "mainEntity": {
    "@type": "MedicalOrganization",
    "name": "Melete Wellness",
    "url": "https://www.meletewellness.com",
    "logo": "https://www.meletewellness.com/images/logo.png",
    "medicalSpecialty": ["Mental Health", "Psychology", "Counseling", "Therapy"],
    "serviceType": "Mental Health Professional Services",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Mental Health Professional Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalService",
            "name": "Licensed Therapist Consultation",
            "description": "Professional consultation with licensed mental health therapists",
            "serviceType": "Mental Health Treatment",
            "provider": {
              "@type": "MedicalOrganization",
              "name": "Melete Wellness"
            }
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "MedicalService",
            "name": "Certified Counselor Sessions",
            "description": "Expert counseling sessions with certified mental health professionals",
            "serviceType": "Mental Health Treatment",
            "provider": {
              "@type": "MedicalOrganization",
              "name": "Melete Wellness"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalService", 
            "name": "Specialized Psychology Services",
            "description": "Professional psychology services with experienced practitioners",
            "serviceType": "Mental Health Treatment",
            "provider": {
              "@type": "MedicalOrganization",
              "name": "Melete Wellness"
            }
          }
        }
      ]
    },
    "areaServed": "Worldwide",
    "availableLanguage": "English",
    "employee": {
      "@type": "Person",
      "@id": "https://www.meletewellness.com/user/experts#team",
      "name": "Mental Health Professionals Team",
      "jobTitle": "Licensed Mental Health Experts",
      "worksFor": {
        "@type": "MedicalOrganization",
        "name": "Melete Wellness"
      }
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
        "name": "Mental Health Experts",
        "item": "https://www.meletewellness.com/user/experts"
      }
    ]
  }
};

export default function ExpertPage() {
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
        <ExpertData />
      </div>
    </>
  );
}