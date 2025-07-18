'use client';

import { useState } from 'react';

interface UseActiveCardReturn {
  activeCard: number | null;
  setActiveCard: (index: number | null) => void;
  handleCardClick: (index: number) => void;
}

export const useActiveCard = (): UseActiveCardReturn => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setActiveCard(activeCard === index ? null : index);
  };

  return {
    activeCard,
    setActiveCard,
    handleCardClick
  };
};