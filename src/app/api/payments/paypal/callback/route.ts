import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { paypalService } from '@/lib/services/paypal';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token'); // PayPal order ID
    const bookingRef = searchParams.get('bookingRef');

    if (!token || !bookingRef) {
      return NextResponse.redirect(
        new URL('/payment/error?message=Missing payment information', request.url)
      );
    }

    // Get booking
    const booking = await prisma.booking.findFirst({
      where: { ref: bookingRef },
    });

    if (!booking) {
      return NextResponse.redirect(
        new URL('/payment/error?message=Booking not found', request.url)
      );
    }

    // Capture the PayPal order
    try {
      const captureResult = await paypalService.captureOrder(token);

      if (captureResult.status === 'COMPLETED') {
        // Update booking status to PAID
        await prisma.booking.update({
          where: { id: booking.id },
          data: {
            status: 'PAID',
            // You might want to store payment details
            // paymentId: captureResult.captureId,
          },
        });

        // Redirect to success page
        return NextResponse.redirect(
          new URL(`/payment/success?ref=${bookingRef}`, request.url)
        );
      } else {
        // Payment not completed
        return NextResponse.redirect(
          new URL(`/payment/${bookingRef}?error=Payment not completed`, request.url)
        );
      }
    } catch (error) {
      console.error('PayPal capture error:', error);
      return NextResponse.redirect(
        new URL(`/payment/${bookingRef}?error=Payment capture failed`, request.url)
      );
    }
  } catch (error) {
    console.error('Payment callback error:', error);
    return NextResponse.redirect(
      new URL('/payment/error?message=Payment processing error', request.url)
    );
  }
}
