import { describe, it, expect } from 'vitest';
import {
  cn,
  formatCurrency,
  generateBookingRef,
  calculateNights,
  formatDate,
  slugify,
} from '../utils';

describe('Utils', () => {
  describe('cn (classnames utility)', () => {
    it('should merge class names correctly', () => {
      expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
    });

    it('should handle conditional classes', () => {
      expect(cn('base', true && 'active', false && 'inactive')).toBe(
        'base active'
      );
    });

    it('should handle undefined and null', () => {
      expect(cn('base', undefined, null, 'end')).toBe('base end');
    });
  });

  describe('formatCurrency', () => {
    it('should format USD currency correctly', () => {
      expect(formatCurrency(1000, 'USD')).toBe('$1,000');
    });

    it('should format EUR currency correctly', () => {
      expect(formatCurrency(1500, 'EUR')).toBe('€1,500');
    });

    it('should format GBP currency correctly', () => {
      expect(formatCurrency(2000, 'GBP')).toBe('£2,000');
    });

    it('should format KES currency correctly', () => {
      expect(formatCurrency(100000, 'KES')).toBe('KES 100,000');
    });

    it('should handle zero', () => {
      expect(formatCurrency(0, 'USD')).toBe('$0');
    });

    it('should handle decimal values', () => {
      expect(formatCurrency(1234.56, 'USD')).toBe('$1,235');
    });

    it('should handle negative values', () => {
      expect(formatCurrency(-500, 'USD')).toBe('-$500');
    });
  });

  describe('generateBookingRef', () => {
    it('should generate booking reference with correct format', () => {
      const ref = generateBookingRef();
      expect(ref).toMatch(/^BK-\d{8}-[A-Z0-9]{6}$/);
    });

    it('should generate unique references', () => {
      const ref1 = generateBookingRef();
      const ref2 = generateBookingRef();
      expect(ref1).not.toBe(ref2);
    });

    it('should start with BK- prefix', () => {
      const ref = generateBookingRef();
      expect(ref.startsWith('BK-')).toBe(true);
    });

    it('should contain date in YYYYMMDD format', () => {
      const ref = generateBookingRef();
      const datePart = ref.split('-')[1];
      expect(datePart).toHaveLength(8);
      expect(Number(datePart)).toBeGreaterThan(20250000);
    });

    it('should have 6-character alphanumeric suffix', () => {
      const ref = generateBookingRef();
      const suffix = ref.split('-')[2];
      expect(suffix).toHaveLength(6);
      expect(suffix).toMatch(/^[A-Z0-9]{6}$/);
    });
  });

  describe('calculateNights', () => {
    it('should calculate nights correctly for same month', () => {
      const startDate = new Date('2025-06-15');
      const endDate = new Date('2025-06-20');
      expect(calculateNights(startDate, endDate)).toBe(5);
    });

    it('should calculate nights correctly across months', () => {
      const startDate = new Date('2025-01-28');
      const endDate = new Date('2025-02-03');
      expect(calculateNights(startDate, endDate)).toBe(6);
    });

    it('should return 0 for same date', () => {
      const date = new Date('2025-06-15');
      expect(calculateNights(date, date)).toBe(0);
    });

    it('should return negative for reversed dates', () => {
      const startDate = new Date('2025-06-20');
      const endDate = new Date('2025-06-15');
      expect(calculateNights(startDate, endDate)).toBe(-5);
    });

    it('should handle date strings', () => {
      expect(
        calculateNights(
          new Date('2025-06-15'),
          new Date('2025-06-20')
        )
      ).toBe(5);
    });
  });

  describe('formatDate', () => {
    it('should format date with default format', () => {
      const date = new Date('2025-06-15');
      const formatted = formatDate(date);
      expect(formatted).toContain('June 15, 2025');
    });

    it('should handle date strings', () => {
      const formatted = formatDate('2025-06-15');
      expect(formatted).toContain('June');
    });

    it('should handle current date', () => {
      const now = new Date();
      const formatted = formatDate(now);
      expect(formatted).toMatch(/\w+ \d+, \d{4}/);
    });
  });

  describe('slugify', () => {
    it('should convert string to slug', () => {
      expect(slugify('Hello World')).toBe('hello-world');
    });

    it('should handle special characters', () => {
      expect(slugify('Hello, World!')).toBe('hello-world');
    });

    it('should handle multiple spaces', () => {
      expect(slugify('Hello   World')).toBe('hello-world');
    });

    it('should handle uppercase letters', () => {
      expect(slugify('HELLO WORLD')).toBe('hello-world');
    });

    it('should handle numbers', () => {
      expect(slugify('Safari 2025')).toBe('safari-2025');
    });

    it('should remove trailing/leading dashes', () => {
      expect(slugify('  Hello World  ')).toBe('hello-world');
    });

    it('should handle empty string', () => {
      expect(slugify('')).toBe('');
    });

    it('should handle accented characters', () => {
      expect(slugify('Café résumé')).toBe('cafe-resume');
    });
  });
});
