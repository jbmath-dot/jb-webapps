/* 컬리멤버스 가격과 컬리 기본 검색 첫 상품만 수동 검증 후 계산에 반영.
   공개 판매가, 웹 검색 순위, 일반 API의 가격을 멤버스가로 오인하지 않음. */
(()=>{'use strict';
const KEY='family-meal-pwa-v1',MEM='family-meals-kurly-members-v1';
const read=()=>{try{return JSON.parse(localStorage.getItem(MEM)||'{}')||{}}catch{return {}}};
const urlCheck=str=>{try{const u=new URL(str);if(u.protocol!=='https:'||!['kurly.com','www.kurly.com'].includes(u.hostname))return null;const m=u.pathname.match(/^\/goods\/(\d+)(?:\/|$)/);return m?{id:m[1],url:'https://www.kurly.com/goods/'+m[1]}:null;}catch{return null;}};
const valid=v=>{const ms=Date.parse(v?.checked_at||'');return v?.rank===1&&Number.isSafeInteger(v?.price)&&v.price>0&&urlCheck(v?.url)&&Number.isFinite(ms)&&Date.now()>=ms&&Date.now()-ms<7*86400000;};
const fmt=v=>Number(v).toLocaleString('ko-KR');
const saved=read();
try{const s=JSON.parse(localStorage.getItem(KEY)||'null');if(s){if(s.prices&&!localStorage.getItem('family-meal-old-prices'))localStorage.setItem('family-meal-old-prices',JSON.stringify(s.prices));s.prices={};for(const [k,v]of Object.entries(saved))if(valid(v))s.prices[k]=v.price;localStorage.setItem(KEY,JSON.stringify(s));}}catch(e){console.warn('가격 초기화 건너뜀',e);}
const main=document.querySelector('#mainContent');if(!main)return;
let last=null;
function sync(f,val){if(f&&f.value!==String(val)){f.value=val;f.dispatchEvent(new Event('change',{bubbles:true}));return true;}return false;}
function draw(){
 const page=main.querySelector('.page');
 if(!page||!page.querySelector('[data-price]')){last=null;return;}
 if(last===page)return;last=page;
 const data=read();
 for(const field of page.querySelectorAll('input[data-price]')){
   const rec=data[field.dataset.price],expected=valid(rec)?String(rec.price):'';
   if(sync(field,expected))return;
 }
 const head=document.createElement('aside');head.className='info-box';head.style.marginBottom='12px';
 head.textContent='선정 기준: 컬리 로그인 화면에서 기본 검색순서 맨 위에 보이는 첫 상품. 금액 기준: 해당 상품의 컬리멤버스 적용가. 앱은 회원 계정의 검색 순위·멤버스 가격을 직접 조회할 수 없어 확인되지 않은 가격은 계산하지 않습니다.';
 page.querySelector('.counter')?.insertAdjacentElement('afterend',head);
 for(const row of page.querySelectorAll('.shopitem')){
  const field=row.querySelector('input[data-price]');if(!field)continue;
  const id=field.dataset.price,rec=data[id],name=row.querySelector('.shopname')?.firstChild?.textContent?.trim()||id;
  field.readOnly=true;field.placeholder='1위 상품 멤버스가만';
  const lbl=field.closest('label');if(lbl?.firstChild?.nodeType===3)lbl.firstChild.textContent='1팩 컬리 멤버스 확인가(원)';
  const area=document.createElement('section');area.style.cssText='margin-top:12px;padding:12px;border-radius:12px;border:1px solid #b8d2c6;font-size:13px;line-height:1.6;';
  const title=document.createElement('strong');title.textContent='검색 첫 상품 · 멤버스 적용가';area.append(title);
  const msg=document.createElement('p');msg.style.margin='4px 0 8px';msg.textContent=valid(rec)?'1위·멤버스 가격 직접 확인: '+fmt(rec.price)+'원 ('+new Date(rec.checked_at).toLocaleDateString('ko-KR')+')':rec?'이전에 확인한 가격은 7일이 지나 재확인이 필요합니다.':'첫 상품 및 멤버스 가격 확인 전';area.append(msg);
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
  };
  (row.children[1]||row).append(area);
 }
}
new MutationObserver(draw).observe(main,{childList:true});
draw();
})();