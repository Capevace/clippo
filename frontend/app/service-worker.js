const log = console.info.bind(console, '[ServiceWorker]');

const cache = 'clippo-cache-' + serviceWorkerOption.versionHash;
const filesToCache = serviceWorkerOption.assets.concat(
  serviceWorkerOption.static
);

self.addEventListener('install', function(event) {
  log('Installed!');

  event.waitUntil(
    caches
      .open(cache) //open this cache from caches and it will return a Promise
      .then(function(cache) {
        //catch that promise
        log('Caching files');
        cache.addAll(filesToCache); //add all required files to cache it also returns a Promise
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    //it either expects a Response object as a parameter or a promise that resolves to a Response object
    caches
      .match(event.request) //If there is a match in the cache of this request object
      .then(function(response) {
        if (response) {
          log('[CACHE] ' + event.request.url);
          //returning response object
          return response;
        } else {
          log('[NETWORK] ' + event.request.url);
          //return promise that resolves to Response object
          return fetch(event.request);
        }
      })
  );
});

self.addEventListener('activate', function(event) {
  log('Activate');
  event.waitUntil(
    caches
      .keys() //it will return all the keys in the cache as an array
      .then(function(keyList) {
        //run everything in parallel using Promise.all()
        Promise.all(
          keyList.map(function(key) {
            if (key !== cache) {
              log('[REMOVED CACHE]', key);
              //if key doesn`t matches with present key
              return caches.delete(key);
            }
          })
        );
      })
  );
});
