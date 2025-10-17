/**
 * Honeypot utilities for detecting bot submissions
 * Honeypots are hidden form fields that humans won't fill but bots will
 */

/**
 * Common honeypot field names (should be hidden with CSS)
 */
export const HONEYPOT_FIELDS = {
  // Common bot-attractive field names
  website: 'website',
  url: 'url',
  phone: 'phone_number',
  company: 'company_name',
  
  // Timestamp field (checks submission speed)
  timestamp: 'form_timestamp',
  
  // Checksum field (verifies form wasn't modified)
  checksum: 'form_checksum',
} as const;

/**
 * Generate form timestamp for honeypot validation
 */
export function generateFormTimestamp(): string {
  return Date.now().toString();
}

/**
 * Validate form submission timing (detect too-fast submissions)
 * @param timestamp - Form load timestamp
 * @param minSeconds - Minimum seconds before submission (default: 3)
 */
export function validateFormTiming(
  timestamp: string | null,
  minSeconds: number = 3
): { valid: boolean; reason?: string } {
  if (!timestamp) {
    return { valid: false, reason: 'Missing form timestamp' };
  }

  const formLoadTime = parseInt(timestamp, 10);
  if (isNaN(formLoadTime)) {
    return { valid: false, reason: 'Invalid form timestamp' };
  }

  const now = Date.now();
  const elapsedMs = now - formLoadTime;
  const elapsedSeconds = elapsedMs / 1000;

  // Too fast (likely a bot)
  if (elapsedSeconds < minSeconds) {
    return {
      valid: false,
      reason: `Form submitted too quickly (${elapsedSeconds.toFixed(1)}s)`,
    };
  }

  // Too slow (likely abandoned form or suspicious)
  const maxMinutes = 30;
  if (elapsedMs > maxMinutes * 60 * 1000) {
    return {
      valid: false,
      reason: `Form submission expired (${(elapsedMs / 60000).toFixed(0)}m)`,
    };
  }

  return { valid: true };
}

/**
 * Check if honeypot fields were filled (indicates bot)
 * @param honeypotValues - Object with honeypot field values
 */
export function checkHoneypot(honeypotValues: Record<string, any>): {
  isBot: boolean;
  reason?: string;
} {
  // Check if any honeypot field has a value
  for (const [field, value] of Object.entries(honeypotValues)) {
    if (value && value !== '') {
      return {
        isBot: true,
        reason: `Honeypot field '${field}' was filled`,
      };
    }
  }

  return { isBot: false };
}

/**
 * Validate email address (detect disposable/temporary emails)
 */
const disposableEmailDomains = [
  'tempmail.com',
  'guerrillamail.com',
  '10minutemail.com',
  'mailinator.com',
  'throwaway.email',
  'temp-mail.org',
  'fakeinbox.com',
  'maildrop.cc',
  'yopmail.com',
  'trashmail.com',
];

export function isDisposableEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return false;
  
  return disposableEmailDomains.some(disposable => 
    domain.includes(disposable)
  );
}

/**
 * Detect suspicious patterns in form data
 */
export function detectSuspiciousPatterns(data: {
  name?: string;
  email?: string;
  message?: string;
}): { suspicious: boolean; reasons: string[] } {
  const reasons: string[] = [];

  // Check for disposable email
  if (data.email && isDisposableEmail(data.email)) {
    reasons.push('Disposable email address detected');
  }

  // Check for excessive URLs in message
  if (data.message) {
    const urlPattern = /(https?:\/\/|www\.)/gi;
    const urlMatches = data.message.match(urlPattern);
    if (urlMatches && urlMatches.length > 2) {
      reasons.push('Excessive URLs in message');
    }

    // Check for spam keywords
    const spamKeywords = ['viagra', 'cialis', 'casino', 'lottery', 'winner', 'bitcoin', 'crypto'];
    const lowerMessage = data.message.toLowerCase();
    const foundSpam = spamKeywords.filter(keyword => lowerMessage.includes(keyword));
    if (foundSpam.length > 0) {
      reasons.push(`Spam keywords detected: ${foundSpam.join(', ')}`);
    }

    // Check for excessive capitalization
    const capsCount = (data.message.match(/[A-Z]/g) || []).length;
    const totalLetters = (data.message.match(/[a-zA-Z]/g) || []).length;
    if (totalLetters > 20 && capsCount / totalLetters > 0.5) {
      reasons.push('Excessive capitalization');
    }
  }

  // Check for suspiciously short or generic names
  if (data.name) {
    const suspiciousNames = ['test', 'user', 'admin', 'asdf', 'qwerty', 'none', 'name'];
    if (suspiciousNames.includes(data.name.toLowerCase())) {
      reasons.push('Suspicious name detected');
    }
  }

  return {
    suspicious: reasons.length > 0,
    reasons,
  };
}

/**
 * Generate honeypot CSS to hide fields
 */
export function getHoneypotStyles(): string {
  return `
    .honeypot-field {
      position: absolute !important;
      left: -9999px !important;
      width: 1px !important;
      height: 1px !important;
      opacity: 0 !important;
      pointer-events: none !important;
      tab-index: -1 !important;
    }
  `;
}
