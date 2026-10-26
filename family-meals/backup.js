/* Complete versioned backup. Validate before changing any browser storage. */
(()=>{
'use strict';
const APP='family-meal-pwa-v1',MEM='family-meals-kurly-members-v1',SAUCE='family-meal-ready-sauces-v1',IMPORTED='family-meal-imported-data-v1';
const record=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
const read=key=>{try{const x=JSON.parse(localStorage.getItem(key)||'{}');return record(x)?x:{}}catch{return {}}};
function validatePlans(plans,catalog){
 if(!record(plans)||!record(catalog))throw Error('식단 또는 식재료 목록이 없습니다.');
 for(const item of Object.values(catalog))if(!record(item)||typeof item.name!=='string'||typeof item.category!=='string'||!Number.isFinite(item.pack)||item.pack<=0)throw Error('식재료 규격이 올바르지 않습니다.');
 for(const plan of ['A','B','C'])for(const kind of ['B','L','D']){
  const meals=plans[plan]?.[kind];
  if(!Array.isArray(meals)||meals.length!==7)throw Error('플랜의 7일 식단 형식이 맞지 않습니다.');
  for(const meal of meals){
   if(!record(meal)||typeof meal.title!=='string'||!Array.isArray(meal.steps)||!meal.steps.every(s=>typeof s==='string')||!record(meal.ingredients)||!Number.isFinite(meal.mins)||meal.mins<0)throw Error('레시피 형식이 올바르지 않습니다.');
   for(const [id,g] of Object.entries(meal.ingredients))if(!Object.hasOwn(catalog,id)||!Number.isFinite(g)||g<0)throw Error('식재료 코드/분량이 올바르지 않습니다.');
  }
 }
}
function validateState(state){
 if(!record(state))throw Error('저장 설정이 올바르지 않습니다.');
 for(const key of ['prices','stock','packSizes','checked','links'])if(state[key]!==undefined&&!record(state[key]))throw Error('저장 설정 형식이 올바르지 않습니다.');
 for(const key of ['prices','stock','packSizes'])for(const value of Object.values(state[key]||{}))if(value!==null&&(!Number.isFinite(value)||value<0))throw Error('가격·보유량 형식이 올바르지 않습니다.');
 if(state.closures!==undefined&&(!Array.isArray(state.closures)||state.closures.some(x=>!record(x)||!/^\d{4}-\d{2}-\d{2}$/.test(x.date||'')||typeof x.label!=='string')))throw Error('휴원일 형식이 올바르지 않습니다.');
}
function validateExtras(members,sauces){
 if(!record(members)||!record(sauces))throw Error('가격 확인 기록 또는 소스 설정이 없습니다.');
 for(const rec of Object.values(members)){
  if(!record(rec)||!Number.isSafeInteger(rec.price)||rec.price<=0||rec.price>10000000)throw Error('직접 입력 가격 기록이 올바르지 않습니다.');
  if(rec.source!=='legacy-backup'&&(rec.rank!==1||!Number.isFinite(Date.parse(rec.checked_at||''))||!/^https:\/\/www\.kurly\.com\/goods\/\d+\/?$/.test(rec.url||'')))throw Error('회원가 확인 기록이 올바르지 않습니다.');
 }
 for(const key of ['selected','prices','stock','include','buyPacks','checked'])if(sauces[key]!==undefined&&!record(sauces[key]))throw Error('소스 설정 형식이 올바르지 않습니다.');
 for(const key of ['prices','stock','buyPacks'])for(const value of Object.values(sauces[key]||{}))if(!Number.isFinite(value)||value<0)throw Error('소스 가격·수량이 올바르지 않습니다.');
 for(const value of Object.values(sauces.selected||{}))if(!record(value)||!['bulgogi','teriyaki','jjimdak','tofu','cutlet'].includes(value.id)||!Number.isFinite(value.grams)||value.grams<=0||!['week','plan','title','label'].every(k=>typeof value[k]==='string'))throw Error('소스 선택 기록이 올바르지 않습니다.');
}
function build(state,plans,catalog){
 return {version:2,savedAt:new Date().toISOString(),state,plans,catalog,members:read(MEM),sauces:read(SAUCE)};
}
function restore(parsed,baseline,currentPlans,currentCatalog){
 if(![1,2].includes(parsed?.version))throw Error('우리집 식단 백업 파일이 아닙니다.');
 validateState(parsed.state);
 const plans=parsed.plans||currentPlans,catalog=parsed.plans?parsed.catalog:currentCatalog;
 validatePlans(plans,catalog);
 const state={...baseline,...parsed.state,preferImported:!!parsed.plans||!!parsed.state.preferImported};
 if(!plans[state.plan])state.plan='B';
 if(!['today','week','shop','settings'].includes(state.view))state.view='today';
 state.closures=state.closures||[];
 let members,sauces;
 if(parsed.version===2){members=parsed.members;sauces=parsed.sauces;}
 else{
  // Version 1 had no verification metadata. Preserve entered prices without
  // falsely certifying them as member prices, and retain existing sauce data.
  members={};sauces=read(SAUCE);
  const previous=read(MEM),reference=window.FamilyMealPrices?.reference||{};
  for(const [id,price] of Object.entries(state.prices||{}))if(Number.isSafeInteger(price)&&price>0){
   if(previous[id]?.price===price)members[id]=previous[id];
   else if(price!==reference[id])members[id]={price,source:'legacy-backup'};
  }
 }
 validateExtras(members,sauces);
 const writes={[APP]:JSON.stringify(state),[MEM]:JSON.stringify(members),[SAUCE]:JSON.stringify(sauces),[IMPORTED]:JSON.stringify({plans,catalog})};
 const before=Object.fromEntries(Object.keys(writes).map(key=>[key,localStorage.getItem(key)]));
 try{for(const [key,value] of Object.entries(writes))localStorage.setItem(key,value);}
 catch(error){
  for(const key of Object.keys(before)){try{localStorage.removeItem(key);}catch{}}
  for(const [key,value] of Object.entries(before)){try{if(value!==null)localStorage.setItem(key,value);}catch{}}
  throw Error('기기에 저장하지 못해 가져오기를 취소했습니다. 저장 공간을 확인하세요.');
 }
 return {state,plans,catalog,legacy:parsed.version===1};
}
window.FamilyMealBackup={build,restore,validatePlans,imported:()=>read(IMPORTED)};
})();

