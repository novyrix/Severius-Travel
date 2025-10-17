/**
 * Simple in-memory rate limiter for development
 * For production, use Redis/Vercel KV or similar persistent storage
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetAt) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Check if a request should be rate limited
 * @param identifier - Unique identifier (IP address, user ID, email, etc.)
 * @param limit - Maximum number of requests allowed
 * @param windowMs - Time window in milliseconds
 */
export function rateLimit(
  identifier: string,
  limit: number = 10,
  windowMs: number = 60000 // 1 minute default
): RateLimitResult {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  // No existing entry or window expired
  if (!entry || now > entry.resetAt) {
    const resetAt = now + windowMs;
    rateLimitStore.set(identifier, { count: 1, resetAt });
    return {
      success: true,
      limit,
      remaining: limit - 1,
      reset: resetAt,
    };
  }

  // Increment count
  entry.count++;

  // Check if limit exceeded
  if (entry.count > limit) {
    return {
      success: false,
      limit,
      remaining: 0,
      reset: entry.resetAt,
    };
  }

  return {
    success: true,
    limit,
    remaining: limit - entry.count,
    reset: entry.resetAt,
  };
}

/**
 * Get client IP address from request
 */
export function getClientIp(request: Request): string {
  // Check various headers for IP (proxy-aware)
  const headers = request.headers;
  
  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  const realIp = headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  const cfConnectingIp = headers.get('cf-connecting-ip'); // Cloudflare
  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  // Fallback
  return 'unknown';
}

/**
 * Rate limit configurations for different endpoints
 */
export const RATE_LIMITS = {
  // Authentication endpoints
  login: { limit: 5, windowMs: 15 * 60 * 1000 }, // 5 attempts per 15 minutes
  register: { limit: 3, windowMs: 60 * 60 * 1000 }, // 3 registrations per hour
  resendVerification: { limit: 3, windowMs: 60 * 60 * 1000 }, // 3 resends per hour
  
  // API endpoints
  api: { limit: 100, windowMs: 60 * 1000 }, // 100 requests per minute
  booking: { limit: 10, windowMs: 60 * 60 * 1000 }, // 10 bookings per hour
  
  // Contact/Newsletter
  contact: { limit: 5, windowMs: 60 * 60 * 1000 }, // 5 messages per hour
  newsletter: { limit: 3, windowMs: 60 * 60 * 1000 }, // 3 subscriptions per hour
} as const;

/**
 * Block suspicious IPs (simple blocklist)
 * In production, use a database or Redis
 */
const blockedIps = new Set<string>();

export function blockIp(ip: string): void {
  blockedIps.add(ip);
}

export function unblockIp(ip: string): void {
  blockedIps.delete(ip);
}

export function isIpBlocked(ip: string): boolean {
  return blockedIps.has(ip);
}

/**
 * Track failed login attempts
 */
const failedLoginAttempts = new Map<string, number>();

export function recordFailedLogin(identifier: string): number {
  const current = failedLoginAttempts.get(identifier) || 0;
  const newCount = current + 1;
  failedLoginAttempts.set(identifier, newCount);
  
  // Auto-block after 10 failed attempts
  if (newCount >= 10) {
    blockIp(identifier);
  }
  
  return newCount;
}

export function resetFailedLogins(identifier: string): void {
  failedLoginAttempts.delete(identifier);
}

export function getFailedLoginCount(identifier: string): number {
  return failedLoginAttempts.get(identifier) || 0;
}
