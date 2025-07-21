import React from 'react';
import { Users } from 'lucide-react';
import { useIntersectionObserver } from '@/components/hooks/useIntersectionObserver';

interface HeroSectionProps {
  parentImage: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({parentImage }) => {
  const [headerRef, isHeaderVisible] = useIntersectionObserver(0.1);

  return (
    <section 
      ref={headerRef}
      className="py-16 lg:py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className={`transform transition-all duration-1000 ${
            isHeaderVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
          }`}>
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-[#015F4A] p-4 rounded-2xl shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <span className="text-[#015F4A] font-medium">Professional Family Support</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-[#015F4A] mb-6">
              Parent Support
              <span className="block text-[#015F4A]">
                & Guidance Services
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
              Comprehensive guidance for parents navigating parenting challenges, family dynamics, and building stronger relationships with their children through evidence-based support and practical strategies.
            </p>
          </div>
          
          <div className={`transform transition-all duration-1000 delay-300 ${
            isHeaderVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
          }`}>
            <div className="relative">
              <img
                src={parentImage}
                alt="Parent and child having a supportive conversation"
                className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/800x600/015F4A/ffffff?text=Parent+Support+Services';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#015F4A]/20 via-transparent to-transparent rounded-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};