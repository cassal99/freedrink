const CACHE_NAME = 'eurospin-nfc-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Installa il Service Worker e salva i file nella cache locale
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

// Attiva il Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// Gestisce le richieste offline usando la cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
