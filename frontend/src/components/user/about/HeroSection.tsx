import React from 'react';
import { Stethoscope, ArrowRight } from 'lucide-react';
import Badge from '@/components/user/about/Badge';
import PrimaryButton from '@/components/user/about/PrimaryButton';
import SecondaryButton from '@/components/user/about/SecondaryButton';

const HeroSection: React.FC = () => {
  return (
    <header className="relative bg-white py-20" role="banner">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          <Badge icon={<Stethoscope className="w-5 h-5" aria-hidden="true" />} className="mb-8">
            Certified Mental Health Platform
          </Badge>
          
          <h1 className="text-5xl lg:text-7xl font-light mb-6 leading-tight text-gray-900">
            Welcome to <span className="text-5xl font-inter font-normal text-[#1ca184]">MELETE</span>
          </h1>
          
          <p className="text-xl lg:text-2xl mb-8 text-gray-600 leading-relaxed max-w-4xl mx-auto font-light">
            Your Trusted Professional Mental Wellness Platform
          </p>
          
          <p className="text-lg text-gray-500 mb-12 leading-relaxed max-w-3xl mx-auto">
            Experience accessible, evidence-based mental health care through our secure digital platform. Connect with licensed therapists and access tailored therapeutic resources for your well-being.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PrimaryButton 
              href=""
              icon={<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />}
            >
              Begin Your Mental Health Journey
            </PrimaryButton>
            
            <SecondaryButton href="/user/service">
              Explore Our Services
            </SecondaryButton>
          </div>
        </div>
      </div>
      
      <div className="absolute top-20 left-10 w-24 h-24 bg-[#015F4A]/5 rounded-full blur-xl" aria-hidden="true"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#015F4A]/3 rounded-full blur-2xl" aria-hidden="true"></div>
    </header>
  );
};

export default HeroSection;