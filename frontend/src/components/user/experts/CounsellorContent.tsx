
import React from 'react';
import LoadingState from '@/components/user/child-support/LoadingSpinner';
import ErrorState from '@/components/user/experts/ErrorState';
import EmptyState from '@/components/user/experts/EmptyState';
import CounsellorGrid from '@/components/user/experts/CounsellorGrid';
import Pagination from '@/components/user/experts/Pagination';
import ResultsInfo from '@/components/user/experts/ResultsInfo';
import { Consultant } from '@/types/types';

interface CounsellorContentProps {
  consultants: Consultant[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const CounsellorContent: React.FC<CounsellorContentProps> = ({
  consultants,
  loading,
  error,
  currentPage,
  onPageChange
}) => {
  const itemsPerPage = 9;
  const totalPages = Math.ceil(consultants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentConsultants = consultants.slice(startIndex, endIndex);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (consultants.length === 0) return <EmptyState />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <ResultsInfo 
        startIndex={startIndex} 
        endIndex={endIndex} 
        totalCount={consultants.length} 
      />
      
      <div className="mb-8">
        <CounsellorGrid consultants={currentConsultants} />
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default CounsellorContent;