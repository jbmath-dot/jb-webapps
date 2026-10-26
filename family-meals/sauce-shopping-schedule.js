/* Meal plan ↔ ready-made sauce planning: visible in shopping without recipe selection */
(()=>{"use strict";
const KEY="family-meal-ready-sauces-v1",APP="family-meal-pwa-v1";
const SAUCES={
 bulgogi:{name:"[백설] 소불고기양념",pack:500,price:3480,dose:65,url:"https://www.kurly.com/goods/5109951",method:"어른용 고기를 익히고 첫째 몫을 덜어낸 뒤 양념을 넣어 중불 2~3분 볶기"},
 teriyaki:{name:"[청정원] 데리야끼 소스",pack:250,price:3180,dose:30,url:"https://www.kurly.com/goods/1001489168",method:"고기와 채소를 익혀 아이 몫을 뺀 후 소스를 넣고 중불 1~2분 볶기"},
 jjimdak:{name:"[다담] 안동찜닭 양념(옵션 220g)",pack:220,price:2550,dose:75,url:"https://www.kurly.com/goods/1000929861",method:"닭과 감자를 익혀 아이 몫을 덜고, 어른 분량에 소스를 넣어 중약불 3~5분 조리(포장 조리법 우선)"},
 tofu:{name:"[다담] 매콤두부조림 양념(옵션 140g)",pack:140,price:2550,dose:50,url:"https://www.kurly.com/goods/1000929861",method:"두부와 채소를 익혀 아이 몫을 덜고 어른 몫만 소스에 중약불 2~4분 조리(매운맛)"},
 cutlet:{name:"[백설] 돈까스 소스",pack:255,price:2680,dose:30,url:"https://www.kurly.com/goods/1000197125",method:"돼지고기를 익힌 후 어른 접시에만 소스를 종지에 덜어 찍어 먹기"}
};
const H=new Set(["2026-01-01","2026-02-16","2026-02-17","2026-02-18","2026-03-01","2026-03-02","2026-05-01","2026-05-05","2026-05-24","2026-05-25","2026-06-03","2026-06-06","2026-07-17","2026-08-15","2026-08-17","2026-09-24","2026-09-25","2026-09-26","2026-10-03","2026-10-05","2026-10-09","2026-12-25","2027-01-01","2027-02-06","2027-02-07","2027-02-08","2027-02-09","2027-03-01","2027-05-01","2027-05-03","2027-05-05","2027-05-13","2027-06-06","2027-07-17","2027-07-19","2027-08-15","2027-08-16","2027-09-14","2027-09-15","2027-09-16","2027-10-03","2027-10-04","2027-10-09","2027-10-11","2027-12-25","2027-12-27"]);
const DAY=["토","일","월","화","수","목","금"];
const $=(s,r=document)=>r.querySelector(s);
const mk=(tag,cls,txt)=>{const x=document.createElement(tag);if(cls)x.className=cls;if(txt!==undefined)x.textContent=txt;return x;};
const read=k=>{try{return JSON.parse(localStorage.getItem(k)||"{}")||{}}catch{return {}};};
const save=x=>{try{localStorage.setItem(KEY,JSON.stringify(x));return true}catch{return false;}};
const fmt=n=>Number(n).toLocaleString("ko-KR");
const pad=n=>String(n).padStart(2,"0");
const dateString=d=>d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());
function selectedPlan(){return $(".plan.active strong")?.textContent?.trim()||read(APP).plan||"B";}
function selectedWeek(){
 const header=($("#weekHeading")?.textContent||"").match(/(\d{1,2})\.(\d{1,2})/);
 const year=($("#deliveryText")?.textContent||"").match(/(\d{4})년/);
 if(!header||!year)return null;
 const d=new Date(Number(year[1]),Number(header[1])-1,Number(header[2]),12);
 return Number.isFinite(d.getTime())?d:null;
}
function weekKey(){return ($("#deliveryText")?.textContent.match(/(\d{4})년/)||[])[1]+"|"+($("#weekHeading")?.textContent||"week");}
function plannedSauce(title){
 if(/국|탕|수프|죽/.test(title)&&!/구이와|볶음과/.test(title))return null;
 if(/불고기|한우/.test(title))return "bulgogi";
 if(/소고기/.test(title)&&/구이|볶음|조림|찜/.test(title))return "bulgogi";
 if(/닭/.test(title)&&/구이|에어프라이어/.test(title))return "teriyaki";
 if(/닭/.test(title)&&/조림|찜|감자/.test(title))return "jjimdak";
 if(/닭/.test(title)&&/볶음|채소/.test(title))return "teriyaki";
 if(/돼지|목살|등심|안심/.test(title)&&/구이/.test(title))return "cutlet";
 if(/돼지|목살|등심|안심/.test(title)&&/볶음|조림|찜/.test(title))return "teriyaki";
 if(/두부/.test(title)&&/조림|볶음|덮밥/.test(title))return "tofu";
 return null;
}
function canUse(id,title){
 if(/국|탕|수프|죽/.test(title)&&!/구이와|볶음과/.test(title))return false;
 if(!id||!SAUCES[id])return false;
 if(id==="bulgogi")return /불고기|소고기|한우/.test(title)&&/불고기|구이|볶음|조림|찜/.test(title);
 if(id==="jjimdak")return /닭/.test(title)&&/구이|볶음|조림|찜|감자|채소/.test(title);
 if(id==="teriyaki")return /닭|돼지|목살|등심|안심|소고기/.test(title)&&/구이|볶음|조림|감자|채소|찜|에어프라이어/.test(title);
 if(id==="cutlet")return /돼지|목살|등심|안심/.test(title)&&/구이|볶음|조림|찜/.test(title);
 if(id==="tofu")return /두부/.test(title)&&/조림|볶음|덮밥/.test(title);
 return false;
}
let synced=null;
function menus(){
 const start=selectedWeek();if(!start)return [];
 const s=read(APP),p=selectedPlan();
 const all=(synced?.week_start===dateString(start)?synced.plans:null)||window.MEAL_PLANS;
 const pack=all?.[p];if(!pack)return [];
 const out=[];
 for(let i=0;i<7;i++){
  const d=new Date(start);d.setDate(start.getDate()+i);
  for(const kind of ["L","D"]){
   const atHome=i<2||H.has(dateString(d))||(s.closures||[]).some(c=>c.date===dateString(d));
   if(kind==="L"&&!atHome)continue;
   const meal=pack[kind]?.[i];if(!meal?.title)continue;
   const label=(d.getMonth()+1)+"."+pad(d.getDate())+" "+DAY[i]+"요일 · "+(kind==="L"?"점심":"저녁")+" · 약 "+meal.mins+"분";
   out.push({date:pad(d.getMonth()+1)+"/"+pad(d.getDate())+"("+DAY[i]+")",type:kind==="L"?"점심":"저녁",title:meal.title,
    key:weekKey()+"|"+p+"|"+label+"|"+meal.title});
  }
 }
 return out;
}
function groups(){
 const from=read(KEY).selected||{};
 const out=Object.fromEntries(Object.keys(SAUCES).map(id=>[id,[]]));
 for(const meal of menus()){
  const sel=from[meal.key];
  const chosen=sel?.id&&canUse(sel.id,meal.title)?sel.id:null;
  const id=chosen||plannedSauce(meal.title);
  if(!canUse(id,meal.title))continue;
  out[id].push({...meal,chosen:!!chosen,grams:chosen?Math.max(5,Number(sel.grams)||SAUCES[id].dose):SAUCES[id].dose});
 }
 return out;
}
function refreshed(){
 const page=$("#mainContent > .page");
 if(!page||!$(".shopitem",page))return;
 $("#saucePlanShopping",page)?.remove();
 const view=mk("section","rs-shopping");view.id="saucePlanShopping";
 view.append(mk("h3",null,"이번 주 식단 연동 시판 소스"));
 view.append(mk("p","rs-note","레시피에서 미리 고르지 않아도 날짜별 추천 소스를 표시합니다. 각 소스를 눌러 어느 요일·어떤 메뉴에 몇 g 사용할지 확인하세요. 한 메뉴에는 한 가지 소스만 추천하며 다른 소스로 변경할 수도 있습니다."));
 view.append(mk("p","rs-note","추천만 표시된 소스는 구매합계에 포함하지 않습니다. '장보기 포함'을 선택하면 구매 수량과 금액이 추가됩니다. 레시피에서 이미 선택한 소스는 자동 포함됩니다."));
 const state=read(KEY),list=groups(),week=weekKey(),plan=selectedPlan();
 let sum=0,packSum=0,visible=0,included=0;
 const copySauces=[];
 for(const [id,rows] of Object.entries(list)){
  if(!rows.length)continue;
  visible++;
  const p=SAUCES[id],sel=rows.filter(r=>r.chosen);
  const k=week+"|"+plan+"|"+id;
  const bought=!!state.include?.[k];
  const active=bought||sel.length>0;
  const grams=rows.reduce((n,r)=>n+r.grams,0),selectedGrams=sel.reduce((n,r)=>n+r.grams,0);
  const stock=Math.max(0,Number(state.stock?.[id])||0);
  const estimatePacks=Math.ceil(Math.max(0,grams-stock)/p.pack);
  const autoPacks=Math.ceil(Math.max(0,(bought?grams:selectedGrams)-stock)/p.pack);
  const savedPacks=state.buyPacks?.[k];
  const packs=active?(Number.isInteger(savedPacks)&&savedPacks>=0?savedPacks:autoPacks):0;
  const price=Number(state.prices?.[id])>0?Number(state.prices[id]):p.price;
  if(active){included++;sum+=packs*price;packSum+=packs;}
  if(active&&packs>0)copySauces.push("□ "+p.name+": "+packs+"팩 ("+fmt(price)+"원/팩) / 사용: "+rows.map(r=>r.date+" "+r.type+" "+r.title+" "+r.grams+"g").join(", "));
  const card=mk("div","rs-shop-row");
  card.append(mk("strong",null,p.name));
  card.append(mk("p","rs-note",(sel.length?"레시피 직접 선택 "+sel.length+"회 · ":"")+"추천 적용 "+rows.length+"끼 · 각 메뉴 기준 총 "+fmt(grams)+"g · "+p.pack+"g/팩"));
  card.append(mk("p","rs-note","활용 날짜: "+[...new Set(rows.map(r=>r.date))].join(" · ")));
  const details=mk("details","rs-day-usage");
  const summary=mk("summary",null,"요일별 사용 메뉴·방법 펼쳐 보기 ("+rows.length+"끼)");
  details.append(summary);
  for(const r of rows){
   const line=mk("div","rs-day-item");
   line.append(mk("strong",null,r.date+" "+r.type+" · "+r.title+" · "+r.grams+"g"));
   line.append(mk("p","rs-note",(r.chosen?"레시피에 적용됨: ":"구매할 경우 추천: ")+p.method));
   details.append(line);
  }
  card.append(details);
  const row=mk("div","rs-qty");
  const choice=mk("label"),check=mk("input");check.type="checkbox";check.checked=active;check.disabled=sel.length>0;
  choice.append(check,document.createTextNode(sel.length?"레시피 선택으로 자동 포함":"장보기 포함"));
  check.onchange=()=>{const s=read(KEY);s.include=s.include||{};s.include[k]=check.checked;save(s);refreshed();};
  row.append(choice);
  const stockLabel=mk("label",null,"집에 보유(g)"),stockInput=mk("input");stockInput.type="number";stockInput.min="0";stockInput.value=String(stock);
  stockInput.onchange=()=>{const s=read(KEY);s.stock=s.stock||{};s.stock[id]=Math.max(0,Number(stockInput.value)||0);save(s);refreshed();};
  stockLabel.append(stockInput);row.append(stockLabel);
  const packLabel=mk("label",null,"구매 팩"),packInput=mk("input");packInput.type="number";packInput.min="0";packInput.step="1";packInput.value=String(packs);packInput.disabled=!active;
  packInput.onchange=()=>{const s=read(KEY);s.buyPacks=s.buyPacks||{};s.buyPacks[k]=Math.max(0,Math.floor(Number(packInput.value)||0));save(s);refreshed();};
  packLabel.append(packInput);row.append(packLabel);
  const moneyLabel=mk("label",null,"1팩 참고가(원)"),moneyInput=mk("input");moneyInput.type="number";moneyInput.min="1";moneyInput.value=String(price);
  moneyInput.onchange=()=>{const s=read(KEY);s.prices=s.prices||{};s.prices[id]=Math.max(1,Number(moneyInput.value)||p.price);save(s);refreshed();};
  moneyLabel.append(moneyInput);row.append(moneyLabel);
  card.append(row);
  card.append(mk("p","rs-note","이 소스가 추천된 모든 메뉴에 사용한다면 "+estimatePacks+"팩이 필요합니다(보유분 반영). 실제 레시피 선택에 따라 달라질 수 있습니다."));
  card.append(mk("p","rs-note",active?"장보기 반영액 "+fmt(packs*price)+"원":"미선택 · 장보기 금액 미포함 (참고 "+fmt(price)+"원/팩)"));
  const a=mk("a",null,"컬리 상품 확인");a.href=p.url;a.target="_blank";a.rel="noopener noreferrer";a.style.cssText="text-decoration:underline;color:#096649;font-size:13px;";card.append(a);
  if(active){
   const label=mk("label");label.style.marginLeft="12px";const tick=mk("input");tick.type="checkbox";
   const checkKey=week+"|"+plan+"|"+id;
   tick.checked=!!state.checked?.[checkKey];
   tick.onchange=()=>{const s=read(KEY);s.checked=s.checked||{};s.checked[checkKey]=tick.checked;save(s);};
   label.append(tick,document.createTextNode("구매 완료"));card.append(label);
  }
  view.append(card);
 }
 if(!visible)view.append(mk("p","rs-note","현재 플랜에서 이 제품들과 어울리는 메뉴가 없습니다."));
 view.append(mk("div","rs-total","선택한 시판 소스 추가 금액 "+fmt(sum)+"원 · "+packSum+"팩 / 전체 추천 "+visible+"종 중 "+included+"종 반영"));
 
 const copyButton=mk("button","btn secondary tiny","소스 포함 장보기 목록 복사");
 copyButton.type="button";
 copyButton.style.margin="12px 0 5px";
 copyButton.onclick=async()=>{
  const baseItems=Array.from(page.querySelectorAll(".shopitem")).flatMap(item=>{
   const label=$(".shopname",item)?.textContent?.trim()||"";
   const packs=$(".shopname .meta",item)?.textContent?.trim()||"";
   if(!packs||packs==="추가 구매 없음")return [];
   return ["□ "+label];
  });
  const lines=["우리집 식단 · "+week+" · 플랜 "+plan, ...baseItems,
   ...(copySauces.length?["[선택한 시판 소스]",...copySauces]:[])];
  try{await navigator.clipboard.writeText(lines.join("\n"));copyButton.textContent="전체 목록 복사 완료";}
  catch{copyButton.textContent="복사 불가 · 보안 연결 확인";}
 };
 view.append(copyButton);

 const v=$(".counter .stat:last-child .stat-val",page)?.textContent||"";
 const base=Number(v.replace(/[^\d]/g,""));
 if(base>0)view.append(mk("div","rs-total","기본 식재료와 선택 소스의 참고 합계 "+fmt(base+sum)+"원"));
 view.append(mk("p","rs-note","소스의 시판 참고가격은 현재 로그인 계정의 정확한 멤버스가가 아닙니다. 다담 옵션·알레르겐·보관법·용량은 컬리 상품 페이지에서 확인하세요. 국에는 주요리용 소스를 넣지 않습니다. 첫째용은 양념 전에 덜고 둘째 이유식에는 사용하지 않습니다."));
 const top=$(".btnrow",page);if(top)top.insertAdjacentElement("afterend",view);else page.append(view);
}
const style=mk("style");style.textContent=".rs-day-usage{background:#f2f7f1;border-radius:9px;padding:9px 12px;margin:10px 0}.rs-day-usage summary{cursor:pointer;font-size:13px;font-weight:700}.rs-day-item{border-top:1px solid #d8e4db;margin-top:8px;padding-top:7px}.rs-day-item strong{font-size:12px}.rs-day-item p{margin:3px 0 0}.rs-shop-row input[type=checkbox]{accent-color:#216544}";document.head.append(style);
const main=$("#mainContent");
if(main)new MutationObserver(()=>{const page=$("#mainContent > .page");if(page&&$(".shopitem",page)&&!$("#saucePlanShopping",page))refreshed();}).observe(main,{childList:true});
const dlg=$("#dialogContent");
if(dlg)new MutationObserver(()=>{if($("#saucePlanShopping"))refreshed();}).observe(dlg,{childList:true,subtree:false});
document.addEventListener("click",e=>{if(e.target.closest(".rs-option"))setTimeout(refreshed,0);});
refreshed();
fetch("./weekly-plans.json?t="+Date.now(),{cache:"no-store"}).then(r=>r.ok?r.json():null)
.then(v=>{if(v?.version===1&&v.plans&&v.week_start)synced=v;refreshed();}).catch(()=>{});
})();