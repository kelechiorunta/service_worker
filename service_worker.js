/** Service worker file */

const storeInCache = async (req, res) => {
    const cache = await caches.open('image-cache');
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

self.addEventListener('install', () => {
    console.log("Service Worker: Installed");
});

const enableNavigationPreload = async () => {
    if (self.registration.navigationPreload) {
        // Enable navigation preload
        await self.registration.navigationPreload.enable();
    }
};

self.addEventListener('activate', (event) => {
    event.waitUntil(enableNavigationPreload());
});

self.addEventListener('fetch', (event) => {
    // Use waitUntil to ensure the preloadResponse promise is properly awaited
    event.waitUntil(
        (async () => {
            const preloadResponse = await event.preloadResponse;
            event.respondWith(
                cacheFirst({
                    req: event.request,
                    preloadResponse: preloadResponse,
                })
            );
        })()
    );
});

