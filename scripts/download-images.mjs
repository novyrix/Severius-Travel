// Script to download images from Unsplash
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || 'mcC1D3wGPUrzevXZxXKGs9-7KpzYY6vpjM3NwBOt-aA';

const tours = [
  {
    name: 'maasai-mara',
    query: 'maasai mara safari wildlife',
    count: 3,
  },
  {
    name: 'amboseli',
    query: 'amboseli kilimanjaro elephant',
    count: 3,
  },
  {
    name: 'serengeti',
    query: 'serengeti tanzania safari',
    count: 3,
  },
  {
    name: 'cape-town',
    query: 'cape town table mountain',
    count: 3,
  },
  {
    name: 'paris',
    query: 'paris eiffel tower city',
    count: 3,
  },
  {
    name: 'bangkok',
    query: 'bangkok temple thailand',
    count: 3,
  },
];

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function fetchUnsplashImages(query, count) {
  return new Promise((resolve, reject) => {
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape&client_id=${ACCESS_KEY}`;
    
    https.get(url, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.results);
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

async function downloadTourImages() {
  console.log('🌍 Starting image download from Unsplash...\n');

  for (const tour of tours) {
    console.log(`📸 Fetching images for ${tour.name}...`);
    
    const dirPath = path.join(__dirname, '..', 'public', 'images', 'tours', tour.name);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    try {
      const images = await fetchUnsplashImages(tour.query, tour.count);
      
      for (let i = 0; i < images.length && i < tour.count; i++) {
        const image = images[i];
        const imageUrl = image.urls.regular;
        const filepath = path.join(dirPath, `${i + 1}.jpg`);
        
        console.log(`  ↓ Downloading image ${i + 1}/${tour.count}...`);
        await downloadImage(imageUrl, filepath);
        
        // Add attribution info
        const attributionPath = path.join(dirPath, 'attribution.json');
        const attributions = fs.existsSync(attributionPath)
          ? JSON.parse(fs.readFileSync(attributionPath, 'utf-8'))
          : [];
        
        attributions.push({
          filename: `${i + 1}.jpg`,
          photographer: image.user.name,
          photographer_url: image.user.links.html,
          unsplash_url: image.links.html,
        });
        
        fs.writeFileSync(attributionPath, JSON.stringify(attributions, null, 2));
      }
      
      console.log(`  ✅ Downloaded ${tour.count} images for ${tour.name}\n`);
    } catch (error) {
      console.error(`  ❌ Error downloading images for ${tour.name}:`, error.message, '\n');
    }
  }

  console.log('🎉 Image download complete!');
}

downloadTourImages().catch(console.error);
