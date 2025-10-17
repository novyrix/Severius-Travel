import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

const heroImages = [
  {
    query: 'african safari kenya landscape',
    filename: 'about-hero.jpg',
    directory: 'hero',
  },
  {
    query: 'customer service team africa',
    filename: 'contact-hero.jpg',
    directory: 'hero',
  },
  {
    query: 'questions help support',
    filename: 'faq-hero.jpg',
    directory: 'hero',
  },
  {
    query: 'maasai mara kenya',
    filename: 'mara.jpg',
    directory: 'hero',
  },
];

async function downloadImage(query, filename, directory) {
  try {
    const searchUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`;
    
    const searchResponse = await fetch(searchUrl, {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });

    const searchData = await searchResponse.json();
    
    if (!searchData.results || searchData.results.length === 0) {
      console.log(`❌ No images found for: ${query}`);
      return;
    }

    const photo = searchData.results[0];
    const imageUrl = photo.urls.regular;
    const downloadUrl = photo.links.download_location;

    // Trigger download tracking
    await fetch(downloadUrl, {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });

    // Download the image
    const imageResponse = await fetch(imageUrl);
    const arrayBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Save to public/images directory
    const dirPath = path.join(__dirname, '..', 'public', 'images', directory);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const filePath = path.join(dirPath, filename);
    fs.writeFileSync(filePath, buffer);

    // Save attribution
    const attribution = {
      photographer: photo.user.name,
      photographerUrl: photo.user.links.html,
      photoUrl: photo.links.html,
      downloadedAt: new Date().toISOString(),
    };

    const attributionPath = path.join(dirPath, `${filename.replace('.jpg', '')}-attribution.json`);
    fs.writeFileSync(attributionPath, JSON.stringify(attribution, null, 2));

    console.log(`✅ Downloaded: ${filename} by ${photo.user.name}`);
  } catch (error) {
    console.error(`❌ Error downloading ${filename}:`, error.message);
  }
}

async function downloadAllImages() {
  console.log('🖼️  Starting hero image downloads...\n');

  for (const image of heroImages) {
    await downloadImage(image.query, image.filename, image.directory);
    // Wait a bit between requests to respect rate limits
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n✅ All hero images downloaded!');
}

downloadAllImages();
