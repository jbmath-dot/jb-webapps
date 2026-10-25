/* Our Family Meals | optional ready-made sauces. Does not replace homemade sauces by default. */
(function(){
"use strict";
const KEY="family-meal-ready-sauces-v1";
const CATALOG={
 bulgogi:{name:"[백설] 소불고기양념",variant:"500g",pack:500,price:3480,priceType:"public-displayed",url:"https://www.kurly.com/goods/5109951",dose:65,kind:"불고기",time:"중불 2~3분",notes:"500g 상품 설명은 쇠고기 2kg 사용량을 안내합니다. 어른 음식에 쓰는 약 60~70g은 출발점이며 제품 설명에 맞춰 조절하세요.", allergens:"대두·밀 함유"},
 teriyaki:{name:"[청정원] 데리야끼 소스",variant:"250g",pack:250,price:3180,priceType:"public-displayed",url:"https://www.kurly.com/goods/1001489168",dose:30,kind:"구이·볶음",time:"중불 1~2분",notes:"먼저 25~35g으로 맛을 보고 필요한 경우 조금 더 넣으세요. 달고 짠 소스이므로 간장·올리고당을 중복해서 넣지 마세요.",allergens:"제품 원재료·알레르기 정보 확인"},
 jjimdak:{name:"[다담] 안동찜닭 양념",variant:"220g",pack:220,price:2550,priceType:"estimated-option",url:"https://www.kurly.com/goods/1000929861",dose:75,kind:"닭조림",time:"중약불 3~5분",notes:"컬리 10종 옵션 중 '안동찜닭 양념 220g'을 선택하세요. 조리 전 제품 포장지의 고기 대비 양념 비율·권장 물 양을 우선 확인하세요.",allergens:"제품 원재료·알레르기 정보 확인"},
 tofu:{name:"[다담] 매콤두부조림 양념",variant:"140g",pack:140,price:2550,priceType:"estimated-option",url:"https://www.kurly.com/goods/1000929861",dose:50,kind:"어른 두부조림",time:"중약불 2~4분",notes:"매콤한 맛입니다. 첫째 몫은 양념 전 분리하고 어른에게만 사용하세요. 컬리 옵션에서 매콤두부조림 140g을 정확히 선택하세요.",allergens:"매운맛·알레르기 정보 확인"},
 cutlet:{name:"[백설] 돈까스 소스",variant:"255g",pack:255,price:2680,priceType:"public-displayed",url:"https://www.kurly.com/goods/1000197125",dose:30,kind:"돼지고기 찍먹",time:"조리 후 접시에 따로",notes:"돼지고기구이에 어른용으로 곁들이는 소스입니다. 볶거나 조리는 양념으로 사용하지 마세요.",allergens:"토마토·밀·대두·돼지고기·쇠고기 함유"}
};
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const money=n=>Number(n).toLocaleString("ko-KR")+"원";
function read(){try{return JSON.parse(localStorage.getItem(KEY)||"{}")||{}}catch{return {};}}
function save(d){try{localStorage.setItem(KEY,JSON.stringify(d));return true}catch{return false;}}
function week(){const x=($("#deliveryText")?.textContent||"").match(/(\d{4})년/);return(x?x[1]:"0000")+"|"+($("#weekHeading")?.textContent||"week");}
function plan(){return $(".plan.active strong")?.textContent?.trim()||"B";}
function context(){
 const root=$("#dialogContent");const head=$("h2",root),eye=$(".eyebrow",root);
 if(!head||!eye||!$(".ingredient-chips",root)||!$("#familyRecipeExpanded"))return null;
 const title=head.textContent.trim(),label=eye.textContent.trim();
 return {title,label,plan:plan(),week:week(),key:week()+"|"+plan()+"|"+label+"|"+title,breakfast:/아침/.test(label)};
}
function candidates(ctx){
 if(ctx.breakfast)return [];
 const t=ctx.title;
 // Sauces are for the main dish only. The separate soup stays homemade.
 const result=[];
 if(/한우|소고기|불고기/.test(t)&&/불고기|구이|볶음|양파찜|당근조림/.test(t))result.push("bulgogi","teriyaki");
 if(/닭|찜닭/.test(t)&&/구이|볶음|조림|감자|채소/.test(t))result.push("teriyaki","jjimdak");
 if(/돼지|목살|등심|안심/.test(t)&&/구이|볶음|조림|찜/.test(t))result.push("teriyaki","cutlet");
 if(/두부/.test(t)&&/조림|볶음|덮밥/.test(t))result.push("tofu");
 return [...new Set(result)];
}
function el(tag,cl,txt){const v=document.createElement(tag);if(cl)v.className=cl;if(txt!==undefined)v.textContent=txt;return v;}
const styles=el("style");styles.textContent=
".rs-card{border:1px solid #a4ccba;padding:14px;border-radius:14px;margin:15px 0;background:var(--card,#fff)}"+
".rs-card h3,.rs-shopping h3{margin:3px 0 8px;font-size:17px}"+
".rs-note{font-size:12px;line-height:1.65;color:#586a62;margin:6px 0}"+
".rs-buttons{display:flex;gap:6px;flex-wrap:wrap;margin:10px 0}"+
".rs-option{border:1px solid #a8bdb1;background:#fff;padding:8px 10px;border-radius:9px;font-size:12px;color:#233c33}"+
".rs-option.active{background:#173d33;color:white;border-color:#173d33}"+
".rs-product{padding:10px;border-radius:10px;background:#edf5ef;margin-top:10px;font-size:13px;line-height:1.6}"+
".rs-product a{color:#086343;text-decoration:underline}"+
".rs-qty{display:flex;align-items:center;gap:6px;margin:8px 0;flex-wrap:wrap}"+
".rs-qty input{min-width:70px;max-width:100px;border:1px solid #9fb4a8;border-radius:8px;padding:7px}"+
".rs-steps{padding-left:22px;font-size:13px;line-height:1.75}"+
".rs-steps li{margin-bottom:7px}"+
".rs-shopping{padding:14px;border:1px solid #a8c9b7;border-radius:13px;margin:15px 0}"+
".rs-shop-row{padding:12px 0;border-top:1px solid #d8e1d9;line-height:1.6;font-size:13px}"+
".rs-shop-row label{display:inline-flex;align-items:center;gap:6px;margin-right:8px;font-size:12px}"+
".rs-shop-row input[type=number]{width:92px;padding:6px;border:1px solid #b5c4b8;border-radius:7px}"+
".rs-total{font-weight:750;font-size:14px;padding:10px 0}";document.head.append(styles);
let currentContext="";
function selectedData(ctx){return read().selected?.[ctx.key]||null;}
function writeSelection(ctx,id,amount){
 const d=read();d.selected=d.selected||{};
 if(!id){delete d.selected[ctx.key];}
 else{d.selected[ctx.key]={id,grams:amount,plan:ctx.plan,week:ctx.week,title:ctx.title,label:ctx.label};}
 return save(d);
}
function sauceSteps(ctx,p,grams){
 const type=p.kind;
 const s=[
 "1. 기본 레시피의 재료표대로 고기·두부·채소를 손질합니다. 완성형 소스를 사용할 때는 별도의 간장·설탕·마늘 양념장을 미리 만들 필요가 없습니다.",
 "2. 팬 또는 냄비에서 고기·두부·채소를 먼저 충분히 익힙니다. 국이 있는 메뉴라면 국은 기존 레시피대로 별도로 만듭니다.",
 "3. 익힌 주요리에서 첫째 몫을 먼저 덜어냅니다(익힌 고기 약 40~50g 또는 두부 약 60~80g과 익힌 채소 30~60g은 예시량). 첫째 식판에는 소스를 넣지 않습니다.",
 "4. 어른용으로 남은 주요리에 완성형 소스 "+grams+"g을 계량해 넣습니다. 숟가락보다 저울 계량이 정확합니다. 필요하면 물 1~2큰술로 농도를 조절합니다.",
 "5. "+p.time+" 조리해 고루 묻힌 후 맛을 보고 추가 간장·올리고당을 중복해 넣지 않습니다. 소스 포장지의 조리법이 이 예시보다 우선합니다.",
 "6. 어른 두 사람의 접시에 나누어 담고, 아이는 미리 덜어 둔 싱거운 주재료와 흰밥을 따로 제공합니다."
 ];
 if(ctx.title.includes("국"))s.splice(3,0,"곁들임 국은 조리 후 아이용 싱거운 국물 80~120mL를 먼저 덜고, 어른 국에만 기존 상세 레시피의 국간장·마늘을 사용합니다. 완성형 소스를 국에 넣지 않습니다.");
 if(type==="돼지고기 찍먹"){s[3]="4. 어른 두 사람에게 소스 "+grams+"g을 작은 종지에 나누어 담습니다. 고기를 굽는 팬에 소스를 넣지 않습니다.";s[4]="5. 익힌 돼지고기를 어른 접시에 담아 소스를 찍어 먹습니다. 소스는 다시 가열하지 않아도 되며 제품 보관·사용 지침에 따릅니다.";}
 return s;
}
function recipe(){
 const ctx=context();if(!ctx)return;
 const allow=candidates(ctx);if(!allow.length)return;
 const d=$("#dialogContent");
 const signature=ctx.key;
 if(currentContext===signature&&$("#readySauceCard"))return;
 currentContext=signature;
 $("#readySauceCard")?.remove();
 const block=el("section","rs-card");block.id="readySauceCard";
 block.append(el("h3",null,"완성형 소스로 간편 조리 (선택)"));
 block.append(el("p","rs-note","기본은 수제 양념입니다. 제품을 선택한 경우 주요리의 직접 만든 양념을 대신하며, 첫째 몫을 먼저 덜어낸 뒤 어른 음식에만 사용합니다."));
 const row=el("div","rs-buttons");
 const items=[{id:"",name:"직접 양념"}].concat(allow.map(id=>({id,name:CATALOG[id].kind})));
 const saved=selectedData(ctx),active=allow.includes(saved?.id)?saved.id:"";
 items.forEach(item=>{
  const btn=el("button","rs-option"+(item.id===active?" active":""),item.name);btn.type="button";btn.onclick=()=>{
   const p=CATALOG[item.id];writeSelection(ctx,item.id,p?p.dose:0);currentContext="";recipe();shopping();
  };row.append(btn);
 });
 block.append(row);
 if(active){
   const p=CATALOG[active],grams=Math.min(250,Math.max(5,Number(saved?.grams||p.dose)));
   const product=el("div","rs-product");
   product.append(el("strong",null,p.name+" · "+p.variant));
   product.append(el("p","rs-note","참고 1팩 "+money(p.price)+" · "+(p.priceType==="estimated-option"?"옵션별 가격 미확인, 예상값":"컬리 공개 표시가 참고값")+" · 컬리 멤버스가·검색 1위 미검증"));
   const a=el("a",null,"컬리 상품 페이지에서 확인");a.href=p.url;a.target="_blank";a.rel="noopener noreferrer";product.append(a);
   const q=el("div","rs-qty");q.append(el("label",null,"이 메뉴에 사용할 양(어른 2명):"));
   const input=el("input");input.type="number";input.inputMode="numeric";input.min="5";input.max="250";input.step="5";input.value=String(grams);input.setAttribute("aria-label","어른용 소스 사용량 g");
   input.onchange=()=>{const val=Math.max(5,Math.min(250,Math.round(Number(input.value)||p.dose)));writeSelection(ctx,active,val);currentContext="";recipe();shopping();};q.append(input,el("span",null,"g"));product.append(q);
   product.append(el("p","rs-note",p.notes+" · "+p.allergens));
   const intro=el("strong",null,"완성형 소스를 선택했을 때 조리 순서");product.append(intro);
   const list=el("ol","rs-steps");
   sauceSteps(ctx,p,grams).forEach(step=>list.append(el("li",null,step.replace(/^\d\.\s*/,""))));
   product.append(list);block.append(product);
 }
 // Keep the detailed handmade recipe. Hide only the two MAIN-dish homemade
 // seasoning instructions when the ready-made sauce is selected.
 const handmade=$("#familyRecipeExpanded",d);
 const sections=$$(".family-recipe-section",handmade);
 sections.forEach((section,i)=>{if(i===0)section.style.display=active?"none":"";});
 const ol=$("ol",d);
 if(ol)$$("li",ol).forEach(li=>{
   const txt=li.textContent.trim();
   li.style.display=active&&(/^(양념장 미리 만들기|어른 양념 넣고 마무리):/.test(txt))?"none":"";
 });
 const chips=$(".ingredient-chips",d);
 (handmade||chips).insertAdjacentElement("afterend",block);
}
function shopping(){
 const root=$("#mainContent"),page=$(".page",root);
 if(!page||!page.querySelector(".shopitem"))return;
 // Idempotent; protect against MutationObserver loops.
 if($("#readySauceShopping",page))return;
 const currWeek=week(),currPlan=plan(),d=read(),selected=Object.entries(d.selected||{}).filter(([key,v])=>v.week===currWeek&&v.plan===currPlan&&CATALOG[v.id]);
 const grouped={};selected.forEach(([key,v])=>{const p=CATALOG[v.id];const g=grouped[v.id]||(grouped[v.id]={grams:0,meals:[]});g.grams+=Math.max(5,Number(v.grams)||p.dose);g.meals.push(v.label+": "+v.title);});
 const box=el("section","rs-shopping");box.id="readySauceShopping";
 box.append(el("h3",null,"선택한 완성형 소스 장보기"));
 box.append(el("p","rs-note","레시피에서 시판 소스를 선택하면 구매 목록에 자동으로 반영됩니다. 소스 한 병은 여러 끼에 공유하도록 합산하며 금액은 참고가격입니다."));
 let total=0,allPacks=0;
 Object.entries(grouped).forEach(([id,row])=>{
  const p=CATALOG[id],stored=d.stock?.[id]||0,net=Math.max(0,row.grams-stored),packs=Math.ceil(net/p.pack),price=(d.prices?.[id]??p.price),cost=packs*price;total+=cost;allPacks+=packs;
  const container=el("div","rs-shop-row");
  container.append(el("strong",null,p.name+" "+p.variant));
  container.append(el("div","rs-note","사용 "+row.grams+"g · 집에 있는 양 "+stored+"g · 구매 "+packs+"팩 · 계산상 남는 양 "+(stored+packs*p.pack-row.grams)+"g"));
  container.append(el("div","rs-note",row.meals.join(" / ")));
  const line=el("div","rs-qty");
  const stockL=el("label",null,"집에 보유(g)"),stock=el("input");stock.type="number";stock.min="0";stock.value=String(stored);stock.onchange=()=>{const x=read();x.stock=x.stock||{};x.stock[id]=Math.max(0,Number(stock.value)||0);save(x);box.remove();shopping();};stockL.append(stock);line.append(stockL);
  const priceL=el("label",null,"1팩 가격(원)"),costInput=el("input");costInput.type="number";costInput.min="0";costInput.value=String(price);costInput.onchange=()=>{const x=read();x.prices=x.prices||{};x.prices[id]=Math.max(0,Number(costInput.value)||0);save(x);box.remove();shopping();};priceL.append(costInput);line.append(priceL);container.append(line);
  const link=el("a",null,"컬리 상품 확인");link.href=p.url;link.target="_blank";link.rel="noopener noreferrer";link.style.cssText="color:#096649;text-decoration:underline;";container.append(link);
  const checkLabel=el("label");checkLabel.style.marginLeft="12px";
  const check=el("input");check.type="checkbox";const k=currWeek+"|"+currPlan+"|"+id;check.checked=!!d.checked?.[k];check.onchange=()=>{const x=read();x.checked=x.checked||{};x.checked[k]=check.checked;save(x);};checkLabel.append(check,document.createTextNode("구매함"));container.append(checkLabel);
  box.append(container);
 });
 if(!selected.length)box.append(el("p","rs-note","아직 선택한 완성형 소스가 없습니다. 오늘 또는 주간 식단에서 고기·두부 메뉴를 열고 소스를 선택할 수 있습니다."));
 const tail=el("div","rs-total","선택 소스 추가 구매금액 "+money(total)+" ("+allPacks+"팩)");
 box.append(tail);
 const baseText=$(".counter .stat:last-child .stat-val",page)?.textContent||"";
 const baseAmount=Number(baseText.replace(/[^\d]/g,""));
 if(baseAmount>0&&allPacks>0)box.append(el("div","rs-total","기본 식재료와 소스 합계 참고액 "+money(baseAmount+total)));
 box.append(el("p","rs-note","매운 양념은 어른만 사용합니다. 모든 소스는 밀·대두 등 알레르겐과 나트륨 함량을 제품 라벨에서 확인하세요. 둘째 이유식에는 사용하지 않습니다. 쿠폰·배송비·컬리멤버스가·재고와 상품 검색 첫 순위는 미확인입니다."));
 page.append(box);
}
const detail=$("#dialogContent"),main=$("#mainContent");
if(detail)new MutationObserver(()=>recipe()).observe(detail,{childList:true,subtree:true});
if(main)new MutationObserver(()=>shopping()).observe(main,{childList:true});
recipe();shopping();
})();