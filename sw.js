var cacheName = 'siteCache';
var urlsToCache = [
  '/',
  '/index.html',
  '/index.css',
  '/scripts/api.js',
  '/scripts/listings.js',
  '/scripts/map-context.js',
  '/scripts/market.js',
  '/scripts/view-switcher.js',
  '/media/icons/search.svg',
  '/media/icons/shopping-cart.svg',
  '/media/icons/map-2.svg',
];

self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(cacheName)
    .then(function (cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
    .catch(err => console.error)
  );

});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// // self.addEventListener('fetch', function (event) {

// //   event.respondWith(() => {

// //     console.log('trying network');

// //     fromNetwork(event.request, 400).catch(async slowResponse => {

// //       console.log('responding from cache!');

// //       try {
// //         return fromCache(event.request);
// //       }
// //       catch (err) {
// //         console.log('not cached, loading from (slow) network')
// //         return fetch(event.request);
// //       }
// //     })

// //   })

// // });

// self.addEventListener('fetch', function (event) {
//   event.respondWith(_ => {

//     try {
//       return fromNetwork(event.request, 400);
//     }
//     catch (err) {

//       caches.match(event.request)
//       .then(function (response) {
//         // Cache hit - return response
//         if (response) {
//           return response;
//         }
//         return fetch(event.request);
//       })
      
//     }
    
//   });
// });

// function fromNetwork(request, timeout) {
//   return new Promise(function (fulfill, reject) {

//     let timeoutId = setTimeout(reject, timeout);

//     fetch(request).then(response => {

//       clearTimeout(timeoutId);
//       fulfill(response);

//     }, reject);

//   });
// }

// function fromCache(request) {

//   return caches.open(cacheName).then(cache => {

//     return cache.match(request).then(function (matching) {
//       return matching || Promise.reject('no match');
//     });

//   });

// }