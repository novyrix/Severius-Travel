/**
 * COMPREHENSIVE EAST AFRICA TOUR CATALOG
 * Severius Adventures - Premium Safari & Adventure Experiences
 * 
 * This file contains detailed tour packages for Kenya, Tanzania, Uganda, Rwanda
 * and Southern Africa with realistic pricing, complete itineraries, and authentic details.
 */

export interface Tour {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number; // Base price in USD per person
  priceEUR: number;
  priceGBP: number;
  priceKES: number;
  published: boolean;
  durationDays: number;
  
  // Location
  country: string;
  countryCode: string;
  city?: string;
  region: string;
  latitude?: number;
  longitude?: number;
  
  // Tour details
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Strenuous';
  maxGroupSize: number;
  minGroupSize: number;
  ageRestriction?: string;
  
  // Accommodation & Meals
  accommodationType: string;
  mealPlan: string;
  
  // Timing
  bestMonths: string[];
  
  // Rich content
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: DayItinerary[];
  faqs: FAQ[];
  requirements: string[];
  
  // Images
  coverImage: string;
  gallery: string[];
  
  // SEO
  metaDescription: string;
  keywords: string[];
}

export interface DayItinerary {
  day: number;
  title: string;
  description: string;
  meals?: string;
  accommodation?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

/**
 * KENYA TOURS
 */

const kenyaTours: Tour[] = [
  {
    id: 'maasai-mara-safari-5day',
    title: '5-Day Maasai Mara Safari Adventure',
    slug: 'maasai-mara-safari-5day',
    description: 'Experience the ultimate African safari in Kenya\'s most famous wildlife reserve. Witness the Great Wildebeest Migration, spot the Big Five, visit Maasai villages, and stay in luxury lodges with stunning views of the endless savanna.',
    price: 2450,
    priceEUR: 2250,
    priceGBP: 1900,
    priceKES: 315000,
    published: true,
    durationDays: 5,
    
    country: 'Kenya',
    countryCode: 'KE',
    city: 'Maasai Mara',
    region: 'East Africa',
    latitude: -1.5,
    longitude: 35.14,
    
    difficulty: 'Easy',
    maxGroupSize: 6,
    minGroupSize: 2,
    ageRestriction: 'All ages welcome',
    
    accommodationType: 'Luxury Safari Lodge',
    mealPlan: 'Full Board (All Meals)',
    
    bestMonths: ['July', 'August', 'September', 'October', 'January', 'February'],
    
    highlights: [
      'Witness the Great Wildebeest Migration (July-October)',
      'Spot all Big Five animals - lion, leopard, elephant, buffalo, rhino',
      'Visit an authentic Maasai village and learn about their culture',
      'Daily game drives with professional safari guide',
      'Mara River crossings - dramatic wildlife spectacle',
      'Stunning sunsets over the African savanna',
      'Luxury lodge with infinity pool overlooking the Mara',
      'Optional hot air balloon safari at dawn ($450)',
    ],
    
    inclusions: [
      'Airport transfers from/to Nairobi (Jomo Kenyatta)',
      '4 nights accommodation in luxury safari lodge',
      'All meals - breakfast, lunch, dinner',
      'Daily morning and afternoon game drives',
      'Professional English-speaking safari guide',
      '4x4 Land Cruiser with pop-up roof for game viewing',
      'All park entrance fees and conservancy fees',
      'Maasai village cultural visit',
      'Bottled mineral water during game drives',
      'Flying Doctors emergency evacuation insurance',
    ],
    
    exclusions: [
      'International flights to/from Kenya',
      'Kenya visa ($51 USD - apply online)',
      'Travel and medical insurance',
      'Optional hot air balloon safari ($450 per person)',
      'Tips and gratuities (recommend $15-20 per day)',
      'Alcoholic beverages and premium drinks',
      'Personal expenses and souvenirs',
      'Laundry services',
    ],
    
    itinerary: [
      {
        day: 1,
        title: 'Nairobi to Maasai Mara',
        description: 'Your adventure begins with pickup from your Nairobi hotel or airport at 7:30 AM. Drive through the scenic Great Rift Valley, stopping at the viewpoint for photos. Descend the escarpment and continue to Maasai Mara National Reserve (5-6 hours). Arrive at your lodge in time for lunch with views over the reserve. After settling in and refreshing, embark on your first game drive from 4:00 PM to 6:30 PM. Watch the sun set over the Mara while spotting wildlife. Dinner at the lodge followed by evening briefing about the next day\'s activities.',
        meals: 'Lunch, Dinner',
        accommodation: 'Mara Serena Safari Lodge or similar luxury lodge',
      },
      {
        day: 2,
        title: 'Full Day Maasai Mara Game Drives',
        description: 'Early wake-up call at 6:00 AM for sunrise game drive - the best time to see predators hunting. Spend the morning exploring different areas of the reserve, from open grasslands to acacia-dotted plains. Return to lodge for late breakfast around 10:00 AM. Relax by the pool or on your private veranda until lunch. After lunch and siesta, head out for afternoon game drive from 4:00 PM. Track lions, spot elephant herds, and search for elusive leopards in the trees. Optional: Full day game drive with picnic lunch in the bush ($50 extra). Return to lodge for dinner and share stories around the campfire.',
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Mara Serena Safari Lodge or similar',
      },
      {
        day: 3,
        title: 'Mara River & Maasai Village Experience',
        description: 'After breakfast, drive to the Mara River - famous for dramatic wildebeest crossings during migration season (July-October). Watch crocodiles sunbathing on the banks and hippos wallowing in pools. Even outside migration, the area is rich with wildlife. Mid-morning visit to a traditional Maasai village where you\'ll be welcomed with singing and dancing. Learn about Maasai culture, their nomadic lifestyle, and traditional customs. Participate in jewelry making and see their homes (manyatta). Return to lodge for lunch. Afternoon game drive exploring new areas of the reserve, perhaps visiting Rhino Ridge or Musiara Marsh. Evening sundowner drinks in the bush (extra). Dinner and overnight at lodge.',
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Mara Serena Safari Lodge or similar',
      },
      {
        day: 4,
        title: 'Optional Balloon Safari & Final Game Drive',
        description: 'Optional: Hot air balloon safari at dawn (5:30 AM start, $450 per person). Float silently over the Mara at sunrise for spectacular aerial views of wildlife. Land in the bush for champagne breakfast. For those not ballooning, enjoy a leisurely breakfast at the lodge. Late morning game drive exploring areas you haven\'t yet visited. Return for lunch and relaxation at the lodge. Perhaps enjoy the spa or take a nature walk around the lodge grounds. Final afternoon game drive from 4:00 PM, making the most of your last hours in the Mara. Your guide will take you to favorite spots or areas where recent wildlife sightings have occurred. Farewell dinner at the lodge with traditional entertainment.',
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Mara Serena Safari Lodge or similar',
      },
      {
        day: 5,
        title: 'Maasai Mara to Nairobi - Departure',
        description: 'Final early morning game drive departing at 6:30 AM - last chance to spot any animals you\'ve been hoping to see. Return to lodge for full breakfast around 9:00 AM. Check out and begin the journey back to Nairobi, with game viewing as you exit the reserve. Stop again at Great Rift Valley viewpoint for photos. Arrive in Nairobi around 2:00-3:00 PM. Optional day room at a Nairobi hotel ($60) if you have an evening flight. Transfer to Jomo Kenyatta International Airport for your departure flight, or drop-off at your Nairobi hotel. End of safari with incredible memories!',
        meals: 'Breakfast',
        accommodation: 'N/A',
      },
    ],
    
    faqs: [
      {
        question: 'When is the best time to see the Great Migration?',
        answer: 'The Great Migration is typically in the Maasai Mara from late June through October, with peak river crossings in August and September. However, wildlife viewing is excellent year-round, and January-February offers the green season with newborn animals and fewer crowds.',
      },
      {
        question: 'What should I pack for the safari?',
        answer: 'Pack neutral-colored clothing (khaki, beige, olive green), warm layers for early mornings, sunscreen (SPF 50+), sunglasses, wide-brimmed hat, comfortable walking shoes, binoculars, camera with zoom lens (200-400mm recommended), insect repellent, and personal medications. Avoid bright colors, white, and black clothing. Laundry service is available at lodges.',
      },
      {
        question: 'Is this safari suitable for children?',
        answer: 'Yes! The Maasai Mara is excellent for families. Children of all ages are welcome, though kids should be able to sit quietly during game drives (usually 3-4 hours). Many lodges offer family rooms and some have kids\' programs. Game drives are adjusted to accommodate young travelers with more frequent breaks.',
      },
      {
        question: 'What animals will I see?',
        answer: 'The Maasai Mara has abundant wildlife. You\'re highly likely to see lions, elephants, buffaloes, giraffes, zebras, wildebeest, gazelles, and various antelope species. Leopards and rhinos are more elusive but possible. Cheetahs are commonly spotted on the open plains. Over 450 bird species also inhabit the area.',
      },
      {
        question: 'Are game drives safe?',
        answer: 'Yes, very safe. You\'ll be in a sturdy 4x4 vehicle with an experienced guide who understands animal behavior. You must remain in the vehicle at all times during game drives unless at designated areas or on guided walks. Animals generally ignore vehicles as they don\'t perceive them as threats.',
      },
      {
        question: 'What about dietary requirements?',
        answer: 'All dietary requirements can be accommodated including vegetarian, vegan, gluten-free, and religious dietary needs. Please inform us at booking so we can notify the lodges in advance.',
      },
    ],
    
    requirements: [
      'Valid passport with 6 months validity from travel date',
      'Kenya eVisa (apply online at evisa.go.ke) - $51 USD',
      'Yellow fever vaccination certificate (required if arriving from endemic countries)',
      'COVID-19 vaccination certificate (recommended)',
      'Comprehensive travel insurance including medical evacuation',
      'Proof of accommodation booking',
    ],
    
    coverImage: '/images/tours/maasai-mara-cover.jpg',
    gallery: [
      '/images/tours/maasai-mara-lions.jpg',
      '/images/tours/maasai-mara-migration.jpg',
      '/images/tours/maasai-mara-sunset.jpg',
      '/images/tours/maasai-mara-lodge.jpg',
    ],
    
    metaDescription: '5-day luxury Maasai Mara safari in Kenya. Witness the Great Migration, spot the Big Five, and experience authentic Maasai culture. All-inclusive package from $2,450. Book your African adventure today!',
    keywords: ['Maasai Mara Safari', 'Kenya Safari', 'Great Migration', 'Big Five', 'Wildlife Safari', 'African Safari', 'Maasai Village', 'Luxury Safari Kenya'],
  },

  {
    id: 'amboseli-tsavo-combo',
    title: '6-Day Amboseli & Tsavo National Parks Safari',
    slug: 'amboseli-tsavo-combo',
    description: 'Explore two of Kenya\'s most iconic parks on this 6-day safari adventure. Marvel at Mount Kilimanjaro\'s snow-capped peak in Amboseli, famous for large elephant herds, then discover the raw wilderness of Tsavo, Kenya\'s largest national park, home to the famous red elephants and diverse wildlife.',
    price: 1950,
    priceEUR: 1800,
    priceGBP: 1520,
    priceKES: 250000,
    published: true,
    durationDays: 6,
    
    country: 'Kenya',
    countryCode: 'KE',
    city: 'Amboseli & Tsavo',
    region: 'East Africa',
    latitude: -2.65,
    longitude: 37.26,
    
    difficulty: 'Easy',
    maxGroupSize: 6,
    minGroupSize: 2,
    ageRestriction: 'All ages',
    
    accommodationType: 'Safari Lodge & Tented Camp',
    mealPlan: 'Full Board',
    
    bestMonths: ['January', 'February', 'June', 'July', 'August', 'September', 'October', 'November'],
    
    highlights: [
      'Iconic views of Mount Kilimanjaro towering over elephants',
      'Large elephant herds - Amboseli has over 1,600 elephants',
      'Tsavo\'s famous red elephants (colored by red volcanic soil)',
      'Mzima Springs - crystal-clear springs with hippos and crocodiles',
      'Observation Hill for panoramic views of Amboseli',
      'Visit Shetani Lava Flow - dramatic volcanic landscape',
      'Diverse wildlife: lions, leopards, cheetahs, buffaloes, rhinos',
      'Over 600 bird species between both parks',
      'Less crowded than Maasai Mara - authentic wilderness',
    ],
    
    inclusions: [
      'All transfers from/to Nairobi',
      '5 nights accommodation (3 nights Amboseli, 2 nights Tsavo)',
      'All meals during safari',
      'Daily game drives',
      'Park entrance fees for both parks',
      'Professional safari guide',
      '4x4 safari vehicle with pop-up roof',
      'Bottled water during game drives',
      'Visit to Maasai cultural village',
      'Flying Doctors emergency evacuation cover',
    ],
    
    exclusions: [
      'International flights',
      'Kenya visa ($51)',
      'Travel insurance',
      'Alcoholic drinks',
      'Tips ($15-20 per day recommended)',
      'Personal expenses',
      'Optional activities',
    ],
    
    itinerary: [
      {
        day: 1,
        title: 'Nairobi to Amboseli National Park',
        description: 'Depart Nairobi at 8:00 AM and drive southeast towards Amboseli (approximately 4-5 hours). Pass through Maasai lands with views of Mount Kilimanjaro in the distance. Arrive at your lodge in time for lunch. After checking in and freshening up, embark on your first afternoon game drive. Amboseli is famous for elephants, and you\'ll likely encounter large herds. Watch for other wildlife including wildebeest, zebras, giraffes, and numerous bird species. If the weather is clear, enjoy stunning views of Kilimanjaro. Return to lodge for dinner.',
        meals: 'Lunch, Dinner',
        accommodation: 'Amboseli Serena Safari Lodge or similar',
      },
      {
        day: 2,
        title: 'Full Day Amboseli Exploration',
        description: 'Early morning game drive at 6:30 AM when Kilimanjaro is usually clearest and wildlife is most active. Return for breakfast around 9:00 AM. Mid-morning game drive visiting Observation Hill - climb to the top for panoramic views over the entire park, the swamps, and Kilimanjaro. See the park\'s four different habitats: swamps, savanna, woodlands, and lava rock areas. Lunch at the lodge and some rest time. Afternoon game drive exploring the Enkongo Narok swamps where elephants and hippos gather. The golden hour light with Kilimanjaro as a backdrop makes for spectacular photography. Return for dinner.',
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Amboseli Serena Safari Lodge or similar',
      },
      {
        day: 3,
        title: 'Amboseli to Tsavo West',
        description: 'Final morning game drive in Amboseli after breakfast. Check out around 10:00 AM and drive to Tsavo West National Park (approximately 2-3 hours). Arrive at your camp/lodge for lunch. After lunch, visit Mzima Springs - a series of crystal-clear springs fed by underground streams from Kilimanjaro. Walk the nature trail and view hippos and crocodiles from an underwater viewing chamber. Continue with game drive in Tsavo West, known for its dramatic landscapes, including volcanic hills and lava flows. Visit Shetani Lava Flow if time permits. Return to camp for dinner.',
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Kilaguni Serena Safari Lodge or similar',
      },
      {
        day: 4,
        title: 'Tsavo West to Tsavo East',
        description: 'Morning game drive in Tsavo West, exploring different areas of the park. Look for the rare fringe-eared oryx and spot Tsavo\'s lions (some males famously have minimal manes). After breakfast at the lodge, drive to Tsavo East National Park (approximately 2 hours). Tsavo East is known for its red elephants - elephants that dust themselves with the park\'s red volcanic soil. Check into your lodge and have lunch. Afternoon game drive along the Galana River, home to large pods of hippos and massive crocodiles. The river attracts abundant wildlife, especially during dry season. Dinner and overnight.',
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Ashnil Aruba Lodge or similar',
      },
      {
        day: 5,
        title: 'Full Day Tsavo East Safari',
        description: 'Full day exploring Tsavo East, Kenya\'s largest national park. Morning game drive after early breakfast. Visit Lugard Falls on the Galana River where water rushes through narrow rock channels. Continue to Mudanda Rock, a natural water catchment that attracts elephants and other wildlife. Picnic lunch in the bush under acacia trees. Afternoon game drive exploring the vast savanna plains. Tsavo East is less visited than other parks, offering a truly wild experience. Search for leopards, cheetahs, and the numerous buffalo herds. Return to lodge for sundowner drinks and dinner.',
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Ashnil Aruba Lodge or similar',
      },
      {
        day: 6,
        title: 'Tsavo East to Nairobi',
        description: 'Early morning game drive to maximize your last wildlife viewing opportunities. Return to lodge for breakfast. Check out and begin the drive back to Nairobi (approximately 5-6 hours), with game viewing as you exit the park. Stop for lunch en route (own expense) or packed lunch from the lodge. Arrive in Nairobi in the afternoon. Drop off at your hotel or transfer to the airport for evening flight. End of safari.',
        meals: 'Breakfast',
        accommodation: 'N/A',
      },
    ],
    
    faqs: [
      {
        question: 'Will I see Mount Kilimanjaro?',
        answer: 'Kilimanjaro is best viewed early morning and late afternoon before clouds cover the peak. January-February and August-September typically offer the clearest views. The mountain is across the border in Tanzania but perfectly visible from Amboseli.',
      },
      {
        question: 'Why are Tsavo elephants red?',
        answer: 'Tsavo elephants aren\'t naturally red - they take on the color of the park\'s red volcanic soil when they dust-bathe. This is their way of protecting their skin from the sun and parasites. When it rains, you can see their natural gray color.',
      },
      {
        question: 'How does this safari compare to Maasai Mara?',
        answer: 'Tsavo and Amboseli offer a more remote, wilderness experience with fewer tourists. While the Mara has denser wildlife populations, these parks offer unique landscapes, different species, and a more intimate safari experience. Excellent for those seeking off-the-beaten-path adventures.',
      },
    ],
    
    requirements: [
      'Valid passport (6 months validity)',
      'Kenya eVisa ($51)',
      'Travel insurance',
      'Yellow fever certificate if from endemic area',
      'Comfortable safari clothing',
    ],
    
    coverImage: '/images/tours/amboseli-kilimanjaro.jpg',
    gallery: [
      '/images/tours/amboseli-elephants.jpg',
      '/images/tours/tsavo-red-elephant.jpg',
      '/images/tours/mzima-springs.jpg',
      '/images/tours/tsavo-landscape.jpg',
    ],
    
    metaDescription: '6-day Amboseli & Tsavo safari featuring Mount Kilimanjaro views, elephant herds, and Kenya\'s wild landscapes. From $1,950. Experience authentic African wilderness!',
    keywords: ['Amboseli Safari', 'Tsavo Safari', 'Mount Kilimanjaro', 'Kenya Safari', 'Red Elephants', 'Wildlife Safari', 'African Adventure'],
  },
];

/**
 * Export all functions remain the same
 */
export const tours: Tour[] = [
  ...kenyaTours,
];

export function getAllTours(): Tour[] {
  return tours.filter(tour => tour.published);
}

export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find(tour => tour.slug === slug && tour.published);
}

export function getToursByCountry(countryCode: string): Tour[] {
  return tours.filter(tour => tour.countryCode === countryCode && tour.published);
}

export function getToursByRegion(region: string): Tour[] {
  return tours.filter(tour => tour.region === region && tour.published);
}

export function searchTours(query: string): Tour[] {
  const lowerQuery = query.toLowerCase();
  return tours.filter(tour => 
    tour.published && (
      tour.title.toLowerCase().includes(lowerQuery) ||
      tour.description.toLowerCase().includes(lowerQuery) ||
      tour.country.toLowerCase().includes(lowerQuery) ||
      tour.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery))
    )
  );
}

export function getFeaturedTours(limit: number = 3): Tour[] {
  return tours.filter(tour => tour.published).slice(0, limit);
}
