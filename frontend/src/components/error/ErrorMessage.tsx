import React from 'react';

interface ErrorStateProps {
  error: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  return (
    <div className="text-center py-12">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
        <div className="text-red-500 text-3xl mb-3">⚠️</div>
        <p className="text-red-800 font-medium">{error}</p>
      </div>
    </div>
  );
};

export default ErrorState;