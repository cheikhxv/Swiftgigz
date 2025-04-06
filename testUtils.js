// src/utils/testUtils.js
/**
 * Utilitaires pour les tests de compatibilité et d'accessibilité
 */

/**
 * Vérifie l'accessibilité de base des éléments interactifs
 * @returns {Object} Résultats des tests d'accessibilité
 */
export const checkAccessibility = () => {
  if (typeof document === 'undefined') return { success: true, issues: [] };

  const issues = [];

  // Vérifier les images sans attribut alt
  const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
  if (imagesWithoutAlt.length > 0) {
    issues.push({
      type: 'error',
      message: `${imagesWithoutAlt.length} images sans attribut alt trouvées`,
      elements: Array.from(imagesWithoutAlt)
    });
  }

  // Vérifier les liens sans texte
  const emptyLinks = document.querySelectorAll('a:empty:not([aria-label]):not([aria-labelledby])');
  if (emptyLinks.length > 0) {
    issues.push({
      type: 'error',
      message: `${emptyLinks.length} liens sans texte trouvés`,
      elements: Array.from(emptyLinks)
    });
  }

  // Vérifier les formulaires sans labels
  const inputsWithoutLabels = document.querySelectorAll('input:not([type="hidden"]):not([aria-label]):not([aria-labelledby])');
  const inputsWithoutAssociatedLabels = Array.from(inputsWithoutLabels).filter(input => {
    const id = input.getAttribute('id');
    if (!id) return true;
    return document.querySelector(`label[for="${id}"]`) === null;
  });

  if (inputsWithoutAssociatedLabels.length > 0) {
    issues.push({
      type: 'error',
      message: `${inputsWithoutAssociatedLabels.length} champs de formulaire sans label trouvés`,
      elements: inputsWithoutAssociatedLabels
    });
  }

  // Vérifier le contraste des couleurs (approximatif)
  const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, button, label, input, textarea, select');
  const lowContrastElements = Array.from(textElements).filter(el => {
    const style = window.getComputedStyle(el);
    const backgroundColor = style.backgroundColor;
    const color = style.color;
    
    // Conversion simplifiée RGB en luminosité
    const getBrightness = (color) => {
      const rgb = color.match(/\d+/g);
      if (!rgb || rgb.length < 3) return 255; // Valeur par défaut si non détectable
      return (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
    };
    
    const foregroundBrightness = getBrightness(color);
    const backgroundBrightness = getBrightness(backgroundColor);
    
    // Différence de luminosité minimale recommandée
    return Math.abs(foregroundBrightness - backgroundBrightness) < 125;
  });

  if (lowContrastElements.length > 0) {
    issues.push({
      type: 'warning',
      message: `${lowContrastElements.length} éléments avec un contraste potentiellement insuffisant`,
      elements: lowContrastElements
    });
  }

  return {
    success: issues.length === 0,
    issues
  };
};

/**
 * Vérifie la compatibilité responsive du site
 * @returns {Object} Résultats des tests de responsive
 */
export const checkResponsive = () => {
  if (typeof window === 'undefined') return { success: true, issues: [] };

  const issues = [];

  // Vérifier les éléments qui dépassent de la largeur de la fenêtre
  const viewportWidth = window.innerWidth;
  const allElements = document.querySelectorAll('*');
  
  const overflowingElements = Array.from(allElements).filter(el => {
    const rect = el.getBoundingClientRect();
    return rect.width > viewportWidth || rect.right > viewportWidth;
  });

  if (overflowingElements.length > 0) {
    issues.push({
      type: 'error',
      message: `${overflowingElements.length} éléments dépassent de la largeur de l'écran`,
      elements: overflowingElements
    });
  }

  // Vérifier les tailles de police trop petites
  const textElements = document.querySelectorAll('p, a, button, label, input, textarea, select');
  const smallTextElements = Array.from(textElements).filter(el => {
    const fontSize = parseFloat(window.getComputedStyle(el).fontSize);
    return fontSize < 12; // 12px est généralement considéré comme le minimum pour la lisibilité
  });

  if (smallTextElements.length > 0) {
    issues.push({
      type: 'warning',
      message: `${smallTextElements.length} éléments ont une taille de police inférieure à 12px`,
      elements: smallTextElements
    });
  }

  // Vérifier les zones tactiles trop petites
  const interactiveElements = document.querySelectorAll('a, button, [role="button"], input[type="checkbox"], input[type="radio"], input[type="submit"]');
  const smallTouchTargets = Array.from(interactiveElements).filter(el => {
    const rect = el.getBoundingClientRect();
    return rect.width < 44 || rect.height < 44; // 44x44px est la taille minimale recommandée pour les zones tactiles
  });

  if (smallTouchTargets.length > 0) {
    issues.push({
      type: 'warning',
      message: `${smallTouchTargets.length} éléments interactifs ont une zone tactile trop petite`,
      elements: smallTouchTargets
    });
  }

  return {
    success: issues.length === 0,
    issues
  };
};

/**
 * Vérifie les performances de base du site
 * @returns {Object} Résultats des tests de performance
 */
export const checkPerformance = () => {
  if (typeof window === 'undefined' || typeof performance === 'undefined') {
    return { success: true, metrics: {} };
  }

  // Mesurer le temps de chargement
  const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
  
  // Compter les ressources
  const resources = performance.getEntriesByType('resource');
  const resourceCount = resources.length;
  
  // Calculer la taille totale des ressources
  const totalSize = resources.reduce((total, resource) => total + (resource.transferSize || 0), 0);
  
  // Compter les requêtes par type
  const imageRequests = resources.filter(r => r.initiatorType === 'img').length;
  const scriptRequests = resources.filter(r => r.initiatorType === 'script').length;
  const cssRequests = resources.filter(r => r.initiatorType === 'css').length;
  
  // Vérifier si le temps de chargement est acceptable
  const isLoadTimeFast = loadTime < 2000; // Moins de 2 secondes est considéré comme rapide
  
  // Vérifier si le nombre de requêtes est raisonnable
  const isRequestCountGood = resourceCount < 50; // Moins de 50 requêtes est généralement acceptable
  
  // Vérifier si la taille totale est raisonnable
  const isSizeGood = totalSize < 2000000; // Moins de 2Mo est généralement acceptable

  return {
    success: isLoadTimeFast && isRequestCountGood && isSizeGood,
    metrics: {
      loadTime,
      resourceCount,
      totalSize: Math.round(totalSize / 1024), // Convertir en KB
      imageRequests,
      scriptRequests,
      cssRequests,
      isLoadTimeFast,
      isRequestCountGood,
      isSizeGood
    }
  };
};

/**
 * Exécute tous les tests et retourne un rapport complet
 * @returns {Object} Rapport de test complet
 */
export const runAllTests = () => {
  if (typeof window === 'undefined') return { success: true };

  const accessibilityResults = checkAccessibility();
  const responsiveResults = checkResponsive();
  const performanceResults = checkPerformance();
  const browserInfo = typeof detectBrowser !== 'undefined' ? detectBrowser() : { name: 'unknown', version: 'unknown' };
  const featureSupport = typeof checkFeatureSupport !== 'undefined' ? checkFeatureSupport() : {};

  return {
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight
    },
    browser: browserInfo,
    features: featureSupport,
    accessibility: accessibilityResults,
    responsive: responsiveResults,
    performance: performanceResults,
    success: accessibilityResults.success && responsiveResults.success && performanceResults.success
  };
};

