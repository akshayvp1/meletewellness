// // src/app/admin/layout.tsx
// 'use client';

// import { usePathname, useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import AdminDashboardLayout from '@/components/layouts/adminLayout'; // You already have this component from your provided code

// export default function AdminLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <AdminDashboardLayout>
//       {children}
//     </AdminDashboardLayout>
//   );
// }

// src/components/layouts/AdminLayout.tsx


'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/app/store';
import AdminDashboardLayout from '@/components/layouts/adminLayout';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, role } = useSelector((state: RootState) => state.auth);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only redirect if clearly not authenticated after refresh attempts
    if (!isAuthenticated || role !== 'admin') {
      router.replace('/admin-login');
    }
    setLoading(false);
  }, [isAuthenticated, role]);

  if (loading || !isAuthenticated || role !== 'admin') {
    return <div className="w-full h-screen flex items-center justify-center">Loading...</div>;
  }

  return <AdminDashboardLayout>{children}</AdminDashboardLayout>;
}
