const CACHE_NAME = 'stopwatch-pwa-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './src/css/style.css',
  './src/js/script.js',
  './icons/icon-72x72.png',
  './icons/icon-96x96.png',
  './icons/icon-128x128.png',
  './icons/icon-144x144.png',
  './icons/icon-152x152.png',
  './icons/icon-192x192.png',
  './icons/icon-384x384.png',
  './icons/icon-512x512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/js/all.min.js'
];

// Install Service Worker and cache initial assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Activate Service Worker and clear old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Intercept fetch requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cache if available or fetch from network
      return (
        cachedResponse ||
        fetch(event.request)
          .then((networkResponse) => {
            // Cache dynamic CDN requests
            if (event.request.url.startsWith('https://cdnjs.')) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse.clone());
              });
            }
            return networkResponse;
          })
          .catch(() => {
            // Fallback for offline navigation requests
            if (event.request.mode === 'navigate') {
              return caches.match('./index.html');
            }
          })
      );
    })
  );
});