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
import { dashboardMetadata } from '@/lib/metadata';

export const metadata = dashboardMetadata;
import { getTranslations } from 'next-intl/server';
import { DashboardTabs } from '@/components/dashboard-tabs';

async function getUserBookings(userEmail: string) {
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  if (!user) return [];

  const bookings = await prisma.booking.findMany({
    where: { userId: user.id },
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
    <main className="min-h-screen bg-neutral-50 py-6 md:py-12 pb-20 md:pb-12">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[rgb(var(--color-brown))] mb-2">
            {t('title')}
          </h1>
          <p className="text-sm md:text-base text-neutral-600">
            Welcome back, {session.user.name || session.user.email}!
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 md:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8">
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="text-2xl md:text-3xl font-bold text-[rgb(var(--color-gold))]">
                {bookings.length}
              </div>
              <div className="text-xs md:text-sm text-neutral-600 mt-1">{t('stats.totalBookings')}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="text-2xl md:text-3xl font-bold text-green-600">
                {bookings.filter(b => b.status === 'PAID').length}
              </div>
              <div className="text-xs md:text-sm text-neutral-600 mt-1">{t('stats.confirmedTours')}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="text-2xl md:text-3xl font-bold text-yellow-600">
                {bookings.filter(b => b.status === 'PENDING').length}
              </div>
              <div className="text-xs md:text-sm text-neutral-600 mt-1">{t('stats.pendingPayment')}</div>
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
