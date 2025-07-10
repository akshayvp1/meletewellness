"use client";

import React from 'react';
import { LucideIcon } from 'lucide-react';
import AnimatedSection from '@/components/user/child-support/AnimatedSection';

interface ApproachCardProps {
  approach: {
    title: string;
    description: string;
    icon: LucideIcon;
  };
  index: number;
  isVisible: boolean;
}

const ApproachCard: React.FC<ApproachCardProps> = ({ approach, index, isVisible }) => {
  return (
    <AnimatedSection isVisible={isVisible} delay={index * 150} className="text-center">
      <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-200">
        <div className="bg-[#015F4A] p-4 rounded-2xl shadow-lg inline-block mb-6">
          <approach.icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-4">{approach.title}</h3>
        <p className="text-slate-600 leading-relaxed">{approach.description}</p>
      </div>
    </AnimatedSection>
  );
};

export default ApproachCard;