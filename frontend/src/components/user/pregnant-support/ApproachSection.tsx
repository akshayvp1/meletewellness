"use client";

import { Flower2, Heart, Shield, Users } from 'lucide-react';
import { useIntersectionObserver } from '@/components/hooks/useIntersectionObserver';
import { ApproachCard } from '@/components/user/pregnant-support/ApproachCard';

const approaches = [
  {
    title: 'Specialized Perinatal Care',
    description: 'Expert care specifically designed for pregnancy and postpartum mental health, using evidence-based treatments safe for expecting mothers.',
    icon: Flower2
  },
  {
    title: 'Holistic Maternal Wellness',
    description: 'Addressing physical, emotional, and spiritual aspects of pregnancy to support your complete wellbeing during this special time.',
    icon: Heart
  },
  {
    title: 'Safe & Confidential',
    description: 'A judgment-free environment where you can openly discuss your fears, concerns, and hopes about pregnancy and motherhood.',
    icon: Shield
  },
  {
    title: 'Family-Centered Approach',
    description: 'Including your partner and family in your care when appropriate, creating a supportive network for your pregnancy journey.',
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
            Our Maternal Care
            <span className="block text-[#015F4A]">
              Approach
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
            We combine specialized perinatal expertise with compassionate care to support you through every stage of your pregnancy journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {approaches.map((approach, index) => (
            <ApproachCard
              key={index}
              {...approach}
              index={index}
              isVisible={isApproachVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};