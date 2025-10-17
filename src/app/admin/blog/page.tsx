import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { AdminLayout } from '@/components/admin/admin-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { BlogTable } from '@/components/admin/blog-table';

export default async function AdminBlogPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: { name: true, email: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-[rgb(var(--color-brown))]">Blog Management</h2>
          <Link href="/admin/blog/new">
            <Button className="bg-[rgb(var(--color-gold))] hover:bg-[rgb(var(--color-gold))]/90">
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </Link>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-neutral-600">Total Posts</p>
              <p className="text-2xl font-bold text-[rgb(var(--color-brown))]">{posts.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-neutral-600">Published</p>
              <p className="text-2xl font-bold text-green-600">{posts.filter(p => p.published).length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-neutral-600">Drafts</p>
              <p className="text-2xl font-bold text-orange-600">{posts.filter(p => !p.published).length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Posts Table with Pagination */}
        <BlogTable posts={posts} itemsPerPage={10} />
      </div>
    </AdminLayout>
  );
}
