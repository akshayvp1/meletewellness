

'use client';
import HeroSection from '@/components/user/adult-support/HeroSection';
import ServicesSection from '@/components/user/adult-support/ServicesSection';
import ApproachSection from '@/components/user/adult-support/ApproachSection';
import Counsellors from '@/components/user/experts/ExpertCounsellors';




export default function AdultSupportMain() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 pt-7">
      <HeroSection />
      <ServicesSection />
      <ApproachSection />
      <Counsellors />
    </div>
  );
}
