import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth';
import { prisma } from '../../lib/prisma';
import { redirect } from 'next/navigation';
import { AdminLayout } from '@/components/admin/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate } from '@/lib/utils';
import { GlassCard } from '@/components/admin/glass-card';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const session = await getServerSession(authOptions as any) as any;
  if (!session) redirect('/login');

  // Get statistics
  const [
    totalUsers,
    totalTours,
    totalPosts,
    totalBookings,
    pendingBookings,
    revenue,
    recentBookings,
    newsletterSubscribers
  ] = await Promise.all([
    prisma.user.count(),
    prisma.tour.count({ where: { published: true } }),
    prisma.post.count({ where: { published: true } }),
    prisma.booking.count(),
    prisma.booking.count({ where: { status: 'PENDING' } }),
    prisma.booking.aggregate({
      where: { status: 'PAID' },
      _sum: { amount: true }
    }),
    prisma.booking.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: { tour: true, user: true }
    }),
    prisma.newsletter.count({ where: { subscribed: true } })
  ]);

  return (
    <AdminLayout>
      {/* Gradient Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-amber-50 via-white to-yellow-50" />
      
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[rgb(var(--color-brown))] to-[rgb(var(--color-gold))] p-8 text-white shadow-2xl">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">Welcome back, {session.user?.name || 'Admin'}! 👋</h1>
            <p className="text-white/80">Here's what's happening with your tours today.</p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
        </div>

        {/* Statistics Grid with Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/admin/users">
            <GlassCard
              title="Total Users"
              value={totalUsers}
              iconName="Users"
              gradient="from-blue-500/20 to-indigo-500/20"
              delay={0}
              trend={{ value: 12, isPositive: true }}
            />
          </Link>

          <Link href="/admin/tours">
            <GlassCard
              title="Active Tours"
              value={totalTours}
              iconName="Plane"
              gradient="from-green-500/20 to-emerald-500/20"
              delay={0.1}
              trend={{ value: 8, isPositive: true }}
            />
          </Link>

          <Link href="/admin/bookings">
            <GlassCard
              title="Total Bookings"
              value={totalBookings}
              iconName="Calendar"
              gradient="from-orange-500/20 to-red-500/20"
              delay={0.2}
            />
          </Link>

          <Link href="/admin/bookings">
            <GlassCard
              title="Revenue"
              value={formatCurrency(revenue._sum.amount || 0)}
              iconName="DollarSign"
              gradient="from-yellow-500/20 to-amber-500/20"
              delay={0.3}
              trend={{ value: 15, isPositive: true }}
            />
          </Link>

          <Link href="/admin/blog">
            <GlassCard
              title="Published Posts"
              value={totalPosts}
              iconName="FileText"
              gradient="from-purple-500/20 to-pink-500/20"
              delay={0.4}
            />
          </Link>

          <Link href="/admin/bookings?status=pending">
            <GlassCard
              title="Pending Bookings"
              value={pendingBookings}
              iconName="Clock"
              gradient="from-red-500/20 to-rose-500/20"
              delay={0.5}
            />
          </Link>

          <Link href="/admin/emails">
            <GlassCard
              title="Newsletter Subscribers"
              value={newsletterSubscribers}
              iconName="Mail"
              gradient="from-indigo-500/20 to-violet-500/20"
              delay={0.6}
            />
          </Link>
        </div>

        {/* Recent Bookings with Glass Effect */}
        <div className="rounded-2xl bg-white/40 backdrop-blur-xl border border-white/20 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-white/20 bg-gradient-to-r from-[rgb(var(--color-brown))]/5 to-[rgb(var(--color-gold))]/5">
            <h2 className="text-2xl font-bold text-[rgb(var(--color-brown))]">Recent Bookings</h2>
            <p className="text-sm text-neutral-600 mt-1">Latest tour bookings from customers</p>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-neutral-200">
                  <tr className="text-left">
                    <th className="pb-3 text-sm font-semibold text-neutral-700">Reference</th>
                    <th className="pb-3 text-sm font-semibold text-neutral-700">Customer</th>
                    <th className="pb-3 text-sm font-semibold text-neutral-700">Tour</th>
                    <th className="pb-3 text-sm font-semibold text-neutral-700">Amount</th>
                    <th className="pb-3 text-sm font-semibold text-neutral-700">Status</th>
                    <th className="pb-3 text-sm font-semibold text-neutral-700">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="border-b last:border-0">
                      <td className="py-3 text-sm font-mono">{booking.ref}</td>
                      <td className="py-3 text-sm">{booking.user.name || booking.user.email}</td>
                      <td className="py-3 text-sm">{booking.tour.title}</td>
                      <td className="py-3 text-sm font-medium">{formatCurrency(booking.amount)}</td>
                      <td className="py-3">
                        <Badge variant={booking.status === 'PAID' ? 'success' : booking.status === 'PENDING' ? 'warning' : 'destructive'}>
                          {booking.status}
                        </Badge>
                      </td>
                      <td className="py-3 text-sm text-neutral-600">{formatDate(booking.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
