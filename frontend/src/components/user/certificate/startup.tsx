import React from 'react';
import Image from 'next/image';

const StartupLogosSection = () => {
  return (
    <section className="py-12 px-4 sm:py-16 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
            Certified and Recognised by
          </h2>
          <div className="w-12 sm:w-16 h-0.5 bg-gray-400 mx-auto"></div>
        </div>

        {/* Logos Container */}
        <div className="flex items-center justify-center gap-6 sm:gap-12 md:gap-16 lg:gap-24">
          {/* Startup India Logo */}
          <div className="flex-shrink-0">
            <div className="relative w-32 h-24 sm:w-36 sm:h-28 md:w-40 md:h-32 lg:w-44 lg:h-36">
              <Image
                src="/assets/dpiit-logo.png"
                alt="DPIIT Startup India Recognition"
                fill
                className="object-contain transition-all duration-300 hover:scale-105"
                sizes="(max-width: 640px) 128px, (max-width: 768px) 144px, (max-width: 1024px) 160px, 176px"
                priority
              />
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-12 sm:h-16 md:h-20 bg-gray-300"></div>

          {/* Startup Kerala Logo */}
          <div className="flex-shrink-0">
            <div className="relative w-32 h-24 sm:w-36 sm:h-28 md:w-40 md:h-32 lg:w-44 lg:h-36">
              <Image
                src="/assets/kerala-startup.png"
                alt="Kerala Startup Mission Recognition"
                fill
                className="object-contain transition-all duration-300 hover:scale-105"
                sizes="(max-width: 640px) 128px, (max-width: 768px) 144px, (max-width: 1024px) 160px, 176px"
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