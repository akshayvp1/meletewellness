import { Star, Brain, AlertTriangle, Frown } from 'lucide-react';
import { Variants } from 'framer-motion';
import { TherapyImprovement } from '../../../types/types';
import selfconfidence from '@/../../public/assets/Self-Confidence.webp';
import stress from '@/../../public/assets/stress.webp';
import anxiety from '@/../../public/assets/Anxiety.webp';
import depression from '@/../../public/assets/Depression.webp';

export const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: 'easeOut' } },
};

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, rotate: -5 },
  visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.7 } },
  hover: {
    scale: 1.05,
    boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
    transition: { duration: 0.3 },
  },
};

export const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Star,
  Brain,
  AlertTriangle,
  Frown,
};

export const therapyImprovements: TherapyImprovement[] = [
  {
    title: 'Self Confidence',
    desc: 'Self-confidence means believing in yourself and your abilities. It is about trusting your own decisions, knowing your strengths and weaknesses, and feeling in control of your life.',
    icon: 'Star',
    bgImage: selfconfidence.src,
  },
  {
    title: 'Stress',
    desc: 'Psychological stress is the way our mind and body respond to pressure or challenges, whether they come from inside us or from the world around us. It happens when we feel off balance or overwhelmed.',
    icon: 'Brain',
    bgImage: stress.src,
  },
  {
    title: 'Anxiety',
    desc: 'Anxiety is a common emotion, and it can cause physical symptoms, such as shaking and sweating. When anxiety becomes persistent or excessive, a person may have an anxiety disorder.',
    icon: 'AlertTriangle',
    bgImage: anxiety.src,
  },
  {
    title: 'Depression',
    desc: 'Depression is a common and serious mental disorder that negatively affects how you feel, think, act, and perceive the world.',
    icon: 'Frown',
    bgImage: depression.src,
  },
];