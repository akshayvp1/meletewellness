"use client";

import React from 'react';
import { Baby, Users, BookOpen, Shield } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import AnimatedSection from '@/components/user/child-support/AnimatedSection';
import ApproachCard from './ApproachCard';

const ApproachSection: React.FC = () => {
const [elementRef, isVisible] = useIntersectionObserver(0.1);

  const approaches = [
    {
      title: 'Child-Centered Approach',
      description: 'We believe every child is unique. Our therapy is tailored to each child\'s individual needs, interests, and developmental stage.',
      icon: Baby
    },
    {
      title: 'Family Involvement',
      description: 'We work closely with parents and caregivers to ensure therapeutic progress extends beyond our sessions into daily life.',
      icon: Users
    },
    {
      title: 'Evidence-Based Practice',
      description: 'Our interventions are grounded in research-proven methods including CBT, play therapy, and developmental approaches.',
      icon: BookOpen
    },
    {
      title: 'Safe Environment',
      description: 'We create a nurturing, judgment-free space where children feel secure to explore their emotions and experiences.',
      icon: Shield
    }
  ];

  return (
    <section 
      ref={elementRef}
      className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection isVisible={isVisible} className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-800 mb-6">
            Our Therapeutic
            <span className="block text-[#015F4A]">
              Approach
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
            We combine evidence-based practices with compassionate care to create the best possible outcomes for your child.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {approaches.map((approach, index) => (
            <ApproachCard
              key={index}
              approach={approach}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;