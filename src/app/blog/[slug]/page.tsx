import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  return await prisma.post.findUnique({ where: { slug } });
}

async function getRelatedPosts(currentPostId: string) {
  return await prisma.post.findMany({
    where: {
      published: true,
      NOT: {
        id: currentPostId,
      },
    },
    take: 3,
    orderBy: { createdAt: "desc" },
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Severius Travel Blog`,
    description: post.excerpt || post.content.slice(0, 160),
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post || !post.published) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.id);

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Article Header */}
      <section className="bg-white border-b border-neutral-200 py-8">
        <div className="container mx-auto px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[rgb(var(--color-gold))] hover:text-[rgb(var(--color-brown))] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="max-w-4xl">
            <Badge className="mb-4">Travel Guide</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-[rgb(var(--color-brown))] mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Severius Team</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>5 min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <article className="lg:col-span-8">
            <Card className="mb-8">
              <CardContent className="p-8 md:p-12">
                <div className="prose prose-lg max-w-none">
                  <p className="text-xl text-neutral-700 leading-relaxed mb-8">
                    {post.excerpt}
                  </p>
                  <div className="text-neutral-800 leading-relaxed space-y-4 whitespace-pre-line">
                    {post.content}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Share Section */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-[rgb(var(--color-brown))]">
                    Share this article
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            {/* About Author */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <h3 className="font-semibold text-[rgb(var(--color-brown))] mb-4">
                  About Severius Travel
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                  Your trusted partner for unforgettable travel experiences across
                  the globe. We share travel tips, guides, and stories to inspire
                  your next adventure.
                </p>
                <Link href="/about">
                  <Button variant="outline" size="sm" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-[rgb(var(--color-brown))] mb-4">
                    Related Articles
                  </h3>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.id}
                        href={`/blog/${relatedPost.slug}`}
                        className="block group"
                      >
                        <h4 className="font-medium text-neutral-900 group-hover:text-[rgb(var(--color-gold))] transition-colors mb-2 line-clamp-2">
                          {relatedPost.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-neutral-500">
                          <Calendar className="w-3 h-3" />
                          {formatDate(relatedPost.createdAt)}
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </aside>
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[rgb(var(--color-brown))] to-[rgb(var(--color-gold))] py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Explore?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Browse our curated tours and start planning your next adventure today.
          </p>
          <Link href="/tours">
            <Button
              size="lg"
              className="bg-white text-[rgb(var(--color-brown))] hover:bg-white/90 font-semibold"
            >
              View All Tours
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
