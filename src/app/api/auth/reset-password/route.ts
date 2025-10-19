import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashSync } from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { success: false, message: 'Token and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Find user with this reset token
    const user = await prisma.user.findUnique({
      where: { resetToken: token }
    });

    if (!user) {
      console.log('❌ Invalid reset token:', token);
      return NextResponse.json(
        { success: false, message: 'Invalid or expired reset token' },
        { status: 400 }
      );
    }

    // Check if token has expired
    if (!user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
      console.log('❌ Expired reset token:', { 
        userId: user.id, 
        expiry: user.resetTokenExpiry?.toISOString() 
      });
      return NextResponse.json(
        { success: false, message: 'Reset token has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = hashSync(password, 10);

    // Update user password and clear reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        hashedPassword,
        resetToken: null,
        resetTokenExpiry: null
      }
    });

    console.log('✅ Password reset successful:', { 
      userId: user.id, 
      email: user.email,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Password reset successfully! You can now login with your new password.'
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('❌ Reset password error:', {
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
