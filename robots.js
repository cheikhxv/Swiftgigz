// src/pages/api/robots.js
export default function handler(req, res) {
  // Générer le contenu du fichier robots.txt
  const robotsTxt = `# robots.txt pour Swiftgigz
User-agent: *
Allow: /

# Sitemap
Sitemap: https://swiftgigz.com/api/sitemap

# Interdire l'accès à certains répertoires
Disallow: /api/
Disallow: /_next/
`;

  // Définir les en-têtes de réponse
  res.setHeader('Content-Type', 'text/plain');
  res.write(robotsTxt);
  res.end();
}
