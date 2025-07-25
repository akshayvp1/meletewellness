import type { Metadata } from 'next';
import UserLoginPage from '@/components/user/user-login/userLogin';

export const metadata: Metadata = {
  title: 'Login to Melete | Access Your Mental Health Dashboard',
  description: 'Securely log in to Melete to manage your mental health activities, counselling sessions, and wellness tools.',
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
};

export default function UserLogin() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 pt-7">
      <UserLoginPage />
    </div>
  );
}