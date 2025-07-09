"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import student from "@/../public/assets/colleges.webp";
import institution from "@/../public/assets/institution.webp";
import company from "@/../public/assets/company.webp";

// Interface for SVG icon props
interface IconProps extends React.SVGProps<SVGSVGElement> {}

// Placeholder SVG icons (replace with actual icons in your project)
const GraduationCap: React.FC<IconProps> = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 14l9-5-9-5-9 5 9 5z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
    />
  </svg>
);

const Briefcase: React.FC<IconProps> = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 7h-16a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2v-10a2 2 0 00-2-2zM12 14h.01"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 7v-2a2 2 0 012-2h6a2 2 0 012 2v2"
    />
  </svg>
);

const Building: React.FC<IconProps> = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 21v-18a2 2 0 00-2-2h-10a2 2 0 00-2 2v18m14 0h-14m14 0h2a2 2 0 002-2v-2h-4m-14 4h-2a2 2 0 01-2-2v-2h4m4-12h4m-4 4h4m-8-4h.01m3.99 0h.01m-4 4h.01m3.99 0h.01m-4 4h.01m3.99 0h.01"
    />
  </svg>
);

// Animation variants
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

// Interface for category items
interface Category {
  title: string;
  description: string;
  image: string;
  icon: React.FC<IconProps>;
}

const WhatWeOffer: React.FC = () => {
  // Placeholder images with fallback
  const categoryImages = {
    students: student,
    professionals: company,
    institutions: institution,
  };

  const categories: Category[] = [
    {
      title: "For Students",
      description:
        "Tailored mental health support to manage academic stress, foster peer connections, and provide affordable care designed for student life.",
      image: categoryImages.students.src,
      icon: GraduationCap,
    },
    {
      title: "For Professionals",
      description:
        "Comprehensive solutions to address workplace stress, achieve work-life balance, and offer career-focused mental health guidance.",
      image: categoryImages.professionals.src,
      icon: Briefcase,
    },
    {
      title: "For Institutions",
      description:
        "Customized mental health programs for schools, corporations, and organizations to promote wellness and community well-being.",
      image: categoryImages.institutions.src,
      icon: Building,
    },
  ];

  return (
    <motion.section
      className="py-20 bg-gradient-to-br from-slate-50 via-white to-emerald-50 overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      aria-labelledby="offer-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            id="offer-heading"
            className="text-3xl md:text-4xl font-bold text-[#015F4A] mb-6"
          >
            What We Offer
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            MELETE provides holistic mental health support, including expert
            consultations for anxiety, depression, stress, and other emotional
            challenges. Our platform also offer soothing relaxation music, and
            personalized wellness plans tailored to your needs.
          </p>
        </div>

        <div className="flex flex-row overflow-x-auto md:overflow-x-visible gap-6 pb-4 snap-x snap-mandatory">
          {categories.map((category, index) => (
            <motion.article
              key={category.title}
              className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex-shrink-0 w-80 md:w-1/3 snap-center"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.2 }}
              aria-labelledby={`category-${index}`}
            >
              <div className="h-56 overflow-hidden">
                <Image
                  src={category.image}
                  alt={`${category.title} support`}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/400x300?text=Fallback+Image";
                  }}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <category.icon
                    className="w-8 h-8 text-[#015F4A] mr-3"
                    aria-hidden="true"
                  />
                  <h3
                    id={`category-${index}`}
                    className="text-xl font-semibold text-[#015F4A]"
                  >
                    {category.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-base leading-relaxed mb-6">
                  {category.description}
                </p>
                <div className="flex justify-center">
                  <Link
                    href="/user/service"
                    className="inline-block px-6 py-2 rounded-full bg-[#015F4A] text-white font-medium hover:bg-[#014a3a] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#015F4A] focus:ring-offset-2"
                    aria-label={`Explore services for ${category.title}`}
                  >
                    Explore Services
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/user/service"
            className="inline-block px-8 py-3 rounded-full bg-transparent border-2 border-[#015F4A] text-[#015F4A] font-semibold hover:bg-[#015F4A] hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#015F4A] focus:ring-offset-2"
            aria-label="Discover all MELETE services"
          >
            Discover All Services
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default WhatWeOffer;