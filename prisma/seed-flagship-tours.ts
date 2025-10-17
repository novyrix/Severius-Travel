// Flagship Tours Seed Data - 10 Premium African Tours
// Run with: npx ts-node --compiler-options {"module":"CommonJS"} prisma/seed-flagship-tours.ts

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const flagshipTours = [
  // KENYA TOUR 1: Maasai Mara
  {
    title: '5-Day Maasai Mara Safari Adventure',
    slug: 'maasai-mara-safari-5-days',
    description: 'Experience the ultimate African safari in Kenya\'s premier wildlife reserve. Witness the Big Five, explore vast savannahs, and immerse yourself in Maasai culture. This 5-day adventure offers unparalleled wildlife viewing opportunities in one of Africa\'s most famous game reserves.',
    price: 1850,
    priceEUR: 1700,
    priceGBP: 1450,
    priceKES: 240000,
    durationDays: 5,
    countryId: 1, // Kenya
    city: 'Narok',
    latitude: -1.5063,
    longitude: 35.2570,
    difficulty: 'Easy',
    maxGroupSize: 12,
    minGroupSize: 2,
    ageRestriction: 'All ages welcome',
    accommodationType: 'Lodge',
    mealPlan: 'Full Board',
    bestMonths: JSON.stringify(['July', 'August', 'September', 'October', 'January', 'February']),
    highlights: JSON.stringify([
      'Big Five game viewing (lion, leopard, elephant, buffalo, rhino)',
      'Great Wildebeest Migration (seasonal July-October)',
      'Visit to authentic Maasai village',
      'Balloon safari option available',
      'Expert safari guide with 10+ years experience',
      'Luxury tented camps with modern amenities',
      'Unlimited game drives',
      'Rift Valley scenic viewpoints'
    ]),
    inclusions: JSON.stringify([
      'Airport transfers (Nairobi)',
      'All park entrance fees',
      'Accommodation for 4 nights in luxury lodges',
      'All meals (breakfast, lunch, dinner)',
      'Unlimited game drives in 4x4 safari vehicle',
      'Professional English-speaking guide',
      'Bottled water during game drives',
      'Flying Doctors insurance',
      'Binoculars for game viewing',
      'Safari guidebook'
    ]),
    exclusions: JSON.stringify([
      'International flights',
      'Kenya visa fees ($51 online)',
      'Travel insurance',
      'Balloon safari ($450 per person)',
      'Tips and gratuities ($10-15 per day recommended)',
      'Personal expenses and souvenirs',
      'Alcoholic beverages',
      'Laundry services',
      'Optional activities not mentioned',
      'Medical expenses'
    ]),
    itinerary: JSON.stringify([
      {
        day: 1,
        title: 'Nairobi to Maasai Mara National Reserve',
        description: 'Your adventure begins with an early morning pickup from your Nairobi hotel or Jomo Kenyatta International Airport at 7:30 AM. Journey southwest through the dramatic Great Rift Valley with photo stops at scenic viewpoints to capture the stunning landscape. Descend the escarpment and continue through Maasai villages and farmlands. Arrive at Maasai Mara in time for lunch at your lodge. After settling in and a brief rest, embark on your first afternoon game drive from 4:00 PM to 6:30 PM. Watch the sun set over the savannah as nocturnal animals begin their evening routines. Return to lodge for dinner and overnight.',
        activities: ['Scenic drive through Great Rift Valley', 'Rift Valley viewpoint photography', 'Afternoon game drive', 'Sunset viewing'],
        meals: ['Lunch', 'Dinner'],
        accommodation: 'Mara Sopa Lodge or Mara Serena Safari Lodge'
      },
      {
        day: 2,
        title: 'Full Day Maasai Mara Game Drives',
        description: 'Wake up early for a pre-dawn game drive at 6:30 AM to catch predators during their most active hunting hours. Watch lions, leopards, and cheetahs on the prowl as the African sun rises. Return to the lodge around 9:30 AM for a hearty breakfast. Mid-morning is free to relax by the pool or book an optional visit to a Maasai village ($20 per person). After lunch and a siesta, head out for an afternoon game drive from 4:00 PM exploring different areas of the reserve. Visit the Mara River (seasonal) where hippos and crocodiles reside. If visiting during migration season (July-October), witness thousands of wildebeest and zebras crossing the river in dramatic fashion. Return as the sun sets for dinner.',
        activities: ['Early morning game drive', 'Maasai village cultural visit (optional)', 'Afternoon game drive', 'Mara River visit', 'Wildlife photography'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Mara Sopa Lodge or Mara Serena Safari Lodge'
      },
      {
        day: 3,
        title: 'Maasai Mara to Lake Nakuru National Park',
        description: 'Enjoy one more early morning game drive in Maasai Mara, then return to lodge for breakfast. Check out and depart for Lake Nakuru National Park, arriving in time for lunch. Lake Nakuru is famous for its spectacular flamingo populations (seasonal) and is a rhino sanctuary. After lunch, embark on an afternoon game drive around the lake shores and through acacia forests. Look for the endangered black and white rhinos, Rothschild giraffes, tree-climbing lions, and over 450 bird species. Visit the Baboon Cliff viewpoint for panoramic views of the lake and surrounding park. Dinner and overnight at your lodge.',
        activities: ['Morning game drive in Maasai Mara', 'Transfer to Lake Nakuru', 'Afternoon game drive', 'Baboon Cliff viewpoint', 'Flamingo viewing', 'Rhino tracking'],
        meals: ['Breakfast', 'Packed Lunch', 'Dinner'],
        accommodation: 'Lake Nakuru Sopa Lodge or Sarova Lion Hill'
      },
      {
        day: 4,
        title: 'Lake Nakuru to Lake Naivasha',
        description: 'Start with an early morning game drive in Lake Nakuru National Park for wildlife viewing in the cool morning hours. Return to lodge for breakfast and check out. Drive to nearby Lake Naivasha, Kenya\'s highest lake and a haven for birdlife. After lunch and check-in, optional boat ride to Crescent Island Wildlife Sanctuary ($35 per person) where you can walk among zebras, giraffes, and antelopes - one of the few places in Kenya offering walking safaris. Alternatively, visit Hell\'s Gate National Park for cycling or walking among wildlife. Evening at leisure to enjoy lodge facilities. Dinner and overnight at your lakeside lodge.',
        activities: ['Morning game drive at Lake Nakuru', 'Transfer to Lake Naivasha', 'Optional boat ride to Crescent Island', 'Walking safari among wildlife', 'Birdwatching', 'Leisure time'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Lake Naivasha Sopa Lodge or Enashipai Resort'
      },
      {
        day: 5,
        title: 'Lake Naivasha to Nairobi - End of Safari',
        description: 'After an early breakfast, optional early morning visit to Hell\'s Gate National Park for cycling safari or rock climbing ($45 per person). Hell\'s Gate features dramatic cliffs, gorges, and geothermal activity. Alternatively, enjoy a relaxed morning at the lodge with optional visit to Elsamere Conservation Centre, former home of Joy Adamson (Born Free author). Check out and begin your journey back to Nairobi, arriving in the early afternoon around 2:00 PM. Drop off at your Nairobi hotel or Jomo Kenyatta International Airport for your onward flight. End of an unforgettable safari adventure.',
        activities: ['Optional Hell\'s Gate National Park visit', 'Cycling safari (optional)', 'Elsamere visit (optional)', 'Transfer to Nairobi'],
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'N/A'
      }
    ]),
    faqs: JSON.stringify([
      {
        question: 'What is the best time to visit Maasai Mara for the Great Migration?',
        answer: 'The Great Wildebeest Migration typically occurs from July to October in Maasai Mara, with peak river crossings in August-September. However, the exact timing varies each year based on rainfall patterns. If you\'re not traveling during migration season, don\'t worry - Maasai Mara offers excellent game viewing year-round with high concentrations of resident wildlife.'
      },
      {
        question: 'Can I really see all of the Big Five on this safari?',
        answer: 'Yes! Maasai Mara is one of the best places in Africa to see all Big Five animals (lion, leopard, elephant, buffalo, and rhino). While wildlife sightings cannot be 100% guaranteed as these are wild animals, our experienced guides know the best areas and times for viewing, giving you excellent chances. Lions and elephants are seen on nearly every game drive, while leopards and rhinos may require more patience.'
      },
      {
        question: 'What should I pack for the safari?',
        answer: 'Pack light, neutral-colored clothing (khaki, beige, brown, green - avoid bright colors and blue/black which attract tsetse flies). Essential items include: sunscreen (SPF 50+), wide-brimmed hat, sunglasses, binoculars, camera with zoom lens (200-400mm ideal), insect repellent, light jacket for early mornings, comfortable walking shoes, and any personal medications. Nights can be cool (15°C/59°F), so bring layers. We provide a detailed packing list upon booking.'
      },
      {
        question: 'Is this safari suitable for children and elderly travelers?',
        answer: 'Yes, this safari is suitable for all ages. Children of all ages are welcome, and we can arrange family-friendly accommodations and activities. The safari involves minimal walking - most time is spent in the comfortable 4x4 vehicle. For elderly travelers or those with mobility concerns, we can customize the itinerary pace and arrange ground-floor rooms. Please inform us of any special requirements when booking.'
      },
      {
        question: 'What type of safari vehicle is used?',
        answer: 'We use specially modified 4x4 Toyota Land Cruisers with pop-up roofs for optimal 360-degree game viewing and photography. Each vehicle seats a maximum of 6-7 passengers with guaranteed window seats. Vehicles are equipped with charging ports, first aid kits, cooler boxes for drinks, and two-way radios for communication between guides. Our vehicles are maintained to the highest standards for safety and comfort.'
      },
      {
        question: 'What are the accommodation standards like?',
        answer: 'We use high-quality 3-4 star lodges and tented camps that combine comfort with authentic safari atmosphere. All accommodations feature en-suite bathrooms with hot showers, comfortable beds with mosquito nets, electricity, and most have swimming pools. Lodges are strategically located for optimal game viewing access. We can upgrade to luxury 5-star properties for an additional cost.'
      },
      {
        question: 'Are the game drives safe?',
        answer: 'Absolutely. Safety is our top priority. Our guides are professionally trained, licensed, and have years of experience. They understand animal behavior and maintain safe distances. You must remain in the vehicle during game drives unless at designated areas. Our vehicles are insured, and Flying Doctors emergency evacuation insurance is included for medical emergencies.'
      },
      {
        question: 'Can I do a hot air balloon safari?',
        answer: 'Yes! Hot air balloon safaris over Maasai Mara are available as an optional activity ($450 per person). Flights depart at dawn (around 6:00 AM) and last approximately 1 hour, offering spectacular aerial views of wildlife and landscape. The experience includes champagne breakfast in the bush after landing. Advance booking required - contact us to arrange.'
      }
    ]),
    requirements: JSON.stringify([
      'Valid passport with at least 6 months validity from return date',
      'Kenya eVisa (can be obtained online at evisa.go.ke for $51)',
      'Yellow fever vaccination certificate (mandatory if arriving from endemic countries)',
      'Travel insurance with medical and evacuation cover (mandatory)',
      'COVID-19 vaccination certificate (requirements may vary - check current regulations)',
      'Comfortable closed walking shoes or hiking boots',
      'Personal medications in original packaging with prescription',
      'Credit card for personal expenses and optional activities',
      'Travel adapter (Kenya uses UK-style 3-pin plugs, 240V)'
    ]),
    coverImage: '/images/tours/maasai-mara-safari-5-days/cover.jpg',
    gallery: JSON.stringify([
      '/images/tours/maasai-mara-safari-5-days/1.jpg',
      '/images/tours/maasai-mara-safari-5-days/2.jpg',
      '/images/tours/maasai-mara-safari-5-days/3.jpg',
      '/images/tours/maasai-mara-safari-5-days/4.jpg',
      '/images/tours/maasai-mara-safari-5-days/5.jpg'
    ]),
    metaDescription: 'Join our 5-day Maasai Mara safari adventure in Kenya. Experience the Big Five, Great Migration, and Maasai culture. All-inclusive luxury safari package with expert guides. Book your African dream safari today!',
    keywords: 'Maasai Mara safari, Kenya wildlife tour, Big Five safari, Great Migration, African safari, Maasai Mara tours, Kenya safari package, wildlife safari Kenya'
  },

  // KENYA TOUR 2: Amboseli
  {
    title: '4-Day Amboseli Elephant Paradise',
    slug: 'amboseli-elephant-safari-4-days',
    description: 'Discover the elephant capital of Africa in Amboseli National Park, with magnificent Mount Kilimanjaro providing a stunning backdrop. This intimate 4-day safari offers incredible photography opportunities and close encounters with large elephant herds in their natural habitat.',
    price: 1450,
    priceEUR: 1330,
    priceGBP: 1150,
    priceKES: 188000,
    durationDays: 4,
    countryId: 1,
    city: 'Kajiado',
    latitude: -2.6527,
    longitude: 37.2606,
    difficulty: 'Easy',
    maxGroupSize: 10,
    minGroupSize: 2,
    ageRestriction: 'All ages welcome',
    accommodationType: 'Lodge',
    mealPlan: 'Full Board',
    bestMonths: JSON.stringify(['January', 'February', 'June', 'July', 'August', 'September', 'October', 'December']),
    highlights: JSON.stringify([
      'Elephants with Mount Kilimanjaro backdrop - iconic photo opportunity',
      'Over 1,600 elephants and large elephant families',
      'Observation Hill offering 360-degree panoramic views',
      'Five distinct habitats including swamps, wetlands, and savannah',
      'Over 400 bird species including pelicans and kingfishers',
      'Maasai community cultural visit',
      'Close-up wildlife viewing opportunities',
      'Professional wildlife photography guidance'
    ]),
    inclusions: JSON.stringify([
      'Nairobi hotel or airport transfers',
      'All park entrance fees for Amboseli',
      'Accommodation for 3 nights in quality lodges',
      'All meals (breakfast, lunch, dinner)',
      'Extensive game drives',
      'Professional driver-guide',
      'Bottled mineral water during drives',
      'Flying Doctors emergency cover',
      'Game drive guidebook',
      'Park maps and information'
    ]),
    exclusions: JSON.stringify([
      'International airfare',
      'Kenya visa ($51)',
      'Travel and medical insurance',
      'Tips for driver-guide ($10-15 per day suggested)',
      'Maasai village visit ($20 per person)',
      'Personal items and souvenirs',
      'Drinks and beverages at lodges',
      'Laundry services',
      'Telephone and internet charges',
      'Any items not mentioned in inclusions'
    ]),
    itinerary: JSON.stringify([
      {
        day: 1,
        title: 'Nairobi to Amboseli National Park',
        description: 'Depart Nairobi at 8:00 AM and drive south through scenic Maasai land with views of Mount Kilimanjaro on clear days. Stop at viewpoints for photography and refreshments. Enter Amboseli National Park, arriving at your lodge in time for lunch with views of Kilimanjaro. After lunch and check-in, enjoy an afternoon game drive from 4:00 PM to 6:30 PM exploring the park\'s varied habitats. Amboseli\'s open plains make game viewing easy - look for large elephant herds, lions, cheetahs, buffaloes, and numerous bird species. Watch the sunset paint Kilimanjaro pink and gold. Return for dinner and overnight at your lodge.',
        activities: ['Scenic drive from Nairobi', 'Kilimanjaro viewing', 'Afternoon game drive', 'Sunset photography', 'Wildlife spotting'],
        meals: ['Lunch', 'Dinner'],
        accommodation: 'Amboseli Sopa Lodge, AA Lodge Amboseli, or similar'
      },
      {
        day: 2,
        title: 'Full Day Amboseli Exploration',
        description: 'Wake before dawn for an early morning game drive at 6:30 AM to catch predators at their most active and enjoy stunning sunrise over Kilimanjaro. The soft morning light creates perfect conditions for photography. Return to lodge around 9:00 AM for breakfast. Mid-morning, drive to Observation Hill, a historical viewpoint offering 360-degree panoramic views of the entire park, swamps, and Kilimanjaro. Spot elephants, buffaloes, and other wildlife from above. Enjoy a picnic lunch with a view. Afternoon game drive focuses on the swamp areas where elephants congregate. Optional visit to a Maasai village to learn about traditional culture, customs, and lifestyle. Return as the sun sets behind Kilimanjaro. Dinner and overnight.',
        activities: ['Sunrise game drive', 'Kilimanjaro photography', 'Observation Hill climb', 'Panoramic photography', 'Swamp wildlife viewing', 'Maasai village visit (optional)', 'Sunset viewing'],
        meals: ['Breakfast', 'Picnic Lunch', 'Dinner'],
        accommodation: 'Amboseli Sopa Lodge, AA Lodge Amboseli, or similar'
      },
      {
        day: 3,
        title: 'Amboseli Game Viewing & Photography',
        description: 'Another full day dedicated to exploring different sectors of Amboseli National Park. Early morning game drive targeting areas you haven\'t yet visited. Focus on wildlife photography with Kilimanjaro as backdrop - our guides know the best locations and will position the vehicle for optimal shots. Mid-morning, visit the research center to learn about Amboseli\'s famous elephant research project spanning 45+ years. After lunch and rest, afternoon game drive explores the acacia woodlands and seasonal wetlands. Look for the rare fringe-eared oryx, gerenuks, and the park\'s famous tusker elephants. Photography session during golden hour before sunset. Optional night game drive available ($40 per person) to spot nocturnal animals. Dinner and overnight.',
        activities: ['Morning game drive', 'Elephant photography session', 'Research center visit', 'Woodland exploration', 'Golden hour photography', 'Night drive (optional)'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Amboseli Sopa Lodge, AA Lodge Amboseli, or similar'
      },
      {
        day: 4,
        title: 'Amboseli to Nairobi - Departure',
        description: 'One final early morning game drive to catch any wildlife you may have missed and capture last photos of elephants with Kilimanjaro. Return to lodge for hearty breakfast. Check out and begin your journey back to Nairobi, with game viewing en route as you exit the park. Arrive in Nairobi in early afternoon around 2:00 PM. Drop off at your Nairobi hotel or Jomo Kenyatta International Airport in time for afternoon/evening flights. If time permits, optional stop at a Maasai market for last-minute souvenir shopping. End of safari with unforgettable memories and incredible photos.',
        activities: ['Final morning game drive', 'Last photography session', 'Transfer to Nairobi', 'Optional souvenir shopping'],
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'N/A'
      }
    ]),
    faqs: JSON.stringify([
      {
        question: 'When is the best time to see Mount Kilimanjaro clearly?',
        answer: 'Mount Kilimanjaro is most visible during early mornings (6:00-9:00 AM) and late afternoons (4:00-6:00 PM) when skies are typically clear. The mountain is often shrouded in clouds during midday. January-February and June-October offer the best visibility overall, though weather patterns can vary. Even if clouds obscure the summit, the elephant viewing remains spectacular year-round.'
      },
      {
        question: 'How close can we get to the elephants?',
        answer: 'Amboseli elephants are remarkably habituated to vehicles, allowing very close encounters - sometimes within 10-20 meters! Our guides maintain safe, respectful distances while positioning for optimal viewing and photography. Amboseli\'s research on elephants has helped these herds become comfortable with safari vehicles, providing unparalleled photographic opportunities.'
      },
      {
        question: 'Is Amboseli good for photography?',
        answer: 'Amboseli is considered one of Africa\'s premier photography destinations! The combination of elephants, diverse wildlife, and the iconic Kilimanjaro backdrop creates world-class photo opportunities. The flat terrain and sparse vegetation allow for excellent visibility and composition. Bring telephoto lenses (200-600mm) for wildlife and wide-angle for landscapes. Our guides have photography experience and will position vehicles for best shots.'
      },
      {
        question: 'What other wildlife can we expect to see besides elephants?',
        answer: 'While elephants are the stars, Amboseli hosts abundant wildlife including lions, cheetahs, spotted hyenas, buffaloes, wildebeest, zebras, giraffes, gazelles, impalas, and the rare fringe-eared oryx. The park\'s wetlands attract over 400 bird species including pelicans, cormorants, kingfishers, and various waterbirds. Lucky visitors might spot the endangered black rhino in the Ol Tukai area.'
      },
      {
        question: 'How many elephants live in Amboseli?',
        answer: 'Amboseli is home to over 1,600 elephants, making it one of the best places in Africa for elephant observation. The park is famous for its research on elephants, with some individuals studied for over 45 years. You\'ll see elephants of all ages, from tiny calves to massive bulls with impressive tusks, living in complex family groups.'
      },
      {
        question: 'What should I bring for photography?',
        answer: 'Essential photography gear: DSLR or mirrorless camera, telephoto lens (200-600mm ideal), wide-angle lens (16-35mm for landscapes), extra batteries and memory cards, lens cleaning kit, and camera bag. A beanbag or monopod helps stabilize shots from the vehicle. Early morning/late afternoon offer the best light. Our guides will help with positioning and timing.'
      }
    ]),
    requirements: JSON.stringify([
      'Valid passport (minimum 6 months validity)',
      'Kenya eVisa (apply online at evisa.go.ke)',
      'Yellow fever certificate if arriving from infected areas',
      'Comprehensive travel insurance',
      'Comfortable safari clothing in neutral colors',
      'Good quality camera with zoom lens for wildlife',
      'Sun protection (hat, sunscreen, sunglasses)',
      'Binoculars for enhanced viewing',
      'Personal medications and prescriptions'
    ]),
    coverImage: '/images/tours/amboseli-elephant-safari-4-days/cover.jpg',
    gallery: JSON.stringify([
      '/images/tours/amboseli-elephant-safari-4-days/1.jpg',
      '/images/tours/amboseli-elephant-safari-4-days/2.jpg',
      '/images/tours/amboseli-elephant-safari-4-days/3.jpg',
      '/images/tours/amboseli-elephant-safari-4-days/4.jpg',
      '/images/tours/amboseli-elephant-safari-4-days/5.jpg'
    ]),
    metaDescription: '4-day Amboseli safari featuring Africa\'s best elephant viewing with Mount Kilimanjaro backdrop. Perfect for photographers. Book your Kenya elephant safari adventure.',
    keywords: 'Amboseli safari, Kenya elephants, Kilimanjaro views, elephant photography, Kenya wildlife safari, Amboseli National Park, elephant tours Kenya'
  },

  // KENYA TOUR 3: Samburu
  {
    title: '5-Day Samburu & Buffalo Springs Safari',
    slug: 'samburu-buffalo-springs-safari-5-days',
    description: 'Explore Kenya\'s northern frontier in Samburu and Buffalo Springs National Reserves. Encounter rare northern species including Grevy\'s zebras, reticulated giraffes, Somali ostriches, and gerenuks in stunning arid landscapes.',
    price: 1650,
    priceEUR: 1520,
    priceGBP: 1300,
    priceKES: 214000,
    durationDays: 5,
    countryId: 1,
    city: 'Isiolo',
    latitude: 0.5619,
    longitude: 37.6582,
    difficulty: 'Easy',
    maxGroupSize: 10,
    minGroupSize: 2,
    ageRestriction: 'All ages welcome',
    accommodationType: 'Lodge',
    mealPlan: 'Full Board',
    bestMonths: JSON.stringify(['June', 'July', 'August', 'September', 'October', 'January', 'February']),
    highlights: JSON.stringify([
      'Samburu Special Five: Grevy\'s zebra, reticulated giraffe, Somali ostrich, gerenuk, Beisa oryx',
      'Ewaso Nyiro River with crocodiles and hippos',
      'Large elephant populations',
      'Over 450 bird species including vulturine guineafowl',
      'Visit to Samburu cultural village',
      'Dramatic desert landscapes',
      'Leopard viewing opportunities',
      'Less crowded than southern parks'
    ]),
    inclusions: JSON.stringify([
      'Nairobi hotel/airport transfers',
      'All park entrance fees',
      '4 nights luxury lodge accommodation',
      'All meals (breakfast, lunch, dinner)',
      'Game drives in 4x4 vehicle',
      'Professional guide',
      'Bottled water',
      'Flying Doctors cover',
      'Cultural village visit',
      'Park maps'
    ]),
    exclusions: JSON.stringify([
      'International flights',
      'Kenya visa ($51)',
      'Travel insurance',
      'Tips ($10-15/day)',
      'Personal expenses',
      'Alcoholic drinks',
      'Laundry',
      'Camel riding ($30)',
      'Optional activities'
    ]),
    itinerary: JSON.stringify([
      {
        day: 1,
        title: 'Nairobi to Samburu via Equator',
        description: 'Depart Nairobi at 7:30 AM heading north. Stop at the Equator crossing for photos and demonstrations. Continue through scenic highlands and descending into arid northern Kenya. Arrive Samburu in time for lunch. Afternoon game drive along Ewaso Nyiro River searching for Samburu Special Five and elephants. Dinner and overnight.',
        activities: ['Equator crossing', 'Scenic drive', 'Afternoon game drive', 'River wildlife viewing'],
        meals: ['Lunch', 'Dinner'],
        accommodation: 'Samburu Sopa Lodge or Sarova Shaba Game Lodge'
      },
      {
        day: 2,
        title: 'Full Day Samburu Game Viewing',
        description: 'Early morning and afternoon game drives exploring both Samburu and Buffalo Springs reserves. Focus on finding the rare northern species. Visit the Ewaso Nyiro River to watch elephants bathing and crocodiles basking. Optional visit to Samburu village to learn about traditional warrior culture. Evening sundowner with views over the reserve.',
        activities: ['Morning game drive', 'Samburu village visit', 'River viewing', 'Afternoon game drive', 'Sundowner'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Samburu Sopa Lodge or Sarova Shaba Game Lodge'
      },
      {
        day: 3,
        title: 'Samburu to Ol Pejeta Conservancy',
        description: 'Morning game drive and breakfast. Transfer to Ol Pejeta Conservancy, home to the last two northern white rhinos. Afternoon game drive in this premier wildlife conservancy. Visit the chimpanzee sanctuary and rhino enclosure. Chance to see the Big Five.',
        activities: ['Morning game drive', 'Transfer to Ol Pejeta', 'Chimpanzee sanctuary', 'Rhino viewing', 'Afternoon game drive'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Sweetwaters Serena Camp or similar'
      },
      {
        day: 4,
        title: 'Ol Pejeta to Lake Nakuru',
        description: 'Early game drive in Ol Pejeta. After breakfast, drive to Lake Nakuru National Park. Afternoon game drive around the lake famous for flamingos and rhinos. Visit Baboon Cliff for panoramic views. Look for tree-climbing lions, leopards, and endangered Rothschild giraffes.',
        activities: ['Morning game drive', 'Transfer to Nakuru', 'Afternoon game drive', 'Flamingo viewing', 'Baboon Cliff'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Lake Nakuru Lodge or similar'
      },
      {
        day: 5,
        title: 'Lake Nakuru to Nairobi',
        description: 'Final morning game drive in Lake Nakuru. Breakfast and check out. Drive back to Nairobi arriving early afternoon. Drop off at hotel or airport. End of northern Kenya safari adventure.',
        activities: ['Morning game drive', 'Transfer to Nairobi'],
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'N/A'
      }
    ]),
    faqs: JSON.stringify([
      {
        question: 'What makes Samburu unique compared to other Kenyan parks?',
        answer: 'Samburu is home to the "Samburu Special Five" - rare species found only in northern Kenya: Grevy\'s zebra, reticulated giraffe, Somali ostrich, gerenuk (giraffe-necked antelope), and Beisa oryx. The dramatic arid landscape and Ewaso Nyiro River create unique ecosystems. It\'s also less crowded than southern parks, offering a more exclusive safari experience.'
      },
      {
        question: 'Is Samburu good for photography?',
        answer: 'Excellent! The stark desert landscapes, acacia trees, and unique wildlife create stunning photo opportunities. The Samburu Special Five are highly photogenic, and elephant herds along the river make for dramatic shots. The area\'s red soil and distinctive wildlife offer different compositions from typical safari photos.'
      },
      {
        question: 'What is the Samburu culture like?',
        answer: 'The Samburu people are semi-nomadic pastoralists closely related to the Maasai. They maintain strong cultural traditions including distinctive red clothing, beaded jewelry, and warrior customs. Village visits offer insights into their lifestyle, traditional songs and dances, and local crafts. They\'re known for their warm hospitality.'
      }
    ]),
    requirements: JSON.stringify([
      'Valid passport',
      'Kenya eVisa',
      'Yellow fever certificate',
      'Travel insurance',
      'Light, neutral-colored clothing',
      'Sun protection',
      'Camera equipment',
      'Binoculars'
    ]),
    coverImage: '/images/tours/samburu-safari-5-days/cover.jpg',
    gallery: JSON.stringify([
      '/images/tours/samburu-safari-5-days/1.jpg',
      '/images/tours/samburu-safari-5-days/2.jpg',
      '/images/tours/samburu-safari-5-days/3.jpg',
      '/images/tours/samburu-safari-5-days/4.jpg',
      '/images/tours/samburu-safari-5-days/5.jpg'
    ]),
    metaDescription: '5-day Samburu safari in northern Kenya. See rare Grevy\'s zebras, reticulated giraffes, and unique wildlife. Experience Samburu culture and pristine wilderness.',
    keywords: 'Samburu safari, northern Kenya, Grevy zebra, reticulated giraffe, Samburu Special Five, Kenya wildlife safari'
  },

  // KENYA TOUR 4: Tsavo
  {
    title: '6-Day Tsavo East & West Adventure',
    slug: 'tsavo-east-west-safari-6-days',
    description: 'Discover Kenya\'s largest wilderness in Tsavo East and West National Parks. Experience vast landscapes, famous red elephants, diverse wildlife, and the legendary Man-Eaters of Tsavo territory.',
    price: 1750,
    priceEUR: 1610,
    priceGBP: 1380,
    priceKES: 227000,
    durationDays: 6,
    countryId: 1,
    city: 'Voi',
    latitude: -3.3963,
    longitude: 38.5598,
    difficulty: 'Easy',
    maxGroupSize: 12,
    minGroupSize: 2,
    ageRestriction: 'All ages welcome',
    accommodationType: 'Lodge',
    mealPlan: 'Full Board',
    bestMonths: JSON.stringify(['June', 'July', 'August', 'September', 'October', 'January', 'February']),
    highlights: JSON.stringify([
      'Kenya\'s largest protected area - over 22,000 sq km',
      'Famous red elephants coated in iron-rich soil',
      'Mzima Springs with crystal clear water and hippos',
      'Lugard Falls on Galana River',
      'Yatta Plateau - world\'s longest lava flow',
      'Diverse landscapes from semi-arid plains to volcanic hills',
      'Over 600 bird species',
      'Historic Man-Eaters of Tsavo territory'
    ]),
    inclusions: JSON.stringify([
      'Nairobi/Mombasa transfers',
      'All park fees',
      '5 nights accommodation',
      'All meals',
      'Game drives',
      'Professional guide',
      'Bottled water',
      'Flying Doctors insurance',
      'Mzima Springs visit',
      'Lugard Falls visit'
    ]),
    exclusions: JSON.stringify([
      'International flights',
      'Visa fees',
      'Travel insurance',
      'Tips',
      'Personal items',
      'Drinks',
      'Laundry',
      'Optional activities'
    ]),
    itinerary: JSON.stringify([
      {
        day: 1,
        title: 'Nairobi to Tsavo East',
        description: 'Depart Nairobi at 7:00 AM traveling southeast through diverse landscapes. Enter Tsavo East through Bachuma Gate. Game drive en route to lodge, spotting red elephants, buffaloes, and various plains game. Lunch at lodge. Afternoon game drive exploring the Voi River circuit. Visit Aruba Dam to watch elephants, lions, and other wildlife drinking. Return for dinner and overnight.',
        activities: ['Scenic drive', 'Afternoon game drive', 'Aruba Dam visit', 'Red elephant viewing'],
        meals: ['Lunch', 'Dinner'],
        accommodation: 'Ashnil Aruba Lodge or Voi Safari Lodge'
      },
      {
        day: 2,
        title: 'Full Day Tsavo East',
        description: 'Full day of game drives in Tsavo East exploring different areas. Morning drive along Galana River looking for lions, cheetahs, and river wildlife. Visit Lugard Falls where the river crashes through narrow gorges. Picnic lunch in the bush. Afternoon explores open plains and the Yatta Plateau escarpment. Watch elephants dust bathing in the characteristic red soil that gives them their color.',
        activities: ['Morning game drive', 'Lugard Falls', 'Bush picnic', 'Yatta Plateau viewing', 'Elephant watching'],
        meals: ['Breakfast', 'Packed Lunch', 'Dinner'],
        accommodation: 'Ashnil Aruba Lodge or Voi Safari Lodge'
      },
      {
        day: 3,
        title: 'Tsavo East to Tsavo West',
        description: 'Morning game drive in Tsavo East. After breakfast, transfer to Tsavo West, a more geologically diverse and wetter park with volcanic hills and lush vegetation. Afternoon game drive visiting Mzima Springs where you can view hippos and fish from an underwater observatory. The springs produce 250 million liters of water daily from the Chyulu Hills lava flows.',
        activities: ['Morning game drive', 'Transfer to Tsavo West', 'Mzima Springs underwater observatory', 'Afternoon game drive'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Kilaguni Serena Safari Lodge or Severin Safari Camp'
      },
      {
        day: 4,
        title: 'Full Day Tsavo West',
        description: 'Explore the volcanic landscapes of Tsavo West. Morning game drive to Roaring Rocks for panoramic views. Visit Shetani Lava Flows, dramatic black lava from volcanic eruptions 200 years ago. Afternoon game drive around Lake Jipe on the Tanzania border. Look for the rare fringed-eared oryx, lesser kudu, and klipspringer. Evening game drive seeking nocturnal animals as they emerge.',
        activities: ['Roaring Rocks viewpoint', 'Shetani Lava Flows', 'Lake Jipe', 'Volcanic landscape viewing', 'Evening game drive'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Kilaguni Serena Safari Lodge or Severin Safari Camp'
      },
      {
        day: 5,
        title: 'Tsavo West Game Viewing',
        description: 'Another full day exploring Tsavo West. Early morning game drive targeting predators. Visit Poachers Lookout for spectacular views over Tsavo plains. Afternoon relaxation at lodge or optional visit to nearby Chyulu Hills for walking safari. Evening game drive exploring different park sectors. Night brings the opportunity to hear lions roaring and hyenas calling.',
        activities: ['Morning game drive', 'Poachers Lookout', 'Leisure time', 'Optional Chyulu Hills walk', 'Evening game drive'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Kilaguni Serena Safari Lodge or Severin Safari Camp'
      },
      {
        day: 6,
        title: 'Tsavo West to Nairobi/Mombasa',
        description: 'Final early morning game drive for last wildlife viewing. Breakfast and check out. Option to return to Nairobi (6 hours) or continue to Mombasa beaches (3.5 hours). Arrive destination in afternoon with incredible memories of Kenya\'s wilderness.',
        activities: ['Final game drive', 'Transfer to Nairobi or Mombasa'],
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'N/A'
      }
    ]),
    faqs: JSON.stringify([
      {
        question: 'Why are Tsavo elephants red?',
        answer: 'Tsavo elephants aren\'t naturally red - they appear red because they dust-bathe and coat themselves in the region\'s iron-rich red soil. This protects them from sun and insects. After rain or bathing, they return to their natural gray color until they dust-bathe again. It\'s become an iconic feature of Tsavo elephants.'
      },
      {
        question: 'What is the story of the Man-Eaters of Tsavo?',
        answer: 'In 1898, two male lions terrorized railway workers building the Kenya-Uganda Railway, killing an estimated 35-135 people. The lions developed a taste for human flesh and halted construction for months before being shot by Lt. Col. John Patterson. The story inspired books and the movie "The Ghost and the Darkness." You\'ll visit the historic area during your safari.'
      },
      {
        question: 'How is Tsavo different from Maasai Mara or Amboseli?',
        answer: 'Tsavo is much larger (combined, it\'s Kenya\'s biggest protected area) but has lower animal density, making sightings feel more rewarding. The landscape is more varied with volcanic hills, lava flows, springs, and diverse vegetation. It\'s less crowded with tourists, offering a more remote, authentic wilderness experience. The red elephants and dramatic scenery make it unique.'
      }
    ]),
    requirements: JSON.stringify([
      'Valid passport',
      'Kenya visa',
      'Yellow fever certificate',
      'Travel insurance',
      'Safari clothing',
      'Camera with telephoto lens',
      'Sun protection',
      'Binoculars',
      'Personal medications'
    ]),
    coverImage: '/images/tours/tsavo-safari-6-days/cover.jpg',
    gallery: JSON.stringify([
      '/images/tours/tsavo-safari-6-days/1.jpg',
      '/images/tours/tsavo-safari-6-days/2.jpg',
      '/images/tours/tsavo-safari-6-days/3.jpg',
      '/images/tours/tsavo-safari-6-days/4.jpg',
      '/images/tours/tsavo-safari-6-days/5.jpg'
    ]),
    metaDescription: '6-day Tsavo East & West safari in Kenya. Experience red elephants, Mzima Springs, volcanic landscapes, and vast wilderness. Kenya\'s largest national park adventure.',
    keywords: 'Tsavo safari, Tsavo East, Tsavo West, red elephants Kenya, Man-Eaters of Tsavo, Kenya wildlife safari, Mzima Springs'
  },

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
    coverImage: '/images/tours/serengeti-ngorongoro-safari-7-days/cover.jpg',
    gallery: JSON.stringify([
      '/images/tours/serengeti-ngorongoro-safari-7-days/1.jpg',
      '/images/tours/serengeti-ngorongoro-safari-7-days/2.jpg',
      '/images/tours/serengeti-ngorongoro-safari-7-days/3.jpg',
      '/images/tours/serengeti-ngorongoro-safari-7-days/4.jpg',
      '/images/tours/serengeti-ngorongoro-safari-7-days/5.jpg'
    ]),
    metaDescription: '7-day Tanzania safari combining Serengeti, Ngorongoro Crater, and Tarangire. Witness the Great Migration, Big Five, and stunning volcanic landscapes. Premier Tanzania safari experience.',
    keywords: 'Serengeti safari, Ngorongoro Crater, Tanzania safari, Great Migration, Tanzania wildlife, Serengeti tours, Ngorongoro safari'
  }
]

async function main() {
  console.log('🌍 Starting Flagship Tours Database Seed...\n')
  
  // Clear existing data (in correct order due to foreign keys)
  console.log('🧹 Clearing existing tour data...')
  await prisma.booking.deleteMany({})
  await prisma.tourDay.deleteMany({})
  await prisma.tourImage.deleteMany({})
  await prisma.tour.deleteMany({})
  
  console.log(`✅ Cleared old data\\n`)
  
  // Seed flagship tours
  console.log(`📝 Creating ${flagshipTours.length} flagship tours...\\n`)
  
  for (const tourData of flagshipTours) {
    const tour = await prisma.tour.create({
      data: tourData
    })
    console.log(`✅ Created: ${tour.title}`)
    console.log(`   - ${tour.durationDays} days | $${tour.price} USD`)
    console.log(`   - ${tour.city}, Kenya`)
    console.log(`   - Difficulty: ${tour.difficulty}\\n`)
  }
  
  console.log(`\\n🎉 Successfully seeded ${flagshipTours.length} flagship tours!`)
  console.log('\\n📊 Summary:')
  console.log(`   - Tours created: ${flagshipTours.length}`)
  console.log(`   - All tours include: detailed itineraries, multi-currency pricing, FAQs, highlights`)
  console.log(`   - Ready for: image galleries, translation keys, frontend display`)
  console.log(`\\n✨ Phase 1 database setup complete!\\n`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
