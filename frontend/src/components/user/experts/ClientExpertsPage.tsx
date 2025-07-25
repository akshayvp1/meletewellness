'use client';

import React, { useState } from 'react';
import { useCounsellors } from '@/components/hooks/useCounsellors';
import HeroSection from '@/components/user/experts/HeroSection';
import CounsellorContent from '@/components/user/experts/CounsellorContent';


const ExpertCounsellorsPage: React.FC = () => {
  const { consultants, loading, error, totalCount } = useCounsellors();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-10">
        <HeroSection totalCount={totalCount} />
        <CounsellorContent 
          consultants={consultants}
          loading={loading}
          error={error}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default ExpertCounsellorsPage;
