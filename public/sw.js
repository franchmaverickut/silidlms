// Service Worker — network-first for all JS/CSS to prevent stale React chunk errors
const CACHE_NAME = 'silid-cache-v2';

// Never cache-first these — always go to network
const NO_CACHE_PATTERNS = [
  /\/src\//,
  /\/node_modules\//,
  /\/@vite\//,
  /\/@react-refresh/,
  /\.js(\?|$)/,
  /\.jsx(\?|$)/,
  /\.ts(\?|$)/,
  /\.tsx(\?|$)/,
  /\.css(\?|$)/,
];

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // Always network-first for JS/CSS and Vite internals
  const skipCache = NO_CACHE_PATTERNS.some(p => p.test(url.pathname + url.search));
  if (skipCache || e.request.method !== 'GET') {
    e.respondWith(fetch(e.request));
    return;
  }

  // Network-first for everything else too (simple and safe)
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
