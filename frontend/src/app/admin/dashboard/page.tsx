// src/app/admin/counsellor/page.tsx
import AdminHome from '@/components/admin/adminHome/home';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - Dashboard',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminHomePage() {
  return <AdminHome />;
}
