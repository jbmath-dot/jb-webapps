/* 컴팩스 매니저 데이터 — 콤펙스 SP 4.0 30개 프로그램 · 목표 플랜 · 패드 부위 · 스트레칭 */
window.PROGRAMS = [
  // Pain management (8)
  {
    cat: "Pain management", en: "Pain management TENS", ko: "통증 완화 TENS", type: "tens",
    desc: "통증 신호가 뇌로 가는 길을 차단해 급·만성 관절통이나 염증성 통증을 부드럽게 가라앉히는 진통 모드입니다.",
    steps: [
      "패드 부착·케이블 연결 후 <span class='kbd'>On/Off</span> 로 켜기",
      "<span class='kbd'>Ch 1 +/-</span> 로 카테고리 <strong>Pain management</strong> 선택 → <span class='kbd'>Ch 4 +</span> 확인",
      "<span class='kbd'>Ch 1 +/-</span> 로 <strong>Pain management TENS</strong> 선택 → <span class='kbd'>Ch 4 +</span> 확인",
      "MI 센서 연결 시 <strong>MI-TENS</strong> 자동 활성 → 사용 채널 <span class='kbd'>Ch 1~4 +</span> 로 찌릿한 선까지 올리기"
    ],
    diagrams: ["shoulder", "neck", "both_shoulders", "arm", "back", "thigh", "calf"],
    tags: "목 통증 경추 승모근 목뒤 담 결림 거북목 Neck pain",
    pads: "아픈 지점을 사이에 두고 전극 2장을 마주 보게 부착(양옆 또는 위아래로 감싸기) — 어깨·관절은 앞뒤·위아래로, 목은 척추 뼈 비우고 좌우로, 무릎·팔꿈치는 관절 위·아래로, 등·허리는 척추 비우고 좌우, 허벅지·종아리는 근육 결 따라. 양쪽 어깨는 채널을 좌우로 분리",
    pose: "편안히 기대거나 누운 정적 휴식 자세",
    intensity: "피부 아래 기분 좋게 찌릿·따끔한 느낌(근육이 튕기지 않게, MI-TENS 자동 제어)",
    caution: "주사 바늘 자국 바로 위·가슴(심장)을 가로지르는 부착 금지. 통증만 가려주므로 무리한 움직임 주의. 5일 이상 호전 없으면 진료."
  },
  {
    cat: "Pain management", en: "Muscle pain", ko: "근육통 완화 (만성 뭉침·결림)", type: "twitch",
    desc: "엔도르핀 분비를 촉진하고 뭉친 근육의 혈류를 늘려 오래된 결림과 근육통을 풀어 줍니다.",
    steps: [
      "패드 부착·케이블 연결 후 <span class='kbd'>On/Off</span> 로 켜기",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Pain management</strong> 선택 → <span class='kbd'>Ch 4 +</span>",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Muscle pain</strong> 선택 → <span class='kbd'>Ch 4 +</span>",
      "부위 선택 화면이 뜨면 <span class='kbd'>Ch 1 +/-</span> 로 부위 선택 → <span class='kbd'>Ch 4 +</span> 후 강도 조절"
    ],
    diagrams: ["neck", "shoulder", "both_scapula", "back", "arm", "thigh", "calf"],
    tags: "목 통증 경추 승모근 목뒤 담 결림 거북목 근육통 결림",
    pads: "뻐근한 근육을 따라 근복 중앙과 위·아래 끝에 2장 — 승모근은 목델미 안쪽부터 어깨 끝, 허리는 척추 뼈 비우고 좌우 대칭, 견갑골 안쪽은 작은 패드 2장씩, 팔은 이두·삼두 근복, 허벅지는 중앙과 무릎 위, 종아리는 두 갈래에 위아래로",
    pose: "편안한 휴식 자세(의자에 기대거나 엎드려 목 힘을 뺀 자세)",
    intensity: "근육이 눈에 보일 정도로 톡톡 튀는 범위(MI-RANGE 체크 표시 확인)",
    caution: "급성 염좌나 붓기·열감이 심한 부위는 피하고, 척추 뼈 정중앙 직접 부착 금지."
  },
  {
    cat: "Pain management", en: "Back pain", ko: "허리(등) 통증", type: "twitch",
    desc: "등과 허리의 굳은 척추기립근을 리드미컬하게 풀어 주어 요통·등 결림을 완화합니다.",
    steps: [
      "패드 부착 후 <span class='kbd'>On/Off</span> 로 켜기",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Pain management</strong> → <span class='kbd'>Ch 4 +</span>",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Back pain</strong> → <span class='kbd'>Ch 4 +</span>",
      "MI-SCAN 측정 후 <span class='kbd'>Ch 1~4 +</span> 로 근육이 톡톡 튀는 수준까지 올리기"
    ],
    diagrams: ["back"],
    pads: "척추 뼈 정중앙을 비우고 좌우 척추기립근에 대칭으로 2장씩(4채널이면 허리·등 두 높이)",
    pose: "엎드리거나 의자에 기대어 허리 긴장을 푼 자세",
    intensity: "기분 좋게 근육이 톡톡 튀는 수준",
    caution: "디스크 급성기(다리 저림 동반)나 척추 뼈 바로 위 부착 금지."
  },
  {
    cat: "Pain management", en: "Heavy legs", ko: "다리 피로 · 부종(무거움) 완화", type: "twitch",
    desc: "오래 서 있거나 걸은 날 종아리·하체의 정맥 순환을 도와 붓기와 무거움을 빼 줍니다.",
    steps: [
      "패드 부착 후 <span class='kbd'>On/Off</span> 로 켜기",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Pain management</strong> → <span class='kbd'>Ch 4 +</span>",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Heavy legs</strong> → <span class='kbd'>Ch 4 +</span>",
      "사용 채널 <span class='kbd'>Ch 1~4 +</span> 로 종아리가 규칙적으로 톡톡 튕길 때까지 올리기"
    ],
    diagrams: ["calf", "thigh"],
    pads: "종아리 근육 안쪽·바깥쪽 두 갈래에 위·아래로 2장씩 — 허벅지까지 무거우면 허벅지 뒤 중앙+무릎 위, 발목 부종엔 종아리 아래쪽. 오금·아킬레스건 바로 위는 피하기",
    pose: "다리를 살짝 올리고 편히 눕거나 앉은 자세",
    intensity: "종아리가 규칙적으로 톡톡 튕길 정도",
    caution: "심부정맥 혈전증·심한 정맥류 부위에는 사용 금지."
  },
  {
    cat: "Pain management", en: "Cramp prevention", ko: "경련(쥐) 예방", type: "twitch",
    desc: "야간이나 운동 중 쥐가 잘 나는 근육의 혈류와 긴장도를 미리 정리해 경련을 예방합니다.",
    steps: [
      "패드 부착 후 <span class='kbd'>On/Off</span> 로 켜기",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Pain management</strong> → <span class='kbd'>Ch 4 +</span>",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Cramp prevention</strong> → <span class='kbd'>Ch 4 +</span>",
      "부위 선택 후 <span class='kbd'>Ch 4 +</span> → 근육이 톡톡 튀는 선까지 강도 올리기"
    ],
    diagrams: ["calf", "thigh"],
    tags: "햄스트링 허벅지 뒤쪽 뒤허벅지 둔근 엉덩이 골반 허리 엉치 다리 쥐 경련 근경련 Prevention of cramps 야간 쥐",
    pads: "쥐가 잘 나는 근육의 근복 중앙과 끝에 2장 — 종아리(가장 흔함)는 두 갈래 위아래, 햄스트링은 허벅지 뒤 중앙+무릎 위, 발가락 쥐는 정강이 바깥 근육",
    pose: "편안한 휴식 자세(운동 전 또는 잠자기 전)",
    intensity: "근육이 톡톡 튀는 수준",
    caution: "현재 쥐가 난 직후 통증이 심할 땐 강도를 아주 약하게 시작."
  },
  {
    cat: "Pain management", en: "Reduce muscle tension", ko: "근긴장 완화 (뭉침·경직 풀기)", type: "twitch",
    desc: "스트레스나 잘못된 자세로 뻣뻣하게 굳은 근육의 긴장을 낮추고 부드럽게 이완시킵니다.",
    steps: [
      "패드 부착 후 <span class='kbd'>On/Off</span> 로 켜기",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Pain management</strong> → <span class='kbd'>Ch 4 +</span>",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Reduce muscle tension</strong> → <span class='kbd'>Ch 4 +</span>",
      "부위 선택 후 <span class='kbd'>Ch 4 +</span> → 가볍게 톡톡 튕기는 수준까지 올리기"
    ],
    diagrams: ["shoulder", "neck", "both_scapula", "back", "thigh", "calf"],
    tags: "햄스트링 허벅지 뒤쪽 뒤허벅지 둔근 엉덩이 골반 허리 긴장 이완 스트레칭 후 허리 보호 목 승모근 경추 목뒤 거북목 담 결림",
    pads: "뭉친 근육의 양 끝에 2장 — 목·승모근은 목델미 안쪽에서 어깨 끝까지, 어깨는 상부 승모근↔후면 삼각근, 등은 견갑골 안쪽 모서리(또는 양쪽 견갑골), 허벅지 뒤는 중앙과 무릎 위, 종아리는 근육 두 갈래에 위아래로",
    pose: "어깨 힘을 뺀 편안한 자세",
    intensity: "가볍게 근육이 톡톡 튕기는 수준",
    caution: "목 앞쪽(경동맥)·목젖 부위와 쇄골 바로 위 신경 부위 피하기. 고강도 근수축은 목 통증 급성기에 금지."
  },
  {
    cat: "Pain management", en: "Tendinitis", ko: "건염(힘줄염) 통증 완화", type: "tens",
    desc: "어깨 힘줄염·테니스엘보 등 힘줄 주변의 찌릿한 통증을 근육 수축 없이 진통 파형으로 진정시킵니다.",
    steps: [
      "패드 부착 후 <span class='kbd'>On/Off</span> 로 켜기",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Pain management</strong> → <span class='kbd'>Ch 4 +</span>",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Tendinitis</strong> → <span class='kbd'>Ch 4 +</span>",
      "MI 센서 연결 시 <strong>MI-TENS</strong> 자동 활성 → 기분 좋은 찌릿한 선까지만 올리기"
    ],
    diagrams: ["shoulder", "arm", "calf"],
    pads: "통증이 있는 힘줄을 사이에 두고 양옆 또는 위아래로 감싸 부착(가장 아픈 점을 가운데 두기) — 어깨 극상건(팔 들 때 아픈 곳)은 어깨 앞·위쪽에서 위아래로, 테니스엘보는 팔꿈치 바깥 뼈 양옆, 아킬레스건은 힘줄 좌우로",
    pose: "관절을 편하게 둔 정적 휴식 자세",
    intensity: "찌릿한 감각 수준(MI-TENS로 근수축 방지)",
    caution: "주사 맞은 직후 48시간은 바늘 자국 위 피하기. 염증성 열감이 심할 땐 냉찜질 우선."
  },
  {
    cat: "Pain management", en: "Neck pain", ko: "목 통증 완화 (목 뒤·승모근)", type: "twitch",
    desc: "목 뒤와 승모근의 뻣뻣한 긴장을 낮추고 혈류를 늘려 목 통증·담 결림을 완화합니다.",
    steps: [
      "패드 부착 후 <span class='kbd'>On/Off</span> 로 켜기",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Pain management</strong> → <span class='kbd'>Ch 4 +</span>",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Neck pain</strong> → <span class='kbd'>Ch 4 +</span>",
      "부위 선택 후 <span class='kbd'>Ch 4 +</span> → 목 뒤 근육이 가볍게 톡톡 튀는 선까지 올리기"
    ],
    diagrams: ["neck", "shoulder", "both_shoulders", "back"],
    tags: "목 통증 경추 승모근 목뒤 담 결림 거북목 거북이목 Neck pain 목 아픔 뻣뻣",
    pads: "목 뒤 좌우 승모근 상부에 채널을 좌·우로 나눠 세로로 2장씩 — 어깨 안쪽과 목이 만나는 지점에서 2~3cm 위부터, 각 채널 +/−는 같은 쪽 안에서 위·아래. 목덜미가 넓게 뻐근하면 양쪽 어깨 도해로 상부 승모근↔어깨 끝",
    pose: "목 힘을 뺀 편안한 자세(엎드려 이마를 받치거나 의자에 기대기)",
    intensity: "목 뒤 근육이 가볍게 톡톡 튀는 수준",
    caution: "목 앞쪽(경동맥)·목뼈 돌기 바로 위 부착 금지. 목이 아플 때 고강도 근수축은 피하고, 팔 저림이 동반되면 진료 우선."
  },

  // Recovery/Massage (5)
  {
    cat: "Recovery/Massage", en: "Training recovery", ko: "운동 후 회복 (혈류·피로 물질 배출)", type: "twitch",
    desc: "운동이 끝난 뒤 근육에 쌓인 피로 물질을 빠르게 씻어 내고 다음 날 근육통을 줄여 줍니다.",
    steps: [
      "패드 부착 후 <span class='kbd'>On/Off</span> 로 켜기",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Recovery/Massage</strong> → <span class='kbd'>Ch 4 +</span>",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Training recovery</strong> → <span class='kbd'>Ch 4 +</span>",
      "부위 선택 → <span class='kbd'>Ch 4 +</span> → MI-RANGE 범위(톡톡 튕김)까지 강도 올리기"
    ],
    diagrams: ["thigh", "calf", "shoulder", "back", "arm"],
    tags: "햄스트링 허벅지 뒤쪽 뒤허벅지 둔근 엉덩이 골반 계단 걷기 운동 후 회복",
    pads: "운동을 많이 한 근육을 큰 패드로 넓게 덮기 — 허벅지는 앞·뒤 근육 전반, 종아리는 두 갈래, 어깨 뒤·등은 근육 결 따라, 팔은 이두·삼두 근복에 2장씩(4채널 권장)",
    pose: "운동 종료 후 3시간 이내, 편안한 휴식 자세",
    intensity: "근육이 눈에 띄게 톡톡 튀는 범위(MI-RANGE 확인)",
    caution: "근육 찢어짐(열상)·급성 부상이 의심되면 사용 금지."
  },
  {
    cat: "Recovery/Massage", en: "Competition recovery", ko: "고강도 활동·경기 후 회복", type: "twitch",
    desc: "장거리 산행·경기 등 평소보다 훨씬 무리한 날 깊은 근육 피로를 집중 회복합니다.",
    steps: [
      "패드 부착 후 <span class='kbd'>On/Off</span> 로 켜기",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Recovery/Massage</strong> → <span class='kbd'>Ch 4 +</span>",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Competition recovery</strong> → <span class='kbd'>Ch 4 +</span>",
      "부위 선택 → <span class='kbd'>Ch 4 +</span> → 눈에 보이는 근경련 수준까지 서서히 올리기"
    ],
    diagrams: ["thigh", "calf", "back", "shoulder"],
    pads: "피로가 큰 대근육 위주로 4채널 — 허벅지 앞·뒤, 종아리, 등, 어깨 뒤에 큰 패드 2장씩",
    pose: "편안히 누운 휴식 자세",
    intensity: "눈에 보이는 근경련(톡톡 튕김) 수준까지 서서히",
    caution: "탈수·어지럼증이 있을 땐 수분 섭취 후 사용."
  },
  {
    cat: "Recovery/Massage", en: "Relaxing massage", ko: "릴랙싱 마사지 (가벼운 이완)", type: "twitch",
    desc: "부드러운 마사지 리듬으로 하루 동안 긴장된 어깨·등·다리를 편안하게 풀어 줍니다.",
    steps: [
      "패드 부착 후 <span class='kbd'>On/Off</span> 로 켜기",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Recovery/Massage</strong> → <span class='kbd'>Ch 4 +</span>",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Relaxing massage</strong> → <span class='kbd'>Ch 4 +</span>",
      "부위 선택 → <span class='kbd'>Ch 4 +</span> → 기분 좋게 톡톡 튕기는 선까지 올리기"
    ],
    diagrams: ["shoulder", "neck", "both_scapula", "back", "thigh", "calf"],
    tags: "햄스트링 허벅지 뒤쪽 뒤허벅지 둔근 엉덩이 골반 허리 가벼운 이완 마사지 목 승모근 경추 견갑골",
    pads: "긴장된 부위의 양 끝에 2장 — 어깨는 상부 승모근+후면 삼각근, 목은 척추 비우고 좌우 승모근 상부, 등은 견갑골 안쪽(또는 양쪽 견갑골), 허벅지 뒤·종아리는 근육 결 따라",
    pose: "긴장을 푼 편안한 자세",
    intensity: "부드럽고 기분 좋게 톡톡 튕기는 수준",
    caution: "목 앞쪽·심장 부위 부착 금지. 운전 중 사용 금지."
  },
  {
    cat: "Recovery/Massage", en: "Reduce muscle soreness", ko: "근육통(알배김·DOMS) 줄이기", type: "twitch",
    desc: "운동 다음 날이나 그다음 날 뻐근하게 알이 배겼을 때 불편감을 덜어 주는 회복 코스입니다.",
    steps: [
      "패드 부착 후 <span class='kbd'>On/Off</span> 로 켜기",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Recovery/Massage</strong> → <span class='kbd'>Ch 4 +</span>",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Reduce muscle soreness</strong> → <span class='kbd'>Ch 4 +</span>",
      "부위 선택 → <span class='kbd'>Ch 4 +</span> → 통증 없는 선에서 톡톡 튕길 때까지 올리기"
    ],
    diagrams: ["thigh", "calf", "arm", "shoulder"],
    pads: "운동 다음 날 뻐근한 근육을 따라 2장씩 — 허벅지 앞·뒤, 종아리, 어깨 뒤, 팔(이두·삼두). 알이 배긴 곳을 가운데 두고 위·아래로",
    pose: "편안한 휴식 자세",
    intensity: "통증이 유발되지 않는 선에서 근육이 톡톡 튕길 정도",
    caution: "이미 알이 심하게 배겼을 때 강도를 너무 높이면 오히려 아플 수 있음."
  },
  {
    cat: "Recovery/Massage", en: "Reviving massage", ko: "활력 마사지 (피로감 해소)", type: "twitch",
    desc: "몸이 나른하고 무거울 때 산소·혈류 순환을 깨워 개운한 느낌을 주는 마사지 모드입니다.",
    steps: [
      "패드 부착 후 <span class='kbd'>On/Off</span> 로 켜기",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Recovery/Massage</strong> → <span class='kbd'>Ch 4 +</span>",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Reviving massage</strong> → <span class='kbd'>Ch 4 +</span>",
      "부위 선택 → <span class='kbd'>Ch 4 +</span> → 리드미컬하게 튕기는 수준까지 올리기"
    ],
    diagrams: ["calf", "thigh", "shoulder", "neck"],
    pads: "피곤하고 무거운 근육(종아리·허벅지·상부 승모근·어깨 뒤) 근복 중앙과 끝",
    tags: "목 승모근 경추 어깨 뒤 담 결림",
    pose: "앉거나 누운 편안한 자세",
    intensity: "리드미컬하게 근육이 톡톡 튕기는 수준",
    caution: "취침 직전엔 각성감이 들 수 있어 저녁 시간대 권장."
  },

  // Rehabilitation (2)
  {
    cat: "Rehabilitation", en: "Muscle atrophy", ko: "근위축 예방·회복 (약해진 근육 깨우기)", type: "tetanic",
    desc: "통증이나 고정으로 오래 못 써서 빠진 근육량을 다시 안전하게 깨우는 재활 입문 코스입니다.",
    steps: [
      "패드 부착 후 <span class='kbd'>On/Off</span> 로 켜기",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Rehabilitation</strong> → <span class='kbd'>Ch 4 +</span>",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Muscle atrophy</strong> → <span class='kbd'>Ch 4 +</span>",
      "부위·단계 선택(처음엔 <strong>Level 1</strong>) → <span class='kbd'>Ch 4 +</span> 후 수축 시 자세 고정"
    ],
    diagrams: ["shoulder", "neck", "thigh", "arm", "calf"],
    pads: "어깨: 큰 패드 = 삼각근 근복(옆·뒤 볼록한 곳), 작은 패드 = 상부 승모근 또는 후면 삼각근 끝 — 허벅지·팔·종아리는 근복 중앙 2장을 근육 결 따라(관절 건너지 않기)",
    pose: "관절이 과하게 꺾이지 않는 안정된 자세(등척성 버티기)",
    intensity: "부드럽게 근수축이 일어나는 선부터 점진적 상향",
    caution: "어깨 염증·주사 직후 48시간은 보류. 수축 시 관절 통증이 나면 즉시 강도 하향."
  },
  {
    cat: "Rehabilitation", en: "Reinforcement", ko: "근력 보강 (재활 마무리 단계)", type: "tetanic",
    desc: "Muscle atrophy로 기초 근육이 돌아온 뒤 일상 복귀를 위해 힘을 더 탄탄히 다지는 단계입니다.",
    steps: [
      "패드 부착 후 <span class='kbd'>On/Off</span> 로 켜기",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Rehabilitation</strong> → <span class='kbd'>Ch 4 +</span>",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Reinforcement</strong> → <span class='kbd'>Ch 4 +</span>",
      "부위·레벨 선택(<strong>Level 1</strong>부터) → <span class='kbd'>Ch 4 +</span> 후 등척성 고정 자세 유지"
    ],
    diagrams: ["shoulder", "neck", "thigh", "arm"],
    pads: "회복된 목표 근육의 근복 중앙(+)와 끝(−) — 어깨는 큰 패드 = 삼각근 근복, 작은 패드 = 상부 승모근/후면 삼각근 끝, 허벅지는 중앙+무릎 위, 팔은 이두·삼두 근복",
    pose: "팔·다리를 고정한 등척성 자세(수축 중 관절 튕김 방지)",
    intensity: "Muscle atrophy에 충분히 적응한 뒤 참을 수 있는 중·고강도",
    caution: "통증이 남아 있는 관절이나 급성 염증기에는 사용 금지."
  },

  // Conditioning (10)
  {
    cat: "Conditioning", en: "Endurance", ko: "근지구력 강화", type: "tetanic",
    desc: "오래 지치지 않고 버티는 근지구력을 키워 등산·러닝·장시간 서 있기에 도움을 줍니다.",
    steps: [
      "패드 부착 후 <span class='kbd'>On/Off</span> 로 켜기",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Conditioning</strong> → <span class='kbd'>Ch 4 +</span>",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Endurance</strong> → <span class='kbd'>Ch 4 +</span>",
      "부위·레벨 선택(<strong>Level 1</strong> 권장) → <span class='kbd'>Ch 4 +</span> 후 수축 시 고정 버티기"
    ],
    diagrams: ["thigh", "calf", "back"],
    pads: "하체 중심 — 대퇴사두(허벅지 앞 위쪽 근복+무릎 위), 햄스트링(뒤 중앙+무릎 위), 종아리 두 갈래에 2장씩. 허리까지 넣으면 척추 비우고 기립근",
    pose: "등척성 고정 자세(앉아서 발목 고정 등)",
    intensity: "통증 없는 범위 내 높은 수축 강도",
    caution: "아픈 관절(현재 치료 중인 어깨)에는 통증 완전히 가라앉기 전까지 비추천."
  },
  {
    cat: "Conditioning", en: "Resistance", ko: "저항력 (고강도 근지구력)", type: "tetanic",
    desc: "높은 힘을 오래 유지하는 능력을 기르는 중·상급자용 근지구력 트레이닝입니다.",
    steps: [
      "패드 부착 후 <span class='kbd'>On/Off</span> 로 켜기",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Conditioning</strong> → <span class='kbd'>Ch 4 +</span>",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Resistance</strong> → <span class='kbd'>Ch 4 +</span>",
      "부위·레벨 선택 → <span class='kbd'>Ch 4 +</span> 후 단단히 버티며 강도 조절"
    ],
    diagrams: ["thigh", "calf", "back", "arm"],
    pads: "대근육(대퇴사두·둔근·삼두·등·종아리)의 근복 중앙과 끝에 2장씩 — 4채널 권장, 관절 건너지 않기",
    pose: "단단히 버티는 등척성 자세",
    intensity: "참을 수 있는 최대 강도 목표(3~5회 수축마다 조금씩 증량)",
    caution: "초보자·통증 부위 바로 적용 금지. 충분한 워밍업 후 사용."
  },
  {
    cat: "Conditioning", en: "Strength", ko: "근력 강화", type: "tetanic",
    desc: "순수 최대 근력을 끌어올리는 대표적인 EMS 근력 프로그램입니다.",
    steps: [
      "패드 부착 후 <span class='kbd'>On/Off</span> 로 켜기",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Conditioning</strong> → <span class='kbd'>Ch 4 +</span>",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Strength</strong> → <span class='kbd'>Ch 4 +</span>",
      "부위·레벨 선택(<strong>Level 1</strong> 시작) → <span class='kbd'>Ch 4 +</span> 후 관절 고정 유지"
    ],
    diagrams: ["thigh", "arm", "back"],
    pads: "운동점(+) + 끝(−) — 대퇴사두는 허벅지 앞 위쪽 근복과 무릎 위, 이두는 볼록한 중앙과 팔꿈치 위, 삼두·등도 근복+끝",
    pose: "관절이 짧아지지 않게 고정한 등척성 자세",
    intensity: "고강도 근수축(근육 쥐 남 방지 위해 자세 고정 필수)",
    caution: "유착성 관절낭염·충돌증후군이 있는 어깨에는 의사 확인 전 사용 보류."
  },
  {
    cat: "Conditioning", en: "Explosive strength", ko: "순발력 · 폭발력", type: "tetanic",
    desc: "짧은 순간에 폭발적으로 힘을 내는 속근 섬유를 집중 자극합니다.",
    steps: [
      "패드 부착 후 <span class='kbd'>On/Off</span> 로 켜기",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Conditioning</strong> → <span class='kbd'>Ch 4 +</span>",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Explosive strength</strong> → <span class='kbd'>Ch 4 +</span>",
      "부위·레벨 선택 → <span class='kbd'>Ch 4 +</span> 후 아주 단단히 고정한 자세로 진행"
    ],
    diagrams: ["thigh", "calf"],
    pads: "하체 대근육(대퇴사두·둔근·종아리)에 2장씩 — 힘줄·관절을 넘지 않게, 가슴은 좌우로 가로지르지 않기",
    pose: "아주 단단한 등척성 자세(수축이 매우 짧고 강함)",
    intensity: "최대 허용 강도",
    caution: "수축이 갑자기 강하게 들어오므로 힘줄·관절 부상 이력 부위는 피하기."
  },
  {
    cat: "Conditioning", en: "Cross-training", ko: "크로스 트레이닝 (복합 근력)", type: "tetanic",
    desc: "지구력·근력·순발력 자극을 한 세션 안에 섞어 전신 운동 효과를 냅니다.",
    steps: [
      "패드 부착 후 <span class='kbd'>On/Off</span> 로 켜기",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Conditioning</strong> → <span class='kbd'>Ch 4 +</span>",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Cross-training</strong> → <span class='kbd'>Ch 4 +</span>",
      "부위·레벨 선택 → <span class='kbd'>Ch 4 +</span> 후 동작 또는 고정 자세 병행"
    ],
    diagrams: ["thigh", "abs", "arm", "back"],
    pads: "그날 쓸 주요 근육군을 골라 근복 중앙+끝에 2장씩 — 하체(허벅지·종아리), 코어(복부·허리), 상체(팔·등) 어디든 채널당 한 근육 안에서만",
    pose: "동작과 결합하거나 등척성 고정 자세",
    intensity: "중~고강도",
    caution: "동작과 병행 시 전선에 걸리거나 자세가 무너지지 않게 주의."
  },
  {
    cat: "Conditioning", en: "Core stabilisation", ko: "코어 안정화 (복부·허리)", type: "tetanic",
    desc: "배와 허리를 동시에 단단히 잡아 주어 자세 균형과 허리 지지력을 높여 줍니다.",
    steps: [
      "패드 부착 후 <span class='kbd'>On/Off</span> 로 켜기",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Conditioning</strong> → <span class='kbd'>Ch 4 +</span>",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Core stabilisation</strong> → <span class='kbd'>Ch 4 +</span>",
      "레벨 선택(<strong>Level 1</strong>) → <span class='kbd'>Ch 4 +</span> 후 무릎 세우고 복부 힘주며 시작"
    ],
    diagrams: ["abs", "back"],
    pads: "복부(배꼽 양옆 복직근) + 허리 기립근(척추 뼈 비우고 좌우 대칭) — 4채널이면 복부 2장 + 허리 2장",
    pose: "플랭크 변형 또는 무릎 세우고 누워 배에 힘주는 자세",
    intensity: "복부와 허리가 단단히 조여지는 수준",
    caution: "허리 디스크 급성 통증 시 보류, 임산부 금지."
  },
  {
    cat: "Conditioning", en: "Hypertrophy", ko: "근비대 (근육 크기 키우기)", type: "tetanic",
    desc: "근육 단면적을 키우는 데 맞춘 고강도 수축·충분한 휴식 리듬 프로그램입니다.",
    steps: [
      "패드 부착 후 <span class='kbd'>On/Off</span> 로 켜기",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Conditioning</strong> → <span class='kbd'>Ch 4 +</span>",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Hypertrophy</strong> → <span class='kbd'>Ch 4 +</span>",
      "부위·레벨 선택 → <span class='kbd'>Ch 4 +</span> 후 관절을 고정한 채 강도 올리기"
    ],
    diagrams: ["arm", "thigh", "abs", "shoulder"],
    pads: "키우려는 근육의 근복 중앙(+)와 끝(−) — 이두·삼두는 팔꿈치 위, 허벅지는 무릎 위, 복부는 배꼽 양옆, 삼각근은 어깨 끝(가슴·목은 가로지르지 않게)",
    pose: "등척성 자세",
    intensity: "고강도(휴식 시간 포함, 주 3회 권장)",
    caution: "통증이 있는 어깨 관절 주변에는 추천하지 않음."
  },
  {
    cat: "Conditioning", en: "Muscle building", ko: "근육 형성 (기초 근매스)", type: "tetanic",
    desc: "운동을 막 시작했거나 기초 근육량·탄력을 균형 있게 만들고 싶을 때 적합합니다.",
    steps: [
      "패드 부착 후 <span class='kbd'>On/Off</span> 로 켜기",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Conditioning</strong> → <span class='kbd'>Ch 4 +</span>",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Muscle building</strong> → <span class='kbd'>Ch 4 +</span>",
      "부위·레벨 선택(<strong>Level 1</strong>) → <span class='kbd'>Ch 4 +</span> 후 자세 고정"
    ],
    diagrams: ["thigh", "arm", "abs", "back"],
    pads: "목표 근육의 중앙과 끝에 2장 — 이두·대퇴사두·복직근·등 기립근 순으로, 초보는 큰 근육 한 곳부터",
    pose: "등척성 자세",
    intensity: "중~고강도",
    caution: "관절 통증 시 중단. 회복 프로그램과 병행 권장."
  },
  {
    cat: "Conditioning", en: "Warm-up", ko: "준비운동 (워밍업)", type: "twitch",
    desc: "운동 시작 전 근육 온도와 혈류를 빠르게 끌어올려 부상을 예방하는 준비 코스입니다.",
    steps: [
      "패드 부착 후 <span class='kbd'>On/Off</span> 로 켜기",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Conditioning</strong> → <span class='kbd'>Ch 4 +</span>",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Warm-up</strong> → <span class='kbd'>Ch 4 +</span>",
      "부위 선택 → <span class='kbd'>Ch 4 +</span> → 근육이 가볍게 톡톡 튕길 때까지 올리기"
    ],
    diagrams: ["thigh", "calf", "shoulder", "back"],
    pads: "운동할 주요 근육(허벅지·종아리·어깨 뒤 삼각근·승모근·등)의 근복 중앙과 끝",
    pose: "편안히 앉거나 선 자세",
    intensity: "근육이 가볍게 톡톡 튕기며 따뜻해지는 느낌",
    caution: "실제 스트레칭·관절 풀기를 완전히 대체할 수는 없음."
  },
  {
    cat: "Conditioning", en: "Capillarisation", ko: "모세혈관 활성화 (혈류 개선)", type: "twitch",
    desc: "미세 혈관을 확장해 산소 공급을 늘려 주며, 수축 부담 없이 회복·혈액순환에 좋습니다.",
    steps: [
      "패드 부착 후 <span class='kbd'>On/Off</span> 로 켜기",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Conditioning</strong> → <span class='kbd'>Ch 4 +</span>",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Capillarisation</strong> → <span class='kbd'>Ch 4 +</span>",
      "부위 선택 → <span class='kbd'>Ch 4 +</span> → MI-RANGE(톡톡 튕김) 범위까지 올리기"
    ],
    diagrams: ["calf", "thigh", "shoulder", "back"],
    tags: "햄스트링 허벅지 뒤쪽 뒤허벅지 둔근 엉덩이 골반 허리 혈류 순환",
    pads: "혈류를 늘리고 싶은 근육을 큰 패드로 넓게 덮기(종아리·허벅지·어깨 뒤·등) — 위치 정밀도는 덜 중요",
    pose: "편안한 휴식 자세",
    intensity: "눈에 보이는 근경련(톡톡 튕김) 범위(MI-RANGE 확인)",
    caution: "심한 정맥류·출혈성 질환 부위 피하기."
  },

  // Fitness (5)
  {
    cat: "Fitness", en: "Firm your arms", ko: "팔 탄력 (이두·삼두)", type: "tetanic",
    desc: "팔뚝 앞·뒤 근육을 탄탄하게 다듬어 처짐을 줄이고 힘을 기르는 피트니스 코스입니다.",
    steps: [
      "패드 부착 후 <span class='kbd'>On/Off</span> 로 켜기",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Fitness</strong> → <span class='kbd'>Ch 4 +</span>",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Firm your arms</strong> → <span class='kbd'>Ch 4 +</span>",
      "레벨 선택(<strong>Level 1</strong>) → <span class='kbd'>Ch 4 +</span> 후 팔꿈치를 몸에 붙이고 진행"
    ],
    diagrams: ["arm"],
    pads: "이두: 팔 앞 볼록한 근복 중앙 + 팔꿈치 바로 위 / 삼두: 팔 뒤 중앙 + 팔꿈치 뒤 위 — 팔꿈치 관절·거드랑이·손목 뼈 피하기",
    pose: "팔꿈치를 몸통에 붙이고 각도를 고정한 자세",
    intensity: "팔 근육이 단단히 수축되는 중~고강도",
    caution: "어깨가 아프면 팔을 들지 말고 몸에 붙인 채로만 시행."
  },
  {
    cat: "Fitness", en: "Tone your thighs", ko: "허벅지 탄력", type: "tetanic",
    desc: "허벅지 앞·뒤 라인을 매끈하고 탄력 있게 가꾸어 주는 하체 전용 코스입니다.",
    steps: [
      "패드 부착 후 <span class='kbd'>On/Off</span> 로 켜기",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Fitness</strong> → <span class='kbd'>Ch 4 +</span>",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Tone your thighs</strong> → <span class='kbd'>Ch 4 +</span>",
      "레벨 선택(<strong>Level 1</strong>) → <span class='kbd'>Ch 4 +</span> 후 의자에 앉아 발목 고정"
    ],
    diagrams: ["thigh"],
    pads: "대퇴사두: 허벅지 앞 위쪽 근복 + 무릎 바로 위 / 햄스트링: 허벅지 뒤 중앙 + 무릎 뒤 위 / 둔근: 엉덩이 볼록한 곳 위·아래 — 4채널이면 좌우 나눠",
    pose: "의자에 앉아 발목을 고정(무릎 펴짐 방지)",
    intensity: "중~고강도",
    caution: "무릎이 튕기지 않게 발목 고정 필수."
  },
  {
    cat: "Fitness", en: "Get a 6-pack", ko: "복근 강화 (식스팩)", type: "tetanic",
    desc: "복직근을 강하게 수축시켜 복근 선명도와 코어 힘을 집중적으로 끌어올립니다.",
    steps: [
      "패드 부착 후 <span class='kbd'>On/Off</span> 로 켜기",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Fitness</strong> → <span class='kbd'>Ch 4 +</span>",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Get a 6-pack</strong> → <span class='kbd'>Ch 4 +</span>",
      "레벨 선택(<strong>Level 1</strong>) → <span class='kbd'>Ch 4 +</span> 후 무릎 굽히고 누워서 진행"
    ],
    diagrams: ["abs"],
    pads: "배꼽 좌우 복직근에 상·하 2쌍(4채널) — 배꼽 바로 위는 비우고 좌우 대칭",
    pose: "무릎 굽히고 누워 숨 내쉬며 복부 살짝 긴장",
    intensity: "참을 수 있는 중~고강도",
    caution: "식사 직후·임신 중·복부 수술 부위 금지."
  },
  {
    cat: "Fitness", en: "Shape your buttocks", ko: "엉덩이 탄력 (둔근 강화)", type: "tetanic",
    desc: "둔근(엉덩이)을 집중 수축시켜 탄력과 볼륨을 잡아 주는 하체 피트니스 코스입니다.",
    steps: [
      "패드 부착 후 <span class='kbd'>On/Off</span> 로 켜기",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Fitness</strong> → <span class='kbd'>Ch 4 +</span>",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Shape your buttocks</strong> → <span class='kbd'>Ch 4 +</span>",
      "레벨 선택(<strong>Level 1</strong>) → <span class='kbd'>Ch 4 +</span> 후 앉아서 엉덩이에 힘주며 진행"
    ],
    diagrams: ["thigh"],
    pads: "큰 패드(5×10)는 둔근 상단(엉덩이 볼록한 곳 위), 작은 패드(5×5)는 둔근 중앙·아래 — 좌우 대칭으로 붙이고 엉덩이 가운데(꼬리뼈·치골)와 사타구니 뼈 위는 피하기",
    pose: "의자에 앉아 상체를 살짝 세우고 엉덩이에 힘이 들어가는 자세(허리는 젖히지 않기)",
    intensity: "엉덩이가 단단히 조여드는 중~고강도",
    caution: "엉덩이 가운데(꼬리뼈·치골)·사타구니 뼈 위 부착 금지. 허리 통증이 있으면 상체를 젖히지 말고 앉은 자세로만."
  },
  {
    cat: "Fitness", en: "Firm your stomach", ko: "복부 탄력 (허리둘레 정리)", type: "tetanic",
    desc: "복부 전반과 옆구리 탄력을 높여 허리둘레를 탄탄하게 잡아 줍니다.",
    steps: [
      "패드 부착 후 <span class='kbd'>On/Off</span> 로 켜기",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Fitness</strong> → <span class='kbd'>Ch 4 +</span>",
      "<span class='kbd'>Ch 1 +/-</span> → <strong>Firm your stomach</strong> → <span class='kbd'>Ch 4 +</span>",
      "레벨 선택(<strong>Level 1</strong>) → <span class='kbd'>Ch 4 +</span> 후 무릎 세우고 누워 진행"
    ],
    diagrams: ["abs"],
    pads: "배꼽 양옆 복직근 + 옆구리(복사근)에 대칭으로 — 허리를 감싸듯 좌우로, 식후 1시간 이후",
    pose: "무릎 세우고 누운 자세",
    intensity: "중강도 이상",
    caution: "생리통 심할 때나 식후 직후 피하기."
  }
];
window.PROGRAMS.forEach((p, i) => { p.id = "p" + i; });

