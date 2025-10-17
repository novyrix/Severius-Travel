import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import { TourCard } from '@/components/tour-card';
import { SearchBar } from '@/components/search-bar';
import { Card, CardContent } from '@/components/ui/card';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function getTours(searchParams: { [key: string]: string | string[] | undefined }) {
  const search = typeof searchParams.search === 'string' ? searchParams.search : '';
  const region = typeof searchParams.region === 'string' ? searchParams.region : '';
  const country = typeof searchParams.country === 'string' ? searchParams.country : '';
  
  const where: any = { published: true };
  
  if (search) {
    where.OR = [
      { title: { contains: search } },
      { description: { contains: search } },
      { country: { name: { contains: search } } },
    ];
  }
  
  if (region) {
    where.country = { region: { code: region } };
  }
  
  if (country) {
    where.country = { slug: country };
  }

  const [tours, regions, countries] = await Promise.all([
    prisma.tour.findMany({
      where,
      include: {
        country: {
          include: {
            region: true,
          },
        },
        images: {
          orderBy: { order: 'asc' },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.region.findMany({ orderBy: { name: 'asc' } }),
    prisma.country.findMany({ 
      orderBy: { name: 'asc' },
      include: { _count: { select: { tours: true } } }
    }),
  ]);

  return { tours, regions, countries };
}

export default async function ToursPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const { tours, regions, countries } = await getTours(resolvedParams);
  const activeRegion = typeof resolvedParams.region === 'string' ? resolvedParams.region : '';
  const activeCountry = typeof resolvedParams.country === 'string' ? resolvedParams.country : '';
  const searchQuery = typeof resolvedParams.search === 'string' ? resolvedParams.search : '';

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-[rgb(var(--color-brown))] to-[rgb(var(--color-gold))] text-white py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">Discover Your Next Adventure</h1>
          <p className="text-xl mb-8 opacity-90">
            Browse our collection of carefully curated tours worldwide
          </p>
          <SearchBar />
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <h2 className="font-bold text-xl mb-6 text-[rgb(var(--color-brown))]">Filters</h2>
                
                {/* Regions Filter */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3 text-sm uppercase text-neutral-600">
                    Regions
                  </h3>
                  <div className="space-y-2">
                    <a
                      href="/tours"
                      className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                        !activeRegion
                          ? 'bg-[rgb(var(--color-gold))] text-white'
                          : 'hover:bg-neutral-100'
                      }`}
                    >
                      All Regions
                    </a>
                    {regions.map((region) => (
                      <a
                        key={region.id}
                        href={`/tours?region=${region.code}`}
                        className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                          activeRegion === region.code
                            ? 'bg-[rgb(var(--color-gold))] text-white'
                            : 'hover:bg-neutral-100'
                        }`}
                      >
                        {region.name}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Countries Filter */}
                <div>
                  <h3 className="font-semibold mb-3 text-sm uppercase text-neutral-600">
                    Countries
                  </h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {countries.filter(c => c._count.tours > 0).map((country) => (
                      <a
                        key={country.id}
                        href={`/tours?country=${country.slug}`}
                        className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                          activeCountry === country.slug
                            ? 'bg-[rgb(var(--color-gold))] text-white'
                            : 'hover:bg-neutral-100'
                        }`}
                      >
                        {country.name} ({country._count.tours})
                      </a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Tours Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[rgb(var(--color-brown))]">
                  {searchQuery ? `Search results for "${searchQuery}"` : 'All Tours'}
                </h2>
                <p className="text-neutral-600 mt-1">
                  {tours.length} {tours.length === 1 ? 'tour' : 'tours'} found
                </p>
              </div>
            </div>

            {tours.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {tours.map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-neutral-600 text-lg mb-4">
                    No tours found matching your criteria
                  </p>
                  <a
                    href="/tours"
                    className="text-[rgb(var(--color-gold))] hover:underline"
                  >
                    Clear all filters
                  </a>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
