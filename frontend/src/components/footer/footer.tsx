"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import MeleteLogo from '@/../../public/assets/logoWhite.png';
import MeleteLogo1 from '@/../../public/assets/Melete-logo-2.svg';

const Footer: React.FC = () => {
  return (
    <motion.footer
      className="py-12 text-center"
      style={{ backgroundColor: '#F9F9F9', color: '#333333' }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <Image
          src={MeleteLogo1}
          alt="Melete Logo"
          className="h-12 w-auto mx-auto mb-6"
          width={120}
          height={48}
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            e.currentTarget.src = MeleteLogo.src;
          }}
        />
        <p className="text-sm mb-4">
          © {new Date().getFullYear()} Melete Wellness. All rights reserved.
        </p>
        <div className="flex justify-center space-x-6 mb-6">
          <a
            href="https://www.instagram.com/meletewellness"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[#015F4A] transition-colors duration-300"
            aria-label="Instagram"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://www.linkedin.com/company/meleteapp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[#015F4A] transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
        <div className="flex justify-center space-x-6">
          <Link
            href="/privacy"
            className="text-gray-600 hover:text-[#015F4A] transition-colors duration-300"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-and-condition"
            className="text-gray-600 hover:text-[#015F4A] transition-colors duration-300"
          >
            Terms of Service
          </Link>
          <Link
            href="/contact"
            className="text-gray-600 hover:text-[#015F4A] transition-colors duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;