window.PROGRAM_BY_EN = {};
window.PROGRAMS.forEach(p => { window.PROGRAM_BY_EN[p.en] = p; });

/* 구버전 이름 호환 — SP 4.0에 없는 옛 이름(Muscle relaxation·Endorphinic·Get stronger biceps)이
   이미 저장된 기록·목표·북마크에 남아 있어도 가장 가까운 공식 프로그램으로 읽어 준다. */
window.LEGACY_PROGRAM_EN = {
  "Muscle relaxation": "Reduce muscle tension",
  "Endorphinic": "Muscle pain",
  "Get stronger biceps": "Firm your arms"
};
Object.keys(window.LEGACY_PROGRAM_EN).forEach((oldEn) => {
  const target = window.PROGRAM_BY_EN[window.LEGACY_PROGRAM_EN[oldEn]];
  if (target) window.PROGRAM_BY_EN[oldEn] = target;
});

window.CAT_LABEL = {
  "Pain management": "통증 관리",
  "Recovery/Massage": "회복/마사지",
  "Rehabilitation": "재활",
  "Conditioning": "컨디셔닝",
  "Fitness": "피트니스"
};

window.TYPE_LABEL = {
  tens: { text: "진통 TENS (찌릿함)", cls: "tens", short: "TENS" },
  twitch: { text: "근육 튕김 (이완·회복)", cls: "twitch", short: "튕김" },
  tetanic: { text: "고강도 근수축 (근력)", cls: "tetanic", short: "근수축" }
};

