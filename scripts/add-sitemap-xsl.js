const fs = require('fs');
const path = require('path');

// Path to the generated sitemap
const sitemapPath = path.join(__dirname, '../public/sitemap.xml');

// Read the sitemap file
let sitemap = fs.readFileSync(sitemapPath, 'utf8');

// Check if XSL stylesheet reference already exists
if (!sitemap.includes('xml-stylesheet')) {
  // Add XSL stylesheet reference after XML declaration
  sitemap = sitemap.replace(
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>'
  );

  // Write the modified sitemap back
  fs.writeFileSync(sitemapPath, sitemap, 'utf8');
  console.log('✅ Added XSL stylesheet reference to sitemap.xml');
} else {
  console.log('ℹ️  XSL stylesheet reference already exists in sitemap.xml');
}
