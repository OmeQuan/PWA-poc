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


self.addEventListener('push', function (event) {
  if (event.data) {
    pushdata = JSON.parse(event.data.text())
    console.log('Service Worker: I received this:', pushdata)
    if (pushdata['title'] != '' && pushdata['message'] != '') {
      const options = {
        icon: 'images/icons/android-chrome-192x192.png',
        body: pushdata['message'],
        vibrate: [500, 10, 500],
        actions: [
          {
            action: 'explore', title: 'Explore this new world',
            icon: 'images/feather/android-chrome-192x192.png'
          },
          {
            action: 'close', title: 'Close',
            icon: 'images/icons/android-chrome-192x192.png'
          },
        ]
      }
      self.registration.showNotification(pushdata['title'], options)
    } else {
      console.log(
        "Service Worker: I didn't make a notification for the user, not all the info was there :("
      )
    }
  }
})

self.addEventListener('notificationclick', function (e) {
  var notification = e.notification;
  var action = e.action;

  if (action === 'close') {
    notification.close();
  } else {
    clients.openWindow('https://i399015.hera.fhict.nl');
    notification.close();
  }
});

self.addEventListener('notificationclose', function (e) {
});