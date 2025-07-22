// src/app/admin/counsellor/page.tsx
import AddCounsellors from '@/components/admin/add-counsellors/addCounsellors';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - Counsellor Management',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CounsellorManagementPage() {
  return <AddCounsellors />;
}
