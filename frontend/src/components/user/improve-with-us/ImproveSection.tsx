import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import SectionHeader from './SectionHeader';
import TherapyGrid from './TherapyGrid';
import { therapyImprovements } from './therapyData';

const containerVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 60 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.9, 
      ease: 'easeOut' 
    } 
  },
};

const ImproveSection: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setActiveCard(index === -1 ? null : index);
  };

  return (
    <motion.section
      className="py-24 text-center"
      style={{ backgroundColor: '#F9F9F9' }}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <SectionHeader title="What You Can Improve With Us" />
        <TherapyGrid
          items={therapyImprovements}
          activeCard={activeCard}
          onCardClick={handleCardClick}
        />
      </div>
    </motion.section>
  );
};

export default ImproveSection;