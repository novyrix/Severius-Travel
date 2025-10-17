'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/components/providers/i18n-provider'

const values = [
  { key: 'personalized', icon: '🌟' },
  { key: 'expertise', icon: '🧭' },
  { key: 'safety', icon: '�️' },
  { key: 'quality', icon: '💎' },
  { key: 'support', icon: '💬' },
  { key: 'sustainable', icon: '🌍' },
]

const destinations = [
  { name: 'Maasai Mara', country: 'Kenya', type: 'Wildlife Safari', emoji: '🦁', image: '/images/about/kenya.jpg' },
  { name: 'Serengeti', country: 'Tanzania', type: 'National Park', emoji: '🦒', image: '/images/about/tanzania.jpg' },
  { name: 'Marrakech', country: 'Morocco', type: 'Cultural City', emoji: '🏛️', image: '/images/about/morocco.jpg' },
  { name: 'Cape Town', country: 'South Africa', type: 'Coastal City', emoji: '🏔️', image: '/images/about/south-africa.jpg' },
  { name: 'Seychelles', country: 'Seychelles', type: 'Island Paradise', emoji: '🏝️', image: '/images/about/seychelles.jpg' },
  { name: 'Zanzibar', country: 'Tanzania', type: 'Beach Resort', emoji: '🏖️', image: '/images/about/egypt.jpg' },
]

const stats = [
  { key: 'travelers', number: '500+' },
  { key: 'destinations', number: '50+' },
  { key: 'experience', number: '10+' },
  { key: 'rating', number: '4.9/5' },
]

export default function AboutPage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/about/hero.jpg"
          alt="African Safari Adventure"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center py-20">
          <div className="inline-block mb-6 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
            {t('about.hero.badge')}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {t('about.hero.title')}
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            {t('about.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('about.story.title')}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-amber-600 to-orange-600"></div>
            </div>
            
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>{t('about.story.intro')}</p>
              <p>{t('about.story.description')}</p>
              <p>{t('about.story.commitment')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t('about.mission.title')}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-600 to-orange-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 leading-relaxed">
              {t('about.mission.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('about.values.title')}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-600 to-orange-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('about.values.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {values.map((value) => (
              <Card key={value.key} className="border-2 hover:border-amber-500 transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    {t(`about.values.items.${value.key}.title`)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t(`about.values.items.${value.key}.description`)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* What We Offer */}
          <div className="mt-16 max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">
                  {t('about.offer.title')}
                </h3>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-xl mt-1">✓</span>
                    <span className="text-lg">{t('about.offer.item1')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl mt-1">✓</span>
                    <span className="text-lg">{t('about.offer.item2')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl mt-1">✓</span>
                    <span className="text-lg">{t('about.offer.item3')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl mt-1">✓</span>
                    <span className="text-lg">{t('about.offer.item4')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl mt-1">✓</span>
                    <span className="text-lg">{t('about.offer.item5')}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('about.destinations.title')}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-600 to-orange-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('about.destinations.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {destinations.map((dest, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={dest.image}
                    alt={`${dest.name}, ${dest.country}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-2xl mb-1">{dest.emoji}</div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{dest.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{dest.country}</p>
                  <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                    {dest.type}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.key} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-lg md:text-xl opacity-90">
                  {t(`about.stats.${stat.key}`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t('about.cta.title')}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {t('about.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tours">
                <Button size="lg" className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-6 text-lg">
                  {t('about.cta.button1')}
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-2 border-amber-600 text-amber-600 hover:bg-amber-50 px-8 py-6 text-lg">
                  {t('about.cta.button2')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
