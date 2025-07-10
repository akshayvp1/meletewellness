import React from 'react';
import { Shield, Award } from 'lucide-react';

const HeroSection: React.FC = () => {
  const stats = [
    { 
      number: '30+', 
      label: 'Licensed Professionals',
      icon: Award 
    },
    { 
      number: '24/7', 
      label: 'Professional Support',
      icon: Shield 
    },
  ];

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <div className="inline-flex items-center bg-[#015F4A]/5 border border-[#015F4A]/20 rounded-full px-4 py-2 mb-6">
            <Shield className="w-4 h-4 text-[#015F4A] mr-2" />
            <span className="text-[#015F4A] font-medium text-sm">Licensed Mental Health Professionals</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Expert
            <span className="text-[#015F4A]"> Counsellors</span>
          </h1>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Connect with board-certified mental health professionals who provide evidence-based counselling 
            and personalized treatment plans.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white border border-[#015F4A]/10 rounded-lg p-4 text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-[#015F4A]/10 rounded-full mb-3">
                  <stat.icon className="w-5 h-5 text-[#015F4A]" />
                </div>
                <div className="text-2xl font-bold text-[#015F4A] mb-1">
                  {stat.number}
                </div>
                <div className="text-gray-900 font-medium text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;