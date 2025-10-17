import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Severius Travel | Your Gateway to Authentic African Adventures',
  description: 'Severius Travel specializes in crafting unforgettable African travel experiences. Based in Kenya, we offer curated tours across East, Southern, and North Africa with personalized service and local expertise.',
  keywords: 'African travel company, Kenya safari tours, African adventures, luxury African travel, Maasai Mara tours, African tour operator, personalized safari experiences, East Africa tours, wildlife safari Kenya',
  openGraph: {
    title: 'About Severius Travel | Authentic African Adventures',
    description: 'Your trusted gateway to authentic African adventures. Specializing in personalized safari experiences, cultural journeys, and luxury island escapes.',
    type: 'website',
    url: 'https://severiusadventuresandtravel.com/about',
    images: [
      {
        url: '/images/destinations/kenya.jpg',
        width: 1200,
        height: 630,
        alt: 'Severius Travel - African Safari Adventures',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Severius Travel | African Adventure Specialists',
    description: 'Crafting unforgettable African travel experiences with personalized service and local expertise.',
  },
  alternates: {
    canonical: 'https://severiusadventuresandtravel.com/about',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
