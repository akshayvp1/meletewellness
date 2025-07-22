// src/app/admin/counsellor/page.tsx
import AddColleges from '@/components/admin/add-college/add-colleges';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - College Management',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CollegeManagementPage() {
  return <AddColleges />;
}
