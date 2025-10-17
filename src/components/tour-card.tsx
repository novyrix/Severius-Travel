"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Clock, MapPin } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCurrency } from './providers/currency-provider';

interface TourCardProps {
  tour: {
    id: string;
    slug: string;
    title: string;
    description: string;
    price: number;
    durationDays: number;
    coverImage?: string | null;
    country: {
      name: string;
    };
    images: {
      url: string;
      alt: string | null;
    }[];
  };
}

export function TourCard({ tour }: TourCardProps) {
  const { formatPrice } = useCurrency();
  // Use coverImage if available, otherwise fall back to images array
  const imageUrl = tour.coverImage || tour.images[0]?.url;
  const imageAlt = tour.images[0]?.alt || tour.title;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <Link href={`/tours/${tour.slug}`}>
        <div className="relative h-48 w-full overflow-hidden bg-neutral-100">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-neutral-400">
              No image
            </div>
          )}
          <div className="absolute top-3 right-3">
            <Badge className="bg-white/90 text-[rgb(var(--color-brown))] backdrop-blur-sm">
              {formatPrice(tour.price)}
            </Badge>
          </div>
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/tours/${tour.slug}`}>
          <h3 className="font-semibold text-lg mb-2 text-[rgb(var(--color-brown))] group-hover:text-[rgb(var(--color-gold))] transition-colors line-clamp-2">
            {tour.title}
          </h3>
        </Link>
        
        <div className="flex items-center gap-4 text-sm text-neutral-600 mb-3">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{tour.country.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{tour.durationDays} days</span>
          </div>
        </div>

        <p className="text-sm text-neutral-600 line-clamp-2">
          {tour.description}
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Link href={`/tours/${tour.slug}`} className="w-full">
          <Button className="w-full" variant="brown">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
