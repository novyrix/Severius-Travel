import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { rateLimit, getClientIp, isIpBlocked, RATE_LIMITS } from '@/lib/rate-limit';
import { checkHoneypot, validateFormTiming, isDisposableEmail, HONEYPOT_FIELDS } from '@/lib/honeypot';

const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(request: Request) {
  try {
    // Get client IP
    const clientIp = getClientIp(request);

    // Check if IP is blocked
    if (isIpBlocked(clientIp)) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    // Apply rate limiting
    const rateLimitResult = rateLimit(
      `newsletter:${clientIp}`,
      RATE_LIMITS.newsletter.limit,
      RATE_LIMITS.newsletter.windowMs
    );

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many subscription attempts. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Check honeypot fields
    const honeypotCheck = checkHoneypot({
      [HONEYPOT_FIELDS.website]: body[HONEYPOT_FIELDS.website],
      [HONEYPOT_FIELDS.url]: body[HONEYPOT_FIELDS.url],
      [HONEYPOT_FIELDS.phone]: body[HONEYPOT_FIELDS.phone],
      [HONEYPOT_FIELDS.company]: body[HONEYPOT_FIELDS.company],
    });

    if (honeypotCheck.isBot) {
      console.warn(`Bot detected in newsletter subscription: ${honeypotCheck.reason}`, { ip: clientIp });
      // Return success to not alert the bot
      return NextResponse.json(
        { message: 'Successfully subscribed to newsletter!' },
        { status: 201 }
      );
    }

    // Validate form timing
    const timingCheck = validateFormTiming(body[HONEYPOT_FIELDS.timestamp]);
    if (!timingCheck.valid) {
      console.warn(`Suspicious timing in newsletter: ${timingCheck.reason}`, { ip: clientIp });
      return NextResponse.json(
        { message: 'Successfully subscribed to newsletter!' },
        { status: 201 }
      );
    }
    
    // Validate email
    const validation = newsletterSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email } = validation.data;

    // Check for disposable email
    if (isDisposableEmail(email)) {
      return NextResponse.json(
        { error: 'Disposable email addresses are not allowed' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existing = await prisma.newsletter.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'This email is already subscribed to our newsletter' },
        { status: 400 }
      );
    }

    // Create newsletter subscription
    await prisma.newsletter.create({
      data: {
        email,
        subscribed: true,
      },
    });

    // TODO: Send welcome email using Resend or your email service
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'Severius Travel <newsletter@severiusadventuresandtravel.com>',
    //   to: email,
    //   subject: 'Welcome to Severius Travel Newsletter!',
    //   html: '<h1>Thank you for subscribing!</h1>',
    // });

    return NextResponse.json(
      { message: 'Successfully subscribed to newsletter!' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    );
  }
}
