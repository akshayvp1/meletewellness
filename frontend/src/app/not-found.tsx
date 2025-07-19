'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      {/* Logo/Brand Section */}
      {/* <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Melete</h2>
        <p className="text-sm text-gray-600 mt-1">Mental Health Services</p>
      </div> */}

      {/* 404 Content */}
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          The page you are looking for could not be found. This may be due to a broken link or the page has been moved or removed.
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
            <Link 
              href="/user/service" 
              className="text-[#015F4A] hover:text-[#014A3A] font-medium transition-colors duration-200"
            >
              Our Services
            </Link>
            <Link 
              href="/user/about" 
              className="text-[#015F4A] hover:text-[#014A3A] font-medium transition-colors duration-200"
            >
              About Melete
            </Link>
          </div>
        </div>
      </div>

      {/* Support Message */}
      <div className="mt-12 text-center max-w-lg">
        <p className="text-sm text-gray-500 border-t pt-6">
          Need support? Our mental health professionals are here to help you on your wellness journey.
        </p>
      </div>
    </div>
  );
}