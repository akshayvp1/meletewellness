

// components/SEO.tsx
import Head from 'next/head';

export default function SEO() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Melete Wellness",
    "url": "https://meletewellness.com",
    "logo": "https://www.meletewellness.com/images/logo.png",
    "sameAs": [
      "https://www.facebook.com/meletewellness",
      "https://www.instagram.com/meletewellness",
      "https://www.linkedin.com/company/meletewellness"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-8943175522",
      "contactType": "Customer Support",
      "areaServed": "IN",
      "availableLanguage": ["English", "Malayalam", "Hindi", "Tamil"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Second Floor, VK Tower, Mankavu",
      "addressLocality": "Calicut",
      "addressRegion": "Kerala",
      "postalCode": "673007",
      "addressCountry": "IN"
    },
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
    </Head>
  );
}
