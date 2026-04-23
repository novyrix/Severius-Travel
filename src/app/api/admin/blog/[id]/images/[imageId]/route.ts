import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { deleteBlogImages } from '@/lib/blog-image-storage';

function normalizeOptionalText(value: unknown): string | null {
  if (typeof value !== 'string') {
    return null;
  }

  const normalized = value.trim();
  return normalized || null;
}

function normalizeSortOrder(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return Math.max(0, Math.floor(value));
  }

  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return Math.max(0, Math.floor(parsed));
    }
  }

  return undefined;
}

async function requireAdmin(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { role: true },
  });

  return user?.role === 'ADMIN';
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; imageId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!(await requireAdmin(session.user.email))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const { id, imageId } = await params;
    const existingImage = await prisma.blogImage.findFirst({
      where: { id: imageId, postId: id },
      select: { id: true },
    });

    if (!existingImage) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    const body = await request.json();
    const sortOrder = normalizeSortOrder(body.sortOrder);

    const updatedImage = await prisma.blogImage.update({
      where: { id: imageId },
      data: {
        altText: normalizeOptionalText(body.altText),
        caption: normalizeOptionalText(body.caption),
        ...(sortOrder !== undefined ? { sortOrder } : {}),
      },
    });

    return NextResponse.json(updatedImage);
  } catch (error: any) {
    console.error('Error updating blog image:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string; imageId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!(await requireAdmin(session.user.email))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const { id, imageId } = await params;
    const image = await prisma.blogImage.findFirst({
      where: { id: imageId, postId: id },
      select: { id: true, pathname: true, url: true },
    });

    if (!image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    await prisma.blogImage.delete({
      where: { id: imageId },
    });

    try {
      await deleteBlogImages([image.pathname || image.url]);
    } catch (error) {
      console.warn('Error deleting blog image from blob storage:', error);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting blog image:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}