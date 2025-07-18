
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


interface CounsellorsApiResponse {
  counsellors: Consultant[];
  totalCount: number;
}





//college interface



export interface ICollege{
 _id: string;
  collegeName: string; // Changed from 'name' to 'collegeName' to match your usage
  mobile?: string; // Optional, as it may not always be present
  email?: string; // Optional
  isActive?: boolean; // Optional
  createdAt?: Date; // Optional
  expiresAt?: Date; // <- optional expiration field
}




//adminuser

export interface IAdminUser{
  _id:string,
  name: string;
  phoneNumber: string;
  email: string;
  age:number;
  college:string;
  isActive: boolean;
  createdAt: Date;
  expiresAt?: Date; // <- optional expiration field
}








//improve


export interface SupportGroup {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
  features: string[];
  color: string;
  path: string;
}

export interface SupportGroupCardProps {
  group: SupportGroup;
  index: number;
  isVisible: boolean;
  onClick: (group: SupportGroup) => void;
}

export interface MobileCarouselProps {
  groups: SupportGroup[];
  currentSlide: number;
  onServiceClick: (group: SupportGroup) => void;
  swipeHandlers: {
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
    onTouchEnd: () => void;
  };
}

export interface DesktopGridProps {
  groups: SupportGroup[];
  isVisible: boolean;
  onServiceClick: (group: SupportGroup) => void;
}