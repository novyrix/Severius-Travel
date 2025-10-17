import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// POST - Upload tour images
export async function POST(
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
    
    // Get tour to create folder with slug
    const tour = await prisma.tour.findUnique({
      where: { id },
      select: { slug: true },
    });

    if (!tour) {
      return NextResponse.json({ error: 'Tour not found' }, { status: 404 });
    }

    const formData = await request.formData();
    const files = formData.getAll('images') as File[];
    const isCover = formData.get('isCover') === 'true';

    if (files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    const uploadedImages: string[] = [];

    // Create directory if it doesn't exist
    const uploadDir = join(process.cwd(), 'public', 'images', 'tours', tour.slug);
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Process each file
    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Generate unique filename
      const timestamp = Date.now();
      const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const filepath = join(uploadDir, filename);

      // Write file
      await writeFile(filepath, buffer);

      // Create relative URL
      const imageUrl = `/images/tours/${tour.slug}/${filename}`;
      uploadedImages.push(imageUrl);

      // Get current max order for gallery images
      const maxOrder = await prisma.tourImage.findFirst({
        where: { tourId: id },
        orderBy: { order: 'desc' },
        select: { order: true },
      });

      const nextOrder = (maxOrder?.order ?? -1) + 1;

      // Create TourImage record
      await prisma.tourImage.create({
        data: {
          url: imageUrl,
          tourId: id,
          order: nextOrder,
        },
      });
    }

    // If this is a cover image, update tour
    if (isCover && uploadedImages.length > 0) {
      await prisma.tour.update({
        where: { id },
        data: { coverImage: uploadedImages[0] },
      });
    }

    return NextResponse.json({
      success: true,
      images: uploadedImages,
      message: `Uploaded ${uploadedImages.length} image(s)`,
    });
  } catch (error: any) {
    console.error('Error uploading images:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a tour image
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
    const { imageId } = await request.json();

    if (!imageId) {
      return NextResponse.json({ error: 'Image ID required' }, { status: 400 });
    }

    // Delete from database
    await prisma.tourImage.delete({
      where: { id: imageId },
    });

    // Note: File deletion from filesystem can be added here if needed
    // For now, we just remove from database

    return NextResponse.json({ success: true, message: 'Image deleted' });
  } catch (error: any) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
