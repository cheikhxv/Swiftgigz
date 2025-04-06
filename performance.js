// src/utils/performance.js
// Utilitaires pour améliorer les performances du site

/**
 * Fonction pour charger les scripts de manière différée
 * @param {string} src - URL du script à charger
 * @param {boolean} async - Charger de manière asynchrone
 * @param {boolean} defer - Différer le chargement
 */
export const loadScript = (src, async = true, defer = true) => {
  const script = document.createElement('script');
  script.src = src;
  script.async = async;
  script.defer = defer;
  document.body.appendChild(script);
  return script;
};

/**
 * Fonction pour précharger une image
 * @param {string} src - URL de l'image à précharger
 */
export const preloadImage = (src) => {
  const img = new Image();
  img.src = src;
};

/**
 * Fonction pour précharger les images critiques
 * @param {Array} imageSources - Tableau d'URLs d'images à précharger
 */
export const preloadCriticalImages = (imageSources) => {
  if (typeof window !== 'undefined') {
    // Utiliser requestIdleCallback si disponible, sinon setTimeout
    const requestIdleCallbackShim = 
      window.requestIdleCallback || 
      ((cb) => setTimeout(cb, 1));
    
    requestIdleCallbackShim(() => {
      imageSources.forEach(preloadImage);
    });
  }
};

/**
 * Fonction pour implémenter l'intersection observer pour le lazy loading
 * @param {string} selector - Sélecteur CSS pour les éléments à observer
 * @param {Function} callback - Fonction à exécuter lorsqu'un élément est visible
 */
export const setupIntersectionObserver = (selector, callback) => {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '100px',
      threshold: 0.1
    });
    
    document.querySelectorAll(selector).forEach(el => {
      observer.observe(el);
    });
    
    return observer;
  }
  
  return null;
};

/**
 * Fonction pour mesurer les performances web vitales
 */
export const measureWebVitals = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Mesurer le First Contentful Paint (FCP)
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        if (entry.name === 'first-contentful-paint') {
          console.log(`FCP: ${entry.startTime}ms`);
        }
      });
    });
    
    observer.observe({ type: 'paint', buffered: true });
    
    // Mesurer le Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log(`LCP: ${lastEntry.startTime}ms`);
    });
    
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    
    // Mesurer le First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        console.log(`FID: ${entry.processingStart - entry.startTime}ms`);
      });
    });
    
    fidObserver.observe({ type: 'first-input', buffered: true });
    
    // Mesurer le Cumulative Layout Shift (CLS)
    let clsValue = 0;
    let clsEntries = [];
    
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach(entry => {
        // Seulement si l'utilisateur n'a pas interagi récemment
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          clsEntries.push(entry);
        }
      });
      
      console.log(`Current CLS: ${clsValue}`);
    });
    
    clsObserver.observe({ type: 'layout-shift', buffered: true });
  }
};
