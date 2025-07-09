import HeroSection from '@/components/user/main-service/HeroSection';
import AboutSection from '@/components/user/main-service/AboutSection';
import SpecialtiesSection from '@/components/user/main-service/SpecialtiesSection';
import OfferingsSection from '@/components/user/main-service/OfferingsSection';
const MeleteServices: React.FC = () => {
  return (
       <div className="min-h-screen bg-gradient-to-b from-[#F9F9F9] to-white font-sans overflow-x-hidden text-gray-900">


      <main className="pt-10 m-0 l-0 pr-0">
        <HeroSection />
      <AboutSection />
      <SpecialtiesSection />
      <OfferingsSection />
      </main>
    </div>
  );
};

export default MeleteServices;
