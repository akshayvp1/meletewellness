"use client";

import React, { useCallback } from "react";
import { useRouter } from "next/navigation";

// Custom hooks
import { useIntersectionObserver } from "@/components/hooks/useIntersectionObserver";
import { useSwipe } from "@/components/hooks/useSwipe";
import { useTouchDetection } from "@/components/hooks/useTouchDetection";
import { useCarousel } from "@/components/hooks/useCarousel";

// Components
import MobileCarousel from "@/components/user/melete-provide/MobileCarousel";
import DesktopGrid from "@/components/user/melete-provide/DesktopGrid";

// Data and types
import { supportGroupsData } from "@/components/user/melete-provide/supportGroupsData";
import { SupportGroup } from "@/types/types";

const SupportGroups: React.FC = () => {
  const router = useRouter();
  const [sectionRef, isSectionVisible] = useIntersectionObserver(0.1);
  const isTouch = useTouchDetection();
  
  const {
    currentSlide,
    nextSlide,
    prevSlide,
    goToSlide,
  } = useCarousel({
    totalSlides: supportGroupsData.length,
    autoSlide: true,
    autoSlideInterval: 6000,
    isTouch,
  });

  const handleServiceClick = useCallback((group: SupportGroup) => {
    console.log(`Navigating to ${group.path}`);
    router.push(group.path);
  }, [router]);

  const swipeHandlers = useSwipe(nextSlide, prevSlide, 50);

  return (
    <section
      ref={sectionRef}
      className="py-16 bg-gradient-to-br from-slate-50 via-white to-emerald-50 overflow-hidden"
      aria-labelledby="support-groups-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div
          className={`text-center mb-12 lg:mb-16 transform transition-all duration-1000 ${
            isSectionVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <h2
            id="support-groups-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-6 lg:mb-8"
          >
            Mental Health Support
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#015F4A] to-emerald-600">
              For Every Life Stage
            </span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed px-4">
            Professional, evidence-based mental health services tailored to your
            unique needs and life circumstances.
          </p>
        </div>

        {/* Mobile Carousel View */}
        <MobileCarousel
          groups={supportGroupsData}
          currentSlide={currentSlide}
          onServiceClick={handleServiceClick}
          swipeHandlers={swipeHandlers}
        />

        {/* Desktop Grid View */}
        <DesktopGrid
          groups={supportGroupsData}
          isVisible={isSectionVisible}
          onServiceClick={handleServiceClick}
        />
      </div>
    </section>
  );
};

export default SupportGroups;