window.DIAGRAM_LABELS = {
  both_shoulders: "양쪽 어깨",
  shoulder: "한쪽 어깨",
  neck: "목·승모근",
  both_scapula: "양쪽 견갑골",
  arm: "팔·전완",
  back: "등·허리",
  abs: "복부·코어",
  thigh: "엉덩이·허벅지",
  calf: "종아리·정강이"
};

window.DIAGRAM_IMG = {
  both_shoulders: "assets/compex_both_shoulders_placement.jpg",
  shoulder: "assets/compex_shoulder_pad_placement.jpg",
  neck: "assets/compex_neck_pad_placement.jpg",
  both_scapula: "assets/compex_both_scapula_pad_placement.jpg",
  arm: "assets/compex_arm_pad_placement.jpg",
  back: "assets/compex_back_pad_placement.jpg",
  abs: "assets/compex_abs_pad_placement.jpg",
  thigh: "assets/compex_thigh_glute_pad_placement.jpg",
  calf: "assets/compex_calf_shin_pad_placement.jpg"
};

/* ── 도해 키 → 기록·부위 탭에서 쓰는 부위 이름 ── */
window.DIAGRAM_AREA_LABEL = {
  shoulder: "어깨 단독",
  neck: "목·승모근",
  both_shoulders: "양쪽 어깨",
  both_scapula: "양쪽 견갑골",
  arm: "팔·전완",
  back: "등·허리",
  abs: "복부·코어",
  thigh: "엉덩이·허벅지",
  calf: "종아리·정강이",
  full: "전신"
};

