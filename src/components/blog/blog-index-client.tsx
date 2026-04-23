'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Search, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { formatBlogReadTime, type BlogListItem } from '@/lib/blog-posts';

interface BlogIndexClientProps {
  posts: BlogListItem[];
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

export function BlogIndexClient({ posts }: BlogIndexClientProps) {
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(posts.map((post) => post.category))).sort()],
    [posts]
  );

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    let nextPosts = posts;

    if (selectedCategory !== 'All') {
      nextPosts = nextPosts.filter((post) => post.category === selectedCategory);
    }

    if (searchQuery) {
      const normalizedQuery = searchQuery.toLowerCase();
      nextPosts = nextPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(normalizedQuery) ||
          post.excerpt.toLowerCase().includes(normalizedQuery)
      );
    }

    setFilteredPosts(nextPosts);
  }, [posts, searchQuery, selectedCategory]);

  const featuredPost =
    selectedCategory === 'All' && !searchQuery ? posts.find((post) => post.featured) || null : null;
  const regularPosts = filteredPosts.filter((post) => post.id !== featuredPost?.id);

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 text-white">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 50%, white 0%, transparent 50%), radial-gradient(circle at 80% 80%, white 0%, transparent 50%)',
            }}
          />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 bg-amber-600 hover:bg-amber-700">Travel Blog</Badge>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">Stories & Guides</h1>
            <p className="mb-8 text-xl text-gray-300">
              Expert travel tips, destination guides, and inspiring stories from around the world
            </p>

            <div className="mx-auto max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="w-full border-white/20 bg-white/10 py-6 pl-12 pr-4 text-lg text-white placeholder:text-gray-400 focus:bg-white/20"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sticky top-0 z-20 border-b border-gray-200 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {featuredPost && (
          <section className="mb-16">
            <div className="mb-6 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-amber-600" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                Featured Article
              </h2>
            </div>
            <Link href={`/blog/${featuredPost.slug}`} className="group block">
              <Card className="overflow-hidden border-2 transition-all duration-300 hover:shadow-2xl">
                <div className="grid gap-0 lg:grid-cols-2">
                  <div className="relative h-80 overflow-hidden bg-gray-100 lg:h-auto">
                    {featuredPost.featuredImage ? (
                      <Image
                        src={featuredPost.featuredImage}
                        alt={featuredPost.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-amber-300" />
                    )}
                    <div className="absolute left-4 top-4">
                      <Badge className="bg-amber-600">{featuredPost.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="flex flex-col justify-center p-8 lg:p-12">
                    <h3 className="mb-4 text-3xl font-bold text-gray-900 transition-colors group-hover:text-amber-600 lg:text-4xl">
                      {featuredPost.title}
                    </h3>
                    <p className="mb-6 text-lg leading-relaxed text-gray-600">{featuredPost.excerpt}</p>
                    <div className="mb-6 flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {formatDate(featuredPost.publishedAt)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {formatBlogReadTime(featuredPost.readTimeMinutes)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 font-semibold text-amber-600 transition-all group-hover:gap-3">
                      Read Article
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </section>
        )}

        <section>
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-900">
              {selectedCategory === 'All' ? 'Latest Articles' : selectedCategory}
            </h2>
            <p className="text-gray-500">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
            </p>
          </div>

          {regularPosts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {regularPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                  <Card className="h-full overflow-hidden border transition-all duration-300 hover:shadow-xl">
                    <div className="relative h-56 overflow-hidden bg-gray-100">
                      {post.featuredImage ? (
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-amber-300" />
                      )}
                      <div className="absolute left-4 top-4">
                        <Badge className="bg-white text-gray-900 hover:bg-white">{post.category}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="mb-3 flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDate(post.publishedAt)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {formatBlogReadTime(post.readTimeMinutes)}
                        </div>
                      </div>
                      <h3 className="mb-3 line-clamp-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-amber-600">
                        {post.title}
                      </h3>
                      <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">By {post.authorName}</span>
                        <div className="flex items-center gap-2 text-sm font-medium text-amber-600 transition-all group-hover:gap-3">
                          Read
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card className="border-2 border-dashed p-12 text-center">
              <div className="mb-4 text-6xl">📝</div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">No articles found</h3>
              <p className="mb-6 text-gray-600">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <Button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                variant="outline"
                className="border-2 border-amber-600 text-amber-600 hover:bg-amber-50"
              >
                Clear Filters
              </Button>
            </Card>
          )}
        </section>

        {regularPosts.length >= 6 && (
          <div className="mt-12 text-center">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-gray-300 hover:border-amber-600 hover:text-amber-600"
            >
              Load More Articles
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}