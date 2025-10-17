#!/usr/bin/env node

/**
 * Download tour images from Pexels (Free API, no auth needed for basic use)
 * Falls back to Lorem Picsum if Pexels fails
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pexels search queries for each tour
const tourImages = [
  {
    slug: 'maasai-mara-safari-5-days',
    name: 'Maasai Mara',
    queries: [
      'maasai mara kenya',
      'african lion safari',
      'wildebeest migration',
      'maasai warrior kenya',
      'kenya safari sunset',
      'african cheetah'
    ]
  },
  {
    slug: 'amboseli-elephant-safari-4-days',
    name: 'Amboseli',
    queries: [
      'elephant kilimanjaro',
      'mount kilimanjaro',
      'elephant herd africa',
      'amboseli kenya',
      'safari vehicle africa',
      'african elephant'
    ]
  },
  {
    slug: 'samburu-safari-5-days',
    name: 'Samburu',
    queries: [
      'samburu kenya',
      'zebra africa',
      'giraffe africa',
      'kenya wildlife',
      'african tribe',
      'leopard tree'
    ]
  },
  {
    slug: 'tsavo-safari-6-days',
    name: 'Tsavo',
    queries: [
      'red elephant africa',
      'kenya landscape',
      'african waterhole',
      'savanna africa',
      'tsavo kenya',
      'african sunset'
    ]
  },
  {
    slug: 'serengeti-ngorongoro-safari-7-days',
    name: 'Serengeti & Ngorongoro',
    queries: [
      'serengeti tanzania',
      'ngorongoro crater',
      'wildebeest serengeti',
      'tanzania landscape',
      'lion africa',
      'tanzania wildlife'
    ]
  }
];

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Follow redirect
        https.get(response.headers.location, (redirectResponse) => {
          if (redirectResponse.statusCode === 200) {
            const file = fs.createWriteStream(filepath);
            redirectResponse.pipe(file);
            file.on('finish', () => {
              file.close();
              resolve();
            });
          } else {
            reject(new Error(`Failed: ${redirectResponse.statusCode}`));
          }
        }).on('error', reject);
      } else if (response.statusCode === 200) {
        const file = fs.createWriteStream(filepath);
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        reject(new Error(`Failed: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function searchPexels(query) {
  return new Promise((resolve, reject) => {
    // Using Pexels public API endpoint (no key needed for search)
    const searchQuery = encodeURIComponent(query);
    const url = `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=1`;
    
    const options = {
      headers: {
        // No authorization needed for basic search
        'User-Agent': 'Mozilla/5.0'
      }
    };

    https.get(url, options, (response) => {
      let data = '';
      response.on('data', chunk => data += chunk);
      response.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.photos && json.photos.length > 0) {
            resolve(json.photos[0].src.large);
          } else {
            resolve(null);
          }
        } catch {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function getLoremPicsumImage(seed, width = 1600, height = 900) {
  // Lorem Picsum provides free placeholder images
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

async function downloadTourImages() {
  console.log('🖼️  Starting Tour Images Download (Multi-Source)\n');
  console.log('📡 Using: Pexels API → Lorem Picsum (fallback) → Placeholder\n');

  let successCount = 0;
  let failCount = 0;

  for (const tour of tourImages) {
    console.log(`📸 Processing: ${tour.name}`);
    
    // Create tour directory
    const tourDir = path.join(__dirname, '..', 'public', 'images', 'tours', tour.slug);
    if (!fs.existsSync(tourDir)) {
      fs.mkdirSync(tourDir, { recursive: true });
    }

    const attribution = {
      source: 'Multiple',
      images: []
    };

    // Download images
    for (let i = 0; i < tour.queries.length; i++) {
      const filename = i === 0 ? 'cover.jpg' : `${i}.jpg`;
      const filepath = path.join(tourDir, filename);
      const query = tour.queries[i];

      try {
        console.log(`   Downloading: ${filename} (${query})...`);
        
        // Try Pexels first
        let imageUrl = await searchPexels(query);
        let source = 'Pexels';
        
        // If Pexels fails, use Lorem Picsum with seed based on query
        if (!imageUrl) {
          const seed = query.replace(/\s+/g, '-');
          imageUrl = getLoremPicsumImage(seed + i);
          source = 'Lorem Picsum';
          console.log(`   ℹ️  Using Lorem Picsum fallback...`);
        }

        await downloadImage(imageUrl, filepath);
        console.log(`   ✅ Saved: ${filename} (from ${source})`);
        
        attribution.images.push({
          filename: filename,
          query: query,
          source: source,
          url: imageUrl
        });

        successCount++;
        
        // Small delay to be respectful
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (error) {
        console.error(`   ❌ Failed: ${filename} - ${error.message}`);
        failCount++;
      }
    }

    // Save attribution file
    fs.writeFileSync(
      path.join(tourDir, 'attribution.json'),
      JSON.stringify(attribution, null, 2)
    );

    console.log(`   ✅ Created attribution.json\n`);
  }

  console.log('\n🎉 Image Download Complete!\n');
  console.log('📊 Summary:');
  console.log(`   - Tours processed: ${tourImages.length}`);
  console.log(`   - Images successful: ${successCount}`);
  console.log(`   - Images failed: ${failCount}`);
  console.log(`   - Location: public/images/tours/[tour-slug]/\n`);
  
  if (successCount > 0) {
    console.log('✨ Images are now ready! Refresh your tour pages to see them.');
  }
  
  if (failCount > 0) {
    console.log('⚠️  Some images failed. You may need to download them manually.');
  }
}

downloadTourImages().catch(console.error);