/* ── 도해별 한 줄 부착 팁(도해 탭을 바꿈 때마다 같이 보여 준다) ── */
window.DIAGRAM_TIPS = {
  shoulder: "큰 패드 = 어깨 뒤·앞의 삼각근 근복, 작은 패드 = 상부 승모근(목덜미) 또는 어깨 끝. 통증 모드는 아픈 지점을 위아래로 감싸기만, 근수축은 만들지 않기.",
  both_shoulders: "채널 1 = 왼어깨, 채널 2 = 오른어깨. 한 채널의 +/− 두 장은 반드시 같은 쪽 어깨 안에서만 — 가슴·목을 가로지르면 심장으로 전류가 지나갑니다.",
  neck: "목 뒤 좌우 승모근 상부에 2장씩 세로로. 척추 뼈 정중앙은 비우고, 목 앞쪽(경동맥)·목뼈 돌기 위는 절대 피하기.",
  both_scapula: "견갑골 안쪽 모서리를 따라 작은 패드 2장씩. 척추를 가로지르지 말고 좌우 따로.",
  arm: "이두·삼두는 근복 중앙 + 팔꿈치 위쪽 끝. 전완은 팔꿈치 아래 근육 위아래로, 관절·손목 뼈 위는 피하기.",
  back: "척추 뼈 정중앙을 비우고 좌우 척추기립근에 2장씩 대칭으로. 뼈 돌기 바로 위는 피하기.",
  abs: "배꼽 좌우 복직근에 대칭으로 2장씩(총 4장). 식사 직후·임신 중·복부 수술 부위는 금지.",
  thigh: "대퇴사두는 허벅지 위쪽 근복 + 무릎 위쪽, 햄스트링·둔근은 엉덩이 볼록한 곳과 허벅지 뒤 중앙·위아래. 무릎·사타구니 뼈 위는 피하기.",
  calf: "종아리 근육 안쪽·바깥쪽 두 갈래에 위아래로, 정강이는 뼈 바깥쪽 근육(전경골근). 오금·정강이 뼈 앞날은 피하기."
};

