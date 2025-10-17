import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const data = await req.json();

    // Create tour
    const tour = await prisma.tour.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        price: parseInt(data.price),
        countryId: parseInt(data.countryId),
        durationDays: parseInt(data.durationDays),
        maxGroupSize: parseInt(data.maxGroupSize),
        difficulty: data.difficulty || null,
        city: data.location || null,
        published: data.published || false,
        coverImage: data.coverImage || null,
        highlights: JSON.stringify(data.highlights.filter((h: string) => h.trim() !== '')),
        inclusions: JSON.stringify(data.inclusions.filter((i: string) => i.trim() !== '')),
        exclusions: JSON.stringify(data.exclusions.filter((e: string) => e.trim() !== '')),
        requirements: JSON.stringify(data.requirements.filter((r: string) => r.trim() !== '')),
        itinerary: JSON.stringify(data.itinerary || []),
        faqs: JSON.stringify(data.faqs.filter((f: any) => f.question.trim() !== '' && f.answer.trim() !== ''))
      }
    });

    return NextResponse.json(tour, { status: 201 });
  } catch (error: any) {
    console.error('Create tour error:', error);
    return NextResponse.json({ message: error.message || 'Failed to create tour' }, { status: 500 });
  }
}
