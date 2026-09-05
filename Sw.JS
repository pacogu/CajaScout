// Service worker mínimo para que Caja Scout se pueda instalar como app.
// No cachea nada de forma agresiva: solo cumple con el requisito técnico
// de tener un service worker registrado para que el navegador ofrezca
// "Instalar app". Los datos siempre se piden en vivo a Firestore.

self.addEventListener('install', function (event) {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function (event) {
  // Deja pasar todas las peticiones tal cual (sin caché) — así los datos
  // de ventas y reportes siempre están al día.
  event.respondWith(fetch(event.request).catch(function () {
    return caches.match(event.request);
  }));
});
