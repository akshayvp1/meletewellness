import React from 'react';
import Link from 'next/link';

interface SecondaryButtonProps {
  href?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ 
  href, 
  children, 
  icon, 
  className = '',
  target,
  rel,
  onClick
}) => {
  const baseClasses = "group px-8 py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center border-2 border-gray-200 text-gray-700 hover:bg-gray-50";

  const buttonContent = (
    <>
      {children}
      {icon && <span className="ml-3">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link 
        href={href} 
        className={`${baseClasses} ${className}`}
        target={target}
        rel={rel}
      >
        {buttonContent}
      </Link>
    );
  }

  return (
    <button 
      className={`${baseClasses} ${className}`}
      onClick={onClick}
    >
      {buttonContent}
    </button>
  );
};

export default SecondaryButton;