import React from 'react';

interface CounsellorDetailsProps {
  languages: string[];
  counsellingTypes: string[];
  specialization?: string;
  location?: string;
}

const CounsellorDetails: React.FC<CounsellorDetailsProps> = ({
  languages,
  counsellingTypes,
  specialization,
  location
}) => {
  return (
    <div className="space-y-2 flex-1">
      <div className="border-l-2 border-[#015F4A] pl-2">
        <span className="text-xs font-medium text-gray-500 uppercase">Languages</span>
        <p className="text-xs text-gray-800 font-medium">{languages.join(' • ') || 'N/A'}</p>
      </div>
      
      <div className="border-l-2 border-[#015F4A] pl-2">
        <span className="text-xs font-medium text-gray-500 uppercase">Approaches</span>
        <p className="text-xs text-gray-800 font-medium">{counsellingTypes.join(' • ') || 'N/A'}</p>
      </div>
      
      {specialization && (
        <div className="border-l-2 border-[#015F4A] pl-2">
          <span className="text-xs font-medium text-gray-500 uppercase">Focus</span>
          <p className="text-xs text-gray-800 font-medium">{specialization}</p>
        </div>
      )}
      
      {location && (
        <div className="border-l-2 border-[#015F4A] pl-2">
          <span className="text-xs font-medium text-gray-500 uppercase">Location</span>
          <p className="text-xs text-gray-800 font-medium">{location}</p>
        </div>
      )}
    </div>
  );
};

export default CounsellorDetails;