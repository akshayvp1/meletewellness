// hooks/useActiveCard.ts
import { useState } from 'react';

export function useActiveCard() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setActiveCard(prev => (prev === index ? null : index));
  };

  return { activeCard, toggleCard };
}
