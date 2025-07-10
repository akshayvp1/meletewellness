"use client";

import React from 'react';
import { UserCheck, Shield, Users, Heart } from 'lucide-react';
import { useIntersectionObserver } from '@/components/hooks/useIntersectionObserver';
import { ApproachCard } from '@/components/user/oldage-support/ApproachCard';

interface Approach {
  title: string;
  description: string;
  icon: React.ElementType;
}

const approaches: Approach[] = [
  {
    title: 'Age-Specialized Care',
    description: 'Expert care specifically designed for the unique mental health needs of older adults, using approaches that honor wisdom and experience.',
    icon: UserCheck
  },
  {
    title: 'Dignity-Centered Approach',
    description: 'Maintaining dignity and respect throughout the therapeutic process, recognizing the rich life experience and wisdom of our senior clients.',
    icon: Heart
  },
  {
    title: 'Safe & Comfortable',
    description: 'Creating a comfortable, accessible environment where seniors can openly discuss their concerns without judgment or ageism.',
    icon: Shield
  },
  {
    title: 'Family-Inclusive Care',
    description: 'Including family members and caregivers when appropriate, creating a supportive network for comprehensive senior care.',
    icon: Users
  }
];

export const ApproachSection: React.FC = () => {
  const [approachRef, isApproachVisible] = useIntersectionObserver(0.1);

  return (
    <section 
      ref={approachRef}
      className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isApproachVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-800 mb-6">
            Our Senior Care
            <span className="block text-[#015F4A]">
              Approach
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
            We combine specialized geriatric expertise with compassionate care to support seniors through every aspect of their mental health journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {approaches.map((approach, index) => (
            <ApproachCard
              key={index}
              approach={approach}
              index={index}
              isVisible={isApproachVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};