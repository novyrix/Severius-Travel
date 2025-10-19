import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { pesapalService } from '@/lib/services/pesapal';
import { getTourBySlug } from '@/data/tours';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { bookingRef } = await request.json();

    if (!bookingRef) {
      return NextResponse.json({ error: 'Booking reference required' }, { status: 400 });
    }

    // Get booking details
    const booking = await prisma.booking.findFirst({
      where: {
        ref: bookingRef,
        user: { email: session.user.email },
      },
      include: {
        user: true,
      },
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    if (booking.status === 'PAID') {
      return NextResponse.json({ error: 'Booking already paid' }, { status: 400 });
    }

    // Get tour details from static data
    const tour = getTourBySlug(booking.tourSlug);
    if (!tour) {
      return NextResponse.json({ error: 'Tour not found' }, { status: 404 });
    }

    // Check if PesaPal is configured
    if (!pesapalService.isConfigured()) {
      // In development without PesaPal configured, simulate payment
      console.warn('PesaPal not configured. Simulating payment in development mode.');
      console.log('To configure PesaPal, set PESAPAL_CONSUMER_KEY and PESAPAL_CONSUMER_SECRET in .env');
      
      // Update booking status to PAID (for development only)
      await prisma.booking.update({
        where: { id: booking.id },
        data: { status: 'PAID' },
      });

      return NextResponse.json({
        message: 'Payment simulated successfully (development mode)',
        redirectUrl: `/payment/success?ref=${bookingRef}`,
      });
    }

    // Get IPN notification ID
    let notificationId = process.env.PESAPAL_IPN_ID;
    
    // If IPN ID is not set, register IPN automatically
    if (!notificationId) {
      console.log('IPN ID not found, registering IPN...');
      try {
        notificationId = await pesapalService.registerIPN();
        console.log('IPN registered successfully:', notificationId);
        console.log('⚠️ Please add this to your .env file: PESAPAL_IPN_ID=' + notificationId);
      } catch (error) {
        console.error('Failed to register IPN:', error);
        return NextResponse.json(
          { error: 'Failed to register payment notification URL', details: error instanceof Error ? error.message : 'Unknown error' },
          { status: 500 }
        );
      }
    }

    console.log('Submitting payment order to PesaPal...');
    console.log('Booking:', { ref: booking.ref, amount: booking.amount, currency: 'USD' });

    // Submit payment order to PesaPal
    const paymentResponse = await pesapalService.submitOrder({
      bookingRef: booking.ref,
      amount: booking.amount,
      currency: 'USD',
      description: `Payment for ${booking.tourTitle}`,
      callbackUrl: `${process.env.NEXTAUTH_URL}/api/payments/callback?ref=${bookingRef}`,
      firstName: booking.user.name?.split(' ')[0] || 'Customer',
      lastName: booking.user.name?.split(' ').slice(1).join(' ') || '',
      email: booking.user.email!,
      phoneNumber: '+254700000000', // You should collect this during booking
      notificationId,
    });

    console.log('Payment response received:', paymentResponse);

    return NextResponse.json({
      orderTrackingId: paymentResponse.order_tracking_id,
      redirectUrl: paymentResponse.redirect_url,
    });
  } catch (error) {
    console.error('Payment initiation error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate payment', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
