import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { AdminLayout } from '@/components/admin/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, Plane, Calendar, DollarSign, Eye } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminAnalyticsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  // Fetch analytics data
  const [
    totalUsers,
    totalTours,
    totalBookings,
    totalRevenue,
    recentBookings,
    topTours,
    userGrowth,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.tour.count(),
    prisma.booking.count(),
    prisma.booking.aggregate({
      where: { status: 'PAID' },
      _sum: { amount: true },
    }),
    prisma.booking.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        tour: { select: { title: true } },
        user: { select: { name: true, email: true } },
      },
    }),
    prisma.booking.groupBy({
      by: ['tourId'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 5,
    }),
    prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
        },
      },
    }),
  ]);

  // Get tour details for top tours
  const topTourIds = topTours.map((t) => t.tourId);
  const tourDetails = await prisma.tour.findMany({
    where: { id: { in: topTourIds } },
    select: { id: true, title: true },
  });

  const topToursWithDetails = topTours.map((t) => ({
    ...t,
    tour: tourDetails.find((td) => td.id === t.tourId),
  }));

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <h2 className="text-3xl font-bold text-[rgb(var(--color-brown))]">Analytics Dashboard</h2>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600">Total Users</p>
                  <p className="text-2xl font-bold text-[rgb(var(--color-brown))]">{totalUsers}</p>
                  <p className="text-xs text-green-600 mt-1">+{userGrowth} this month</p>
                </div>
                <Users className="w-10 h-10 text-blue-500 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600">Total Tours</p>
                  <p className="text-2xl font-bold text-[rgb(var(--color-brown))]">{totalTours}</p>
                  <p className="text-xs text-neutral-500 mt-1">Active listings</p>
                </div>
                <Plane className="w-10 h-10 text-green-500 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-[rgb(var(--color-brown))]">{totalBookings}</p>
                  <p className="text-xs text-neutral-500 mt-1">All time</p>
                </div>
                <Calendar className="w-10 h-10 text-purple-500 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-[rgb(var(--color-brown))]">
                    ${totalRevenue._sum.amount?.toLocaleString() || 0}
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">Paid bookings</p>
                </div>
                <DollarSign className="w-10 h-10 text-[rgb(var(--color-gold))] opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Tours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Top Performing Tours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topToursWithDetails.map((item, index) => (
                <div
                  key={item.tourId}
                  className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[rgb(var(--color-gold))] text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{item.tour?.title || 'Unknown Tour'}</p>
                      <p className="text-sm text-neutral-500">{item._count.id} bookings</p>
                    </div>
                  </div>
                  <Eye className="w-5 h-5 text-neutral-400" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr className="text-left">
                    <th className="pb-3 text-sm font-medium text-neutral-600">User</th>
                    <th className="pb-3 text-sm font-medium text-neutral-600">Tour</th>
                    <th className="pb-3 text-sm font-medium text-neutral-600">Date</th>
                    <th className="pb-3 text-sm font-medium text-neutral-600">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="border-b last:border-0">
                      <td className="py-3 text-sm">
                        {booking.user?.name || booking.user?.email || 'Unknown'}
                      </td>
                      <td className="py-3 text-sm">{booking.tour.title}</td>
                      <td className="py-3 text-sm">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 text-sm font-medium">
                        ${booking.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Placeholder for Charts */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-neutral-50 rounded-lg border-2 border-dashed border-neutral-300">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-neutral-400 mx-auto mb-2" />
                <p className="text-neutral-500">Charts coming soon</p>
                <p className="text-sm text-neutral-400">
                  Install a charting library (e.g., Chart.js, Recharts)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
