import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { AdminLayout } from '@/components/admin/admin-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { ToursTable } from '@/components/admin/tours-table';

export default async function AdminToursPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  const tours = await prisma.tour.findMany({
    include: {
      country: {
        include: {
          region: true
        }
      },
      bookings: true,
      images: {
        take: 1
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-[rgb(var(--color-brown))]">Tour Management</h2>
          <Link href="/admin/tours/new">
            <Button className="bg-[rgb(var(--color-gold))] hover:bg-[rgb(var(--color-gold))]/90">
              <Plus className="w-4 h-4 mr-2" />
              Add New Tour
            </Button>
          </Link>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-neutral-600">Total Tours</p>
              <p className="text-2xl font-bold text-[rgb(var(--color-brown))]">{tours.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-neutral-600">Published</p>
              <p className="text-2xl font-bold text-green-600">{tours.filter(t => t.published).length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-neutral-600">Drafts</p>
              <p className="text-2xl font-bold text-orange-600">{tours.filter(t => !t.published).length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-neutral-600">Total Bookings</p>
              <p className="text-2xl font-bold text-blue-600">
                {tours.reduce((acc, tour) => acc + tour.bookings.length, 0)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tours Table with Pagination */}
        <ToursTable tours={tours} itemsPerPage={10} />
      </div>
    </AdminLayout>
  );
}
