self.addEventListener('install', event => {
    console.log('Service Worker installing.');
    // 可以在这里缓存静态资源
});

self.addEventListener('fetch', event => {
    console.log('Fetching:', event.request.url);
});
