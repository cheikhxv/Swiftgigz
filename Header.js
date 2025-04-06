// src/components/layout/Header.js
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useState } from 'react';
import LanguageSwitcher from '../common/LanguageSwitcher';

const Header = () => {
  const { t } = useTranslation('common');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: t('navigation.home'), href: '/' },
    { name: t('navigation.workers'), href: '/travailleurs' },
    { name: t('navigation.employers'), href: '/employeurs' },
    { name: t('navigation.how_it_works'), href: '/fonctionnement' },
    { name: t('navigation.pricing'), href: '/tarifs' },
    { name: t('navigation.blog'), href: '/blog' },
    { name: t('navigation.faq'), href: '/faq' },
  ];

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <a className="flex items-center">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-2">
                  <div className="w-3.5 h-3.5 bg-white transform translate-x-0.5" style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}></div>
                </div>
                <span className="text-xl font-bold text-primary">Swiftgigz</span>
              </a>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navigation.map((item) => (
              <Link href={item.href} key={item.name}>
                <a className="text-gray-800 hover:text-primary font-medium text-sm">
                  {item.name}
                </a>
              </Link>
            ))}
          </nav>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher className="hidden md:flex" />
            <Link href="/preinscription">
              <a className="hidden md:block bg-primary text-white px-4 py-2 rounded text-sm font-medium">
                {t('buttons.pre_register')}
              </a>
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden bg-white p-2 rounded-md"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`block w-full h-0.5 bg-gray-800 transform transition duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block w-full h-0.5 bg-gray-800 transition duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-full h-0.5 bg-gray-800 transform transition duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navigation.map((item) => (
            <Link href={item.href} key={item.name}>
              <a className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-primary">
                {item.name}
              </a>
            </Link>
          ))}
          <Link href="/preinscription">
            <a className="block px-3 py-2 mt-4 text-base font-medium bg-primary text-white rounded text-center">
              {t('buttons.pre_register')}
            </a>
          </Link>
          <div className="mt-4 px-3 py-2">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
