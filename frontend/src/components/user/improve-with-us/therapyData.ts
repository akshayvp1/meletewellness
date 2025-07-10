import { TherapyImprovement } from '@/types/types';
import SelfImage from '@/../public/assets/Self-Confidence.webp';
import StressImage from '@/../public/assets/stress.webp';
import AnxietyImage from '@/../public/assets/Anxiety.webp';
import DepressionImage from '@/../public/assets/Depression.webp';
import SleepImage from '@/../public/assets/Sleep-hygine.webp';
import UnhealthyImage from '@/../public/assets/Worklife-balance.webp';
import LackImage from '@/../public/assets/Lack-of-Physical-activity.webp';
import Substance from '@/../public/assets/Substance-abuse.webp';
import WorkImage from '@/../public/assets/Worklife-balance.webp';
import SocialImage from '@/../public/assets/Social-connection.webp';
import DigitalImage from '@/../public/assets/Digital-overloaded.webp';
import GoalImage from '@/../public/assets/Goal-direction.webp';
import EmotionalImage from '@/../public/assets/Emotional-need.webp';
import RelationshipImage from '@/../public/assets/Relationship.webp';

export const therapyImprovements: TherapyImprovement[] = [
  {
    title: 'Self Confidence',
    desc: 'Self-confidence means believing in yourself and your abilities. It is about trusting your own decisions, knowing your strengths and weaknesses, and feeling in control of your life.',
    icon: 'Star',
    bgImage: SelfImage.src,
  },
  {
    title: 'Stress',
    desc: 'Psychological stress is the way our mind and body respond to pressure or challenges, whether they come from inside us or from the world around us. It happens when we feel off balance or overwhelmed.',
    icon: 'Brain',
    bgImage: StressImage.src,
  },
  {
    title: 'Anxiety',
    desc: 'Anxiety is a common emotion, and it can cause physical symptoms, such as shaking and sweating. When anxiety becomes persistent or excessive, a person may have an anxiety disorder.',
    icon: 'AlertTriangle',
    bgImage: AnxietyImage.src,
  },
  {
    title: 'Depression',
    desc: 'Depression is a common and serious mental disorder that negatively affects how you feel, think, act, and perceive the world.',
    icon: 'Frown',
    bgImage: DepressionImage.src,
  },
  {
    title: 'Sleep Hygiene',
    desc: 'Sleep hygiene means having good habits and routines that help you sleep well. It includes things like going to bed at the same time each night, keeping your bedroom quiet and comfortable, and avoiding screens or caffeine before bed.',
    icon: 'Bed',
    bgImage: SleepImage.src,
  },
  {
    title: 'Unhealthy Diet',
    desc: 'An unhealthy diet is when someone eats too many foods that are high in calories, sugar, unhealthy fats, and salt, but low in important nutrients like vitamins, minerals, and fiber.',
    icon: 'Apple',
    bgImage: UnhealthyImage.src,
  },
  {
    title: 'Lack of Physical Activity',
    desc: 'Lack of physical activity, or physical inactivity, refers to not engaging in enough moderate to vigorous exercise to support good health.',
    icon: 'Dumbbell',
    bgImage: LackImage.src,
  },
  {
    title: 'Substance Abuse',
    desc: 'The use of illegal drugs or the use of prescription or over-the-counter drugs or alcohol for purposes other than those for which they are meant to be used, or in excessive amounts.',
    icon: 'Award',
    bgImage: Substance.src,
  },
  {
    title: 'Work Life Balance',
    desc: 'Work-life balance means finding a healthy mix between your job and personal life. It is about managing your time and energy so you can do your work, take care of your personal responsibilities, and still have time to rest and enjoy life.',
    icon: 'Clock',
    bgImage: WorkImage.src,
  },
  {
    title: 'Social Connection',
    desc: 'Social connection refers to the quality and quantity of relationships we have with others, encompassing a feeling of belonging and being cared for. It is a fundamental human need, crucial for well-being and even physical health.',
    icon: 'Users',
    bgImage: SocialImage.src,
  },
  {
    title: 'Digital Overload',
    desc: 'Digital overload describes the feeling of being overwhelmed by the vast amount of digital information and interactions we encounter daily.',
    icon: 'Monitor',
    bgImage: DigitalImage.src,
  },
  {
    title: 'Goal Direction',
    desc: 'Goal direction means having a clear purpose and working toward it. It is about planning your actions and making choices that help you reach a specific goal.',
    icon: 'Target',
    bgImage: GoalImage.src,
  },
  {
    title: 'Emotional Need',
    desc: 'Emotional needs are the feelings and support we need to feel happy and fulfilled. When these needs are met, we feel good about ourselves and our lives. If they are not met, we might feel sad, frustrated, or lonely.',
    icon: 'Heart',
    bgImage: EmotionalImage.src,
  },
  {
    title: 'Relationship',
    desc: 'Relationships play a crucial role in human well-being and personal growth, making them an essential part of our lives.',
    icon: 'HeartHandshake',
    bgImage: RelationshipImage.src,
  },
];