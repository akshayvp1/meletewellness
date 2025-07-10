import React from 'react';
import { Award } from 'lucide-react';

interface CounsellorInfoProps {
  name: string;
  qualification: string;
  experience?: number;
}

const CounsellorInfo: React.FC<CounsellorInfoProps> = ({ name, qualification, experience }) => {
  return (
    <div className="text-center">
      <h3 className="text-lg font-bold text-gray-900 mb-1">{name}</h3>
      <p className="text-[#015F4A] font-medium text-xs mb-2">{qualification}</p>
      
      {experience !== undefined && experience > 0 && (
        <div className="inline-flex items-center bg-[#015F4A]/5 border border-[#015F4A]/20 rounded-full px-3 py-1 mb-2">
          <Award className="w-3 h-3 text-[#015F4A] mr-1" />
          <span className="text-[#015F4A] font-medium text-xs">{experience}+ years</span>
        </div>
      )}
    </div>
  );
};

export default CounsellorInfo;