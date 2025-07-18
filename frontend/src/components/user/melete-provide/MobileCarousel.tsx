"use client"
import React from 'react';
import { MobileCarouselProps } from '@/types/types';

const MobileCarousel: React.FC<MobileCarouselProps> = ({
  groups,
  currentSlide,
  onServiceClick,
  swipeHandlers,
}) => {
  return (
    <div className="block lg:hidden mb-12">
      <div className="relative">
        <div
          className="relative overflow-hidden rounded-3xl"
          {...swipeHandlers}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {groups.map((group) => (
              <div key={group.id} className="w-full flex-shrink-0 px-3">
                <article
                  className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 mx-auto max-w-md cursor-pointer transform transition-all duration-300 hover:scale-105 active:scale-95"
                  onClick={() => onServiceClick(group)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={group.image}
                      alt={`${group.title} mental health services`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${group.color} mix-blend-multiply opacity-25`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
                      <group.icon className="w-8 h-8 text-slate-700" />
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-white text-2xl font-bold mb-2 drop-shadow-lg">
                        {group.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-8">
                    <p className="text-slate-600 text-base leading-relaxed mb-6">
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileCarousel;