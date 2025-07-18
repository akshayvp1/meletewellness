'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import AdminAuthService from '@/services/admin/AdminAuthService'; // Adjust the path as needed
import { useRouter } from 'next/navigation';

interface FormErrors {
  email?: string;
  password?: string;
  server?: string;
}

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  // Handle input changes
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
    setErrors((prev) => ({ ...prev, email: undefined, server: undefined }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
    setErrors((prev) => ({ ...prev, password: undefined, server: undefined }));
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email';
    }
    if (!password) {
      newErrors.password = 'Password required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      
      const response = await AdminAuthService.login(email, password);
     
      setEmail('');
      setPassword('');
      setErrors({});
      router.push('/admin/dashboard');
    } catch (error: any) {
      console.error('Login failed:', error);
      setErrors({ server: error.message || 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="max-w-md w-full mx-auto p-6 bg-white rounded-xl shadow-md"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold text-center text-[#015F4A] mb-6">Login</h2>

      {errors.server && (
        <p className="text-red-500 text-xs mb-4 text-center">{errors.server}</p>
      )}

      <motion.form
        onSubmit={handleSubmit}
        variants={formVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <div className="relative">
          <HiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#31A382] focus:border-transparent text-sm transition-all duration-200"
            placeholder="Email address"
            required
            aria-label="Email address"
            disabled={isLoading}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div className="relative">
          <HiOutlineLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#31A382] focus:border-transparent text-sm transition-all duration-200"
            placeholder="Password"
            required
            aria-label="Password"
            disabled={isLoading}
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>
        
        <button
          type="submit"
          className="w-full py-2.5 px-4 bg-[#31A382] text-white font-medium rounded-lg hover:bg-[#2F9B7A] transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Login"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </motion.form>
    </motion.div>
  );
};

export default AdminLogin;