import type { PutBlobResult } from '@vercel/blob';
import { upload } from '@vercel/blob/client';
import {
  BLOG_IMAGE_MAX_BYTES,
  BlogImagePurpose,
  buildBlogImagePath,
  isAllowedBlogImageContentType,
} from './blog-images';

function validateImageFile(file: File) {
  if (!file.size) {
    throw new Error('Image file is required.');
  }

  if (file.size > BLOG_IMAGE_MAX_BYTES) {
    throw new Error('Image must be 10MB or smaller.');
  }

  if (!isAllowedBlogImageContentType(file.type)) {
    throw new Error('Unsupported image format. Use JPG, PNG, or WebP.');
  }
}

export async function uploadBlogImageFromClient(
  file: File,
  purpose: BlogImagePurpose
): Promise<PutBlobResult> {
  validateImageFile(file);

  return upload(buildBlogImagePath(file.name, file.type, purpose), file, {
    access: 'public',
    contentType: file.type,
    handleUploadUrl: '/api/admin/blog/images',
    clientPayload: JSON.stringify({ purpose }),
    multipart: file.size >= 5 * 1024 * 1024,
  });
}