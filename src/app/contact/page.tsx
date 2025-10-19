'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useI18n } from '@/components/providers/i18n-provider'

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@severiusadventuresandtravel.com',
    link: `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@severiusadventuresandtravel.com'}`,
  },
  {
    icon: Phone,
    title: 'Phone',
    value: process.env.NEXT_PUBLIC_CONTACT_PHONE_DISPLAY || '+254 780 419 605',
    link: `tel:+254780419605`,
  },
  {
    icon: MapPin,
    title: 'Office Location',
    value: 'Nairobi, Kenya',
    link: 'https://maps.google.com/?q=Nairobi,Kenya',
  },
  {
    icon: Clock,
    title: 'Office Hours',
    value: 'Mon-Fri: 8AM-6PM',
    link: '#hours',
  },
]

const officeHours = [
  { day: 'Monday - Friday', hours: '8:00 AM - 6:00 PM' },
  { day: 'Saturday', hours: '9:00 AM - 2:00 PM' },
  { day: 'Sunday', hours: 'Closed' },
  { day: 'Public Holidays', hours: 'Closed' },
]

const reasons = [
  { icon: '🗺️', title: 'Plan a Custom Tour', description: 'Design your perfect African adventure' },
  { icon: '💬', title: 'Get Travel Advice', description: 'Expert guidance on destinations and timing' },
  { icon: '📅', title: 'Make a Booking', description: 'Reserve your spot on an upcoming tour' },
  { icon: '❓', title: 'Ask Questions', description: 'Get answers about payments, visas, or logistics' },
]

const subjects = [
  'General Inquiry',
  'Tour Booking',
  'Custom Tour Request',
  'Payment Question',
  'Travel Advice',
  'Other',
]

export default function ContactPage() {
  const { t } = useI18n()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
    honeypot: '', // Bot protection field
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Honeypot check - if filled, it's a bot
    if (formData.honeypot) {
      console.log('Bot detected')
      return
    }
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `${formData.subject}: ${formData.message}`
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.error || 'Failed to send message. Please try again.')
        setIsSubmitting(false)
        return
      }

      setIsSubmitting(false)
      setSubmitted(true)
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setSubmitted(false)
        setFormData({ 
          name: '', 
          email: '', 
          phone: '', 
          subject: 'General Inquiry', 
          message: '',
          honeypot: ''
        })
        setErrors({})
      }, 5000)
    } catch (error) {
      alert('Failed to send message. Please try again.')
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--color-brown))] via-[rgb(var(--color-brown))]/90 to-[rgb(var(--color-gold))]/80"></div>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23fff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }}></div>
        <div className="container mx-auto px-6 relative z-10 text-center py-20">
          <Badge className="mb-4 bg-white/20 text-white border-white/30">
            {t('contact.support247')}
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            {t('contact.hero.title')}
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-white/90 drop-shadow-md">
            {t('contact.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon
              return (
                <a
                  key={index}
                  href={info.link}
                  className="block group"
                  target={info.link.startsWith('http') ? '_blank' : undefined}
                  rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <Card className="h-full hover:shadow-lg transition-all hover:border-[rgb(var(--color-gold))] cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[rgb(var(--color-gold))]/10 mb-4 group-hover:bg-[rgb(var(--color-gold))]/20 transition-colors">
                        <IconComponent className="w-8 h-8 text-[rgb(var(--color-gold))]" />
                      </div>
                      <h3 className="text-lg font-bold text-[rgb(var(--color-brown))] mb-2">{info.title}</h3>
                      <p className="text-neutral-600 text-sm">{info.value}</p>
                    </CardContent>
                  </Card>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Main Content: Form + Info */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-2">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Send Us a Message
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Fill out the form below and one of our travel specialists will get back to you as soon as possible.
                  </p>

                  {submitted ? (
                    <div className="bg-green-50 border-2 border-green-500 rounded-lg p-8 text-center">
                      <span className="text-6xl block mb-4">✅</span>
                      <h3 className="text-2xl font-bold text-green-800 mb-2">Message Sent!</h3>
                      <p className="text-green-700">We'll get back to you within 24 hours.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            required
                            className={`h-12 ${errors.name ? 'border-red-500' : ''}`}
                          />
                          {errors.name && (
                            <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            required
                            className={`h-12 ${errors.email ? 'border-red-500' : ''}`}
                          />
                          {errors.email && (
                            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone Number *
                          </label>
                          <Input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+254 712 345 678"
                            required
                            className={`h-12 ${errors.phone ? 'border-red-500' : ''}`}
                          />
                          {errors.phone && (
                            <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Subject *
                          </label>
                          <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="w-full h-12 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
                          >
                            {subjects.map((subject) => (
                              <option key={subject} value={subject}>
                                {subject}
                              </option>
                            ))}
                          </select>
                          {errors.subject && (
                            <p className="text-red-600 text-sm mt-1">{errors.subject}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Message *
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={6}
                          placeholder="Tell us about your travel plans, questions, or how we can help..."
                          required
                          className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                            errors.message ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.message && (
                          <p className="text-red-600 text-sm mt-1">{errors.message}</p>
                        )}
                      </div>

                      {/* Honeypot field - hidden from users but visible to bots */}
                      <div className="hidden" aria-hidden="true">
                        <label htmlFor="honeypot">Leave this field empty</label>
                        <input
                          type="text"
                          id="honeypot"
                          name="honeypot"
                          value={formData.honeypot}
                          onChange={handleChange}
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full bg-[rgb(var(--color-gold))] hover:bg-[rgb(var(--color-gold))]/90 text-white text-lg h-14 font-semibold transition-all transform hover:scale-[1.02]"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            <Send className="w-5 h-5" />
                            Send Message
                          </span>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-8">
              {/* Office Hours */}
              <Card className="border-2 border-blue-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span>🕐</span> Office Hours
                  </h3>
                  <div className="space-y-3">
                    {officeHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-700 font-medium">{schedule.day}</span>
                        <span className="text-gray-600">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Why Contact Us */}
              <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Why Reach Out?
                  </h3>
                  <div className="space-y-4">
                    {reasons.map((reason, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className="text-2xl">{reason.icon}</span>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm">{reason.title}</h4>
                          <p className="text-xs text-gray-600">{reason.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 24/7 Support */}
              <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
                <CardContent className="p-6 text-center">
                  <span className="text-4xl block mb-3">🎧</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    24/7 Support
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Once you book, you'll receive dedicated contact details for round-the-clock assistance during your trip.
                  </p>
                  <Badge className="bg-green-600">Always Here for You</Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-[rgb(var(--color-brown))] to-[rgb(var(--color-brown))]/90 text-white border-0 shadow-2xl">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your Adventure?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Don't wait! Explore our handpicked tours and start planning your dream African getaway today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-[rgb(var(--color-gold))] hover:bg-[rgb(var(--color-gold))]/90 text-white text-lg px-8 transform hover:scale-105 transition-all shadow-lg">
                  <Link href="/tours">Browse Tours</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 transform hover:scale-105 transition-all">
                  <Link href="/faq">Read FAQs</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            mainEntity: {
              '@type': 'TravelAgency',
              name: 'Severius Travel',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Nairobi',
                addressCountry: 'Kenya',
              },
              email: 'info@severiusadventuresandtravel.com',
              telephone: '+254XXXXXXXXX',
              url: 'https://severiusadventuresandtravel.com',
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '08:00',
                  closes: '18:00',
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: 'Saturday',
                  opens: '09:00',
                  closes: '14:00',
                },
              ],
            },
          }),
        }}
      />
    </div>
  )
}
