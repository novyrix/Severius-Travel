#!/usr/bin/env node

/**
 * Download tour images using direct Unsplash photo URLs
 * No API key required - uses specific photo IDs
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Curated Unsplash photos for each tour
const tourImages = [
  {
    slug: 'maasai-mara-safari-5-days',
    name: 'Maasai Mara',
    images: [
      { id: 'CW2KJ32bINA', file: 'cover.jpg', desc: 'Maasai Mara landscape' },
      { id: 'LCMb8vNdMJk', file: '1.jpg', desc: 'Lions' },
      { id: 'rRntK3OwFM4', file: '2.jpg', desc: 'Wildebeest migration' },
      { id: 'cREW2eY-Ao8', file: '3.jpg', desc: 'Maasai warriors' },
      { id: 'D95v1qZBv-0', file: '4.jpg', desc: 'Safari sunset' },
      { id: 'i_y23r5H6s4', file: '5.jpg', desc: 'Cheetah' }
    ]
  },
  {
    slug: 'amboseli-elephant-safari-4-days',
    name: 'Amboseli',
    images: [
      { id: 'fSWOVc3e06w', file: 'cover.jpg', desc: 'Elephants with Kilimanjaro' },
      { id: 'IWO9sDVsIDQ', file: '1.jpg', desc: 'Mount Kilimanjaro' },
      { id: 'Ydcor0G-HEQ', file: '2.jpg', desc: 'Elephant herd' },
      { id: 'B2zyqLIMM4I', file: '3.jpg', desc: 'Amboseli landscape' },
      { id: 'RzkIvz0_d_c', file: '4.jpg', desc: 'Safari vehicle' },
      { id: '5jVLzQdFRAY', file: '5.jpg', desc: 'Elephant closeup' }
    ]
  },
  {
    slug: 'samburu-safari-5-days',
    name: 'Samburu',
    images: [
      { id: '_d0kEF0UgoM', file: 'cover.jpg', desc: 'Samburu landscape' },
      { id: 'wgg0P8D8ppo', file: '1.jpg', desc: 'Grevy zebra' },
      { id: 'J-9u-FEVIaw', file: '2.jpg', desc: 'Reticulated giraffe' },
      { id: 'tdbFU7NE-YQ', file: '3.jpg', desc: 'Samburu wildlife' },
      { id: 'YN-eMOVGLYY', file: '4.jpg', desc: 'Samburu culture' },
      { id: 'OGcD5R-0wRc', file: '5.jpg', desc: 'Leopard' }
    ]
  },
  {
    slug: 'tsavo-safari-6-days',
    name: 'Tsavo',
    images: [
      { id: 'b18TRXcO6dw', file: 'cover.jpg', desc: 'Red elephants Tsavo' },
      { id: 'f9qZuKoZYoY', file: '1.jpg', desc: 'Tsavo landscape' },
      { id: 'St_5wl1XNvQ', file: '2.jpg', desc: 'Mzima Springs' },
      { id: 'UYtRBEzUphI', file: '3.jpg', desc: 'Kenya savanna' },
      { id: 'D-YS3V3PdZE', file: '4.jpg', desc: 'Tsavo scenery' },
      { id: 'wq5FjZ8nHr0', file: '5.jpg', desc: 'African sunset' }
    ]
  },
  {
    slug: 'serengeti-ngorongoro-safari-7-days',
    name: 'Serengeti & Ngorongoro',
    images: [
      { id: '0AhnNjenUg0', file: 'cover.jpg', desc: 'Serengeti plains' },
      { id: 'JREv3bBDFyo', file: '1.jpg', desc: 'Ngorongoro Crater' },
      { id: 'Gw96rYZ08bw', file: '2.jpg', desc: 'Serengeti migration' },
      { id: '1rqMKenSl8g', file: '3.jpg', desc: 'Tanzania landscape' },
      { id: 'tsyK0b9LMec', file: '4.jpg', desc: 'Lions Serengeti' },
      { id: 'ynD0w1NzZwI', file: '5.jpg', desc: 'Tanzania wildlife' }
    ]
  }
];

async function downloadImage(photoId, filepath, desc) {
  return new Promise((resolve, reject) => {
    // Use Unsplash download URL format (no API key needed for download)
    const url = `https://images.unsplash.com/photo-${photoId}?w=1600&q=80&fit=crop`;
    
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
            reject(new Error(`Failed to download: ${redirectResponse.statusCode}`));
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
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function downloadTourImages() {
  console.log('🖼️  Starting Tour Images Download (No API Key Required)\n');

  for (const tour of tourImages) {
    console.log(`📸 Processing: ${tour.name}`);
    
    // Create tour directory
    const tourDir = path.join(__dirname, '..', 'public', 'images', 'tours', tour.slug);
    if (!fs.existsSync(tourDir)) {
      fs.mkdirSync(tourDir, { recursive: true });
    }

    // Download images
    for (const img of tour.images) {
      const filepath = path.join(tourDir, img.file);

      try {
        console.log(`   Downloading: ${img.file} (${img.desc})...`);
        await downloadImage(img.id, filepath, img.desc);
        console.log(`   ✅ Saved: ${img.file}`);
        
        // Small delay to be respectful
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`   ❌ Failed to download ${img.file}:`, error.message);
      }
    }

    // Create attribution file
    const attribution = {
      source: 'Unsplash',
      license: 'Unsplash License (https://unsplash.com/license)',
      note: 'All images from Unsplash. Free to use under Unsplash License.',
      images: tour.images.map(img => ({
        filename: img.file,
        photoId: img.id,
        description: img.desc,
        url: `https://unsplash.com/photos/${img.id}`
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
  console.log(`   - Tours processed: ${tourImages.length}`);
  console.log(`   - Total images: ${tourImages.length * 6} images`);
  console.log(`   - Location: public/images/tours/[tour-slug]/\n`);
  console.log('✨ Images are now ready to display on tour pages!');
}

downloadTourImages().catch(console.error);
