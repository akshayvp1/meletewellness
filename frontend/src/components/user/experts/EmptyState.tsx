import React from 'react';

const EmptyState: React.FC = () => {
  return (
    <div className="text-center py-12">
      <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
        <div className="text-gray-400 text-4xl mb-4">🧠</div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">No Counsellors Available</h3>
        <p className="text-gray-600">Please check back later for available professionals.</p>
      </div>
    </div>
  );
};

export default EmptyState;