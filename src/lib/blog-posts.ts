import { prisma } from './prisma';

export interface BlogListItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  authorName: string;
  readTimeMinutes: number;
  featured: boolean;
  featuredImage: string | null;
  publishedAt: string;
  createdAt: string;
}

export interface BlogGalleryImageItem {
  id: string;
  url: string;
  altText: string | null;
  caption: string | null;
  sortOrder: number;
}

export interface BlogPostDetail extends BlogListItem {
  content: string;
  updatedAt: string;
  galleryImages: BlogGalleryImageItem[];
}

const blogListSelect = {
  id: true,
  title: true,
  slug: true,
  excerpt: true,
  category: true,
  authorName: true,
  readTimeMinutes: true,
  featured: true,
  featuredImage: true,
  publishedAt: true,
  createdAt: true,
} as const;

const blogDetailSelect = {
  ...blogListSelect,
  content: true,
  updatedAt: true,
  galleryImages: {
    select: {
      id: true,
      url: true,
      altText: true,
      caption: true,
      sortOrder: true,
    },
    orderBy: { sortOrder: 'asc' },
  },
} as const;

function getPublishedDate(post: {
  publishedAt: Date | null;
  createdAt: Date;
}): Date {
  return post.publishedAt ?? post.createdAt;
}

function mapBlogListItem(post: {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string;
  authorName: string | null;
  readTimeMinutes: number;
  featured: boolean;
  featuredImage: string | null;
  publishedAt: Date | null;
  createdAt: Date;
}): BlogListItem {
  const publishedDate = getPublishedDate(post);

  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || '',
    category: post.category,
    authorName: post.authorName || 'Severius Adventures & Travel',
    readTimeMinutes: post.readTimeMinutes,
    featured: post.featured,
    featuredImage: post.featuredImage,
    publishedAt: publishedDate.toISOString(),
    createdAt: post.createdAt.toISOString(),
  };
}

function mapBlogPostDetail(post: {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string;
  authorName: string | null;
  readTimeMinutes: number;
  featured: boolean;
  featuredImage: string | null;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  galleryImages: Array<{
    id: string;
    url: string;
    altText: string | null;
    caption: string | null;
    sortOrder: number;
  }>;
}): BlogPostDetail {
  const listItem = mapBlogListItem(post);

  return {
    ...listItem,
    content: post.content,
    updatedAt: post.updatedAt.toISOString(),
    galleryImages: post.galleryImages,
  };
}

export function formatBlogReadTime(readTimeMinutes: number): string {
  return `${readTimeMinutes} min read`;
}

export async function getPublishedBlogPosts(): Promise<BlogListItem[]> {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: blogListSelect,
    orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }, { createdAt: 'desc' }],
  });

  return posts.map(mapBlogListItem);
}

export async function getPublishedBlogPostBySlug(
  slug: string
): Promise<BlogPostDetail | null> {
  const post = await prisma.post.findFirst({
    where: { slug, published: true },
    select: blogDetailSelect,
  });

  return post ? mapBlogPostDetail(post) : null;
}

export async function getRelatedBlogPosts(
  currentSlug: string,
  category: string,
  limit: number = 3
): Promise<BlogListItem[]> {
  const relatedPosts = await prisma.post.findMany({
    where: {
      published: true,
      slug: { not: currentSlug },
      category,
    },
    select: blogListSelect,
    orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
    take: limit,
  });

  if (relatedPosts.length >= limit) {
    return relatedPosts.map(mapBlogListItem);
  }

  const fallbackPosts = await prisma.post.findMany({
    where: {
      published: true,
      slug: {
        notIn: [currentSlug, ...relatedPosts.map((post) => post.slug)],
      },
    },
    select: blogListSelect,
    orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }, { createdAt: 'desc' }],
    take: limit - relatedPosts.length,
  });

  return [...relatedPosts, ...fallbackPosts].map(mapBlogListItem);
}