import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, className = '' }) => {
  return (
    <motion.h2
      className={`text-3xl md:text-4xl font-bold mb-12 ${className}`}
      style={{ color: '#015F4A' }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {title}
    </motion.h2>
  );
};

export default SectionHeader;