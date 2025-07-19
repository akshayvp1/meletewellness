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



'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AdminDashboardLayout from '@/components/layouts/adminLayout';
import { RootState } from '@/store/app/store';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, role } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isAuthenticated || role !== 'admin') {
      router.replace('/admin-login');
    }
  }, [isAuthenticated, role, pathname, router]);

  if (!isAuthenticated || role !== 'admin') return null;

  return <AdminDashboardLayout>{children}</AdminDashboardLayout>;
}


