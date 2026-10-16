// Guarda solo la portada (no guarda ningún dato de tus finanzas).
var CACHE = 'mis-finanzas-v2';
var ARCHIVOS = ['./', 'index.html', 'manifest.json', 'icon-192.png', 'icon-512.png'];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(ARCHIVOS); }));
  self.skipWaiting();
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }));
  self.clients.claim();
});
self.addEventListener('fetch', function (e) {
  if (new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).catch(function () { return caches.match(e.request); }));
});
