import React from 'react';
import { Consultant } from '@/types/types';

interface BookingButtonProps {
  consultant: Consultant;
}

const BookingButton: React.FC<BookingButtonProps> = ({ consultant }) => {
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
    <button
      onClick={handleBookSession}
      className="w-full bg-[#015F4A] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#013F3A] transition-colors duration-300 mt-4"
    >
      Book Session
    </button>
  );
};

export default BookingButton;