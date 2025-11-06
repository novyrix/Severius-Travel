import { NextResponse } from 'next/server';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
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

  const currentDate = new Date().toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/tours</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
${tourSlugs.map(slug => `  <url>
    <loc>${baseUrl}/tours/${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`).join('\n')}
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/faq</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/terms</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${baseUrl}/privacy</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${baseUrl}/cookie-policy</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${baseUrl}/booking-policy</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
    },
  });
}
