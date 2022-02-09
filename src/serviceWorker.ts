declare var self: ServiceWorkerGlobalScope;

const CACHE_NAME = 'static-cache-v1';

function onInstall(e: ExtendableEvent) {
    console.log('[ServiceWorker] Install');

    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[ServiceWorker] Pre-caching offline page');
            return cache.addAll(['/offline.html']);
        })
    );
    
    self.skipWaiting();
};

function onActivate(e: ExtendableEvent) {
    console.log('[ServiceWorker] Activate');
    
    // Remove previous cached data from disk.
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
                return;
            }));
        })
    );

    self.clients.claim();
};

function onFetch(e: FetchEvent): void {
    console.log('[ServiceWorker] Fetch', e.request.url);
    if (e.request.mode !== 'navigate') {
        // Not a page navigation, bail.
        return;
    }

    e.respondWith(
        fetch(e.request)
        .catch(async () => {
            const cache = await caches.open(CACHE_NAME);
            return await cache.match('offline.html')
        }) as Promise<Response>
    );
};

async function onPush(e: PushEvent) {    
    const data = e.data?.json();
    e.waitUntil(self.registration.showNotification(data.title, {
        body: data.message,
        icon: '/gfx/pooper.png',
        tag: 'pooper'
    }));
};

self.addEventListener('install', (e) => onInstall(e));
self.addEventListener('activate', (e) => onActivate(e));
self.addEventListener('fetch', (e) => onFetch(e));
self.addEventListener('push', (e) => onPush(e));

export {};