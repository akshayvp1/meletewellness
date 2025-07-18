"use client"
import { useState, useCallback, useEffect } from 'react';

interface UseCarouselProps {
  totalSlides: number;
  autoSlide?: boolean;
  autoSlideInterval?: number;
  isTouch?: boolean;
}

export const useCarousel = ({
  totalSlides,
  autoSlide = true,
  autoSlideInterval = 6000,
  isTouch = false,
}: UseCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlide(index);
    }
  }, [totalSlides]);

  // Auto-slide functionality for desktop
  useEffect(() => {
    if (!autoSlide || isTouch) return;

    const interval = setInterval(nextSlide, autoSlideInterval);
    return () => clearInterval(interval);
  }, [autoSlide, isTouch, nextSlide, autoSlideInterval]);

  return {
    currentSlide,
    nextSlide,
    prevSlide,
    goToSlide,
  };
};