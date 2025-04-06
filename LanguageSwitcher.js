// src/components/common/LanguageSwitcher.js
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { getLocalizedUrl } from '../../utils/i18n';

const LanguageSwitcher = ({ className = '' }) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const currentPath = router.asPath;
  
  const languages = [
    { code: 'fr', name: t('common.language.fr') },
    { code: 'nl', name: t('common.language.nl') },
    { code: 'en', name: t('common.language.en') }
  ];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {languages.map((lang) => (
        <Link 
          href={getLocalizedUrl(currentPath, lang.code)} 
          key={lang.code}
          locale={lang.code}
        >
          <a className={`text-sm ${router.locale === lang.code ? 'font-semibold text-primary' : 'text-gray-500 hover:text-gray-700'}`}>
            {lang.code.toUpperCase()}
          </a>
        </Link>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
