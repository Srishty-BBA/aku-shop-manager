// House of Aku — service worker (offline support). Bump V when you update the app.
const V = 'aku-v5';
const CORE = ['./', 'index.html', 'manifest.json', 'icons/icon-192.png', 'icons/icon-512.png'].concat(
  ["images/MM-ANI-001.jpg", "images/MM-ANI-002.jpg", "images/MM-ANI-003.jpg", "images/MM-ANI-004.jpg", "images/MM-ANI-005.jpg", "images/MM-ANI-006.jpg", "images/MM-ANI-007.jpg", "images/MM-ANI-008.jpg", "images/MM-ANI-009.jpg", "images/MM-ANI-010.jpg", "images/MM-ANI-011.jpg", "images/MM-ANI-012.jpg", "images/MM-CRT-001.jpg", "images/MM-CRT-002.jpg", "images/MM-CRT-003.jpg", "images/MM-CRT-004.jpg", "images/MM-CRT-005.jpg", "images/MM-CRT-006.jpg", "images/MM-CRT-007.jpg", "images/MM-CRT-008.jpg", "images/MM-F1-001.jpg", "images/MM-F1-002.jpg", "images/MM-F1-003.jpg", "images/MM-F1-004.jpg", "images/MM-F1-005.jpg", "images/MM-F1-006.jpg", "images/MM-PAS-001.jpg", "images/MM-PAS-002.jpg", "images/MM-PAS-003.jpg", "images/MM-PAS-004.jpg", "images/NBM-ANI-BLD-A01.jpg", "images/NBM-ANI-BLD-A02.jpg", "images/NBM-ANI-BLD-A03.jpg", "images/NBM-ANI-BLD-A04.jpg", "images/NBM-ANI-BLD-A05.jpg", "images/NBM-ANI-BLD-A06.jpg", "images/NBM-ANI-BLD-A07.jpg", "images/NBM-ANI-BLD-A08.jpg", "images/NBM-ANI-BLD-B01.jpg", "images/NBM-ANI-BLD-B02.jpg", "images/NBM-ANI-BLD-B03.jpg", "images/NBM-ANI-BLD-B04.jpg", "images/NBM-ANI-BLD-C01.jpg", "images/NBM-ANI-BLD-C02.jpg", "images/NBM-ANI-BLD-C03.jpg", "images/NBM-ANI-CTE-A01.jpg", "images/NBM-ANI-CTE-A02.jpg", "images/NBM-ANI-CTE-A03.jpg", "images/NBM-ANI-CTE-A04.jpg", "images/NBM-ANI-CTE-A05.jpg", "images/NBM-ANI-CTE-A06.jpg", "images/NBM-ANI-CTE-A07.jpg", "images/NBM-ANI-CTE-A08.jpg", "images/NBM-ANI-DRK-A01.jpg", "images/NBM-ANI-DRK-A02.jpg", "images/NBM-ANI-DRK-A03.jpg", "images/NBM-ANI-DRK-A04.jpg", "images/NBM-ANI-DRK-A05.jpg", "images/NBM-ANI-DRK-A06.jpg", "images/NBM-ANI-DRK-A07.jpg", "images/NBM-ANI-DRK-A08.jpg", "images/NBM-ANI-DRK-A09.jpg", "images/NBM-ANI-DRK-A10.jpg", "images/NBM-ANI-DRK-A11.jpg", "images/NBM-ANI-DRK-A12.jpg", "images/NBM-ANI-DRK-A13.jpg", "images/NBM-ANI-DRK-A14.jpg", "images/NBM-ANI-DRK-A15.jpg", "images/NBM-ANI-DRK-A16.jpg", "images/NBM-INV-A01.jpg", "images/NBM-INV-A02.jpg", "images/NBM-INV-A03.jpg", "images/NBM-INV-A04.jpg", "images/NBM-INV-A05.jpg", "images/NBM-INV-A06.jpg", "images/NBM-INV-A07.jpg", "images/NBM-INV-A08.jpg", "images/NBM-JPV-A01.jpg", "images/NBM-JPV-A02.jpg", "images/NBM-JPV-A03.jpg", "images/NBM-JPV-A04.jpg", "images/NBM-JPV-A05.jpg", "images/NBM-JPV-A06.jpg", "images/NBM-JPV-A07.jpg", "images/NBM-JPV-A08.jpg"]
);
self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  e.respondWith(caches.match(r).then(hit => {
    const net = fetch(r).then(res => {
      if (res && res.status === 200 && (res.type === 'basic' || r.url.includes('fonts.g'))) {
        const copy = res.clone();
        caches.open(V).then(c => c.put(r, copy));
      }
      return res;
    }).catch(() => hit || (r.mode === 'navigate' ? caches.match('index.html') : undefined));
    return hit || net;
  }));
});
