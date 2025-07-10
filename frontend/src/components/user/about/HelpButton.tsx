import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  icon
}) => {
  const baseClasses = 'inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#015F4A] text-white font-medium rounded-lg hover:bg-[#014A3B] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#015F4A] focus:ring-offset-2 shadow-lg hover:shadow-xl group';
  
  const disabledClasses = disabled 
    ? 'opacity-50 cursor-not-allowed hover:bg-[#015F4A]' 
    : '';
  
  const classes = `${baseClasses} ${disabledClasses} ${className}`;
  
  const content = (
    <>
      <span>{children}</span>
      {icon && icon}
    </>
  );
  
  if (href && !disabled) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {content}
    </button>
  );
};

export default Button;