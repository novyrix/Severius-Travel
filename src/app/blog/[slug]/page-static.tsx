import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Clock, User, ArrowLeft, Share2, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getBlogPostBySlug, getRelatedPosts } from "@/data/blog-posts";
import ReactMarkdown from 'react-markdown';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Severius Travel Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Article Header */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-amber-600 hover:bg-amber-700">
              <Tag className="w-3 h-3 mr-1" />
              {post.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="container mx-auto px-6 -mt-12">
        <div className="max-w-5xl mx-auto">
          <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <article className="lg:col-span-8">
            <Card className="shadow-lg">
              <CardContent className="p-8 md:p-12">
                <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-amber-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:my-6 prose-li:my-2 prose-table:my-8 prose-th:bg-gray-100 prose-th:p-3 prose-td:p-3 prose-td:border-gray-200">
                  <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>

                {/* Author Bio */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-2xl">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">
                        {post.author}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        Travel Expert & Safari Specialist at Severius Adventures & Travel.
                        Passionate about sharing authentic African safari experiences and helping travelers
                        discover the magic of East and Southern Africa.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Share Section */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Share this article
                    </span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Section */}
            <Card className="mt-8 bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Ready to Plan Your African Safari?
                </h3>
                <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                  Let our expert team help you create the perfect safari itinerary tailored to your dreams.
                  Whether you choose the Maasai Mara, Serengeti, or both, we'll make it unforgettable.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Link href="/contact">
                    <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
                      Contact Our Safari Experts
                    </Button>
                  </Link>
                  <Link href="/tours">
                    <Button size="lg" variant="outline">
                      Browse Safari Tours
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            {/* Related Posts */}
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-6 text-gray-900">
                  Related Articles
                </h3>
                <div className="space-y-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      href={`/blog/${relatedPost.slug}`}
                      className="group block"
                    >
                      <div className="relative h-32 rounded-lg overflow-hidden mb-3">
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h4 className="font-semibold text-sm text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-600">
                        <Clock className="w-3 h-3" />
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </Link>
                  ))}
                </div>

                <Link href="/blog" className="block mt-6">
                  <Button variant="outline" className="w-full">
                    View All Articles
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card className="mt-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-3">
                  Safari Inspiration
                </h3>
                <p className="text-sm text-gray-300 mb-4">
                  Get exclusive safari tips, destination guides, and special offers delivered to your inbox.
                </p>
                <Link href="/contact">
                  <Button className="w-full bg-amber-600 hover:bg-amber-700">
                    Subscribe Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
}
