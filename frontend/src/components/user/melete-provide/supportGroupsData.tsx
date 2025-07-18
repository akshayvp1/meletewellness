"use client"
import {
  User,
  Users,
  Heart,
  Baby,
  UserCheck,
} from "lucide-react";
import { SupportGroup } from '@/types/types';

// Import your images here
import ChildImage from "@/../../public/assets/child.webp";
import AdultImage from "@/../../public/assets/adult.webp";
import ParentImage from "@/../../public/assets/parent.webp";
import PregnantImage from "@/../../public/assets/pregnant.webp";
import OldageImage from "@/../../public/assets/oldage.webp";

export const supportGroupsData: SupportGroup[] = [
  {
    id: "child",
    title: "Child Support",
    description:
      "Specialized mental health care for children, focusing on emotional development, behavioral guidance, and creating a safe space for young minds to flourish.",
    image: ChildImage.src,
    icon: Baby,
    features: [
      "Play Therapy",
      "Behavioral Support",
      "Emotional Regulation",
      "Social Skills Training",
    ],
    color: "from-pink-500 to-rose-400",
    path: "/user/child-support",
  },
  {
    id: "parent",
    title: "Parent Support",
    description:
      "Comprehensive guidance for parents navigating parenting challenges, family dynamics, and building stronger relationships with their children.",
    image: ParentImage.src,
    icon: Users,
    features: [
      "Parenting Skills",
      "Family Counseling",
      "Stress Management",
      "Communication Training",
    ],
    color: "from-emerald-500 to-teal-400",
    path: "/user/parent-support",
  },
  {
    id: "adult",
    title: "Adult Support",
    description:
      "Professional mental health services for adults dealing with work stress, relationships, anxiety, depression, and life transitions.",
    image: AdultImage.src,
    icon: User,
    features: [
      "Individual Therapy",
      "Stress Counseling",
      "Relationship Support",
      "Career Guidance",
    ],
    color: "from-blue-500 to-cyan-400",
    path: "/user/adult-support",
  },
  {
    id: "pregnant",
    title: "Pregnancy Support",
    description:
      "Specialized mental health care for expecting mothers, addressing prenatal anxiety, mood changes, and preparing for motherhood.",
    image: PregnantImage.src,
    icon: Heart,
    features: [
      "Prenatal Counseling",
      "Anxiety Management",
      "Postpartum Preparation",
      "Partner Support",
    ],
    color: "from-purple-500 to-violet-400",
    path: "/user/pregnancy-support",
  },
  {
    id: "oldage",
    title: "Senior Support",
    description:
      "Dedicated mental health services for older adults, focusing on aging gracefully, cognitive health, and maintaining emotional well-being.",
    image: OldageImage.src,
    icon: UserCheck,
    features: [
      "Cognitive Support",
      "Loneliness Prevention",
      "Health Adaptation",
      "Memory Care",
    ],
    color: "from-amber-500 to-orange-400",
    path: "/user/oldage-support",
  },
];