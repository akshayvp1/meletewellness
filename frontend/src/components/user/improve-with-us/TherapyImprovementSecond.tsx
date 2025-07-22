'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { therapyImprovements } from './therapyData';
import TherapyCard from './TherapyCard';
import ScrollIndicators from './ScrollIndicators';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import { useActiveCard } from '@/components/hooks/useActiveCard';
import { useLoading } from '@/components/hooks/useLoading';
import type { TherapyImprovement } from '@/types/types';

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const TherapyImprovementsSection: React.FC = () => {
  const loading = useLoading(500); // Reduced loading time for better UX
  const { activeCard, handleCardClick } = useActiveCard();

  // Loading fallback
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  // Data fallback
  if (!therapyImprovements || !Array.isArray(therapyImprovements)) {
    console.error('therapyImprovements is not defined or not an array');
    return (
      <div className="min-h-screen flex justify-center items-center py-20">
        <p className="text-red-500">Error loading therapy improvements data</p>
      </div>
    );
  }

  return (
    <motion.section
      className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-slate-50 via-white to-emerald-50 min-h-screen"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      aria-labelledby="improvements-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.h2
          id="improvements-heading"
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-[#015F4A]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          What You Can Improve With Us
        </motion.h2>

        <div className="relative w-full">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {therapyImprovements.map((item: TherapyImprovement, index: number) => (
              <motion.div
                key={`${item.title}-${index}`}
                className="w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <TherapyCard
                  item={item}
                  index={index}
                  isActive={activeCard === index}
                  onClick={() => handleCardClick(index)}
                />
              </motion.div>
            ))}
          </motion.div>
          <ScrollIndicators />
        </div>
      </div>
    </motion.section>
  );
};

export default TherapyImprovementsSection;