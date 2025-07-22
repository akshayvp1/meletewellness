import React from "react";
import { Download } from "lucide-react";

interface DownloadButtonProps {
  onClick: () => void;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ onClick }) => (
  <div className="bg-white border-2 border-[#015F4A] rounded-xl p-4 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg min-w-[200px]">
    <div className="flex items-center justify-center mb-3">
      <Download className="w-5 h-5 text-[#015F4A] mr-2" />
      <div className="text-center">
        <h4 className="text-lg font-bold text-slate-800">Download App</h4>
        <p className="text-slate-600 text-xs">Mobile convenience</p>
      </div>
    </div>
    <button
      type="button"
      onClick={onClick}
      className="w-full bg-[#015F4A] text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-[#014136] transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm"
    >
      <Download className="w-4 h-4" />
      Download Now
    </button>
  </div>
);