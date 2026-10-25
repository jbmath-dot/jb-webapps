/* Our Family Meals: verified Kurly goods links + optional recent price/sold-out feed.
   No guessed stock counts, no API keys in browser, and no stale prices treated as live. */
(() => {
  "use strict";
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
  const safeUrl = value => { try { const u = new URL(value); return u.protocol==="https:" && (u.hostname==="www.kurly.com"||u.hostname==="kurly.com") ? u.href : null; } catch {return null;} };
  const fmt = v => Number(v).toLocaleString("ko-KR");
  const search = n => "https://www.kurly.com/search?sword=" + encodeURIComponent(n);
  let catalog = {}, feed = {products:{},updated_at:null}, state="가격 공급자 연결 대기";
  const main = $("#mainContent");
  if(!main) return;
  let currentPage=null;
  function quotation(id){
    const q=feed.products?.[id]; if(!q||!feed.updated_at||!Number.isFinite(Number(q.price))||Number(q.price)<=0) return null;
    const ms=Date.parse(q.checked_at||feed.updated_at);
    if(!Number.isFinite(ms) || Date.now()-ms>2*60*60*1000 || Date.now()-ms<0) return null;
    const original=catalog[id]; if(original?.product_id && q.product_id && String(q.product_id)!==String(original.product_id)) return null;
    return q;
  }
  function dateTime(v){const t=Date.parse(v||"");return Number.isFinite(t)?new Date(t).toLocaleString("ko-KR",{month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}):"미확인";}
  async function fetchData(){
    state="정보 확인 중"; decorate(true);
    try{
      const [cat,quote]=await Promise.all([
        fetch("./kurly-products.json",{cache:"no-store"}).then(r=>r.ok?r.json():null),
        fetch("./kurly-price-feed.json?t="+Date.now(),{cache:"no-store"}).then(r=>r.ok?r.json():null)
      ]);
      catalog=cat?.version===1 && cat.products && typeof cat.products==="object" ? cat.products : {};
      const good=quote?.version===1 && quote.products && typeof quote.products==="object" && quote.updated_at;
      feed=good?quote:{products:{},updated_at:null};
      const n=Object.keys(feed.products).filter(k=>quotation(k)).length;
      state=n? `최근 확인 ${n}개 · ${dateTime(feed.updated_at)} 기준` : "가격 데이터 미연결 또는 2시간 초과";
    }catch{state="가격 서버 접근 불가 · 컬리에서 직접 확인";}
    decorate(true);
  }
  function decorate(force=false) {
    const page=$("#mainContent > .page");
    if(!page || !page.querySelector('[data-price]')){currentPage=null;return;}
    if(!force && page===currentPage) return;
    currentPage=page;
    const top=document.createElement("div");top.className="info-box";
    top.style.marginBottom="14px";
    const caption=document.createElement("div");caption.style.cssText="font-size:13px;line-height:1.6;";
    caption.textContent="마켓컬리 가격·품절 확인: "+state+". 최근 조회 결과는 배송지별 최종 주문가와 다를 수 있습니다.";
    const refresh=document.createElement("button");refresh.type="button";refresh.className="btn tiny";refresh.style.marginTop="9px";refresh.textContent="가격·품절 정보 새로고침";
    refresh.addEventListener("click",fetchData);
    top.append(caption,refresh);
    const sub=page.querySelector(".counter");
    if(sub)sub.insertAdjacentElement("afterend",top);else page.prepend(top);
    let estimated=0,quotedCount=0,unpriced=0,soldCount=0;
    $$(".shopitem",page).forEach(row=>{
      const input=$("input[data-price]",row);
      if(!input)return;
      const id=input.dataset.price,info=catalog[id];
      const name=$(".shopname",row)?.firstChild?.textContent?.trim()||id;
      const itemUrl=safeUrl(info?.url)||search(name);
      const q=quotation(id);
      const div=document.createElement("div");
      div.style.cssText="font-size:12px;line-height:1.6;padding-top:6px;";
      const a=document.createElement("a");a.href=itemUrl;a.target="_blank";a.rel="noopener noreferrer";a.className="textlink";a.textContent=info ? "확인된 컬리 상품 페이지 ↗" : "컬리 상품 검색 ↗";
      div.append(a);
      const status=document.createElement("div");status.style.marginTop="4px";
      if(q){
        status.textContent=`최근 조회가 ${fmt(q.price)}원 · ${q.sold_out===true?"품절 표시":q.sold_out===false?"판매 중 표시(수량 비공개)":"재고 확인 불가"} · ${dateTime(q.checked_at||feed.updated_at)}`;
        const quantity=row.querySelector(".shopname .meta")?.textContent||"";
        const packs=parseInt(quantity,10);
        if(Number.isFinite(packs)&&packs>0){estimated+=Number(q.price)*packs;quotedCount++;if(q.sold_out===true)soldCount++;}
        const apply=document.createElement("button");apply.className="textlink";apply.style.marginLeft="10px";apply.textContent="이 가격으로 계산";apply.type="button";
        apply.addEventListener("click",()=>{const latest=$(`input[data-price="${id}"]`);if(latest){latest.value=String(q.price);latest.dispatchEvent(new Event("change",{bubbles:true}));}});
        status.append(" ",apply);
      } else {
        status.textContent="현재 판매가·품절 상태 미확인 (기존 추정 가격으로 간주하지 않음)";
        unpriced++;
      }
      div.append(status);
      if(info?.pack_g){
        const packField=$("input[data-pack]",row);
        if(packField && parseInt(packField.value,10)!==info.pack_g){
          const caution=document.createElement("div");caution.textContent=`확인 상품 규격 ${info.pack_g}g (현재 계산 규격 ${packField.value}g)`;
          div.append(caution);
          const fix=document.createElement("button");fix.type="button";fix.className="textlink";fix.textContent="상품 규격 적용";
          fix.onclick=()=>{const field=$(`input[data-pack="${id}"]`);if(field){field.value=String(info.pack_g);field.dispatchEvent(new Event("change",{bubbles:true}));}};
          div.append(fix);
        }
      }
      $(".shopactions",row)?.append(div);
      const nameTarget=$(".shopname",row)||row;
      nameTarget.insertAdjacentElement("afterend",div);
    });
    const foot=document.createElement("p");foot.className="note";
    foot.textContent=quotedCount? `가격 확인된 구매 품목 ${quotedCount}개만 합계 ${fmt(estimated)}원 (미확인 품목 ${unpriced}개, 품절 표시 ${soldCount}개). 전체 주문액은 컬리 결제 화면 확인.` : "실시간 가격 공급자 미연결: 상품 링크에서 현재 가격과 배송지 기준 판매 여부를 확인하세요.";
    top.append(foot);
  }
  new MutationObserver(()=>decorate()).observe(main,{childList:true});
  fetchData();
})();