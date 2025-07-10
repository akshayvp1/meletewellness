"use client";

import React from 'react';
import { CheckCircle, Clock, User } from 'lucide-react';
import { Consultant } from '@/types/types';
import AnimatedSection from '@/components/user/child-support/AnimatedSection';

interface ConsultantCardProps {
  consultant: Consultant;
  index: number;
  isVisible: boolean;
}

const ConsultantCard: React.FC<ConsultantCardProps> = ({ consultant, index, isVisible }) => {
  return (
    <AnimatedSection isVisible={isVisible} delay={index * 150}>
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
        {/* Professional Header with Image */}
        <div className="relative bg-gradient-to-br from-[#015F4A] to-[#014136] p-6 pb-16">
          <div className="flex items-center justify-between mb-4">
            {consultant.isVerified && (
              <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full">
                <CheckCircle className="w-3 h-3 text-white" />
                <span className="text-xs text-white font-medium">Verified</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`w-3 h-3 ${i < Math.floor(consultant.rating) ? 'text-yellow-400' : 'text-white/30'}`}>
                    ★
                  </div>
                ))}
              </div>
              <span className="text-white/80 text-xs ml-1">({consultant.sessions})</span>
            </div>
          </div>
          
          {/* Profile Image - Positioned to overlap */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="w-16 h-16 rounded-full bg-white p-1 shadow-lg">
              <img
                src={consultant.image}
                alt={consultant.name}
                className="w-full h-full rounded-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(consultant.name)}&background=015F4A&color=ffffff&size=64`;
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="pt-12 px-6 pb-6">
          <div className="text-center mb-4">
            <h3 className="text-lg font-bold text-slate-800 mb-1">{consultant.name}</h3>
            <p className="text-[#015F4A] font-semibold text-sm mb-1">{consultant.qualification}</p>
            <p className="text-slate-600 text-sm">{consultant.specialization}</p>
          </div>
          
          {/* Experience and Location */}
          <div className="flex items-center justify-center gap-4 text-xs text-slate-500 mb-4">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{consultant.experience}</span>
            </div>
            {consultant.location && (
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span>{consultant.location}</span>
              </div>
            )}
          </div>
          
          {/* Languages */}
          {consultant.languages && consultant.languages.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-slate-700 mb-2">Languages:</p>
              <div className="flex flex-wrap gap-1 justify-center">
                {consultant.languages.slice(0, 3).map((language, langIndex) => (
                  <span key={langIndex} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
                    {language}
                  </span>
                ))}
                {consultant.languages.length > 3 && (
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
                    +{consultant.languages.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}
          
          {/* Expertise Tags */}
          {consultant.expertise && consultant.expertise.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-slate-700 mb-2">Specializations:</p>
              <div className="flex flex-wrap gap-1 justify-center">
                {consultant.expertise.slice(0, 2).map((skill, skillIndex) => (
                  <span key={skillIndex} className="px-2 py-1 bg-[#015F4A]/10 text-[#015F4A] text-xs rounded-md font-medium">
                    {skill}
                  </span>
                ))}
                {consultant.expertise.length > 2 && (
                  <span className="px-2 py-1 bg-[#015F4A]/10 text-[#015F4A] text-xs rounded-md font-medium">
                    +{consultant.expertise.length - 2} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ConsultantCard;