'use client';

import { useEffect, useState } from 'react';
import { TourCard } from './tour-card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Tour } from '@/data/tours';

interface FeaturedToursCarouselProps {
  tours: Tour[];
}

export function FeaturedToursCarousel({ tours }: FeaturedToursCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, tours.length, currentIndex]);

  const handleNext = () => {
    setDirection('right');
    setCurrentIndex((prev) => (prev + 1) % tours.length);
  };

  const handlePrev = () => {
    setDirection('left');
    setCurrentIndex((prev) => (prev - 1 + tours.length) % tours.length);
    setIsAutoPlaying(false);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 'right' : 'left');
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const getVisibleTours = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % tours.length;
      visible.push({ tour: tours[index], position: i });
    }
    return visible;
  };

  const visibleTours = getVisibleTours();

  // Animation variants for smooth sliding
  const slideVariants = {
    enter: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? '100%' : '-100%',
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? '-100%' : '100%',
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <div className="relative py-8">
      {/* Carousel Container */}
      <div className="relative overflow-hidden px-8">
        {/* Left Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-neutral-50 via-neutral-50/80 to-transparent z-10 pointer-events-none" />
        
        {/* Right Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-neutral-50 via-neutral-50/80 to-transparent z-10 pointer-events-none" />

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout" custom={direction}>
            {visibleTours.map(({ tour, position }, idx) => (
              <motion.div
                key={`${tour.id}-${currentIndex}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                }}
                style={{
                  gridColumn: idx + 1,
                }}
                className={position === 1 ? 'shadow-2xl' : 'shadow-lg'}
              >
                <motion.div
                  animate={{
                    scale: position === 1 ? 1.05 : 0.95,
                    y: position === 1 ? 0 : 10,
                    opacity: position === 1 ? 1 : 0.7,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeOut',
                  }}
                >
                  <TourCard tour={tour} />
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white hover:bg-neutral-100 shadow-lg border border-neutral-200 transition-all group z-20 ml-2"
        aria-label="Previous tours"
      >
        <ChevronLeft className="w-6 h-6 text-[rgb(var(--color-brown))] group-hover:scale-110 transition-transform" />
      </button>
      
      <button
        onClick={() => {
          handleNext();
          setIsAutoPlaying(false);
        }}
        className="absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white hover:bg-neutral-100 shadow-lg border border-neutral-200 transition-all group z-20 mr-2"
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
            className={`transition-all ${
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
