import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Severius Travel - African Safari & Tour FAQs',
  description: 'Find answers to common questions about booking African safaris, tours, payments, customization, travel safety, and more with Severius Travel.',
  keywords: 'safari booking FAQ, African travel questions, tour booking help, travel safety Africa, payment methods, custom safari tours, travel insurance, visa assistance Kenya',
  openGraph: {
    title: 'FAQs | Severius Travel - Your African Adventure Questions Answered',
    description: 'Get answers to all your questions about booking safaris, payments, customization, safety, and travel planning with Severius Travel.',
    type: 'website',
    url: 'https://severiusadventuresandtravel.com/faq',
  },
  alternates: {
    canonical: 'https://severiusadventuresandtravel.com/faq',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
