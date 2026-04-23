import { slugify } from './utils';

export const DEFAULT_BLOG_CATEGORY = 'Travel Tips';
export const BLOG_CATEGORY_OPTIONS = [
  DEFAULT_BLOG_CATEGORY,
  'Safari Guides',
  'Destinations',
  'Island Escapes',
] as const;

function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]+>/g, ' ');
}

function parseDateValue(value: unknown): Date | null {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value;
  }

  if (typeof value === 'string' && value.trim()) {
    const parsedDate = new Date(value);
    if (!Number.isNaN(parsedDate.getTime())) {
      return parsedDate;
    }
  }

  return null;
}

export function coerceBoolean(value: unknown): boolean {
  return value === true || value === 'true';
}

export function estimateReadTimeMinutes(content: string): number {
  const normalizedText = normalizeWhitespace(stripHtml(content));
  if (!normalizedText) {
    return 1;
  }

  const wordCount = normalizedText.split(' ').length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

export function parseReadTimeLabel(value: string | null | undefined): number {
  if (!value) {
    return 5;
  }

  const matchedNumber = value.match(/\d+/);
  if (!matchedNumber) {
    return 5;
  }

  return Math.max(1, parseInt(matchedNumber[0], 10));
}

interface NormalizeBlogPostOptions {
  defaultAuthorName?: string | null;
  existingPublishedAt?: Date | null;
}

interface BlogPostInput {
  title?: unknown;
  slug?: unknown;
  excerpt?: unknown;
  content?: unknown;
  featuredImage?: unknown;
  authorName?: unknown;
  category?: unknown;
  readTimeMinutes?: unknown;
  featured?: unknown;
  published?: unknown;
  publishedAt?: unknown;
}

export interface NormalizedBlogPostInput {
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featuredImage: string | null;
  authorName: string | null;
  category: string;
  readTimeMinutes: number;
  featured: boolean;
  published: boolean;
  publishedAt: Date | null;
}

export function normalizeBlogPostInput(
  input: BlogPostInput,
  options: NormalizeBlogPostOptions = {}
): NormalizedBlogPostInput {
  const title = typeof input.title === 'string' ? normalizeWhitespace(input.title) : '';
  if (!title) {
    throw new Error('Title is required');
  }

  const content = typeof input.content === 'string' ? input.content.trim() : '';
  if (!content) {
    throw new Error('Content is required');
  }

  const slugSource = typeof input.slug === 'string' && input.slug.trim() ? input.slug : title;
  const slug = slugify(slugSource);
  if (!slug) {
    throw new Error('Slug is required');
  }

  const excerptValue = typeof input.excerpt === 'string' ? normalizeWhitespace(input.excerpt) : '';
  const featuredImageValue = typeof input.featuredImage === 'string' ? input.featuredImage.trim() : '';
  const categoryValue = typeof input.category === 'string' ? normalizeWhitespace(input.category) : '';
  const authorNameValue = typeof input.authorName === 'string' ? normalizeWhitespace(input.authorName) : '';

  const published = coerceBoolean(input.published);
  const featured = coerceBoolean(input.featured);

  let readTimeMinutes = estimateReadTimeMinutes(content);
  if (typeof input.readTimeMinutes === 'number' && Number.isFinite(input.readTimeMinutes)) {
    readTimeMinutes = Math.max(1, Math.ceil(input.readTimeMinutes));
  } else if (typeof input.readTimeMinutes === 'string' && input.readTimeMinutes.trim()) {
    readTimeMinutes = parseReadTimeLabel(input.readTimeMinutes);
  }

  const publishedAt = published
    ? parseDateValue(input.publishedAt) ?? options.existingPublishedAt ?? new Date()
    : null;

  return {
    title,
    slug,
    excerpt: excerptValue || null,
    content,
    featuredImage: featuredImageValue || null,
    authorName: authorNameValue || options.defaultAuthorName || null,
    category: categoryValue || DEFAULT_BLOG_CATEGORY,
    readTimeMinutes,
    featured,
    published,
    publishedAt,
  };
}