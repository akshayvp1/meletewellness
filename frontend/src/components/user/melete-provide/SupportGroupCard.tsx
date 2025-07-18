"use client"
import React from 'react';
import { SupportGroupCardProps } from '@/types/types';

const SupportGroupCard: React.FC<SupportGroupCardProps> = ({
  group,
  index,
  isVisible,
  onClick,
}) => {
  const handleClick = () => {
    onClick(group);
  };

  return (
    <article
      className={`group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 cursor-pointer border border-slate-200 hover:border-[#015F4A] ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-12 opacity-0"
      }`}
      style={{
        transitionDelay: isVisible ? `${index * 150}ms` : "0ms",
      }}
      onClick={handleClick}
    >
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-emerald-50 to-[#015F4A]/10">
        <img
          src={group.image}
          alt={`${group.title} mental health services`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#015F4A]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-[#015F4A] transition-colors duration-300">
          {group.title}
        </h3>

        <p className="text-slate-600 text-sm leading-relaxed mb-5">
          {group.description}
        </p>

        <div className="space-y-2">
          {group.features.slice(0, 3).map((feature, featureIndex) => (
            <div
              key={featureIndex}
              className="flex items-center text-xs text-slate-500 hover:text-slate-700 transition-colors duration-200"
            >
              <div className="w-2 h-2 bg-[#015F4A] rounded-full mr-3 flex-shrink-0" />
              {feature}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};

export default SupportGroupCard;