/* 현창레미콘 앱용 보조 파일
   - 화면 파일(index.html 등)은 늘 인터넷에서 최신을 먼저 받고, 안 될 때만 저장해 둔 것을 씀
   - 구글 시트와 주고받는 자료(script.google.com)는 손대지 않음 */
const CACHE = "hc-app-v2";
const FILES = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png", "./admin.html", "./admin.webmanifest", "./admin-icon-192.png", "./admin-apple-touch-icon.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).catch(() => {})); self.skipWaiting(); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin) return;           // 다른 사이트(구글 등)는 그대로
  e.respondWith(fetch(req).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  }).catch(() => caches.match(req).then(r => r || caches.match("./index.html"))));
});
