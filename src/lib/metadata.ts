import { Metadata } from 'next'

const siteUrl = 'https://severiusadventuresandtravel.com'
const siteName = 'Severius Adventures & Travel'

interface PageMetadata {
  title: string
  description: string
  keywords?: string[]
  image?: string
  path?: string
  noIndex?: boolean
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  image = '/images/logo/landscape.png',
  path = '',
  noIndex = false,
}: PageMetadata): Metadata {
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`
  const url = `${siteUrl}${path}`

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
    alternates: {
      canonical: url,
    },
  }
}

// Pre-configured metadata for common pages
export const homeMetadata = generateMetadata({
  title: 'Authentic African Safari & Adventure Tours',
  description:
    'Experience unforgettable African safaris, cultural tours, and adventure travel with Severius Adventures & Travel. Expert-guided tours across Kenya, Tanzania, Zimbabwe, South Africa, Botswana, and beyond.',
  keywords: [
    'African safari',
    'Kenya tours',
    'Tanzania safari',
    'Victoria Falls',
    'Maasai Mara',
    'Serengeti',
    'adventure travel',
    'wildlife safari',
    'cultural tours',
    'travel Africa',
    'safari packages',
    'African adventure',
  ],
  path: '/',
})

export const toursMetadata = generateMetadata({
  title: 'African Safari Tours & Adventures',
  description:
    'Browse our collection of carefully curated African safari tours. From the Maasai Mara to Victoria Falls, discover unforgettable wildlife experiences and cultural adventures across East and Southern Africa.',
  keywords: [
    'safari tours',
    'African tours',
    'wildlife tours',
    'safari packages',
    'Kenya safari',
    'Tanzania tours',
    'South Africa tours',
    'Botswana safari',
    'Zimbabwe tours',
  ],
  path: '/tours',
})

export const aboutMetadata = generateMetadata({
  title: 'About Us - Authentic African Travel Experts',
  description:
    'Learn about Severius Adventures & Travel, your trusted partner for authentic African safari experiences. With 5+ years of expertise, we create unforgettable journeys across East and Southern Africa.',
  keywords: [
    'about us',
    'African travel experts',
    'safari company',
    'travel agency',
    'tour operator',
    'African adventures',
  ],
  path: '/about',
})

export const contactMetadata = generateMetadata({
  title: 'Contact Us - Plan Your African Safari',
  description:
    'Get in touch with Severius Adventures & Travel to plan your dream African safari. Our expert team is ready to help you create an unforgettable adventure across Africa.',
  keywords: [
    'contact',
    'book safari',
    'plan tour',
    'travel inquiry',
    'safari booking',
    'tour consultation',
  ],
  path: '/contact',
})

export const blogMetadata = generateMetadata({
  title: 'Travel Blog - African Safari Tips & Stories',
  description:
    'Read our travel blog for expert tips, destination guides, and inspiring stories from African safaris. Get insider knowledge to plan your perfect adventure.',
  keywords: [
    'travel blog',
    'safari tips',
    'Africa travel guide',
    'destination guides',
    'travel stories',
    'safari advice',
  ],
  path: '/blog',
})

export const faqMetadata = generateMetadata({
  title: 'Frequently Asked Questions - Safari Planning Guide',
  description:
    'Find answers to common questions about African safari tours, bookings, travel requirements, and more. Get all the information you need to plan your adventure.',
  keywords: [
    'safari FAQ',
    'travel questions',
    'booking information',
    'safari guide',
    'travel help',
  ],
  path: '/faq',
})

export const loginMetadata = generateMetadata({
  title: 'Login - Access Your Account',
  description: 'Login to your Severius Adventures & Travel account to manage your bookings and view your travel itineraries.',
  path: '/login',
  noIndex: true,
})

export const registerMetadata = generateMetadata({
  title: 'Register - Create Your Account',
  description: 'Create your Severius Adventures & Travel account to book tours, manage reservations, and access exclusive travel offers.',
  path: '/register',
  noIndex: true,
})

export const dashboardMetadata = generateMetadata({
  title: 'Dashboard - My Bookings',
  description: 'View and manage your safari bookings, travel itineraries, and account information.',
  path: '/dashboard',
  noIndex: true,
})

export const privacyMetadata = generateMetadata({
  title: 'Privacy Policy',
  description: 'Read our privacy policy to understand how Severius Adventures & Travel collects, uses, and protects your personal information.',
  path: '/privacy',
})

export const termsMetadata = generateMetadata({
  title: 'Terms & Conditions',
  description: 'Review our terms and conditions for booking tours with Severius Adventures & Travel.',
  path: '/terms',
})

export const cookiePolicyMetadata = generateMetadata({
  title: 'Cookie Policy',
  description: 'Learn about how Severius Adventures & Travel uses cookies on our website.',
  path: '/cookie-policy',
})

export const bookingPolicyMetadata = generateMetadata({
  title: 'Booking Policy',
  description: 'Read our booking policy including cancellation terms, payment schedules, and travel insurance requirements.',
  path: '/booking-policy',
})
