import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  keywords?: string[];
  ogType?: 'website' | 'article';
  schema?: Record<string, unknown>;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalPath = '',
  keywords = [],
  ogType = 'website',
  schema,
}) => {
  const siteUrl = 'https://sujaldev.shop';
  const fullUrl = `${siteUrl}${canonicalPath}`;
  const fullTitle = title.includes('SujalDev') ? title : `${title} — SujalDev Tools`;

  const defaultKeywords = [
    'SujalDev Tools',
    'free online tools',
    'pdf tools',
    'image tools',
    'developer tools',
    'client-side',
    'private tools',
  ];
  const combinedKeywords = Array.from(new Set([...keywords, ...defaultKeywords])).join(', ');

  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: fullTitle,
    url: fullUrl,
    description: description,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={combinedKeywords} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={`${siteUrl}/og-image.png`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schema || defaultSchema)}
      </script>
    </Helmet>
  );
};

