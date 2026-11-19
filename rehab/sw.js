/* 어깨 재활 가이드 — 오프라인 보조 서비스 워커
   홈 화면(및 이미 연 적 있는 가이드)을 캐시해 두었다가, 네트워크가 없을 때 저장본을 보여 줍니다.
   새로 연 화면을 보여 주고 뒤에서 최신본으로 갱신하므로, 가이드를 수정해 배포하면 다음에 열 때 최신 내용이 됩니다. */
const CACHE = 'rehab-v1';
const SHELL = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(SHELL))
      .catch(() => {})
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  let url;
  try { url = new URL(request.url); } catch (e) { return; }
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(request, { ignoreSearch: true }).then((cached) => {
      const network = fetch(request).then((response) => {
        if (response && response.ok && response.type === 'basic') {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy)).catch(() => {});
        }
        return response;
      }).catch(() => cached || caches.match('./index.html'));

      return cached || network;
    })
  );
});
