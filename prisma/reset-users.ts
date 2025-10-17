// Script to reset users and create admin account
// Run with: npx tsx prisma/reset-users.ts

import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Starting user reset...\n');

  // Delete all existing users
  console.log('🗑️  Deleting all existing users...');
  const deletedUsers = await prisma.user.deleteMany({});
  console.log(`✅ Deleted ${deletedUsers.count} users\n`);

  // Delete all verification tokens
  console.log('🗑️  Deleting all verification tokens...');
  const deletedTokens = await prisma.verificationToken.deleteMany({});
  console.log(`✅ Deleted ${deletedTokens.count} tokens\n`);

  // Create admin account
  console.log('👤 Creating admin account...');
  const adminUser = await prisma.user.create({
    data: {
      name: 'Edmund Spira',
      email: 'edmundspira@gmail.com',
      hashedPassword: hashSync('Admin123!', 10),
      role: 'ADMIN',
      isActive: true,
      emailVerified: new Date(), // Auto-verify admin
    },
  });

  console.log('✅ Admin account created successfully!');
  console.log('\n📧 Email: edmundspira@gmail.com');
  console.log('🔑 Password: Admin123!');
  console.log('👑 Role: ADMIN');
  console.log(`🆔 ID: ${adminUser.id}\n`);

  console.log('🎉 User reset complete!');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
