const CACHE_NAME = "criczone-tv-shell-v1";
self.addEventListener("install", (event) => { self.skipWaiting(); });
self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    await self.clients.claim();
  })());
});
self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  // Do not cache live streams, API responses, or third-party requests.
  if (url.origin !== self.location.origin) return;
  if (request.destination === "video" || url.pathname.includes("/api/")) return;
  event.respondWith(fetch(request).catch(async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    throw new Error("Offline and no cached response available");
  }));
});
