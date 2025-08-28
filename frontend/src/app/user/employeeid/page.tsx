import type { Metadata } from 'next';
import EmployeeId from '@/components/employee/employee';

export default function EmployeeData() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 pt-7">
      <EmployeeId />
    </div>
  );
}