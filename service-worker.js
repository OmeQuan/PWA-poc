const CACHE_NAME = "StaticV1"
const OFFLINE_URL = "/offline.html"
const FILES_TO_CACHE = [
  '/offline.html',
  '/css/stylesheet.css'
];

self.addEventListener("install", (installing) => {
  self.skipWaiting();
  console.log("Service Worker: I am being installed, hello world!");
  installing.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(FILES_TO_CACHE)
    })
  )
});

self.addEventListener("activate", (activating) => {
  console.log("Service Worker: All systems online, ready to go!");
});

self.addEventListener("fetch", (fetching) => {
  console.log("Service Worker: User threw a ball, I need to fetch it!");
  if (fetching.request.mode === 'navigate') {
    fetching.respondWith((async () => {
      try {
        const preloadResponse = await fetching.preloadResponse;
        if (preloadResponse) {
          return preloadResponse;
        }

        const networkResponse = await fetch(fetching.request);
        return networkResponse;
      } catch (error) {
        console.log('Fetch failed; returning offline page instead.', error);

        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(OFFLINE_URL);
        return cachedResponse;
      }
    })());
  }
});

self.addEventListener("push", (pushing) => {
  console.log("Service Worker: I received some push data, but because I am still very simple I don't know what to do with it :(");
})


