"use client";

import React from 'react';
import { Baby } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import AnimatedSection from '@/components/user/child-support/AnimatedSection';

const HeroSection: React.FC = () => {
const [elementRef, isVisible] = useIntersectionObserver(0.1);

  return (
    <section 
      ref={elementRef}
      className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-slate-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <AnimatedSection isVisible={isVisible} direction="left">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-[#015F4A] p-4 rounded-2xl shadow-lg">
                <Baby className="w-8 h-8 text-white" />
              </div>
              <span className="text-slate-600 font-medium">Professional Mental Health Care</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-800 mb-6">
              Child Mental Health
              <span className="block text-[#015F4A]">
                Support Services
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-slate-600 mb-8 leading-relaxed">
              Specialized mental health care for children, focusing on emotional development, behavioral guidance, and creating a safe space for young minds to flourish and grow.
            </p>
          </AnimatedSection>
          
          <AnimatedSection isVisible={isVisible} direction="right" delay={300}>
            <div className="relative">
              <img
                src="/assets/child-ai.webp"
                alt="Child playing in therapy session"
                className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/800x600/015F4A/ffffff?text=Child+Mental+Health+Services';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#015F4A]/20 via-transparent to-transparent rounded-3xl" />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;