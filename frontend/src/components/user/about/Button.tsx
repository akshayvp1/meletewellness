import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  href, 
  children, 
  variant = 'primary', 
  icon, 
  className = '',
  target,
  rel
}) => {
  const baseClasses = "px-8 py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center";
  const variantClasses = {
    primary: "group bg-[#015F4A] text-white hover:bg-[#014539] shadow-lg hover:shadow-xl",
    secondary: "group border-2 border-gray-200 text-gray-700 hover:bg-gray-50"
  };

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
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        target={target}
        rel={rel}
      >
        {buttonContent}
      </Link>
    );
  }

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {buttonContent}
    </button>
  );
};

export default Button;