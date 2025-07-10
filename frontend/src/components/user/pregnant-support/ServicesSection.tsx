"use client";

import { Heart, Brain, Baby, Users } from 'lucide-react';
import { useIntersectionObserver } from '@/components/hooks/useIntersectionObserver';
import { ServiceCard } from '@/components/user/pregnant-support/ServiceCard';

const services = [
  {
    icon: Heart,
    title: 'Prenatal Counseling',
    description: 'Specialized support for expecting mothers dealing with pregnancy-related anxiety, mood changes, and emotional adjustments during this transformative journey.',
    features: ['Pregnancy Anxiety Support', 'Hormonal Mood Management', 'Body Image Counseling', 'Relationship Changes']
  },
  {
    icon: Brain,
    title: 'Perinatal Mental Health',
    description: 'Comprehensive mental health care throughout pregnancy and postpartum, addressing depression, anxiety, and other perinatal mood disorders.',
    features: ['Prenatal Depression', 'Anxiety Management', 'Panic Disorder Support', 'OCD During Pregnancy']
  },
  {
    icon: Baby,
    title: 'Postpartum Preparation',
    description: 'Preparing for the emotional and psychological aspects of motherhood, including bonding, identity changes, and postpartum adjustment.',
    features: ['Maternal Bonding', 'Identity Transition', 'Postpartum Planning', 'Birth Trauma Processing']
  },
  {
    icon: Users,
    title: 'Partner & Family Support',
    description: 'Including partners and family members in the pregnancy journey, addressing relationship dynamics and preparing for parenthood together.',
    features: ['Couples Counseling', 'Communication Skills', 'Family Dynamics', 'Co-Parenting Preparation']
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
            Comprehensive Pregnancy
            <span className="block text-[#015F4A]">
              Mental Health Services
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
            Specialized care designed specifically for the unique mental health needs of expecting mothers throughout their pregnancy journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
              index={index}
              isVisible={isServicesVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};