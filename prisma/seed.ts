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
      role: 'ADMIN',
      hashedPassword: hashSync('Admin123!', 10),
      emailVerified: new Date(),
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
      hashedPassword: hashSync('User123!', 10),
      emailVerified: new Date(),
    },
    update: {},
  });
  console.log('✅ Test user created');

  // Sample blog posts
  await prisma.post.upsert({
    where: { slug: 'welcome-to-severius-adventures' },
    create: {
      title: 'Welcome to Severius Adventures',
      slug: 'welcome-to-severius-adventures',
      excerpt: 'Discover the wonders of Africa with our expertly curated safari tours.',
      content: 'Welcome to Severius Adventures! We specialize in creating unforgettable safari experiences.',
      featuredImage: '/images/blog/safari-sunset.jpg',
      published: true,
      authorId: admin.id,
    },
    update: {},
  });
  console.log('✅ Blog posts created');

  // Sample bookings (using static tour slugs)
  await prisma.booking.upsert({
    where: { ref: 'BOOK-001' },
    create: {
      ref: 'BOOK-001',
      userId: testUser.id,
      tourSlug: 'maasai-mara-safari',
      tourTitle: '5-Day Maasai Mara Safari',
      amount: 2500,
      status: 'PAID',
      startDate: new Date('2025-08-15'),
      guests: 2,
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
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

