'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/app/store';
import AdminSignIn from '@/components/admin/admin-login/admin-login';

export default function AdminLoginClient() {
  const router = useRouter();
  const { isAuthenticated, role } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated && role === 'admin') {
      router.replace('/admin/dashboard');
    }
  }, [isAuthenticated, role, router]);

  // While redirecting, render nothing
  if (isAuthenticated && role === 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <AdminSignIn />
      </div>
    </div>
  );
}