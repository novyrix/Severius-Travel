import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://severiusadventuresandtravel.com';
  
  // All 24 tour slugs
  const tourSlugs = [
    'maasai-mara-safari-5-days',
    'amboseli-kilimanjaro-safari-4-days',
    'lakes-nakuru-naivasha-safari-3-days',
    'nairobi-mombasa-grand-tour-7-days',
    'bwindi-gorilla-trekking-uganda-3-days',
    'murchison-falls-uganda-safari-4-days',
    'serengeti-great-migration-tanzania-6-days',
    'kilimanjaro-trekking-marangu-route-6-days',
    'ngorongoro-crater-lake-manyara-4-days',
    'rwanda-gorilla-trekking-volcanoes-3-days',
    'akagera-national-park-rwanda-2-days',
    'cape-town-winelands-tour-5-days',
    'kruger-national-park-safari-4-days',
    'garden-route-road-trip-7-days',
    'okavango-delta-safari-4-days',
    'chobe-national-park-safari-3-days',
    'victoria-falls-zimbabwe-3-days',
    'hwange-national-park-safari-4-days',
    'sossusvlei-dead-vlei-desert-5-days',
    'etosha-national-park-safari-4-days',
    'south-luangwa-walking-safari-5-days',
    'victoria-falls-zambia-3-days',
    'zanzibar-beach-paradise-5-days',
    'stone-town-cultural-zanzibar-3-days',
  ];

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tours`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/booking-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  // Tour pages
  const tourPages = tourSlugs.map((slug) => ({
    url: `${baseUrl}/tours/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...staticPages, ...tourPages];
}
