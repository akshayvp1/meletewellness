"use client";

import React from 'react';
import { User } from 'lucide-react';
import { useIntersectionObserver } from '@/components/hooks/useIntersectionObserver';
import AdultImage from '@/../public/assets/adult.webp';

const HeroSection: React.FC = () => {
const [headerRef, isHeaderVisible] = useIntersectionObserver(0.1);

  return (
    <section ref={headerRef} className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className={`transform transition-all duration-1000 ${
            isHeaderVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
          }`}>
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-[#015F4A]/20 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
                <User className="w-8 h-8 text-[#015F4A]" />
              </div>
              <span className="text-[#015F4A] font-medium">Professional Mental Health Care</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-800 mb-6">
              Adult Mental Health
              <span className="block text-[#015F4A]">
                Support Services
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-slate-600 mb-8 leading-relaxed">
              Professional mental health services for adults dealing with work stress, relationships, anxiety, depression, and life transitions. Take the first step towards a healthier, more balanced life.
            </p>
          </div>
          
          <div className={`transition-all duration-1000 delay-300 ${
            isHeaderVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
          }`}>
            <div className="relative">
              <img
                src={AdultImage.src}
                alt="Adult receiving professional mental health support"
                className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/800x600/015F4A/ffffff?text=Adult+Mental+Health+Services';
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

export default HeroSection;