


"use client";

import React from 'react';
import Image from 'next/image';
import Micon from '@/../public/assets/Micon.png'; // Adjust path as needed

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Loading..." 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      {/* Simple spinning border with logo */}
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-white border-t-[#015F4A] animate-spin">
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center p-2">
            <Image
              src={Micon}
              alt="Loading"
              className="rounded-full object-cover"
              fill
            />
          </div>
        </div>
      </div>

      {/* Simple loading message */}
      <p className="text-[#015F4A] font-medium text-sm">
        {message}
      </p>
    </div>
  );
};

export default LoadingSpinner;