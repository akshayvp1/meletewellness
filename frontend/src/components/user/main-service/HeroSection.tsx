import React from 'react';
import Image from 'next/image';
import Badge from '@/components/user/main-service/BadgeComponent';
import { Award, Clock, Users } from 'lucide-react';

// Import images
import serviceImage from '@/../public/assets/service.jpg';
import melteIcon from '@/../public/assets/Micon.png';

const HeroSection: React.FC = () => {
  return (
    <div className="bg-white border-b border-gray-200 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-[#ffffff] rounded-full flex items-center justify-center">
                <Image
                  src={melteIcon}
                  alt="MELETE Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
              </div>
              <h1 className="text-5xl font-inter font-normal text-[#1ca184]">MELETE</h1>
            </div>
            <p className="text-xl mb-8 leading-relaxed text-gray-700">
              A recognized mental health platform revolutionizing access to emotional support through 
              a secure, user-friendly app connecting you to 24/7 professional mental health care.
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              <Badge icon={Award} text="Certified Platform" />
              <Badge icon={Clock} text="24/7 Available" />
              <Badge icon={Users} text="Expert Professionals" />
            </div>
          </div>
          <div className="flex justify-center">
            <Image 
              src={serviceImage} 
              alt="Mental Health Support" 
              width={400}
              height={320}
              className="rounded-2xl shadow-xl w-full max-w-md h-80 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
