import React from 'react';
import { motion } from 'framer-motion';
import TherapyCard from './TherapyCard';
import { TherapyImprovement } from '@/types/types';

interface TherapyGridProps {
  items: TherapyImprovement[];
  activeCard: number | null;
  onCardClick: (index: number) => void;
}

const TherapyGrid: React.FC<TherapyGridProps> = ({ items, activeCard, onCardClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {items.map((item, index) => (
        <TherapyCard
          key={item.title}
          item={item}
          index={index}
          isActive={activeCard === index}
          onClick={() => onCardClick(activeCard === index ? -1 : index)}
        />
      ))}
    </div>
  );
};

export default TherapyGrid;