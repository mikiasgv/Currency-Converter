/**
 * Created by mikigv on 6/26/2018.
 */
var staticCacheName = 'currency-converter-v84';


self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            return cache.addAll([
                './',
                './index.html',
                './assets/css/main.css',
                './assets/js/idb.js',
                './assets/js/currencyAPI.js',
                './assets/js/main.js',
                './assets/image/bg1.png',
                './assets/image/favicon-16x16.png',
                'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/css/bootstrap.min.css',
                'https://use.fontawesome.com/releases/v5.1.0/css/all.css',


            ]);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter((cacheName) => {
                    return cacheName.startsWith('currency-converter-') &&
                        cacheName != staticCacheName;
                }).map((cacheName) => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    const requestURL = new URL(event.request.url);

    if(requestURL.origin === location.origin){
        if(requestURL.pathname === '/'){
            event.respondWith(caches.match('/'));
            return;
        }
    }


    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('message', (event) => {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});
