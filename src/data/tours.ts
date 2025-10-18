/**
 * Static Tours Data
 * All tours are hardcoded here to avoid database complexity and image management issues
 */

export interface Tour {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number; // Base price in USD
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
 * All available tours
 */
export const tours: Tour[] = [
  {
    id: 'maasai-mara-safari',
    title: '5-Day Maasai Mara Safari',
    slug: 'maasai-mara-safari',
    description: 'Experience the ultimate African safari in Kenya\'s most famous wildlife reserve. Witness the Great Wildebeest Migration, spot the Big Five, and immerse yourself in the breathtaking landscapes of the Maasai Mara. This 5-day adventure includes game drives, visits to Maasai villages, and luxury lodge accommodation.',
    price: 2500,
    priceEUR: 2300,
    priceGBP: 1950,
    priceKES: 320000,
    published: true,
    durationDays: 5,
    
    country: 'Kenya',
    countryCode: 'KE',
    city: 'Maasai Mara',
    region: 'East Africa',
    latitude: -1.5,
    longitude: 35.14,
    
    difficulty: 'Easy',
    maxGroupSize: 12,
    minGroupSize: 2,
    ageRestriction: 'All ages',
    
    accommodationType: 'Luxury Lodge',
    mealPlan: 'Full Board',
    
    bestMonths: ['July', 'August', 'September', 'October'],
    
    highlights: [
      'Witness the Great Wildebeest Migration (seasonal)',
      'Spot the Big Five - Lion, Leopard, Elephant, Rhino, Buffalo',
      'Visit a traditional Maasai village and learn about their culture',
      'Professional safari guide and 4x4 game drive vehicle',
      'Stunning landscapes and incredible photography opportunities',
      'Mara River crossings (seasonal, July-October)',
    ],
    
    inclusions: [
      'Airport transfers from Nairobi',
      '4 nights accommodation in luxury lodge',
      'All meals (breakfast, lunch, dinner)',
      'Daily game drives with professional guide',
      'Park entrance fees',
      'Maasai village visit',
      '4x4 safari vehicle with pop-up roof',
    ],
    
    exclusions: [
      'International flights',
      'Travel insurance',
      'Visa fees',
      'Personal expenses and tips',
      'Alcoholic beverages',
      'Optional activities (hot air balloon safari - $450)',
      'Gratuities for guides and lodge staff',
    ],
    
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Nairobi & Transfer to Maasai Mara',
        description: 'Upon arrival at Jomo Kenyatta International Airport, you\'ll be met by our representative and transferred to Wilson Airport for your light aircraft flight to Maasai Mara (approximately 45 minutes). Alternatively, enjoy a scenic 5-6 hour drive through the Great Rift Valley. Arrive at your lodge in time for lunch. After settling in, embark on your first afternoon game drive in the Mara, returning to the lodge for dinner.',
        meals: 'Lunch, Dinner',
        accommodation: 'Mara Serena Safari Lodge or similar',
      },
      {
        day: 2,
        title: 'Full Day Maasai Mara Game Drives',
        description: 'Rise early for a sunrise game drive when animals are most active. After breakfast at the lodge, continue exploring the vast plains of the Maasai Mara with morning and afternoon game drives. Watch for lions lounging in the shade, elephants crossing the savanna, and if you\'re lucky, witness a predator hunt. Enjoy a picnic lunch in the bush surrounded by wildlife. Return to lodge for dinner and overnight.',
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Mara Serena Safari Lodge or similar',
      },
      {
        day: 3,
        title: 'Maasai Mara - Mara River & Maasai Village',
        description: 'Today\'s highlight is a visit to the Mara River, famous for dramatic wildebeest crossings during migration season (July-October). Watch crocodiles basking on the banks and hippos wallowing in the water. In the afternoon, visit a traditional Maasai village (manyatta) where you\'ll learn about Maasai culture, traditions, and their unique jumping dance. Participate in beadwork demonstrations and shop for authentic handicrafts. Evening game drive before returning to lodge.',
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Mara Serena Safari Lodge or similar',
      },
      {
        day: 4,
        title: 'Optional Balloon Safari & Final Game Drive',
        description: 'Optional hot air balloon safari at dawn (additional cost $450) - soar over the Mara plains at sunrise for spectacular aerial views of wildlife. After breakfast, enjoy your final game drive in the Maasai Mara, perhaps revisiting favorite spots or exploring new areas. After lunch and some relaxation at the lodge, take a final afternoon game drive. Farewell dinner at the lodge with traditional entertainment.',
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Mara Serena Safari Lodge or similar',
      },
      {
        day: 5,
        title: 'Departure to Nairobi',
        description: 'After an early breakfast, take a final morning game drive as you exit the park. Transfer to the airstrip for your flight back to Nairobi, or begin the scenic drive back to the city. Arrive in Nairobi by early afternoon. Optional day room at a Nairobi hotel (additional cost) before your evening international flight. Transfer to Jomo Kenyatta International Airport for your departure.',
        meals: 'Breakfast',
        accommodation: 'N/A',
      },
    ],
    
