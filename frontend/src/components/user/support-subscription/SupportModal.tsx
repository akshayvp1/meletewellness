import React from "react";
import { Phone, MessageCircle, X, Headphones, Globe } from "lucide-react";

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  languages: Language[];
  selectedLanguage: string;
  setSelectedLanguage: (code: string) => void;
  concern: string;
  setConcern: (concern: string) => void;
  isConnecting: boolean;
  onConnect: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({
  isOpen,
  onClose,
  languages,
  selectedLanguage,
  setSelectedLanguage,
  concern,
  setConcern,
  isConnecting,
  onConnect,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center">
            <Headphones className="w-6 h-6 text-[#015F4A] mr-3" />
            <h3 className="text-xl font-bold text-slate-800">24/7 Support</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Language Selection */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-3 flex items-center">
              <Globe className="w-4 h-4 mr-2" />
              Select Language
            </label>
            <div className="grid grid-cols-2 gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                    selectedLanguage === lang.code
                      ? 'border-[#015F4A] bg-[#015F4A]/5 text-[#015F4A]'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <div className="font-medium text-sm">{lang.name}</div>
                  <div className="text-xs opacity-75">{lang.nativeName}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Concern Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-3 flex items-center">
              <MessageCircle className="w-4 h-4 mr-2" />
              Describe Your Concern
            </label>
            <textarea
              value={concern}
              onChange={(e) => setConcern(e.target.value)}
              placeholder="Please briefly describe what you'd like to discuss with our counselor..."
              className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-[#015F4A] focus:outline-none transition-colors duration-200 resize-none"
              rows={4}
            />
          </div>

          {/* Connect Button */}
          <button
            type="button"
            onClick={onConnect}
            disabled={!selectedLanguage || !concern.trim() || isConnecting}
            className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-3 ${
              !selectedLanguage || !concern.trim()
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : isConnecting
                ? 'bg-[#015F4A]/70 text-white cursor-wait'
                : 'bg-gradient-to-r from-[#015F4A] to-emerald-600 text-white hover:from-[#014136] hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
            }`}
          >
            {isConnecting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Phone className="w-5 h-5" />
                Connect to Counselor
              </>
            )}
          </button>

          {/* Disclaimer */}
          <p className="text-xs text-slate-500 text-center">
            By connecting, you agree to our terms of service. All conversations are confidential and secure.
          </p>
        </div>
      </div>
    </div>
  );
};