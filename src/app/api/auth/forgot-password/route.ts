import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { randomBytes } from 'crypto';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Email template function
function generatePasswordResetEmail(resetUrl: string, userEmail: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      line-height: 1.6;
      color: #333333;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, rgb(101, 67, 33) 0%, rgb(184, 134, 11) 100%);
      color: #ffffff;
      padding: 40px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
    }
    .content {
      padding: 40px 30px;
    }
    .content p {
      margin: 0 0 16px;
      color: #555555;
    }
    .button-container {
      text-align: center;
      margin: 32px 0;
    }
    .button {
      display: inline-block;
      padding: 14px 32px;
      background: linear-gradient(135deg, rgb(101, 67, 33) 0%, rgb(184, 134, 11) 100%);
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      font-size: 16px;
    }
    .info-box {
      background-color: #fff9e6;
      border-left: 4px solid rgb(184, 134, 11);
      padding: 16px;
      margin: 24px 0;
      border-radius: 4px;
    }
    .info-box p {
      margin: 0;
      font-size: 14px;
      color: #856404;
    }
    .footer {
      background-color: #f8f8f8;
      padding: 24px 30px;
      text-align: center;
      font-size: 12px;
      color: #888888;
    }
    .footer p {
      margin: 8px 0;
    }
    .footer a {
      color: rgb(101, 67, 33);
      text-decoration: none;
    }
    .divider {
      height: 1px;
      background-color: #eeeeee;
      margin: 24px 0;
    }
    .url-text {
      font-size: 12px;
      color: #0066cc;
      word-break: break-all;
      background-color: #f5f5f5;
      padding: 8px;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔐 Password Reset Request</h1>
    </div>
    
    <div class="content">
      <p>Hello,</p>
      
      <p>
        We received a request to reset the password for your Severius Adventures & Travel account
        associated with <strong>${userEmail}</strong>.
      </p>
      
      <p>
        Click the button below to reset your password. This link will expire in <strong>1 hour</strong> for security reasons.
      </p>
      
      <div class="button-container">
        <a href="${resetUrl}" class="button">
          Reset Your Password
        </a>
      </div>
      
      <div class="info-box">
        <p>
          <strong>⚠️ Security Notice:</strong> If you didn't request this password reset, 
          please ignore this email or contact our support team immediately. 
          Your password will remain unchanged.
        </p>
      </div>
      
      <div class="divider"></div>
      
      <p style="font-size: 14px; color: #888888;">
        If the button doesn't work, copy and paste this link into your browser:
      </p>
      <p class="url-text">
        ${resetUrl}
      </p>
    </div>
    
    <div class="footer">
      <p><strong>Severius Adventures & Travel</strong></p>
      <p>Your trusted partner for unforgettable adventures</p>
      <p style="margin-top: 16px;">
        Need help? Contact us at
        <a href="mailto:support@severiusadventuresandtravel.com">
          support@severiusadventuresandtravel.com
        </a>
      </p>
      <p style="margin-top: 12px; font-size: 11px;">
        This is an automated email. Please do not reply to this message.
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    // Normalize email to lowercase
    const normalizedEmail = email.toLowerCase();

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    });

    // Always return success to prevent email enumeration
    if (!user) {
      console.log('❌ Password reset requested for non-existent email:', normalizedEmail);
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

    // Generate reset URL
    const baseUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;
    
    console.log('🔗 Password reset URL:', resetUrl);

    // Send password reset email
    try {
      // Generate the email HTML
      const emailHtml = generatePasswordResetEmail(resetUrl, user.email);

      // Send email using Resend
      const emailResult = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'Severius Travel <noreply@severiusadventuresandtravel.com>',
        to: user.email,
        subject: 'Reset Your Password - Severius Adventures & Travel',
        html: emailHtml,
      });

      console.log('✅ Password reset email sent:', { 
        emailId: emailResult.data?.id,
        to: user.email,
        timestamp: new Date().toISOString()
      });
    } catch (emailError: any) {
      console.error('❌ Failed to send password reset email:', {
        error: emailError.message,
        to: user.email,
        timestamp: new Date().toISOString()
      });
      
      // Don't fail the request if email fails - token is still valid
      // In production, you might want to queue this for retry
    }

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
