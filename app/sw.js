// HtetLingo Service Worker - Original Learning Studio Offline-First
const CACHE_NAME = 'htetlingo-v2.5.0';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './css/app.css',
  './css/learning.css',
  './js/sound.js',
  './js/searchEngine.js',
  './js/curriculum.js',
  './js/app.js',
  './js/data.js',
  './js/db.js',
  './js/speech.js',
  './js/supabaseClient.js',
  './js/revenueCat.js',
  './js/aiTutor.js',
  './data/common_errors.json',
  './data/grammar_handbook.json',
  './data/lexicon_quick.json',
  './data/eng_myan_quick.json',
  './data/female_names.json',
  './data/eng_eng_quick.json',
  './data/karen_words.json',
  './data/myanmar_common_words.json',
  './icons/icon.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[HtetLingo SW v2.2.0] Pre-caching original learning studio assets');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[HtetLingo SW] Clearing outdated cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Network-First with Cache Fallback strategy
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  if (url.origin === location.origin) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
          }
          return networkResponse;
        })
        .catch(() => caches.match(event.request).then((cached) => cached || (event.request.headers.get('accept')?.includes('text/html') ? caches.match('./index.html') : null)))
    );
  }
});
