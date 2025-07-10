import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, icon, className = '' }) => {
  return (
    <div className={`inline-flex items-center px-4 py-2 bg-[#015F4A]/10 rounded-full text-[#015F4A] font-medium ${className}`}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </div>
  );
};

export default Badge;