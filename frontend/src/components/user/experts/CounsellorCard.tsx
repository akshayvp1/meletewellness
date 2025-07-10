import React from 'react';
import { Consultant } from '@/types/types';
import CounsellorAvatar from './CounsellorAvatar';
import CounsellorInfo from './CounsellorInfo';
import ExpertiseList from './ExpertiseList';
import CounsellorDetails from './CounsellorDetails';
// import BookingButton from './BookingButton';

interface CounsellorCardProps {
  consultant: Consultant;
}

const CounsellorCard: React.FC<CounsellorCardProps> = ({ consultant }) => {
  return (
    <div className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden flex-shrink-0 w-full sm:w-auto h-[610px] flex flex-col">
      <CounsellorAvatar image={consultant.image} name={consultant.name} />
      
      <div className="p-4 flex-1 flex flex-col">
        <CounsellorInfo 
          name={consultant.name}
          qualification={consultant.qualification}
          experience={consultant.experience}
        />
        
        <ExpertiseList expertise={consultant.expertise} />
        
        <CounsellorDetails
          languages={consultant.languages}
          counsellingTypes={consultant.counsellingTypes}
          specialization={consultant.specialization}
          location={consultant.location}
        />
        
        {/* <BookingButton consultant={consultant} /> */}
      </div>
    </div>
  );
};

export default CounsellorCard;