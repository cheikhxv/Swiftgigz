// src/components/layout/Layout.js
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, title, description }) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  
  // Générer les URL alternatives pour les balises hreflang
  const { asPath } = router;
  const baseUrl = 'https://swiftgigz.com'; // À remplacer par l'URL réelle du site
  
  const alternateUrls = [
    { locale: 'fr', url: `${baseUrl}/fr${asPath === '/' ? '' : asPath}` },
    { locale: 'nl', url: `${baseUrl}/nl${asPath === '/' ? '' : asPath}` },
    { locale: 'en', url: `${baseUrl}/en${asPath === '/' ? '' : asPath}` },
  ];

  return (
    <>
      <Head>
        <title>{title || 'Swiftgigz'}</title>
        <meta name="description" content={description || t('home.hero.subtitle')} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        
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
      </Head>

      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
