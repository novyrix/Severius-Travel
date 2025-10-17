import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
  canonical?: string;
  noindex?: boolean;
  type?: 'website' | 'article' | 'product' | 'profile';
}

export function SEO({
  title = 'Severius Tours & Adventures - Explore Africa & Beyond',
  description = 'Discover extraordinary journeys across the globe with Severius Tours. Experience authentic adventures in Africa, Morocco, and exotic destinations worldwide.',
  image = '/images/og-default.jpg',
  article = false,
  publishedTime,
  modifiedTime,
  author,
  tags = [],
  canonical,
  noindex = false,
  type = 'website',
}: SEOProps) {
  const router = useRouter();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://severiustours.com';
  const currentUrl = canonical || `${siteUrl}${router.asPath}`;
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

  // Construct the full title with site name
  const fullTitle = title.includes('Severius') ? title : `${title} | Severius Tours`;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      {!noindex && <meta name="robots" content="index,follow" />}
      <meta name="googlebot" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />
      <meta name="bingbot" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />
      <link rel="canonical" href={currentUrl} />

      {/* Keywords */}
      {tags.length > 0 && <meta name="keywords" content={tags.join(', ')} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? 'article' : type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="Severius Tours & Adventures" />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific tags */}
      {article && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {article && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {article && author && (
        <meta property="article:author" content={author} />
      )}
      {article && tags.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:creator" content="@severiustours" />
      <meta name="twitter:site" content="@severiustours" />

      {/* Additional Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#8B4513" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Alternate Languages */}
      <link rel="alternate" hrefLang="en" href={currentUrl} />
      <link rel="alternate" hrefLang="es" href={`${siteUrl}/es${router.asPath}`} />
      <link rel="alternate" hrefLang="fr" href={`${siteUrl}/fr${router.asPath}`} />
      <link rel="alternate" hrefLang="x-default" href={currentUrl} />
    </Head>
  );
}
