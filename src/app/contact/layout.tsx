import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Severius Travel - Plan Your African Adventure',
  description: 'Get in touch with Severius Travel for bookings, custom tour requests, and travel inquiries. Based in Nairobi, Kenya. Available Mon-Fri 8AM-6PM, Sat 9AM-2PM.',
  keywords: 'contact Severius Travel, book African safari, Kenya travel agency contact, tour booking Nairobi, African adventure planning, travel consultation',
  openGraph: {
    title: 'Contact Severius Travel | African Safari Booking & Inquiries',
    description: 'Ready to plan your dream African adventure? Contact our travel specialists for personalized tour packages and expert guidance.',
    type: 'website',
    url: 'https://severiusadventuresandtravel.com/contact',
  },
  alternates: {
    canonical: 'https://severiusadventuresandtravel.com/contact',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
