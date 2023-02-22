const CACHE_NAME = 'my-simple_pwa-cache';
const urlsToCache = [
	'/',
	'/index.html',
	'/manifest.json',
	'/images/icons/logo192.png',
	'/images/icons/logo512.png'
];

self.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then(function (cache) {
				console.log('Cache opened');
				return cache.addAll(urlsToCache);
			})
	);
});

self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request)
			.then(function (response) {
				if (response) {
					return response;
				}

				return fetch(event.request);
			})
	);
});
