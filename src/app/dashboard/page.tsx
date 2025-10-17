import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, User as UserIcon, FileText, Download } from 'lucide-react';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatDate } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { DashboardTabs } from '@/components/dashboard-tabs';

async function getUserBookings(userEmail: string) {
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  if (!user) return [];

  const bookings = await prisma.booking.findMany({
    where: { userId: user.id },
    include: {
      tour: {
        include: {
          country: true,
          images: {
            take: 1,
            orderBy: { order: 'asc' },
          },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return bookings;
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect('/login?callbackUrl=/dashboard');
  }

  const bookings = await getUserBookings(session.user.email);
  const t = await getTranslations('dashboard');

  return (
    <main className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[rgb(var(--color-brown))] mb-2">
            {t('title')}
          </h1>
          <p className="text-neutral-600">
            Welcome back, {session.user.name || session.user.email}!
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-[rgb(var(--color-gold))]">
                {bookings.length}
              </div>
              <div className="text-sm text-neutral-600 mt-1">{t('stats.totalBookings')}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-green-600">
                {bookings.filter(b => b.status === 'PAID').length}
              </div>
              <div className="text-sm text-neutral-600 mt-1">{t('stats.confirmedTours')}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-yellow-600">
                {bookings.filter(b => b.status === 'PENDING').length}
              </div>
              <div className="text-sm text-neutral-600 mt-1">{t('stats.pendingPayment')}</div>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Tabs */}
        <DashboardTabs 
          bookings={bookings as any} 
          user={{
            name: session.user.name || null,
            email: session.user.email!,
            image: session.user.image || null
          }}
        />
      </div>
    </main>
  );
}
