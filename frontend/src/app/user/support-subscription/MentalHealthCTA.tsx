import React from "react";
import { SupportButton } from "./SupportButton";
import { DownloadButton } from "./DownloadButton";
import { SupportModal } from "./SupportModal";

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

interface MentalHealthCTAProps {
  isSubscribed?: boolean;
  onToggleSubscription?: () => void;
  showDemo?: boolean;
}

const MentalHealthCTA: React.FC<MentalHealthCTAProps> = ({ 
  isSubscribed = true, 
  onToggleSubscription,
  showDemo = false 
}) => {
  const [showSupportModal, setShowSupportModal] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState('');
  const [concern, setConcern] = React.useState('');
  const [isConnecting, setIsConnecting] = React.useState(false);

  const languages: Language[] = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' }
  ];

  const handleSupportClick = () => {
    if (!isSubscribed) {
      alert('24/7 Mental Health Support is available only for subscribed users. Please subscribe to access this premium feature.');
      return;
    }
    setShowSupportModal(true);
  };

  const handleConnect = async () => {
    if (!selectedLanguage || !concern.trim()) {
      alert('Please select a language and describe your concern');
      return;
    }

    setIsConnecting(true);
    
    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsConnecting(false);
    setShowSupportModal(false);
    setConcern('');
    setSelectedLanguage('');
    
    const selectedLang = languages.find(l => l.code === selectedLanguage);
    alert(`Connecting you to our 24/7 support team in ${selectedLang?.name}...`);
  };

  const handleDownloadApp = () => {
    // Simulate app download
    alert('Redirecting to app store for download...');
  };

  return (
    <>
      <div className="mt-10 mb-10">
        <div className="bg-gradient-to-br from-slate-50 via-white to-emerald-50 rounded-2xl p-6 lg:p-8 max-w-5xl mx-auto shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            
            {/* Left Section - Title and Description */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <h3 className="text-xl lg:text-2xl font-bold text-slate-800">
                  Ready to Begin Your Mental Health Journey?
                </h3>
              </div>
              
              <p className="text-slate-600 text-sm lg:text-base leading-relaxed max-w-xl lg:max-w-none">
                Get professional mental health support anytime, anywhere. Connect with our certified counselors or download our mobile app.
              </p>

              {/* Features List */}
              <div className="mt-4 flex flex-wrap justify-center lg:justify-start gap-4 text-xs text-slate-600">
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-[#015F4A] rounded-full mr-2" />
                  Certified Professionals
                </div>
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-[#015F4A] rounded-full mr-2" />
                  Multilingual Support
                </div>
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-[#015F4A] rounded-full mr-2" />
                  Confidential & Secure
                </div>
              </div>
            </div>

            {/* Right Section - Action Buttons */}
            <div className="flex-shrink-0">
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0">
                <SupportButton onClick={handleSupportClick} />
                <DownloadButton onClick={handleDownloadApp} />
              </div>
            </div>
          </div>

          {/* Demo Toggle - For testing purposes */}
          {showDemo && onToggleSubscription && (
            <div className="mt-6 pt-4 border-t border-slate-200 text-center">
              <button
                type="button"
                onClick={onToggleSubscription}
                className="text-xs text-slate-500 hover:text-slate-700 transition-colors"
              >
                Demo: {isSubscribed ? 'Switch to Non-Subscriber' : 'Switch to Subscriber'} View
              </button>
            </div>
          )}
        </div>
      </div>

      <SupportModal
        isOpen={showSupportModal}
        onClose={() => setShowSupportModal(false)}
        languages={languages}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        concern={concern}
        setConcern={setConcern}
        isConnecting={isConnecting}
        onConnect={handleConnect}
      />
    </>
  );
};

export default MentalHealthCTA;