    faqs: [
      {
        question: 'When is the best time to see the wildebeest migration?',
        answer: 'The Great Migration is typically in the Maasai Mara from July to October, with peak river crossings in August and September. However, wildlife viewing is excellent year-round.',
      },
      {
        question: 'What should I pack for the safari?',
        answer: 'Pack light, neutral-colored clothing (khaki, beige, olive), a warm jacket for early mornings, sunscreen, sunglasses, hat, binoculars, camera with zoom lens, and insect repellent. Avoid bright colors and camouflage patterns.',
      },
      {
        question: 'Is the safari suitable for children?',
        answer: 'Yes! The safari is family-friendly and suitable for all ages. Children often find the wildlife experience thrilling. However, game drives can be long, so consider your child\'s ability to sit still for extended periods.',
      },
      {
        question: 'What are the accommodation standards?',
        answer: 'You\'ll stay in luxury lodges with en-suite bathrooms, comfortable beds, excellent food, and often a swimming pool. Lodges are located within or near the park for easy access to game drives.',
      },
      {
        question: 'Are the game drives safe?',
        answer: 'Yes, very safe. You\'ll be in a sturdy 4x4 vehicle with an experienced guide who knows animal behavior. You must remain in the vehicle at all times during game drives unless at designated areas.',
      },
    ],
    
    requirements: [
      'Valid passport (6 months validity)',
      'Kenya visa (available online or on arrival)',
      'Yellow fever vaccination certificate (if arriving from endemic countries)',
      'Travel insurance (highly recommended)',
      'Comfortable walking shoes and safari clothing',
    ],
    
    coverImage: '/images/tours/maasai-mara-cover.jpg',
    gallery: [
      '/images/tours/maasai-mara-1.jpg',
      '/images/tours/maasai-mara-2.jpg',
      '/images/tours/maasai-mara-3.jpg',
      '/images/tours/maasai-mara-4.jpg',
    ],
    
