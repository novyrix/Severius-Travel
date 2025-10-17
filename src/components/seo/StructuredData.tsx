import Head from 'next/head';

interface OrganizationSchemaProps {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  socialLinks?: string[];
}

export function OrganizationSchema({
  name = 'Severius Tours & Adventures',
  url = process.env.NEXT_PUBLIC_SITE_URL || 'https://severiustours.com',
  logo = '/images/logo.png',
  description = 'Premier travel and adventure company specializing in African safaris, Moroccan tours, and exotic destinations worldwide.',
  contactEmail = 'info@severiustours.com',
  contactPhone = '+1-234-567-8900',
  address,
  socialLinks = [
    'https://www.facebook.com/severiustours',
    'https://www.instagram.com/severiustours',
    'https://www.twitter.com/severiustours',
  ],
}: OrganizationSchemaProps = {}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name,
    url,
    logo: {
      '@type': 'ImageObject',
      url: logo.startsWith('http') ? logo : `${url}${logo}`,
    },
    description,
    email: contactEmail,
    telephone: contactPhone,
    ...(address && {
      address: {
        '@type': 'PostalAddress',
        ...address,
      },
    }),
    sameAs: socialLinks,
    priceRange: '$$-$$$',
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
}

interface TourSchemaProps {
  name: string;
  description: string;
  image: string;
  price: number;
  currency?: string;
  duration: number;
  location: string;
  country: string;
  operator?: string;
  url: string;
  rating?: number;
  reviewCount?: number;
  availability?: string;
}

export function TourSchema({
  name,
  description,
  image,
  price,
  currency = 'USD',
  duration,
  location,
  country,
  operator = 'Severius Tours & Adventures',
  url: tourUrl,
  rating,
  reviewCount,
  availability = 'InStock',
}: TourSchemaProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://severiustours.com';
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;
  const fullTourUrl = tourUrl.startsWith('http') ? tourUrl : `${siteUrl}${tourUrl}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name,
    description,
    image: fullImageUrl,
    touristType: 'Adventure Traveler',
    itinerary: {
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'City',
          name: location,
          address: {
            '@type': 'PostalAddress',
            addressCountry: country,
          },
        },
      ],
    },
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: currency,
      availability: `https://schema.org/${availability}`,
      url: fullTourUrl,
      validFrom: new Date().toISOString(),
    },
    provider: {
      '@type': 'TravelAgency',
      name: operator,
      url: siteUrl,
    },
    duration: `P${duration}D`,
    ...(rating &&
      reviewCount && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: rating,
          reviewCount,
        },
      }),
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
}

interface BlogSchemaProps {
  headline: string;
  description: string;
  image: string;
  author: string;
  publishedTime: string;
  modifiedTime?: string;
  url: string;
  tags?: string[];
}

export function BlogSchema({
  headline,
  description,
  image,
  author,
  publishedTime,
  modifiedTime,
  url: articleUrl,
  tags = [],
}: BlogSchemaProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://severiustours.com';
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;
  const fullArticleUrl = articleUrl.startsWith('http') ? articleUrl : `${siteUrl}${articleUrl}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline,
    description,
    image: fullImageUrl,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Severius Tours & Adventures',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/logo.png`,
      },
    },
    datePublished: publishedTime,
    ...(modifiedTime && { dateModified: modifiedTime }),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': fullArticleUrl,
    },
    keywords: tags.join(', '),
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
}

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://severiustours.com';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`,
    })),
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
}
