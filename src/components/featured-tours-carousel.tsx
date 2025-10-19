'use client';

import { useEffect, useRef, useState } from 'react';
import { TourCard } from './tour-card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Tour } from '@/data/tours';

interface FeaturedToursCarouselProps {
  tours: Tour[];
}

export function FeaturedToursCarousel({ tours }: FeaturedToursCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, tours.length, currentIndex]);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % tours.length);
    
    // Smooth scroll animation
    if (carouselRef.current) {
      carouselRef.current.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + tours.length) % tours.length);
    setIsAutoPlaying(false);
    
    // Smooth scroll animation
    if (carouselRef.current) {
      carouselRef.current.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const handleDotClick = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    
    // Smooth scroll animation
    if (carouselRef.current) {
      carouselRef.current.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const getVisibleTours = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % tours.length;
      visible.push(tours[index]);
    }
    return visible;
  };

  const visibleTours = getVisibleTours();

  return (
    <div className="relative py-8">
      {/* Carousel Container */}
      <div className="relative overflow-visible px-8">
        {/* Left Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-neutral-50 via-neutral-50/80 to-transparent z-10 pointer-events-none" />
        
        {/* Right Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-neutral-50 via-neutral-50/80 to-transparent z-10 pointer-events-none" />

        {/* Tours Grid */}
        <div 
          ref={carouselRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          style={{
            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {visibleTours.map((tour, idx) => (
            <div
              key={`${tour.id}-${currentIndex}-${idx}`}
              className="transition-all duration-600 ease-out will-change-transform"
              style={{
                opacity: idx === 1 ? 1 : 0.7,
                transform: `scale(${idx === 1 ? 1.02 : 0.95}) translateY(${idx === 1 ? '0px' : '10px'}) translateX(${isTransitioning ? (idx === 0 ? '-100%' : idx === 2 ? '100%' : '0') : '0'})`,
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <div className={idx === 1 ? 'shadow-2xl' : 'shadow-lg'}>
                <TourCard tour={tour} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        disabled={isTransitioning}
        className="absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white hover:bg-neutral-100 shadow-lg border border-neutral-200 transition-all group z-20 ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous tours"
      >
        <ChevronLeft className="w-6 h-6 text-[rgb(var(--color-brown))] group-hover:scale-110 transition-transform" />
      </button>
      
      <button
        onClick={() => {
          handleNext();
          setIsAutoPlaying(false);
        }}
        disabled={isTransitioning}
        className="absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white hover:bg-neutral-100 shadow-lg border border-neutral-200 transition-all group z-20 mr-2 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next tours"
      >
        <ChevronRight className="w-6 h-6 text-[rgb(var(--color-brown))] group-hover:scale-110 transition-transform" />
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {tours.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            disabled={isTransitioning}
            className={`transition-all disabled:cursor-not-allowed ${
              index === currentIndex
                ? 'w-8 h-2 bg-[rgb(var(--color-gold))]'
                : 'w-2 h-2 bg-neutral-300 hover:bg-neutral-400'
            } rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
