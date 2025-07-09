"use client";

import React from "react";
import {
  User,
  Users,
  Heart,
  Baby,
  UserCheck,
  ArrowRight
} from "lucide-react";

import { useRouter } from "next/navigation";
import ChildImage from "@/../../public/assets/child.webp"
import AdultImage from "@/../../public/assets/adult.webp";
import ParentImage from "@/../../public/assets/parent.webp";
import PregnantImage from "@/../../public/assets/pregnant.webp";
import OldageImage from "@/../../public/assets/oldage.webp";

// Interface for support group items
interface SupportGroup {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
  color: string;
  path: string;
}

// Animation hook for scroll-triggered animations
const useIntersectionObserver = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [element, setElement] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [element, threshold]);

  return [setElement, isVisible] as const;
};

// Custom hook for swipe functionality
const useSwipe = (onSwipeLeft: () => void, onSwipeRight: () => void) => {
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      onSwipeLeft();
    } else if (isRightSwipe) {
      onSwipeRight();
    }
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
};

const SupportGroups: React.FC = () => {
  const [sectionRef, isSectionVisible] = useIntersectionObserver(0.1);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isTouch, setIsTouch] = React.useState(false);
  const router = useRouter();

//   const ChildImage = 'https://res.cloudinary.com/dedrcfbxf/image/upload/v1751361737/child_ibkpcu.webp';
//   const AdultImage = "https://res.cloudinary.com/dedrcfbxf/image/upload/v1751362272/adult_jsxayg.webp";
//   const ParentImage = "https://res.cloudinary.com/dedrcfbxf/image/upload/v1751362447/parent_fmzpic.webp";
//   const PregnantImage = "https://res.cloudinary.com/dedrcfbxf/image/upload/v1751362413/pregnant_q02awp.webp";
//   const OldageImage = "https://res.cloudinary.com/dedrcfbxf/image/upload/v1751362370/oldage_yhj5xq.webp";

  const groups: SupportGroup[] = [
    {
      id: "child",
      title: "Child Support",
      description:
        "Specialized mental health care for children, focusing on emotional development, behavioral guidance, and creating a safe space for young minds to flourish.",
      image: ChildImage.src,
      icon: Baby,
      features: [
        "Play Therapy",
        "Behavioral Support",
        "Emotional Regulation",
        "Social Skills Training",
      ],
      color: "from-pink-500 to-rose-400",
      path: "/user/child-support",
    },
    {
      id: "parent",
      title: "Parent Support",
      description:
        "Comprehensive guidance for parents navigating parenting challenges, family dynamics, and building stronger relationships with their children.",
      image: ParentImage.src,
      icon: Users,
      features: [
        "Parenting Skills",
        "Family Counseling",
        "Stress Management",
        "Communication Training",
      ],
      color: "from-emerald-500 to-teal-400",
      path: "/user/parent-support",
    },
    {
      id: "adult",
      title: "Adult Support",
      description:
        "Professional mental health services for adults dealing with work stress, relationships, anxiety, depression, and life transitions.",
      image: AdultImage.src,
      icon: User,
      features: [
        "Individual Therapy",
        "Stress Counseling",
        "Relationship Support",
        "Career Guidance",
      ],
      color: "from-blue-500 to-cyan-400",
      path: "/user/adult-support",
    },
    {
      id: "pregnant",
      title: "Pregnancy Support",
      description:
        "Specialized mental health care for expecting mothers, addressing prenatal anxiety, mood changes, and preparing for motherhood.",
      image: PregnantImage.src,
      icon: Heart,
      features: [
        "Prenatal Counseling",
        "Anxiety Management",
        "Postpartum Preparation",
        "Partner Support",
      ],
      color: "from-purple-500 to-violet-400",
      path: "/user/pregnancy-support",
    },
    {
      id: "oldage",
      title: "Senior Support",
      description:
        "Dedicated mental health services for older adults, focusing on aging gracefully, cognitive health, and maintaining emotional well-being.",
      image: OldageImage.src,
      icon: UserCheck,
      features: [
        "Cognitive Support",
        "Loneliness Prevention",
        "Health Adaptation",
        "Memory Care",
      ],
      color: "from-amber-500 to-orange-400",
      path: "/user/oldage-support",
    },
  ];

  const handleServiceClick = (group: SupportGroup) => {
    console.log(`Navigating to ${group.path}`);
    router.push(group.path);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % groups.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + groups.length) % groups.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Swipe handlers
  const swipeHandlers = useSwipe(nextSlide, prevSlide);

  React.useEffect(() => {
    const checkTouch = () => {
      setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
  }, []);

  // Auto-slide functionality for desktop
  React.useEffect(() => {
    if (isTouch) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isTouch]);

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

        {/* Mobile Carousel View with Swipe */}
        <div className="block lg:hidden mb-12">
          <div className="relative">
            <div
              className="relative overflow-hidden rounded-3xl"
              {...swipeHandlers}
            >
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {groups.map((group) => (
                  <div key={group.id} className="w-full flex-shrink-0 px-3">
                    <article
                      className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 mx-auto max-w-md cursor-pointer transform transition-all duration-300 hover:scale-105 active:scale-95"
                      onClick={() => handleServiceClick(group)}
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={group.image}
                          alt={`${group.title} mental health services`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-t ${group.color} mix-blend-multiply opacity-25`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                        <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
                          <group.icon className="w-8 h-8 text-slate-700" />
                        </div>

                        <div className="absolute bottom-6 left-6 right-6">
                          <h3 className="text-white text-2xl font-bold mb-2 drop-shadow-lg">
                            {group.title}
                          </h3>
                        </div>
                      </div>

                      <div className="p-8">
                        <p className="text-slate-600 text-base leading-relaxed mb-6">
                          {group.description}
                        </p>

                        <div className="grid grid-cols-1 gap-3">
                          {group.features.map((feature, featureIndex) => (
                            <div
                              key={featureIndex}
                              className="flex items-center text-sm text-slate-600 bg-slate-50 rounded-xl px-4 py-3 hover:bg-slate-100 transition-colors duration-200"
                            >
                              <div className="w-2.5 h-2.5 bg-gradient-to-r from-[#015F4A] to-emerald-500 rounded-full mr-4 flex-shrink-0" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center space-x-3 mt-8">
              {groups.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goToSlide(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-[#015F4A] shadow-lg scale-125"
                      : "bg-slate-300 hover:bg-slate-400 hover:scale-110"
                  }`}
                  aria-label={`Go to ${groups[index].title}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {groups.map((group, index) => (
            <article
              key={group.id}
              className={`group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 cursor-pointer border border-slate-200 hover:border-[#015F4A] ${
                isSectionVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-12 opacity-0"
              }`}
              style={{
                transitionDelay: isSectionVisible ? `${index * 150}ms` : "0ms",
              }}
              onClick={() => handleServiceClick(group)}
            >
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-emerald-50 to-[#015F4A]/10">
                <img
                  src={group.image}
                  alt={`${group.title} mental health services`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#015F4A]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  <group.icon className="w-6 h-6 text-[#015F4A]" />
                </div>

                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                  <button
                    type="button"
                    className="w-12 h-12 bg-[#015F4A] text-white rounded-full hover:bg-[#014136] transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-110 active:scale-95"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleServiceClick(group);
                    }}
                  >
                    <ArrowRight className="w-5 h-5 mx-auto" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-[#015F4A] transition-colors duration-300">
                  {group.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-5">
                  {group.description}
                </p>

                <div className="space-y-2">
                  {group.features.slice(0, 3).map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center text-xs text-slate-500 hover:text-slate-700 transition-colors duration-200"
                    >
                      <div className="w-2 h-2 bg-[#015F4A] rounded-full mr-3 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportGroups;