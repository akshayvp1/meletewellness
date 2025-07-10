"use client";

import { LucideIcon } from 'lucide-react';

interface ApproachCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
  isVisible: boolean;
}

export const ApproachCard: React.FC<ApproachCardProps> = ({
  icon: Icon,
  title,
  description,
  index,
  isVisible,
}) => {
  return (
    <div
      className={`text-center transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-200">
        <div className="bg-[#015F4A] p-4 rounded-2xl shadow-lg inline-block mb-6">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-4">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};