"use client"
import React from 'react';

const ScrollIndicators: React.FC = () => (
  <>
    <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent pointer-events-none md:hidden z-10" />
    <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent pointer-events-none md:hidden z-10" />
  </>
);

export default ScrollIndicators;