/* ─── 부위 프리셋: 부위를 직접 고르면 기본 프로그램·강도·빈도가 정해진다 ── */
window.PARTS = {
  "어깨":      { key: "shoulder",      program: "Reduce muscle tension", minutes: 20, intensity: "근육이 가볍게 톡톡 튀는 선", days: [1, 3, 5] },
  "목·승모근": { key: "neck",          program: "Reduce muscle tension", minutes: 15, intensity: "가볍게 톡톡 튕기는 선", days: [1, 3, 5] },
  "등·허리":   { key: "back",          program: "Back pain",          minutes: 20, intensity: "기분 좋게 근육이 톡톡 튀는 선", days: [2, 4] },
  "팔·전완":   { key: "arm",           program: "Firm your arms",     minutes: 20, intensity: "참을 수 있는 최대치의 70%", days: [2, 6] },
  "복부·코어": { key: "abs",           program: "Core stabilisation", minutes: 20, intensity: "복부가 단단히 조여드는 선", days: [1, 4] },
  "엉덩이·허벅지": { key: "thigh",     program: "Tone your thighs",   minutes: 20, intensity: "허벅지가 강하게 조여드는 선", days: [2, 5] },
  "종아리·정강이": { key: "calf",      program: "Heavy legs",         minutes: 20, intensity: "종아리가 규칙적으로 톡톡 튀는 선", days: [1, 2, 3, 4, 5] },
  "전신":      { key: "full",          program: "Training recovery",  minutes: 20, intensity: "근육이 편안하게 톡톡 튀는 선", days: [1, 3, 5] }
};

