/* 컴팩스 매니저 서비스 워커 — 오프라인 완전 동작
   내용을 고칠 때는 CACHE 이름의 v 번호를 올린다.
   - 페이지·스크립트·스타일: 네트워크 우선(항상 최신), 실패하면 캐시
   - 이미지: 캐시 우선 + 백그라운드 갱신(빠른 로딩) */
const CACHE = "compex-manager-v10";

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
  "assets/compex_neck_pad_placement.jpg",
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
  "assets/stretch_4_doorway_pec.jpg",
  "assets/stretch_ham_1_supine_towel.jpg",
  "assets/stretch_ham_2_seated_reach.jpg",
  "assets/stretch_ham_3_elevated_hinge.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) =>
        Promise.all(
          PRECACHE.map((url) =>
            fetch(new Request(url, { cache: "reload" }))
              .then((res) => (res && res.ok ? cache.put(url, res) : null))
              .catch(() => null)
          )
        )
      )
      .then(() => self.skipWaiting())
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

/* 네트워크 우선 + 캐시 갱신 */
function networkFirst(event, req) {
  // 문서는 항상 서버에 물어 최신본을 받는다(중간 캐시 무시)
  // 스크립트·스타일도 HTTP 캐시(max-age)에 묶이지 않게 재검증한다
  const target =
    req.mode === "navigate"
      ? new Request(req.url, { cache: "reload", credentials: "same-origin" })
      : new Request(req.url, { cache: "no-cache" });
  event.respondWith(
    fetch(target)
      .then((res) => {
        if (res && res.ok && res.type === "basic") {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      })
      .catch(() =>
        caches.match(req, { ignoreSearch: true }).then((hit) => {
          if (hit) return hit;
          if (req.mode === "navigate") return caches.match("index.html").then((h) => h || caches.match("./"));
          return Response.error();
        })
      )
  );
}

/* 캐시 우선 + 백그라운드 갱신 */
function cacheFirst(event, req) {
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then((hit) => {
      if (hit) {
        fetch(req)
          .then((res) => {
            if (res && res.ok && res.type === "basic") caches.open(CACHE).then((c) => c.put(req, res.clone()));
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
        .catch(() => {
          if (req.mode === "navigate") return caches.match("index.html").then((h) => h || caches.match("./"));
          return Response.error();
        });
    })
  );
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // 다른 페이지(미리보기 등)는 그대로 네트워크로
  if (req.mode === "navigate" && !url.pathname.replace(/index\.html$/, "").endsWith("/compex-manager/")) return;

  if (req.destination === "image" || req.destination === "font") return cacheFirst(event, req);
  return networkFirst(event, req);
});
