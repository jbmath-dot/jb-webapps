const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const zlib=require('node:zlib');
const root=path.join(__dirname,'..');
const source=f=>fs.readFileSync(path.join(root,f),'utf8');
const weekly=JSON.parse(source('weekly-plans.json'));
function storage(){
 const data=new Map();let fail=null;
 return {data,getItem:k=>data.get(k)??null,removeItem:k=>data.delete(k),
 setItem(k,v){if(k===fail){fail=null;throw Error('quota')}data.set(k,String(v));},
 failOnce(k){fail=k}};
}
function apiContext(store=storage()){
 const ctx={window:{},URL,localStorage:store,document:{querySelector:()=>null},console};
 vm.createContext(ctx);
 vm.runInContext(source('kurly-members.js'),ctx);
 vm.runInContext(source('backup.js'),ctx);
 return {ctx,store,backup:ctx.window.FamilyMealBackup,prices:ctx.window.FamilyMealPrices};
}
function recipes(){
 const ctx={document:{getElementById:()=>({})}};
 vm.createContext(ctx);
 vm.runInContext(source('recipe-details.js').replace('  new MutationObserver(apply)','  globalThis.model=recipeModel;return;\n  new MutationObserver(apply)'),ctx);
 return (meal,kind)=>ctx.model(meal.title,kind==='B',Object.entries(meal.ingredients).map(([id,grams])=>({id,grams,name:weekly.catalog[id].name})));
}
test('all 63 recipes cook or serve every actual ingredient with its stated amount',()=>{
 const model=recipes();let count=0;
 for(const plan of Object.values(weekly.plans))for(const kind of ['B','L','D'])for(const meal of plan[kind]){
  const result=model(meal,kind);
  for(const [id,g] of Object.entries(meal.ingredients)){
   const expected=weekly.catalog[id].name+' '+Number(g).toLocaleString('ko-KR')+'g';
   assert.ok(result.steps.some(s=>/cook|serve/.test(s.role)&&s.text.includes(expected)),meal.title+': '+expected);
  }
  for(const season of result.seasonings){
   assert.ok(result.steps.some(s=>s.role===season.part+'-seasoning-prep'&&s.text.includes(season.mix)));
   assert.ok(result.steps.some(s=>s.role===season.part+'-seasoning-finish'&&s.text.includes(season.finish)));
  }
  count++;
 }
 assert.equal(count,63);
});
test('specific ingredient mismatches and breakfast quantities are corrected',()=>{
 const model=recipes();
 const breakfast=model(weekly.plans.B.B[3],'B').steps.map(s=>s.text).join('\n');
 assert.match(breakfast,/브로콜리.*익힙니다/);
 assert.doesNotMatch(breakfast,/과일|사과|바나나/);
 const microwave=model(weekly.plans.C.L[1],'L').steps.map(s=>s.text).join('\n');
 assert.match(microwave,/감자.*전자레인지용.*가열/);
 const spinach=model(weekly.plans.B.D[1],'D').steps.map(s=>s.text).join('\n');
 assert.match(spinach,/감자.*8~12분/);
 assert.doesNotMatch(spinach,/양파/);
 const stir=model(weekly.plans.B.D[4],'D');
 assert.match(stir.seasonings[0].mix,/물 2큰술/);
 assert.equal(stir.steps.filter(s=>s.role.startsWith('main-seasoning')).length,2);
});
test('dipping sauce with soup has no instruction to fry the sauce',()=>{
 const ctx={document:{createElement:()=>({}),head:{append(){}}}};
 vm.createContext(ctx);
 vm.runInContext(source('ready-sauces.js').replace('function recipe(){','globalThis.api={sauceSteps,CATALOG,candidates};return;\nfunction recipe(){'),ctx);
 const steps=ctx.api.sauceSteps({title:'돼지안심구이와 애호박국'},ctx.api.CATALOG.cutlet,30).join('\n');
 assert.match(steps,/어른 국에만/);
 assert.match(steps,/돈까스 소스 30g.*종지/);
 assert.doesNotMatch(steps,/소스 30g을 계량해 넣습니다|조리해 소스를 고루/);
 assert.equal(ctx.api.candidates({title:'닭고기 감자맑은탕',breakfast:false}).length,0);
});
const APP='family-meal-pwa-v1',MEM='family-meals-kurly-members-v1',SAUCE='family-meal-ready-sauces-v1';
const mainState=()=>({plan:'B',view:'shop',prices:{beef:12345},stock:{beef:50},packSizes:{beef:400},checked:{beef:true},links:{},closures:[{date:'2026-10-28',label:'휴원'}]});
function completeBackup(api){
 const verified={beef:{price:12345,url:'https://www.kurly.com/goods/123',rank:1,checked_at:new Date().toISOString(),source:'self-verified-members'}};
 const sauces={selected:{meal:{id:'cutlet',grams:30,week:'2026|10.24 — 10.30',plan:'B',title:'돼지안심구이와 애호박국',label:'점심'}},prices:{cutlet:4321},stock:{cutlet:17},include:{week:true},buyPacks:{week:2},checked:{week:true}};
 api.store.setItem(MEM,JSON.stringify(verified));api.store.setItem(SAUCE,JSON.stringify(sauces));
 return JSON.parse(JSON.stringify(api.backup.build(mainState(),weekly.plans,weekly.catalog)));
}
test('v2 backup round-trips verified price, confirmations, all sauce data and imported menus after reload',()=>{
 const origin=apiContext(),snapshot=completeBackup(origin),next=apiContext();
 const result=next.backup.restore(snapshot,{},weekly.plans,weekly.catalog);
 assert.equal(result.state.prices.beef,12345);
 assert.deepEqual(JSON.parse(next.store.getItem(MEM)),snapshot.members);
 assert.deepEqual(JSON.parse(next.store.getItem(SAUCE)),snapshot.sauces);
 const reloaded=apiContext(next.store);
 assert.equal(reloaded.prices.info('beef').price,12345);
 assert.equal(reloaded.prices.info('beef').label,'직접 확인가');
 assert.equal(reloaded.backup.imported().plans.B.B[3].title,weekly.plans.B.B[3].title);
});
test('legacy backup keeps entered price with unverified label; expired verification remains recorded',()=>{
 const api=apiContext();
 api.backup.restore({version:1,state:mainState(),plans:weekly.plans,catalog:weekly.catalog},{},weekly.plans,weekly.catalog);
 assert.equal(api.prices.info('beef').price,12345);
 assert.match(api.prices.info('beef').label,/미검증/);
 const b=completeBackup(api);
 b.members.beef.checked_at='2020-01-01T00:00:00.000Z';
 api.backup.restore(b,{},weekly.plans,weekly.catalog);
 assert.equal(api.prices.info('beef').price,9990);
 assert.equal(api.prices.info('beef').label,'참고가');
 assert.equal(api.prices.read().beef.checked_at,'2020-01-01T00:00:00.000Z');
});
test('invalid import and quota failure do not partially replace saved state',()=>{
 const api=apiContext(),snapshot=completeBackup(api);
 api.store.setItem(APP,JSON.stringify({plan:'A'}));
 const before=JSON.stringify([...api.store.data].sort(([a],[b])=>a.localeCompare(b)));
 const invalid=JSON.parse(JSON.stringify(snapshot));invalid.sauces.stock.cutlet=-1;
 assert.throws(()=>api.backup.restore(invalid,{},weekly.plans,weekly.catalog));
 assert.equal(JSON.stringify([...api.store.data].sort(([a],[b])=>a.localeCompare(b))),before);
 api.store.failOnce(SAUCE);
 assert.throws(()=>api.backup.restore(snapshot,{},weekly.plans,weekly.catalog));
 assert.equal(JSON.stringify([...api.store.data].sort(([a],[b])=>a.localeCompare(b))),before);
});
function serviceWorker(){
 const base='https://jbmath-dot.github.io/jb-webapps/family-meals/';
 const data=new Map(),handlers={};let network=()=>new Response(JSON.stringify(weekly),{headers:{'Content-Type':'application/json'}});
 const url=r=>new URL(typeof r==='string'?r:r.url,base).href;
 const caches={
  async keys(){return [...data.keys()]},async delete(k){return data.delete(k)},
  async open(k){if(!data.has(k))data.set(k,new Map());const entries=data.get(k);return {
   async addAll(requests){for(const r of requests)entries.set(url(r),new Response('asset'));},
   async keys(){return [...entries.keys()].map(u=>new Request(u));},
   async put(r,response){entries.set(url(r),response.clone());},
   async match(r){return entries.get(url(r))?.clone();}
  }}
 };
 const ctx={URL,Request,Response,Headers,caches,fetch:async()=>network(),self:{registration:{scope:base},addEventListener:(k,f)=>handlers[k]=f,skipWaiting:async()=>{},clients:{claim:async()=>{}}}};
 vm.createContext(ctx);vm.runInContext(source('sw.js'),ctx);
 return {base,caches,network:f=>network=f,async dispatch(type,url){
  let promise;handlers[type]({request:url?new Request(url):undefined,waitUntil:p=>promise=p,respondWith:p=>promise=p});return promise;
 }};
}
test('weekly plan survives changed query, offline, HTTP failures, malformed JSON and shell update',async()=>{
 const sw=serviceWorker();
 await sw.dispatch('install');
 const other=await sw.caches.open('other-jb-app-v1');await other.put(sw.base+'../other.html',new Response('other'));
 const old=await sw.caches.open('family-meal-v11-old');await old.put(sw.base+'weekly-plans.json?v=1',new Response(JSON.stringify(weekly)));
 await sw.dispatch('activate');
 assert.ok((await sw.caches.keys()).includes('other-jb-app-v1'));
 assert.ok(!(await sw.caches.keys()).includes('family-meal-v11-old'));
 for(const mode of [()=>{throw Error('offline')},()=>new Response('server error',{status:500}),()=>new Response('{}'),()=>new Response('<html>oops</html>')]){
  sw.network(mode);
  const response=await sw.dispatch('fetch',sw.base+'weekly-plans.json?v=99999');
  assert.equal(response.status,200);
  assert.equal(response.headers.get('X-Family-Meals-Source'),'cache');
  assert.equal((await response.json()).week_start,weekly.week_start);
 }
 assert.equal(await sw.dispatch('fetch','https://jbmath-dot.github.io/another-app/data.json'),undefined);
});
test('previous query-keyed weekly cache migrates before old shell deletion',async()=>{
 const sw=serviceWorker();
 const old=await sw.caches.open('family-meal-v11-old');
 await old.put(sw.base+'weekly-plans.json?v=123',new Response(JSON.stringify(weekly)));
 await sw.dispatch('activate');
 sw.network(()=>{throw Error('offline')});
 assert.equal((await (await sw.dispatch('fetch',sw.base+'weekly-plans.json?t=456')).json()).week_start,weekly.week_start);
});
test('bundle is valid JavaScript and recipe ingredient identity survives rendering',()=>{
 const b64=source('bundle-loader.js').match(/const b64="([^"]+)"/)[1];
 const [css,data,app]=JSON.parse(zlib.gunzipSync(Buffer.from(b64,'base64')));
 new vm.Script(data);new vm.Script(app);
 assert.ok(css.length>100);
 assert.match(app,/data-ingredient=/);
 assert.match(app,/FamilyMealBackup\.build\(state,plans,catalog\)/);
 assert.match(app,/priceLabel:info\.label/);
});

