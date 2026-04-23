import { PrismaClient } from '@prisma/client';
import { loadEnvConfig } from '@next/env';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { blogPostsData } from '../src/data/blog-posts';
import { DEFAULT_BLOG_CATEGORY, parseReadTimeLabel } from '../src/lib/blog';

loadEnvConfig(process.cwd());

const prisma = new PrismaClient();

function renderMarkdownToHtml(markdown: string): string {
  return renderToStaticMarkup(
    createElement(ReactMarkdown, { remarkPlugins: [remarkGfm] }, markdown)
  );
}

async function main() {
  const adminUser = await prisma.user.findFirst({
    where: { role: 'ADMIN' },
    select: { id: true },
  });

  let createdCount = 0;
  let updatedCount = 0;

  for (const post of blogPostsData) {
    const existingPost = await prisma.post.findUnique({
      where: { slug: post.slug },
      select: { id: true },
    });

    const postData = {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: renderMarkdownToHtml(post.content),
      featuredImage: post.image,
      authorName: post.author,
      category: post.category || DEFAULT_BLOG_CATEGORY,
      readTimeMinutes: parseReadTimeLabel(post.readTime),
      featured: post.featured,
      published: true,
      publishedAt: post.createdAt,
      authorId: adminUser?.id ?? null,
    };

    await prisma.post.upsert({
      where: { slug: post.slug },
      create: {
        ...postData,
        createdAt: post.createdAt,
        updatedAt: post.createdAt,
      },
      update: postData,
    });

    if (existingPost) {
      updatedCount += 1;
    } else {
      createdCount += 1;
    }
  }

  console.log(
    `Imported ${blogPostsData.length} blog posts (${createdCount} created, ${updatedCount} updated).`
  );
}

main()
  .catch((error) => {
    console.error('Failed to import blog posts:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });