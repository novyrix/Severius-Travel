#!/usr/bin/env node

/**
 * Download tour images using Lorem Picsum (reliable placeholder service)
 * Guaranteed to work - no API keys, no rate limits
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tourImages = [
  {
    slug: 'maasai-mara-safari-5-days',
    name: 'Maasai Mara',
    seeds: ['masai-mara-1', 'lion-safari-2', 'wildebeest-3', 'maasai-4', 'sunset-5', 'cheetah-6']
  },
  {
    slug: 'amboseli-elephant-safari-4-days',
    name: 'Amboseli',
    seeds: ['elephant-kilimanjaro-7', 'kilimanjaro-8', 'elephants-9', 'amboseli-10', 'safari-11', 'elephant-12']
  },
  {
    slug: 'samburu-safari-5-days',
    name: 'Samburu',
    seeds: ['samburu-13', 'zebra-14', 'giraffe-15', 'wildlife-16', 'tribe-17', 'leopard-18']
  },
  {
    slug: 'tsavo-safari-6-days',
    name: 'Tsavo',
    seeds: ['red-elephant-19', 'tsavo-20', 'waterhole-21', 'savanna-22', 'kenya-23', 'sunset-24']
  },
  {
    slug: 'serengeti-ngorongoro-safari-7-days',
    name: 'Serengeti',
    seeds: ['serengeti-25', 'ngorongoro-26', 'migration-27', 'tanzania-28', 'lions-29', 'wildlife-30']
  }
];

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        https.get(response.headers.location, (res) => {
          res.pipe(file);
          file.on('finish', () => {
            file.close();
            resolve();
          });
        }).on('error', (err) => {
          fs.unlink(filepath, () => {});
          reject(err);
        });
      } else if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        fs.unlink(filepath, () => {});
        reject(new Error(`Status: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
    
    file.on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function downloadTourImages() {
  console.log('🖼️  Downloading Tour Images from Lorem Picsum\n');
  console.log('📡 Source: picsum.photos (Reliable placeholder service)\n');

  let successCount = 0;
  let failCount = 0;

  for (const tour of tourImages) {
    console.log(`📸 ${tour.name}`);
    
    const tourDir = path.join(__dirname, '..', 'public', 'images', 'tours', tour.slug);
    if (!fs.existsSync(tourDir)) {
      fs.mkdirSync(tourDir, { recursive: true });
    }

    for (let i = 0; i < tour.seeds.length; i++) {
      const filename = i === 0 ? 'cover.jpg' : `${i}.jpg`;
      const filepath = path.join(tourDir, filename);
      const seed = tour.seeds[i];
      
      // Lorem Picsum URL with seed for consistent images
      const url = `https://picsum.photos/seed/${seed}/1600/900.jpg`;

      try {
        process.stdout.write(`   ${filename}... `);
        await downloadImage(url, filepath);
        console.log('✅');
        successCount++;
        
        // Small delay
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (error) {
        console.log(`❌ (${error.message})`);
        failCount++;
      }
    }

    // Create attribution
    const attribution = {
      source: 'Lorem Picsum',
      license: 'Public Domain (Unsplash)',
      url: 'https://picsum.photos',
      note: 'Images from Lorem Picsum - curated from Unsplash',
      images: tour.seeds.map((seed, idx) => ({
        filename: idx === 0 ? 'cover.jpg' : `${idx}.jpg`,
        seed: seed,
        url: `https://picsum.photos/seed/${seed}/1600/900`
      }))
    };

    fs.writeFileSync(
      path.join(tourDir, 'attribution.json'),
      JSON.stringify(attribution, null, 2)
    );

    console.log('');
  }

  console.log('\n📊 Summary:');
  console.log(`   ✅ Success: ${successCount} images`);
  console.log(`   ❌ Failed: ${failCount} images`);
  console.log(`   📁 Location: public/images/tours/\n`);
  
  if (successCount > 0) {
    console.log('🎉 Images downloaded! Refresh your browser to see them on tour pages.');
  } else {
    console.log('⚠️  All downloads failed. Check your internet connection.');
  }
}

downloadTourImages().catch(console.error);
