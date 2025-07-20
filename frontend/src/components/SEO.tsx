// components/SEO.tsx
import Head from 'next/head';

export default function SEO() {
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Melete Wellness",
            "url": "https://meletewellness.com",
            "logo": "https://meletewellness.com/logo.png"
          }),
        }}
      />
    </Head>
  );
}
