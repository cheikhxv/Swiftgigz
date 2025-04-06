// src/pages/api/sitemap.js
import { generateSitemap } from '../../utils/seo';

export default function handler(req, res) {
  // Liste des routes principales du site
  const routes = [
    '/fr',
    '/nl',
    '/en',
    '/fr/travailleurs',
    '/nl/werknemers',
    '/en/workers',
    '/fr/employeurs',
    '/nl/werkgevers',
    '/en/employers',
    '/fr/fonctionnement',
    '/nl/hoe-het-werkt',
    '/en/how-it-works',
    '/fr/tarifs',
    '/nl/tarieven',
    '/en/pricing',
    '/fr/blog',
    '/nl/blog',
    '/en/blog',
    '/fr/faq',
    '/nl/faq',
    '/en/faq',
    '/fr/contact',
    '/nl/contact',
    '/en/contact',
    '/fr/preinscription',
    '/nl/voorinschrijving',
    '/en/pre-register',
  ];

  // Générer le sitemap XML
  const sitemap = generateSitemap(routes);

  // Définir les en-têtes de réponse
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
}
