import React from 'react';
import { Award, UserCheck, Shield, Globe, Brain, Heart } from 'lucide-react';
import Card from '@/components/user/about/Card';
import { ReasonItem } from '@/types/types';

const WhyChooseSection: React.FC = () => {
  const reasons: ReasonItem[] = [
    {
      icon: Award,
      title: "Certified Mental Health Platform",
      description: "A professionally certified platform ensuring compliance with healthcare standards for quality mental health care."
    },
    {
      icon: UserCheck,
      title: "Licensed Therapists",
      description: "Connect with verified mental health professionals offering specialized expertise and compassionate care."
    },
    {
      icon: Shield,
      title: "Healthcare-Grade Security",
      description: "Your data is protected with advanced encryption, ensuring complete confidentiality and privacy."
    },
    {
      icon: Globe,
      title: "Comprehensive Mental Health Services",
      description: "Support for individuals, schools, healthcare providers, and corporate wellness programs."
    },
    {
      icon: Brain,
      title: "Evidence-Based Therapy",
      description: "Access scientifically validated therapeutic methods for effective mental health support."
    },
    {
      icon: Heart,
      title: "Compassionate Mental Health Care",
      description: "Empathy-driven support tailored to your unique mental health needs and goals."
    }
  ];

  return (
    <section className="py-20 bg-white" aria-labelledby="why-melete-heading">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 id="why-melete-heading" className="text-4xl lg:text-5xl font-light mb-6 text-gray-900">
            Why Choose <span className="text-5xl font-inter font-normal text-[#1ca184]">Melete</span>?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover a secure, professional mental health platform combining innovative technology with licensed therapists for effective, accessible support.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <Card key={index} hover className="group">
              <div className="w-14 h-14 bg-[#015F4A]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#015F4A] group-hover:scale-105 transition-all duration-300">
                <reason.icon className="text-[#015F4A] group-hover:text-white transition-colors duration-300" size={24} aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{reason.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{reason.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;