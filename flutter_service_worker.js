// Retirement worker for users who still have the original Flutter PWA installed.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => ['flutter-app-cache', 'flutter-temp-cache', 'flutter-app-manifest'].includes(name)).map(name => caches.delete(name)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: 'window' });
    for (const client of clients) client.navigate(client.url);
  })());
});
