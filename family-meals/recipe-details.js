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
    zucchini:["새우젓 없는 애호박볶음 실제 레시피","https://www.10000recipe.com/recipe/7017773"],
    oatmeal:["오트밀 바나나죽 실제 레시피","https://www.10000recipe.com/recipe/7018027"]
  };
  const el=(tag,cl,text)=>{const n=document.createElement(tag);if(cl)n.className=cl;if(text!==undefined)n.textContent=text;return n};
  const sections=(title,lines,heading=title)=>{const box=el("section","family-recipe-section");const h=el("h3","",heading);box.append(h);if(Array.isArray(lines)){const ul=el("ul","family-detail-list");lines.forEach(x=>ul.append(el("li","",x)));box.append(ul);}else box.append(el("p","",lines));return box};
  const escNumber=n=>Number(n).toLocaleString("ko-KR");
  function reference(title){
    if(/오트밀|귀리/.test(title))return references.oatmeal;
    if(/불고기/.test(title))return references.bulgogi;
    if(/에어프라이어/.test(title)&&/닭/.test(title))return references.chickenAir;
    if(/돼지/.test(title)&&/두부/.test(title))return references.porkTofu;
    if(/돼지/.test(title)&&/감자/.test(title))return references.porkPotato;
    if(/소고기|한우/.test(title)&&/감자국/.test(title))return references.soup;
    if(/돼지목살|목살/.test(title))return references.neck;
    if(/돼지/.test(title))return references.pork;
    if(/닭/.test(title))return references.chicken;
    if(/생선|고등어/.test(title))return references.fish;
    if(/소고기|한우/.test(title))return references.beef;
    if(/두부/.test(title)&&/조림|덮밥/.test(title))return references.tofu;
    if(/애호박/.test(title)&&/볶음/.test(title))return references.zucchini;
    if(/감자/.test(title)&&/국|탕/.test(title))return references.soup;
    if(/감자/.test(title)&&/조림/.test(title))return references.potato;
    return null;
  }
  function seasoning(title,isBreakfast){
    if(isBreakfast)return {
      name:"첫째 아침 간편식 · 기본 양념",
      lines:["소금·설탕·간장을 추가하지 않고 재료 고유의 맛으로 조리합니다.","물로 질감을 조절하고, 어른이 함께 먹으면 각자 먹을 때 간을 추가합니다."]}
    if(/불고기/.test(title))return {
      name:"어른 2인용 불고기 양념 · 아이 몫을 덜어낸 뒤",
      lines:["진간장 1½큰술(22~23mL) + 물 4큰술(60mL) + 설탕 1작은술(5mL) + 다진 마늘 1작은술을 작은 그릇에 섞습니다.","고기·채소를 익혀 첫째 몫을 먼저 덜어낸 후 남은 고기에 양념을 넣고 중불에서 2~3분 볶습니다.","불을 끄고 참기름 ½작은술과 깨를 약간 넣습니다. 배즙 2큰술은 선택사항입니다."]}
    if(/조림|간장구이|당근볶음|냉동채소볶음/.test(title))return {
      name:"어른 2인용 간장 양념 · 아이 몫을 덜어낸 뒤",
      lines:["진간장 1큰술(15mL) + 물 4큰술(60mL) + 올리고당 ½큰술(7.5mL) + 다진 마늘 ½작은술(2~3mL)을 골고루 섞습니다.","고기·채소를 속까지 익혀 첫째 몫을 먼저 덜어낸 뒤 남은 어른 분량에 양념을 넣습니다.","중약불에서 3~5분 자작하게 조리고 불을 끈 뒤 참기름 ½작은술을 더합니다. 조림이 마르면 물 1~2큰술을 더합니다."]}
    if(/맑은국|감자국|시금치국|애호박국|탕|채소국|수프/.test(title))return {
      name:"어른 2인용 국물 간 · 아이 국을 덜어낸 뒤",
      lines:["국물은 물 550~650mL를 기본으로 끓입니다. 국간장 1작은술(5mL) + 다진 마늘 ½작은술을 준비합니다.","감자·고기·채소가 모두 부드럽게 익은 후, 아이 국물과 건더기를 먼저 덜어냅니다.","남은 국에 국간장을 넣고 1분 더 끓입니다. 소금은 처음부터 넣지 말고 마지막에 어른이 맛을 본 뒤 소량만 추가합니다."]}
    if(/볶음/.test(title))return {
      name:"어른 2인용 볶음 간 · 아이 몫을 덜어낸 뒤",
      lines:["식용유 1작은술로 재료를 먼저 볶고, 첫째 몫은 싱겁게 덜어냅니다.","어른 분량에는 진간장 ½~1큰술(7.5~15mL) + 다진 마늘 ½작은술을 넣어 1~2분 더 볶습니다.","마지막에 참기름 ½작은술을 넣고, 필요하면 물 1큰술로 촉촉하게 조절합니다."]}
    return {
      name:"기본 구이·찜 간",
      lines:["재료를 먼저 기름 1작은술 또는 물 2큰술로 익힙니다. 아이 몫에는 소금·후추를 넣지 않습니다.","아이 몫을 덜어낸 뒤 어른 고기에는 소금 1~2꼬집, 후추 약간 또는 진간장 ½큰술을 취향에 맞게 사용합니다.","찐 채소는 소금 없이 제공하고, 어른은 참기름 ½작은술을 곁들일 수 있습니다."]}
  }
  function ingredientSummary(){
    return [...dialog.querySelectorAll(".ingredient-chips span")].map(x=>x.textContent.trim()).filter(Boolean);
  }
  function detailedSteps(title,isBreakfast,items){
    const t=title;
    if(isBreakfast){
      if(/오트밀|귀리/.test(t))return [
        "작은 냄비에 오트밀 약 30g과 물 140~170mL를 넣고 중약불로 4~5분 저어가며 끓입니다. 전자레인지를 쓰면 넘치지 않도록 큰 용기에 담아 1분씩 나누어 가열합니다.",
        "바나나가 있으면 약 50g을 으깨 불을 끈 뒤 섞고, 사과는 아주 잘게 썰어 충분히 익힙니다.",
        "두부를 곁들이는 메뉴라면 두부 30~40g을 별도로 2~3분 가열한 뒤 으깨서 냅니다. 뜨거운 죽은 충분히 식힌 뒤 줍니다.",
        "설탕이나 꿀은 넣지 않습니다. 준비·섭취 시간을 줄이려면 전날 건식 재료를 계량해 둡니다."
      ];
      if(/토스트|식빵/.test(t))return [
        "전날 충분히 익힌 닭고기·소고기 또는 두부를 위생적으로 소분해 냉장 보관합니다. 익힌 고기가 없다면 새로 속까지 익히는 시간이 필요합니다.",
        "식빵은 너무 바삭하지 않게 살짝 데워 손가락 크기보다 작게 자르며, 질긴 빵 테두리는 아이가 먹기 힘들면 제거합니다.",
        "고기·두부 25~35g을 충분히 데우고, 바나나나 사과 등 과일 30~50g을 씹기 안전한 모양으로 손질해 곁들입니다.",
        "잼·꿀·추가 치즈 없이 내고 한 번에 많이 먹이려 하지 않습니다."
      ];
      if(/고구마|감자/.test(t))return [
        "전날 고구마 또는 감자를 껍질째 충분히 익혀 소분 냉장합니다. 당일 생감자를 처음부터 삶는 경우에는 5~10분을 초과할 수 있습니다.",
        "아침에 고구마·감자 약 70~100g을 속까지 데운 뒤 으깨거나 작은 조각으로 나눕니다.",
        "익힌 고기 또는 두부 25~35g과 과일 약 30~50g을 곁들여 제공합니다.",
        "뜨거운 중심부를 확인하고 아이가 씹기 편한 정도로 식혀 냅니다."
      ];
      return [
        "미리 지은 밥은 냉장 보관한 것을 속까지 충분히 재가열해 약 60~90g을 준비합니다.",
        "소고기나 닭고기는 전날 속까지 익혀 소분한 것을 25~35g 데우고, 두부라면 충분히 익혀 작은 조각으로 자릅니다.",
        "김은 작은 조각으로 찢고, 잘게 썬 과일 30~50g이 있으면 함께 냅니다. 밥·고기·김은 볶지 말고 따로 제공해도 됩니다.",
        "아이의 식욕에 맞춰 일부만 먹어도 괜찮으며 남은 음식은 적절하게 보관합니다."
      ];
    }
    if(/불고기/.test(t))return [
      "소고기 불고기용 약 300~350g의 핏물을 종이타월로 닦고 양파 80~120g을 채 썹니다. 재료량은 상단의 실제 식단표를 우선합니다.",
      "팬에 식용유 1작은술을 두르고 고기를 가닥가닥 떼어 볶다가 양파를 넣어 중강불에서 충분히 익힙니다.",
      "첫째 몫으로 익힌 고기 40~50g과 부드러운 양파 20~30g을 양념 전 덜어 작은 크기로 자릅니다.",
      "미리 섞은 어른용 불고기 양념을 팬에 부어 2~3분 더 볶습니다. 국물이 자작해지면 참기름을 넣고 밥과 함께 냅니다."
    ];
    if(/에어프라이어/.test(t))return [
      "닭다리살을 두께가 일정하도록 펴고 종이타월로 표면의 수분을 닦습니다. 감자는 1cm 이내로 잘라 전자레인지에서 먼저 부드럽게 익힙니다.",
      "에어프라이어를 180~190℃로 예열하고 닭과 감자를 겹치지 않게 올립니다. 약 15~22분 굽되 중간에 한 번 뒤집고, 닭고기의 가장 두꺼운 부분이 74℃ 이상인지 확인합니다.",
      "아이용 닭고기를 조리 후 약 40~50g 덜어 연골·질긴 부위를 제거하고 잘게 자릅니다. 감자도 부드러운 부분을 덜어냅니다.",
      "어른 분량만 진간장 ½~1큰술·다진 마늘 ½작은술·올리고당 ½작은술로 만든 소스를 팬에서 1~2분 끓여 묻혀 줍니다."
    ];
    if(/생선|고등어/.test(t))return [
      "순살 생선을 냉장 해동해 물기를 종이타월로 닦고, 포장에 염장 여부가 적혀 있는지 확인합니다.",
      "식용유 약 1작은술을 두른 팬을 중약불로 달구고, 생선의 두께에 따라 한 면 4~6분씩 굽습니다. 속살이 불투명해지고 쉽게 갈라질 정도로 완전히 익힙니다.",
      "감자찜이나 감자국이 함께 있다면 감자 150~200g을 작은 크기로 썰어 물에 8~12분 부드럽게 익힙니다.",
      "아이에게는 익힌 생선살 약 25~40g을 손으로 한 번 더 만져 가시를 확인해 작은 조각으로 줍니다. 어른에게만 후추나 레몬 등을 곁들입니다."
    ];
    if(/국|탕|수프/.test(t)&&/닭|소고기|돼지|한우|두부/.test(t)&&!/구이와|볶음과/.test(t))return [
      "고기는 생고기 기준 약 300g, 두부가 주재료라면 약 300g을 준비하고 채소를 얇게 썰어 끓는 시간을 줄입니다. 레시피 상단에 적힌 재료량을 우선합니다.",
      "냄비에 물 600mL와 단단한 채소(감자·당근·양파)를 넣고 중불에서 약 7~10분 끓입니다.",
      "고기를 넣고 완전히 익을 때까지 끓이며 거품을 걷어 냅니다. 두부나 잎채소는 마지막 3~5분에 넣습니다.",
      "첫째 국은 국물 80~120mL와 부드러운 건더기, 익힌 단백질 약 40~50g을 간하기 전에 덜어내고 먹기 쉬운 크기로 자릅니다.",
      "남은 어른 국에 국간장 1작은술과 다진 마늘 ½작은술을 넣고 1분 더 끓여 맛을 조절합니다."
    ];
    if(/조림/.test(t))return [
      "고기·두부·감자·당근을 약 1~1.5cm로 썹니다. 고기는 물기를 닦고, 감자·당근은 작은 크기로 잘라 익는 시간을 맞춥니다.",
      "팬에 식용유 1작은술을 두르고 고기를 3~5분 볶은 다음, 감자·당근 등 단단한 채소와 물 약 100~150mL를 넣습니다.",
      "뚜껑을 덮고 중약불에서 8~12분 익혀 고기는 속까지, 감자는 젓가락이 쉽게 들어갈 정도로 익힙니다. 닭고기는 중심부가 74℃ 이상인지 확인합니다.",
      "아이용으로 익힌 고기 약 40~50g과 채소 약 30~50g을 국물 조금과 함께 먼저 덜어냅니다.",
      "남은 어른 분량에 아래 양념장을 붓고 뚜껑을 열어 3~5분 더 졸인 뒤 참기름을 넣습니다. 너무 짜거나 마르면 물을 조금 추가합니다."
    ];
    if(/구이|스테이크/.test(t))return [
      "고기는 너무 두껍지 않게 손질하고 키친타월로 표면의 수분을 닦습니다. 구이와 함께 먹는 채소는 0.5~1cm로 자릅니다.",
      "달군 팬에 식용유 1작은술을 두르고 고기를 겹치지 않게 펼쳐 굽습니다. 두께에 따라 뒤집어 충분히 익히며 돼지고기는 붉은 속이 남지 않도록 확인합니다.",
      "곁들일 브로콜리·애호박·냉동채소는 별도의 팬이나 찜기에 물 2~4큰술을 넣어 5~7분 부드럽게 익힙니다.",
      "아이 몫으로 익힌 고기 약 40~50g과 채소 약 30~50g을 덜고 질긴 부분을 없애 작게 자릅니다.",
      "어른 고기에만 아래 양념을 적용해 1~2분 더 볶거나 소스를 따로 제공합니다."
    ];
    if(/볶음/.test(t))return [
      "고기와 양파·당근·애호박은 1cm 이하로 썰고, 냉동 채소는 포장 조리 지침에 맞춰 익힐 준비를 합니다.",
      "팬에 식용유 1작은술을 두르고 고기를 먼저 익히다가 단단한 채소부터 넣습니다. 물 1~2큰술을 더하면 촉촉해집니다.",
      "중불에서 고기가 완전히 익고 채소가 부드러워질 때까지 5~8분 볶습니다.",
      "아이용 단백질 약 40~50g과 채소 30~50g을 양념하기 전에 덜어냅니다.",
      "어른 분량에만 진간장 ½~1큰술·다진 마늘 ½작은술을 넣어 1~2분 더 볶고 참기름을 넣습니다."
    ];
    if(/죽/.test(t))return [
      "밥을 사용할 경우 이미 지은 밥 약 160~180g을, 쌀이라면 미리 충분히 불리고 익혀 준비합니다. 고기와 채소를 잘게 썹니다.",
      "냄비에 물 500~650mL와 채소를 넣고 5분 끓인 뒤 고기를 넣어 속까지 익힙니다.",
      "밥 또는 익힌 귀리를 넣고 중약불에서 5~8분 저어 농도를 조절합니다.",
      "아이 몫은 적절히 식혀 약 120~180g의 부드러운 죽으로 먼저 덜고, 어른 죽만 필요에 따라 간합니다."
    ];
    return [
      "상단의 재료를 가족 분량에 맞게 계량하고 고기·채소를 씹기 편한 크기로 손질합니다.",
      "고기는 팬이나 냄비에서 속까지 완전히 익히고, 채소는 찌거나 끓여 충분히 부드럽게 만듭니다.",
      "첫째 몫을 조리 후 따로 덜어낸 뒤 어른 분량에만 아래 양념을 더합니다.",
      "밥은 별도 그릇에 내고 첫째가 선호하는 흰밥과 김을 소량 곁들일 수 있습니다."
    ];
  }
  function allocate(title,breakfast,ingredients){
    const protein=ingredients.find(s=>/닭|돼지|소고기|한우|목살|등심|생선|고등어/.test(s));
    const hasTofu=ingredients.some(s=>/두부/.test(s));
    if(breakfast)return ["첫째 1명 기준 예시: 밥 60~90g(조리 후) 또는 식빵 ½~1장/오트밀 25~35g(마른 것).","단백질: 익힌 고기 25~35g 또는 두부 30~50g. 과일: 손질 후 약 30~50g.","어른 아침도 먹는 날은 별도로 분량을 추가합니다. 위 분량은 의무 섭취량이 아닌 선택 가능한 예시입니다."];
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
    border.textContent="실제 요리법을 참고한 가정용 상세 조리안 · 아래 양념량은 성인 2명 기준 조정치이며, 아이 몫은 양념 전 따로 덜어냅니다.";
    wrap.append(border);
    const season=seasoning(title,breakfast);
    wrap.append(sections(season.name,season.lines));
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
      const fresh=detailedSteps(title,breakfast,ingredients);
      oldSteps.replaceChildren(...fresh.map(s=>el("li","",s)));
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