// 'use client';

// import React, { useState } from 'react';
// import { motion, Variants } from 'framer-motion';
// import { useRouter } from 'next/navigation';
// import {
//   Star,
//   Brain,
//   AlertTriangle,
//   Frown,
// } from 'lucide-react';
// import Link from 'next/link';
// import Image from 'next/image';

// import { TherapyImprovement } from '../../../types/types';

// import selfconfidence from '@/../../public/assets/Self-Confidence.webp';
// import stress from '@/../../public/assets/stress.webp'; 
// import anxiety from '@/../../public/assets/Anxiety.webp';
// import depression from '@/../../public/assets/Depression.webp';


// // Animation variants
// const sectionVariants: Variants = {
//   hidden: { opacity: 0, y: 60 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: 'easeOut' } },
// };

// const containerVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.1 },
//   },
// };

// const cardVariants: Variants = {
//   hidden: { opacity: 0, y: 50, rotate: -5 },
//   visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.7 } },
//   hover: {
//     scale: 1.05,
//     boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
//     transition: { duration: 0.3 },
//   },
// };

// // Icon map for lucide-react
// const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
//   Star,
//   Brain,
//   AlertTriangle,
//   Frown,
// };

// // Skeleton loader for cards
// const SkeletonCard: React.FC = () => (
//   <div className="flex-shrink-0 w-80 md:w-1/4 snap-center">
//     <div className="bg-white rounded-2xl shadow-md overflow-hidden h-96 animate-pulse">
//       <div className="h-48 bg-gray-200" />
//       <div className="p-6 space-y-4">
//         <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto" />
//         <div className="h-4 bg-gray-200 rounded w-full" />
//         <div className="h-4 bg-gray-200 rounded w-5/6" />
//       </div>
//     </div>
//   </div>
// );

// const TherapyImprovementsSection: React.FC = () => {
//   const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
//   const router = useRouter();
  
//   const therapyImprovements: TherapyImprovement[] = [
//     {
//       title: 'Self Confidence',
//       desc: 'Self-confidence means believing in yourself and your abilities. It is about trusting your own decisions, knowing your strengths and weaknesses, and feeling in control of your life.',
//       icon: 'Star',
//       bgImage: selfconfidence.src,
//     },
//     {
//       title: 'Stress',
//       desc: 'Psychological stress is the way our mind and body respond to pressure or challenges, whether they come from inside us or from the world around us. It happens when we feel off balance or overwhelmed.',
//       icon: 'Brain',
//       bgImage: stress.src,
//     },
//     {
//       title: 'Anxiety',
//       desc: 'Anxiety is a common emotion, and it can cause physical symptoms, such as shaking and sweating. When anxiety becomes persistent or excessive, a person may have an anxiety disorder.',
//       icon: 'AlertTriangle',
//       bgImage: anxiety.src,
//     },
//     {
//       title: 'Depression',
//       desc: 'Depression is a common and serious mental disorder that negatively affects how you feel, think, act, and perceive the world.',
//       icon: 'Frown',
//       bgImage: depression.src
//     },
//   ];

//   const handleImageLoad = (imageSrc: string) => {
//     setLoadedImages((prev) => new Set(prev).add(imageSrc));
//   };

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
//             className="flex flex-row overflow-x-auto md:grid md:grid-cols-4 gap-6 snap-x snap-mandatory pb-4"
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             {therapyImprovements.map((item, index) => {
//               const IconComponent = iconMap[item.icon];
//               const isImageLoaded = loadedImages.has(item.bgImage);

//               return (
//                 <motion.div
//                   key={item.title}
//                   className="flex-shrink-0 w-80 md:w-full snap-center"
//                   variants={cardVariants}
//                   custom={index}
//                   whileHover="hover"
//                   role="button"
//                   tabIndex={0}
//                   onClick={() => router.push('/improve')}
//                   onKeyDown={(e) => e.key === 'Enter' && router.push('/improve')}
//                   aria-label={`Learn more about improving ${item.title}`}
//                 >
//                   {isImageLoaded ? (
//                     <div className="bg-white rounded-2xl shadow-md overflow-hidden h-96 group relative">
//                       <div className="relative h-48 w-full">
//                         <Image
//                           src={item.bgImage}
//                           alt={`${item.title} illustration`}
//                           fill
//                           className="object-cover group-hover:scale-110 transition-transform duration-500"
//                           sizes="(max-width: 768px) 320px, 25vw"
//                           priority={index < 2} // Prioritize first two images for faster loading
//                           quality={75} // Optimize image quality
//                         />
//                       </div>
//                       <div className="p-6 text-center">
//                         {IconComponent && (
//                           <IconComponent className="w-8 h-8 text-[#31A382] mx-auto mb-4" aria-hidden="true" />
//                         )}
//                         <h3 className="text-lg font-semibold text-[#015F4A] mb-3">{item.title}</h3>
//                         <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
//                           {item.desc}
//                         </p>
//                       </div>
//                       <div className="absolute inset-0 bg-[#015F4A] bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
//                         <span className="text-white font-medium">Learn More</span>
//                       </div>
//                     </div>
//                   ) : (
//                     <SkeletonCard />
//                   )}
//                   <Image
//                     src={item.bgImage}
//                     alt=""
//                     width={0}
//                     height={0}
//                     sizes="100vw"
//                     className="hidden"
//                     onLoad={() => handleImageLoad(item.bgImage)}
//                     onError={() => handleImageLoad(item.bgImage)} // Handle errors gracefully
//                   />
//                 </motion.div>
//               );
//             })}
//           </motion.div>
//           {/* Scroll indicators for mobile */}
//           <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#F9F9F9] to-transparent pointer-events-none md:hidden" />
//           <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#F9F9F9] to-transparent pointer-events-none md:hidden" />
//         </div>
//         <div className="flex justify-center mt-8">
//           <Link
//             href="/improve"
//             className="px-6 py-3 bg-[#015F4A] text-white font-medium rounded-lg hover:bg-[#013F3A] transition-colors duration-300"
//           >
//             Show More
//           </Link>
//         </div>
//       </div>
//     </motion.section>
//   );
// };

// export default TherapyImprovementsSection;


'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { therapyImprovements, sectionVariants, containerVariants } from './therapyData';
import TherapyCard from './TherapyCard';
import ScrollIndicators from './ScrollIndicators';
import ShowMoreButton from './ShowMoreButton';
import type { TherapyImprovement } from '../../../types/types';

const TherapyImprovementsSection: React.FC = () => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const handleImageLoad = (imageSrc: string) => {
    setLoadedImages((prev) => new Set(prev).add(imageSrc));
  };

  // Fallback if therapyImprovements is not available
  if (!therapyImprovements || !Array.isArray(therapyImprovements)) {
    console.error('therapyImprovements is not defined or not an array');
    return null; // Or render a fallback UI
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
            className="flex flex-row overflow-x-auto md:grid md:grid-cols-4 gap-6 snap-x snap-mandatory pb-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {therapyImprovements.map((item: TherapyImprovement, index: number) => (
              <TherapyCard
                key={item.title}
                item={item}
                index={index}
                isImageLoaded={loadedImages.has(item.bgImage)}
                onImageLoad={handleImageLoad}
              />
            ))}
          </motion.div>
          <ScrollIndicators />
        </div>
        <ShowMoreButton />
      </div>
    </motion.section>
  );
};

export default TherapyImprovementsSection;