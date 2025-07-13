'use client';

import React from 'react';
import AdminSignIn from '@/components/admin/admin-login/admin-login';

const AdminLogin: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <AdminSignIn />
      </div>
    </div>
  );
};

export default AdminLogin;
