// src/utils/i18n.js
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// Fonction utilitaire pour charger les traductions côté serveur
export const getI18nProps = async (locale, namespaces = ['common']) => {
  return {
    ...(await serverSideTranslations(locale, namespaces)),
  };
};

// Fonction pour obtenir la locale à partir du chemin
export const getLocaleFromPath = (path) => {
  const pathParts = path.split('/').filter(Boolean);
  const locales = ['fr', 'nl', 'en'];
  
  if (pathParts.length > 0 && locales.includes(pathParts[0])) {
    return pathParts[0];
  }
  
  return 'fr'; // Locale par défaut
};

// Fonction pour générer les URL localisées
export const getLocalizedUrl = (path, locale) => {
  const currentLocale = getLocaleFromPath(path);
  const pathWithoutLocale = path.replace(new RegExp(`^/${currentLocale}`), '');
  
  return `/${locale}${pathWithoutLocale}`;
};

// Fonction pour rediriger vers la locale préférée de l'utilisateur
export const redirectToLocale = (req, res, defaultLocale = 'fr') => {
  const acceptLanguage = req.headers['accept-language'] || '';
  const preferredLocale = acceptLanguage
    .split(',')
    .map(lang => lang.split(';')[0].trim().substring(0, 2))
    .find(lang => ['fr', 'nl', 'en'].includes(lang)) || defaultLocale;
  
  res.setHeader('Location', `/${preferredLocale}`);
  res.statusCode = 302;
  res.end();
};
