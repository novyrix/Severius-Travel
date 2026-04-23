import { NextRequest, NextResponse } from 'next/server';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import {
  BLOG_IMAGE_ALLOWED_CONTENT_TYPES,
  BLOG_IMAGE_MAX_BYTES,
  parseBlogUploadClientPayload,
} from '@/lib/blog-images';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
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
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { error: 'BLOB_READ_WRITE_TOKEN is not configured.' },
        { status: 500 }
      );
    }

    const body = (await request.json()) as HandleUploadBody;
    const response = await handleUpload({
      request,
      body,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        if (!pathname.startsWith('blog/')) {
          throw new Error('Invalid upload path.');
        }

        const payload = parseBlogUploadClientPayload(clientPayload);
        if (!payload) {
          throw new Error('Invalid upload payload.');
        }

        return {
          allowedContentTypes: [...BLOG_IMAGE_ALLOWED_CONTENT_TYPES],
          maximumSizeInBytes: BLOG_IMAGE_MAX_BYTES,
          addRandomSuffix: true,
        };
      },
    });

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error uploading blog image:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}