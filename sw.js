/* Retires the service worker left by the earlier app on this address: clears its caches,
   removes its local database, unregisters itself and reloads open tabs. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) await caches.delete(k);
    try { indexedDB.deleteDatabase('iriz-ipad'); } catch (err) {}
    await self.registration.unregister();
    for (const c of await self.clients.matchAll({ type: 'window' })) c.navigate(c.url);
  })());
});
