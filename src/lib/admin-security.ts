import { nanoid } from 'nanoid';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Admin Security System
 * Generates dynamic admin slugs for enhanced security
 */

// Store active admin slugs (in production, use Redis/database)
const activeAdminSlugs = new Map<string, { userId: string; expiresAt: number }>();

/**
 * Generate a secure admin slug for a user session
 * @param userId - User ID
 * @param expiresInHours - Hours until slug expires (default 24)
 */
export async function generateAdminSlug(userId: string, expiresInHours: number = 24): Promise<string> {
  // Generate a cryptographically secure random slug
  const slug = nanoid(32); // 32 characters = ~192 bits of entropy
  const expiresAt = Date.now() + (expiresInHours * 60 * 60 * 1000);
  
  // Store the slug
  activeAdminSlugs.set(slug, {
    userId,
    expiresAt,
  });
  
  // Cleanup old slugs for this user
  for (const [key, value] of activeAdminSlugs.entries()) {
    if (value.userId === userId && key !== slug) {
      activeAdminSlugs.delete(key);
    }
  }
  
  return slug;
}

/**
 * Validate an admin slug
 * @param slug - The slug to validate
 * @returns User ID if valid, null otherwise
 */
export function validateAdminSlug(slug: string): string | null {
  const entry = activeAdminSlugs.get(slug);
  
  if (!entry) {
    return null;
  }
  
  // Check if expired
  if (Date.now() > entry.expiresAt) {
    activeAdminSlugs.delete(slug);
    return null;
  }
  
  return entry.userId;
}

/**
 * Revoke an admin slug
 * @param slug - The slug to revoke
 */
export function revokeAdminSlug(slug: string): void {
  activeAdminSlugs.delete(slug);
}

/**
 * Revoke all admin slugs for a user
 * @param userId - User ID
 */
export function revokeAllUserAdminSlugs(userId: string): void {
  for (const [key, value] of activeAdminSlugs.entries()) {
    if (value.userId === userId) {
      activeAdminSlugs.delete(key);
    }
  }
}

/**
 * Cleanup expired slugs
 */
export function cleanupExpiredSlugs(): void {
  const now = Date.now();
  for (const [key, value] of activeAdminSlugs.entries()) {
    if (now > value.expiresAt) {
      activeAdminSlugs.delete(key);
    }
  }
}

// Run cleanup every hour
if (typeof window === 'undefined') {
  setInterval(cleanupExpiredSlugs, 60 * 60 * 1000);
}

/**
 * Generate admin access URL
 * @param userId - User ID
 * @param baseUrl - Base URL of the site
 */
export async function generateAdminAccessUrl(userId: string, baseUrl: string): Promise<string> {
  const slug = await generateAdminSlug(userId);
  return `${baseUrl}/admin/${slug}`;
}
