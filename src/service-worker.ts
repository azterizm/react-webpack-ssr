///<reference lib='webworker'/>

import { registerRoute } from "workbox-routing";
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { precacheAndRoute } from "workbox-precaching";

declare const self: ServiceWorkerGlobalScope

precacheAndRoute(self.__WB_MANIFEST)

registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({
    cacheName: 'pages',
    plugins: [ new CacheableResponsePlugin({ statuses: [200] }) ],
    networkTimeoutSeconds: 5
  })
)

registerRoute(
  'https://jsonplaceholder.typicode.com/todos',
  new StaleWhileRevalidate({
    cacheName:'todos-fetch',
    plugins: [
      new CacheableResponsePlugin({ statuses: [200] })
    ],
  }),
  'GET'
)

registerRoute(
  ({ request: { destination } }) =>
    destination === 'script' ||
    destination === 'style' ||
    destination === 'worker',
  new StaleWhileRevalidate({
    cacheName: 'assets',
    plugins: [
      new CacheableResponsePlugin({ statuses: [200] })
    ]
  })
)

registerRoute(
  ({ request: { destination } }) => destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new CacheableResponsePlugin({ statuses: [200] }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 30
      })
    ]
  })
)








