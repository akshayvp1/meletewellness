// src/app/admin/counsellor/page.tsx
import CounsellorManagement from '@/components/admin/counsellor-management/counsellorMangement';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - Counsellor Data Management',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CounsellorManagementPage() {
  return <CounsellorManagement />;
}
