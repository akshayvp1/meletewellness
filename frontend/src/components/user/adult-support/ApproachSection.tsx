"use client";

import React from 'react';
import { BookOpen, Heart, Shield, Users } from 'lucide-react';
import { useIntersectionObserver } from '@/components/hooks/useIntersectionObserver';
import ApproachCard from './ApproachCard';

const ApproachSection: React.FC = () => {
  const [approachRef, isApproachVisible] = useIntersectionObserver(0.1);

  const approaches = [
    {
      title: 'Evidence-Based Practice',
      description: 'We use scientifically proven therapeutic methods including CBT, DBT, and mindfulness-based interventions tailored to adult needs.',
      icon: BookOpen
    },
    {
      title: 'Holistic Approach',
      description: 'We address all aspects of your wellbeing - mental, emotional, physical, and social - for comprehensive healing and growth.',
      icon: Heart
    },
    {
      title: 'Confidential & Safe',
      description: 'Complete privacy and a judgment-free environment where you can explore your thoughts and feelings without fear.',
      icon: Shield
    },
    {
      title: 'Collaborative Care',
      description: 'We work together as partners in your healing journey, empowering you to take an active role in your mental health.',
      icon: Users
    }
  ];

  return (
    <section ref={approachRef} className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isApproachVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-800 mb-6">
            Our Therapeutic
            <span className="block text-[#015F4A]">
              Approach
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
            We combine evidence-based practices with compassionate care to create personalized treatment plans that work for your unique situation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {approaches.map((approach, index) => (
            <ApproachCard
              key={index}
              icon={approach.icon}
              title={approach.title}
              description={approach.description}
              isVisible={isApproachVisible}
              delay={index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;