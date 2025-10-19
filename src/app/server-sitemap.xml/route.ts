import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getAllTours } from '@/data/tours';

const prisma = new PrismaClient();

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://severiustours.com';

  try {
    // Get all tours from static data
    const tours = getAllTours();

    // Fetch all published blog posts
    const posts = await prisma.post.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });

    // Get unique countries from tours
    const countries = [...new Set(tours.map(tour => tour.country))];

    // Build XML sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
            xmlns:xhtml="http://www.w3.org/1999/xhtml"
            xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
            xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
      ${tours
        .map(
          (tour) => `
      <url>
        <loc>${baseUrl}/tours/${tour.slug}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
      </url>`
        )
        .join('')}
      ${posts
        .map(
          (post) => `
      <url>
        <loc>${baseUrl}/blog/${post.slug}</loc>
        <lastmod>${post.updatedAt.toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>`
        )
        .join('')}
      ${countries
        .map(
          (country) => `
      <url>
        <loc>${baseUrl}/destinations/${country.toLowerCase().replace(/\s+/g, '-')}</loc>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>`
        )
        .join('')}
    </urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200',
      },
    });
  } catch (error) {
    console.error('Error generating server sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
