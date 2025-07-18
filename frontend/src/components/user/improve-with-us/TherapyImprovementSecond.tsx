



// 'use client';

// import React from 'react';
// import { motion, Variants } from 'framer-motion';
// import { therapyImprovements } from './therapyData';
// import TherapyCard from './TherapyCard';
// import ScrollIndicators from './ScrollIndicators';
// import { useActiveCard } from '@/components/hooks/useActiveCard';
// // import ShowMoreButton from './ShowMoreButton';
// import type { TherapyImprovement } from '../../../types/types';

// // Define animation variants properly with correct typing
// const sectionVariants: Variants = {
//   hidden: { 
//     opacity: 0, 
//     y: 50 
//   },
//   visible: { 
//     opacity: 1, 
//     y: 0,
//     transition: {
//       duration: 0.6,
//       ease: "easeOut"
//     }
//   }
// };

// const containerVariants: Variants = {
//   hidden: { 
//     opacity: 0 
//   },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//       delayChildren: 0.2
//     }
//   }
// };

// const TherapyImprovementsSection: React.FC = () => {
//   const { activeCard, handleCardClick } = useActiveCard();

//   // Fallback if therapyImprovements is not available
//   if (!therapyImprovements || !Array.isArray(therapyImprovements)) {
//     console.error('therapyImprovements is not defined or not an array');
//     return null;
//   }

//   return (
//     <motion.section
//       className="py-16 bg-gradient-to-br from-slate-50 via-white to-emerald-50"
//       variants={sectionVariants}
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true, amount: 0.2 }}
//       aria-labelledby="improvements-heading"
//     >
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <h2
//           id="improvements-heading"
//           className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#015F4A]"
//         >
//           What You Can Improve With Us
//         </h2>
//         <div className="relative">
//           <motion.div
//             className="
//               flex flex-col gap-6
//               md:grid md:grid-cols-4 md:gap-6
//             "
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             {therapyImprovements.map((item: TherapyImprovement, index: number) => (
//               <TherapyCard
//                 key={item.title}
//                 item={item}
//                 index={index}
//                 isActive={activeCard === index}
//                 onClick={() => handleCardClick(index)}
//               />
//             ))}
//           </motion.div>
//           <ScrollIndicators />
//         </div>
//         {/* <ShowMoreButton /> */}
//       </div>
//     </motion.section>
//   );
// };

// export default TherapyImprovementsSection;






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
  const loading = useLoading(); // Custom loading hook
  const { activeCard, handleCardClick } = useActiveCard();

  // Loading fallback
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  // Data fallback
  if (!therapyImprovements || !Array.isArray(therapyImprovements)) {
    console.error('therapyImprovements is not defined or not an array');
    return null;
  }

  return (
    <motion.section
      className="py-16 bg-gradient-to-br from-slate-50 via-white to-emerald-50"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      aria-labelledby="improvements-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="improvements-heading"
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#015F4A]"
        >
          What You Can Improve With Us
        </h2>

        <div className="relative">
          <motion.div
            className="flex flex-col gap-6 md:grid md:grid-cols-4 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {therapyImprovements.map((item: TherapyImprovement, index: number) => (
              <TherapyCard
                key={item.title}
                item={item}
                index={index}
                isActive={activeCard === index}
                onClick={() => handleCardClick(index)}
              />
            ))}
          </motion.div>
          <ScrollIndicators />
        </div>
        {/* <ShowMoreButton /> */}
      </div>
    </motion.section>
  );
};

export default TherapyImprovementsSection;
