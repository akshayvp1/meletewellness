// src/app/privacy/page.tsx
import Privacy from '@/components/user/privacy/Privacy';
import type { Metadata } from 'next';
import SEO from '@/components/SEO';
export const metadata: Metadata = {
  title: 'Privacy Policy | Melete Mental Health Services',
  description:
    'Read Melete’s privacy policy to understand how we protect your personal data and ensure confidentiality in all mental health services.',
  keywords:
    'privacy policy, data protection, mental health privacy, confidentiality policy, user data protection',
  openGraph: {
    title: 'Privacy Policy | Melete Mental Health Services',
    description:
      'Read Melete’s privacy policy to understand how we protect your personal data and ensure confidentiality in all mental health services.',
    url: 'https://meletewellness.com/privacy',
    siteName: 'Melete Wellness',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | Melete Mental Health Services',
    description:
      'Read Melete’s privacy policy to understand how we protect your personal data and ensure confidentiality in all mental health services.',
  },
};

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <SEO/>
      <Privacy />
    </div>
  );
};

export default PrivacyPage;
