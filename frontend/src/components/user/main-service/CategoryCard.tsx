import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  image: string;
  icon: LucideIcon;
  title: string;
  description: string;
  alt: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  image, 
  icon: Icon, 
  title, 
  description, 
  alt 
}) => {
  return (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={alt} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center mb-4">
          <Icon className="w-8 h-8 text-[#015F4A] mr-3" />
          <h3 className="text-xl font-bold text-[#015F4A]">{title}</h3>
        </div>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default CategoryCard;
