import React from 'react';
import { Users, Home, Shield, MessageCircle } from 'lucide-react';
import { ServiceCard } from './ServiceCard';
import { useIntersectionObserver } from '@/components/hooks/useIntersectionObserver';

const services = [
  {
    icon: Users,
    title: 'Parenting Skills',
    description: 'Develop effective parenting strategies tailored to your family\'s unique needs, focusing on positive discipline, emotional connection, and healthy boundaries.',
    features: ['Positive Discipline Techniques', 'Age-Appropriate Expectations', 'Boundary Setting', 'Emotional Intelligence Development']
  },
  {
    icon: Home,
    title: 'Family Counseling',
    description: 'Strengthen family bonds through improved communication, conflict resolution, and creating a harmonious home environment for all family members.',
    features: ['Family Dynamics Assessment', 'Conflict Resolution', 'Family Meeting Facilitation', 'Relationship Building']
  },
  {
    icon: Shield,
    title: 'Stress Management',
    description: 'Learn practical strategies to manage parenting stress, maintain work-life balance, and prioritize your mental health while caring for your family.',
    features: ['Stress Reduction Techniques', 'Time Management', 'Self-Care Strategies', 'Mindfulness Practices']
  },
  {
    icon: MessageCircle,
    title: 'Communication Training',
    description: 'Master effective communication techniques to connect with your children, resolve conflicts peacefully, and build trust within your family.',
    features: ['Active Listening Skills', 'Assertive Communication', 'Empathy Building', 'Difficult Conversations']
  }
];

export const ServicesSection: React.FC = () => {
  const [servicesRef, isServicesVisible] = useIntersectionObserver(0.1);

  return (
    <section 
      ref={servicesRef}
      className="py-16 lg:py-24 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isServicesVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-3xl lg:text-5xl font-bold text-[#015F4A] mb-6">
            Our Comprehensive
            <span className="block text-[#015F4A]">
              Parent Support Services
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Evidence-based support and practical strategies designed to help parents build stronger, healthier relationships with their children.
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