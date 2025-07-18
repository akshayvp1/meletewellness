"use client"
import React from 'react';
import { DesktopGridProps } from '@/types/types';
import SupportGroupCard from './SupportGroupCard';

const DesktopGrid: React.FC<DesktopGridProps> = ({
  groups,
  isVisible,
  onServiceClick,
}) => {
  return (
    <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
      {groups.map((group, index) => (
        <SupportGroupCard
          key={group.id}
          group={group}
          index={index}
          isVisible={isVisible}
          onClick={onServiceClick}
        />
      ))}
    </div>
  );
};

export default DesktopGrid;