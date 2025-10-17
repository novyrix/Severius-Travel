# Image Directory Structure

This directory contains all the images used throughout the Severius Travel website.

## Directory Structure

```
public/images/
├── tours/           # Tour-specific images
│   ├── mara/       # Maasai Mara safari images
│   ├── amboseli/   # Amboseli tour images
│   ├── serengeti/  # Serengeti tour images
│   ├── cape-town/  # Cape Town images
│   ├── paris/      # Paris tour images
│   └── bangkok/    # Bangkok tour images
├── destinations/    # Destination/country images
│   ├── kenya/
│   ├── tanzania/
│   ├── south-africa/
│   ├── france/
│   └── thailand/
└── hero/           # Hero section background images

```

## Image Guidelines

### Tour Images
- **Dimensions**: 1920x1080 (16:9 ratio)
- **Format**: WebP (with JPG fallback)
- **Size**: < 500KB
- **Naming**: descriptive-name-001.webp

### Destination Images
- **Dimensions**: 1200x800
- **Format**: WebP
- **Size**: < 300KB

### Hero Images
- **Dimensions**: 2560x1440
- **Format**: WebP
- **Size**: < 800KB

## Image Sources

Currently, the site uses Unsplash images via URLs. To use local images:

1. Download images and place them in the appropriate directory
2. Update the image URLs in `prisma/seed.ts`
3. Use relative paths: `/images/tours/mara/safari-001.webp`

## Optimizing Images

To optimize images for web:

```bash
# Using ImageMagick
convert input.jpg -quality 85 -resize 1920x1080 output.webp

# Using Sharp (Node.js)
npm install sharp
```

## Next.js Image Component

All images should use the Next.js `<Image>` component for automatic optimization:

```tsx
import Image from 'next/image';

<Image
  src="/images/tours/mara/safari-001.webp"
  alt="Maasai Mara Safari"
  width={1920}
  height={1080}
  priority={false}
/>
```

## TODO: Image Migration

- [ ] Download high-quality images for all tours
- [ ] Create destination collection images
- [ ] Add hero section images
- [ ] Update seed.ts to use local image paths
- [ ] Compress and optimize all images
- [ ] Test image loading performance
