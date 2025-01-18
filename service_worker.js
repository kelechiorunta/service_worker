// /** Service worker file */

const CACHE_NAME = 'image-cache-v2'; // Update version to force a cache refresh
const CRITICAL_ASSETS = ['index.html']; // Always fetch these from the network

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
    }finally{
        console.log("Hello")
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

    event.waitUntil(
        ( async () => {
            // const clients = await self.clients.matchAll();
            //     clients.forEach((client) => {
            //         client.postMessage({ action: 'showSpinner' });
            //     });
            caches.open(CACHE_NAME).then((cache) => {
                console.log('Caching static assets');
            //     return cache.addAll([
            //    '/index.html', // Add your initial assets here
            //    '/styles.css',
            //    '/main.js',
            //    '/favicon.ico',
            //     ]);
            })
        })()
        
    );

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

// FORMER CODE
self.addEventListener('sync', (event) => {
    if (event.tag === 'sendMessages'){
        event.waitUntil(sendMessages())
    }
})

const sendMessages = async() => {
    try {
        // Retrieve messages from IndexedDB or local storage
        const message = JSON.parse(window.localStorage.getItem('messages'))//await getOutboxMessages(); // Assume this is implemented
    
        // Send messages to the server
        
          await fetch("/subscribe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(message),
          });
    
          // Optionally remove the message from the outbox after successful send
          window.localStorage.removeItem('messages');//await removeMessageFromOutbox(message.id); // Assume this is implemented
          console.log("All messages sent successfully.");
        }
       catch (err) {
        console.error("Failed to send messages:", err);
      }
}
