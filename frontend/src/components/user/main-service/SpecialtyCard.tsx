import React from 'react';
import { LucideIcon } from 'lucide-react';
import { StaticImageData } from 'next/image';

interface Specialty {
  icon: LucideIcon;
  title: string;
  description: string;
  image: StaticImageData; // Changed from string to StaticImageData
  alt: string;
}

interface SpecialtyCardProps {
  specialty: Specialty;
}

const SpecialtyCard: React.FC<SpecialtyCardProps> = ({ specialty }) => {
  const { icon: Icon, title, description, image, alt } = specialty;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-[#015F4A]/10 rounded-full flex items-center justify-center mb-4">
          <Icon className="w-8 h-8 text-[#015F4A]" />
        </div>
        <div className="w-full h-32 mb-4 rounded-lg overflow-hidden">
          <img 
            src={image.src} // Use .src property for StaticImageData
            alt={alt}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default SpecialtyCard;