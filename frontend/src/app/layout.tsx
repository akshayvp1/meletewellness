

// import './globals.css';
// import type { Metadata } from 'next';
// import ClientLayout from './ClientLayout'; // ✅ Move hook-based logic here

// export const metadata: Metadata = {
//   title: 'Melete Wellness',
//   description: '24/7 Mental Health Support Platform',
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body>
//         <ClientLayout>{children}</ClientLayout>
//       </body>
//     </html>
//   );
// }





import './globals.css';
import type { Metadata } from 'next';
import ClientLayout from './ClientLayout';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.meletewellness.com'), // Remove www
  title: {
    default: 'Melete Wellness | 24/7 Mental Health Support Platform',
    template: '%s | Melete Wellness'
  },
  description: 'Get professional 24/7 mental health support with Melete Wellness. Connect with certified counselors for anxiety, depression, stress management and more.',
  keywords: [
    'mental health support',
    'online counseling',
    '24/7 mental health',
    'Melete wellness',
    'mental health platform',
    'online therapy',
    'mental wellness support'
  ],
  authors: [{ name: 'Melete Wellness Team' }],
  creator: 'Melete Wellness',
  publisher: 'Melete Wellness',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.meletewellness.com/images/logo.png',
    siteName: 'Melete Wellness',
    title: 'Melete Wellness | 24/7 Mental Health Support Platform',
    description: 'Get professional 24/7 mental health support with certified counselors.',
    images: [
      {
        url: '', // Add this image
        width: 1200,
        height: 630,
        alt: 'Melete Wellness Mental Health Support',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Melete Wellness | 24/7 Mental Health Support Platform',
    description: 'Get professional 24/7 mental health support with certified counselors.',
    images: ['https://www.meletewellness.com/images/logo.png'], // Add this image
  },
 
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Add structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Melete Wellness",
              "url": "https://meletewellness.com",
              "logo": "https://www.meletewellness.com/images/logo.png",
              "description": "24/7 Mental Health Support Platform",
              "sameAs": [
                "https://twitter.com/meletewellness",
                "https://facebook.com/meletewellness"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-XXX-XXX-XXXX",
                "contactType": "customer service"
              }
            })
          }}
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}