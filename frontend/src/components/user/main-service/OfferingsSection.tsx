import React from 'react';
import CategoryCard from '@/components/user/main-service/CategoryCard';
import { GraduationCap, Briefcase, Building } from 'lucide-react';

// Import images
import college from '@/../public/assets/colleges.webp';
import institution from '@/../public/assets/institution.webp';
import company from '@/../public/assets/company.webp';

const OfferingsSection: React.FC = () => {
  const categoryImages = {
    students: college,
    professionals: company, 
    institutions: institution
  };

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#015F4A] mb-6">What We Offer</h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            MELETE provides comprehensive mental health solutions including expert consultations, 
            soothing relaxation music, and personalized wellness plans.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <CategoryCard
            image={categoryImages.students.src}
            icon={GraduationCap}
            title="For Students"
            description="Academic stress management, peer support, and affordable mental health care tailored for student life."
            alt="Students"
          />
          <CategoryCard
            image={categoryImages.professionals.src}
            icon={Briefcase}
            title="For Professionals"
            description="Workplace stress solutions, work-life balance support, and career-related mental health guidance."
            alt="Professionals"
          />
          <CategoryCard
            image={categoryImages.institutions.src}
            icon={Building}
            title="For Institutions"
            description="Comprehensive mental health programs for organizations, schools, and corporate wellness initiatives."
            alt="Institutions"
          />
        </div>
      </div>
    </div>
  );
};

export default OfferingsSection;