'use client';

import Link from 'next/link';

export default function InternalServerError() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      {/* Logo/Brand Section */}
      {/* <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Melete</h2>
        <p className="text-sm text-gray-600 mt-1">Mental Health Services</p>
      </div> */}

      {/* 500 Content */}
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-gray-300 mb-4">500</h1>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Internal Server Error
        </h2>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          We're experiencing technical difficulties on our end. Our team has been notified and is working to resolve this issue.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link 
            href="/" 
            className="inline-block bg-[#015F4A] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#014A3A] transition-colors duration-200"
          >
            Return Home
          </Link>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.reload()}
              className="text-[#015F4A] hover:text-[#014A3A] font-medium transition-colors duration-200"
            >
              Try Again
            </button>
            <Link 
              href="/contact" 
              className="text-[#015F4A] hover:text-[#014A3A] font-medium transition-colors duration-200"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>

      {/* Support Message */}
      <div className="mt-12 text-center max-w-lg">
        <p className="text-sm text-gray-500 border-t pt-6">
          If this issue persists, Please try refreshing the page or contact support.
        </p>
      </div>
    </div>
  );
}