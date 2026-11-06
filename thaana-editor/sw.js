const CACHE='thaana-pdf-v1.5';
const OWN=['/','/index.html','/icon.svg','/manifest.webmanifest'];
const TRUSTED=['cdn.jsdelivr.net','fonts.googleapis.com','fonts.gstatic.com'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(OWN)));self.skipWaiting();});
self.addEventListener('activate',event=>{event.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))),self.clients.claim()]));});
self.addEventListener('fetch',event=>{
 const r=event.request,url=new URL(r.url);
 if(r.method!=='GET'||(url.origin!==self.location.origin&&!TRUSTED.includes(url.hostname)))return;
 event.respondWith((async()=>{const cache=await caches.open(CACHE);try{const response=await fetch(r);if(response.ok||response.type==='opaque')cache.put(r,response.clone()).catch(()=>{});return response;}catch(err){const cached=await cache.match(r);if(cached)return cached;throw err;}})());
});