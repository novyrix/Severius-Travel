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

    if (password.length < 8) {
      return NextResponse.json(
        { message: 'Password must be at least 8 characters long' },
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

    console.log('✅ User created successfully:', { 
      id: user.id, 
      email: user.email, 
      name: user.name,
      role: user.role,
      timestamp: new Date().toISOString()
    });

    // Return success with auto-login flag
    return NextResponse.json(
      {
        success: true,
        autoLogin: true, // Flag for frontend to auto-login
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        },
        message: 'Account created successfully! Redirecting to dashboard...',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('❌ Registration error:', {
      error: error.message,
      stack: error.stack,
      code: error.code,
      meta: error.meta,
      timestamp: new Date().toISOString()
    });
    
    // Handle specific Prisma errors
    if (error.code === 'P2002') {
      return NextResponse.json(
        { 
          success: false,
          message: 'An account with this email already exists. Please login instead.',
          errorCode: 'DUPLICATE_EMAIL'
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to create account. Please try again.',
        errorCode: 'SERVER_ERROR'
      },
      { status: 500 }
    );
  }
}