/* ── 기본 목표 9종: 요일별 권장 루틴 ──
   days: 1=월 … 7=일, 0=매일
   program 은 PROGRAMS 의 en 값과 정확히 일치해야 한다 */
window.BUILTIN_GOALS = [
  {
    id: "shoulder-pain", name: "어깨 통증·건염 케어", emoji: "🩹", tone: "blue",
    desc: "염증·힘줄 통증을 낮추는 데 집중. 근수축(EMS) 모드는 아끼고 TENS 위주로.",
    parts: ["어깨"], stretch: true, defaultOn: true,
    items: [
      { days: [1, 5], program: "Pain management TENS", minutes: 20, intensity: "기분 좋게 찌릿한 선 (근육 튕김 X)", note: "주사 바늘 자국 바로 위는 피하기" },
      { days: [3],    program: "Tendinitis",           minutes: 20, intensity: "찌릿한 감각 수준까지만", note: "힘줄 주변을 양옆으로 감싸 부착" },
      { days: [6],    program: "Reduce muscle tension",    minutes: 15, intensity: "가볍게 톡톡 튕기는 선", note: "승모근·후면 삼각근 위주" }
    ]
  },
  {
    id: "shoulder-rom", name: "어깨 가동범위·재활", emoji: "🔁", tone: "teal",
    desc: "스트레칭으로 관절낭을 늘린 직후 콤펙스로 혈류·이완을 보조. 기계가 관절을 늘려주진 못한다.",
    parts: ["어깨"], stretch: true,
    items: [
      { days: [2], program: "Relaxing massage", minutes: 15, intensity: "근육이 살짝 튕기는 약한 선", note: "스트레칭 4종 직후" },
      { days: [4], program: "Muscle atrophy",   minutes: 15, intensity: "아주 약하게 (익숙해진 뒤)", note: "가동운동 후 보조 근력" },
      { days: [6], program: "Training recovery", minutes: 15, intensity: "톡톡 튀는 선", note: "스트레칭 후 혈류 돌리기" },
      { days: [7], program: "Reduce muscle tension", minutes: 15, intensity: "가볍게 톡톡 튕기는 선", note: "다음 주 준비" }
    ]
  },
  {
    id: "heavy-legs", name: "다리 피로·부종 회복 (Heavy legs)", emoji: "🦵", tone: "indigo",
    desc: "오래 서 있거나 걸은 날 종아리 정맥 순환을 도와 무거움을 뺀다.",
    parts: ["종아리·정강이"],
    items: [
      { days: [1, 2, 3, 4, 5], program: "Heavy legs", minutes: 20, intensity: "종아리가 규칙적으로 톡톡 튕기는 선", note: "퇴근 후 다리를 살짝 올리고" },
      { days: [6], program: "Cramp prevention", minutes: 15, intensity: "톡톡 튀는 선", note: "주말 야간 쥐 예방" }
    ]
  },
  {
    id: "neck-trap", name: "목·승모근 뭉침 완화", emoji: "💆", tone: "violet",
    desc: "책상·운전으로 굳은 승모근과 목 뒤 근육을 부드럽게 이완. 목이 뻐근하게 아픈 날은 Neck pain(목 통증 완화)으로 바꿔서.",
    parts: ["목·승모근"],
    items: [
      { days: [1, 3, 5], program: "Reduce muscle tension", minutes: 15, intensity: "가볍게 톡톡 튕기는 선", note: "목 앞쪽(경동맥) 부착 금지" },
      { days: [2, 4], program: "Neck pain", minutes: 15, intensity: "목 뒤가 가볍게 톡톡 튀는 선", note: "목이 아픈 날 — 목 뒤 좌우 승모근 상부에 세로 부착" },
      { days: [6], program: "Relaxing massage", minutes: 20, intensity: "편안하게 튕기는 선", note: "한 주 마무리" }
    ]
  },
  {
    id: "low-back", name: "허리 통증 케어", emoji: "🧍", tone: "amber",
    desc: "척추기립근을 리드미컬하게 풀어 요통·등 결림을 완화. 디스크 급성기에는 진료 우선.",
    parts: ["등·허리"],
    items: [
      { days: [2, 4], program: "Back pain", minutes: 20, intensity: "기분 좋게 톡톡 튀는 선", note: "척추 뼈 정중앙은 비우고 좌우 대칭" },
      { days: [6], program: "Muscle pain", minutes: 20, intensity: "리듬이 분명히 느껴지는 선", note: "만성 뻐근함" },
      { days: [7], program: "Reduce muscle tension", minutes: 15, intensity: "가볍게 튕기는 선", note: "이완 마무리" }
    ]
  },
  {
    id: "core", name: "코어 안정화·복근", emoji: "🧱", tone: "green",
    desc: "복부·허리 코어를 등척성 수축으로 안정화. 허리 부담을 줄이는 기초.",
    parts: ["복부·코어"],
    items: [
      { days: [1, 4], program: "Core stabilisation", minutes: 20, intensity: "복부가 단단히 조여드는 선 (1단계부터)", note: "무릎 세우고 눕거나 등 대고 앉아서" },
      { days: [6], program: "Firm your stomach", minutes: 15, intensity: "참을 수 있는 최대치의 70%", note: "식후 1시간 이후" }
    ]
  },
  {
    id: "legs-strength", name: "하체 근력·볼륨", emoji: "🏋️", tone: "red",
    desc: "허벅지·둔근 근수축으로 하체 근력과 볼륨을 만든다. 관절을 고정한 등척성 자세.",
    parts: ["엉덩이·허벅지"],
    items: [
      { days: [2], program: "Tone your thighs", minutes: 20, intensity: "허벅지가 강하게 조여드는 선", note: "앉아서 발목 고정" },
      { days: [4], program: "Muscle building", minutes: 20, intensity: "참을 수 있는 최대치의 80%", note: "1단계부터 4~6주" },
      { days: [6], program: "Hypertrophy", minutes: 20, intensity: "참을 수 있는 최대치", note: "양쪽 허벅지 번갈아" }
    ]
  },
  {
    id: "full-recovery", name: "운동 후 전신 회복", emoji: "🔄", tone: "slate",
    desc: "운동·등산·장시간 이동 후 전신 혈류를 돌려 피로 물질을 빼낸다.",
    parts: ["전신"],
    items: [
      { days: [1, 3, 5], program: "Training recovery", minutes: 20, intensity: "근육이 편안하게 톡톡 튀는 선", note: "운동한 날 저녁" },
      { days: [7], program: "Relaxing massage", minutes: 20, intensity: "편안하게 튕기는 선", note: "주말 회복" }
    ]
  },
  {
    id: "hamstring-hip", name: "햄스트링 유연성·허리 보호", emoji: "🦵", tone: "teal",
    desc: "허벅지 뒤(햄스트링) 긴장을 풀어 골반을 세우고 허리로 버티는 부담을 줄입니다. 스트레칭 3종 + 이완 모드 주 4회.",
    parts: ["엉덩이·허벅지"], stretch: true,
    items: [
      { days: [1], program: "Reduce muscle tension", minutes: 20, intensity: "허벅지 뒤가 가볍게 톡톡 튀는 선", note: "스트레칭 3종 직후 — 엉덩이·허벅지 뒤 중앙과 위아래" },
      { days: [3], program: "Relaxing massage", minutes: 15, intensity: "살짝 튕기는 약한 선", note: "뻐근한 날은 강도를 한 단계 더 낮게" },
      { days: [5], program: "Training recovery", minutes: 20, intensity: "톡톡 튀는 선", note: "걷기·계단 오른 날 저녁" },
      { days: [6], program: "Cramp prevention", minutes: 15, intensity: "톡톡 튀는 선", note: "야간 다리 쥐·뭉침 예방" }
    ]
  }
];

