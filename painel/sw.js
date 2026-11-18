/* PAINEL FP — service worker. Troque a versão a cada publicação. */
const V = 'painel-fp-v37';
const SHELL = ['./', 'index.html', 'css/app.css?v=37', 'js/app.js?v=37','js/db.js?v=37','js/data.js?v=37','js/escritorio.js?v=37', 'manifest.json', 'escritorio.html', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'icons/apple-touch-icon.png', 'icons/logo-96.png'];

self.addEventListener('install', e => e.waitUntil(caches.open(V).then(c => c.addAll(SHELL))));

self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())
));

self.addEventListener('message', e => { if (e.data === 'skip') self.skipWaiting(); });

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.mode === 'navigate') { // rede primeiro, shell em cache se estiver offline
    e.respondWith(fetch(req).catch(() => caches.match('index.html')));
    return;
  }
  e.respondWith(caches.open(V).then(async c => { // stale-while-revalidate
    const hit = await c.match(req);
    const net = fetch(req).then(r => { if (r.ok) c.put(req, r.clone()); return r; }).catch(() => hit);
    return hit || net;
  }));
});

