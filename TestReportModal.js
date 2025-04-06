// src/components/common/TestReportModal.js
import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { runAllTests } from '../../utils/testUtils';

const TestReportModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation('common');
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      // Exécuter les tests après un court délai pour permettre au modal de s'afficher
      setTimeout(() => {
        const testReport = runAllTests();
        setReport(testReport);
        setLoading(false);
      }, 500);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              {t('test_report.title', 'Rapport de test de compatibilité')}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">{t('common.close')}</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <svg className="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="ml-3 text-lg text-gray-600">{t('test_report.loading', 'Exécution des tests...')}</span>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Informations générales */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {t('test_report.general_info', 'Informations générales')}
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">{t('test_report.browser', 'Navigateur')}</p>
                      <p className="font-medium">{`${report.browser.name} ${report.browser.version}`}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{t('test_report.viewport', 'Taille d\'écran')}</p>
                      <p className="font-medium">{`${report.viewport.width} × ${report.viewport.height}px`}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{t('test_report.date', 'Date du test')}</p>
                      <p className="font-medium">{new Date(report.timestamp).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{t('test_report.overall_status', 'Statut global')}</p>
                      <p className={`font-medium ${report.success ? 'text-green-600' : 'text-red-600'}`}>
                        {report.success 
                          ? t('test_report.status_success', 'Tous les tests ont réussi') 
                          : t('test_report.status_failure', 'Certains tests ont échoué')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accessibilité */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {t('test_report.accessibility', 'Accessibilité')}
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {report.accessibility.success ? (
                    <div className="flex items-center text-green-600">
                      <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{t('test_report.no_accessibility_issues', 'Aucun problème d\'accessibilité détecté')}</span>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center text-red-600 mb-4">
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span>
                          {t('test_report.accessibility_issues_found', '{{count}} problèmes d\'accessibilité détectés', 
                            { count: report.accessibility.issues.length })}
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {report.accessibility.issues.map((issue, index) => (
                          <li key={index} className={`text-sm ${issue.type === 'error' ? 'text-red-600' : 'text-yellow-600'}`}>
                            <span className="font-medium">{issue.type === 'error' ? 'Erreur' : 'Avertissement'}: </span>
                            {issue.message}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Responsive */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {t('test_report.responsive', 'Compatibilité responsive')}
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {report.responsive.success ? (
                    <div className="flex items-center text-green-600">
                      <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{t('test_report.no_responsive_issues', 'Aucun problème de responsive détecté')}</span>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center text-red-600 mb-4">
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span>
                          {t('test_report.responsive_issues_found', '{{count}} problèmes de responsive détectés', 
                            { count: report.responsive.issues.length })}
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {report.responsive.issues.map((issue, index) => (
                          <li key={index} className={`text-sm ${issue.type === 'error' ? 'text-red-600' : 'text-yellow-600'}`}>
                            <span className="font-medium">{issue.type === 'error' ? 'Erreur' : 'Avertissement'}: </span>
                            {issue.message}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Performance */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {t('test_report.performance', 'Performance')}
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          {t('test_report.load_time', 'Temps de chargement')}
                        </span>
                        <span className={`text-sm font-medium ${report.performance.metrics.isLoadTimeFast ? 'text-green-600' : 'text-red-600'}`}>
                          {report.performance.metrics.loadTime}ms
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${report.performance.metrics.isLoadTimeFast ? 'bg-green-500' : 'bg-red-500'}`}
                          style={{ width: `${Math.min(100, (report.performance.metrics.loadTime / 3000) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          {t('test_report.resource_count', 'Nombre de requêtes')}
                        </span>
                        <span className={`text-sm font-medium ${report.performance.metrics.isRequestCountGood ? 'text-green-600' : 'text-red-600'}`}>
                          {report.performance.metrics.resourceCount}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${report.performance.metrics.isRequestCountGood ? 'bg-green-500' : 'bg-red-500'}`}
                          style={{ width: `${Math.min(100, (report.performance.metrics.resourceCount / 100) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          {t('test_report.total_size', 'Taille totale')}
                        </span>
                        <span className={`text-sm font-medium ${report.performance.metrics.isSizeGood ? 'text-green-600' : 'text-red-600'}`}>
                          {report.performance.metrics.totalSize}KB
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${report.performance.metrics.isSizeGood ? 'bg-green-500' : 'bg-red-500'}`}
                          style={{ width: `${Math.min(100, (report.performance.metrics.totalSize / 3000) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 pt-2">
                      <div>
                        <p className="text-sm text-gray-500">{t('test_report.image_requests', 'Images')}</p>
                        <p className="font-medium">{report.performance.metrics.imageRequests}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{t('test_report.script_requests', 'Scripts')}</p>
                        <p className="font-medium">{report.performance.metrics.scriptRequests}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{t('test_report.css_requests', 'CSS')}</p>
                        <p className="font-medium">{report.performance.metrics.cssRequests}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support des fonctionnalités */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {t('test_report.feature_support', 'Support des fonctionnalités')}
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Flexbox</p>
                      <p className={`font-medium ${report.features.flexbox ? 'text-green-600' : 'text-red-600'}`}>
                        {report.features.flexbox ? '✓' : '✗'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Grid</p>
                      <p className={`font-medium ${report.features.grid ? 'text-green-600' : 'text-red-600'}`}>
                        {report.features.grid ? '✓' : '✗'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">ES6</p>
                      <p className={`font-medium ${report.features.es6 ? 'text-green-600' : 'text-red-600'}`}>
                        {report.features.es6 ? '✓' : '✗'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">WebP</p>
                      <p className={`font-medium ${report.features.webp ? 'text-green-600' : 'text-red-600'}`}>
                        {report.features.webp ? '✓' : '✗'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">WebGL</p>
                      <p className={`font-medium ${report.features.webgl ? 'text-green-600' : 'text-red-600'}`}>
                        {report.features.webgl ? '✓' : '✗'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{t('test_report.touch_events', 'Écran tactile')}</p>
                      <p className={`font-medium ${report.features.touchEvents ? 'text-green-600' : 'text-gray-600'}`}>
                        {report.features.touchEvents ? '✓' : '—'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              {t('common.close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestReportModal;
