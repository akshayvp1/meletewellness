"use client";

import React from 'react';
import { Brain, Briefcase, Heart, Target } from 'lucide-react';
import { useIntersectionObserver } from '@/components/hooks/useIntersectionObserver';
import ServiceCard from './ServiceCard';

const ServicesSection: React.FC = () => {
  const [servicesRef, isServicesVisible] = useIntersectionObserver(0.1);

  const services = [
    {
      icon: Brain,
      title: 'Individual Therapy',
      description: 'Personalized one-on-one sessions to address your specific mental health needs, providing a safe space for self-exploration and healing.',
      features: ['Cognitive Behavioral Therapy', 'Psychodynamic Therapy', 'Mindfulness-Based Therapy', 'Solution-Focused Therapy']
    },
    {
      icon: Briefcase,
      title: 'Stress Counseling',
      description: 'Professional support for managing work-related stress, burnout, and achieving better work-life balance through proven techniques.',
      features: ['Burnout Recovery', 'Time Management', 'Workplace Anxiety', 'Stress Reduction Techniques']
    },
    {
      icon: Heart,
      title: 'Relationship Support',
      description: 'Guidance for improving communication, resolving conflicts, and building stronger connections in romantic, family, and social relationships.',
      features: ['Couples Counseling', 'Communication Skills', 'Conflict Resolution', 'Attachment Issues']
    },
    {
      icon: Target,
      title: 'Career Guidance',
      description: 'Professional coaching to help you navigate career transitions, make informed decisions, and achieve your professional goals.',
      features: ['Career Transition', 'Job Stress Management', 'Professional Development', 'Goal Setting']
    }
  ];

  return (
    <section ref={servicesRef} className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isServicesVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-800 mb-6">
            Comprehensive Adult
            <span className="block text-[#015F4A]">
              Mental Health Services
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
            Evidence-based therapeutic approaches designed to help adults navigate life's challenges and achieve lasting mental wellness.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
              isVisible={isServicesVisible}
              delay={index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;