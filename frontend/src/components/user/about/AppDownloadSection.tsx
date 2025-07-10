import React from 'react';
import Image from 'next/image';
import { Smartphone, CheckSquare } from 'lucide-react';
import Badge from '@/components/user/about/Badge';
import GooglePlayButton from '@/components/user/about/GooglePlayButton';
import AppStoreButton from '@/components/user/about/AppStoreButton';
import { FeatureItem } from '@/types/types';

const AppDownloadSection: React.FC = () => {
  const features: FeatureItem[] = [
    { text: "24/7 access to professional therapists" },
    { text: "Secure video, voice, and chat therapy sessions" },
    { text: "Track your mental health progress with insights" },
    { text: "Access a library of therapeutic resources" },
    { text: "Healthcare-grade privacy and security" }
  ];

  return (
    <section className="py-12 bg-gray-50" aria-labelledby="app-download-heading">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="w-full lg:w-1/2">
              <Badge icon={<Smartphone className="w-4 h-4" aria-hidden="true" />} className="mb-6">
                Download the MELETE App
              </Badge>
              
              <h2 id="app-download-heading" className="text-3xl sm:text-4xl lg:text-5xl font-light mb-4 leading-tight text-gray-900">
                Mental Health Support <br />
                <span className="font-semibold text-[#015F4A]">Anytime, Anywhere</span>
              </h2>
              
              <p className="text-lg sm:text-xl text-gray-600 mb-6 leading-relaxed">
                Download the MELETE app to connect with licensed therapists, track your mental health progress, and access evidence-based resources on the go.
              </p>
              
              <div className="space-y-3 mb-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckSquare className="w-5 h-5 text-[#015F4A] mr-3 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-600 text-sm sm:text-base">{feature.text}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <GooglePlayButton />
                <AppStoreButton />
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-[250px] h-[500px] rounded-[2.5rem] bg-black border-[14px] border-gray-900 shadow-xl overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-gray-900 rounded-b-lg z-20" />
                <Image
                  src="/assets/meleteapp.jpg"
                  alt="MELETE mobile app interface"
                  width={250}
                  height={500}
                  className="w-full h-full object-cover rounded-[2rem]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownloadSection;