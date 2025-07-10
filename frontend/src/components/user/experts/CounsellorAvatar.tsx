import React from 'react';
import { CheckCircle } from 'lucide-react';

interface CounsellorAvatarProps {
  image: string;
  name: string;
}

const CounsellorAvatar: React.FC<CounsellorAvatarProps> = ({ image, name }) => {
  return (
    <div className="relative bg-white p-5 border-b border-gray-50 flex-shrink-0">
      <div className="absolute top-3 right-3 flex items-center bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
        <CheckCircle className="w-3 h-3 mr-1" />
        Verified
      </div>
      
      <div className="text-center">
        <div className="relative inline-block mb-4">
          <img
            src={image}
            alt={`${name}`}
            className="w-32 h-32 rounded-full object-cover border-3 border-white shadow-xl ring-4 ring-[#015F4A]/10"
          />
          <div className="absolute -bottom-2 -right-2 bg-[#015F4A] w-6 h-6 rounded-full border-3 border-white flex items-center justify-center shadow-lg">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounsellorAvatar;