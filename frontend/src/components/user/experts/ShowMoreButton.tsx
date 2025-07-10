import React from 'react';
import Link from 'next/link';

interface ShowMoreButtonProps {
  totalCount: number;
  currentCount: number;
}

const ShowMoreButton: React.FC<ShowMoreButtonProps> = ({ totalCount, currentCount }) => {
  if (totalCount <= currentCount) return null;

  return (
    <div className="flex justify-center mt-8">
      <Link
        href="/user/experts"
        className="px-6 py-3 bg-[#015F4A] text-white font-medium rounded-lg hover:bg-[#013F3A] transition-colors duration-300"
      >
        Show More
      </Link>
    </div>
  );
};

export default ShowMoreButton;
