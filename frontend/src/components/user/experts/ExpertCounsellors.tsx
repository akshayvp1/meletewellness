'use client';

import React from 'react';
import { Star, Users, Clock, MapPin, MessageCircle, Award, Heart, Shield, CheckCircle, GraduationCap } from 'lucide-react';
import { useCounsellors } from '@/components/hooks/useCounsellors'; // Adjust path to the new hook
import { Consultant } from '../../../types/types'; // Import the unified Consultant interface
import Link from 'next/link'; // Import Link for navigation

// CounsellorCard Component
interface CounsellorCardProps {
  consultant: Consultant;
}

const CounsellorCard: React.FC<CounsellorCardProps> = ({ consultant }) => {
  const [expandedExpertise, setExpandedExpertise] = React.useState(false);

  const handleBookSession = (): void => {
    const phoneNumber = '+918943175522';
    const expertise = Array.isArray(consultant.expertise) ? consultant.expertise.join(', ') : consultant.expertise || 'General Counseling';
    const languages = Array.isArray(consultant.languages) ? consultant.languages.join(', ') : consultant.languages || 'English';
    const counsellingTypes = Array.isArray(consultant.counsellingTypes) ? consultant.counsellingTypes.join(', ') : consultant.counsellingTypes || 'Individual Counseling';
    
    const experienceText = consultant.experience !== undefined && consultant.experience > 0 
      ? `\n- Experience: ${consultant.experience}+ years` 
      : '';
    
    const message = `Hello, I'm interested in booking a session with ${consultant.name}.\n\nDetails:\n- Qualification: ${consultant.qualification || 'Professional Counselor'}\n- Expertise: ${expertise}\n- Languages: ${languages}\n- Counseling: ${counsellingTypes}${experienceText}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden flex-shrink-0 w-full sm:w-auto h-[610px] flex flex-col">
      <div className="relative bg-white p-5 border-b border-gray-50 flex-shrink-0">
        <div className="absolute top-3 right-3 flex items-center bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
          <CheckCircle className="w-3 h-3 mr-1" />
          Verified
        </div>
        
        <div className="text-center">
          <div className="relative inline-block mb-4">
            <img
              src={consultant.image}
              alt={`${consultant.name}`}
              className="w-32 h-32 rounded-full object-cover border-3 border-white shadow-xl ring-4 ring-[#015F4A]/10"
            />
            <div className="absolute -bottom-2 -right-2 bg-[#015F4A] w-6 h-6 rounded-full border-3 border-white flex items-center justify-center shadow-lg">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 mb-1">{consultant.name}</h3>
          <p className="text-[#015F4A] font-medium text-xs mb-2">{consultant.qualification}</p>
          
          {consultant.experience !== undefined && consultant.experience > 0 && (
            <div className="inline-flex items-center bg-[#015F4A]/5 border border-[#015F4A]/20 rounded-full px-3 py-1 mb-2">
              <Award className="w-3 h-3 text-[#015F4A] mr-1" />
              <span className="text-[#015F4A] font-medium text-xs">{consultant.experience}+ years</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="mb-4 flex-shrink-0">
          <h4 className="text-xs font-bold text-gray-700 mb-2 flex items-center">
            <GraduationCap className="w-3 h-3 mr-1 text-[#015F4A]" />
            SPECIALIZATIONS
          </h4>
          <div className="flex flex-wrap gap-1">
            {(expandedExpertise ? consultant.expertise : consultant.expertise.slice(0, 3)).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-[#015F4A]/5 text-[#015F4A] text-xs font-medium rounded border border-[#015F4A]/20"
              >
                {skill}
              </span>
            ))}
            {consultant.expertise.length > 3 && !expandedExpertise && (
              <button
                onClick={() => setExpandedExpertise(true)}
                className="px-2 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded border border-gray-200 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              >
                +{consultant.expertise.length - 3}
              </button>
            )}
            {consultant.expertise.length > 3 && expandedExpertise && (
              <button
                onClick={() => setExpandedExpertise(false)}
                className="px-2 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded border border-gray-200 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              >
                Show less
              </button>
            )}
          </div>
        </div>

        <div className="space-y-2 flex-1">
          <div className="border-l-2 border-[#015F4A] pl-2">
            <span className="text-xs font-medium text-gray-500 uppercase">Languages</span>
            <p className="text-xs text-gray-800 font-medium">{consultant.languages.join(' • ') || 'N/A'}</p>
          </div>
          
          <div className="border-l-2 border-[#015F4A] pl-2">
            <span className="text-xs font-medium text-gray-500 uppercase">Approaches</span>
            <p className="text-xs text-gray-800 font-medium">{consultant.counsellingTypes.join(' • ') || 'N/A'}</p>
          </div>
          
          {consultant.specialization && (
            <div className="border-l-2 border-[#015F4A] pl-2">
              <span className="text-xs font-medium text-gray-500 uppercase">Focus</span>
              <p className="text-xs text-gray-800 font-medium">{consultant.specialization}</p>
            </div>
          )}
          
          {consultant.location && (
            <div className="border-l-2 border-[#015F4A] pl-2">
              <span className="text-xs font-medium text-gray-500 uppercase">Location</span>
              <p className="text-xs text-gray-800 font-medium">{consultant.location}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Component
const ExpertCounsellorsComponent: React.FC = () => {
  const { consultants, loading, error } = useCounsellors();
  const itemsPerPage = 3;

  const getDisplayedConsultants = () => {
    return consultants.slice(0, itemsPerPage);
  };

  const displayedConsultants = getDisplayedConsultants();

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-emerald-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-t-[#015F4A] border-gray-200 rounded-full animate-spin mb-4" />
            <p className="text-gray-700 text-base">Loading counsellors...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <div className="text-red-500 text-3xl mb-3">⚠️</div>
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && consultants.length > 0 && (
          <>
            <div className="mb-8">
              <div className="sm:hidden">
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
                  <div className="flex gap-4 px-2">
                    {displayedConsultants.map((consultant: Consultant, index) => (
                      <div key={consultant.id} className="w-80 snap-center">
                        <CounsellorCard consultant={consultant} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="hidden sm:grid grid-cols-3 gap-6">
                {displayedConsultants.map((consultant: Consultant) => (
                  <CounsellorCard key={consultant.id} consultant={consultant} />
                ))}
              </div>
            </div>

            {consultants.length > itemsPerPage && (
              <div className="flex justify-center mt-8">
                <Link
                  href="/experts"
                  className="px-6 py-3 bg-[#015F4A] text-white font-medium rounded-lg hover:bg-[#013F3A] transition-colors duration-300"
                >
                  Show More
                </Link>
              </div>
            )}
          </>
        )}

        {!loading && !error && consultants.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
              <div className="text-gray-400 text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">No Counsellors Available</h3>
              <p className="text-gray-600">Please check back later for available professionals.</p>
            </div>
          </div>
        )}
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