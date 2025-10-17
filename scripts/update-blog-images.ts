import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateBlogImages() {
  try {
    const posts = await prisma.post.findMany();

    // Sample images from Pexels (travel/safari themed)
    const imageUrls = [
      'https://images.pexels.com/photos/631477/pexels-photo-631477.jpeg?auto=compress&cs=tinysrgb&w=1200', // Safari
      'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=1200', // Tanzania landscape
      'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1200', // Morocco
    ];

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const imageUrl = imageUrls[i % imageUrls.length];

      await prisma.post.update({
        where: { id: post.id },
        data: { featuredImage: imageUrl },
      });

      console.log(`✅ Updated ${post.title} with featured image`);
    }

    console.log('\n✨ All blog posts updated successfully!');
  } catch (error) {
    console.error('❌ Error updating blog posts:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateBlogImages();
