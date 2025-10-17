import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Users, Check, X, ChevronDown, Star, TrendingUp, Shield, Award, Utensils, Home, AlertCircle } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import ImageGallery from '@/components/image-gallery';

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getTour(slug: string) {
  const tour = await prisma.tour.findUnique({
    where: { slug, published: true },
    include: {
      country: {
        include: { region: true },
      },
      images: {
        orderBy: { order: 'asc' },
      },
      days: {
        orderBy: { dayNumber: 'asc' },
      },
    },
  });

  return tour;
}

export default async function TourDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tour = await getTour(slug);

  if (!tour) {
    notFound();
  }

  // Parse JSON fields
  const gallery = tour.gallery ? JSON.parse(tour.gallery as string) : [];
  const highlights = tour.highlights ? JSON.parse(tour.highlights as string) : [];
  const inclusions = tour.inclusions ? JSON.parse(tour.inclusions as string) : [];
  const exclusions = tour.exclusions ? JSON.parse(tour.exclusions as string) : [];
  const faqs = tour.faqs ? JSON.parse(tour.faqs as string) : [];
  const itinerary = tour.itinerary ? JSON.parse(tour.itinerary as string) : [];
  const requirements = tour.requirements ? JSON.parse(tour.requirements as string) : [];
  const bestMonths = tour.bestMonths ? JSON.parse(tour.bestMonths as string) : [];

  const mainImage = tour.images[0];

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-neutral-900">
        {mainImage ? (
          <Image
            src={mainImage.url}
            alt={mainImage.alt || tour.title}
            fill
            className="object-cover opacity-80"
            priority
            sizes="100vw"
            unoptimized={mainImage.url.includes('unsplash.com')}
          />
        ) : tour.coverImage ? (
          <Image
            src={tour.coverImage}
            alt={tour.title}
            fill
            className="object-cover opacity-80"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[rgb(var(--color-brown))] to-[rgb(var(--color-gold))]">
            <MapPin className="w-24 h-24 text-white/50" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-6 pb-12">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-white/90 mb-3">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">{tour.city || tour.country.name}, {tour.country.name}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              {tour.title}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mb-6 drop-shadow">
              {tour.description.length > 200 ? tour.description.substring(0, 200) + '...' : tour.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary" className="text-base px-4 py-2 bg-white/90">
                <Clock className="w-4 h-4 mr-2" />
                {tour.durationDays} Days
              </Badge>
              {tour.difficulty && (
                <Badge variant="secondary" className="text-base px-4 py-2 bg-white/90">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  {tour.difficulty}
                </Badge>
              )}
              <Badge variant="secondary" className="text-base px-4 py-2 bg-[rgb(var(--color-gold))]/90 text-white">
                <Award className="w-4 h-4 mr-2" />
                Flagship Tour
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Image Gallery */}
            {gallery && gallery.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Photo Gallery</CardTitle>
                </CardHeader>
                <CardContent>
                  <ImageGallery images={gallery} tourName={tour.title} />
                </CardContent>
              </Card>
            )}

            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Tour Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                  {tour.description}
                </p>
                
                {tour.metaDescription && tour.metaDescription !== tour.description && (
                  <p className="text-neutral-600 dark:text-neutral-400 italic">
                    {tour.metaDescription}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Highlights */}
            {highlights && highlights.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Star className="w-6 h-6 text-[rgb(var(--color-gold))]" />
                    Tour Highlights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {highlights.map((highlight: string, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-700 dark:text-neutral-300">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Detailed Itinerary */}
            {itinerary && itinerary.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Day-by-Day Itinerary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {itinerary.map((day: any, index: number) => (
                      <details key={index} className="group border border-neutral-200 dark:border-neutral-700 rounded-lg p-5 cursor-pointer hover:shadow-md transition-shadow">
                        <summary className="flex items-start gap-4 list-none">
                          <div className="flex-shrink-0">
                            <div className="w-14 h-14 rounded-full bg-[rgb(var(--color-gold))]/10 flex items-center justify-center border-2 border-[rgb(var(--color-gold))]">
                              <span className="font-bold text-lg text-[rgb(var(--color-gold))]">
                                {day.day}
                              </span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-lg text-[rgb(var(--color-brown))] dark:text-[rgb(var(--color-gold))] mb-1 group-open:mb-3">
                              {day.title}
                            </h4>
                            <ChevronDown className="inline-block w-5 h-5 text-neutral-500 transition-transform group-open:rotate-180 mb-2" />
                            <div className="hidden group-open:block">
                              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                                {day.description}
                              </p>
                              {day.activities && day.activities.length > 0 && (
                                <div className="mb-3">
                                  <span className="font-semibold text-sm text-[rgb(var(--color-brown))] dark:text-[rgb(var(--color-gold))]">Activities:</span>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {day.activities.map((activity: string, i: number) => (
                                      <Badge key={i} variant="outline" className="text-xs">{activity}</Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                              <div className="flex flex-wrap gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                                {day.meals && day.meals.length > 0 && (
                                  <div className="flex items-center gap-1.5">
                                    <Utensils className="w-4 h-4" />
                                    <span>{day.meals.join(', ')}</span>
                                  </div>
                                )}
                                {day.accommodation && (
                                  <div className="flex items-center gap-1.5">
                                    <Home className="w-4 h-4" />
                                    <span>{day.accommodation}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </summary>
                      </details>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Inclusions & Exclusions */}
            {(inclusions.length > 0 || exclusions.length > 0) && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">What's Included & Excluded</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Inclusions */}
                    {inclusions.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-green-700 dark:text-green-400 mb-3 flex items-center gap-2">
                          <Check className="w-5 h-5" />
                          Included in Price
                        </h4>
                        <ul className="space-y-2">
                          {inclusions.map((item: string, index: number) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                              <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Exclusions */}
                    {exclusions.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
                          <X className="w-5 h-5" />
                          Not Included
                        </h4>
                        <ul className="space-y-2">
                          {exclusions.map((item: string, index: number) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                              <X className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Requirements */}
            {requirements && requirements.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <AlertCircle className="w-6 h-6 text-blue-600" />
                    Tour Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {requirements.map((requirement: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                        <Shield className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* FAQs */}
            {faqs && faqs.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {faqs.map((faq: any, index: number) => (
                      <details key={index} className="group border-b border-neutral-200 dark:border-neutral-700 pb-4 cursor-pointer">
                        <summary className="font-semibold text-[rgb(var(--color-brown))] dark:text-[rgb(var(--color-gold))] list-none flex items-start justify-between gap-4 hover:text-[rgb(var(--color-gold))] transition-colors">
                          <span>{faq.question}</span>
                          <ChevronDown className="w-5 h-5 flex-shrink-0 mt-1 transition-transform group-open:rotate-180" />
                        </summary>
                        <p className="mt-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle className="text-2xl">Book This Tour</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Price Display with Multi-Currency */}
                <div>
                  <div className="text-center mb-4 pb-4 border-b">
                    <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">From</div>
                    <div className="text-4xl font-bold text-[rgb(var(--color-gold))] mb-1">
                      {formatCurrency(tour.price)}
                    </div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">per person</div>
                    
                    {/* Alternative currencies */}
                    {(tour.priceEUR || tour.priceGBP || tour.priceKES) && (
                      <div className="mt-3 pt-3 border-t text-xs text-neutral-500 dark:text-neutral-400 space-y-1">
                        {tour.priceEUR && <div>€{tour.priceEUR} EUR</div>}
                        {tour.priceGBP && <div>£{tour.priceGBP} GBP</div>}
                        {tour.priceKES && <div>KES {tour.priceKES.toLocaleString()}</div>}
                      </div>
                    )}
                  </div>
                  
                  {/* Tour Details */}
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-neutral-600 dark:text-neutral-400">Duration:</span>
                      <span className="font-semibold">{tour.durationDays} Days</span>
                    </div>
                    {tour.difficulty && (
                      <div className="flex justify-between">
                        <span className="text-neutral-600 dark:text-neutral-400">Difficulty:</span>
                        <span className="font-semibold">{tour.difficulty}</span>
                      </div>
                    )}
                    {tour.accommodationType && (
                      <div className="flex justify-between">
                        <span className="text-neutral-600 dark:text-neutral-400">Accommodation:</span>
                        <span className="font-semibold">{tour.accommodationType}</span>
                      </div>
                    )}
                    {tour.mealPlan && (
                      <div className="flex justify-between">
                        <span className="text-neutral-600 dark:text-neutral-400">Meals:</span>
                        <span className="font-semibold">{tour.mealPlan}</span>
                      </div>
                    )}
                    {(tour.maxGroupSize || tour.minGroupSize) && (
                      <div className="flex justify-between">
                        <span className="text-neutral-600 dark:text-neutral-400">Group Size:</span>
                        <span className="font-semibold">
                          {tour.minGroupSize || 2}-{tour.maxGroupSize || 15} People
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Best Time to Visit */}
                {bestMonths && bestMonths.length > 0 && (
                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Best Time to Visit
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {bestMonths.map((month: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {month}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="pt-4 border-t space-y-3">
                  <Link href={`/booking/${tour.slug}`} className="block">
                    <Button className="w-full bg-[rgb(var(--color-gold))] hover:bg-[rgb(var(--color-gold))]/90 text-white" size="lg">
                      Book This Tour
                    </Button>
                  </Link>
                  <Link href="/contact" className="block">
                    <Button variant="outline" className="w-full" size="lg">
                      Ask a Question
                    </Button>
                  </Link>
                </div>

                {/* Trust Signals */}
                <div className="pt-4 border-t space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span>Secure Booking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-green-600" />
                    <span>Expert Guides</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Best Price Guarantee</span>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="pt-4 border-t text-sm text-neutral-600 dark:text-neutral-400">
                  <p className="mb-2">
                    <strong>Need Help?</strong>
                  </p>
                  <p>Contact us for customizations, group bookings, or special requests.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
