'use client';

import { GoogleAnalytics as NextGoogleAnalytics } from '@next/third-parties/google';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

interface GoogleAnalyticsProps {
  measurementId: string;
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', measurementId, {
        page_path: pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : ''),
      });
    }
  }, [pathname, searchParams, measurementId]);

  if (!measurementId || measurementId === 'G-XXXXXXXXXX') {
    console.warn('Google Analytics measurement ID not configured');
    return null;
  }

  return <NextGoogleAnalytics gaId={measurementId} />;
}

// Event tracking helpers
export const trackEvent = (
  eventName: string,
  params?: {
    category?: string;
    label?: string;
    value?: number;
    [key: string]: any;
  }
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
};

// Tour specific events
export const trackTourView = (tourName: string, tourId: string) => {
  trackEvent('view_tour', {
    tour_name: tourName,
    tour_id: tourId,
    category: 'Tours',
  });
};

export const trackTourBooking = (tourName: string, tourId: string, price: number) => {
  trackEvent('begin_checkout', {
    tour_name: tourName,
    tour_id: tourId,
    value: price,
    currency: 'USD',
    category: 'Bookings',
  });
};

export const trackBookingComplete = (
  tourName: string,
  tourId: string,
  price: number,
  bookingId: string
) => {
  trackEvent('purchase', {
    transaction_id: bookingId,
    tour_name: tourName,
    tour_id: tourId,
    value: price,
    currency: 'USD',
    category: 'Bookings',
  });
};

// Blog specific events
export const trackBlogView = (blogTitle: string, blogSlug: string) => {
  trackEvent('view_blog', {
    blog_title: blogTitle,
    blog_slug: blogSlug,
    category: 'Blog',
  });
};

// Contact events
export const trackContactForm = (formType: string) => {
  trackEvent('contact_form_submit', {
    form_type: formType,
    category: 'Contact',
  });
};

// Search events
export const trackSearch = (searchTerm: string, resultCount: number) => {
  trackEvent('search', {
    search_term: searchTerm,
    result_count: resultCount,
    category: 'Search',
  });
};

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: {
        [key: string]: any;
      }
    ) => void;
  }
}
