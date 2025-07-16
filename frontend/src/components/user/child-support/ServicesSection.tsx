"use client";

import React from 'react';
import { Smile, Shield, Heart, Users } from 'lucide-react';
import { useIntersectionObserver } from '@/components/hooks/useIntersectionObserver';
import AnimatedSection from '@/components/user/child-support/AnimatedSection';
import ServiceCard from './ServiceCard';

const ServicesSection: React.FC = () => {
const [elementRef, isVisible] = useIntersectionObserver(0.1);

  const services = [
    {
      icon: Smile,
      title: 'Play Therapy',
      description: 'Using play as a natural medium for children to express feelings, process experiences, and develop coping skills in a safe, supportive environment.',
      features: ['Sand Play Therapy', 'Art & Creative Expression', 'Therapeutic Games', 'Storytelling Techniques']
    },
    {
      icon: Shield,
      title: 'Behavioral Support',
      description: 'Evidence-based interventions to help children develop positive behaviors, manage challenging emotions, and improve social interactions.',
      features: ['Behavior Modification', 'Positive Reinforcement', 'Social Skills Training', 'Anger Management']
    },
    {
      icon: Heart,
      title: 'Emotional Regulation',
      description: 'Teaching children healthy ways to understand, express, and manage their emotions through age-appropriate therapeutic techniques.',
      features: ['Mindfulness for Kids', 'Breathing Techniques', 'Emotion Identification', 'Coping Strategies']
    },
    {
      icon: Users,
      title: 'Social Skills Development',
      description: 'Helping children build confidence in social situations, develop friendships, and navigate peer relationships successfully.',
      features: ['Peer Interaction', 'Communication Skills', 'Conflict Resolution', 'Empathy Building']
    }
  ];

  return (
    <section 
      ref={elementRef}
      className="py-16 lg:py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection isVisible={isVisible} className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-800 mb-6">
            Our Specialized
            <span className="block text-[#015F4A]">
              Child Therapy Services
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
            Evidence-based therapeutic approaches designed specifically for children's unique developmental needs and emotional growth.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;