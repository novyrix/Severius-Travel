export const BLOG_IMAGE_MAX_BYTES = 10 * 1024 * 1024;
export const BLOG_IMAGE_ALLOWED_CONTENT_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
] as const;

export const BLOG_BLOB_HOSTNAME_PATTERN = '**.public.blob.vercel-storage.com';

export type BlogImagePurpose = 'featured' | 'inline' | 'gallery';

const extensionByContentType: Record<(typeof BLOG_IMAGE_ALLOWED_CONTENT_TYPES)[number], string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

function sanitizePathSegment(value: string): string {
  return value
    .toLowerCase()
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

export function isAllowedBlogImageContentType(contentType: string): boolean {
  return (BLOG_IMAGE_ALLOWED_CONTENT_TYPES as readonly string[]).includes(contentType.toLowerCase());
}

export function getBlogImageExtension(fileName: string, contentType: string): string {
  const normalizedType = contentType.toLowerCase();
  if (isAllowedBlogImageContentType(normalizedType)) {
    return extensionByContentType[normalizedType as keyof typeof extensionByContentType];
  }

  const extension = fileName.split('.').pop()?.toLowerCase();
  if (extension === 'jpg' || extension === 'jpeg') {
    return 'jpg';
  }
  if (extension === 'png' || extension === 'webp') {
    return extension;
  }

  throw new Error('Unsupported image format. Use JPG, PNG, or WebP.');
}

export function buildBlogImagePath(
  fileName: string,
  contentType: string,
  purpose: BlogImagePurpose,
  now: Date = new Date()
): string {
  const extension = getBlogImageExtension(fileName, contentType);
  const safeBaseName = sanitizePathSegment(fileName) || `${purpose}-image`;
  const year = String(now.getUTCFullYear());
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');

  return `blog/${purpose}/${year}/${month}/${safeBaseName}.${extension}`;
}

export function isVercelBlobUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'https:' && parsed.hostname.endsWith('.public.blob.vercel-storage.com');
  } catch {
    return false;
  }
}

export function extractVercelBlobUrlsFromHtml(html: string): string[] {
  const matches = html.match(/https?:\/\/[^\s"'<>]+/g) ?? [];
  return Array.from(new Set(matches.filter(isVercelBlobUrl)));
}

interface ReferencedBlogBlobImage {
  pathname: string | null;
  url: string | null;
}

interface ReferencedBlogBlobOptions {
  featuredImage?: string | null;
  content: string;
  galleryImages?: ReferencedBlogBlobImage[];
}

export function collectReferencedBlogBlobTargets({
  featuredImage,
  content,
  galleryImages = [],
}: ReferencedBlogBlobOptions): string[] {
  return Array.from(
    new Set([
      ...(featuredImage && isVercelBlobUrl(featuredImage) ? [featuredImage] : []),
      ...extractVercelBlobUrlsFromHtml(content),
      ...galleryImages
        .map((image) => image.pathname || image.url)
        .filter((value): value is string => Boolean(value)),
    ])
  );
}

export function parseBlogUploadClientPayload(value: string | null): { purpose: BlogImagePurpose } | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as { purpose?: string };
    if (parsed.purpose === 'featured' || parsed.purpose === 'inline' || parsed.purpose === 'gallery') {
      return { purpose: parsed.purpose };
    }
  } catch {
    return null;
  }

  return null;
}