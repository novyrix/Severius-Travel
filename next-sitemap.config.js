/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://severiusadventuresandtravel.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    '/admin/*',
    '/login',
    '/register',
    '/verify-email',
    '/api/*',
    '/dashboard',
    '/forgot-password',
    '/reset-password',
    '/maintenance',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api', '/dashboard', '/login', '/register'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://severiusadventuresandtravel.com'}/server-sitemap.xml`,
    ],
  },
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  additionalPaths: async (config) => {
    // All 24 tour pages - most important for SEO
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

    return [
      {
        loc: '/',
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      },
      ...tourSlugs.map(slug => ({
        loc: `/tours/${slug}`,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      })),
    ];
  },
  transform: async (config, path) => {
    // Custom priority for different routes
    let priority = config.priority;
    let changefreq = config.changefreq;

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path.startsWith('/tours/')) {
      // Individual tour pages - highest priority for SEO
      priority = 0.9;
      changefreq = 'weekly';
    } else if (path === '/tours') {
      // Tours listing page
      priority = 0.9;
      changefreq = 'weekly';
    } else if (path.startsWith('/blog')) {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (path.startsWith('/faq')) {
      priority = 0.7;
      changefreq = 'weekly';
    } else if (path === '/about' || path === '/contact') {
      priority = 0.6;
      changefreq = 'monthly';
    } else if (path.startsWith('/terms') || path.startsWith('/privacy') || 
               path.startsWith('/cookie-policy') || path.startsWith('/booking-policy')) {
      // Policy pages - low priority, rarely change
      priority = 0.3;
      changefreq = 'yearly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
