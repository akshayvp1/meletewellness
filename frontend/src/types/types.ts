
import { ReactNode } from 'react';
import { StaticImageData } from 'next/image';

export interface Consultant {
  id: string; // Use `id` instead of `_id` for consistency
  name: string;
  qualification: string;
  expertise: string[];
  languages: string[];
  counsellingTypes: string[]; // Changed from `counseling` to `counsellingTypes`
  experience: number;
  location: string;
  image: string;
  bio: string;
  email: string;
  phone: string;
  specialization: string;
  rating: number;
  sessions: number;
  isBlocked: boolean;
  isVerified?: boolean; // Optional to avoid errors if not provided
  createdAt?: string; // Optional to avoid errors if not provided
}

// Other interfaces remain unchanged
export interface Certificate {
  recipientName: string;
  certificateTitle: string;
  issueDate: string;
  issuer: string;
  certificateImage?: string;
  certificateUrl?: string;
}

export interface TherapyImprovement {
  title: string;
  desc: string;
  icon: string;
  bgImage: string;
}

export interface Book {
  title: string;
  desc: string;
  image: string;
}

export interface NavItem {
  name: string;
  items?: string[];
  href?: string;
}

export interface FormData {
  name: string;
  email: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}







// types/main-service.ts
export interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Specialty {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  title: string;
  description: string;
  image: StaticImageData; // Changed from string to StaticImageData
  alt: string;
}

export interface CategoryImage {
  students: string;
  professionals: string;
  institutions: string;
}





//types/about.ts
import { LucideIcon } from 'lucide-react';

export interface ReasonItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface SpecialtyItem {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  alt: string;
}

export interface FeatureItem {
  text: string;
}






//improve


export interface TherapyImprovement {
  title: string;
  desc: string;
  icon: string;
  bgImage: string;
}