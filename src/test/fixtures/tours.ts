import type { Tour } from '@/data/tours';

export const mockTour: Partial<Tour> = {
  id: 'test-tour-001',
  slug: 'test-safari-5-days',
  title: '5 Days Test Safari',
  country: 'Kenya',
  region: 'Maasai Mara',
  description: 'Test safari description',
  durationDays: 5,
  price: 1500,
  priceEUR: 1400,
  priceGBP: 1200,
  priceKES: 190000,
  published: true,
  coverImage: '/images/test/cover.jpg',
  gallery: ['/images/test/1.jpg', '/images/test/2.jpg'],
  highlights: ['Wildlife viewing', 'Cultural experience'],
  itinerary: [
    {
      day: 1,
      title: 'Arrival',
      description: 'Arrive at Nairobi',
      meals: 'Dinner',
      accommodation: 'Test Hotel',
    },
  ],
  inclusions: ['Accommodation', 'Meals', 'Game drives'],
  exclusions: ['Flights', 'Tips'],
  faqs: [
    {
      question: 'What should I bring?',
      answer: 'Comfortable clothing and camera',
    },
  ],
  difficulty: 'Easy',
  maxGroupSize: 8,
  minGroupSize: 2,
  accommodationType: 'Lodge',
  mealPlan: 'Full Board',
  bestMonths: ['Jan', 'Feb', 'Mar'],
  requirements: ['Valid passport'],
  featured: false,
  promoted: false,
  metaDescription: 'Test safari meta description',
  keywords: ['wildlife', 'photography'],
  countryCode: 'KE',
};

export const mockTours: Partial<Tour>[] = [
  mockTour,
  {
    ...mockTour,
    id: 'test-tour-002',
    slug: 'test-safari-7-days',
    title: '7 Days Test Safari',
    durationDays: 7,
    price: 2100,
  },
];
