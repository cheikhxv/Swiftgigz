// src/components/layout/Footer.js
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import LanguageSwitcher from '../common/LanguageSwitcher';

const Footer = () => {
  const { t } = useTranslation('common');

  const footerSections = [
    {
      title: t('footer.quick_links'),
      links: [
        { name: t('navigation.home'), href: '/' },
        { name: t('navigation.workers'), href: '/travailleurs' },
        { name: t('navigation.employers'), href: '/employeurs' },
        { name: t('navigation.how_it_works'), href: '/fonctionnement' },
        { name: t('navigation.pricing'), href: '/tarifs' },
      ],
    },
    {
      title: t('footer.resources'),
      links: [
        { name: t('navigation.blog'), href: '/blog' },
        { name: t('navigation.faq'), href: '/faq' },
        { name: t('footer.support'), href: '/support' },
        { name: t('navigation.contact'), href: '/contact' },
      ],
    },
    {
      title: t('footer.legal'),
      links: [
        { name: t('footer.legal_mentions'), href: '/mentions-legales' },
        { name: t('footer.privacy_policy'), href: '/politique-confidentialite' },
        { name: t('footer.terms_of_use'), href: '/conditions-utilisation' },
      ],
    },
  ];

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: 'f' },
    { name: 'LinkedIn', href: '#', icon: 'in' },
    { name: 'Twitter', href: '#', icon: 't' },
    { name: 'Instagram', href: '#', icon: 'ig' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <Link href="/">
              <a className="flex items-center">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
                  <div className="w-3.5 h-3.5 bg-primary transform translate-x-0.5" style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}></div>
                </div>
                <span className="text-xl font-bold text-white">Swiftgigz</span>
              </a>
            </Link>
            <p className="mt-4 text-sm text-gray-300">
              La plateforme qui connecte travailleurs et employeurs pour des missions ponctuelles en Belgique.
            </p>
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors"
                >
                  <span>{item.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Footer sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href}>
                      <a className="text-sm text-gray-300 hover:text-white">
                        {item.name}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Language selector */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              {t('footer.languages')}
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <LanguageSwitcher />
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
