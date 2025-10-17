import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '../lib/prisma';
import { SearchBar } from '@/components/search-bar';
import { TourCard } from '@/components/tour-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock } from 'lucide-react';
import { AnimatedFeatures } from '@/components/animated-features';

export default async function HomePage() {
  const [regions, featuredTours, posts] = await Promise.all([
    prisma.region.findMany({ orderBy: { name: 'asc' } }),
    prisma.tour.findMany({ 
      take: 6, 
      where: { published: true },
      orderBy: { createdAt: 'desc' }, 
      include: { 
        country: true,
        images: {
          orderBy: { order: 'asc' },
          take: 1,
        },
      } 
    }),
    prisma.post.findMany({ 
      take: 3, 
      where: { published: true },
      orderBy: { createdAt: 'desc' } 
    }),
  ]);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] sm:h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/60 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1523805009345-7448845a9e53"
          alt="Travel destination"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="relative z-20 container mx-auto px-6 text-center text-white">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
            Severius Travel & Adventures
          </h1>
          <p className="text-base sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto drop-shadow-md px-4">
            Discover extraordinary journeys across the globe. Create memories that last a lifetime.
          </p>
          <div className="flex justify-center">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Features */}
      <AnimatedFeatures />

      {/* Featured Tours */}
      <section className="py-12 md:py-16 bg-neutral-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[rgb(var(--color-brown))] mb-4">Featured Tours</h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Handpicked adventures for unforgettable experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/tours">
              <Button size="lg" variant="brown">
                View All Tours
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Regions */}
      <section className="py-12 md:py-16 bg-neutral-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[rgb(var(--color-brown))] mb-4">
              Explore by Region
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Discover the world's most captivating destinations across continents
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {regions.map((region) => {
              const regionImages: Record<string, string> = {
                'AF': 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80',
                'EU': 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80',
                'AS': 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
                'NA': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80',
                'SA': 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&q=80',
                'OC': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80',
              };
              const regionDescriptions: Record<string, string> = {
                'AF': 'Safari adventures, wildlife & ancient wonders',
                'EU': 'Historic cities, art & cultural treasures',
                'AS': 'Ancient temples, beaches & vibrant cultures',
                'NA': 'Natural wonders & diverse landscapes',
                'SA': 'Amazon rainforests & ancient civilizations',
                'OC': 'Pristine beaches & unique wildlife',
              };
              return (
                <Link key={region.id} href={`/tours?region=${region.code}`}>
                  <div className="group relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer">
                    <Image
                      src={regionImages[region.code] || regionImages['AF']}
                      alt={region.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                      <h3 className="text-3xl font-bold mb-2 group-hover:text-[rgb(212,175,55)] transition-colors">
                        {region.name}
                      </h3>
                      <p className="text-white/90 text-sm mb-4">
                        {regionDescriptions[region.code] || 'Discover amazing destinations'}
                      </p>
                      <div className="inline-flex items-center gap-2 text-sm font-semibold text-[rgb(212,175,55)] group-hover:gap-4 transition-all">
                        Explore Tours
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
