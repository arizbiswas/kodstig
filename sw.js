// Kodstigs service worker: gör appen installerbar och låter den starta offline.
// - Sidan (HTML) och config.js hämtas alltid från nätet först, så uppdateringar
//   syns direkt. Den sparade kopian används bara när nätet saknas.
// - Byggda filer i assets/ har unika namn och sparas när de används.
// - Milos AI-modell och WebLLM-filerna sparas aldrig här (de hanteras av WebLLM
//   själv), och inget från andra domäner (Supabase, modellservrar) sparas.
const CACHE = 'kodstig-v1';
const SKIP = /\/assets\/(lib|milo-worker|webllm-engine)-[^/]+\.js$|\.wasm$/;

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(['./', 'config.js', 'manifest.webmanifest', 'icons/icon-192.png'])).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== CACHE) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin || SKIP.test(url.pathname)) return;

  const networkFirst = req.mode === 'navigate' || url.pathname.endsWith('/config.js');
  if (networkFirst) {
    e.respondWith((async () => {
      try {
        const res = await fetch(req);
        if (res.ok) (await caches.open(CACHE)).put(req.mode === 'navigate' ? './' : req, res.clone());
        return res;
      } catch {
        return (await caches.match(req.mode === 'navigate' ? './' : req)) || Response.error();
      }
    })());
    return;
  }

  if (url.pathname.includes('/assets/') || url.pathname.includes('/icons/') || url.pathname.includes('/companions/')) {
    e.respondWith((async () => {
      const hit = await caches.match(req);
      if (hit) return hit;
      const res = await fetch(req);
      if (res.ok) (await caches.open(CACHE)).put(req, res.clone());
      return res;
    })());
  }
});
