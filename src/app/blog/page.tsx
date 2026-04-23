import { BlogIndexClient } from '@/components/blog/blog-index-client';
import { getPublishedBlogPosts } from '@/lib/blog-posts';

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();

  return <BlogIndexClient posts={posts} />;
}
