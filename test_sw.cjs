const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const code=fs.readFileSync(__dirname+'/public/sw.js','utf8');
const listeners={};const stores=new Map();let offline=false;
const response=(body)=>({ok:true,body,clone(){return response(body)},text:async()=>body});
const caches={
 open:async name=>{if(!stores.has(name))stores.set(name,new Map());const map=stores.get(name);return {
 addAll:async urls=>{for(const url of urls)map.set(url,response('DATA:'+url));},
 put:async (url,r)=>map.set(url,r),match:async url=>map.get(url)
 };},
 keys:async()=>Array.from(stores.keys()),delete:async n=>stores.delete(n),
 match:async req=>{const key=typeof req==='string'?req:new URL(req.url).pathname;for(const m of stores.values())if(m.has(key))return m.get(key);return null;}
};
const self={location:{origin:'https://echoshot-game.onrender.com'},addEventListener:(type,handler)=>listeners[type]=handler,skipWaiting:async()=>{},clients:{claim:async()=>{}}};
vm.runInNewContext(code,{self,caches,URL,Response,fetch:async request=>{if(offline)throw new Error('offline');return response('LIVE:'+request.url)}}, {filename:'sw.js'});
(async()=>{
 let promise;await listeners.install({waitUntil:x=>promise=x});await promise;
 assert.equal(stores.get('echoshot-static-v0.7').size,6);
 await listeners.activate({waitUntil:x=>promise=x});await promise;
 let result;const req={mode:'navigate',method:'GET',url:'https://echoshot-game.onrender.com/'};
 listeners.fetch({request:req,respondWith:x=>result=x});assert.equal((await result).body,'LIVE:'+req.url);
 offline=true;listeners.fetch({request:req,respondWith:x=>result=x});assert.equal((await result).body,'LIVE:'+req.url); // cached latest navigation
 console.log('PASS: Service worker precaches 6 assets, activates and serves cached game offline');
})().catch(e=>{console.error(e);process.exit(1)});
