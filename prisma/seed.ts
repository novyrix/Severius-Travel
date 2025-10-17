import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@sevadv.com' },
    create: { 
      email: 'admin@sevadv.com', 
      name: 'Admin User', 
      hashedPassword: hashSync('Admin123!', 10) 
    },
    update: {},
  });
  console.log('✅ Admin user created');

  // Test user
  const testUser = await prisma.user.upsert({
    where: { email: 'user@test.com' },
    create: { 
      email: 'user@test.com', 
      name: 'Test User', 
      hashedPassword: hashSync('User123!', 10) 
    },
    update: {},
  });
  console.log('✅ Test user created');

  // Regions
  const africa = await prisma.region.upsert({
    where: { code: 'AF' },
    create: { code: 'AF', name: 'Africa' },
    update: {},
  });

  const europe = await prisma.region.upsert({
    where: { code: 'EU' },
    create: { code: 'EU', name: 'Europe' },
    update: {},
  });

  const asia = await prisma.region.upsert({
    where: { code: 'AS' },
    create: { code: 'AS', name: 'Asia' },
    update: {},
  });
  console.log('✅ Regions created');

  // Countries
  const kenya = await prisma.country.upsert({
    where: { iso2: 'KE' },
    create: { name: 'Kenya', iso2: 'KE', slug: 'kenya', regionId: africa.id },
    update: {},
  });

  const tanzania = await prisma.country.upsert({
    where: { iso2: 'TZ' },
    create: { name: 'Tanzania', iso2: 'TZ', slug: 'tanzania', regionId: africa.id },
    update: {},
  });

  const southAfrica = await prisma.country.upsert({
    where: { iso2: 'ZA' },
    create: { name: 'South Africa', iso2: 'ZA', slug: 'south-africa', regionId: africa.id },
    update: {},
  });

  const france = await prisma.country.upsert({
    where: { iso2: 'FR' },
    create: { name: 'France', iso2: 'FR', slug: 'france', regionId: europe.id },
    update: {},
  });

  const thailand = await prisma.country.upsert({
    where: { iso2: 'TH' },
    create: { name: 'Thailand', iso2: 'TH', slug: 'thailand', regionId: asia.id },
    update: {},
  });
  console.log('✅ Countries created');

  // Tours - Kenya
  const maraTour = await prisma.tour.upsert({
    where: { slug: 'maasai-mara-safari' },
    create: {
      slug: 'maasai-mara-safari',
      title: 'Maasai Mara Safari Adventure',
      description: 'Experience the great wildebeest migration and witness the Big Five in their natural habitat. This 5-day safari takes you through the stunning Maasai Mara National Reserve, one of Africa\'s greatest wildlife reserves.',
      price: 1850, // USD 1,850 per person
      durationDays: 5,
      countryId: kenya.id,
      published: true,
      difficulty: 'Easy',
      maxGroupSize: 12,
      minGroupSize: 2,
      ageRestriction: 'All ages welcome',
      accommodationType: 'Lodge',
      mealPlan: 'Full Board',
      bestMonths: JSON.stringify(['January', 'February', 'July', 'August', 'September', 'October']),
      highlights: JSON.stringify([
        'Witness the Great Wildebeest Migration',
        'Spot the Big Five (Lion, Elephant, Buffalo, Leopard, Rhino)',
        'Visit a traditional Maasai village',
        'Professional guide and 4x4 safari vehicle',
        'Stunning landscapes and photography opportunities',
        'Mara River crossings (seasonal)',
      ]),
      inclusions: JSON.stringify([
        'Airport transfers',
        'Professional English-speaking guide',
        'All park fees and government taxes',
        'Full board accommodation',
        'Game drives in 4x4 safari vehicle',
        'Bottled water during game drives',
        'Flying Doctors insurance',
      ]),
      exclusions: JSON.stringify([
        'International flights',
        'Visa fees',
        'Travel insurance',
        'Tips and gratuities',
        'Personal expenses',
        'Optional activities',
        'Drinks at the lodge',
      ]),
      itinerary: JSON.stringify([
        {
          day: 1,
          title: 'Arrival in Nairobi',
          details: 'Upon arrival at Jomo Kenyatta International Airport, you will be met by our representative and transferred to your hotel. Evening briefing about the safari. Overnight in Nairobi.',
        },
        {
          day: 2,
          title: 'Drive to Maasai Mara',
          details: 'After breakfast, depart for Maasai Mara National Reserve. Game drive en route. Arrive at the lodge for lunch. Afternoon game drive in search of wildlife. Dinner and overnight at the lodge.',
        },
        {
          day: 3,
          title: 'Full Day Game Drive',
          details: 'Spend the entire day exploring the Mara. Early morning game drive, return for breakfast. Optional visit to Mara River (seasonal migration). Picnic lunch in the bush. Evening game drive and sundowners.',
        },
        {
          day: 4,
          title: 'Maasai Village & Game Drive',
          details: 'Morning visit to a traditional Maasai village to learn about their culture. Afternoon game drive. Optional hot air balloon safari available (extra cost). Final evening in the Mara.',
        },
        {
          day: 5,
          title: 'Return to Nairobi',
          details: 'Early morning game drive. After breakfast, drive back to Nairobi. Drop off at airport for your departure flight or extend your stay in Nairobi.',
        },
      ]),
      faqs: JSON.stringify([
        {
          question: 'What is the best time to visit Maasai Mara?',
          answer: 'The best time is during the Great Migration (July-October), but the Mara offers excellent wildlife viewing year-round.',
        },
        {
          question: 'What should I pack?',
          answer: 'Lightweight clothing in neutral colors, sunscreen, hat, sunglasses, camera, binoculars, and a light jacket for early mornings.',
        },
        {
          question: 'Is this tour suitable for children?',
          answer: 'Yes, this tour is family-friendly and suitable for all ages. Children will love the wildlife and cultural experiences.',
        },
      ]),
      requirements: JSON.stringify([
        'Valid passport (6 months validity)',
        'Visa for Kenya (can be obtained online)',
        'Yellow fever vaccination certificate (if coming from endemic areas)',
        'Travel insurance is highly recommended',
        'Moderate fitness level',
      ]),
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1516426122078-c23e76319801',
        'https://images.unsplash.com/photo-1535083783855-76ae62b2914e',
        'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e',
        'https://images.unsplash.com/photo-1549366021-9f761d450615',
      ]),
      coverImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801',
      metaDescription: '5-day Maasai Mara safari experiencing the Great Migration, Big Five, and Maasai culture. Professional guides, luxury lodges, and unforgettable African adventure.',
      keywords: 'Maasai Mara, Kenya safari, Great Migration, Big Five, Maasai village, wildlife safari, Kenya tours',
      images: { 
        create: [
          { url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801', alt: 'Maasai Mara landscape', order: 0 },
          { url: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e', alt: 'Lions in the wild', order: 1 },
          { url: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e', alt: 'Elephants', order: 2 },
        ] 
      },
      days: {
        create: [
          { dayNumber: 1, title: 'Arrival in Nairobi', details: 'Arrive at Jomo Kenyatta International Airport. Transfer to hotel. Evening briefing about the safari.' },
          { dayNumber: 2, title: 'Drive to Maasai Mara', details: 'Early morning departure to Maasai Mara. Game drive en route. Check into lodge. Afternoon game drive.' },
          { dayNumber: 3, title: 'Full Day Game Drive', details: 'Spend the entire day exploring the Mara. Visit the Mara River. Picnic lunch in the bush. Evening sundowners.' },
          { dayNumber: 4, title: 'Maasai Village & Game Drive', details: 'Visit a traditional Maasai village. Learn about their culture. Afternoon game drive. Optional hot air balloon safari (extra cost).' },
          { dayNumber: 5, title: 'Return to Nairobi', details: 'Morning game drive. Drive back to Nairobi. Departure or extend your stay.' },
        ],
      },
    },
    update: {},
  });

  const amboselitour = await prisma.tour.upsert({
    where: { slug: 'amboseli-mt-kilimanjaro' },
    create: {
      slug: 'amboseli-mt-kilimanjaro',
      title: 'Amboseli & Mt. Kilimanjaro Views',
      description: 'Discover Amboseli National Park with breathtaking views of Mount Kilimanjaro. Get up close with large elephant herds and diverse wildlife in this iconic African landscape.',
      price: 1250, // USD 1,250
      durationDays: 3,
      countryId: kenya.id,
      published: true,
      images: { 
        create: [
          { url: 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6', alt: 'Elephants and Kilimanjaro', order: 0 },
          { url: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44', alt: 'Amboseli landscape', order: 1 },
        ] 
      },
      days: {
        create: [
          { dayNumber: 1, title: 'Nairobi to Amboseli', details: 'Morning departure from Nairobi. Arrive at Amboseli. Afternoon game drive with Kilimanjaro backdrop.' },
          { dayNumber: 2, title: 'Full Day Amboseli', details: 'Early morning and late afternoon game drives. Visit observation hill for panoramic views. Elephant research center visit.' },
          { dayNumber: 3, title: 'Return to Nairobi', details: 'Sunrise game drive. Breakfast at the lodge. Return to Nairobi with arrival in the afternoon.' },
        ],
      },
    },
    update: {},
  });

  // Tours - Tanzania
  const serengetiTour = await prisma.tour.upsert({
    where: { slug: 'serengeti-ngorongoro-safari' },
    create: {
      slug: 'serengeti-ngorongoro-safari',
      title: 'Serengeti & Ngorongoro Crater',
      description: 'Explore Tanzania\'s most famous national parks. Witness the endless plains of Serengeti and descend into the magnificent Ngorongoro Crater, a UNESCO World Heritage Site.',
      price: 2950, // USD 2,950
      durationDays: 7,
      countryId: tanzania.id,
      published: true,
      images: { 
        create: [
          { url: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e', alt: 'Serengeti plains', order: 0 },
          { url: 'https://images.unsplash.com/photo-1612356975821-bc2fd7a8ae63', alt: 'Ngorongoro Crater', order: 1 },
        ] 
      },
      days: {
        create: [
          { dayNumber: 1, title: 'Arrival Arusha', details: 'Arrive at Kilimanjaro Airport. Transfer to Arusha. Safari briefing and rest.' },
          { dayNumber: 2, title: 'Arusha to Serengeti', details: 'Drive through Ngorongoro Conservation Area to Serengeti. Afternoon game drive.' },
          { dayNumber: 3, title: 'Serengeti Full Day', details: 'Full day game drive in Serengeti. Search for the Big Five and witness incredible wildlife.' },
          { dayNumber: 4, title: 'Serengeti to Ngorongoro', details: 'Morning game drive. Afternoon transfer to Ngorongoro. Overnight on crater rim.' },
          { dayNumber: 5, title: 'Ngorongoro Crater', details: 'Descend into the crater for full day game drive. Picnic lunch by hippo pool.' },
          { dayNumber: 6, title: 'Lake Manyara', details: 'Visit Lake Manyara National Park. Famous for tree-climbing lions and flamingos.' },
          { dayNumber: 7, title: 'Return to Arusha', details: 'Morning at leisure. Transfer to airport for departure.' },
        ],
      },
    },
    update: {},
  });

  // More tours
  const capeTownTour = await prisma.tour.upsert({
    where: { slug: 'cape-town-garden-route' },
    create: {
      slug: 'cape-town-garden-route',
      title: 'Cape Town & Garden Route',
      description: 'Discover the beauty of South Africa from Table Mountain to pristine beaches. Explore Cape Town, visit Cape Point, and drive the scenic Garden Route.',
      price: 2250, // USD 2,250
      durationDays: 6,
      countryId: southAfrica.id,
      published: true,
      images: { 
        create: [
          { url: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99', alt: 'Table Mountain Cape Town', order: 0 },
        ] 
      },
      days: {
        create: [
          { dayNumber: 1, title: 'Arrive Cape Town', details: 'Airport transfer. Table Mountain cable car (weather permitting). V&A Waterfront.' },
          { dayNumber: 2, title: 'Cape Peninsula Tour', details: 'Chapman\'s Peak Drive. Cape Point. Boulders Beach penguins. Kirstenbosch Gardens.' },
          { dayNumber: 3, title: 'Winelands', details: 'Stellenbosch and Franschhoek wine tasting. Historic estates. Gourmet lunch.' },
          { dayNumber: 4, title: 'Garden Route - Mossel Bay', details: 'Scenic drive along the coast. Stop at Hermanus (whale watching season). Overnight Mossel Bay.' },
          { dayNumber: 5, title: 'Knysna & Plettenberg Bay', details: 'Explore Knysna Heads. Featherbed Nature Reserve. Beaches of Plett.' },
          { dayNumber: 6, title: 'Return to Cape Town', details: 'Drive back or optional flight. Departure.' },
        ],
      },
    },
    update: {},
  });

  const parisTour = await prisma.tour.upsert({
    where: { slug: 'paris-romance' },
    create: {
      slug: 'paris-romance',
      title: 'Romantic Paris Experience',
      description: 'Fall in love with the City of Light. Visit iconic landmarks, enjoy world-class cuisine, and experience the magic of Paris.',
      price: 3100, // USD 3,100
      durationDays: 5,
      countryId: france.id,
      published: true,
      images: { 
        create: [
          { url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34', alt: 'Eiffel Tower Paris', order: 0 },
        ] 
      },
      days: {
        create: [
          { dayNumber: 1, title: 'Arrive Paris', details: 'Check into hotel. Evening Seine River cruise. Illuminated Eiffel Tower.' },
          { dayNumber: 2, title: 'Classic Paris', details: 'Louvre Museum. Champs-Élysées. Arc de Triomphe. Montmartre and Sacré-Cœur.' },
          { dayNumber: 3, title: 'Versailles Day Trip', details: 'Palace of Versailles. Gardens. Hall of Mirrors. Return for evening in Latin Quarter.' },
          { dayNumber: 4, title: 'Art & Culture', details: 'Musée d\'Orsay. Notre-Dame (exterior). Sainte-Chapelle. Evening at Moulin Rouge (optional).' },
          { dayNumber: 5, title: 'Departure', details: 'Morning shopping. Last croissant. Airport transfer.' },
        ],
      },
    },
    update: {},
  });

  const bangkokTour = await prisma.tour.upsert({
    where: { slug: 'thailand-bangkok-phuket' },
    create: {
      slug: 'thailand-bangkok-phuket',
      title: 'Thailand: Bangkok to Phuket',
      description: 'Experience the vibrant culture of Bangkok and the tropical paradise of Phuket. Temples, markets, beaches, and island adventures.',
      price: 1650, // USD 1,650
      durationDays: 8,
      countryId: thailand.id,
      published: true,
      images: { 
        create: [
          { url: 'https://images.unsplash.com/photo-1528181304800-259b08848526', alt: 'Bangkok Temple', order: 0 },
          { url: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5', alt: 'Phuket Beach', order: 1 },
        ] 
      },
      days: {
        create: [
          { dayNumber: 1, title: 'Arrive Bangkok', details: 'Airport transfer. Settle in. Evening tuk-tuk tour.' },
          { dayNumber: 2, title: 'Bangkok Temples', details: 'Grand Palace. Wat Pho (Reclining Buddha). Wat Arun. Evening street food tour.' },
          { dayNumber: 3, title: 'Floating Markets', details: 'Damnoen Saduak Floating Market. Railway Market. Chinatown evening.' },
          { dayNumber: 4, title: 'Fly to Phuket', details: 'Morning flight. Afternoon at Patong Beach. Seafood dinner.' },
          { dayNumber: 5, title: 'Phi Phi Islands', details: 'Full day boat tour. Maya Bay. Snorkeling. Viking Cave.' },
          { dayNumber: 6, title: 'Phang Nga Bay', details: 'James Bond Island. Sea kayaking. Cave exploration.' },
          { dayNumber: 7, title: 'Beach Day', details: 'Relax at Kata or Karon Beach. Thai massage. Sunset at Promthep Cape.' },
          { dayNumber: 8, title: 'Departure', details: 'Morning at leisure. Airport transfer.' },
        ],
      },
    },
    update: {},
  });

  console.log('✅ Tours created');

  // Blog posts
  await prisma.post.upsert({
    where: { slug: 'welcome-to-severius' },
    create: {
      slug: 'welcome-to-severius',
      title: 'Welcome to Severius Travel & Adventures',
      excerpt: 'Discover extraordinary journeys across the globe with us.',
      content: 'At Severius Travel & Adventures, we specialize in crafting unforgettable travel experiences. From African safaris to European cultural tours and Asian beach getaways, we curate journeys that create lasting memories. Our expert guides and carefully selected accommodations ensure your adventure is seamless and spectacular.',
      published: true,
      authorId: admin.id,
    },
    update: {},
  });

  await prisma.post.upsert({
    where: { slug: 'safari-packing-guide' },
    create: {
      slug: 'safari-packing-guide',
      title: 'The Ultimate Safari Packing Guide',
      excerpt: 'Everything you need to pack for your African safari adventure.',
      content: 'Heading on safari? Here\'s what to pack: neutral-colored clothing (khaki, olive, beige), wide-brimmed hat, sunglasses, sunscreen SPF 50+, binoculars, camera with zoom lens, insect repellent, comfortable walking shoes, light jacket for early mornings, and any personal medications. Pro tip: Pack light as luggage space is limited in safari vehicles!',
      published: true,
      authorId: admin.id,
    },
    update: {},
  });

  await prisma.post.upsert({
    where: { slug: 'best-time-maasai-mara' },
    create: {
      slug: 'best-time-maasai-mara',
      title: 'Best Time to Visit Maasai Mara',
      excerpt: 'Plan your safari during the great migration season.',
      content: 'The Maasai Mara is spectacular year-round, but the Great Migration (July-October) is the ultimate spectacle. Over 1.5 million wildebeest cross the Mara River. For fewer crowds, visit in June or November. The long rains (April-May) mean lush landscapes and great birding. Each season offers unique wildlife experiences!',
      published: true,
      authorId: admin.id,
    },
    update: {},
  });

  console.log('✅ Blog posts created');

  // Example bookings
  await prisma.booking.upsert({
    where: { ref: 'BOOK-0001' },
    create: {
      ref: 'BOOK-0001',
      amount: 185000,
      status: 'PAID',
      userId: testUser.id,
      tourId: maraTour.id,
    },
    update: {},
  });

  await prisma.booking.upsert({
    where: { ref: 'BOOK-0002' },
    create: {
      ref: 'BOOK-0002',
      amount: 295000,
      status: 'PENDING',
      userId: testUser.id,
      tourId: serengetiTour.id,
    },
    update: {},
  });

  console.log('✅ Sample bookings created');
  console.log('🎉 Seed completed successfully!');
  console.log('\n📧 Test accounts:');
  console.log('Admin: admin@sevadv.com / Admin123!');
  console.log('User: user@test.com / User123!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });