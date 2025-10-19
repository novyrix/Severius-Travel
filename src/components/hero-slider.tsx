'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, MapPin, Clock } from 'lucide-react';

interface Tour {
  id: string;
  title: string;
  slug: string;
  country: string;
  city?: string; // Optional since some tours may not have city
  coverImage: string;
  price: number;
  difficulty: string;
  highlights: string[];
}

interface HeroSliderProps {
  featuredTours: Tour[];
}

export function HeroSlider({ featuredTours }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Get ALL tours from the list (should be first tour from each destination)
  const heroTours = featuredTours.reduce((acc: Tour[], tour) => {
    if (!acc.find(t => t.country === tour.country)) {
      acc.push(tour);
    }
    return acc;
  }, []); // No slice limit - show all destinations

  useEffect(() => {
    if (!isAutoPlaying || heroTours.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroTours.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, heroTours.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroTours.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroTours.length) % heroTours.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  if (heroTours.length === 0) {
    return null;
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Slides */}
      {heroTours.map((tour, index) => (
        <div
          key={tour.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-105'
          }`}
        >
          <Image
            src={tour.coverImage}
            alt={tour.title}
            fill
            className="object-cover"
            priority={index === 0}
            quality={90}
          />
          
          {/* Gradient Overlay - Stronger on mobile */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/30 md:bg-gradient-to-r md:from-black/80 md:via-black/60 md:to-transparent" />
          
          {/* Content */}
          <div className="absolute inset-0 flex items-center pb-0 md:pb-0">
            <div className="container mx-auto px-4 md:px-6">
              <div
                className={`max-w-3xl transform transition-all duration-1000 delay-300 ${
                  index === currentSlide
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-10 opacity-0'
                }`}
              >
                {/* Destination Badge */}
                <div className="flex items-center gap-2 mb-3 md:mb-4">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-[rgb(var(--color-gold))]" />
                  <span className="text-[rgb(var(--color-gold))] font-semibold text-sm md:text-lg">
                    {tour.country}{tour.city ? ` • ${tour.city}` : ''}
                  </span>
                </div>

                {/* Tour Title - Smaller on mobile */}
                <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold text-white mb-2 md:mb-4 drop-shadow-2xl leading-tight">
                  {tour.title}
                </h1>

                {/* Highlights - Hidden on mobile, shown on desktop */}
                <div className="hidden md:flex flex-wrap gap-3 mb-6">
                  {tour.highlights.slice(0, 3).map((highlight, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-medium"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* Tour Details - Simplified on mobile */}
                <div className="flex items-center gap-3 md:gap-6 mb-4 md:mb-8 text-white/90">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="text-sm md:text-lg">{tour.difficulty}</span>
                  </div>
                  <div className="text-xl md:text-2xl font-bold text-[rgb(var(--color-gold))]">
                    ${tour.price.toLocaleString()}
                  </div>
                </div>

                {/* CTAs - Single button on mobile */}
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-20 md:mb-0">
                  <Link
                    href={`/tours/${tour.slug}`}
                    className="px-6 md:px-8 py-3 md:py-4 bg-[rgb(var(--color-gold))] hover:bg-[rgb(var(--color-gold))]/90 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-xl text-center text-sm md:text-base"
                  >
                    View Details
                  </Link>
                  <Link
                    href="/tours"
                    className="hidden sm:block px-6 md:px-8 py-3 md:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg transition-all border border-white/30 text-center text-sm md:text-base"
                  >
                    Browse All Tours
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows - Hidden on mobile */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 transition-all group z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>
      
      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 transition-all group z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Dots Indicator - Smaller on mobile */}
      <div className="absolute bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-10">
        {heroTours.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all ${
              index === currentSlide
                ? 'w-8 md:w-12 bg-[rgb(var(--color-gold))]'
                : 'w-2 md:w-3 bg-white/50 hover:bg-white/70'
            } h-2 md:h-3 rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
