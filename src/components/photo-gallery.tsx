'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

const galleryImages = [
  '/images/more/IMG-20251017-WA0001.jpg',
  '/images/more/IMG-20251017-WA0002.jpg',
  '/images/more/IMG-20251017-WA0003.jpg',
  '/images/more/IMG-20251017-WA0004.jpg',
  '/images/more/IMG-20251017-WA0005.jpg',
  '/images/more/IMG-20251017-WA0006.jpg',
  '/images/more/IMG-20251017-WA0007.jpg',
  '/images/more/IMG-20251017-WA0008.jpg',
  '/images/more/IMG-20251017-WA0009.jpg',
  '/images/more/IMG-20251017-WA0010.jpg',
  '/images/more/IMG-20251017-WA0011.jpg',
  '/images/more/IMG-20251017-WA0012.jpg',
  '/images/more/IMG-20250926-WA0052.jpg',
  '/images/more/IMG-20250926-WA0053.jpg',
  '/images/more/IMG-20250926-WA0054.jpg',
  '/images/more/IMG-20250926-WA0055.jpg',
  '/images/more/IMG-20250926-WA0056.jpg',
  '/images/more/IMG-20250926-WA0057.jpg',
];

export function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryImages.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image}
              alt={`Safari gallery ${index + 1}`}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 transition-all"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          
          <div className="relative w-full max-w-5xl aspect-video">
            <Image
              src={selectedImage}
              alt="Full size"
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
        </div>
      )}
    </>
  );
}
