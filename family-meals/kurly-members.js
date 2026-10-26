/* 컬리멤버스 가격과 컬리 기본 검색 첫 상품만 수동 검증 후 계산에 반영.
   공개 판매가, 웹 검색 순위, 일반 API의 가격을 멤버스가로 오인하지 않음. */
(()=>{'use strict';
const KEY='family-meal-pwa-v1',MEM='family-meals-kurly-members-v1';
const read=()=>{try{return JSON.parse(localStorage.getItem(MEM)||'{}')||{}}catch{return {}}};
const urlCheck=str=>{try{const u=new URL(str);if(u.protocol!=='https:'||!['kurly.com','www.kurly.com'].includes(u.hostname))return null;const m=u.pathname.match(/^\/goods\/(\d+)(?:\/|$)/);return m?{id:m[1],url:'https://www.kurly.com/goods/'+m[1]}:null;}catch{return null;}};
const valid=v=>{const ms=Date.parse(v?.checked_at||'');return v?.rank===1&&Number.isSafeInteger(v?.price)&&v.price>0&&urlCheck(v?.url)&&Number.isFinite(ms)&&Date.now()>=ms&&Date.now()-ms<7*86400000;};
const fmt=v=>Number(v).toLocaleString('ko-KR');
const REFERENCE={"rice":9900,"kim":3990,"chicken":10170,"pork":9090,"neck":16900,"beef":9990,"fish":10900,"tofu":2200,"egg":4990,"zucchini":3090,"potato":3990,"onion":2290,"broccoli":4290,"carrot":2990,"spinach":4990,"frozen":6990,"cucumber":2990,"banana":4990,"apple":9900,"toast":4490,"oats":5980,"sweet":6990,"squash":4990,"dumpling":6990,"noodle":2990};
const estimate=id=>Number.isSafeInteger(REFERENCE[id])?REFERENCE[id]:null;
const NUM_REFERENCE=Object.keys(REFERENCE).length;

function priceInfo(id){
 const rec=read()[id];
 if(valid(rec))return {price:rec.price,label:'직접 확인가',checked_at:rec.checked_at};
 if(rec?.source==='legacy-backup'&&Number.isSafeInteger(rec.price)&&rec.price>0)return {price:rec.price,label:'직접 입력가(회원가 미검증)'};
 return {price:estimate(id),label:'참고가'};
}
window.FamilyMealPrices={reference:REFERENCE,valid,read,info:priceInfo};
const saved=read();
try{const s=JSON.parse(localStorage.getItem(KEY)||'null');if(s){if(s.prices&&!localStorage.getItem('family-meal-old-prices'))localStorage.setItem('family-meal-old-prices',JSON.stringify(s.prices));s.prices={...REFERENCE};for(const k of Object.keys(saved))s.prices[k]=priceInfo(k).price;localStorage.setItem(KEY,JSON.stringify(s));}}catch(e){console.warn('가격 초기화 건너뜀',e);}
const main=document.querySelector('#mainContent');if(!main)return;
let last=null;
function sync(f,val){if(f&&f.value!==String(val)){f.value=val;f.dispatchEvent(new Event('change',{bubbles:true}));return true;}return false;}
function draw(){
 const page=main.querySelector('.page');
 if(!page||!page.querySelector('[data-price]')){last=null;return;}
 if(last===page)return;last=page;
 const data=read();
 for(const field of page.querySelectorAll('input[data-price]')){
   const expected=String(priceInfo(field.dataset.price).price??'');
   if(sync(field,expected))return;
 }
 const head=document.createElement('aside');head.className='info-box';head.style.marginBottom='12px';
 head.textContent='장보기 기본 금액은 전체 '+NUM_REFERENCE+'종 식재료의 참고 예상가입니다(첫 구매 특별가 제외). 컬리멤버스 계정의 실제 가격이나 컬리 검색순서 첫 상품 가격으로 검증된 값은 아닙니다. 검색 1위 상품·회원가를 직접 확인해 저장하면 해당 값이 우선 적용됩니다. 총액 역시 참고 예상액이며 최종 결제금액이 아닙니다. 기본 양념·배송비·둘째 이유식은 제외하고, 선택한 시판 소스 금액은 별도로 합산합니다.';
 page.querySelector('.counter')?.insertAdjacentElement('afterend',head);
 const amountLabel=page.querySelector('.counter .stat:nth-child(2) .stat-label');if(amountLabel)amountLabel.textContent='식재료 참고 합계(직접 입력·확인가 포함)';
 for(const row of page.querySelectorAll('.shopitem')){
  const field=row.querySelector('input[data-price]');if(!field)continue;
  const id=field.dataset.price,rec=data[id],name=row.querySelector('.shopname')?.firstChild?.textContent?.trim()||id;
  field.readOnly=true;field.placeholder='참고예상가 / 직접 확인 멤버스가';
  const lbl=field.closest('label');if(lbl?.firstChild?.nodeType===3)lbl.firstChild.textContent='1팩 '+priceInfo(id).label+'(원)';
  const area=document.createElement('section');area.style.cssText='margin-top:12px;padding:12px;border-radius:12px;border:1px solid #b8d2c6;font-size:13px;line-height:1.6;';
  const title=document.createElement('strong');title.textContent='검색 첫 상품 · 멤버스 적용가';area.append(title);
  const msg=document.createElement('p');msg.style.margin='4px 0 8px';msg.textContent=valid(rec)?'검색 1위·컬리멤버스 가격 직접 확인: '+fmt(rec.price)+'원 ('+new Date(rec.checked_at).toLocaleDateString('ko-KR')+')':rec?.source==='legacy-backup'?'이전 백업 직접 입력가 '+fmt(rec.price)+'원 · 회원가 확인 기록 없음, 다시 확인해 주세요.':estimate(id)!==null?'참고 예상 1팩 '+fmt(estimate(id))+'원 · 일반적인 구매가 수준으로 가정한 값(실제 회원가/검색 1위 미검증)'+(rec?' · 이전 회원 확인 기록은 유효기간 또는 형식 확인이 필요해 계산에서 제외됨':''):'가격 참고값 없음 · 컬리 화면 확인 필요';area.append(msg);
  const search=document.createElement('a');search.href='https://www.kurly.com/search?sword='+encodeURIComponent(name);search.target='_blank';search.rel='noopener noreferrer';search.textContent='컬리에서 검색 맨 위 상품 확인 ↗';search.style.cssText='display:block;text-decoration:underline;margin-bottom:8px;color:#146d49';area.append(search);
  const url=document.createElement('input');url.type='url';url.placeholder='맨 위 상품 URL (https://www.kurly.com/goods/...)';url.value=rec?.url||'';url.style.cssText='width:100%;padding:9px;border:1px solid #abc7bb;border-radius:8px;margin-bottom:6px;';url.setAttribute('aria-label',name+' 검색 1위 상품 URL');area.append(url);
  const price=document.createElement('input');price.type='number';price.inputMode='numeric';price.min='1';price.max='10000000';price.placeholder='멤버스 1팩 가격(원)';price.value=rec?.price||'';price.style.cssText='width:100%;padding:9px;border:1px solid #abc7bb;border-radius:8px;margin-bottom:6px;';price.setAttribute('aria-label',name+' 멤버스 판매가');area.append(price);
  const confirm=document.createElement('label');confirm.style.cssText='display:block;margin:5px 0';const ck=document.createElement('input');ck.type='checkbox';confirm.append(ck,document.createTextNode(' 내 로그인 화면의 검색 첫 상품과 멤버스 가격을 직접 확인함'));area.append(confirm);
  const warn=document.createElement('div');warn.style.color='#a23131';warn.setAttribute('role','alert');area.append(warn);
  const btn=document.createElement('button');btn.type='button';btn.className='btn tiny';btn.textContent='확인한 첫 상품·멤버스가 저장';area.append(btn);
  btn.onclick=()=>{
    const product=urlCheck(url.value.trim()),amount=Number(price.value);
    if(!product){warn.textContent='컬리 첫 상품의 상세 페이지 주소를 확인하세요.';return;}
    if(!Number.isSafeInteger(amount)||amount<=0||amount>10000000){warn.textContent='실제 멤버스 1팩 가격을 입력하세요.';return;}
    if(!ck.checked){warn.textContent='검색 첫 상품과 멤버스 가격 확인에 체크해 주세요.';return;}
    const all=read();all[id]={url:product.url,product_id:product.id,price:amount,rank:1,checked_at:new Date().toISOString(),search_term:name,source:'self-verified-members'};
    try{localStorage.setItem(MEM,JSON.stringify(all))}catch{warn.textContent='기기에 저장할 수 없습니다.';return;}
    sync(main.querySelector('input[data-price="'+id+'"]'),String(amount));
    sync(main.querySelector('input[data-link="'+id+'"]'),product.url);
    window.FamilyMealApp?.refresh();
  };
  (row.children[1]||row).append(area);
 }
}
new MutationObserver(draw).observe(main,{childList:true});
draw();
})();