// // // src/app/about/page.tsx
// // import type { Metadata } from 'next';
// // import AboutClient from '@/components/user/about/AboutClient';
// // import SEO from '@/components/SEO';

// // export const metadata: Metadata = {
// //   title: 'About Melete | Your Trusted Mental Health Support Partner',
// //   description: 'Learn about Melete’s mission to provide 24/7 mental health support worldwide.',
// //   keywords: [
// //     'about Melete',
// //     'mental health support',
// //     'mental health mission',
// //     'mental health services',
// //     '24/7 mental wellness',
// //   ],
// //   openGraph: {
// //     title: 'About Melete | Your Trusted Mental Health Support Partner',
// //     description: 'Learn about Melete’s mission to provide 24/7 mental health support worldwide.',
// //     url: 'https://meletewellness.com/user/about',
// //     siteName: 'Melete Wellness',
// //   },
// //   twitter: {
// //     card: 'summary_large_image',
// //     title: 'About Melete | Your Trusted Mental Health Support Partner',
// //     description: 'Learn about Melete’s mission to provide 24/7 mental health support worldwide.',
// //   },
// // };

// // export default function AboutPage() {
// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 pt-7">
// //       <SEO />
// //       <AboutClient />
// //     </div>
// //   );
// // }





// import type { Metadata } from 'next';
// import AboutClient from '@/components/user/about/AboutClient';

// export const metadata: Metadata = {
//   title: 'About Melete | Your Trusted Mental Health Support Partner',
//   description: 'Learn about Melete\'s mission to provide accessible 24/7 mental health support worldwide. Discover how we\'re revolutionizing mental wellness care with certified professionals.',
//   keywords: [
//     'about Melete wellness',
//     'mental health mission',
//     'online mental health services',
//     'certified mental health counselors',
//     '24/7 mental wellness support',
//     'mental health platform story'
//   ],
//   alternates: {
//     canonical: 'https://www.meletewellness.com/user/about' // Clean URL
//   },
//   openGraph: {
//     title: 'About Melete | Your Trusted Mental Health Support Partner',
//     description: 'Learn about Melete\'s mission to provide accessible 24/7 mental health support worldwide.',
//     url: 'https://www.meletewellness.com/user/about',
//     siteName: 'Melete Wellness',
//     type: 'website',
//     images: [
//       {
//         url: 'https://www.meletewellness.com/images/logo.png',
//         width: 1200,
//         height: 630,
//         alt: 'About Melete Mental Health Support'
//       }
//     ]
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: 'About Melete | Your Trusted Mental Health Support Partner',
//     description: 'Learn about Melete\'s mission to provide accessible 24/7 mental health support worldwide.',
//     images: ['https://www.meletewellness.com/images/logo.png']
//   },
// };

// export default function AboutPage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 pt-7">
//       <AboutClient />
//     </div>
//   );
// }




import type { Metadata } from 'next';
import AboutClient from '@/components/user/about/AboutClient';

export const metadata: Metadata = {
  title: 'About Melete | Mental Health Support You Can Trust',
  description: "Melete offers 24/7 mental health support worldwide. Learn how we’re transforming wellness care with certified professionals.",
  keywords: [
    'about Melete wellness',
    'mental health mission',
    'online mental health services',
    'digital mental health platform',
    'certified mental health counselors',
    '24/7 mental wellness support',
    'mental health platform story',
    'virtual mental health care',
    'telehealth mental wellness',
    'accessible mental health care',
    'mental health counseling services'
  ],
  authors: [{ name: 'Melete Wellness Team' }],
  creator: 'Melete Wellness',
  publisher: 'Melete Wellness',
  alternates: {
    canonical: 'https://www.meletewellness.com/user/about'
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    title: 'About Melete | Your Trusted Mental Health Support Partner',
    description: 'Learn about Melete\'s mission to provide accessible 24/7 mental health support worldwide. Discover our certified professionals and innovative approach.',
    url: 'https://www.meletewellness.com/user/about',
    siteName: 'Melete Wellness',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://www.meletewellness.com/images/logo.png', // More specific image
        width: 1200,
        height: 630,
        alt: 'About Melete Mental Health Support - Our Mission and Team',
        type: 'image/jpeg'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MeleteWellness', // Add your Twitter handle
    creator: '@MeleteWellness',
    title: 'About Melete | Your Trusted Mental Health Support Partner',
    description: 'Learn about Melete\'s mission to provide accessible 24/7 mental health support worldwide.',
    images: [
      {
        url: 'https://www.meletewellness.com/images/logo.png', // More specific image
        alt: 'About Melete Mental Health Support Platform'
      }
    ]
  },
  // Additional metadata for better SEO
  category: 'Telehealth Services',
  classification: 'Mental Health Services',
};

// JSON-LD Structured Data
const structuredData = {
  "@context": "https://schema.org",
  "@type": ["AboutPage", "health-tech organization"],
  "mainEntity": {
    "@type": "health-tech organization",
    "name": "Melete Wellness",
    "url": "https://www.meletewellness.com",
    "logo": "https://www.meletewellness.com/images/logo.png",
    "description": "Melete provides accessible 24/7 mental health support worldwide with certified professionals",
    "foundingDate": "2025", // Update with actual date
    "serviceArea": "Worldwide",
    "medicalSpecialty": "Mental Health",
    "serviceType": "Mentel Health Services",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Mental Health Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "24/7 Mental Health Support",
            "description": "Round-the-clock mental wellness support"
          }
        }
      ]
    }
  }
};

export default function AboutPage() {
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
        <AboutClient />
      </div>
    </>
  );
}