/* ── 패드 부위 안내 (탭 3) ── */
window.PAD_AREAS = [
  {
    key: "shoulder-single", label: "어깨 단독", img: "compex_shoulder_pad_placement",
    title: "한쪽 어깨 · 승모근 (TENS / EMS / 재활)",
    lines: [
      "TENS·건염(통증): 가장 아픈 지점을 양옆·위아래로 감싸 배치 (MI-TENS 자동 제어)",
      "이완·마사지·근육통: 상부 승모근↔후면 삼각근에 위아래로 (목 뒤가 main이면 목·승모근 도해 사용)",
      "재활·근수축: 큰 패드 = 삼각근 근복 중앙, 작은 패드 = 상부 승모근 또는 후면 삼각근 끝"
    ],
    note: "목 앞쪽(경동맥)·어깨뼈 돌출부·주사 바늘 자국 위 피하기"
  },
  {
    key: "neck", label: "목·승모근", img: "compex_neck_pad_placement",
    title: "목 뒤 · 승모근 (Neck / Upper trapezius)",
    lines: [
      "뒷모습 기준 — 목 뒤쪽 좌우 승모근 상부~경추 기립근에 채널을 좌·우로 나눠 세로로 2장씩 (각 채널 +/−는 같은 쪽 안에서 위·아래)",
      "왼쪽 승모근 Ch 1 / 오른쪽 승모근 Ch 2 — 어깨 안쪽과 목이 만나는 지점에서 2~3cm 위쪽부터",
      "척추 뼈 정중앙과 머리카락 안쪽은 비우기"
    ],
    note: "목 앞쪽(경동맥) 부착 절대 금지 · 목뼈 돌기 위·목이 아플 때 고강도 근수축 금지"
  },
  {
    key: "both-shoulders", label: "양쪽 어깨", img: "compex_both_shoulders_placement",
    title: "양쪽 어깨 동시 사용 (Left Ch 1 · Right Ch 2)",
    lines: [
      "한 채널의 패드 2장은 반드시 같은 쪽 어깨 안에서만 붙이기",
      "가슴·척추를 가로지르는 배치는 금지 (전류가 심장을 지나감)"
    ],
    note: "MI 센서 케이블은 1개뿐 — 센서가 없는 반대쪽은 근육이 튕기지 않게 수동 조절"
  },
  {
    key: "both_scapula", label: "양쪽 견갑골", img: "compex_both_scapula_pad_placement",
    title: "양쪽 견갑골 (작은 패드 2장씩)",
    lines: [
      "왼쪽 견갑골 Ch 1 / 오른쪽 견갑골 Ch 2",
      "견갑골 안쪽 모서리를 따라 작은 패드 2장씩 세로로 나란히"
    ],
    note: "절대 척추 중앙을 가로지르지 않게. 뼈 돌출부 위는 피하기"
  },
  {
    key: "arm", label: "팔·전완", img: "compex_arm_pad_placement",
    title: "팔 · 전완 (Biceps / Triceps / Forearm)",
    lines: [
      "이두·삼두: 근육 중앙(큰 패드)과 팔꿈치 위쪽 끝(작은 패드)",
      "전완(테니스엘보 등): 팔꿈치 아래 손등/손바닥 쪽 근육 위아래"
    ],
    note: "손목·팔꿈치 뼈 위나 겨드랑이 신경 다발 피하기"
  },
  {
    key: "back", label: "등·허리", img: "compex_back_pad_placement",
    title: "등 · 허리 (Mid-Back / Lower Back)",
    lines: [
      "척추 뼈 정중앙을 비우고 좌우 양옆 기립근에 대칭 부착",
      "자세: 엎드리거나 의자에 기대어 편안히"
    ],
    note: "척추 뼈 돌기 바로 위에는 붙이지 않기"
  },
  {
    key: "abs", label: "복부·코어", img: "compex_abs_pad_placement",
    title: "복부 · 코어 (Abs / Core)",
    lines: [
      "배꼽 좌우 복직근에 대칭 (4채널이면 상·하 2쌍)",
      "무릎을 세우고 눕거나 등을 대고 앉아 복부에 살짝 힘"
    ],
    note: "임산부 복부·허리 절대 금지, 식후 바로 피하기"
  },
  {
    key: "thigh", label: "엉덩이·허벅지", img: "compex_thigh_glute_pad_placement",
    title: "엉덩이 · 허벅지 (Glutes / Quads / Hamstrings)",
    lines: [
      "허벅지 앞(대퇴사두): 허벅지 위쪽(사타구니 아래) + 무릎 위 내측/외측",
      "뒤(햄스트링)·둔근: 엉덩이 볼록한 부위 / 허벅지 뒤 중앙·위아래"
    ],
    note: "근력 모드에서는 앉아서 발목을 고정 (무릎이 펴지지 않게)"
  },
  {
    key: "calf", label: "종아리·정강이", img: "compex_calf_shin_pad_placement",
    title: "종아리 · 정강이 (Calf / Shin)",
    lines: [
      "종아리: 근육 안쪽·바깥쪽 2갈래 + 아킬레스건 위쪽",
      "정강이: 정강이 뼈 바깥쪽 근육(전경골근) 위아래"
    ],
    note: "정강이 뼈 앞날·무릎 뒤(오금) 직접 부착 피하기"
  }
];

