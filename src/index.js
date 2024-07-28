const {transform} = require('../wasm.js')
 
self.addEventListener('install', event => {
  // Skip waiting to activate the new Service Worker immediately
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  // Claim clients immediately
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Intercept requests for ts scripts
  if (event.request.destination === 'script' && url.pathname.endsWith('.ts')) {
    event.respondWith(
      fetch(event.request)
        .then(response => response.text())
        .then(async text => {
          // Transpile
          const js = await transform(text, {})

          // Create a new response with the javascript content
          return new Response(js.code, {
            headers: { 'Content-Type': 'text/javascript' }
          });
        })
    );
  } else {
    // For other requests, do nothing special
    event.respondWith(fetch(event.request));
  }
});
