// Script to download all images from Unsplash for About, Blog, and Contact pages
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || 'mcC1D3wGPUrzevXZxXKGs9-7KpzYY6vpjM3NwBOt-aA';

const imageCategories = {
  // About page images
  about: [
    { name: 'hero', query: 'african safari adventure travel sunset landscape', filename: 'hero.jpg' },
    { name: 'kenya', query: 'maasai mara kenya wildlife safari', filename: 'kenya.jpg' },
    { name: 'tanzania', query: 'serengeti tanzania wildebeest migration', filename: 'tanzania.jpg' },
    { name: 'south-africa', query: 'cape town south africa table mountain', filename: 'south-africa.jpg' },
    { name: 'morocco', query: 'marrakech morocco desert sahara', filename: 'morocco.jpg' },
    { name: 'seychelles', query: 'seychelles beach paradise tropical', filename: 'seychelles.jpg' },
    { name: 'egypt', query: 'egypt pyramids giza cairo ancient', filename: 'egypt.jpg' },
  ],
  
  // Blog post images
  blog: [
    { name: 'maasai-mara-safari', query: 'maasai mara safari lions wildlife kenya', filename: 'maasai-mara-safari.jpg' },
    { name: 'tanzania-guide', query: 'serengeti tanzania landscape sunset safari', filename: 'tanzania-guide.jpg' },
    { name: 'marrakech-travel', query: 'marrakech morocco souks market colorful', filename: 'marrakech-travel.jpg' },
    { name: 'cape-town-guide', query: 'cape town waterfront harbor south africa', filename: 'cape-town-guide.jpg' },
    { name: 'safari-photography', query: 'african wildlife photography elephant close-up', filename: 'safari-photography.jpg' },
    { name: 'seychelles-islands', query: 'seychelles beach crystal water tropical paradise', filename: 'seychelles-islands.jpg' },
    { name: 'african-culture', query: 'african culture tribal traditional dance', filename: 'african-culture.jpg' },
    { name: 'travel-tips', query: 'travel adventure backpack mountain landscape', filename: 'travel-tips.jpg' },
  ],
  
  // Contact page background
  contact: [
    { name: 'background', query: 'african landscape sunset mountains peaceful', filename: 'background.jpg' },
  ],
  
  // Hero images
  hero: [
    { name: 'main-hero', query: 'african safari adventure wild nature landscape', filename: 'main-hero.jpg' },
    { name: 'secondary', query: 'travel adventure exploring world nature', filename: 'secondary.jpg' },
  ],
};

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

async function fetchUnsplashImage(query) {
  return new Promise((resolve, reject) => {
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape&client_id=${ACCESS_KEY}`;
    
    https.get(url, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.results && json.results.length > 0) {
            resolve(json.results[0]);
          } else {
            reject(new Error('No images found'));
          }
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

async function downloadAllImages() {
  console.log('🌍 Starting comprehensive image download from Unsplash...\n');

  for (const [category, images] of Object.entries(imageCategories)) {
    console.log(`\n📂 Downloading ${category.toUpperCase()} images...`);
    
    const dirPath = path.join(__dirname, '..', 'public', 'images', category);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const attributions = [];

    for (const imageInfo of images) {
      try {
        console.log(`  📸 Fetching ${imageInfo.name}...`);
        const image = await fetchUnsplashImage(imageInfo.query);
        const imageUrl = image.urls.regular;
        const filepath = path.join(dirPath, imageInfo.filename);
        
        console.log(`  ↓ Downloading to ${imageInfo.filename}...`);
        await downloadImage(imageUrl, filepath);
        
        // Store attribution info
        attributions.push({
          filename: imageInfo.filename,
          name: imageInfo.name,
          query: imageInfo.query,
          photographer: image.user.name,
          photographer_url: image.user.links.html,
          unsplash_url: image.links.html,
          download_date: new Date().toISOString(),
        });
        
        console.log(`  ✅ Downloaded ${imageInfo.filename}`);
        
        // Add a small delay to respect API rate limits
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.error(`  ❌ Error downloading ${imageInfo.name}:`, error.message);
      }
    }

    // Save attribution file
    const attributionPath = path.join(dirPath, 'attribution.json');
    fs.writeFileSync(attributionPath, JSON.stringify(attributions, null, 2));
    console.log(`  📝 Saved attribution info to attribution.json`);
  }

  console.log('\n\n🎉 Image download complete!');
  console.log('\n📊 Summary:');
  console.log(`  - About page: ${imageCategories.about.length} images`);
  console.log(`  - Blog posts: ${imageCategories.blog.length} images`);
  console.log(`  - Contact page: ${imageCategories.contact.length} image`);
  console.log(`  - Hero images: ${imageCategories.hero.length} images`);
  console.log(`  - Total: ${Object.values(imageCategories).flat().length} images`);
  console.log('\n📁 Images saved to:');
  console.log('  - public/images/about/');
  console.log('  - public/images/blog/');
  console.log('  - public/images/contact/');
  console.log('  - public/images/hero/');
  console.log('\n⚠️  Remember to update image paths in your components!');
}

downloadAllImages().catch(console.error);
