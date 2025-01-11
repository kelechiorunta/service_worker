// /** Service worker file */

// const storeInCache = async (req, res) => {
//     const cache = await caches.open('image-cache');
//     await cache.put(req, res);
// };

// const cacheFirst = async ({ req, preloadResponse }) => {
//     // Check if the request exists in the cache
//     const cachedResponse = await caches.match(req);
//     if (cachedResponse) {
//         return cachedResponse;
//     }

//     // Use the preload response if available
//     if (preloadResponse) {
//         console.info('Using preload response:', preloadResponse);
//         storeInCache(req, preloadResponse.clone());
//         return preloadResponse;
//     }

//     // Fallback to fetching from the network
//     try {
//         const networkResponse = await fetch(req.clone());
//         storeInCache(req, networkResponse.clone());
//         console.log('Fetched from network:', networkResponse);
//         return networkResponse;
//     } catch (err) {
//         console.error('Fetch failed:', err.message);
//         throw err;
//     }
// };

// self.addEventListener('install', () => {
//     console.log("Service Worker: Installed");
// });

// const enableNavigationPreload = async () => {
//     if (self.registration.navigationPreload) {
//         // Enable navigation preload
//         await self.registration.navigationPreload.enable();
//     }
// };

// self.addEventListener('activate', (event) => {
//     event.waitUntil(enableNavigationPreload());
// });

// const pattern1 = /^\/main.js/;
// const pattern2 = /^\/index.html/;


// self.addEventListener('fetch', (event) => {
//     const url = new URL(event.request.url);
//     //Use waitUntil to ensure the preloadResponse promise is properly awaited
//     //If the request does not involve styling or css static files then proceed
//     //to the cached store.
//     if (event.request.destination !== 'style' ){
//         event.waitUntil(
//             (async () => {
//                 const preloadResponse = await event.preloadResponse;
//                 event.respondWith(
//                     cacheFirst({
//                         req: event.request,
//                         preloadResponse: preloadResponse,
//                     })
//                 );
//             })()
//         );   
//     }
// });


const CACHE_NAME = 'image-cache-v2'; // Update version to force a cache refresh
const CRITICAL_ASSETS = ['main.js', 'index.html']; // Always fetch these from the network

const storeInCache = async (req, res) => {
    const cache = await caches.open(CACHE_NAME);
    await cache.put(req, res);
};

const cacheFirst = async ({ req, preloadResponse }) => {
    // Check if the request exists in the cache
    const cachedResponse = await caches.match(req);
    if (cachedResponse) {
        return cachedResponse;
    }

    // Use the preload response if available
    if (preloadResponse) {
        console.info('Using preload response:', preloadResponse);
        storeInCache(req, preloadResponse.clone());
        return preloadResponse;
    }

    // Fallback to fetching from the network
    try {
        const networkResponse = await fetch(req.clone());
        storeInCache(req, networkResponse.clone());
        console.log('Fetched from network:', networkResponse);
        return networkResponse;
    } catch (err) {
        console.error('Fetch failed:', err.message);
        throw err;
    }
};

// Always fetch critical assets from the network
const networkFirst = async ({ req }) => {
    try {
        const networkResponse = await fetch(req.clone());
        storeInCache(req, networkResponse.clone());
        console.log('Fetched critical asset from network:', req.url);
        return networkResponse;
    } catch (err) {
        console.error('Network fetch failed:', err.message);

        // Fallback to cache if network fetch fails
        const cachedResponse = await caches.match(req);
        if (cachedResponse) {
            return cachedResponse;
        }
        throw err;
    }
};

self.addEventListener('install', (event) => {
    console.log('Service Worker: Installed');
    // event.waitUntil(
    //     caches.open(CACHE_NAME).then((cache) => {
    //         console.log('Caching static assets');
    //         return cache.addAll([
    //             '/index.html', // Add your initial assets here
    //             '/styles.css',
    //             '/main.js',
    //             '/favicon.ico',
    //         ]);
    //     })
    // );
});

const enableNavigationPreload = async () => {
    if (self.registration.navigationPreload) {
        // Enable navigation preload
        await self.registration.navigationPreload.enable();
    }
};

self.addEventListener('activate', (event) => {
    event.waitUntil(
        (async () => {
            // Enable navigation preload
            await enableNavigationPreload();

            // Clean up old caches
            const cacheNames = await caches.keys();
            await Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Deleting old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })()
    );
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // // Use network-first strategy for critical assets
    // if (CRITICAL_ASSETS.includes(url.pathname)) {
    //     event.respondWith(
    //         networkFirst({ req: event.request })
    //     );
    //     return;
    // }

    // Use cache-first strategy for other requests
    if (event.request.destination !== 'style') {
        event.respondWith(
            (async () => {
                const preloadResponse = await event.preloadResponse;
                return cacheFirst({
                    req: event.request,
                    preloadResponse: preloadResponse,
                });
            })()
        );
    }
});

