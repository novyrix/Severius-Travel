#!/usr/bin/env node

/**
 * Download tour images from Pexels API
 * Using authenticated API for high-quality safari images
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PEXELS_API_KEY = 'vnZgamgHapTMAz9GER6i0Dcm8hOwrVCTG9TAix1dxaxNAKuhUWaoOHnI';

const tourImages = [
  {
    slug: 'maasai-mara-safari-5-days',
    name: 'Maasai Mara',
    queries: [
      'maasai mara kenya wildlife',
      'african lion pride',
      'wildebeest migration',
      'maasai warriors',
      'kenya safari sunset',
      'african cheetah hunting'
    ]
  },
  {
    slug: 'amboseli-elephant-safari-4-days',
    name: 'Amboseli',
    queries: [
      'elephant mount kilimanjaro',
      'kilimanjaro mountain',
      'elephant herd africa',
      'amboseli national park',
      'safari jeep africa',
      'african elephant close up'
    ]
  },
  {
    slug: 'samburu-safari-5-days',
    name: 'Samburu',
    queries: [
      'samburu kenya landscape',
      'grevy zebra',
      'reticulated giraffe',
      'kenya savanna wildlife',
      'african tribal people',
      'leopard in tree'
    ]
  },
  {
    slug: 'tsavo-safari-6-days',
    name: 'Tsavo',
    queries: [
      'red elephants kenya',
      'tsavo landscape',
      'african waterhole',
      'kenya savanna',
      'acacia tree sunset',
      'african wildlife sunset'
    ]
  },
  {
    slug: 'serengeti-ngorongoro-safari-7-days',
    name: 'Serengeti',
    queries: [
      'serengeti national park',
      'ngorongoro crater',
      'wildebeest serengeti',
      'tanzania landscape',
      'serengeti lions',
      'tanzania wildlife safari'
    ]
  }
];

function searchPexels(query) {
  return new Promise((resolve, reject) => {
    const searchQuery = encodeURIComponent(query);
    const options = {
      hostname: 'api.pexels.com',
      path: `/v1/search?query=${searchQuery}&per_page=1&orientation=landscape`,
      headers: {
        'Authorization': PEXELS_API_KEY
      }
    };

    https.get(options, (response) => {
      let data = '';
      response.on('data', chunk => data += chunk);
      response.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.photos && json.photos.length > 0) {
            resolve({
              url: json.photos[0].src.large2x,
              photographer: json.photos[0].photographer,
              photo_url: json.photos[0].url
            });
          } else {
            resolve(null);
          }
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
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
        reject(new Error(`HTTP ${response.statusCode}`));
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
  console.log('🖼️  Downloading Safari Images from Pexels\n');
  console.log('📡 Using Pexels API with authentication\n');

  let successCount = 0;
  let failCount = 0;
  const allAttribution = [];

  for (const tour of tourImages) {
    console.log(`📸 ${tour.name}`);
    
    const tourDir = path.join(__dirname, '..', 'public', 'images', 'tours', tour.slug);
    if (!fs.existsSync(tourDir)) {
      fs.mkdirSync(tourDir, { recursive: true });
    }

    const tourAttribution = {
      source: 'Pexels',
      license: 'Pexels License (Free to use)',
      url: 'https://www.pexels.com',
      images: []
    };

    for (let i = 0; i < tour.queries.length; i++) {
      const filename = i === 0 ? 'cover.jpg' : `${i}.jpg`;
      const filepath = path.join(tourDir, filename);
      const query = tour.queries[i];

      try {
        process.stdout.write(`   ${filename} (${query})... `);
        
        // Search Pexels
        const photo = await searchPexels(query);
        
        if (photo) {
          // Download image
          await downloadImage(photo.url, filepath);
          console.log(`✅ (by ${photo.photographer})`);
          
          tourAttribution.images.push({
            filename: filename,
            query: query,
            photographer: photo.photographer,
            photo_url: photo.photo_url
          });
          
          successCount++;
        } else {
          console.log('❌ (no results)');
          failCount++;
        }
        
        // Rate limiting - Pexels allows 200 requests/hour
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (error) {
        console.log(`❌ (${error.message})`);
        failCount++;
      }
    }

    // Save attribution
    fs.writeFileSync(
      path.join(tourDir, 'attribution.json'),
      JSON.stringify(tourAttribution, null, 2)
    );

    allAttribution.push(tourAttribution);
    console.log('');
  }

  console.log('\n📊 Download Summary:');
  console.log(`   ✅ Success: ${successCount} images`);
  console.log(`   ❌ Failed: ${failCount} images`);
  console.log(`   📁 Location: public/images/tours/\n`);
  
  if (successCount > 0) {
    console.log('🎉 SUCCESS! High-quality safari images downloaded!');
    console.log('✨ Refresh your browser to see them on tour pages.\n');
    console.log('📝 Photo credits saved in attribution.json files');
    console.log('   (Required by Pexels License - keep these files)\n');
  }
  
  if (failCount > 0) {
    console.log(`⚠️  ${failCount} images failed to download.`);
    console.log('   You may need to run the script again or download manually.\n');
  }

  // Save master attribution file
  fs.writeFileSync(
    path.join(__dirname, '..', 'public', 'images', 'tours', 'ATTRIBUTION.md'),
    `# Photo Attribution\n\nAll images sourced from Pexels (https://www.pexels.com)\n\n` +
    `License: Pexels License - Free to use, no attribution required but appreciated.\n\n` +
    `## Photographers\n\n` +
    allAttribution.flatMap(tour => 
      tour.images.map(img => 
        `- **${img.filename}** in ${tour.source}: Photo by ${img.photographer} (${img.photo_url})`
      )
    ).join('\n')
  );

  console.log('📄 Master attribution file created: public/images/tours/ATTRIBUTION.md');
}

downloadTourImages().catch(error => {
  console.error('\n❌ Error:', error.message);
  process.exit(1);
});
