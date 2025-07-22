// src/app/admin/counsellor/page.tsx
import AddExpertise from '@/components/admin/add-expertise/expertise';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - Expertise Management',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CounsellorManagementPage() {
  return <AddExpertise />;
}
