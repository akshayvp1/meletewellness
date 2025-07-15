'use client';

import Head from 'next/head';
import Privacy from '@/components/user/privacy/Privacy';

export default function PrivacyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Melete Mental Health Services</title>
        <meta
          name="description"
          content="Read Melete’s privacy policy to understand how we protect your personal data and ensure confidentiality in all mental health services."
        />
        <meta
          name="keywords"
          content="privacy policy, data protection, mental health privacy, confidentiality policy, user data protection"
        />
      </Head>

      <div className="min-h-screen bg-white">
        <Privacy />
      </div>
    </>
  );
}
