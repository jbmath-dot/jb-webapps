/* Cache only this app. Keep the last valid weekly plan across shell upgrades. */
const CACHE='family-meal-v12-review-fixes';
const DATA_CACHE='family-meal-data-v1';
const SCOPE=self.registration.scope;
const WEEKLY=new URL('weekly-plans.json',SCOPE).href;
const ASSETS=['./','./index.html','./bundle-loader.js','./backup.js','./kurly-members.js','./recipe-details.js','./ready-sauces.js','./sauce-shopping-schedule.js','./manifest.webmanifest','./icons/icon.svg'];
function validWeekly(p){
  if(p?.version!==1||!/^\d{4}-\d{2}-\d{2}$/.test(p.week_start||'')||!p.catalog)return false;
  return ['A','B','C'].every(plan=>['B','L','D'].every(kind=>
    Array.isArray(p.plans?.[plan]?.[kind])&&p.plans[plan][kind].length===7&&
    p.plans[plan][kind].every(m=>typeof m?.title==='string'&&Array.isArray(m.steps)&&m.ingredients&&
      Object.entries(m.ingredients).every(([id,g])=>p.catalog[id]&&Number.isFinite(g)&&g>=0))));
}
async function tagged(response,source){
  const headers=new Headers(response.headers);
  headers.set('X-Family-Meals-Source',source);
  return new Response(await response.text(),{status:response.status,headers});
}
async function lastWeekly(){
  const cache=await caches.open(DATA_CACHE);
  let last=await cache.match(WEEKLY);
  if(last)return last;
  const keys=await caches.keys();
  for(const key of keys.filter(k=>k.startsWith('family-meal-')&&k!==DATA_CACHE).reverse()){
    const previous=await caches.open(key);
    for(const request of (await previous.keys()).reverse()){
      const url=new URL(request.url);
      if(url.origin+url.pathname!==WEEKLY)continue;
      const response=await previous.match(request);
      try{if(response?.ok&&validWeekly(await response.clone().json())){
        await cache.put(WEEKLY,response.clone());return response;
      }}catch{}
    }
  }
}
async function weekly(){
  try{
    const response=await fetch(WEEKLY,{cache:'no-store'});
    if(!response.ok||!validWeekly(await response.clone().json()))throw new Error('Invalid weekly plan');
    try{await (await caches.open(DATA_CACHE)).put(WEEKLY,response.clone());}catch{}
    return tagged(response,'network');
  }catch{
    const last=await lastWeekly();
    return last?tagged(last,'cache'):new Response('{"error":"offline"}',{status:503,headers:{'Content-Type':'application/json'}});
  }
}
self.addEventListener('install',event=>{
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE);
    await cache.addAll(ASSETS.map(path=>new Request(new URL(path,SCOPE),{cache:'reload'})));
    await weekly();
    await self.skipWaiting();
  })());
});
self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    await lastWeekly();
    const keys=await caches.keys();
    await Promise.all(keys.filter(key=>key.startsWith('family-meal-')&&key!==CACHE&&key!==DATA_CACHE).map(key=>caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch',event=>{
  const request=event.request,url=new URL(request.url);
  if(request.method!=='GET'||url.origin!==new URL(SCOPE).origin||!url.href.startsWith(SCOPE))return;
  if(url.origin+url.pathname===WEEKLY){event.respondWith(weekly());return;}
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    const hit=await cache.match(request);
    if(hit)return hit;
    const response=await fetch(request);
    if(response.ok){try{await cache.put(request,response.clone());}catch{}}
    return response;
  })());
});
