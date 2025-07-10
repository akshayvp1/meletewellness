import React from 'react';
import { Heart, Users, Shield, Award, ArrowRight } from 'lucide-react';
import Button from '@/components/user/about/HelpButton'; // Import the separate Button component

const HelpSection: React.FC = () => {
  const features = [
    {
      icon: Users,
      title: "Mental Health Community",
      description: "Connect with a supportive community to enhance your mental wellness journey."
    },
    {
      icon: Shield,
      title: "Confidential Therapy",
      description: "Your privacy is safeguarded with healthcare-grade security protocols."
    },
    {
      icon: Award,
      title: "Expert Mental Health Care",
      description: "Access licensed therapists for professional, compassionate support."
    }
  ];

  return (
    <section className="py-20 bg-white" aria-labelledby="help-heading">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-12">
            <div className="w-20 h-20 bg-[#015F4A]/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Heart className="w-10 h-10 text-[#015F4A]" aria-hidden="true" />
            </div>
            <h2 id="help-heading" className="text-4xl lg:text-5xl font-light mb-6 text-gray-900">
              You're Not Alone in Your <span className="font-semibold text-[#015F4A]">Mental Health Journey</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Seeking professional mental health support is a courageous step. MELETE is here to guide you.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-10 border border-gray-100 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {features.map((feature, index) => (
                <article key={index} className="text-center">
                  <div className="w-14 h-14 bg-[#015F4A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-7 h-7 text-[#015F4A]" aria-hidden="true" />
                  </div>
                  <h4 className="font-semibold text-lg text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                </article>
              ))}
            </div>
            
            <div className="text-center">
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Whether managing stress, anxiety, or seeking personal growth, our expert therapists are here to support your mental health needs.
              </p>
              <Button 
                href="/therapy"
                icon={<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />}
                className="mx-auto"
              >
                Start Your Therapy Journey
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpSection;