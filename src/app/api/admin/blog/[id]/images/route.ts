import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { isVercelBlobUrl } from '@/lib/blog-images';

interface BlogImageInput {
  url?: unknown;
  pathname?: unknown;
  altText?: unknown;
  caption?: unknown;
}

function normalizeOptionalText(value: unknown): string | null {
  if (typeof value !== 'string') {
    return null;
  }

  const normalized = value.trim();
  return normalized || null;
}

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
    const post = await prisma.post.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const body = await request.json();
    const images = Array.isArray(body.images) ? (body.images as BlogImageInput[]) : [];

    if (images.length === 0) {
      return NextResponse.json({ error: 'At least one image is required.' }, { status: 400 });
    }

    const invalidImage = images.find((image) => {
      return (
        typeof image.url !== 'string' ||
        !image.url ||
        !isVercelBlobUrl(image.url) ||
        typeof image.pathname !== 'string' ||
        !image.pathname.startsWith('blog/gallery/')
      );
    });

    if (invalidImage) {
      return NextResponse.json({ error: 'Invalid gallery image payload.' }, { status: 400 });
    }

    const maxSortOrder = await prisma.blogImage.aggregate({
      where: { postId: id },
      _max: { sortOrder: true },
    });

    const startingSortOrder = maxSortOrder._max.sortOrder ?? 0;
    const createdImages = await prisma.$transaction(
      images.map((image, index) =>
        prisma.blogImage.create({
          data: {
            postId: id,
            url: image.url as string,
            pathname: image.pathname as string,
            altText: normalizeOptionalText(image.altText),
            caption: normalizeOptionalText(image.caption),
            sortOrder: startingSortOrder + index + 1,
          },
        })
      )
    );

    return NextResponse.json(createdImages, { status: 201 });
  } catch (error: any) {
    console.error('Error creating blog gallery images:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}