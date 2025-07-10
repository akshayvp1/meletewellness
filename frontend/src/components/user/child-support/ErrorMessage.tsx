"use client";

import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="text-center py-12">
      <p className="text-red-600 mb-4">Error: {message}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="px-6 py-2 bg-[#015F4A] text-white rounded-lg hover:bg-[#014136] transition-colors"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;