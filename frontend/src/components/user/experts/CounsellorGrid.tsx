import React from 'react';
import { Consultant } from '@/types/types';
import CounsellorCard from './CounsellorCard';

interface CounsellorGridProps {
  consultants: Consultant[];
}

const CounsellorGrid: React.FC<CounsellorGridProps> = ({ consultants }) => {
  return (
    <>
      {/* Mobile horizontal scroll */}
      {/* <div className="sm:hidden">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
          <div className="flex gap-4 px-2">
            {consultants.map((consultant: Consultant) => (
              <div key={consultant.id} className="w-80 snap-center">
                <CounsellorCard consultant={consultant} />
              </div>
            ))}
          </div>
        </div>
      </div> */}


<div className="sm:hidden">
        <div className="flex flex-col gap-4 px-2">
          {consultants.map((consultant: Consultant) => (
            <div key={consultant.id} className="w-full">
              <CounsellorCard consultant={consultant} />
            </div>
          ))}
        </div>
      </div>



      {/* Desktop grid */}
      <div className="hidden sm:grid grid-cols-3 gap-6">
        {consultants.map((consultant: Consultant) => (
          <CounsellorCard key={consultant.id} consultant={consultant} />
        ))}
      </div>
    </>
  );
};

export default CounsellorGrid;