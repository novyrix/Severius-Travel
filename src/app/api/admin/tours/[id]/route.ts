import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET - Get single tour for editing
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { role: true },
  });

  if (user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const { id } = await params;
    const tour = await prisma.tour.findUnique({
      where: { id },
      include: {
        country: true,
        images: true,
      },
    });

    if (!tour) {
      return NextResponse.json({ error: 'Tour not found' }, { status: 404 });
    }

    return NextResponse.json(tour);
  } catch (error) {
    console.error('Error fetching tour:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Update tour
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { role: true },
  });

  if (user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const { id } = await params;
    const body = await request.json();

    // Extract fields
    const {
      title,
      slug,
      description,
      price,
      priceEUR,
      priceGBP,
      priceKES,
      durationDays,
      countryId,
      city,
      latitude,
      longitude,
      difficulty,
      maxGroupSize,
      minGroupSize,
      ageRestriction,
      accommodationType,
      mealPlan,
      bestMonths,
      highlights,
      inclusions,
      exclusions,
      itinerary,
      faqs,
      requirements,
      coverImage,
      gallery,
      published,
      metaDescription,
      keywords,
    } = body;

    const updatedTour = await prisma.tour.update({
      where: { id },
      data: {
        title,
        slug,
        description,
        price: parseFloat(price),
        priceEUR: priceEUR ? parseFloat(priceEUR) : null,
        priceGBP: priceGBP ? parseFloat(priceGBP) : null,
        priceKES: priceKES ? parseFloat(priceKES) : null,
        durationDays: parseInt(durationDays),
        countryId: parseInt(countryId),
        city,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        difficulty,
        maxGroupSize: maxGroupSize ? parseInt(maxGroupSize) : null,
        minGroupSize: minGroupSize ? parseInt(minGroupSize) : null,
        ageRestriction,
        accommodationType,
        mealPlan,
        bestMonths: bestMonths ? JSON.stringify(bestMonths) : null,
        highlights: highlights ? JSON.stringify(highlights) : null,
        inclusions: inclusions ? JSON.stringify(inclusions) : null,
        exclusions: exclusions ? JSON.stringify(exclusions) : null,
        itinerary: itinerary ? JSON.stringify(itinerary) : null,
        faqs: faqs ? JSON.stringify(faqs) : null,
        requirements: requirements ? JSON.stringify(requirements) : null,
        coverImage,
        gallery: gallery ? JSON.stringify(gallery) : null,
        published: published === true || published === 'true',
        metaDescription,
        keywords,
      },
    });

    return NextResponse.json(updatedTour);
  } catch (error: any) {
    console.error('Error updating tour:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete tour
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { role: true },
  });

  if (user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const { id } = await params;

    // Check if tour has bookings
    const bookingsCount = await prisma.booking.count({
      where: { tourId: id },
    });

    if (bookingsCount > 0) {
      return NextResponse.json(
        { error: 'Cannot delete tour with existing bookings. Unpublish it instead.' },
        { status: 400 }
      );
    }

    // Delete associated images first
    await prisma.tourImage.deleteMany({
      where: { tourId: id },
    });

    // Delete the tour
    await prisma.tour.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Tour deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting tour:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
