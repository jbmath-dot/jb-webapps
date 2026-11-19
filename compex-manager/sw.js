/* 컴팩스 매니저 서비스 워커 — 오프라인 완전 동작
   내용을 고칠 때는 CACHE 이름의 v 번호를 올린다. */
const CACHE = "compex-manager-v3";

const PRECACHE = [
  "./",
  "index.html",
  "styles.css",
  "data.js",
  "app.js",
  "manifest.json",
  "icon-192.png",
  "icon-512.png",
  "apple-touch-icon.png",
  "assets/compex_sp4_buttons_guide.jpg",
  "assets/compex_double_snap_pad_wiring.jpg",
  "assets/compex_shoulder_pad_placement.jpg",
  "assets/compex_both_shoulders_placement.jpg",
  "assets/compex_both_scapula_pad_placement.jpg",
  "assets/compex_arm_pad_placement.jpg",
  "assets/compex_back_pad_placement.jpg",
  "assets/compex_abs_pad_placement.jpg",
  "assets/compex_thigh_glute_pad_placement.jpg",
  "assets/compex_calf_shin_pad_placement.jpg",
  "assets/stretch_1_pendulum.jpg",
  "assets/stretch_2_table_slide.jpg",
  "assets/stretch_3_external_rotation.jpg",
  "assets/stretch_4_doorway_pec.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // 페이지 이동: 네트워크 우선(항상 최신 index.html), 오프라인이면 캐시
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.ok && new URL(req.url).pathname.endsWith("/compex-manager/")) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put("index.html", copy));
          }
          return res;
        })
        .catch(() => caches.match("index.html").then((hit) => hit || caches.match("./")))
    );
    return;
  }

  // 그 외: 캐시 우선 + 백그라운드 갱신
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then((hit) => {
      if (hit) {
        fetch(req)
          .then((res) => {
            if (res && res.ok) caches.open(CACHE).then((c) => c.put(req, res.clone()));
          })
          .catch(() => {});
        return hit;
      }
      return fetch(req)
        .then((res) => {
          if (res && res.ok && res.type === "basic") {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => caches.match("index.html"));
    })
  );
});
