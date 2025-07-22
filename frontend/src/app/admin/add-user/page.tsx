// src/app/admin/counsellor/page.tsx
import AddUser from '@/components/admin/add-user/adminUserAdding';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - User Management',
  robots: {
    index: false,
    follow: false,
  },
};

export default function UserManagementPage() {
  return <AddUser />;
}
