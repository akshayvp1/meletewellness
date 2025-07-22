"use client";

import React, { useCallback } from "react";

const CONTACT_CONFIG = {
  phoneNumber: "+918943175522",
  defaultMessage: "Hello, I would like to know more about your services.",
  whatsappIconUrl:
    "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
} as const;

const LAYOUT_CONFIG = {
  whatsappIconSize: "w-12 h-12",
} as const;

export interface WhatsAppButtonProps {
  className?: string;
}

export default function WhatsAppButton({ className = "" }: WhatsAppButtonProps) {
  const handleClick = useCallback(() => {
    const encodedMessage = encodeURIComponent(CONTACT_CONFIG.defaultMessage);
    const whatsappUrl = `https://wa.me/${CONTACT_CONFIG.phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <button
      onClick={handleClick}
      title="Chat with us on WhatsApp"
      aria-label="Contact us via WhatsApp"
      type="button"
      className={`fixed bottom-6 right-6 z-50 ${className} cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-full`}
    >
      <img
        src={CONTACT_CONFIG.whatsappIconUrl}
        alt="WhatsApp"
        className={`${LAYOUT_CONFIG.whatsappIconSize} hover:scale-110 transition-transform duration-300 drop-shadow-lg`}
        loading="lazy"
      />
    </button>
  );
}
