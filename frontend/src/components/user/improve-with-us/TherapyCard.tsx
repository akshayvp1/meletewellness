import React from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { TherapyImprovement } from '@/types/types';
import { iconMap } from '@/utils/iconMap';

export interface TherapyCardProps {
  item: TherapyImprovement;
  index: number;
  isActive?: boolean;
  onClick?: () => void;
  isImageLoaded?: boolean;
  onImageLoad?: (imageSrc: string) => void;
}

const sectionVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50, 
    rotate: -5 
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { 
      delay: i * 0.1, 
      duration: 0.7 
    },
  }),
  hover: {
    scale: 1.05,
    boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
    transition: { 
      duration: 0.3 
    },
  },
};

const TherapyCard: React.FC<TherapyCardProps> = ({ 
  item, 
  index, 
  isActive = false, 
  onClick,
  isImageLoaded,
  onImageLoad 
}) => {
  const IconComponent = iconMap[item.icon];

  const handleImageLoad = () => {
    if (onImageLoad) {
      onImageLoad(item.bgImage);
    }
  };

  return (
    <motion.div
      className="relative p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group overflow-hidden cursor-pointer"
      style={{
        minHeight: '300px',
        backgroundImage: `url(${item.bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      whileHover="hover"
      onClick={onClick}
    >
      {/* Hidden image for preloading */}
      {onImageLoad && (
        <img
          src={item.bgImage}
          alt=""
          className="hidden"
          onLoad={handleImageLoad}
        />
      )}
      
      <div
        className={`absolute inset-0 transition-all duration-300 ${
          isActive 
            ? 'bg-[#015F4A] opacity-80' 
            : 'bg-black opacity-40 group-hover:bg-[#015F4A] group-hover:opacity-80'
        }`}
      ></div>
      
      <div className="relative z-10 flex flex-col items-center   text-white">
        <div className="mb-5">
          {IconComponent ? <IconComponent style={{ color: '#31A382' }} /> : null}
        </div>
        <h3 className="text-lg font-semibold mb-3 text-center">{item.title}</h3>
        
        <AnimatePresence>
          {isActive ? (
            <motion.div
              className="absolute inset-0 flex items-center justify-center p-4 text-sm leading-relaxed text-center bg-[#015F4A] bg-opacity-90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="max-h-full">
                {item.desc}
              </div>
            </motion.div>
          ) : (
            <motion.p
              className="text-sm leading-relaxed text-center max-w-xs transition-opacity duration-300"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {item.desc.substring(0, 50) + '...'}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TherapyCard;