import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { AdminLayout } from '@/components/admin/admin-layout';
import { TourForm } from '@/components/admin/tour-form';

export default async function NewTourPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  const countries = await prisma.country.findMany({
    include: {
      region: true
    },
    orderBy: { name: 'asc' }
  });

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-[rgb(var(--color-brown))]">Create New Tour</h2>
        <TourForm countries={countries} mode="create" />
      </div>
    </AdminLayout>
  );
}
