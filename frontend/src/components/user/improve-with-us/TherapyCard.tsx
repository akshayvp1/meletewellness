'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { TherapyImprovement } from '../../../types/types';
import { iconMap, cardVariants } from './therapyData';
import CardSkeleton from './CardSkeleton';

interface TherapyCardProps {
  item: TherapyImprovement;
  index: number;
  isImageLoaded: boolean;
  onImageLoad: (imageSrc: string) => void;
}

const TherapyCard: React.FC<TherapyCardProps> = ({ item, index, isImageLoaded, onImageLoad }) => {
  const router = useRouter();
  const IconComponent = iconMap[item.icon];

  return (
    <motion.div
      className="flex-shrink-0 w-80 md:w-full snap-center"
      variants={cardVariants}
      custom={index}
      whileHover="hover"
      role="button"
      tabIndex={0}
      onClick={() => router.push('/improve')}
      onKeyDown={(e) => e.key === 'Enter' && router.push('/improve')}
      aria-label={`Learn more about improving ${item.title}`}
    >
      {isImageLoaded ? (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden h-96 group relative">
          <div className="relative h-48 w-full">
            <Image
              src={item.bgImage}
              alt={`${item.title} illustration`}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 320px, 25vw"
              priority={index < 2}
              quality={75}
            />
          </div>
          <div className="p-6 text-center">
            {IconComponent && (
              <IconComponent className="w-8 h-8 text-[#31A382] mx-auto mb-4" aria-hidden="true" />
            )}
            <h3 className="text-lg font-semibold text-[#015F4A] mb-3">{item.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{item.desc}</p>
          </div>
          <div className="absolute inset-0 bg-[#015F4A] bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="text-white font-medium">Learn More</span>
          </div>
        </div>
      ) : (
        <CardSkeleton />
      )}
      <Image
        src={item.bgImage}
        alt=""
        width={0}
        height={0}
        sizes="100vw"
        className="hidden"
        onLoad={() => onImageLoad(item.bgImage)}
        onError={() => onImageLoad(item.bgImage)}
      />
    </motion.div>
  );
};

export default TherapyCard;