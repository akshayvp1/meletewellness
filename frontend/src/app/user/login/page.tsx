"use client";

import React from 'react';
import Head from 'next/head';
import UserLoginPage from '@/components/user/user-login/userLogin';

const UserLogin: React.FC = () => {
  return (
    <>
      <Head>
        <title>Login to Melete | Access Your Mental Health Dashboard</title>
        <meta
          name="description"
          content="Securely log in to Melete to manage your mental health activities, counselling sessions, and wellness tools."
        />
        <meta
          name="keywords"
          content="Melete login, mental health dashboard, therapy portal, user login, wellness app login"
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
        <UserLoginPage />
      </div>
    </>
  );
};

export default UserLogin;
