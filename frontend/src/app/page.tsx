

"use client";
import React, { useCallback } from 'react';
import Improve from "@/components/user/melete-provide/meleteProvide";
import TherapyImprovementsSection from "@/components/user/improve-with-us/TherapyImprovementsSection";
import Experts from "@/components/user/experts/ExpertCounsellors"
import WhatWeOffer from '@/components/user/service/what-we-offer';
import SessionPlans from '@/components/user/service/session-plans';
import SupportSubscription from '@/app/user/support-subscription/MentalHealthCTA';


const CONTACT_CONFIG = {
  phoneNumber: '+918943175522',
  defaultMessage: 'Hello, I would like to know more about your services.',
  whatsappIconUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg',
} as const;

const LAYOUT_CONFIG = {
  navbarHeight: 'pt-16', // Adjust based on actual Navbar height
  whatsappIconSize: 'w-12 h-12',
} as const;

const Home: React.FC = () => {
  /**
   * Handles WhatsApp contact button click
   * Opens WhatsApp with pre-filled message in a new tab
   */
  const handleWhatsAppClick = useCallback(() => {
    try {
      const encodedMessage = encodeURIComponent(CONTACT_CONFIG.defaultMessage);
      const whatsappUrl = `https://wa.me/${CONTACT_CONFIG.phoneNumber}?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
    
    }
  }, []);
return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9F9F9] to-white font-sans overflow-x-hidden text-gray-900">

    <main className={LAYOUT_CONFIG.navbarHeight} role="main">

    <Improve />
    <TherapyImprovementsSection />
    <Experts />
    <WhatWeOffer />
    <SessionPlans />
    <SupportSubscription />
    
    {/* Add any additional sections or components here */}
    </main>
    <WhatsAppButton onClick={handleWhatsAppClick} />

   </div>
  )

}

interface WhatsAppButtonProps {
  onClick: () => void;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ onClick }) => {
  return (
    <button
      className="fixed bottom-6 right-6 z-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-full"
      onClick={onClick}
      title="Chat with us on WhatsApp"
      aria-label="Contact us via WhatsApp"
      type="button"
    >
      <img
        src={CONTACT_CONFIG.whatsappIconUrl}
        alt="WhatsApp"
        className={`${LAYOUT_CONFIG.whatsappIconSize} hover:scale-110 transition-transform duration-300 drop-shadow-lg`}
        loading="lazy"
      />
    </button>
  );
};

export default Home;