// src/utils/seo.js
/**
 * Utilitaires pour le SEO multilingue
 */

/**
 * Génère les données structurées pour une page d'accueil
 * @param {string} locale - Langue actuelle
 * @param {string} baseUrl - URL de base du site
 * @returns {Object} - Données structurées au format JSON-LD
 */
export const generateHomeStructuredData = (locale, baseUrl = 'https://swiftgigz.com') => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "url": `${baseUrl}/${locale}`,
    "logo": `${baseUrl}/logo.png`,
    "name": "Swiftgigz",
    "description": locale === 'fr' 
      ? "Swiftgigz connecte travailleurs et employeurs pour des missions ponctuelles en Belgique"
      : locale === 'nl'
        ? "Swiftgigz verbindt werknemers en werkgevers voor tijdelijke opdrachten in België"
        : "Swiftgigz connects workers and employers for temporary assignments in Belgium",
    "sameAs": [
      "https://www.facebook.com/swiftgigz",
      "https://www.linkedin.com/company/swiftgigz",
      "https://twitter.com/swiftgigz",
      "https://www.instagram.com/swiftgigz"
    ]
  };
};

/**
 * Génère les données structurées pour une page FAQ
 * @param {Array} faqs - Liste des questions/réponses
 * @param {string} locale - Langue actuelle
 * @param {string} baseUrl - URL de base du site
 * @returns {Object} - Données structurées au format JSON-LD
 */
export const generateFAQStructuredData = (faqs, locale, baseUrl = 'https://swiftgigz.com') => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

/**
 * Génère les données structurées pour une page de service
 * @param {string} name - Nom du service
 * @param {string} description - Description du service
 * @param {string} locale - Langue actuelle
 * @param {string} baseUrl - URL de base du site
 * @returns {Object} - Données structurées au format JSON-LD
 */
export const generateServiceStructuredData = (name, description, locale, baseUrl = 'https://swiftgigz.com') => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": "Swiftgigz",
      "url": `${baseUrl}/${locale}`
    }
  };
};

/**
 * Génère les balises meta pour les réseaux sociaux
 * @param {string} title - Titre de la page
 * @param {string} description - Description de la page
 * @param {string} imageUrl - URL de l'image à utiliser
 * @param {string} url - URL canonique de la page
 * @returns {Object} - Objet contenant les balises meta
 */
export const generateSocialTags = (title, description, imageUrl, url) => {
  return {
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      site_name: 'Swiftgigz',
    },
    twitter: {
      cardType: 'summary_large_image',
      title,
      description,
      image: imageUrl,
    },
  };
};

/**
 * Génère les balises hreflang pour le SEO multilingue
 * @param {string} path - Chemin actuel
 * @param {string} baseUrl - URL de base du site
 * @returns {Array} - Tableau d'objets contenant les balises hreflang
 */
export const generateHreflangTags = (path, baseUrl = 'https://swiftgigz.com') => {
  const locales = ['fr', 'nl', 'en'];
  const pathWithoutLocale = path.replace(/^\/[a-z]{2}/, '');
  
  return locales.map(locale => ({
    rel: 'alternate',
    hrefLang: locale,
    href: `${baseUrl}/${locale}${pathWithoutLocale}`,
  }));
};

/**
 * Génère un sitemap pour le site multilingue
 * @param {Array} routes - Liste des routes du site
 * @param {string} baseUrl - URL de base du site
 * @returns {string} - Contenu XML du sitemap
 */
export const generateSitemap = (routes, baseUrl = 'https://swiftgigz.com') => {
  const locales = ['fr', 'nl', 'en'];
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
  
  routes.forEach(route => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${baseUrl}${route}</loc>\n`;
    
    // Ajouter les alternatives linguistiques
    locales.forEach(locale => {
      const localizedRoute = route.replace(/^\/[a-z]{2}/, `/${locale}`);
      sitemap += `    <xhtml:link rel="alternate" hreflang="${locale}" href="${baseUrl}${localizedRoute}" />\n`;
    });
    
    sitemap += '    <changefreq>weekly</changefreq>\n';
    sitemap += '    <priority>0.8</priority>\n';
    sitemap += '  </url>\n';
  });
  
  sitemap += '</urlset>';
  return sitemap;
};