/**
 * Affiche un rapport de test dans la console
 */
export const logTestReport = () => {
  const report = runAllTests();
  console.group('Rapport de test Swiftgigz');
  console.log('Date:', new Date(report.timestamp).toLocaleString());
  console.log('Navigateur:', `${report.browser.name} ${report.browser.version}`);
  console.log('Viewport:', `${report.viewport.width}x${report.viewport.height}`);
  
  console.group('Accessibilité');
  if (report.accessibility.success) {
    console.log('✅ Aucun problème d\'accessibilité détecté');
  } else {
    console.log(`❌ ${report.accessibility.issues.length} problèmes détectés`);
    report.accessibility.issues.forEach(issue => {
      console.log(`- ${issue.type.toUpperCase()}: ${issue.message}`);
    });
  }
  console.groupEnd();
  
  console.group('Responsive');
  if (report.responsive.success) {
    console.log('✅ Aucun problème de responsive détecté');
  } else {
    console.log(`❌ ${report.responsive.issues.length} problèmes détectés`);
    report.responsive.issues.forEach(issue => {
      console.log(`- ${issue.type.toUpperCase()}: ${issue.message}`);
    });
  }
  console.groupEnd();
  
  console.group('Performance');
  console.log(`Temps de chargement: ${report.performance.metrics.loadTime}ms ${report.performance.metrics.isLoadTimeFast ? '✅' : '❌'}`);
  console.log(`Nombre de requêtes: ${report.performance.metrics.resourceCount} ${report.performance.metrics.isRequestCountGood ? '✅' : '❌'}`);
  console.log(`Taille totale: ${report.performance.metrics.totalSize}KB ${report.performance.metrics.isSizeGood ? '✅' : '❌'}`);
  console.groupEnd();
  
  console.groupEnd();
  
  return report;
};
