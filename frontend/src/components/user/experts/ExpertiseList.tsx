import React from 'react';
import { GraduationCap } from 'lucide-react';

interface ExpertiseListProps {
  expertise: string[];
}

const ExpertiseList: React.FC<ExpertiseListProps> = ({ expertise }) => {
  const [expandedExpertise, setExpandedExpertise] = React.useState(false);

  return (
    <div className="mb-4 flex-shrink-0">
      <h4 className="text-xs font-bold text-gray-700 mb-2 flex items-center">
        <GraduationCap className="w-3 h-3 mr-1 text-[#015F4A]" />
        SPECIALIZATIONS
      </h4>
      <div className="flex flex-wrap gap-1">
        {(expandedExpertise ? expertise : expertise.slice(0, 3)).map((skill, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-[#015F4A]/5 text-[#015F4A] text-xs font-medium rounded border border-[#015F4A]/20"
          >
            {skill}
          </span>
        ))}
        {expertise.length > 3 && !expandedExpertise && (
          <button
            onClick={() => setExpandedExpertise(true)}
            className="px-2 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded border border-gray-200 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
          >
            +{expertise.length - 3}
          </button>
        )}
        {expertise.length > 3 && expandedExpertise && (
          <button
            onClick={() => setExpandedExpertise(false)}
            className="px-2 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded border border-gray-200 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
          >
            Show less
          </button>
        )}
      </div>
    </div>
  );
};

export default ExpertiseList;