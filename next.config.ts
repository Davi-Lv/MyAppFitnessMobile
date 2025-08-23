/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
};

const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
    runtimeCaching: [
        {
            urlPattern: '/',
            handler: 'CacheFirst',
            options: {
                cacheName: 'start-url-cache',
                expiration: {
                    maxEntries: 1,
                    maxAgeSeconds: 24 * 60 * 60, // 1 day
                },
            },
        },
        {
            urlPattern: /^https?.*/,
            handler: 'NetworkFirst',
            options: {
                cacheName: 'offline-cache',
                expiration: {
                    maxEntries: 200,
                    maxAgeSeconds: 24 * 60 * 60, // 1 day
                },
                cacheableResponse: {
                    statuses: [0, 200],
                },
            },
        },
        {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,
            handler: 'CacheFirst',
            options: {
                cacheName: 'images-cache',
                expiration: {
                    maxEntries: 60,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                },
            },
        },
        {
            urlPattern: /\.(?:js|css)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
                cacheName: 'static-assets-cache',
                expiration: {
                    maxEntries: 60,
                    maxAgeSeconds: 24 * 60 * 60, // 1 day
                },
            },
        },
        {
            urlPattern: /\.(?:woff|woff2|eot|ttf|otf)$/i,
            handler: 'CacheFirst',
            options: {
                cacheName: 'fonts-cache',
                expiration: {
                    maxEntries: 30,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                },
            },
        },
    ],
})

module.exports = withPWA(nextConfig)