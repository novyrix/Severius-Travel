import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { BlogEditForm } from '@/components/admin/blog-edit-form';

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  // Fetch the blog post
  const post = await prisma.post.findUnique({
    where: { id: params.id },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });

  if (!post) {
    redirect('/admin/blog');
  }

  return <BlogEditForm post={post} />;
}
