import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { pesapalService } from '@/lib/services/pesapal';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const orderTrackingId = searchParams.get('OrderTrackingId');
    const merchantReference = searchParams.get('OrderMerchantReference');

    if (!orderTrackingId || !merchantReference) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/payment/failed?error=missing_params`);
    }

    // Get transaction status from PesaPal
    const transactionStatus = await pesapalService.getTransactionStatus(orderTrackingId);

    // Update booking status based on payment status
    const booking = await prisma.booking.findUnique({
      where: { ref: merchantReference },
    });

    if (!booking) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/payment/failed?error=booking_not_found`);
    }

    if (transactionStatus.payment_status_description === 'Completed') {
      await prisma.booking.update({
        where: { id: booking.id },
        data: { status: 'PAID' },
      });

      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/payment/success?ref=${merchantReference}`);
    } else if (transactionStatus.payment_status_description === 'Failed') {
      await prisma.booking.update({
        where: { id: booking.id },
        data: { status: 'CANCELLED' },
      });

      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/payment/failed?ref=${merchantReference}`);
    }

    // Payment pending
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/payment/pending?ref=${merchantReference}`);
  } catch (error) {
    console.error('Payment callback error:', error);
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/payment/failed?error=processing_error`);
  }
}
