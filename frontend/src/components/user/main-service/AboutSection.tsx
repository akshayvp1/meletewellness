import React from 'react';
import ServiceCard from '@/components/user/main-service/ServiceCard';
import VisionMissionCard from '@/components/user/main-service/VisionMissionCard';
import { Brain, Heart, Users, Clock } from 'lucide-react';

const AboutSection: React.FC = () => {
  const services = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Expert Consultations",
      description: "Connect with certified mental health professionals 24/7"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Wellness Programs", 
      description: "Guided yoga, meditation, and personalized wellness plans"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Workshops & Training",
      description: "Awareness workshops and skill-building sessions"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Round-the-clock emotional care and crisis intervention"
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-[#015F4A] mb-6">Our Vision & Mission</h2>
            <div className="space-y-6">
              <VisionMissionCard 
                title="Our Vision"
                content="We envision a world where professional mental health support is universally accessible, delivered with therapeutic excellence, and recognized as essential to every individual's well-being."
              />
              <VisionMissionCard 
                title="Our Mission"
                content="MELETE is dedicated to providing accessible, professional mental health care through a secure digital platform, connecting individuals with licensed therapists and evidence-based resources."
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;