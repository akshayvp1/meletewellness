import React from 'react';
import { Service } from '@/types/types';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="text-[#015F4A] mb-3 flex justify-center">
        {service.icon}
      </div>
      <h4 className="font-semibold text-[#015F4A] mb-2">{service.title}</h4>
      <p className="text-sm text-gray-600">{service.description}</p>
    </div>
  );
};

export default ServiceCard;