//See if the browser supports Service Workers, if so try to register one
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js").then(function (registering) {
    // Registration was successful
    console.log("Browser: Service Worker registration is successful with the scope", registering.scope);
  }).catch(function (error) {
    //The registration of the service worker failed
    console.log("Browser: Service Worker registration failed with the error", error);
  });
} else {
  //The registration of the service worker failed
  console.log("Browser: I don't support Service Workers :(");
}

self.addEventListener("install", (installing) => {
  console.log("Service Worker: I am being installed, hello world!");
});

self.addEventListener("activate", (activating) => {
  console.log("Service Worker: All systems online, ready to go!");
});

self.addEventListener("fetch", (fetching) => {
  console.log("Service Worker: User threw a ball, I need to fetch it!");
});

self.addEventListener("push", (pushing) => {
  console.log("Service Worker: I received some push data, but because I am still very simple I don't know what to do with it :(");
})