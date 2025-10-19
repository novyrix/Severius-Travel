import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { randomBytes } from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    // Always return success to prevent email enumeration
    if (!user) {
      console.log('❌ Password reset requested for non-existent email:', email);
      return NextResponse.json(
        {
          success: true,
          message: 'If an account exists with this email, you will receive password reset instructions.'
        },
        { status: 200 }
      );
    }

    // Generate reset token (valid for 1 hour)
    const resetToken = randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    // Update user with reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry
      }
    });

    console.log('✅ Password reset token generated:', { 
      userId: user.id, 
      email: user.email,
      tokenExpiry: resetTokenExpiry.toISOString(),
      timestamp: new Date().toISOString()
    });

    // In production, you would send an email here
    // For now, we'll return the reset link in the response (ONLY for development)
    const resetUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
    
    console.log('🔗 Password reset URL:', resetUrl);

    // TODO: Replace this with actual email sending using Resend or similar
    // await sendPasswordResetEmail(user.email, resetUrl);

    return NextResponse.json(
      {
        success: true,
        message: 'If an account exists with this email, you will receive password reset instructions.',
        // REMOVE THIS IN PRODUCTION - only for development
        resetUrl: process.env.NODE_ENV === 'development' ? resetUrl : undefined
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('❌ Forgot password error:', {
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json(
      { 
        success: false,
        message: 'An error occurred. Please try again.' 
      },
      { status: 500 }
    );
  }
}