    metaDescription: 'Experience the ultimate 5-day Maasai Mara safari in Kenya. Witness the Great Migration, spot the Big Five, and immerse yourself in African wildlife. Book your adventure today!',
    keywords: ['Maasai Mara Safari', 'Kenya Safari', 'Great Migration', 'Big Five', 'Wildlife Safari', 'African Safari', 'Maasai Village'],
  },
  
  {
    id: 'amboseli-elephant-safari',
    title: '4-Day Amboseli Elephant Safari',
    slug: 'amboseli-elephant-safari',
    description: 'Discover Amboseli National Park, home to large elephant herds and spectacular views of Mount Kilimanjaro. This 4-day safari offers incredible wildlife photography opportunities, especially at sunrise when Kilimanjaro\'s snow-capped peak towers over elephants and other wildlife.',
    price: 1800,
    priceEUR: 1650,
    priceGBP: 1400,
    priceKES: 230000,
    published: true,
    durationDays: 4,
    
    country: 'Kenya',
    countryCode: 'KE',
    city: 'Amboseli',
    region: 'East Africa',
    latitude: -2.65,
    longitude: 37.26,
    
    difficulty: 'Easy',
    maxGroupSize: 10,
    minGroupSize: 2,
    ageRestriction: 'All ages',
    
    accommodationType: 'Lodge/Tented Camp',
    mealPlan: 'Full Board',
    
    bestMonths: ['January', 'February', 'June', 'July', 'August', 'September', 'October'],
    
    highlights: [
      'Iconic views of Mount Kilimanjaro',
      'Large elephant herds - Amboseli has over 1,600 elephants',
      'Diverse wildlife including lions, cheetahs, zebras, and wildebeest',
      'Birdwatching paradise with over 400 species',
      'Visit to Observation Hill for panoramic views',
      'Experience Maasai culture and traditions',
    ],
    
    inclusions: [
      'Airport/hotel transfers from Nairobi',
      '3 nights accommodation',
      'All meals during the safari',
      'Daily game drives',
      'Park entrance fees',
      'Professional safari guide',
      'Safari vehicle with pop-up roof',
    ],
    
    exclusions: [
      'International flights',
      'Travel insurance',
      'Visa fees',
      'Tips and gratuities',
      'Personal expenses',
      'Optional activities',
      'Alcoholic beverages',
    ],
    
    itinerary: [
      {
        day: 1,
        title: 'Nairobi to Amboseli',
        description: 'Depart Nairobi in the morning and drive south towards Amboseli National Park (approximately 4 hours). Enjoy views of the Kenyan countryside and local villages. Arrive at your lodge/camp in time for lunch. After settling in, embark on your first afternoon game drive with stunning views of Mount Kilimanjaro.',
        meals: 'Lunch, Dinner',
        accommodation: 'Amboseli Serena Safari Lodge or similar',
      },
      {
        day: 2,
        title: 'Full Day Amboseli Game Drives',
        description: 'Early morning game drive to catch Kilimanjaro at sunrise - the mountain is usually clearer in the early morning. Watch elephant families crossing the plains with the mountain as backdrop. Return for breakfast, then continue with morning and afternoon game drives exploring different areas of the park including swamps where elephants and hippos gather.',
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Amboseli Serena Safari Lodge or similar',
      },
      {
        day: 3,
        title: 'Amboseli - Observation Hill & Maasai Visit',
        description: 'Morning game drive followed by a visit to Observation Hill for panoramic views of the park and Kilimanjaro. Afternoon visit to a Maasai village to learn about their culture, traditional homes, and pastoral lifestyle. Final game drive in the evening when animals are most active.',
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Amboseli Serena Safari Lodge or similar',
      },
      {
        day: 4,
        title: 'Amboseli to Nairobi',
        description: 'Final early morning game drive, then breakfast at the lodge. Check out and drive back to Nairobi, arriving in the early afternoon. Optional drop-off at airport for evening flights or at your Nairobi hotel.',
        meals: 'Breakfast',
        accommodation: 'N/A',
      },
    ],
    
    faqs: [
      {
        question: 'Will I see Mount Kilimanjaro?',
        answer: 'Kilimanjaro is best viewed in the early morning before clouds obscure the peak. January-February and June-October offer the clearest views. The mountain is in Tanzania but visible from Amboseli.',
      },
      {
        question: 'How close can we get to the elephants?',
        answer: 'Amboseli elephants are accustomed to vehicles and can approach very close, sometimes within a few meters. Your guide will maintain safe distances and you must remain in the vehicle.',
      },
      {
        question: 'Is photography equipment allowed?',
        answer: 'Yes! Amboseli is one of Africa\'s best parks for wildlife photography. Bring a camera with a good zoom lens (200-400mm recommended), extra batteries, and memory cards.',
      },
    ],
    
    requirements: [
      'Valid passport',
      'Kenya visa',
      'Yellow fever certificate (if applicable)',
      'Travel insurance',
      'Light, neutral-colored clothing',
    ],
    
    coverImage: '/images/tours/amboseli-cover.jpg',
    gallery: [
      '/images/tours/amboseli-1.jpg',
      '/images/tours/amboseli-2.jpg',
      '/images/tours/amboseli-3.jpg',
    ],
    
    metaDescription: '4-day Amboseli safari featuring large elephant herds and spectacular Mount Kilimanjaro views. Perfect for photography and wildlife enthusiasts. Book your Kenya safari adventure!',
    keywords: ['Amboseli Safari', 'Kenya Elephants', 'Mount Kilimanjaro', 'Wildlife Photography', 'Kenya Safari', 'Elephant Safari'],
  },

  {
    id: 'serengeti-migration-safari',
    title: '6-Day Serengeti Migration Safari',
    slug: 'serengeti-migration-safari',
    description: 'Follow the greatest wildlife spectacle on Earth through Tanzania\'s Serengeti. Witness millions of wildebeest and zebras on their annual migration, along with predators following the herds. This comprehensive safari includes Ngorongoro Crater and Tarangire National Park.',
    price: 3200,
    priceEUR: 2950,
    priceGBP: 2500,
    priceKES: 410000,
    published: true,
    durationDays: 6,
    
    country: 'Tanzania',
    countryCode: 'TZ',
    city: 'Serengeti',
    region: 'East Africa',
    latitude: -2.33,
    longitude: 34.83,
    
    difficulty: 'Moderate',
    maxGroupSize: 8,
    minGroupSize: 2,
    ageRestriction: '8+',
    
    accommodationType: 'Tented Camp/Lodge',
    mealPlan: 'Full Board',
    
    bestMonths: ['December', 'January', 'February', 'June', 'July', 'August', 'September'],
    
    highlights: [
      'Witness the Great Migration in Serengeti',
      'Explore the Ngorongoro Crater - UNESCO World Heritage Site',
      'Visit Tarangire National Park - elephant capital',
      'Calving season (January-February) or river crossings (July-September)',
      'Luxury tented camps in prime wildlife areas',
      'Professional naturalist guide',
    ],
    
    inclusions: [
      'All park fees and conservation fees',
      '5 nights accommodation (luxury tented camps)',
      'All meals and bottled water',
      'Airport transfers',
      '4x4 Land Cruiser with pop-up roof',
      'Professional English-speaking guide',
      'Game drives as per itinerary',
    ],
    
    exclusions: [
      'International flights',
      'Tanzania visa ($50 USD)',
      'Travel insurance',
      'Tips ($50-60 per day recommended)',
      'Alcoholic beverages',
      'Optional balloon safari ($550)',
      'Personal expenses',
    ],
    
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Arusha',
        description: 'Arrive at Kilimanjaro International Airport where you\'ll be met and transferred to your hotel in Arusha. Pre-safari briefing with your guide. Relax and prepare for your adventure.',
        meals: 'Dinner',
        accommodation: 'Gran Melia Arusha or similar',
      },
      {
        day: 2,
        title: 'Tarangire National Park',
        description: 'After breakfast, drive to Tarangire National Park famous for its huge elephant herds and ancient baobab trees. Full day of game viewing in this diverse park. Watch for tree-climbing lions, giraffes, and over 550 bird species. The Tarangire River attracts animals year-round.',
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Tarangire Safari Lodge or similar',
      },
      {
        day: 3,
        title: 'Serengeti National Park',
        description: 'Drive through Ngorongoro Conservation Area to Serengeti National Park. Game drive en route, arriving at your tented camp in time for lunch. Afternoon game drive in central Serengeti, known for abundant resident wildlife including lions, leopards, and cheetahs.',
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Serengeti Kati Kati Tented Camp or similar',
      },
      {
        day: 4,
        title: 'Full Day Serengeti - Migration Safari',
        description: 'Full day dedicated to following the Great Migration. Your guide will track the herds\' movements and position you for the best wildlife viewing. During calving season (Jan-Feb), witness thousands of wildebeest births. During river crossing season (July-Sep), watch dramatic Mara River crossings. Morning and afternoon game drives with picnic lunch in the bush.',
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Serengeti Kati Kati Tented Camp or similar',
      },
      {
        day: 5,
        title: 'Serengeti to Ngorongoro',
        description: 'Morning game drive in Serengeti, then drive to Ngorongoro Conservation Area. En route game viewing and picnic lunch. Arrive at your lodge perched on the crater rim in time for sunset views over the crater.',
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Ngorongoro Serena Safari Lodge or similar',
      },
      {
        day: 6,
        title: 'Ngorongoro Crater & Departure',
        description: 'Descend 600 meters into the crater floor for a full morning of game viewing in this natural wildlife arena. The crater has the highest density of predators in Africa and is the best place to see rare black rhinos. After a picnic lunch at the hippo pool, ascend and drive back to Arusha. Transfer to airport for your evening flight.',
        meals: 'Breakfast, Lunch',
        accommodation: 'N/A',
      },
    ],
    
    faqs: [
      {
        question: 'When is the best time to see the migration?',
        answer: 'December-March for calving season in southern Serengeti, June-July for western corridor, July-October for northern Serengeti river crossings. The migration is constantly moving, so timing is important.',
      },
      {
        question: 'Do I need a visa for Tanzania?',
        answer: 'Most nationalities require a visa ($50-100 USD). You can get it online in advance or on arrival at Kilimanjaro Airport. Check current requirements for your nationality.',
      },
      {
        question: 'What\'s included in the safari vehicle?',
        answer: 'You\'ll have a private 4x4 Land Cruiser with pop-up roof for game viewing, window seat guaranteed, binoculars, wildlife guides, charging ports, and cooler with water.',
      },
    ],
    
    requirements: [
      'Valid passport (6 months)',
      'Tanzania visa',
      'Yellow fever vaccination (recommended)',
      'Travel and medical insurance',
      'Anti-malarial medication (consult doctor)',
    ],
    
    coverImage: '/images/tours/serengeti-cover.jpg',
    gallery: [
      '/images/tours/serengeti-1.jpg',
      '/images/tours/serengeti-2.jpg',
      '/images/tours/serengeti-3.jpg',
      '/images/tours/serengeti-4.jpg',
    ],
    
    metaDescription: '6-day Serengeti migration safari in Tanzania. Witness the Great Migration, explore Ngorongoro Crater, and discover Tarangire. Ultimate Tanzania safari experience!',
    keywords: ['Serengeti Safari', 'Tanzania Safari', 'Great Migration', 'Ngorongoro Crater', 'Wildebeest Migration', 'Africa Safari'],
  },

  {
    id: 'cape-town-table-mountain',
    title: '5-Day Cape Town & Table Mountain Adventure',
    slug: 'cape-town-table-mountain',
    description: 'Explore the stunning beauty of Cape Town, from Table Mountain to the Cape of Good Hope. Experience wine tasting in Stellenbosch, penguin watching at Boulders Beach, and the vibrant V&A Waterfront.',
    price: 1650,
    priceEUR: 1500,
    priceGBP: 1280,
    priceKES: 210000,
    published: true,
    durationDays: 5,
    
    country: 'South Africa',
    countryCode: 'ZA',
    city: 'Cape Town',
    region: 'Southern Africa',
    latitude: -33.92,
    longitude: 18.42,
    
    difficulty: 'Easy',
    maxGroupSize: 12,
    minGroupSize: 2,
    ageRestriction: 'All ages',
    
    accommodationType: 'Hotel',
    mealPlan: 'Breakfast Only',
    
    bestMonths: ['September', 'October', 'November', 'December', 'January', 'February', 'March', 'April'],
    
    highlights: [
      'Cable car ride to Table Mountain summit',
      'Cape Peninsula tour including Cape of Good Hope',
      'African penguin colony at Boulders Beach',
      'Wine tasting in Stellenbosch and Franschhoek',
      'Scenic Chapman\'s Peak Drive',
      'V&A Waterfront shopping and dining',
    ],
    
    inclusions: [
      'Airport transfers',
      '4 nights hotel accommodation',
      'Daily breakfast',
      'Table Mountain cable car ticket',
      'Cape Peninsula full-day tour',
      'Wine lands tour',
      'Professional tour guide',
    ],
    
    exclusions: [
      'International flights',
      'Lunch and dinner (unless specified)',
      'Travel insurance',
      'Optional activities',
      'Personal expenses',
      'Tips and gratuities',
    ],
    
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Cape Town',
        description: 'Arrive at Cape Town International Airport and transfer to your hotel. Spend the afternoon exploring the vibrant V&A Waterfront, with its shops, restaurants, and entertainment. Evening at leisure.',
        meals: 'N/A',
        accommodation: '4-star Hotel',
      },
      {
        day: 2,
        title: 'Table Mountain & City Tour',
        description: 'Morning visit to Table Mountain, taking the rotating cable car to the summit for spectacular 360-degree views. Weather permitting, spend time exploring the summit trails. Afternoon city tour including Bo-Kaap colorful houses, Company Gardens, and Castle of Good Hope.',
        meals: 'Breakfast',
        accommodation: '4-star Hotel',
      },
      {
        day: 3,
        title: 'Cape Peninsula Tour',
        description: 'Full-day tour of the Cape Peninsula. Drive along scenic Chapman\'s Peak, visit Cape of Good Hope and Cape Point. Stop at Boulders Beach to see African penguins. Return via charming seaside towns of Fish Hoek and Muizenberg.',
        meals: 'Breakfast',
        accommodation: '4-star Hotel',
      },
      {
        day: 4,
        title: 'Wine lands Tour',
        description: 'Day trip to the beautiful Cape Wine lands. Visit historic towns of Stellenbosch and Franschhoek. Wine tasting at 3-4 renowned estates. Lunch at a wine estate (own expense). Scenic mountain passes and vineyard views.',
        meals: 'Breakfast',
        accommodation: '4-star Hotel',
      },
      {
        day: 5,
        title: 'Departure',
        description: 'Free morning for last-minute shopping or optional activities. Transfer to airport for your departure flight.',
        meals: 'Breakfast',
        accommodation: 'N/A',
      },
    ],
    
    faqs: [
      {
        question: 'When is the best time to visit Cape Town?',
        answer: 'September to April offers the best weather with warm, sunny days. December-February is peak summer but also peak tourist season. September-November is spring with beautiful flowers.',
      },
      {
        question: 'What if Table Mountain is closed due to weather?',
        answer: 'The cable car occasionally closes due to high winds. We\'ll reschedule for another day during your stay or offer alternative activities like Signal Hill or Lion\'s Head hike.',
      },
      {
        question: 'Is Cape Town safe for tourists?',
        answer: 'Cape Town is generally safe for tourists, especially in tourist areas. We provide safety briefings and our guides know the safe areas. Use common sense precautions as you would in any major city.',
      },
    ],
    
    requirements: [
      'Valid passport',
      'South Africa visa (if required - many nationalities get free entry)',
      'Travel insurance recommended',
      'Comfortable walking shoes',
      'Warm jacket for Table Mountain',
    ],
    
    coverImage: '/images/tours/cape-town-cover.jpg',
    gallery: [
      '/images/tours/cape-town-1.jpg',
      '/images/tours/cape-town-2.jpg',
      '/images/tours/cape-town-3.jpg',
    ],
    
    metaDescription: '5-day Cape Town adventure featuring Table Mountain, Cape Peninsula, wine tasting, and penguin viewing. Explore South Africa\'s Mother City!',
    keywords: ['Cape Town Tour', 'Table Mountain', 'Cape Peninsula', 'South Africa Travel', 'Wine Tasting', 'African Penguins'],
  },
];

/**
 * Get all published tours
 */
export function getAllTours(): Tour[] {
  return tours.filter(tour => tour.published);
}

/**
 * Get a single tour by slug
 */
export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find(tour => tour.slug === slug && tour.published);
}

/**
 * Get tours by country
 */
export function getToursByCountry(countryCode: string): Tour[] {
  return tours.filter(tour => tour.countryCode === countryCode && tour.published);
}

/**
 * Get tours by region
 */
export function getToursByRegion(region: string): Tour[] {
  return tours.filter(tour => tour.region === region && tour.published);
}

/**
 * Search tours by query
 */
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

/**
 * Get featured tours (e.g., for homepage)
 */
export function getFeaturedTours(limit: number = 3): Tour[] {
  return tours.filter(tour => tour.published).slice(0, limit);
}
