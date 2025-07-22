import React from "react";
import { Phone, MessageCircle } from "lucide-react";

interface SupportButtonProps {
  onClick: () => void;
}

export const SupportButton: React.FC<SupportButtonProps> = ({ onClick }) => (
  <div className="bg-gradient-to-br from-[#015F4A] to-emerald-600 rounded-xl p-4 text-white transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg min-w-[200px]">
    <div className="flex items-center justify-center mb-3">
      <Phone className="w-5 h-5 mr-2" />
      <div className="text-center">
        <h4 className="text-lg font-bold">24/7 Support</h4>
        <p className="text-emerald-100 text-xs">Available anytime</p>
      </div>
    </div>
    <button
      type="button"
      onClick={onClick}
      className="w-full bg-white text-[#015F4A] font-semibold py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm"
    >
      <MessageCircle className="w-4 h-4" />
      Connect Now
    </button>
  </div>
);