// src/pages/_app.js
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Redirection de la racine vers la langue par défaut
  useEffect(() => {
    if (router.pathname === '/' && !router.query.locale) {
      const userLang = navigator.language || navigator.userLanguage;
      const locale = userLang.startsWith('fr') ? 'fr' : 
                    userLang.startsWith('nl') ? 'nl' : 'en';
      
      router.replace(`/${locale}`);
    }
  }, [router]);

  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
