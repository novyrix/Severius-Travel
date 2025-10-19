import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashSync } from 'bcryptjs';
import { rateLimit, getClientIp, isIpBlocked, RATE_LIMITS } from '@/lib/rate-limit';
import { checkHoneypot, validateFormTiming, detectSuspiciousPatterns, HONEYPOT_FIELDS } from '@/lib/honeypot';

export async function POST(req: NextRequest) {
  try {
    // Get client IP
    const clientIp = getClientIp(req);

    // Check if IP is blocked
    if (isIpBlocked(clientIp)) {
      return NextResponse.json(
        { message: 'Access denied. Your IP has been blocked due to suspicious activity.' },
        { status: 403 }
      );
    }

    // Apply rate limiting
    const rateLimitResult = rateLimit(
      `register:${clientIp}`,
      RATE_LIMITS.register.limit,
      RATE_LIMITS.register.windowMs
    );

    if (!rateLimitResult.success) {
      const resetDate = new Date(rateLimitResult.reset);
      return NextResponse.json(
        {
          message: `Too many registration attempts. Please try again after ${resetDate.toLocaleTimeString()}.`,
          retryAfter: rateLimitResult.reset,
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.reset.toString(),
          },
        }
      );
    }

    const body = await req.json();
    const { name, email, password } = body;

    // Check honeypot fields
    const honeypotCheck = checkHoneypot({
      [HONEYPOT_FIELDS.website]: body[HONEYPOT_FIELDS.website],
      [HONEYPOT_FIELDS.url]: body[HONEYPOT_FIELDS.url],
      [HONEYPOT_FIELDS.phone]: body[HONEYPOT_FIELDS.phone],
      [HONEYPOT_FIELDS.company]: body[HONEYPOT_FIELDS.company],
    });

    if (honeypotCheck.isBot) {
      console.warn(`Bot detected in registration: ${honeypotCheck.reason}`, { ip: clientIp });
      // Return success to not alert the bot
      return NextResponse.json(
        { message: 'Registration successful! Please check your email.' },
        { status: 201 }
      );
    }

    // Validate form timing
    const timingCheck = validateFormTiming(body[HONEYPOT_FIELDS.timestamp]);
    if (!timingCheck.valid) {
      console.warn(`Suspicious timing in registration: ${timingCheck.reason}`, { ip: clientIp });
      // Return success to not alert the bot
      return NextResponse.json(
        { message: 'Registration successful! Please check your email.' },
        { status: 201 }
      );
    }

    // Detect suspicious patterns
    const suspiciousCheck = detectSuspiciousPatterns({ name, email });
    if (suspiciousCheck.suspicious) {
      console.warn('Suspicious registration patterns detected:', suspiciousCheck.reasons, { ip: clientIp });
      // Allow but log for review
    }

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = hashSync(password, 10);

    // Create user with email auto-verified (email verification disabled)
    const user = await prisma.user.create({
      data: {
        name: name || null,
        email,
        hashedPassword,
        role: 'USER',
        isActive: true,
        emailVerified: new Date() // Auto-verify since email system is not working
      }
    });

    // Email verification system disabled - Resend not configured
    // Users can now login immediately after registration

    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully! You can now login.',
        redirectTo: `/login`
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
