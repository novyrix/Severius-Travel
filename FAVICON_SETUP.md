# Favicon Setup Documentation

## Current Status

The favicon system has been configured to use the uploaded logo files from `/public/images/logo/`.

### Logo Files Available
- `/public/images/logo/portrait.png` - Vertical orientation logo
- `/public/images/logo/landscape.png` - Horizontal orientation logo

### Favicon Configuration

The following favicon sizes are configured in the app metadata:

1. **favicon-16x16.png** (16x16px) - Browser tab icon
2. **favicon-32x32.png** (32x32px) - Browser tab icon (HD displays)
3. **apple-touch-icon.png** (180x180px) - iOS home screen icon
4. **android-chrome-192x192.png** (192x192px) - Android home screen icon
5. **android-chrome-512x512.png** (512x512px) - Android splash screen
6. **favicon.ico** - Legacy browsers

### Required Action

**The favicon image files need to be generated from the portrait logo.**

You can use online tools like:
- https://realfavicongenerator.net/
- https://favicon.io/

#### Steps:
1. Upload `/public/images/logo/portrait.png` to a favicon generator
2. Download the generated favicon package
3. Extract files to `/public/` directory:
   - favicon-16x16.png
   - favicon-32x32.png
   - apple-touch-icon.png
   - android-chrome-192x192.png
   - android-chrome-512x512.png
   - favicon.ico

4. Verify the files are accessible at:
   - https://severiusadventuresandtravel.com/favicon-16x16.png
   - https://severiusadventuresandtravel.com/apple-touch-icon.png
   - etc.

### Metadata Configuration

The favicons are already configured in `/src/app/layout.tsx`:

```typescript
icons: {
  icon: [
    { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
  ],
  apple: [
    { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
  ],
  other: [
    { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
    { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
  ],
},
```

### Web App Manifest

The `/public/site.webmanifest` has been updated to reference the portrait logo for PWA installation.

### SEO Benefits

Proper favicons provide:
- Professional brand appearance in browser tabs
- Recognizable identity in bookmarks
- Home screen icon for mobile users
- Enhanced trust and credibility
- Consistent branding across all platforms

---

**Note:** Once favicon files are generated and placed in the public directory, the setup will be complete. The system is already configured to use them correctly.
