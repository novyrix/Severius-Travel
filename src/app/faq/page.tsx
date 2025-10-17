'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StaggerContainer, StaggerItem, FadeIn } from '@/components/animated-page'
import { useI18n } from '@/components/providers/i18n-provider'

const pageMetadata = {
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

const faqs = [
  {
    id: 1,
    category: 'Booking',
    question: 'How do I book a tour with Severius Travel?',
    answer: "Booking is simple. Browse through our available tour packages, select the one that suits you best, fill in your booking details, and proceed to secure payment. You'll receive a confirmation once your booking is complete.",
  },
  {
    id: 2,
    category: 'Payment',
    question: 'What payment methods do you accept?',
    answer: 'We use Pesapal, a trusted online payment platform that accepts major credit/debit cards and mobile money. All payments are processed securely with industry-standard encryption.',
  },
  {
    id: 3,
    category: 'Customization',
    question: 'Can you customize a tour for me?',
    answer: 'Absolutely. We specialize in tailor-made itineraries. Whether you want to extend your stay, add destinations, or focus on specific experiences (like safaris, beaches, or culture), our team will design a journey that fits your preferences.',
  },
  {
    id: 4,
    category: 'Services',
    question: 'Do you arrange airport transfers and accommodation?',
    answer: 'Yes. Our packages typically include accommodation and transfers, but we can also arrange these services separately if needed. All our accommodations are carefully vetted for quality and safety.',
  },
  {
    id: 5,
    category: 'Travel Planning',
    question: 'When is the best time to travel to Africa?',
    answer: 'Africa is a year-round destination, but the best time depends on your itinerary. For safaris, the dry season (June–October) is ideal for wildlife viewing. For coastal and island trips, November–March offers warm, sunny weather.',
  },
  {
    id: 6,
    category: 'Safety',
    question: 'Is it safe to travel with Severius?',
    answer: 'Yes. Your safety is our top priority. We work only with trusted partners, follow international safety standards, and provide clear travel guidance for all destinations. We also offer 24/7 support during your trip.',
  },
  {
    id: 7,
    category: 'Documentation',
    question: 'Do you help with visas or travel insurance?',
    answer: "While we don't issue visas directly, we offer guidance and can provide necessary documents to support your visa application. We also strongly recommend that all travelers arrange comprehensive travel insurance before their trip.",
  },
  {
    id: 8,
    category: 'Support',
    question: 'How can I contact you for support during my trip?',
    answer: "We offer 24/7 support for travelers. You'll receive a dedicated contact number and email once your booking is confirmed. Our team is always available to assist with any questions or concerns.",
  },
  {
    id: 9,
    category: 'Booking',
    question: 'Can I make changes to my booking after confirmation?',
    answer: 'Yes, we understand plans can change. Contact us as soon as possible if you need to modify your booking. Changes are subject to availability and may incur additional fees depending on the nature of the modification.',
  },
  {
    id: 10,
    category: 'Group Travel',
    question: 'Do you offer group discounts?',
    answer: 'Yes! We offer special rates for groups of 6 or more travelers. Contact our team for a customized group package that includes exclusive benefits and competitive pricing.',
  },
  {
    id: 11,
    category: 'Payment',
    question: 'Do I need to pay the full amount upfront?',
    answer: 'We typically require a deposit to secure your booking, with the balance due before your departure date. Specific payment terms will be outlined in your booking confirmation.',
  },
  {
    id: 12,
    category: 'Travel Planning',
    question: 'What should I pack for my African safari?',
    answer: "Pack lightweight, neutral-colored clothing, comfortable walking shoes, sun protection (hat, sunglasses, sunscreen), binoculars, camera, and any personal medications. We will provide a detailed packing list after booking.",
  },
]

const categories = [...new Set(faqs.map(faq => faq.category))]

export default function FAQPage() {
  const { t } = useI18n()
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('All Questions')

  const filteredFaqs = selectedCategory === 'All Questions' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory)

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[rgb(var(--color-beige))]"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[rgb(78,52,46)] to-[rgb(212,175,55)] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="text-6xl mb-6 block"
          >
            💡
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto opacity-95"
          >
            Everything you need to know about planning your African adventure with Severius Travel
          </motion.p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-white sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <Badge 
              variant={selectedCategory === 'All Questions' ? 'default' : 'secondary'} 
              className="text-base py-2 px-4 cursor-pointer bg-[rgb(var(--color-brown))] hover:bg-[rgb(var(--color-brown))]/90 text-white transition-colors"
              onClick={() => setSelectedCategory('All Questions')}
            >
              All Questions
            </Badge>
            {categories.map((category) => (
              <Badge 
                key={category} 
                variant={selectedCategory === category ? 'default' : 'outline'} 
                className={`text-base py-2 px-4 cursor-pointer transition-colors ${
                  selectedCategory === category 
                    ? 'bg-[rgb(var(--color-gold))] text-white hover:bg-[rgb(var(--color-gold))]/90' 
                    : 'hover:bg-[rgb(var(--color-gold))]/10 hover:text-[rgb(var(--color-brown))] hover:border-[rgb(var(--color-gold))]'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <StaggerContainer className="space-y-4">
            <AnimatePresence>
              {filteredFaqs.map((faq) => (
                <StaggerItem key={faq.id}>
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card 
                      className="hover:shadow-lg transition-all cursor-pointer hover:border-[rgb(var(--color-gold))] border-2 border-transparent"
                      onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            <Badge className="mt-1 bg-[rgb(var(--color-brown))] hover:bg-[rgb(var(--color-gold))] transition-colors shrink-0">{faq.category}</Badge>
                            <div className="flex-1">
                              <h3 className="text-lg md:text-xl font-bold text-[rgb(var(--color-brown))] mb-2">
                                {faq.question}
                              </h3>
                              <AnimatePresence>
                                {expandedId === faq.id && (
                                  <motion.p
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-neutral-700 leading-relaxed text-base pt-2"
                                  >
                                    {faq.answer}
                                  </motion.p>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                          <motion.div
                            animate={{ rotate: expandedId === faq.id ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-2xl text-[rgb(var(--color-gold))]"
                          >
                            ▼
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </StaggerItem>
              ))}
            </AnimatePresence>
          </StaggerContainer>
        </div>
      </section>

      {/* Quick Help Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-[rgb(78,52,46)] to-[rgb(212,175,55)] border-0">
              <CardContent className="p-8 md:p-12 text-center">
                <motion.span 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="text-5xl mb-4 block"
                >
                  �
                </motion.span>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Still Have Questions?
                </h2>
                <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
                  Our travel specialists are here to help! Whether you need booking assistance, 
                  customization advice, or travel tips, we're just a message away.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-white text-[rgb(var(--color-brown))] hover:bg-white/90 text-lg px-8">
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                  <Button asChild size="lg" className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border-2 border-white/30 text-lg px-8">
                    <Link href="/tours">Browse Tours</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-16 bg-[rgb(var(--color-beige))]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-[rgb(var(--color-brown))] mb-12">
              Popular Topics
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => {
                const categoryCount = faqs.filter(faq => faq.category === category).length
                return (
                  <motion.div
                    key={category}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card 
                      className="hover:shadow-lg transition-all cursor-pointer hover:border-[rgb(var(--color-gold))] border-2 h-full"
                      onClick={() => setSelectedCategory(category)}
                    >
                      <CardContent className="p-6 text-center">
                        <h3 className="text-xl font-bold text-[rgb(var(--color-brown))] mb-2">{category}</h3>
                        <p className="text-neutral-600">{categoryCount} question{categoryCount !== 1 ? 's' : ''}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </motion.div>
  )
}
