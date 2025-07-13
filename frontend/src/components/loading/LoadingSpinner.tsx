// "use client";

// import React from 'react';
// import Micon from '@/../../public/assets/Micon.png'
// interface LoadingSpinnerProps {
//   message?: string;
// }

// const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = "Loading..." }) => {
//   return (
//     <div className="text-center py-12">
//       <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#015F4A]"></div>
//       <p className="mt-4 text-slate-600">{message}</p>
//     </div>
//   );
// };

// export default LoadingSpinner;

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
    <div className="flex flex-col items-center justify-center py-12 space-y-6">
      {/* Advanced spinning border with logo */}
      <div className="relative">
        {/* Outer spinning ring */}
        <div className="w-20 h-20 rounded-full border-[3px] border-transparent border-t-[#015F4A] animate-spin-slow">
          <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-r-[#015F4A] animate-spin-reverse-slow opacity-60"></div>
        </div>
        
        {/* Inner logo container */}
        <div className="absolute inset-2 w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center">
          <div className="relative w-12 h-12">
            <Image
              src={Micon}
              alt="Loading"
              fill
              className="rounded-full object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Loading message with animated dots */}
      <div className="text-center">
        <p className="text-[#015F4A] font-medium text-base">
          {message}
        </p>
        
        {/* Animated dots */}
        <div className="flex justify-center space-x-1 mt-2">
          <div className="w-1.5 h-1.5 bg-[#015F4A] rounded-full animate-bounce-slow"></div>
          <div className="w-1.5 h-1.5 bg-[#015F4A] rounded-full animate-bounce-slow" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-1.5 h-1.5 bg-[#015F4A] rounded-full animate-bounce-slow" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;