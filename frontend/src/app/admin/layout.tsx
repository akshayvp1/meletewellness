// src/app/admin/layout.tsx
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdminDashboardLayout from '@/components/layouts/adminLayout'; // You already have this component from your provided code

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminDashboardLayout>
      {children}
    </AdminDashboardLayout>
  );
}
