import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { normalizeBlogPostInput } from '@/lib/blog';
import { deleteBlogImages } from '@/lib/blog-image-storage';
import { collectReferencedBlogBlobTargets } from '@/lib/blog-images';

// GET - Get single post
export async function GET(
  _request: NextRequest,
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
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Update post
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
    select: { role: true, id: true, name: true, email: true },
  });

  if (user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const { id } = await params;
    const existingPost = await prisma.post.findUnique({
      where: { id },
      select: {
        id: true,
        publishedAt: true,
        authorName: true,
        featuredImage: true,
        content: true,
        galleryImages: {
          select: { pathname: true, url: true },
        },
      },
    });

    if (!existingPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const body = await request.json();
    const normalizedInput = normalizeBlogPostInput(body, {
      defaultAuthorName:
        existingPost.authorName || user.name || session.user.name || user.email || session.user.email,
      existingPublishedAt: existingPost.publishedAt,
    });

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        ...normalizedInput,
      },
    });

    const previousBlobTargets = collectReferencedBlogBlobTargets({
      featuredImage: existingPost.featuredImage,
      content: existingPost.content,
      galleryImages: existingPost.galleryImages,
    });

    const nextBlobTargets = new Set(
      collectReferencedBlogBlobTargets({
        featuredImage: normalizedInput.featuredImage,
        content: normalizedInput.content,
        galleryImages: existingPost.galleryImages,
      })
    );

    const removedBlobTargets = previousBlobTargets.filter((target) => !nextBlobTargets.has(target));

    if (removedBlobTargets.length > 0) {
      try {
        await deleteBlogImages(removedBlobTargets);
      } catch (error) {
        console.warn('Error deleting removed post blobs from storage:', error);
      }
    }

    return NextResponse.json(updatedPost);
  } catch (error: any) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete post
export async function DELETE(
  _request: NextRequest,
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
      select: {
        id: true,
        featuredImage: true,
        content: true,
        galleryImages: {
          select: { pathname: true, url: true },
        },
      },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    await prisma.post.delete({
      where: { id },
    });

    const blobTargets = collectReferencedBlogBlobTargets({
      featuredImage: post.featuredImage,
      content: post.content,
      galleryImages: post.galleryImages,
    });

    if (blobTargets.length > 0) {
      try {
        await deleteBlogImages(blobTargets);
      } catch (error) {
        console.warn('Error deleting post blobs from storage:', error);
      }
    }

    return NextResponse.json({ success: true, message: 'Post deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
