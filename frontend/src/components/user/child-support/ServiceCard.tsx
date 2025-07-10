"use client";

import React from 'react';
import { LucideIcon, CheckCircle } from 'lucide-react';
import AnimatedSection from '@/components/user/child-support/AnimatedSection';

interface ServiceCardProps {
  service: {
    icon: LucideIcon;
    title: string;
    description: string;
    features: string[];
  };
  index: number;
  isVisible: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, isVisible }) => {
  return (
    <AnimatedSection isVisible={isVisible} delay={index * 150}>
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-lg p-6 sm:p-8 border border-slate-200 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
          <div className="bg-[#015F4A] p-3 sm:p-4 rounded-xl shadow-md flex-shrink-0">
            <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3">{service.title}</h3>
            <p className="text-sm sm:text-base text-slate-600 mb-4 leading-relaxed">{service.description}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {service.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#015F4A] flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-600">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ServiceCard;