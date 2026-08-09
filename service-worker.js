// MetaLyzer Service Worker
// Strategy:
//  - App shell (HTML/manifest/icons): cache-first, so the app opens instantly and offline.
//  - Third-party CDN libraries (ExifReader, pdf.js, JSZip, pdf-lib, piexif, jsPDF):
//    stale-while-revalidate, so they still work offline after the first successful load
//    but get refreshed in the background when a connection is available.

const CACHE_VERSION = 'v1';
const SHELL_CACHE = `metalyzer-shell-${CACHE_VERSION}`;
const RUNTIME_CACHE = `metalyzer-runtime-${CACHE_VERSION}`;

const SHELL_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-72x72.png',
  './icons/icon-96x96.png',
  './icons/icon-128x128.png',
  './icons/icon-144x144.png',
  './icons/icon-152x152.png',
  './icons/icon-192x192.png',
  './icons/icon-384x384.png',
  './icons/icon-512x512.png',
  './icons/maskable-icon-512x512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32x32.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then((cache) => cache.addAll(SHELL_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== SHELL_CACHE && key !== RUNTIME_CACHE)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

function isCDNRequest(url) {
  return /cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net|unpkg\.com/.test(url);
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = request.url;

  // Never intercept the live reverse-geocoding lookups; always go to network.
  if (url.includes('nominatim.openstreetmap.org')) {
    return;
  }

  // Third-party libraries: stale-while-revalidate
  if (isCDNRequest(url)) {
    event.respondWith(
      caches.open(RUNTIME_CACHE).then((cache) =>
        cache.match(request).then((cached) => {
          const fetchPromise = fetch(request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                cache.put(request, networkResponse.clone());
              }
              return networkResponse;
            })
            .catch(() => cached);
          return cached || fetchPromise;
        })
      )
    );
    return;
  }

  // App shell: cache-first, fall back to network, fall back to cached index.html for navigations
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && request.url.startsWith(self.location.origin)) {
            const clone = networkResponse.clone();
            caches.open(SHELL_CACHE).then((cache) => cache.put(request, clone));
          }
          return networkResponse;
        })
        .catch(() => {
          if (request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
    })
  );
});
