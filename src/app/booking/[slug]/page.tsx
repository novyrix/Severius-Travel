import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { BookingForm } from '@/components/booking-form';

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getTour(slug: string) {
  const tour = await prisma.tour.findUnique({
    where: { slug, published: true },
    select: {
      id: true,
      slug: true,
      title: true,
      price: true,
      durationDays: true,
      country: {
        select: { name: true },
      },
    },
  });

  return tour;
}

export default async function BookingPage({ params }: PageProps) {
  const { slug } = await params;
  const tour = await getTour(slug);

  if (!tour) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-6 max-w-3xl">
        <Link
          href={`/tours/${tour.slug}`}
          className="inline-flex items-center gap-2 text-neutral-600 hover:text-[rgb(var(--color-gold))] mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Tour
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[rgb(var(--color-brown))] mb-2">
            Complete Your Booking
          </h1>
          <p className="text-neutral-600">
            Fill in the details below to reserve your spot on this amazing tour
          </p>
        </div>

        <BookingForm tour={tour} />
      </div>
    </main>
  );
}
