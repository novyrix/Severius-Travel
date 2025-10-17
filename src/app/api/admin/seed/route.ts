import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashSync } from 'bcryptjs';

// Change this secret before deploying!
const SEED_SECRET = process.env.SEED_SECRET || 'change-this-secret-key';

export async function POST(request: NextRequest) {
  try {
    // Check authorization
    const authHeader = request.headers.get('authorization');
    const providedSecret = authHeader?.replace('Bearer ', '');

    if (providedSecret !== SEED_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized. Invalid seed secret.' },
        { status: 401 }
      );
    }

    console.log('🌱 Starting production seed...');

    // Check if already seeded
    const existingTours = await prisma.tour.count();
    if (existingTours > 0) {
      return NextResponse.json(
        { 
          message: 'Database already seeded. Delete existing data first if you want to re-seed.',
          toursCount: existingTours 
        },
        { status: 200 }
      );
    }

    // Import and run the seed
    const { PrismaClient } = await import('@prisma/client');
    const seedPrisma = new PrismaClient();

    // Regions
    const africa = await seedPrisma.region.create({
      data: { code: 'AF', name: 'Africa' },
    });

    // Countries
    const kenya = await seedPrisma.country.create({
      data: { name: 'Kenya', iso2: 'KE', slug: 'kenya', regionId: africa.id },
    });

    const tanzania = await seedPrisma.country.create({
      data: { name: 'Tanzania', iso2: 'TZ', slug: 'tanzania', regionId: africa.id },
    });

    // Admin user
    await seedPrisma.user.create({
      data: {
        email: 'admin@sevadv.com',
        name: 'Admin User',
        hashedPassword: hashSync('Admin123!', 10),
        emailVerified: new Date(),
      },
    });

    // Create Maasai Mara tour with full details
    await seedPrisma.tour.create({
      data: {
        slug: 'maasai-mara-safari',
        title: 'Maasai Mara Safari Adventure',
        description: 'Experience the great wildebeest migration and witness the Big Five in their natural habitat. This 5-day safari takes you through the stunning Maasai Mara National Reserve.',
        price: 1850,
        durationDays: 5,
        countryId: kenya.id,
        published: true,
        difficulty: 'Easy',
        maxGroupSize: 12,
        minGroupSize: 2,
        ageRestriction: 'All ages welcome',
        accommodationType: 'Lodge',
        mealPlan: 'Full Board',
        bestMonths: JSON.stringify(['January', 'February', 'July', 'August', 'September', 'October']),
        highlights: JSON.stringify([
          'Witness the Great Wildebeest Migration',
          'Spot the Big Five',
          'Visit a traditional Maasai village',
          'Professional guide and 4x4 safari vehicle',
        ]),
        inclusions: JSON.stringify([
          'Airport transfers',
          'Professional guide',
          'All park fees',
          'Full board accommodation',
        ]),
        exclusions: JSON.stringify([
          'International flights',
          'Visa fees',
          'Travel insurance',
          'Tips and gratuities',
        ]),
        gallery: JSON.stringify([
          'https://images.unsplash.com/photo-1516426122078-c23e76319801',
          'https://images.unsplash.com/photo-1535083783855-76ae62b2914e',
        ]),
        coverImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801',
      },
    });

    await seedPrisma.$disconnect();

    return NextResponse.json({
      success: true,
      message: '✅ Database seeded successfully!',
      details: {
        regions: 1,
        countries: 2,
        tours: 1,
        users: 1,
      },
    });

  } catch (error: any) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: 'Seed failed', details: error.message },
      { status: 500 }
    );
  }
}
