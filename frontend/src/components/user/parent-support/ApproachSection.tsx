import React from 'react';
import { Star, Users, BookOpen, Heart } from 'lucide-react';
import { ApproachCard } from './ApproachCard';
import { useIntersectionObserver } from '@/components/hooks/useIntersectionObserver';

const approaches = [
  {
    title: 'Strength-Based Approach',
    description: 'We focus on your existing strengths as a parent and build upon them, recognizing that every family has unique resources and capabilities.',
    icon: Star
  },
  {
    title: 'Collaborative Partnership',
    description: 'We work together as partners in your parenting journey, providing guidance while respecting your family values and parenting style.',
    icon: Users
  },
  {
    title: 'Evidence-Based Methods',
    description: 'Our interventions are grounded in research-proven approaches including family systems therapy, positive parenting, and cognitive-behavioral techniques.',
    icon: BookOpen
  },
  {
    title: 'Holistic Support',
    description: 'We address the whole family system, considering individual needs, family dynamics, and environmental factors that impact parenting.',
    icon: Heart
  }
];

export const ApproachSection: React.FC = () => {
  const [approachRef, isApproachVisible] = useIntersectionObserver(0.1);

  return (
    <section 
      ref={approachRef}
      className="py-16 lg:py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isApproachVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-3xl lg:text-5xl font-bold text-[#015F4A] mb-6">
            Our Supportive
            <span className="block text-[#015F4A]">
              Approach
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            We combine compassionate understanding with practical strategies to empower parents and strengthen family relationships.
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