import Head from 'next/head';
import HeroSection from '@/components/user/main-service/HeroSection';
import AboutSection from '@/components/user/main-service/AboutSection';
import SpecialtiesSection from '@/components/user/main-service/SpecialtiesSection';
import OfferingsSection from '@/components/user/service/what-we-offer';
import SEO from '@/components/SEO';
const MeleteServices: React.FC = () => {
  return (
    <>
      <Head>
        <title>Our Mental Health Services | Melete</title>
        <meta
          name="description"
          content="Discover Melete’s wide range of mental health services including therapy, counselling, relaxation tools, and wellness programs for all ages."
        />
        <meta
          name="keywords"
          content="mental health services, therapy services, wellness programs, mental health counselling, stress relief tools"
        />
      </Head>
      <SEO />

      <div className="min-h-screen bg-gradient-to-b from-[#F9F9F9] to-white font-sans overflow-x-hidden text-gray-900">
        <main className="pt-10 m-0 l-0 pr-0">
          <HeroSection />
          <AboutSection />
          <SpecialtiesSection />
          <OfferingsSection />
        </main>
      </div>
    </>
  );
};

export default MeleteServices;
