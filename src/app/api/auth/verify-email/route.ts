import { NextRequest, NextResponse } from 'next/server';
import { verifyEmailToken } from '@/lib/email-verification';

export async function POST(req: NextRequest) {
  try {
    const { email, token } = await req.json();

    if (!email || !token) {
      return NextResponse.json(
        { message: 'Email and token are required' },
        { status: 400 }
      );
    }

    const result = await verifyEmailToken(email, token);

    if (result.success) {
      return NextResponse.json(
        { message: 'Email verified successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: result.error || 'Failed to verify email' },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Verify email error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
