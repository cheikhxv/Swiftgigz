// src/components/common/SEOHead.js
import Head from 'next/head';
import { useRouter } from 'next/router';

const SEOHead = ({ 
  title, 
  description, 
  canonical, 
  ogImage = '/images/og-image.jpg',
  ogType = 'website',
  structuredData = null
}) => {
  const router = useRouter();
  const { locale } = router;
  
  // Générer les URL alternatives pour les balises hreflang
  const { asPath } = router;
  const baseUrl = 'https://swiftgigz.com'; // À remplacer par l'URL réelle du site
  
  const alternateUrls = [
    { locale: 'fr', url: `${baseUrl}/fr${asPath === '/' ? '' : asPath}` },
    { locale: 'nl', url: `${baseUrl}/nl${asPath === '/' ? '' : asPath}` },
    { locale: 'en', url: `${baseUrl}/en${asPath === '/' ? '' : asPath}` },
  ];
  
  // URL canonique
  const canonicalUrl = canonical || `${baseUrl}${asPath}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Balises Open Graph */}
      <meta property="og:locale" content={locale} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Swiftgigz" />
      <meta property="og:image" content={`${baseUrl}${ogImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      {/* Balises Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}${ogImage}`} />
      
      {/* Balises hreflang pour le SEO multilingue */}
      {alternateUrls.map(({ locale, url }) => (
        <link
          key={locale}
          rel="alternate"
          hrefLang={locale}
          href={url}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/fr`} />
      
      {/* Données structurées pour le SEO */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </Head>
  );
};

export default SEOHead;
