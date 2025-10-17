'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/ui/pagination';
import { Edit, Eye } from 'lucide-react';
import Link from 'next/link';
import { BlogActions } from '@/components/admin/blog-actions';

interface Post {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  createdAt: Date;
  author: {
    name: string | null;
    email: string;
  } | null;
}

interface BlogTableProps {
  posts: Post[];
  itemsPerPage?: number;
}

export function BlogTable({ posts, itemsPerPage = 10 }: BlogTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(posts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Posts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr className="text-left">
                <th className="pb-3 text-sm font-medium text-neutral-600">Title</th>
                <th className="pb-3 text-sm font-medium text-neutral-600">Author</th>
                <th className="pb-3 text-sm font-medium text-neutral-600">Date</th>
                <th className="pb-3 text-sm font-medium text-neutral-600">Status</th>
                <th className="pb-3 text-sm font-medium text-neutral-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((post) => (
                <tr key={post.id} className="border-b last:border-0 hover:bg-neutral-50">
                  <td className="py-4">
                    <div>
                      <p className="font-medium text-[rgb(var(--color-brown))]">{post.title}</p>
                      <p className="text-sm text-neutral-500">{post.slug}</p>
                    </div>
                  </td>
                  <td className="py-4 text-sm">
                    {post.author?.name || post.author?.email || 'Unknown'}
                  </td>
                  <td className="py-4 text-sm">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4">
                    <Badge variant={post.published ? 'success' : 'secondary'}>
                      {post.published ? 'Published' : 'Draft'}
                    </Badge>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/blog/${post.slug}`} target="_blank">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Link href={`/admin/blog/${post.id}/edit`}>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <BlogActions 
                        postId={post.id} 
                        postTitle={post.title}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={posts.length}
            itemsPerPage={itemsPerPage}
          />
        )}
      </CardContent>
    </Card>
  );
}
