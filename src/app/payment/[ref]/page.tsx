import { notFound, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { ArrowLeft, CreditCard, Shield } from 'lucide-react';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate } from '@/lib/utils';
import { PaymentButton } from '@/components/payment-button';

interface PageProps {
  params: Promise<{ ref: string }>;
}

async function getBooking(ref: string, userEmail: string) {
  const booking = await prisma.booking.findFirst({
    where: {
      ref,
      user: { email: userEmail },
    },
    include: {
      tour: {
        include: {
          country: true,
        },
      },
      user: true,
    },
  });

  return booking;
}

export default async function PaymentPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect('/login');
  }

  const { ref } = await params;
  const booking = await getBooking(ref, session.user.email);

  if (!booking) {
    notFound();
  }

  // If already paid, redirect to dashboard
  if (booking.status === 'PAID') {
    redirect('/dashboard');
  }

  return (
    <main className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-6 max-w-3xl">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-neutral-600 hover:text-[rgb(var(--color-gold))] mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[rgb(var(--color-brown))] mb-2">
            Complete Payment
          </h1>
          <p className="text-neutral-600">
            Booking Reference: <span className="font-mono font-semibold">{booking.ref}</span>
          </p>
        </div>

        <div className="grid gap-6">
          {/* Booking Details */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg text-[rgb(var(--color-brown))]">
                  {booking.tour.title}
                </h3>
                <p className="text-neutral-600">{booking.tour.country.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-neutral-600">Duration:</span>
                  <p className="font-medium">{booking.tour.durationDays} Days</p>
                </div>
                <div>
                  <span className="text-neutral-600">Booking Date:</span>
                  <p className="font-medium">{formatDate(booking.createdAt)}</p>
                </div>
                <div>
                  <span className="text-neutral-600">Status:</span>
                  <div className="mt-1">
                    <Badge variant={
                      booking.status === 'PENDING' ? 'warning' : 
                      booking.status === 'CANCELLED' ? 'destructive' : 
                      'success'
                    }>
                      {booking.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-lg">
                <span>Total Amount:</span>
                <span className="font-bold text-[rgb(var(--color-gold))]">
                  {formatCurrency(booking.amount)}
                </span>
              </div>

              <div className="border-t pt-4">
                <PaymentButton bookingRef={booking.ref} amount={booking.amount} />
              </div>

              <div className="flex items-start gap-3 text-sm text-neutral-600 bg-neutral-50 p-4 rounded-lg">
                <Shield className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium mb-1">Secure Payment</p>
                  <p className="text-xs">
                    Your payment information is encrypted and secure. We use PesaPal, a trusted payment gateway.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle>Accepted Payment Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <CreditCard className="w-5 h-5" />
                  <span>Credit/Debit Cards</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold">M-PESA</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span>Bank Transfer</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <p className="text-xs text-center text-neutral-600">
            By completing this payment, you agree to our Terms of Service and confirm that you have read our Cancellation Policy.
          </p>
        </div>
      </div>
    </main>
  );
}
