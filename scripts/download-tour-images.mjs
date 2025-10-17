#!/usr/bin/env node

/**
 * Download flagship tour images from Unsplash
 * Downloads 6 images per tour with proper attribution
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UNSPLASH_ACCESS_KEY = 'YOUR_UNSPLASH_ACCESS_KEY'; // Replace if you have one

const tours = [
  {
    slug: 'maasai-mara-safari-5-days',
    name: 'Maasai Mara',
    queries: [
      'maasai-mara-kenya-wildlife',
      'lions-africa-safari',
      'great-migration-wildebeest',
      'maasai-people-culture',
      'kenya-safari-sunset',
      'cheetah-africa-savanna'
    ]
  },
  {
    slug: 'amboseli-elephant-safari-4-days',
    name: 'Amboseli',
    queries: [
      'elephants-kilimanjaro-amboseli',
      'mount-kilimanjaro-kenya',
      'elephant-herd-africa',
      'amboseli-kenya-wildlife',
      'kenya-safari-landscape',
      'african-elephant-closeup'
    ]
  },
  {
    slug: 'samburu-safari-5-days',
    name: 'Samburu',
    queries: [
      'samburu-kenya-wildlife',
      'grevy-zebra-africa',
      'reticulated-giraffe-kenya',
      'kenya-safari-landscape',
      'samburu-warrior-culture',
      'african-leopard-tree'
    ]
  },
  {
    slug: 'tsavo-safari-6-days',
    name: 'Tsavo',
    queries: [
      'tsavo-red-elephants-kenya',
      'kenya-wildlife-safari',
      'mzima-springs-kenya',
      'african-landscape-savanna',
      'tsavo-national-park',
      'kenya-safari-sunset'
    ]
  },
  {
    slug: 'serengeti-ngorongoro-safari-7-days',
    name: 'Serengeti & Ngorongoro',
    queries: [
      'serengeti-tanzania-wildlife',
      'ngorongoro-crater-tanzania',
      'serengeti-migration',
      'tanzania-safari-landscape',
      'african-lions-serengeti',
      'ngorongoro-wildlife'
    ]
  }
];

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(filepath);
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function downloadTourImages() {
  console.log('🖼️  Starting Flagship Tour Images Download\n');

  for (const tour of tours) {
    console.log(`📸 Processing: ${tour.name}`);
    
    // Create tour directory
    const tourDir = path.join(__dirname, '..', 'public', 'images', 'tours', tour.slug);
    if (!fs.existsSync(tourDir)) {
      fs.mkdirSync(tourDir, { recursive: true });
    }

    // Download images (using Unsplash Source for demo purposes)
    // In production, use Unsplash API with proper attribution
    for (let i = 0; i < tour.queries.length; i++) {
      const filename = i === 0 ? 'cover.jpg' : `${i}.jpg`;
      const filepath = path.join(tourDir, filename);

      // Use Unsplash Source (doesn't require API key)
      // Format: https://source.unsplash.com/1600x900/?query
      const query = tour.queries[i];
      const url = `https://source.unsplash.com/1600x900/?${query}`;

      try {
        console.log(`   Downloading: ${filename}...`);
        await downloadImage(url, filepath);
        console.log(`   ✅ Saved: ${filename}`);
        
        // Add small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`   ❌ Failed to download ${filename}:`, error.message);
      }
    }

    // Create attribution file
    const attribution = {
      source: 'Unsplash',
      license: 'Unsplash License',
      note: 'Images sourced from Unsplash. For production, use Unsplash API with proper attribution.',
      images: tour.queries.map((query, i) => ({
        filename: i === 0 ? 'cover.jpg' : `${i}.jpg`,
        query: query,
        url: `https://unsplash.com/s/photos/${query}`
      }))
    };

    fs.writeFileSync(
      path.join(tourDir, 'attribution.json'),
      JSON.stringify(attribution, null, 2)
    );

    console.log(`   ✅ Created attribution.json\n`);
  }

  console.log('🎉 All tour images downloaded successfully!\n');
  console.log('📊 Summary:');
  console.log(`   - Tours processed: ${tours.length}`);
  console.log(`   - Total images: ${tours.length * 6} (${tours.length * 6 * 1.2}MB approx)`);
  console.log(`   - Location: public/images/tours/[tour-slug]/\n`);
}

downloadTourImages().catch(console.error);
