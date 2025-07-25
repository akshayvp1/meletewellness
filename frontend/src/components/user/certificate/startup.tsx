import React from 'react';
import Image from 'next/image';

const StartupLogosSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Certified and Recognised by
          </h2>
          <div className="w-16 h-0.5 bg-gray-400 mx-auto"></div>
        </div>

        {/* Logos Container */}
        <div className="flex items-center justify-center gap-16 lg:gap-24">
          {/* Startup India Logo */}
          <div className="flex-shrink-0">
            <div className="relative w-40 h-32">
              <Image
                src="/assets/dpiit-logo.png"
                alt="DPIIT Startup India Recognition"
                fill
                className="object-contain transition-all duration-300"
                sizes="160px"
                priority
              />
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-20 bg-gray-300"></div>

          {/* Startup Kerala Logo */}
          <div className="flex-shrink-0">
            <div className="relative w-40 h-32">
              <Image
                src="/assets/kerala-startup.png"
                alt="Kerala Startup Mission Recognition"
                fill
                className="object-contain transition-all duration-300"
                sizes="160px"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartupLogosSection;