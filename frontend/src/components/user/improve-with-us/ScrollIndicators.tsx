import React from 'react';

const ScrollIndicators: React.FC = () => (
  <>
    <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#F9F9F9] to-transparent pointer-events-none md:hidden" />
    <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#F9F9F9] to-transparent pointer-events-none md:hidden" />
  </>
);

export default ScrollIndicators;