/* ── 스트레칭 4종 (탭 4) ── */
window.STRETCHES = [
  {
    id: 0, group: "shoulder", step: "STEP 1 · 관절 공간 열기", title: "진자 운동", en: "Pendulum",
    sub: "가장 먼저 어깨 관절에 힘을 빼고 공간을 벌려 주는 준비 동작이에요.",
    img: "stretch_1_pendulum", anim: "pendulum", seconds: 60, sets: 1,
    timerLabel: "권장 타이머 (시계/반시계 30초씩)",
    steps: [
      "한 손으로 식탁이나 의자를 짚고 상체를 살짝 숙입니다.",
      "아픈 쪽 팔은 어깨부터 손끝까지 힘을 완전히 빼고 늘어뜨립니다.",
      "팔 힘으로 돌리지 말고 몸통을 살짝 흔들어 작은 원을 시계·반시계 각 20바퀴씩 그립니다."
    ],
    warn: "팔에 힘이 들어가거나 원이 너무 커지면 오히려 어깨가 찝힐 수 있어요. 작고 가볍게 흔드세요."
  },
  {
    id: 1, group: "shoulder", step: "STEP 2 · 안전하게 팔 올리기", title: "테이블 슬라이드", en: "Table Slide",
    sub: "팔 무게를 식탁에 실어 충돌증후군 통증 각도를 피하면서 가동범위를 늘려요.",
    img: "stretch_2_table_slide", anim: "slide", seconds: 10, sets: 5,
    timerLabel: "끝 지점 유지 타이머 (10초 × 5회)",
    steps: [
      "식탁 앞에 앉아 접은 수건 위에 양손을 올립니다.",
      "어깨 힘을 빼고 상체를 앞으로 천천히 숙이면서 손을 식탁 위로 쭉 밀어 줍니다.",
      "겨드랑이·어깨 뒤쪽이 시원하게 당기는 지점에서 10초 유지 후 천천히 돌아옵니다."
    ],
    warn: "어깨 앞이나 옆이 찌릿하게 찝히면 거기서 멈추고 반보만 덜 밀어 주세요."
  },
  {
    id: 2, group: "shoulder", step: "STEP 3 · 굳은 관절낭 풀기", title: "외회전 스트레칭", en: "External Rotation",
    sub: "유착성 관절낭염에서 가장 먼저 굳는 바깥 회전 각도를 안전하게 늘려요.",
    img: "stretch_3_external_rotation", anim: "extrot", seconds: 20, sets: 5,
    timerLabel: "지그시 유지 타이머 (20초 × 5회)",
    steps: [
      "우산이나 막대(또는 긴 수건)를 양손으로 잡습니다.",
      "아픈 쪽 팔꿈치는 옆구리에 딱 붙이고 90도로 굽힙니다.",
      "반대쪽 건강한 손으로 막대를 밀어 아픈 팔이 바깥으로 돌아가게 지그시 20초 유지합니다."
    ],
    warn: "팔꿈치가 옆구리에서 떨어지거나 몸통이 같이 돌아가면 효과가 줄어요."
  },
  {
    id: 3, group: "shoulder", step: "STEP 4 · 라운드숄더 펴기", title: "문틀 가슴 펴기", en: "Doorway Pec",
    sub: "앞으로 말린 어깨와 뭉친 가슴 근육(소흉근·대흉근)을 부드럽게 열어 줘요.",
    img: "stretch_4_doorway_pec", anim: "door", seconds: 20, sets: 3,
    timerLabel: "가슴 펴기 유지 타이머 (20초 × 3회)",
    steps: [
      "문틀 양쪽에 팔뚝을 90도로 댑니다 (팔꿈치는 어깨보다 살짝 낮게).",
      "한 발을 앞으로 가볍게 내디디며 상체를 천천히 앞으로 실어 줍니다.",
      "가슴 앞쪽이 시원하게 늘어나는 선에서 20초 유지합니다."
    ],
    warn: "팔꿈치를 어깨보다 높이 올리면 충돌증후군 부위가 찝힐 수 있으니 팔꿈치를 살짝 낮추세요."
  },
  {
    id: 4, group: "hamstring", step: "STEP 1 · 허리 바닥 고정", title: "누워서 수건으로 다리 들기",
    en: "Supine Towel Hamstring",
    sub: "허리를 바닥에 붙인 채 수건으로 다리를 당기면, 허리를 말지 않고 햄스트링만 안전하게 늘릴 수 있어요.",
    img: "stretch_ham_1_supine_towel", anim: "hamtowel", seconds: 20, sets: 3,
    timerLabel: "지그시 유지 타이머 (20초 × 3회)",
    steps: [
      "바닥에 누워 양 무릎을 세우고 허리를 바닥에 붙입니다(손이 들어갈 틈도 없게).",
      "한쪽 발바닥에 수건을 걸고 양손으로 수건 끝을 잡습니다.",
      "반대쪽 발은 바닥에 두고 무릎을 편 채, 수건으로 다리를 천천히 당겨 허벅지 뒤가 당기는 지점에서 20초 멈춥니다."
    ],
    warn: "허리 둥글게 말지 않기 — 허리가 바닥에서 뜨거나 골반이 들리면 다리를 낮추세요. 무릎 뒤가 찌릿하면 각도를 줄이세요.",
    course: { program: "Reduce muscle tension", minutes: 20, when: "허벅지 뒤·둔근에 패드, 가볍게 톡톡 튀는 선까지", alt: "Relaxing massage" }
  },
  {
    id: 5, group: "hamstring", step: "STEP 2 · 앉아서 골반만", title: "의자 끝에 앉아 골반 숙이기",
    en: "Seated Hip Hinge Reach",
    sub: "허리를 꼬꼿 세운 채 골반만 앞으로 기울여, 허리를 말지 않고 햄스트링을 늘려요.",
    img: "stretch_ham_2_seated_reach", anim: "hamseated", seconds: 20, sets: 3,
    timerLabel: "지그시 유지 타이머 (20초 × 3회)",
    steps: [
      "의자 앞쪽 끝에 걸터앉아 한쪽 다리를 앞으로 펴고 발끝을 위로 세웁니다.",
      "가슴을 살짝 들어 허리를 꼬꼿 세우고, 배꼽을 앞쪽으로 내미는 느낌으로 골반만 앞으로 기울입니다.",
      "허벅지 뒤가 당기는 지점에서 20초 유지하고 천천히 돌아옵니다."
    ],
    warn: "허리 둥글게 말지 않기 — 손이 발에 닿지 않아도 됩니다. 무릎 뒤가 찌릿하면 다리를 살짝 굽히고 각도를 줄이세요.",
    course: { program: "Relaxing massage", minutes: 15, when: "허벅지 뒤가 뻐근할 때, 살짝 튕기는 약한 선", alt: "Reduce muscle tension" }
  },
  {
    id: 6, group: "hamstring", step: "STEP 3 · 서서 힙 힌지", title: "발 올리고 힙 힌지",
    en: "Elevated Hip Hinge",
    sub: "낮은 의자·계단에 발을 올리고 등을 편 채 골반을 뒤로 빼면 허리 부담 없이 햄스트링이 늘어나요.",
    img: "stretch_ham_3_elevated_hinge", anim: "hamhinge", seconds: 20, sets: 3,
    timerLabel: "지그시 유지 타이머 (20초 × 3회)",
    steps: [
      "낮은 의자나 계단에 한쪽 발 뒤꿉치를 올리고 발끝을 위로 세웁니다.",
      "서 있는 다른 발에 무게를 두고, 손은 골반에 올린 채 엉덩이를 뒤로 빼며 상체를 앞으로 숙입니다.",
      "등이 굽어지지 않는 범위에서 허벅지 뒤가 당기면 20초 유지합니다."
    ],
    warn: "허리 둥글게 말지 않기 — 숙이는 각도보다 등이 굽지 않은 것이 중요합니다. 무릎 뒤가 찌릿하면 발을 더 낮추세요.",
    course: { program: "Training recovery", minutes: 20, when: "걷기·계단 오른 날 저녁, 톡톡 튀는 선", alt: "Pain management TENS" }
  }
];

/* ── 스트레칭 직후 추천 콤펙스 코스 ── */
window.STRETCH_COURSE = [
  { title: "스트레칭 직후 기본", program: "Relaxing massage", minutes: 20, when: "근육이 기분 좋게 살짝 튕기는 약한 선까지만", alt: "Pain management → Reduce muscle tension" },
  { title: "뻐근함·통증이 남았다면", program: "Pain management TENS", minutes: 20, when: "움직임 없이 찌릿한 선까지만" },
  { title: "컨디션 좋고 혈류를 돌리고 싶다면", program: "Training recovery", minutes: 20, when: "톡톡 튀는 선" },
  { title: "재활 단계 (익숙해진 뒤)", program: "Muscle atrophy", minutes: 15, when: "아주 약하게" }
];

/* ── 햄스트링 스트레칭 직후 추천 콤펙스 코스 ── */
window.STRETCH_COURSE_HAM = [
  { title: "햄스트링 루틴 직후 기본", program: "Reduce muscle tension", minutes: 20, when: "허벅지 뒤·둔근에 패드, 가볍게 톡톡 튀는 선까지", alt: "Relaxing massage" },
  { title: "뻐근함이 남았다면", program: "Pain management TENS", minutes: 20, when: "움직임 없이 찌릿한 선까지만", alt: "Relaxing massage (약하게)" },
  { title: "걷기·계단 오른 날 저녁", program: "Training recovery", minutes: 20, when: "톡톡 튀는 선" },
  { title: "밤에 다리 쥐가 잦다면", program: "Cramp prevention", minutes: 15, when: "허벅지 뒤·종아리에 톡톡 튀는 선" }
];
