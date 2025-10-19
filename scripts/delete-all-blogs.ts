/**
 * Script to delete all blog posts from Neon PostgreSQL database
 * This tests the database connection and clears existing blog data
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function deleteAllBlogs() {
  try {
    console.log('🔗 Connecting to Neon PostgreSQL database...');
    
    // Test connection by counting posts
    const count = await prisma.post.count();
    console.log(`📊 Found ${count} blog post(s) in database`);

    if (count === 0) {
      console.log('✅ No blog posts to delete. Database is already clean!');
      return;
    }

    // Fetch all posts to display before deletion
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        published: true,
        createdAt: true,
      }
    });

    console.log('\n📝 Current blog posts:');
    posts.forEach((post, index) => {
      console.log(`  ${index + 1}. ${post.title}`);
      console.log(`     - Slug: ${post.slug}`);
      console.log(`     - Published: ${post.published ? 'Yes' : 'No'}`);
      console.log(`     - Created: ${post.createdAt.toLocaleDateString()}`);
      console.log('');
    });

    // Delete all posts
    console.log('🗑️  Deleting all blog posts...');
    const deleteResult = await prisma.post.deleteMany({});
    
    console.log(`✅ Successfully deleted ${deleteResult.count} blog post(s) from Neon database!`);
    
    // Verify deletion
    const verifyCount = await prisma.post.count();
    console.log(`\n✓ Verification: ${verifyCount} blog posts remaining in database`);
    
    if (verifyCount === 0) {
      console.log('✅ Database connection test PASSED!');
      console.log('✅ All blog posts successfully removed from Neon PostgreSQL!');
    }

  } catch (error) {
    console.error('❌ Error:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.log('\n🔌 Disconnected from database');
  }
}

// Run the script
console.log('🚀 Starting blog deletion script...\n');
deleteAllBlogs();
