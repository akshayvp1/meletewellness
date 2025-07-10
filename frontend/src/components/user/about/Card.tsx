import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
  const hoverClasses = hover ? 'hover:bg-white hover:border-[#015F4A]/20 hover:shadow-lg' : '';
  
  return (
    <div className={`bg-gray-50 rounded-xl p-8 border border-gray-100 transition-all duration-300 ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Card;