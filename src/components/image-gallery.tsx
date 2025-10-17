'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  tourName: string;
}

export default function ImageGallery({ images, tourName }: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">No images available</p>
      </div>
    );
  }

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    setZoom(false);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setZoom(false);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setZoom(false);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setZoom(false);
  };

  const toggleZoom = () => {
    setZoom(!zoom);
  };

  // Handle keyboard navigation
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  };

  return (
    <div className="w-full">
      {/* Main Gallery Grid */}
      <div className="grid grid-cols-4 gap-2">
        {/* Large preview image */}
        <div className="col-span-4 md:col-span-3 row-span-2">
          <div
            className="relative h-96 md:h-[500px] w-full cursor-pointer overflow-hidden rounded-lg group"
            onClick={() => openLightbox(0)}
          >
            <Image
              src={images[0]}
              alt={`${tourName} - Main view`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 75vw"
              priority
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <ZoomIn className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>

        {/* Thumbnail grid */}
        {images.slice(1, 5).map((image, index) => (
          <div
            key={index + 1}
            className="relative h-24 md:h-[122px] cursor-pointer overflow-hidden rounded-lg group"
            onClick={() => openLightbox(index + 1)}
          >
            <Image
              src={image}
              alt={`${tourName} - Image ${index + 2}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 25vw, 20vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
          </div>
        ))}

        {/* Show more button if more than 5 images */}
        {images.length > 5 && (
          <div
            className="relative h-24 md:h-[122px] cursor-pointer overflow-hidden rounded-lg group bg-gray-900"
            onClick={() => openLightbox(5)}
          >
            <Image
              src={images[5]}
              alt={`${tourName} - More images`}
              fill
              className="object-cover opacity-60"
              sizes="(max-width: 768px) 25vw, 20vw"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <span className="text-white font-semibold text-lg">
                +{images.length - 5} more
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onKeyDown={handleKeyPress}
          tabIndex={0}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50"
            aria-label="Close gallery"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Image counter */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white font-medium z-50">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Zoom button */}
          <button
            onClick={toggleZoom}
            className="absolute top-4 left-4 text-white hover:text-gray-300 transition-colors z-50"
            aria-label={zoom ? 'Zoom out' : 'Zoom in'}
          >
            {zoom ? (
              <ZoomOut className="w-6 h-6" />
            ) : (
              <ZoomIn className="w-6 h-6" />
            )}
          </button>

          {/* Previous button */}
          {images.length > 1 && (
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-50 bg-black/50 rounded-full p-2"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}

          {/* Main image */}
          <div className={`relative w-full h-full flex items-center justify-center p-4 ${zoom ? 'overflow-auto' : 'overflow-hidden'}`}>
            <div className={`relative ${zoom ? 'w-auto h-auto max-w-none' : 'w-full h-full'}`}>
              <Image
                src={images[currentIndex]}
                alt={`${tourName} - Image ${currentIndex + 1}`}
                width={zoom ? 2400 : 1600}
                height={zoom ? 1350 : 900}
                className={`${zoom ? '' : 'object-contain w-full h-full'}`}
                priority
              />
            </div>
          </div>

          {/* Next button */}
          {images.length > 1 && (
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-50 bg-black/50 rounded-full p-2"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}

          {/* Thumbnail strip */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] pb-2 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setZoom(false);
                }}
                className={`relative w-16 h-16 flex-shrink-0 rounded overflow-hidden transition-all duration-200 ${
                  index === currentIndex
                    ? 'ring-2 ring-white scale-110'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
