// src/pages/index.js
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getLocaleFromPath } from '../utils/i18n';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Détection de la langue du navigateur
    const userLang = navigator.language || navigator.userLanguage;
    let locale = 'fr'; // Langue par défaut
    
    // Déterminer la langue préférée
    if (userLang.startsWith('fr')) {
      locale = 'fr';
    } else if (userLang.startsWith('nl')) {
      locale = 'nl';
    } else if (userLang.startsWith('en')) {
      locale = 'en';
    }
    
    // Rediriger vers la page d'accueil dans la langue appropriée
    router.replace(`/${locale}`);
  }, [router]);

  // Cette page est juste un point d'entrée pour la redirection
  return null;
}
