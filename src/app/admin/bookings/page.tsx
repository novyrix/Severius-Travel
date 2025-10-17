import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { AdminLayout } from '@/components/admin/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminBookingsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  const [bookings, stats] = await Promise.all([
    prisma.booking.findMany({
      include: {
        user: { select: { name: true, email: true } },
        tour: { select: { title: true, slug: true } }
      },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.booking.aggregate({
      _count: true,
      _sum: { amount: true }
    })
  ]);

  const statusCounts = {
    PENDING: bookings.filter(b => b.status === 'PENDING').length,
    PAID: bookings.filter(b => b.status === 'PAID').length,
    CANCELLED: bookings.filter(b => b.status === 'CANCELLED').length
  };

  const getStatusBadge = (status: string) => {
    const config = {
      PENDING: { variant: 'secondary' as const, icon: Clock, color: 'text-orange-600' },
      PAID: { variant: 'success' as const, icon: CheckCircle, color: 'text-green-600' },
      CANCELLED: { variant: 'destructive' as const, icon: XCircle, color: 'text-red-600' }
    };
    const { variant, icon: Icon, color } = config[status as keyof typeof config] || config.PENDING;
    return (
      <Badge variant={variant} className="flex items-center gap-1">
        <Icon className={`w-3 h-3 ${color}`} />
        {status}
      </Badge>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <h2 className="text-3xl font-bold text-[rgb(var(--color-brown))]">Booking Management</h2>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-neutral-600">Total Bookings</p>
              <p className="text-2xl font-bold text-[rgb(var(--color-brown))]">{bookings.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-neutral-600">Pending</p>
              <p className="text-2xl font-bold text-orange-600">{statusCounts.PENDING}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-neutral-600">Paid</p>
              <p className="text-2xl font-bold text-green-600">{statusCounts.PAID}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-neutral-600">Total Revenue</p>
              <p className="text-2xl font-bold text-[rgb(var(--color-gold))]">
                {formatCurrency(stats._sum.amount || 0)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Bookings Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr className="text-left">
                    <th className="pb-3 text-sm font-medium text-neutral-600">Reference</th>
                    <th className="pb-3 text-sm font-medium text-neutral-600">Customer</th>
                    <th className="pb-3 text-sm font-medium text-neutral-600">Tour</th>
                    <th className="pb-3 text-sm font-medium text-neutral-600">Amount</th>
                    <th className="pb-3 text-sm font-medium text-neutral-600">Status</th>
                    <th className="pb-3 text-sm font-medium text-neutral-600">Booked</th>
                    <th className="pb-3 text-sm font-medium text-neutral-600 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="border-b last:border-0 hover:bg-neutral-50">
                      <td className="py-4">
                        <code className="text-sm bg-neutral-100 px-2 py-1 rounded">
                          {booking.ref}
                        </code>
                      </td>
                      <td className="py-4">
                        <div>
                          <p className="text-sm font-medium">{booking.user.name || 'N/A'}</p>
                          <p className="text-xs text-neutral-500">{booking.user.email}</p>
                        </div>
                      </td>
                      <td className="py-4">
                        <p className="text-sm font-medium text-[rgb(var(--color-brown))]">
                          {booking.tour.title}
                        </p>
                      </td>
                      <td className="py-4 text-sm font-medium">
                        {formatCurrency(booking.amount)}
                      </td>
                      <td className="py-4">{getStatusBadge(booking.status)}</td>
                      <td className="py-4 text-sm text-neutral-500">
                        {new Date(booking.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
