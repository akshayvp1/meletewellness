import React from 'react';
import { LucideIcon } from 'lucide-react';

interface BadgeProps {
  icon: LucideIcon;
  text: string;
}

const Badge: React.FC<BadgeProps> = ({ icon: Icon, text }) => {
  return (
    <div className="flex items-center bg-gray-50 px-4 py-2 rounded-full">
      <Icon className="w-5 h-5 mr-2 text-[#015F4A]" />
      <span className="text-gray-700">{text}</span>
    </div>
  );
};

export default Badge;