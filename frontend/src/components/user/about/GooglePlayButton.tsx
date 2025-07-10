import React from 'react';

interface GooglePlayButtonProps {
  href?: string;
  className?: string;
}

const GooglePlayButton: React.FC<GooglePlayButtonProps> = ({ 
  href = "https://play.google.com/store", 
  className = "" 
}) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={`group bg-gray-900 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-gray-800 transition-all duration-300 flex items-center justify-center ${className}`}
    >
      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
      </svg>
      <div className="text-left">
        <div className="text-xs text-gray-300">GET IT ON</div>
        <div className="text-sm font-semibold">Google Play</div>
      </div>
    </a>
  );
};

export default GooglePlayButton;