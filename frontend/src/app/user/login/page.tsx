"use client";

import React from 'react';
import UserLoginPage from '@/components/user/user-login/userLogin'

const UserLogin: React.FC = () => {
  return (
    <div className="min-h-screen  bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <UserLoginPage/>
    </div>
  );
};

export default UserLogin;