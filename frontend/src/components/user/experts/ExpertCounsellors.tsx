


'use client';

import React from 'react';
import { useCounsellors } from '@/components/hooks/useCounsellors';
import LoadingState from '@/components/loading/LoadingSpinner';
import ErrorState from './ErrorState';
import EmptyState from './EmptyState';
import CounsellorGrid from './CounsellorGrid';
import ShowMoreButton from './ShowMoreButton';

const ExpertCounsellorsComponent: React.FC = () => {
  const { consultants, loading, error } = useCounsellors();
  const itemsPerPage = 3;

  const displayedConsultants = consultants.slice(0, itemsPerPage);

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-emerald-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading && <LoadingState />}
        {error && <ErrorState error={error} />}
        
        {!loading && !error && consultants.length > 0 && (
          <>
            <div className="mb-8">
              <CounsellorGrid consultants={displayedConsultants} />
            </div>
            
            <ShowMoreButton 
              totalCount={consultants.length} 
              currentCount={itemsPerPage} 
            />
          </>
        )}

        {!loading && !error && consultants.length === 0 && <EmptyState />}
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ExpertCounsellorsComponent;