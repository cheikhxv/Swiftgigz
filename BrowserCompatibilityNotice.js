// src/components/common/BrowserCompatibilityNotice.js
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { detectBrowser, checkFeatureSupport } from '../../utils/browserDetection';

const BrowserCompatibilityNotice = () => {
  const { t } = useTranslation('common');
  const [showNotice, setShowNotice] = useState(false);
  const [browserInfo, setBrowserInfo] = useState(null);

  useEffect(() => {
    const browser = detectBrowser();
    const features = checkFeatureSupport();
    
    setBrowserInfo(browser);
    
    // Afficher la notice si le navigateur est ancien ou s'il manque des fonctionnalités essentielles
    if (!browser.isModern || !features.flexbox || !features.es6) {
      setShowNotice(true);
    }
  }, []);

  if (!showNotice || !browserInfo) return null;

  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            {t('browser_notice.outdated_browser', {
              browser: browserInfo.name.charAt(0).toUpperCase() + browserInfo.name.slice(1),
              version: browserInfo.version
            })}
          </p>
          <p className="text-sm text-yellow-700 mt-2">
            {t('browser_notice.recommendation')}
          </p>
          <div className="mt-3 flex space-x-2">
            <a
              href="https://www.google.com/chrome/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-yellow-700 hover:text-yellow-600"
            >
              Chrome
            </a>
            <a
              href="https://www.mozilla.org/firefox/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-yellow-700 hover:text-yellow-600"
            >
              Firefox
            </a>
            <a
              href="https://www.microsoft.com/edge/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-yellow-700 hover:text-yellow-600"
            >
              Edge
            </a>
            <a
              href="https://www.apple.com/safari/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-yellow-700 hover:text-yellow-600"
            >
              Safari
            </a>
          </div>
          <button
            onClick={() => setShowNotice(false)}
            className="mt-2 text-sm text-yellow-700 hover:text-yellow-600 underline"
          >
            {t('browser_notice.dismiss')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrowserCompatibilityNotice;
