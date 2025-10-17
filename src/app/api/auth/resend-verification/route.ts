import { NextRequest, NextResponse } from 'next/server';
import { sendVerificationEmail } from '@/lib/email-verification';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Check if already verified
    if (user.emailVerified) {
      return NextResponse.json(
        { message: 'Email is already verified' },
        { status: 400 }
      );
    }

    // Send verification email
    const result = await sendVerificationEmail(email, user.name || 'Traveler');

    if (result.success) {
      return NextResponse.json(
        { message: 'Verification email sent successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: result.error || 'Failed to send verification email' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Resend verification error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
