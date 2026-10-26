(function installRecipeDetail(){
  "use strict";
  const dialog = document.getElementById("dialogContent");
  if(!dialog)return;
  const references={
    bulgogi:["소불고기 양념·볶기 실제 레시피","https://m.10000recipe.com/recipe/7033830"],
    beef:["소고기 채소볶음 실제 레시피","https://www.10000recipe.com/recipe/6947459"],
    chicken:["닭다리살 간장구이·조림 실제 레시피","https://www.10000recipe.com/recipe/7047727"],
    chickenAir:["에어프라이어 닭다리살구이 실제 레시피","https://m.10000recipe.com/recipe/7009135"],
    pork:["돼지안심구이 실제 레시피","https://www.10000recipe.com/recipe/704547"],
    neck:["돼지목살 간장구이 실제 레시피","https://www.10000recipe.com/recipe/7062275"],
    porkPotato:["돼지고기 감자조림 실제 레시피","https://www.10000recipe.com/recipe/6876591"],
    porkTofu:["돼지고기 두부조림 실제 레시피","https://www.10000recipe.com/recipe/7017432"],
    tofu:["두부조림 양념 실제 레시피","https://www.10000recipe.com/recipe/7068184"],
    fish:["순살 고등어구이 실제 레시피","https://www.10000recipe.com/recipe/7072586"],
    potato:["간장 감자조림 실제 레시피","https://www.10000recipe.com/recipe/7076122"],
    soup:["맑은 감자국 실제 레시피","https://www.10000recipe.com/recipe/7031555"],
    tofuSoup:["두부·애호박 맑은국 실제 레시피","https://www.10000recipe.com/recipe/7070778"],
    spinachSoup:["시금치국 실제 레시피","https://www.10000recipe.com/recipe/7013957"],
    zucchini:["새우젓 없는 애호박볶음 실제 레시피","https://www.10000recipe.com/recipe/7017773"],
    oatmeal:["오트밀 바나나죽 실제 레시피","https://www.10000recipe.com/recipe/7018027"]
  };
  const el=(tag,cl,text)=>{const n=document.createElement(tag);if(cl)n.className=cl;if(text!==undefined)n.textContent=text;return n};
  const sections=(title,lines,heading=title)=>{const box=el("section","family-recipe-section");const h=el("h3","",heading);box.append(h);if(Array.isArray(lines)){const ul=el("ul","family-detail-list");lines.forEach(x=>ul.append(el("li","",x)));box.append(ul);}else box.append(el("p","",lines));return box};
  const escNumber=n=>Number(n).toLocaleString("ko-KR");
  function reference(title){
    if(/오트밀|귀리/.test(title))return references.oatmeal;
    if(/두부/.test(title)&&/국|탕|수프/.test(title))return references.tofuSoup;
    if(/시금치국/.test(title))return references.spinachSoup;
    if(/불고기/.test(title))return references.bulgogi;
    if(/에어프라이어/.test(title)&&/닭/.test(title))return references.chickenAir;
    if(/돼지/.test(title)&&/두부/.test(title))return references.porkTofu;
    if(/돼지/.test(title)&&/감자/.test(title))return references.porkPotato;
    if(/소고기|한우/.test(title)&&/감자국/.test(title))return references.soup;
    if(/돼지목살|목살/.test(title))return references.neck;
    if(/돼지/.test(title))return references.pork;
    if(/닭/.test(title)&&/국|탕|수프/.test(title))return null;
    if(/닭/.test(title))return references.chicken;
    if(/생선|고등어/.test(title))return references.fish;
    if(/소고기|한우/.test(title))return references.beef;
    if(/두부/.test(title)&&/조림|덮밥/.test(title))return references.tofu;
    if(/애호박/.test(title)&&/볶음/.test(title))return references.zucchini;
    if(/감자/.test(title)&&/국|탕/.test(title))return references.soup;
    if(/감자/.test(title)&&/조림/.test(title))return references.potato;
    return null;
  }
  function ingredientSummary(){
    return [...dialog.querySelectorAll('.ingredient-chips span')].map(node=>({
      id:node.dataset.ingredient,name:node.dataset.name,grams:Number(node.dataset.grams)
    }));
  }
  function sauceFor(kind){
    const sauces={
      bulgogi:{name:'어른 2인용 불고기 양념',mix:'진간장 1½큰술(22.5mL), 물 4큰술(60mL), 설탕 1작은술(5mL), 다진 마늘 1작은술(5mL)을 섞습니다. 참기름 ½작은술은 마무리용으로 따로 둡니다.',finish:'준비한 양념을 어른 주요리에 넣어 중불에서 2~3분 볶고 불을 끈 뒤 참기름 ½작은술을 섞습니다.'},
      stew:{name:'어른 2인용 조림 양념',mix:'진간장 1큰술(15mL), 물 4큰술(60mL), 올리고당 ½큰술(7.5mL), 다진 마늘 ½작은술(2.5mL)을 섞습니다. 참기름 ½작은술은 마무리용으로 따로 둡니다.',finish:'준비한 양념을 어른 주요리에 넣어 중약불에서 3~5분 졸입니다. 마르면 물 1큰술씩 보충하고 불을 끈 뒤 참기름 ½작은술을 섞습니다.'},
      stir:{name:'어른 2인용 볶음 양념',mix:'진간장 1큰술(15mL), 물 2큰술(30mL), 다진 마늘 ½작은술(2.5mL)을 섞습니다. 참기름 ½작은술은 마무리용으로 따로 둡니다.',finish:'준비한 양념을 어른 주요리에 넣어 중불에서 1~2분 볶고 불을 끈 뒤 참기름 ½작은술을 섞습니다.'},
      grill:{name:'어른 2인용 구이·찜 양념',mix:'진간장 ½큰술(7.5mL), 물 1큰술(15mL), 다진 마늘 ¼작은술(1.25mL)을 섞습니다.',finish:'준비한 양념을 어른 주요리에 둘러 중불에서 1~2분 더 익힙니다.'},
      fish:{name:'어른 2인용 생선 곁들임 간장',mix:'진간장 1작은술(5mL)과 물 1큰술(15mL)을 작은 종지에 섞습니다.',finish:'어른 접시에만 준비한 간장 종지를 곁들입니다. 생선 굽는 팬에는 간장을 붓지 않습니다.'},
      soup:{name:'어른 2인용 국 양념',mix:'국간장 1작은술(5mL), 다진 마늘 ½작은술(2.5mL), 물 1큰술(15mL)을 섞습니다.',finish:'아이 국물과 건더기를 먼저 덜어낸 뒤, 어른 국에 준비한 양념을 넣고 1~2분 더 끓입니다.'},
      porridge:{name:'어른 2인용 죽 양념',mix:'국간장 1작은술(5mL)과 물 1큰술(15mL)을 섞습니다.',finish:'아이 죽을 먼저 덜어낸 뒤, 어른 죽에 준비한 양념의 절반부터 넣고 1분 더 끓입니다. 나머지는 맛을 본 뒤 조절합니다.'}
    };
    return sauces[kind];
  }
  function recipeModel(title,breakfast,items){
    const entries=items.filter(x=>x&&x.id&&Number.isFinite(x.grams)&&x.grams>0);
    const byId=Object.fromEntries(entries.map(x=>[x.id,x]));
    const has=id=>!!byId[id];
    const label=x=>x.name+' '+escNumber(x.grams)+'g';
    const list=xs=>xs.map(label).join(' · ');
    const proteins=entries.filter(x=>['chicken','beef','pork','neck','fish','tofu','egg'].includes(x.id));
    const vegetables=entries.filter(x=>['potato','sweet','carrot','onion','broccoli','zucchini','spinach','frozen','squash','cucumber'].includes(x.id));
    const hard=xs=>xs.filter(x=>['potato','sweet','carrot','squash'].includes(x.id));
    const soft=xs=>xs.filter(x=>!hard(xs).includes(x));
    const steps=[];
    const add=(role,text)=>steps.push({role,text});
    const seasonings=[];
    const season=(kind,part)=>{const sauce=sauceFor(kind);seasonings.push({...sauce,part});add(part+'-seasoning-prep',sauce.name+' 준비: '+sauce.mix+' 아이 몫을 덜기 전에는 넣지 않습니다.');return sauce;};
    if(breakfast){
      add('prep','전날 준비: 재료표 분량의 고기·두부·밥·찐 채소 중 미리 만들 것은 충분히 익혀 한 끼씩 소분하고 신속히 냉장합니다. 아침에는 먹을 양만 꺼내 충분히 재가열합니다. 생재료부터 조리하면 안내된 5~10분보다 오래 걸립니다.');
      if(has('oats'))add('cook',label(byId.oats)+'에 물 '+Math.round(byId.oats.grams*5)+'mL부터 넣고 중약불에서 4~5분 저으며 부드럽게 끓입니다. 농도에 따라 물을 더합니다.');
      if(has('rice'))add('cook','쌀 '+escNumber(byId.rice.grams)+'g은 조리 전 사용량입니다. 그 분량으로 미리 지은 밥을 속까지 충분히 데워 준비합니다.');
      if(has('toast'))add('cook',label(byId.toast)+'을 부드럽게 데워 작은 조각으로 자릅니다.');
      for(const p of proteins)add('cook',label(p)+'은 '+(p.id==='tofu'?'끓는 물에 3~5분 충분히 익힌 뒤 작게 자르거나 으깹니다.':p.id==='egg'?'흰자와 노른자가 모두 단단해지도록 익혀 작게 자릅니다.':'전날 속까지 익혀 소분한 것을 충분히 재가열해 잘게 자릅니다. 생고기라면 먼저 완전히 익힙니다.')+(p.id==='chicken'?' 닭고기는 가장 두꺼운 부분의 중심 온도 74℃ 이상을 확인합니다.':''));
      for(const v of vegetables)add('cook',label(v)+' 조리: '+(hard([v]).length?'전날 작게 잘라 충분히 찌거나 삶아 냉장한 것을 속까지 데우고 으깨거나 작게 나눕니다.':'씻어 작게 자른 뒤 찜기에 넣어 5~8분 이상 부드럽게 익힙니다. 냉동 제품은 포장 조리법을 우선합니다.'));
      if(has('banana'))add('cook',label(byId.banana)+'는 껍질을 벗기고 으깨거나 씹기 편하게 작게 잘라 곁들입니다.');
      if(has('apple'))add('cook',label(byId.apple)+'는 껍질과 씨를 없애고 잘게 썰어 부드럽게 익힌 뒤 곁들입니다.');
      if(has('kim'))add('serve',label(byId.kim)+'은 작은 조각으로 찢어 곁들입니다.');
      add('serve','소금·간장·설탕을 추가하지 않고 먹기 편한 크기와 온도로 냅니다. 어른이 함께 먹을 때만 각자 접시에서 간합니다.');
      return {steps,seasonings};
    }
    add('prep','재료표 분량을 계량합니다. 생고기와 익힌 음식의 도마·도구는 분리하고, 채소는 씻어 작은 크기로 썹니다. 아래 조리 시간은 크기와 기기에 따라 조절하며 속까지 익었는지 확인합니다.');
    const sideSoup=/국|탕|수프/.test(title)&&/구이와|볶음과/.test(title);
    const soupMain=/국|탕|수프/.test(title)&&!sideSoup;
    const porridge=/죽/.test(title);
    if(has('rice'))add('cook','쌀 '+escNumber(byId.rice.grams)+'g은 조리 전 사용량입니다. 미리 지은 밥을 충분히 데워 '+(porridge?(/죽과 밥/.test(title)?'죽에 넣을 몫과 따로 낼 몫으로 나눕니다.':'죽에 넣을 몫으로 준비합니다.'):'별도로 준비합니다.'));
    if(soupMain||porridge){
      const s=season(porridge?'porridge':'soup','soup');
      add('cook','냄비에 물 550~650mL를 넣고 끓입니다.'+(hard(vegetables).length?' '+list(hard(vegetables))+'을 작게 썰어 먼저 넣고 7~10분 부드럽게 끓입니다.':''));
      for(const p of proteins)add('cook',label(p)+'을 작게 썰어 냄비에 넣고 '+(p.id==='tofu'?'3~5분 더 끓입니다.':'속까지 완전히 익도록 끓입니다.')+(p.id==='chicken'?' 중심 온도 74℃ 이상을 확인합니다.':''));
      if(soft(vegetables).length)add('cook',list(soft(vegetables))+'을 넣고 3~5분 이상 부드러워질 때까지 끓입니다. 냉동 채소는 포장 조리법을 우선합니다.');
      if(porridge)add('cook','준비한 밥을 넣어 중약불에서 5~8분 저어가며 부드러운 죽을 만듭니다. 걸쭉하면 뜨거운 물을 조금씩 더합니다.');
      add('portion','아이 몫은 양념 전에 덜어 건더기를 작게 나누고 충분히 식힙니다.');
      add('soup-seasoning-finish',s.finish);
    }else{
      const kind=/불고기/.test(title)?'bulgogi':/조림/.test(title)?'stew':/볶음|덮밥|원팬/.test(title)?'stir':has('fish')?'fish':'grill';
      const s=season(kind,'main');
      const soupIds=sideSoup?(/시금치국/.test(title)?['spinach','potato']:/애호박국/.test(title)?['zucchini','onion']:['potato',...(/양파볶음/.test(title)?[]:['onion'])]):[];
      const soupVeg=vegetables.filter(x=>soupIds.includes(x.id));
      const mainVeg=vegetables.filter(x=>!soupIds.includes(x.id));
      let soupSauce=null;
      if(sideSoup){
        soupSauce=season('soup','soup');
        add('soup-cook','곁들임 국: 별도 냄비에 물 550~650mL를 끓입니다.'+(hard(soupVeg).length?' '+list(hard(soupVeg))+'을 먼저 넣어 8~12분 부드럽게 끓입니다.':'')+(soft(soupVeg).length?' '+list(soft(soupVeg))+'을 넣고 3~5분 이상 부드럽게 익힙니다.':'')+' 아직 양념하지 않습니다.');
      }
      for(const v of mainVeg){
        const microwave=v.id==='potato'&&/전자레인지|에어프라이어/.test(title);
        add('cook',label(v)+' 조리: '+(microwave?'1cm 안팎으로 잘라 전자레인지용 용기에 물 2~4큰술과 담고 뚜껑의 증기 배출구를 열어 가열합니다. 2분씩 나누어 중간에 섞고 젓가락이 쉽게 들어갈 때까지 익힙니다. 증기에 주의하세요.':hard([v]).length?'1cm 안팎으로 잘라 물에 8~12분 이상 삶거나 쪄서 부드럽게 익힙니다.':'작게 썰어 물 2~4큰술과 팬에 넣고 뚜껑을 덮어 5~8분 이상 부드럽게 익힙니다. 냉동 채소는 포장 조리법을 우선합니다.'));
      }
      for(const p of proteins){
        let text;
        if(p.id==='tofu')text='물기를 빼고 작은 조각으로 썰어 팬에서 양면을 2~3분씩 익힙니다.';
        else if(p.id==='fish')text='냉장 해동해 물기를 닦고, 기름 1작은술을 두른 팬에서 중약불로 한 면 4~6분씩 속까지 익힙니다. 가시를 다시 확인합니다.';
        else if(p.id==='egg')text='흰자와 노른자를 모두 단단하게 익힙니다.';
        else if(/에어프라이어/.test(title))text='두께가 일정하도록 펴서 180~190℃로 예열한 에어프라이어에 겹치지 않게 담아 15~22분 굽고 중간에 뒤집습니다. 미리 익힌 채소도 함께 데워 냅니다.';
        else if(/찜/.test(title)&&!/구이/.test(title))text='두껍지 않게 손질해 찜기에 겹치지 않게 올리고 속까지 충분히 익힙니다. 두께에 따라 조리 시간을 늘립니다.';
        else text='기름 1작은술을 두른 팬에 겹치지 않게 넣어 중불에서 속까지 익힙니다. 구이는 한 면 3~5분씩, 잘게 썬 볶음용은 5~8분부터 확인하고 두께에 따라 더 익힙니다.';
        add('cook',label(p)+' 조리: '+text+(p.id==='chicken'?' 가장 두꺼운 부분의 중심 온도 74℃ 이상을 확인합니다.':''));
      }
      add('portion','완전히 익힌 단백질과 채소에서 첫째 몫을 먼저 덜어 작은 조각으로 자릅니다. 아이 몫에는 양념장을 넣지 않습니다.');
      if(soupSauce)add('soup-seasoning-finish','곁들임 국: '+soupSauce.finish);
      add('main-seasoning-finish','어른 주요리 마무리: 익힌 주요리 재료를 모은 뒤 '+s.finish);
    }
    if(has('kim'))add('serve',label(byId.kim)+'을 작은 조각으로 나누어 곁들입니다.');
    add('serve','어른 음식은 두 접시에 나눠 담고, 아이 음식은 가시·질긴 부위와 뜨거운 중심부를 확인한 뒤 제공합니다.');
    return {steps,seasonings};
  }


  function allocate(title,breakfast,ingredients){
    const protein=ingredients.find(({name:s})=>/닭|돼지|소고기|한우|목살|등심|생선|고등어/.test(s));
    const hasTofu=ingredients.some(({name:s})=>/두부/.test(s));
    if(breakfast)return ["위 재료표는 선택한 아침의 실제 준비 분량입니다. 밥·고구마·빵 등은 해당 재료가 있는 메뉴에만 준비합니다.","단백질과 채소·과일도 재료표에 적힌 것만 준비하고, 아이의 식욕과 씹는 능력에 맞춰 양과 크기를 조절합니다.","성인 아침 포함 설정을 켠 경우 재료표에 추가 분량이 이미 반영됩니다."];
    const a= protein ? "익힌 고기 약 40~50g" : hasTofu ? "두부 약 60~80g" : "단백질 반찬 약 40~60g";
    return [
      "첫째(27개월 무렵) 한 끼 예시: 밥 70~110g(조리 후) + "+a+" + 익힌 채소 30~60g.",
      /국|탕|수프/.test(title)?"국이 있다면 국물과 건더기 합쳐 약 80~120mL를 선택해 제공하고, 식욕에 따라 조절합니다.": "국이나 물은 아이의 식욕·평소 섭취량에 따라 적절히 곁들입니다.",
      "성인 2명은 남은 주재료를 나눠 먹습니다. 첫째 분량을 추가하려고 재료를 새로 사야 한다면 실제 배분량에 맞춰 장보기 수량도 수정해야 합니다.",
      "고기·생선은 완전히 익히고, 아이가 먹기 안전하도록 연골·가시를 제거해 작게 썰며 식사 중 보호자가 지켜봅니다."
    ];
  }
  function apply(){
    const head=dialog.querySelector("h2"),intro=dialog.querySelector(".eyebrow");
    const chips=dialog.querySelector(".ingredient-chips");
    if(!head||!intro||!chips||dialog.querySelector("#familyRecipeExpanded"))return;
    const title=head.textContent||"",type=intro.textContent||"",breakfast=/아침/.test(type);
    const ingredients=ingredientSummary();
    const ref=reference(title);
    const wrap=el("div","family-recipe-expanded");
    wrap.id="familyRecipeExpanded";
    const border=el("div","family-recipe-banner");
    border.textContent="실제 가정식 조리법을 참고한 단계별 조리안 · 큰술=15mL, 작은술=5mL. 아래는 성인 2명용 양념이며 아이 몫은 양념 전에 덜어냅니다. 하단 '만드는 순서'에 양념 계량·혼합·투입·가열 순서가 모두 들어 있습니다.";
    wrap.append(border);
    const model=recipeModel(title,breakfast,ingredients);
    if(breakfast)wrap.append(sections('아침 기본 간','추가 소금·설탕·간장 없이 조리하고, 어른만 각자 접시에서 간합니다.'));
    for(const season of model.seasonings){
      const section=sections(season.name,[season.mix,season.finish]);
      section.dataset.seasoning=season.part;
      wrap.append(section);
    }
    wrap.append(sections("첫째에게 제공할 양 · 예시",allocate(title,breakfast,ingredients)));
    wrap.append(sections("추가 기본 양념 안내","진간장·국간장·다진 마늘·식용유·참기름·올리고당·소금·후추 등은 요리법에 필요하지만 현재 장보기 재료 합산에는 자동 포함되지 않을 수 있습니다. 집에 없다면 별도로 구입하세요."));
    if(ref){
      const src=el("section","family-recipe-source");
      const anchor=el("a","",ref[0]+" ↗");anchor.href=ref[1];anchor.target="_blank";anchor.rel="noopener noreferrer";
      src.append(el("strong","","실제 공개된 참고 요리법"),anchor,el("p","","원본 레시피를 그대로 복제한 것이 아니라, 해당 조리 방식을 참고해 성인 2명+유아 1명에 맞춰 재료·양념과 순서를 조정했습니다."));
      wrap.append(src);
    }else{
      wrap.append(el("p","family-recipe-source","이 메뉴는 간단한 가정식 조합으로, 동일한 이름의 공개 원본 레시피까지 확인한 상태는 아닙니다."));
    }
    const oldSteps=dialog.querySelector("ol");
    if(oldSteps){
      oldSteps.dataset.recipeSteps='true';
      oldSteps.replaceChildren(...model.steps.map(step=>{
        const li=el('li','',step.text);li.dataset.stepRole=step.role;return li;
      }));
    }
    const target=dialog.querySelector(".ingredient-chips");
    target.insertAdjacentElement("afterend",wrap);
    const h3=[...dialog.querySelectorAll("h3")].find(x=>x.textContent.includes("만드는 순서"));
    if(h3)h3.textContent="만드는 순서 · 자세한 조리 과정";
    const existingStyle=document.querySelector("#familyRecipeCSS");
    if(!existingStyle){
      const style=el("style");style.id="familyRecipeCSS";
      style.textContent=".family-recipe-expanded{font-size:14px;line-height:1.7;margin-top:16px;padding:12px 0;border-top:1px solid #dce5e0}.family-recipe-expanded h3{font-size:15px;margin:15px 0 7px}.family-recipe-expanded .family-detail-list{padding-left:21px;margin:8px 0}.family-recipe-expanded li{margin:0 0 8px}.family-recipe-banner{padding:12px;background:#e8f5ef;color:#184b3d;border-radius:11px;font-weight:700;font-size:13px}.family-recipe-source{border-top:1px solid #dce5e0;padding-top:10px;margin-top:13px;display:flex;flex-direction:column;gap:6px;font-size:12px}.family-recipe-source a{color:#137c61;text-decoration:underline;font-weight:700}.family-recipe-source p{margin:4px 0;color:#596f68}";
      document.head.append(style);
    }
  }
  new MutationObserver(apply).observe(dialog,{childList:true});
  apply();
})();