import '../styles/globals.css';
import type { ReactNode } from 'react';
import { Suspense } from 'react';
import { HeaderNew } from '../components/header-new';
import { Footer } from '../components/footer';
import { WhatsAppWidget } from '../components/whatsapp-widget';
import { MobileNav } from '../components/mobile-nav';
import { SessionProviders } from '../components/providers/session-provider';
import { CurrencyProvider } from '../components/providers/currency-provider';
import { I18nProvider } from '../components/providers/i18n-provider';
import { ProgressBar } from '../components/progress-bar';
import { GoogleAnalytics } from '../components/analytics/GoogleAnalytics';
import Script from 'next/script';

export const metadata = {
  title: 'Severius Adventures & Travel | Authentic African Safari & Adventure Tours',
  description: 'Experience unforgettable African safaris, cultural tours, and adventure travel with Severius Adventures & Travel. Expert-guided tours across Kenya, Tanzania, Egypt, and beyond.',
  keywords: 'African safari, Kenya tours, Tanzania safari, Egypt tours, adventure travel, wildlife safari, Maasai Mara, cultural tours, travel Africa',
  authors: [{ name: 'Severius Adventures & Travel' }],
  openGraph: {
    title: 'Severius Adventures & Travel - Authentic African Adventures',
    description: 'Experience unforgettable African safaris and cultural tours with expert guides',
    url: 'https://severiusadventuresandtravel.com',
    siteName: 'Severius Adventures & Travel',
    images: [
      {
        url: 'https://severiusadventuresandtravel.com/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Severius Adventures & Travel Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Severius Adventures & Travel',
    description: 'Experience unforgettable African safaris and cultural tours',
    images: ['https://severiusadventuresandtravel.com/images/logo.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://severiustours.com';

  // Organization Schema (JSON-LD)
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Severius Tours & Adventures',
    url: siteUrl,
    logo: `${siteUrl}/images/logo.png`,
    description: 'Experience unforgettable African safaris, cultural tours, and adventure travel with Severius Tours & Adventures. Expert-guided tours across Kenya, Tanzania, Morocco, Egypt, and beyond.',
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@severiustours.com',
    telephone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+1-234-567-8900',
    sameAs: [
      'https://www.facebook.com/severiustours',
      'https://www.instagram.com/severiustours',
      'https://www.twitter.com/severiustours',
    ],
    priceRange: '$$-$$$',
  };

  return (
    <html lang="en">
      <head>
        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NP0SFW2QHJ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NP0SFW2QHJ');
          `}
        </Script>

        {/* Organization Schema */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

        {/* Google Site Verification */}
        {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && (
          <meta
            name="google-site-verification"
            content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
          />
        )}
      </head>
      <body className="min-h-dvh bg-[rgb(245,243,241)] text-neutral-900 flex flex-col pb-16 lg:pb-0" suppressHydrationWarning>
        <Suspense fallback={null}>
          <ProgressBar />
        </Suspense>
        <I18nProvider>
          <CurrencyProvider>
            <SessionProviders>
              <HeaderNew />
              <main className="flex-1">{children}</main>
              <Footer />
              <WhatsAppWidget />
              <MobileNav />
            </SessionProviders>
          </CurrencyProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
