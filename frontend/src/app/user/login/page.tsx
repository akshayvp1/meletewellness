import type { Metadata } from 'next';
import UserLoginPage from '@/components/user/user-login/userLogin';
import SEO from '@/components/SEO';

export const metadata: Metadata = {
  title: 'Login to Melete | Access Your Mental Health Dashboard',
  description:
    'Securely log in to Melete to manage your mental health activities, counselling sessions, and wellness tools.',
  keywords: [
    'Melete login',
    'mental health dashboard',
    'therapy portal',
    'user login',
    'wellness app login',
  ],
  openGraph: {
    title: 'Login to Melete | Access Your Mental Health Dashboard',
    description:
      'Securely log in to Melete to manage your mental health activities, counselling sessions, and wellness tools.',
    url: 'https://meletewellness.com/user/login',
    siteName: 'Melete Wellness',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Login to Melete | Access Your Mental Health Dashboard',
    description:
      'Securely log in to Melete to manage your mental health activities, counselling sessions, and wellness tools.',
  },
};

export default function UserLogin() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 pt-7">
      <SEO />
      <UserLoginPage />
    </div>
  );
}
