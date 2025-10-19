import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '../lib/prisma';
import { getAllTours } from '@/data/tours';
import { SearchBar } from '@/components/search-bar';
import { TourCard } from '@/components/tour-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock } from 'lucide-react';
import { AnimatedFeatures } from '@/components/animated-features';
import { HeroSlider } from '@/components/hero-slider';
import { FeaturedToursCarousel } from '@/components/featured-tours-carousel';
import { Marquee } from '@/components/marquee';

export default async function HomePage() {
  const allTours = getAllTours();
  const featuredTours = allTours.slice(0, 6); // Get first 6 tours
  
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
