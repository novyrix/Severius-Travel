// Remaining 6 Flagship Tours - Add to seed-flagship-tours.ts

// TANZANIA TOUR 1: Serengeti & Ngorongoro
{
  title: '7-Day Serengeti & Ngorongoro Safari',
  slug: 'serengeti-ngorongoro-safari-7-days',
  description: 'Experience Tanzania\'s most iconic safari destinations. Witness the Great Migration in Serengeti, explore the world\'s largest intact volcanic caldera in Ngorongoro, and discover Tarangire\'s elephant herds.',
  price: 2450,
  priceEUR: 2250,
  priceGBP: 1930,
  priceKES: 318000,
  durationDays: 7,
  countryId: 2, // Tanzania
  city: 'Arusha',
  latitude: -3.3869,
  longitude: 36.6830,
  difficulty: 'Easy',
  maxGroupSize: 12,
  minGroupSize: 2,
  ageRestriction: 'All ages welcome',
  accommodationType: 'Lodge',
  mealPlan: 'Full Board',
  bestMonths: JSON.stringify(['January', 'February', 'June', 'July', 'August', 'September', 'October']),
  highlights: JSON.stringify([
    'Serengeti National Park - endless plains and migration',
    'Ngorongoro Crater - world\'s largest intact caldera',
    'Big Five viewing opportunities',
    'Great Migration (seasonal)',
    'Olduvai Gorge - Cradle of Mankind',
    'Maasai cultural interactions',
    'Over 500 bird species',
    'Stunning volcanic landscapes'
  ]),
  inclusions: JSON.stringify([
    'Arusha airport transfers',
    'All park fees and crater fees',
    '6 nights accommodation',
    'All meals',
    'Game drives in 4x4 safari vehicle',
    'Professional English-speaking guide',
    'Bottled water',
    'Flying Doctors insurance',
    'Olduvai Gorge visit',
    'Ngorongoro Crater tour'
  ]),
  exclusions: JSON.stringify([
    'International flights',
    'Tanzania visa ($50)',
    'Travel insurance',
    'Tips ($15-20/day suggested)',
    'Personal expenses',
    'Alcoholic beverages',
    'Balloon safari ($550)',
    'Maasai village visit ($30)',
    'Laundry services'
  ]),
  itinerary: JSON.stringify([
    {
      day: 1,
      title: 'Arrival in Arusha',
      description: 'Arrive at Kilimanjaro International Airport. Meet and greet by our representative. Transfer to Arusha for overnight stay at comfortable hotel. Safari briefing by your guide covering itinerary, park regulations, and what to expect. Relax by pool or explore Arusha town. Dinner and overnight.',
      activities: ['Airport transfer', 'Safari briefing', 'Leisure time', 'Arusha town exploration'],
      meals: ['Dinner'],
      accommodation: 'Arusha Planet Lodge or Tulia Boutique Hotel'
    },
    {
      day: 2,
      title: 'Arusha to Tarangire National Park',
      description: 'After breakfast, depart for Tarangire National Park (2 hours drive), famous for its large elephant herds and ancient baobab trees. Full day of game drives in the park. The Tarangire River attracts massive concentrations of wildlife during dry season. Look for tree-climbing lions, leopards, and over 550 bird species. Lunch at picnic site. Continue game viewing until evening. Drive to lodge for dinner and overnight.',
      activities: ['Transfer to Tarangire', 'Full day game drives', 'Elephant watching', 'Baobab tree photography', 'Bush picnic'],
      meals: ['Breakfast', 'Packed Lunch', 'Dinner'],
      accommodation: 'Tarangire Sopa Lodge or Elephant Rock Lodge'
    },
    {
      day: 3,
      title: 'Tarangire to Serengeti via Ngorongoro',
      description: 'Early departure after breakfast, driving through Ngorongoro Conservation Area with stunning views of the Crater. Stop at Olduvai Gorge, the "Cradle of Mankind," where Leakey family discovered early human fossils. Visit the small museum. Continue to Serengeti arriving afternoon. First game drive in Serengeti en route to lodge. Dinner and overnight in central Serengeti.',
      activities: ['Scenic drive through Ngorongoro', 'Olduvai Gorge museum visit', 'Afternoon game drive in Serengeti', 'Migration viewing (seasonal)'],
      meals: ['Breakfast', 'Packed Lunch', 'Dinner'],
      accommodation: 'Serengeti Sopa Lodge or Kati Kati Tented Camp'
    },
    {
      day: 4,
      title: 'Full Day Serengeti National Park',
      description: 'Spend entire day exploring the vast Serengeti plains. Early morning game drive for predator viewing. Serengeti means "endless plains" in Maasai language, and you\'ll understand why as you traverse this incredible ecosystem. During migration season (roughly July-October), witness massive herds of wildebeest and zebras. Throughout the year, resident wildlife includes lions, leopards, cheetahs, elephants, giraffes, and countless other species. Picnic lunch in the bush. Evening game drive before returning to lodge.',
      activities: ['Morning game drive', 'Migration viewing', 'Big Five tracking', 'Bush lunch', 'Afternoon/evening game drive', 'Predator spotting'],
      meals: ['Breakfast', 'Packed Lunch', 'Dinner'],
      accommodation: 'Serengeti Sopa Lodge or Kati Kati Tented Camp'
    },
    {
      day: 5,
      title: 'Serengeti to Ngorongoro',
      description: 'Early morning game drive in Serengeti for last wildlife viewing. Return to lodge for breakfast and check out. Game drive en route out of Serengeti. Journey back through the Serengeti-Ngorongoro ecosystem with photo stops at scenic viewpoints. Arrive at Ngorongoro Crater rim in late afternoon. Stay at lodge perched on crater rim with spectacular views. Sundowner drinks watching sunset over the Crater. Dinner and overnight.',
      activities: ['Morning game drive', 'Transfer to Ngorongoro', 'Crater rim viewpoint', 'Sunset viewing', 'Sundowner drinks'],
      meals: ['Breakfast', 'Packed Lunch', 'Dinner'],
      accommodation: 'Ngorongoro Sopa Lodge or Rhino Lodge'
    },
    {
      day: 6,
      title: 'Ngorongoro Crater Tour',
      description: 'Early breakfast, then descend 600 meters into the Crater floor for full-day game viewing. The Crater is home to over 25,000 large animals including the highest density of predators in Africa. Excellent chance to see black rhinos, lions, elephants, buffaloes, and hippos. The Crater floor covers 260 sq km and is a natural amphitheater of wildlife. Picnic lunch by hippo pool. Afternoon continues exploring different crater zones. Ascend back to rim in late afternoon. Overnight at lodge.',
      activities: ['Crater descent', 'Full day game drives on crater floor', 'Rhino tracking', 'Hippo pool lunch', 'Dense wildlife viewing'],
      meals: ['Breakfast', 'Packed Lunch', 'Dinner'],
      accommodation: 'Ngorongoro Sopa Lodge or Rhino Lodge'
    },
    {
      day: 7,
      title: 'Ngorongoro to Arusha - Departure',
      description: 'After leisurely breakfast, drive back to Arusha (3-4 hours) with stops at Maasai craft markets for souvenir shopping. Arrive Arusha for lunch. Depending on flight time, optional visit to local coffee plantation or Cultural Heritage Centre. Transfer to airport for your onward flight. End of unforgettable Tanzania safari.',
      activities: ['Transfer to Arusha', 'Souvenir shopping', 'Coffee plantation visit (optional)', 'Airport transfer'],
      meals: ['Breakfast', 'Lunch'],
      accommodation: 'N/A'
    }
  ]),
  faqs: JSON.stringify([
    {
      question: 'When is the best time to see the Great Migration?',
      answer: 'The Migration is year-round but location varies. In Serengeti: January-February (calving season in southern Serengeti), June-July (migration moves north, river crossings begin), August-October (northern Serengeti, peak Mara River crossings). Each period offers unique wildlife spectacles. Our guides track migration movements to maximize your chances of witnessing this phenomenon.'
    },
    {
      question: 'What makes Ngorongoro Crater special?',
      answer: 'Ngorongoro is the world\'s largest intact, unfilled volcanic caldera. Its 600-meter high walls create a natural enclosure for wildlife, resulting in one of Africa\'s highest concentrations of large animals - over 25,000 in just 260 sq km. It\'s one of the few places where you can see black rhinos, and it offers virtually guaranteed Big Five sightings. The scenery is breathtaking with the crater walls providing a dramatic backdrop.'
    },
    {
      question: 'How does this compare to a Kenya safari?',
      answer: 'Tanzania offers a more exclusive, less crowded safari experience with stricter park regulations (fewer vehicles per sighting). Serengeti is larger than Maasai Mara with more diverse habitats. Ngorongoro Crater is unique worldwide. Tanzania requires more driving time between parks but offers arguably better wilderness experience. Kenya is easier access from Nairobi. Both are excellent - Tanzania feels more remote and pristine.'
    },
    {
      question: 'Is accommodation inside Serengeti or outside?',
      answer: 'We use lodges/camps inside or on the borders of Serengeti for easy access and minimal driving. Staying inside the park allows early morning and late evening game drives when animals are most active. Accommodations range from comfortable lodges to luxury tented camps, all with en-suite bathrooms, comfortable beds, and good food. We can upgrade to premium options on request.'
    }
  ]),
  requirements: JSON.stringify([
    'Valid passport (6 months validity)',
    'Tanzania visa ($50 on arrival or e-visa)',
    'Yellow fever certificate (mandatory)',
    'Travel insurance with medical evacuation',
    'Comfortable safari clothing',
    'Good camera with telephoto lens',
    'Binoculars',
    'Sun protection',
    'Personal medications',
    'Cash for tips and personal expenses (USD preferred)'
  ]),
  coverImage: '/images/tours/serengeti-ngorongoro/cover.jpg',
  gallery: JSON.stringify([
    '/images/tours/serengeti-ngorongoro/1.jpg',
    '/images/tours/serengeti-ngorongoro/2.jpg',
    '/images/tours/serengeti-ngorongoro/3.jpg',
    '/images/tours/serengeti-ngorongoro/4.jpg',
    '/images/tours/serengeti-ngorongoro/5.jpg',
    '/images/tours/serengeti-ngorongoro/6.jpg'
  ]),
  metaDescription: '7-day Tanzania safari combining Serengeti, Ngorongoro Crater, and Tarangire. Witness the Great Migration, Big Five, and stunning volcanic landscapes. Premier Tanzania safari experience.',
  keywords: 'Serengeti safari, Ngorongoro Crater, Tanzania safari, Great Migration, Tanzania wildlife, Serengeti tours, Ngorongoro safari'
},

// Add the remaining 5 tours here following same format:
// - Kilimanjaro Climb (8 days)
// - Zanzibar Beach (6 days)
// - Cape Town & Winelands (6 days)
// - Kruger National Park (6 days)
// - Marrakech & Sahara (5 days)
