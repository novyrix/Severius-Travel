import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '../lib/prisma';
import { getAllTours, getPromotedTours } from '@/data/tours';
import { SearchBar } from '@/components/search-bar';
import { TourCard } from '@/components/tour-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock, Sparkles, Star, TrendingUp } from 'lucide-react';
import { AnimatedFeatures } from '@/components/animated-features';
import { HeroSlider } from '@/components/hero-slider';
import { FeaturedToursCarousel } from '@/components/featured-tours-carousel';
import { Marquee } from '@/components/marquee';
import { homeMetadata } from '@/lib/metadata';

export const metadata = homeMetadata;

export default async function HomePage() {
  const allTours = getAllTours();
  const featuredTours = allTours.slice(0, 6); // Get first 6 tours
  const promotedTours = getPromotedTours(3); // Get promoted tours for special offers

  const posts = await prisma.post.findMany({
    take: 3,
    where: { published: true },
    orderBy: { createdAt: 'desc' }
  });

  // Get unique countries from tours
  const countries = [...new Set(allTours.map(tour => tour.country))].sort();

  return (
    <main className="min-h-screen">
      {/* Modern Hero Slider with Featured Tours */}
      <HeroSlider featuredTours={featuredTours} />

      {/* PROMOTED TOURS SECTION - Google Ads Special Offers */}
      {promotedTours.length > 0 && (
        <section className="py-16 md:py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[rgb(212,175,55)]/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-200/20 to-transparent rounded-full blur-3xl"></div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            {/* Section Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[rgb(212,175,55)] to-amber-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg animate-pulse">
                <Sparkles className="w-4 h-4" />
                <span>EXCLUSIVE EARLY BIRD OFFER</span>
                <Sparkles className="w-4 h-4" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[rgb(var(--color-brown))] mb-4">
                Limited Time Luxury Safari Deals
              </h2>
              <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
                Experience 5-star luxury at unbeatable prices. Book now and save!
              </p>
            </div>

            {/* Promoted Tours Grid */}
            <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8 max-w-6xl mx-auto">
              {promotedTours.map((tour) => (
                <div key={tour.id} className="group relative">
                  <Link href={`/tours/${tour.slug}`}>
                    <Card className="overflow-hidden border-2 border-[rgb(212,175,55)]/30 hover:border-[rgb(212,175,55)] transition-all duration-300 hover:shadow-2xl bg-white">
                      <div className="grid md:grid-cols-5 gap-0">
                        {/* Image Section */}
                        <div className="md:col-span-2 relative h-64 md:h-auto min-h-[400px]">
                          <Image
                            src={tour.coverImage}
                            alt={tour.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 40vw"
                          />
                          {/* Badges */}
                          <div className="absolute top-4 left-4 flex flex-col gap-2">
                            {tour.badge && (
                              <Badge className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-1.5 shadow-lg">
                                <Star className="w-3 h-3 mr-1 fill-white" />
                                {tour.badge}
                              </Badge>
                            )}
                            <Badge className="bg-gradient-to-r from-[rgb(212,175,55)] to-amber-600 hover:from-amber-600 hover:to-[rgb(212,175,55)] text-white font-bold px-4 py-1.5 shadow-lg">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              FEATURED
                            </Badge>
                          </div>
                          {/* Price Badge */}
                          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                            <p className="text-xs text-neutral-600 font-medium">FROM</p>
                            <p className="text-2xl font-bold text-[rgb(var(--color-brown))]">
                              ${tour.price.toLocaleString()}
                              <span className="text-sm font-normal text-neutral-600"> pp</span>
                            </p>
                          </div>
                        </div>

                        {/* Content Section */}
                        <CardContent className="md:col-span-3 p-8 flex flex-col justify-between">
                          <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-[rgb(var(--color-brown))] mb-4 group-hover:text-amber-700 transition-colors line-clamp-2">
                              {tour.title}
                            </h3>

                            {/* Special Offer Banner */}
                            {tour.specialOffer && (
                              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-4 mb-4 rounded-r-lg">
                                <p className="text-sm font-bold text-green-800 uppercase mb-1">
                                  🎉 SPECIAL OFFER
                                </p>
                                <p className="text-green-700 font-semibold">
                                  {tour.specialOffer}
                                </p>
                                {tour.offerValidUntil && (
                                  <p className="text-xs text-green-600 mt-2">
                                    ⏰ Valid until {tour.offerValidUntil}
                                  </p>
                                )}
                              </div>
                            )}

                            {/* Tour Description */}
                            <p className="text-neutral-700 mb-6 line-clamp-3">
                              {tour.description}
                            </p>

                            {/* Key Highlights - First 4 */}
                            <div className="space-y-2 mb-6">
                              {tour.highlights.slice(0, 4).map((highlight, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                  <span className="text-green-600 mt-0.5">✓</span>
                                  <span className="text-sm text-neutral-700">{highlight}</span>
                                </div>
                              ))}
                            </div>

                            {/* Tour Details */}
                            <div className="flex flex-wrap gap-4 text-sm text-neutral-600 mb-6">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{tour.durationDays} Days</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span>📍</span>
                                <span>{tour.country}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span>⭐</span>
                                <span>{tour.accommodationType}</span>
                              </div>
                            </div>
                          </div>

                          {/* CTA Button */}
                          <Button
                            size="lg"
                            className="w-full bg-gradient-to-r from-[rgb(212,175,55)] to-amber-600 hover:from-amber-600 hover:to-[rgb(212,175,55)] text-white font-bold shadow-lg group-hover:shadow-xl transition-all"
                          >
                            View Details & Book Now
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </CardContent>
                      </div>
                    </Card>
                  </Link>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-12">
              <p className="text-neutral-600 mb-4">
                💬 <strong>Have questions?</strong> Contact us for personalized itineraries
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`} target="_blank">
                  <Button size="lg" variant="outline" className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                    📱 WhatsApp Us
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-2 border-[rgb(var(--color-brown))] text-[rgb(var(--color-brown))] hover:bg-[rgb(var(--color-brown))] hover:text-white">
                    ✉️ Email Inquiry
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <AnimatedFeatures />

      {/* Destinations */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[rgb(var(--color-brown))] mb-4">
              Explore by Destination
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Discover the world's most captivating destinations
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {countries.map((country) => {
              // Map country names to country codes and local image filenames
              const countryCodeMap: Record<string, string> = {
                'Kenya': 'KE',
                'Tanzania': 'TZ',
                'Uganda': 'UG',
                'Rwanda': 'RW',
                'South Africa': 'ZA',
                'Botswana': 'BW',
                'Zimbabwe': 'ZW',
                'Namibia': 'NA',
                'Zambia': 'ZM',
              };

              const countryImageMap: Record<string, string> = {
                'Kenya': '/images/destinations/Kenya.jpg',
                'Tanzania': '/images/destinations/Tanzania.jpg',
                'Uganda': '/images/destinations/Uganda.jpg',
                'Rwanda': '/images/destinations/Rwanda.jpg',
                'South Africa': '/images/destinations/South Africa.jpg',
                'Botswana': '/images/destinations/Botswana.jpg',
                'Zimbabwe': '/images/destinations/Zimbabwe.jpg',
                'Namibia': '/images/destinations/Namibia.jpg',
                'Zambia': '/images/destinations/zambia.jpg',
              };

              const countryDescriptions: Record<string, string> = {
                'Kenya': 'Safari adventures, wildlife & the Great Migration',
                'Tanzania': 'Serengeti plains, Kilimanjaro & Zanzibar beaches',
                'Uganda': 'Gorilla trekking, Murchison Falls & Queen Elizabeth',
                'Rwanda': 'Mountain gorillas, volcanoes & Lake Kivu',
                'South Africa': 'Cape Town, wildlife safaris & wine country',
                'Botswana': 'Okavango Delta, Chobe elephants & pristine wilderness',
                'Zimbabwe': 'Victoria Falls, Hwange wildlife & ancient ruins',
                'Namibia': 'Desert dunes, Etosha wildlife & dramatic landscapes',
                'Zambia': 'Walking safaris, Victoria Falls & South Luangwa',
              };

              const countryCode = countryCodeMap[country] || 'KE';
              const imageUrl = countryImageMap[country] || countryImageMap['Kenya'];
              const tourCount = allTours.filter(t => t.country === country).length;

              // Skip if no tours for this country
              if (tourCount === 0) return null;

              return (
                <Link key={country} href={`/tours?country=${countryCode}`}>
                  <div className="group relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer">
                    <Image
                      src={imageUrl}
                      alt={country}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                      <h3 className="text-3xl font-bold mb-2 group-hover:text-[rgb(212,175,55)] transition-colors">
                        {country}
                      </h3>
                      <p className="text-white/90 text-sm mb-4">
                        {countryDescriptions[country] || 'Discover amazing adventures'}
                      </p>
                      <div className="inline-flex items-center gap-2 text-sm font-semibold text-[rgb(212,175,55)] group-hover:gap-4 transition-all">
                        {tourCount} {tourCount === 1 ? 'Tour' : 'Tours'} Available
                        <span className="text-lg">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Tours Carousel */}
      <section className="py-12 md:py-16 bg-neutral-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[rgb(var(--color-brown))] mb-4">Featured Tours</h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Handpicked adventures for unforgettable experiences
            </p>
          </div>

          <FeaturedToursCarousel tours={featuredTours} />

          <div className="text-center mt-12">
            <Link href="/tours">
              <Button size="lg" variant="brown">
                View All Tours
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <Marquee />

      {/* Blog Posts */}
      {posts.length > 0 && (
        <section className="py-12 md:py-16 bg-gradient-to-br from-beige-50 via-white to-gold-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[rgb(var(--color-brown))] mb-4">Travel Stories</h2>
              <p className="text-neutral-600 text-lg">Tips, guides, and inspiration for your next adventure</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {posts.map((post, index) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                  <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-300 border border-brown-100 bg-white">
                    {/* Card Image */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-brown-200 via-gold-200 to-beige-200">
                      {post.featuredImage ? (
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-brown-200 via-gold-200 to-beige-200" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent group-hover:from-black/60 transition-all duration-300" />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-gradient-to-r from-brown-600 to-brown-700 text-white border-0 shadow-lg">
                          Travel Guide
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-gold-500 group-hover:scale-110 transition-all duration-300">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 text-xs text-brown-600 mb-3">
                        <Clock className="w-3.5 h-3.5" />
                        <span>5 min read</span>
                      </div>

                      <h3 className="text-xl font-bold text-brown-800 mb-3 group-hover:text-gold-600 transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h3>

                      <p className="text-brown-600 text-sm line-clamp-3 leading-relaxed">
                        {post.excerpt || post.content.slice(0, 150) + '...'}
                      </p>

                      <div className="mt-4 pt-4 border-t border-brown-100">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-brown-500 font-medium">Read More</span>
                          <div className="flex items-center gap-2 text-sm text-gold-600 font-semibold group-hover:gap-3 transition-all">
                            Explore
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link href="/blog">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-brown-600 text-brown-700 hover:bg-brown-50 hover:border-gold-600 hover:text-gold-700 transition-all duration-200"
                >
                  Read More Stories
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-[rgb(var(--color-brown))] to-[rgb(var(--color-gold))] text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">Ready for Your Next Adventure?</h2>
          <p className="text-base sm:text-xl mb-8 opacity-90">Browse our tours and start planning your dream vacation today</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tours">
              <Button size="lg" variant="outline" className="bg-white text-[rgb(var(--color-brown))] hover:bg-neutral-100">
                Explore Tours
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white border">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
