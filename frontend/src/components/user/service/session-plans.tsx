"use client";
import React from "react";
import { motion, Variants } from "framer-motion";

interface ServiceItem {
  title: string;
  sessions: string;
  price: number;
  items: string[];
}

const TherapyServicesCard: React.FC = () => {
  const services: ServiceItem[] = [
    {
      title: "Essential Support",
      sessions: "Single Session",
      price: 599,
      items: [
        "Establishing rapport",
        "Provide a safe, supportive and non-judgmental space to explore yourself",
        "Felt heard and understood",
      ],
    },
    {
      title: "Complete Care",
      sessions: "8 Sessions",
      price: 3700,
      items: [
        "Establishing rapport",
        "Dive deeper into underlying challenges",
        "Setting goals",
        "Establishing self-awareness",
        "Realising coping mechanisms and exploring the coping skills",
        "Make a plan for maintenance",
      ],
    },
    {
      title: "Problem-Focused Therapy",
      sessions: "12 Sessions",
      price: 5749,
      items: [
        "Establishing rapport",
        "Identifying and analysing your problem",
        "Goal setting according to your problem",
        "Generating ideas to resolve obstacles to your problem",
        "Finding the route to your solution",
      ],
    },
  ];

  const cardStyles = [
    {
      gradient: "from-[#015F4A] to-[#014A3B]",
      button: "bg-[#015F4A] hover:bg-[#014A3B]",
      accent: "bg-[#015F4A]",
      shadow: "shadow-[#015F4A]/25",
    },
    {
      gradient: "from-[#027F61] to-[#015F4A]",
      button: "bg-[#027F61] hover:bg-[#015F4A]",
      accent: "bg-[#027F61]",
      shadow: "shadow-[#027F61]/25",
    },
    {
      gradient: "from-[#014A3B] to-[#013B2F]",
      button: "bg-[#014A3B] hover:bg-[#013B2F]",
      accent: "bg-[#014A3B]",
      shadow: "shadow-[#014A3B]/25",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9,
      rotateX: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        duration: 0.6,
      },
    },
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
        duration: 0.5,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -15 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.08,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-emerald-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-[#015F4A]/10 to-[#027F61]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-br from-[#015F4A]/8 to-white rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#015F4A]/3 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-block mb-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="bg-gradient-to-r from-[#015F4A] to-[#027F61] bg-clip-text text-transparent font-semibold text-sm tracking-wider uppercase">
              Professional Mental Health
            </span>
          </motion.div>

          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-[#015F4A] bg-clip-text text-transparent tracking-tight mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our Therapy Services
          </motion.h1>

          <motion.p
            className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Tailored solutions to support your mental health journey with
            evidence-based approaches
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                scale: 1.03,
                y: -8,
                rotateY: 3,
                boxShadow: "0 20px 40px rgba(1, 95, 74, 0.15)",
              }}
              whileTap={{ scale: 0.98 }}
              className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-400 border border-[#015F4A]/10 hover:border-[#015F4A]/30 overflow-hidden flex flex-col group cursor-pointer ${cardStyles[index].shadow}`}
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
              }}
            >
              {/* Header Section */}
              <div
                className={`bg-gradient-to-br ${cardStyles[index].gradient} text-white p-6 text-center relative overflow-hidden`}
              >
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="absolute -bottom-3 -left-3 w-16 h-16 bg-white/5 rounded-full group-hover:scale-125 transition-transform duration-700"></div>

                <div className="relative z-10">
                  <motion.h2
                    className="text-xl font-bold mb-3 tracking-tight"
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.15 }}
                  >
                    {service.title}
                  </motion.h2>

                  <motion.div
                    className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm border border-white/30"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.3 + index * 0.15,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <p className="text-xs font-semibold text-white">
                      {service.sessions}
                    </p>
                  </motion.div>

                  <motion.div
                    className="mt-3"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.4 + index * 0.15,
                      type: "spring",
                      stiffness: 150,
                    }}
                  >
                    <p className="text-2xl font-bold text-white mb-1">
                      ₹{service.price.toLocaleString()}
                    </p>
                    <p className="text-xs text-white/80 font-medium">
                      {service.sessions === "Single Session"
                        ? "For a session"
                        : "Total package"}
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 flex-grow">
                <ul className="space-y-3">
                  {service.items.map((item, itemIndex) => (
                    <motion.li
                      key={itemIndex}
                      custom={itemIndex}
                      variants={itemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="flex items-start group/item"
                      whileHover={{ x: 6 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className={`w-2.5 h-2.5 ${cardStyles[index].accent} rounded-full mt-1.5 mr-3 flex-shrink-0`}
                        whileHover={{ scale: 1.4, rotate: 180 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                      <p className="text-gray-700 leading-relaxed font-medium text-sm group-hover/item:text-gray-900 transition-colors duration-300">
                        {item}
                      </p>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Action Section */}
              <div className="p-6 pt-0 mt-auto">
                <motion.button
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 6px 20px rgba(1, 95, 74, 0.2)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const message = `Hi! I'm interested in the *${
                      service.title
                    }* therapy service.

*Service Details:*
• Package: ${service.sessions}
• Price: ₹${service.price.toLocaleString()}
• Includes: ${service.items.join(", ")}
I would like to know more about this plan.`;

                    const encodedMessage = encodeURIComponent(message);
                    const whatsappUrl = `https://wa.me/918943175522?text=${encodedMessage}`;
                    window.open(whatsappUrl, "_blank");
                  }}
                  className={`w-full ${cardStyles[index].button} text-white font-bold py-3 px-5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-3 focus:ring-[#015F4A]/30 focus:ring-opacity-50 relative overflow-hidden group/btn cursor-pointer`}
                >
                  <motion.div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center justify-center gap-2 text-sm">
                    Connect Now
                    <motion.svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </motion.svg>
                  </span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex justify-center items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-2.5 h-2.5 bg-[#015F4A] rounded-full animate-pulse"></div>
              <span className="font-semibold text-sm">Licensed Therapists</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <div
                className="w-2.5 h-2.5 bg-[#015F4A] rounded-full animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <span className="font-semibold text-sm">
                Confidential Sessions
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <div
                className="w-2.5 h-2.5 bg-[#015F4A] rounded-full animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <span className="font-semibold text-sm">Flexible Scheduling</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TherapyServicesCard;