import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PEXELS_API_KEY = 'vnZgamgHapTMAz9GER6i0Dcm8hOwrVCTG9TAix1dxaxNAKuhUWaoOHnI';

// Failed/problematic images to re-download
const failedImages = [
  {
    tour: 'tsavo-safari-6-days',
    file: '2.jpg',
    query: 'african waterhole elephants'
  },
  {
    tour: 'serengeti-ngorongoro-safari-7-days',
    file: '2.jpg',
    query: 'ngorongoro crater tanzania'
  },
  {
    tour: 'serengeti-ngorongoro-safari-7-days',
    file: '3.jpg',
    query: 'wildebeest migration serengeti'
  },
  {
    tour: 'serengeti-ngorongoro-safari-7-days',
    file: 'cover.jpg',
    query: 'serengeti national park sunset'
  }
];

async function searchPexels(query) {
  return new Promise((resolve, reject) => {
    const searchUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`;
    
    https.get(searchUrl, {
      headers: { 'Authorization': PEXELS_API_KEY }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      // Follow redirects
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadImage(res.headers.location, filepath)
          .then(resolve)
          .catch(reject);
      }
      
      if (res.statusCode !== 200) {
        reject(new Error(`Status: ${res.statusCode}`));
        return;
      }
      
      const fileStream = fs.createWriteStream(filepath);
      res.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
      
      fileStream.on('error', reject);
    }).on('error', reject);
  });
}

async function redownloadFailed() {
  console.log('🔄 Re-downloading failed images...\n');
  
  for (const item of failedImages) {
    try {
      console.log(`📸 ${item.tour} - ${item.file}`);
      console.log(`   Searching: "${item.query}"`);
      
      const result = await searchPexels(item.query);
      
      if (!result.photos || result.photos.length === 0) {
        console.log(`   ❌ No results found\n`);
        continue;
      }
      
      const photo = result.photos[0];
      const imageUrl = photo.src.large2x;
      const photographer = photo.photographer;
      
      const tourDir = path.join(__dirname, '..', 'public', 'images', 'tours', item.tour);
      const filepath = path.join(tourDir, item.file);
      
      await downloadImage(imageUrl, filepath);
      
      // Get file size to verify
      const stats = await fsp.stat(filepath);
      const sizeKB = Math.round(stats.size / 1024);
      
      console.log(`   ✅ Downloaded (${sizeKB}KB) by ${photographer}\n`);
      
      // Update attribution file
      const attrPath = path.join(tourDir, 'attribution.json');
      let attribution = { photos: {} };
      
      try {
        const existing = await fsp.readFile(attrPath, 'utf-8');
        attribution = JSON.parse(existing);
      } catch (e) {
        // File doesn't exist or is invalid
      }
      
      attribution.photos[item.file] = {
        photographer,
        url: photo.url,
        query: item.query
      };
      
      await fsp.writeFile(attrPath, JSON.stringify(attribution, null, 2));
      
      // Rate limit
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}\n`);
    }
  }
  
  console.log('✅ Re-download complete!');
}

redownloadFailed().catch(console.error);
