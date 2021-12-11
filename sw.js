self.addEventListener("install" , e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll([
                "./",
                "./style.css",
                "./script.js",
                "./icon/favicon.ico",
                "./icon/simon128.png",
                "./icon/simon512.png",
                "./sound/click.wav",
                "./sound/lose.wav",
                "./sound/lose1.wav"
            ])
        })
    )
})

self.addEventListener("fetch", e =>{
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request)
        })
    )
})