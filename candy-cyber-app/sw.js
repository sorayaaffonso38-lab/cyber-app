const CACHE = 'candy-cyber-v4';
const ASSETS = [
  'login.html', 'dashboard.html', 'cards.html',
  'payments.html', 'vault.html', 'statement.html', 'aura.html',
  'i18n.js', 'voice-agent.js', 'supabase.js', 'manifest.json',
  'icon-192.png', 'icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Network first for API calls, cache first for assets
  if (e.request.url.includes('anthropic.com') || e.request.url.includes('googleapis.com') || e.request.url.includes('supabase.co') || e.request.url.includes('openai.com')) return;
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
