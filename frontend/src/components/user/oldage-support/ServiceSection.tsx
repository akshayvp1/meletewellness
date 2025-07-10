"use client";

import React from 'react';
import { Brain, Heart, Activity, Smile, CheckCircle } from 'lucide-react';
import { useIntersectionObserver } from '@/components/hooks/useIntersectionObserver';
import { ServiceCard } from '@/components/user/oldage-support/ServiceCard';

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
}

const services: Service[] = [
  {
    icon: Brain,
    title: 'Cognitive Support',
    description: 'Specialized support for memory concerns, cognitive changes, and maintaining mental sharpness. We help seniors navigate age-related cognitive transitions with dignity and confidence.',
    features: ['Memory Enhancement', 'Cognitive Training', 'Dementia Support', 'Mental Stimulation']
  },
  {
    icon: Heart,
    title: 'Loneliness Prevention',
    description: 'Addressing social isolation and loneliness through connection building, community engagement, and therapeutic support for meaningful relationships.',
    features: ['Social Connection', 'Community Building', 'Grief Support', 'Companionship Therapy']
  },
  {
    icon: Activity,
    title: 'Health Adaptation',
    description: 'Supporting seniors in adapting to health changes, chronic conditions, and physical limitations while maintaining emotional wellbeing and quality of life.',
    features: ['Chronic Pain Management', 'Medical Adaptation', 'Mobility Support', 'Health Anxiety']
  },
  {
    icon: Smile,
    title: 'Emotional Wellness',
    description: 'Comprehensive emotional support addressing depression, anxiety, and life transitions specific to the senior years, promoting resilience and joy.',
    features: ['Depression Support', 'Anxiety Management', 'Life Transitions', 'Purpose & Meaning']
  }
];

export const ServicesSection: React.FC = () => {
  const [servicesRef, isServicesVisible] = useIntersectionObserver(0.1);

  return (
    <section 
      ref={servicesRef}
      className="py-16 lg:py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isServicesVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-800 mb-6">
            Comprehensive Senior
            <span className="block text-[#015F4A]">
              Mental Health Services
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
            Specialized care designed specifically for the unique mental health needs of older adults, promoting dignity, wellness, and quality of life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
              isVisible={isServicesVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};