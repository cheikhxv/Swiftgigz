// src/utils/browserDetection.js
/**
 * Utilitaires pour la détection des navigateurs et appareils
 */

/**
 * Détecte le navigateur de l'utilisateur
 * @returns {Object} Informations sur le navigateur
 */
export const detectBrowser = () => {
  if (typeof window === 'undefined') {
    return {
      name: 'unknown',
      version: 'unknown',
      isModern: true
    };
  }

  const userAgent = window.navigator.userAgent;
  let browserName = 'unknown';
  let browserVersion = 'unknown';
  
  // Chrome
  if (/Chrome/.test(userAgent) && !/Chromium|Edge|Edg|OPR|Opera/.test(userAgent)) {
    browserName = 'chrome';
    browserVersion = userAgent.match(/Chrome\/(\d+\.\d+)/)?.[1] || 'unknown';
  } 
  // Firefox
  else if (/Firefox/.test(userAgent)) {
    browserName = 'firefox';
    browserVersion = userAgent.match(/Firefox\/(\d+\.\d+)/)?.[1] || 'unknown';
  } 
  // Safari
  else if (/Safari/.test(userAgent) && !/Chrome|Chromium|Edge|Edg|OPR|Opera/.test(userAgent)) {
    browserName = 'safari';
    browserVersion = userAgent.match(/Version\/(\d+\.\d+)/)?.[1] || 'unknown';
  } 
  // Edge (Chromium)
  else if (/Edg/.test(userAgent)) {
    browserName = 'edge';
    browserVersion = userAgent.match(/Edg\/(\d+\.\d+)/)?.[1] || 'unknown';
  } 
  // Opera
  else if (/OPR|Opera/.test(userAgent)) {
    browserName = 'opera';
    browserVersion = userAgent.match(/(?:OPR|Opera)\/(\d+\.\d+)/)?.[1] || 'unknown';
  } 
  // IE
  else if (/Trident/.test(userAgent)) {
    browserName = 'ie';
    browserVersion = userAgent.match(/rv:(\d+\.\d+)/)?.[1] || 'unknown';
  }

  // Vérifier si c'est un navigateur moderne
  const isModern = !(browserName === 'ie' || 
    (browserName === 'safari' && parseFloat(browserVersion) < 10) ||
    (browserName === 'chrome' && parseFloat(browserVersion) < 60) ||
    (browserName === 'firefox' && parseFloat(browserVersion) < 60) ||
    (browserName === 'edge' && parseFloat(browserVersion) < 16) ||
    (browserName === 'opera' && parseFloat(browserVersion) < 50));

  return {
    name: browserName,
    version: browserVersion,
    isModern
  };
};

/**
 * Détecte le type d'appareil de l'utilisateur
 * @returns {Object} Informations sur l'appareil
 */
export const detectDevice = () => {
  if (typeof window === 'undefined') {
    return {
      type: 'desktop',
      isMobile: false,
      isTablet: false,
      isDesktop: true
    };
  }

  const userAgent = window.navigator.userAgent;
  
  // Détection des appareils mobiles
  const isMobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) && !/iPad/i.test(userAgent);
  
  // Détection des tablettes
  const isTablet = /iPad|Android/i.test(userAgent) && !/Mobile/i.test(userAgent);
  
  // Si ce n'est ni mobile ni tablette, c'est un desktop
  const isDesktop = !isMobile && !isTablet;
  
  let deviceType = 'desktop';
  if (isMobile) deviceType = 'mobile';
  if (isTablet) deviceType = 'tablet';

  return {
    type: deviceType,
    isMobile,
    isTablet,
    isDesktop
  };
};

/**
 * Vérifie si le navigateur supporte certaines fonctionnalités modernes
 * @returns {Object} Support des fonctionnalités
 */
export const checkFeatureSupport = () => {
  if (typeof window === 'undefined') {
    return {
      flexbox: true,
      grid: true,
      es6: true,
      webp: true,
      webgl: true,
      touchEvents: false
    };
  }

  // Vérifier le support de Flexbox
  const flexbox = typeof document.createElement('div').style.flexBasis !== 'undefined';
  
  // Vérifier le support de Grid
  const grid = typeof document.createElement('div').style.grid !== 'undefined';
  
  // Vérifier le support ES6
  const es6 = typeof Symbol !== 'undefined' && typeof Promise !== 'undefined';
  
  // Vérifier le support WebP (approximatif)
  const webp = document.createElement('canvas')
    .toDataURL('image/webp')
    .indexOf('data:image/webp') === 0;
  
  // Vérifier le support WebGL
  let webgl = false;
  try {
    const canvas = document.createElement('canvas');
    webgl = !!(window.WebGLRenderingContext && 
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    webgl = false;
  }
  
  // Vérifier le support des événements tactiles
  const touchEvents = 'ontouchstart' in window || 
    navigator.maxTouchPoints > 0 || 
    navigator.msMaxTouchPoints > 0;

  return {
    flexbox,
    grid,
    es6,
    webp,
    webgl,
    touchEvents
  };
};

/**
 * Applique des polyfills si nécessaire
 */
export const applyPolyfills = () => {
  if (typeof window === 'undefined') return;

  const browser = detectBrowser();
  
  if (!browser.isModern) {
    // Charger les polyfills nécessaires
    const polyfills = [];
    
    // Object.assign polyfill
    if (typeof Object.assign !== 'function') {
      polyfills.push('https://cdn.jsdelivr.net/npm/es6-object-assign@1.1.0/dist/object-assign-auto.min.js');
    }
    
    // Promise polyfill
    if (typeof Promise === 'undefined') {
      polyfills.push('https://cdn.jsdelivr.net/npm/promise-polyfill@8/dist/polyfill.min.js');
    }
    
    // Fetch polyfill
    if (typeof fetch === 'undefined') {
      polyfills.push('https://cdn.jsdelivr.net/npm/whatwg-fetch@3.6.2/dist/fetch.umd.min.js');
    }
    
    // IntersectionObserver polyfill
    if (typeof IntersectionObserver === 'undefined') {
      polyfills.push('https://cdn.jsdelivr.net/npm/intersection-observer@0.12.2/intersection-observer.js');
    }
    
    // Charger les polyfills
    polyfills.forEach(src => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.head.appendChild(script);
    });
  }
};

/**
 * Ajoute des classes au body en fonction du navigateur et de l'appareil
 */
export const addDeviceClasses = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  
  const browser = detectBrowser();
  const device = detectDevice();
  const features = checkFeatureSupport();
  
  // Ajouter des classes pour le navigateur
  document.body.classList.add(`browser-${browser.name}`);
  
  // Ajouter des classes pour l'appareil
  document.body.classList.add(`device-${device.type}`);
  
  // Ajouter des classes pour les fonctionnalités
  if (!features.flexbox) document.body.classList.add('no-flexbox');
  if (!features.grid) document.body.classList.add('no-grid');
  if (!features.webp) document.body.classList.add('no-webp');
  if (features.touchEvents) document.body.classList.add('touch-device');
  
  // Ajouter une classe pour les navigateurs anciens
  if (!browser.isModern) document.body.classList.add('legacy-browser');
};
