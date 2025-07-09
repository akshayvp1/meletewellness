import React from 'react';

interface VisionMissionCardProps {
  title: string;
  content: string;
}

const VisionMissionCard: React.FC<VisionMissionCardProps> = ({ title, content }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border-l-4 border-[#015F4A]">
      <h3 className="text-xl font-semibold text-[#015F4A] mb-3">{title}</h3>
      <p className="text-gray-700 leading-relaxed">{content}</p>
    </div>
  );
};

export default VisionMissionCard;