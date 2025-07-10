import React from 'react';

interface ResultsInfoProps {
  startIndex: number;
  endIndex: number;
  totalCount: number;
}

const ResultsInfo: React.FC<ResultsInfoProps> = ({ startIndex, endIndex, totalCount }) => {
  return (
    <div className="mb-6 text-center">
      <p className="text-gray-600">
        Showing {startIndex + 1}-{Math.min(endIndex, totalCount)} of {totalCount} counsellors
      </p>
    </div>
  );
};

export default ResultsInfo;