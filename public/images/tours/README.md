# Tour Images - Manual Download Instructions

## Status: Placeholder Images Created ⚠️

Unsplash Source API is unavailable (503 errors). You'll need to manually download images or use the Unsplash API.

## Recommended Images for Each Tour

### 1. Maasai Mara (5-Day Safari)
**Folder:** `public/images/tours/maasai-mara-safari-5-days/`

Download 6 high-quality images:
- `cover.jpg` - Wide shot of Maasai Mara plains with wildlife
- `1.jpg` - Lions or Big Five
- `2.jpg` - Great Migration (wildebeest crossing)
- `3.jpg` - Maasai people/culture
- `4.jpg` - Safari sunset/landscape
- `5.jpg` - Cheetah or leopard

**Search terms:** "Maasai Mara safari", "Kenya wildlife", "Great Migration", "African lions"

### 2. Amboseli (4-Day Elephant Safari)
**Folder:** `public/images/tours/amboseli-elephant-safari-4-days/`

Download 6 high-quality images:
- `cover.jpg` - Elephants with Kilimanjaro in background
- `1.jpg` - Mount Kilimanjaro view
- `2.jpg` - Elephant herd
- `3.jpg` - Amboseli landscape
- `4.jpg` - Safari vehicle/wildlife viewing
- `5.jpg` - Elephant closeup

**Search terms:** "Amboseli elephants", "Mount Kilimanjaro Kenya", "elephant herd Africa"

### 3. Samburu (5-Day Safari)
**Folder:** `public/images/tours/samburu-safari-5-days/`

Download 6 high-quality images:
- `cover.jpg` - Samburu landscape with wildlife
- `1.jpg` - Grevy's zebra (Samburu Special Five)
- `2.jpg` - Reticulated giraffe
- `3.jpg` - Samburu National Reserve landscape
- `4.jpg` - Samburu warrior/culture
- `5.jpg` - Leopard in tree

**Search terms:** "Samburu Kenya", "Grevy zebra", "reticulated giraffe", "Samburu wildlife"

### 4. Tsavo (6-Day Safari)
**Folder:** `public/images/tours/tsavo-safari-6-days/`

Download 6 high-quality images:
- `cover.jpg` - Red elephants of Tsavo
- `1.jpg` - Tsavo landscape/red soil
- `2.jpg` - Mzima Springs
- `3.jpg` - African savanna wildlife
- `4.jpg` - Tsavo National Park scenery
- `5.jpg` - Safari sunset

**Search terms:** "Tsavo red elephants", "Mzima Springs", "Tsavo National Park", "Kenya safari"

### 5. Serengeti & Ngorongoro (7-Day Safari)
**Folder:** `public/images/tours/serengeti-ngorongoro-safari-7-days/`

Download 6 high-quality images:
- `cover.jpg` - Serengeti plains with migration
- `1.jpg` - Ngorongoro Crater aerial/panoramic
- `2.jpg` - Serengeti migration wildebeest
- `3.jpg` - Tanzania safari landscape
- `4.jpg` - Lions in Serengeti
- `5.jpg` - Ngorongoro wildlife

**Search terms:** "Serengeti Tanzania", "Ngorongoro Crater", "Serengeti migration", "Tanzania wildlife"

## Recommended Image Sources

### 1. Unsplash (Free, High Quality)
- Website: https://unsplash.com
- License: Free for commercial use
- Collections: Search for "African safari", "Kenya wildlife", "Tanzania safari"
- **Remember to download attribution info!**

### 2. Pexels (Free, High Quality)
- Website: https://www.pexels.com
- License: Free for commercial use
- Good safari and wildlife collection

### 3. Pixabay (Free)
- Website: https://pixabay.com
- License: Free for commercial use
- Decent wildlife selection

## Using Unsplash API (Recommended for Production)

Create `.env.local` and add:
```
UNSPLASH_ACCESS_KEY=your_access_key_here
```

Get API key from: https://unsplash.com/developers

Then modify the download script to use the official API with proper attribution.

## Image Specifications

- **Format:** JPG
- **Dimensions:** 1600x900px minimum (16:9 aspect ratio)
- **Size:** 200-500KB per image (optimized)
- **Quality:** High resolution for tourism website
- **Content:** Professional wildlife/landscape photography

## Placeholder Structure Created

All tour folders have been created with attribution.json files:
```
public/images/tours/
├── maasai-mara-safari-5-days/
│   └── attribution.json
├── amboseli-elephant-safari-4-days/
│   └── attribution.json
├── samburu-safari-5-days/
│   └── attribution.json
├── tsavo-safari-6-days/
│   └── attribution.json
└── serengeti-ngorongoro-safari-7-days/
    └── attribution.json
```

## Next Steps

1. Download 30 images manually (6 per tour) from Unsplash/Pexels
2. Name them according to folder structure above
3. Update attribution.json with photographer credits
4. Optimize images if needed (use tools like TinyPNG)
5. Verify images display correctly on tour pages

## Quick Download Script (if you have wget)

```bash
# Example for Maasai Mara
cd public/images/tours/maasai-mara-safari-5-days/
# Then manually download and save as cover.jpg, 1.jpg, etc.
```

For now, the tour pages will show placeholder images or broken image icons until real images are added.
