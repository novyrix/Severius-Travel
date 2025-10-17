import { Resend } from 'resend';
import { render } from '@react-email/render';
import VerifyEmail from '@/emails/verify-email';
import crypto from 'crypto';
import { prisma } from './prisma';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Generate a verification token and store it in the database
 */
export async function generateVerificationToken(email: string): Promise<string> {
  // Generate a secure random token
  const token = crypto.randomBytes(32).toString('hex');
  
  // Set expiration to 24 hours from now
  const expires = new Date();
  expires.setHours(expires.getHours() + 24);

  // Delete any existing tokens for this email
  await prisma.verificationToken.deleteMany({
    where: { identifier: email }
  });

  // Create new verification token
  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires
    }
  });

  return token;
}

/**
 * Send verification email to user
 */
export async function sendVerificationEmail(
  email: string,
  userName: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Generate verification token
    const token = await generateVerificationToken(email);
    
    // Create verification URL
    const verificationUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/verify-email?token=${token}&email=${encodeURIComponent(email)}`;

    // Render email HTML
    const emailHtml = await render(VerifyEmail({ userName, verificationUrl }));

    // Send email
    const { data, error } = await resend.emails.send({
      from: 'Severius Adventures <onboarding@resend.dev>',
      to: email,
      subject: 'Verify Your Email Address - Severius Adventures',
      html: emailHtml,
    });

    if (error) {
      console.error('Failed to send verification email:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Error sending verification email:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Verify the token and mark email as verified
 */
export async function verifyEmailToken(
  email: string,
  token: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Find the verification token
    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        identifier_token: {
          identifier: email,
          token
        }
      }
    });

    if (!verificationToken) {
      return { success: false, error: 'Invalid verification token' };
    }

    // Check if token has expired
    if (new Date() > verificationToken.expires) {
      // Delete expired token
      await prisma.verificationToken.delete({
        where: {
          identifier_token: {
            identifier: email,
            token
          }
        }
      });
      return { success: false, error: 'Verification token has expired' };
    }

    // Update user's emailVerified field
    await prisma.user.update({
      where: { email },
      data: { emailVerified: new Date() }
    });

    // Delete the used token
    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: email,
          token
        }
      }
    });

    return { success: true };
  } catch (error: any) {
    console.error('Error verifying email token:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Check if user's email is verified
 */
export async function isEmailVerified(email: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { emailVerified: true }
  });

  return !!user?.emailVerified;
}
