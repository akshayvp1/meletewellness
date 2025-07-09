import React from 'react';
import Link from 'next/link';

const ShowMoreButton: React.FC = () => (
  <div className="flex justify-center mt-8" role="navigation">
    <Link
      href="/improve"
      className="px-6 py-3 bg-[#015F4A] text-white font-medium rounded-lg hover:bg-[#013F3A] transition-colors duration-300"
    >
      Show More
    </Link>
  </div>
);

export default ShowMoreButton;