import type { Metadata } from 'next';
import EmployeePage from '@/components/admin/employees/employees';

export default function UserContact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 pt-7">
      <EmployeePage />
    </div>
  );
}