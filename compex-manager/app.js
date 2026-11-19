/* ⚡ 컴팩스 매니저 — 앱 로직
   데이터: data.js (window.PROGRAMS / BUILTIN_GOALS / PARTS / PAD_AREAS / STRETCHES / STRETCH_COURSE)
   저장: localStorage (이 브라우저에만) */
(function () {
  "use strict";

  /* 스트레칭 동작 도해(SVG) */
  const SVGS = {
    pendulum: "<svg viewBox=\"0 0 300 190\" width=\"300\" height=\"190\" style=\"width:100%;max-width:300px;height:auto\"><!-- Table --><rect x=\"195\" y=\"105\" width=\"75\" height=\"8\" rx=\"3\" fill=\"#64748b\"/><rect x=\"205\" y=\"113\" width=\"6\" height=\"65\" fill=\"#94a3b8\"/><rect x=\"255\" y=\"113\" width=\"6\" height=\"65\" fill=\"#94a3b8\"/><!-- Body leaning --><line x1=\"75\" y1=\"175\" x2=\"88\" y2=\"115\" stroke=\"#334155\" stroke-width=\"10\" stroke-linecap=\"round\"/><line x1=\"88\" y1=\"115\" x2=\"128\" y2=\"68\" stroke=\"#2563eb\" stroke-width=\"16\" stroke-linecap=\"round\"/><circle cx=\"144\" cy=\"54\" r=\"14\" fill=\"#fde68a\" stroke=\"#334155\" stroke-width=\"2\"/><!-- Supporting arm --><line x1=\"132\" y1=\"72\" x2=\"205\" y2=\"105\" stroke=\"#94a3b8\" stroke-width=\"7\" stroke-linecap=\"round\"/><!-- Pendulum circle guide --><ellipse cx=\"120\" cy=\"148\" rx=\"22\" ry=\"7\" fill=\"none\" stroke=\"#3b82f6\" stroke-width=\"2\" stroke-dasharray=\"4 3\"/><!-- Relaxed hanging arm --><g class=\"anim-pendulum\"><circle cx=\"120\" cy=\"68\" r=\"8\" fill=\"#fef08a\" stroke=\"#f59e0b\" stroke-width=\"2\"/><line x1=\"120\" y1=\"70\" x2=\"120\" y2=\"145\" stroke=\"#f59e0b\" stroke-width=\"8\" stroke-linecap=\"round\"/><circle cx=\"120\" cy=\"148\" r=\"6\" fill=\"#f59e0b\"/></g></svg>",
    slide: "<svg viewBox=\"0 0 300 190\" width=\"300\" height=\"190\" style=\"width:100%;max-width:300px;height:auto\"><!-- Chair --><path d=\"M52 105 L52 155 L95 155\" fill=\"none\" stroke=\"#64748b\" stroke-width=\"6\" stroke-linecap=\"round\"/><line x1=\"60\" y1=\"155\" x2=\"60\" y2=\"180\" stroke=\"#94a3b8\" stroke-width=\"5\"/><line x1=\"90\" y1=\"155\" x2=\"90\" y2=\"180\" stroke=\"#94a3b8\" stroke-width=\"5\"/><!-- Table --><rect x=\"145\" y=\"112\" width=\"135\" height=\"8\" rx=\"3\" fill=\"#cbd5e1\" stroke=\"#64748b\" stroke-width=\"1.5\"/><line x1=\"210\" y1=\"120\" x2=\"210\" y2=\"180\" stroke=\"#94a3b8\" stroke-width=\"6\"/><!-- Legs --><path d=\"M85 150 L125 150 L125 180\" fill=\"none\" stroke=\"#334155\" stroke-width=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><!-- Torso + sliding arm --><g class=\"anim-torso\"><line x1=\"85\" y1=\"150\" x2=\"92\" y2=\"95\" stroke=\"#2563eb\" stroke-width=\"16\" stroke-linecap=\"round\"/><circle cx=\"96\" cy=\"75\" r=\"13\" fill=\"#fde68a\" stroke=\"#334155\" stroke-width=\"2\"/></g><g class=\"anim-slide\"><rect x=\"165\" y=\"103\" width=\"26\" height=\"8\" rx=\"3\" fill=\"#60a5fa\"/><line x1=\"100\" y1=\"98\" x2=\"175\" y2=\"106\" stroke=\"#f59e0b\" stroke-width=\"8\" stroke-linecap=\"round\"/></g><!-- Arrow --><line x1=\"195\" y1=\"92\" x2=\"245\" y2=\"92\" stroke=\"#2563eb\" stroke-width=\"3\" stroke-dasharray=\"5 3\"/><polygon points=\"245,87 255,92 245,97\" fill=\"#2563eb\"/></svg>",
    extrot: "<svg viewBox=\"0 0 300 190\" width=\"300\" height=\"190\" style=\"width:100%;max-width:300px;height:auto\"><!-- Torso top-down / front schematic --><rect x=\"115\" y=\"55\" width=\"70\" height=\"95\" rx=\"16\" fill=\"#dbeafe\" stroke=\"#2563eb\" stroke-width=\"2\"/><circle cx=\"150\" cy=\"34\" r=\"14\" fill=\"#fde68a\" stroke=\"#334155\" stroke-width=\"2\"/><!-- Fixed elbow marker --><circle cx=\"115\" cy=\"100\" r=\"13\" fill=\"none\" stroke=\"#ef4444\" stroke-width=\"2\" stroke-dasharray=\"3 3\"/><text x=\"58\" y=\"165\" font-size=\"11\" fill=\"#ef4444\" font-weight=\"700\">팔꿈치 옆구리 고정</text><!-- Rotating forearm + stick --><g class=\"anim-extrot\"><line x1=\"115\" y1=\"100\" x2=\"115\" y2=\"140\" stroke=\"#f59e0b\" stroke-width=\"8\" stroke-linecap=\"round\"/><line x1=\"70\" y1=\"140\" x2=\"215\" y2=\"140\" stroke=\"#92400e\" stroke-width=\"5\" stroke-linecap=\"round\"/><circle cx=\"115\" cy=\"140\" r=\"5\" fill=\"#f59e0b\"/></g><!-- Healthy pushing hand --><line x1=\"185\" y1=\"100\" x2=\"195\" y2=\"140\" stroke=\"#64748b\" stroke-width=\"7\" stroke-linecap=\"round\"/><!-- Outward arrow --><path d=\"M 92 150 Q 68 142 62 122\" fill=\"none\" stroke=\"#2563eb\" stroke-width=\"2.5\"/><polygon points=\"58,125 61,115 67,123\" fill=\"#2563eb\"/></svg>",
    door: "<svg viewBox=\"0 0 300 190\" width=\"300\" height=\"190\" style=\"width:100%;max-width:300px;height:auto\"><!-- Doorframe --><rect x=\"65\" y=\"18\" width=\"12\" height=\"162\" fill=\"#d6c4a8\"/><rect x=\"223\" y=\"18\" width=\"12\" height=\"162\" fill=\"#d6c4a8\"/><rect x=\"65\" y=\"18\" width=\"170\" height=\"12\" fill=\"#d6c4a8\"/><!-- Forearms on frame --><line x1=\"77\" y1=\"68\" x2=\"77\" y2=\"108\" stroke=\"#f59e0b\" stroke-width=\"7\" stroke-linecap=\"round\"/><line x1=\"223\" y1=\"68\" x2=\"223\" y2=\"108\" stroke=\"#f59e0b\" stroke-width=\"7\" stroke-linecap=\"round\"/><!-- Moving chest --><g class=\"anim-door\"><line x1=\"77\" y1=\"108\" x2=\"122\" y2=\"96\" stroke=\"#f59e0b\" stroke-width=\"7\" stroke-linecap=\"round\"/><line x1=\"223\" y1=\"108\" x2=\"178\" y2=\"96\" stroke=\"#f59e0b\" stroke-width=\"7\" stroke-linecap=\"round\"/><rect x=\"120\" y=\"75\" width=\"60\" height=\"82\" rx=\"14\" fill=\"#fee2e2\" stroke=\"#ef4444\" stroke-width=\"2\"/><circle cx=\"150\" cy=\"52\" r=\"14\" fill=\"#fde68a\" stroke=\"#334155\" stroke-width=\"2\"/><polygon points=\"145,120 165,120 165,114 176,124 165,134 165,128 145,128\" fill=\"#2563eb\"/></g></svg>"
  };

  /* ─────────── 유틸 ─────────── */
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const LS = "compex-manager-v1";
  const DAYS = { 1: "월", 2: "화", 3: "수", 4: "목", 5: "금", 6: "토", 7: "일" };
  const esc = (s) =>
    String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const pad2 = (n) => String(n).padStart(2, "0");
  const isoDate = (d) => d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
  const todayISO = () => isoDate(new Date());
  const todayWD = () => ((new Date().getDay() + 6) % 7) + 1; // 1=월 … 7=일
  function mondayOf(d) {
    const x = new Date(d || new Date());
    const wd = (x.getDay() + 6) % 7;
    x.setDate(x.getDate() - wd);
    x.setHours(0, 0, 0, 0);
    return x;
  }
  function fmtRange(mon) {
    const end = new Date(mon);
    end.setDate(mon.getDate() + 6);
    const f = (d) => d.getMonth() + 1 + "/" + d.getDate();
    return f(mon) + " ~ " + f(end);
  }
  const stripTags = (s) => String(s || "").replace(/<[^>]*>/g, "");

  /* ─────────── 상태 ─────────── */
  function defaultState() {
    return {
      version: 1,
      active: ["shoulder-pain", "shoulder-rom"],
      goalNames: {},
      customGoals: [],
      sessions: [],
      settings: { fb: "vibrate" }
    };
  }
  function loadState() {
    try {
      const raw = localStorage.getItem(LS);
      if (!raw) return defaultState();
      const s = JSON.parse(raw);
      if (!s || typeof s !== "object") return defaultState();
      const d = defaultState();
      return {
        version: 1,
        active: Array.isArray(s.active) ? s.active : d.active,
        goalNames: s.goalNames && typeof s.goalNames === "object" ? s.goalNames : {},
        customGoals: Array.isArray(s.customGoals) ? s.customGoals : [],
        sessions: Array.isArray(s.sessions) ? s.sessions : [],
        settings: Object.assign({}, d.settings, s.settings || {})
      };
    } catch (e) {
      return defaultState();
    }
  }
  let state = loadState();
  function saveState() {
    try {
      localStorage.setItem(LS, JSON.stringify(state));
    } catch (e) {
      toast("저장 공간이 부족해 기록을 저장하지 못했습니다");
    }
  }

  /* ─────────── 토스트 / 시트 ─────────── */
  let toastTimer = null;
  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
  }
  function openSheet(title, html) {
    $("#sheetTitle").textContent = title;
    $("#sheetBody").innerHTML = html;
    $("#backdrop").classList.add("show");
  }
  function closeSheet() {
    $("#backdrop").classList.remove("show");
    $("#sheetBody").innerHTML = "";
  }
  $("#sheetClose").addEventListener("click", closeSheet);
  $("#backdrop").addEventListener("click", (e) => {
    if (e.target === $("#backdrop")) closeSheet();
  });

  /* ─────────── 목표 ─────────── */
  function customItems(g) {
    const map = { 1: [3], 2: [2, 5], 3: [1, 3, 5], 4: [1, 2, 4, 6], 5: [1, 2, 3, 4, 5], 6: [1, 2, 3, 4, 5, 6], 7: [1, 2, 3, 4, 5, 6, 7] };
    const n = Math.max(1, Math.min(7, Number(g.freq) || 3));
    return [
      {
        days: map[n],
        program: g.program,
        minutes: Number(g.minutes) || 20,
        intensity: g.intensity || "",
        note: g.part ? g.part + " 집중" : ""
      }
    ];
  }
  function allGoals() {
    const out = window.BUILTIN_GOALS.map((g) =>
      Object.assign({}, g, { name: state.goalNames[g.id] || g.name, builtin: true })
    );
    state.customGoals.forEach((g) => {
      out.push(Object.assign({}, g, { builtin: false, items: customItems(g), desc: g.desc || g.part + " · 주 " + (g.freq || 3) + "회" }));
    });
    return out;
  }
  function findGoal(id) {
    return allGoals().find((g) => g.id === id);
  }
  function goalWeekCount(g) {
    let n = 0;
    (g.items || []).forEach((it) => (n += (it.days || []).length));
    return n;
  }
  function buildPlan() {
    const b = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] };
    state.active.forEach((id) => {
      const g = findGoal(id);
      if (!g) return;
      (g.items || []).forEach((it) => {
        (it.days || []).forEach((d) => {
          if (b[d]) b[d].push({ goal: g, item: it });
        });
      });
    });
    return b;
  }

  function renderGoals() {
    const el = $("#goalList");
    const goals = allGoals();
    if (!goals.length) {
      el.innerHTML = '<div class="empty">목표가 없습니다. 아래에서 부위를 골라 추가해 보세요.</div>';
      return;
    }
    el.innerHTML = goals
      .map((g) => {
        const on = state.active.indexOf(g.id) >= 0;
        const sub = stripTags(g.desc || (g.part ? g.part + " · 주 " + (g.freq || 3) + "회" : ""));
        return (
          '<div class="goal-row ' + (on ? "on" : "") + '" data-goal="' + esc(g.id) + '" role="button" tabindex="0">' +
          '<span class="emoji">' + (g.emoji || "🎯") + "</span>" +
          '<div class="txt"><div class="nm">' + esc(g.name) + "</div>" +
          '<div class="ds">' + esc(sub) + (on && sub.indexOf("주 ") < 0 ? " · 주 " + goalWeekCount(g) + "회" : "") + "</div></div>" +
          '<button class="edit" type="button" data-edit="' + esc(g.id) + '" aria-label="목표 이름·설정 수정">✏️</button>' +
          '<span class="check">' + (on ? "✓" : "") + "</span></div>"
        );
      })
      .join("");
  }

  function renderPartChips() {
    const el = $("#partChips");
    el.innerHTML = Object.keys(window.PARTS)
      .map((p) => '<button class="chip soft" type="button" data-part="' + esc(p) + '">＋ ' + esc(p) + "</button>")
      .join("");
  }

  function planItemHTML(x) {
    const p = window.PROGRAM_BY_EN[x.item.program] || {};
    const t = window.TYPE_LABEL[p.type] || {};
    return (
      '<div class="pi" data-prog="' + esc(x.item.program) + '">' +
      '<div class="pi-top"><span class="pi-goal t-' + esc(x.goal.tone || "blue") + '">' +
      (x.goal.emoji || "🎯") + " " + esc(x.goal.name) + "</span>" +
      (t.text ? '<span class="badge ' + t.cls + '">' + t.short + "</span>" : "") +
      "</div>" +
      '<div class="pi-name">' + esc(p.ko || x.item.program) + '<span class="en">' + esc(x.item.program) + "</span></div>" +
      '<div class="pi-meta"><span>⏱ ' + (x.item.minutes || 20) + "분</span>" +
      '<span>🎚 ' + esc(x.item.intensity || "편안한 선까지") + "</span></div>" +
      (x.item.note ? '<div class="pi-note">' + esc(x.item.note) + "</div>" : "") +
      '<div class="pi-actions"><button type="button" data-act="map">🩹 패드 그림</button>' +
      '<button type="button" data-act="rec" class="rec">＋ 세션 기록</button></div></div>'
    );
  }

  function renderWeek() {
    const plan = buildPlan();
    const mon = mondayOf();
    const today = todayISO();
    $("#weekRange").textContent = fmtRange(mon);
    const totalSessions = [1, 2, 3, 4, 5, 6, 7].reduce((a, d) => a + plan[d].length, 0);
    const totalMin = [1, 2, 3, 4, 5, 6, 7].reduce(
      (a, d) => a + plan[d].reduce((b, x) => b + (Number(x.item.minutes) || 0), 0),
      0
    );
    let html = "";
    if (!totalSessions) {
      html +=
        '<div class="card" style="text-align:center"><div class="empty"><span class="big">🎯</span>위에서 목표를 하나 켜면<br>이번 주 루틴이 자동으로 짜입니다.</div></div>';
    } else {
      html +=
        '<div class="card" style="padding:11px 13px"><div style="font-size:12.5px;color:#334155;font-weight:700">이번 주 권장 <b style="color:#1d4ed8">' +
        totalSessions + "세션 · 약 " + totalMin + "분</b></div>" +
        '<div style="font-size:11.5px;color:#64748b;margin-top:2px">강도는 항목마다 적힌 기준까지만 — 통증이 늘면 한 단계 낮추세요.</div></div>';
    }
    for (let d = 1; d <= 7; d++) {
      const date = new Date(mon);
      date.setDate(mon.getDate() + d - 1);
      const ds = isoDate(date);
      const isToday = ds === today;
      const items = plan[d];
      const cnt = isToday ? "오늘" + (items.length ? " · " + items.length + "회" : "") : items.length ? items.length + "회" : "휴식";
      html +=
        '<div class="day ' + (isToday ? "today" : "") + '">' +
        '<div class="day-head"><span class="d">' + DAYS[d] + "</span>" +
        '<span class="dt">' + (date.getMonth() + 1) + "/" + date.getDate() + "</span>" +
        '<span class="cnt">' + cnt + "</span></div>" +
        '<div class="day-body">' +
        (items.length
          ? items.map(planItemHTML).join("")
          : '<div class="day-empty">추천 세션 없음 · 스트레칭만 가볍게 해도 좋아요</div>') +
        "</div></div>";
    }
    $("#weekPlan").innerHTML = html;
  }

  /* ─────────── 패드 그림 시트 ─────────── */
  function diagramHTML(key, label) {
    const src = window.DIAGRAM_IMG[key];
    if (!src) return "";
    return (
      '<div class="diag-img"><img src="' + src + '" alt="' + esc(label || "") + ' 패드 부착 위치" loading="lazy" style="max-height:58dvh;object-fit:contain;margin:0 auto"></div>' +
      '<div class="diag-cap">' + esc(label || "") + " · 공식 부착 위치</div>"
    );
  }
  function openPadSheet(programEn) {
    const p = window.PROGRAM_BY_EN[programEn];
    if (!p) {
      openSheet("패드 부착", '<div class="empty">이 프로그램의 패드 그림이 없습니다.</div>');
      return;
    }
    const keys = p.diagrams && p.diagrams.length ? p.diagrams : ["shoulder"];
    const first = keys[0];
    const html =
      '<div style="margin-bottom:10px"><div style="font-size:15.5px;font-weight:800;letter-spacing:-.01em">' + esc(p.ko) + "</div>" +
      '<div style="font-size:11.5px;color:#94a3b8;font-weight:600">' + esc(p.en) + " · " + esc(window.CAT_LABEL[p.cat] || p.cat) + "</div></div>" +
      (keys.length > 1
        ? '<div class="diag-pills">' + keys.map((k, i) => '<button type="button" data-dkey="' + k + '" class="' + (i === 0 ? "active" : "") + '">' + esc(window.DIAGRAM_LABELS[k] || k) + "</button>").join("") + "</div>"
        : "") +
      '<div id="padSheetImg">' + diagramHTML(first, window.DIAGRAM_LABELS[first]) + "</div>" +
      '<div class="p-block" style="margin-top:12px"><div class="lbl">🩹 패드</div><div class="val">' + esc(p.pads) + "</div></div>" +
      '<div class="p-block"><div class="lbl">🧍 자세</div><div class="val">' + esc(p.pose) + "</div></div>" +
      '<div class="p-block"><div class="lbl">🎚 강도</div><div class="val">' + esc(p.intensity) + "</div></div>" +
      '<div class="p-block warnbox"><div class="lbl">⚠️ 주의</div>' + esc(p.caution) + "</div>" +
      '<div class="btn-row" style="margin-top:12px"><button class="btn btn-primary" id="padSheetRec" type="button">이 프로그램으로 기록</button></div>';
    openSheet("🩹 패드 부착 위치", html);
    const body = $("#sheetBody");
    body.onclick = (e) => {
      const b = e.target.closest("button[data-dkey]");
      if (b) {
        $$("button[data-dkey]", body).forEach((x) => x.classList.toggle("active", x === b));
        $("#padSheetImg").innerHTML = diagramHTML(b.dataset.dkey, window.DIAGRAM_LABELS[b.dataset.dkey]);
      }
      if (e.target.id === "padSheetRec") {
        closeSheet();
        openLog({ program: p.en });
      }
    };
  }

  function areaLabelFor(programEn) {
    const p = window.PROGRAM_BY_EN[programEn];
    if (!p || !p.diagrams || !p.diagrams.length) return "어깨 단독";
    const map = {
      shoulder: "어깨 단독",
      both_shoulders: "양쪽 어깨",
      arm: "팔·전완",
      back: "등·허리",
      abs: "복부·코어",
      thigh: "엉덩이·허벅지",
      calf: "종아리·정강이"
    };
    return map[p.diagrams[0]] || "어깨 단독";
  }

  /* ─────────── 탭 2: 프로그램 ─────────── */
  let progCat = "ALL";
  const progOpen = new Set();
  const progDiag = {};

  function renderCatBar() {
    const cats = ["ALL"].concat(Object.keys(window.CAT_LABEL));
    $("#catBar").innerHTML = cats
      .map((c) => {
        const n = c === "ALL" ? window.PROGRAMS.length : window.PROGRAMS.filter((p) => p.cat === c).length;
        const label = c === "ALL" ? "전체" : window.CAT_LABEL[c];
        return '<button class="chip ' + (progCat === c ? "active" : "") + '" type="button" data-cat="' + esc(c) + '">' + esc(label) + " (" + n + ")</button>";
      })
      .join("");
  }

  function programCard(p) {
    const t = window.TYPE_LABEL[p.type] || {};
    const open = progOpen.has(p.id);
    const key = progDiag[p.id] || (p.diagrams && p.diagrams[0]) || "shoulder";
    const keys = p.diagrams || [];
    return (
      '<div class="prog ' + (open ? "open" : "") + '" data-pid="' + p.id + '">' +
      '<div class="prog-head"><div class="t"><div class="ko">' + esc(p.ko) + "</div>" +
      '<div class="en">' + esc(p.en) + ' <span class="cat">' + esc(window.CAT_LABEL[p.cat] || p.cat) + "</span></div></div>" +
      '<span class="badge ' + t.cls + '">' + t.short + '</span><span class="arrow">▾</span></div>' +
      '<div class="prog-body">' +
      '<p class="p-desc">' + esc(p.desc) + "</p>" +
      '<div class="p-block"><div class="lbl">🎛 기기 진입 순서</div><ol>' + p.steps.map((s) => "<li>" + s + "</li>").join("") + "</ol></div>" +
      '<div class="p-block"><div class="lbl">🩹 패드 · 자세 · 강도</div><div class="val">' +
      "<b>패드</b> " + esc(p.pads) + "<br><b>자세</b> " + esc(p.pose) + "<br><b>강도</b> " + esc(p.intensity) + "</div></div>" +
      (keys.length > 1
        ? '<div class="diag-pills">' + keys.map((k) => '<button type="button" data-pid="' + p.id + '" data-dkey="' + k + '" class="' + (k === key ? "active" : "") + '">' + esc(window.DIAGRAM_LABELS[k] || k) + "</button>").join("") + "</div>"
        : "") +
      '<div class="pimg" data-pid="' + p.id + '">' + diagramHTML(key, window.DIAGRAM_LABELS[key]) + "</div>" +
      '<div class="p-block warnbox"><div class="lbl">⚠️ 주의</div>' + esc(p.caution) + "</div>" +
      '<button class="btn btn-primary btn-block btn-sm" type="button" data-rec="' + esc(p.en) + '">이 프로그램으로 기록</button>' +
      "</div></div>"
    );
  }

  function renderPrograms() {
    const q = ($("#progSearch").value || "").trim().toLowerCase();
    const rows = window.PROGRAMS.filter((p) => {
      const catOk = progCat === "ALL" || p.cat === progCat;
      if (!catOk) return false;
      if (!q) return true;
      const hay = [p.cat, p.en, p.ko, p.desc, p.pads, p.pose, p.intensity, p.caution, stripTags(p.steps.join(" "))].join(" ").toLowerCase();
      return hay.indexOf(q) >= 0;
    });
    $("#progList").innerHTML = rows.length
      ? rows.map(programCard).join("")
      : '<div class="card"><div class="empty"><span class="big">🔍</span>검색 결과가 없습니다.<br>다른 말로 찾아보세요. (예: 어깨, TENS, 허리)</div></div>';
  }

  /* ─────────── 탭 3: 패드 ─────────── */
  let areaKey = window.PAD_AREAS[0].key;
  function renderAreas() {
    $("#areaChips").innerHTML = window.PAD_AREAS.map(
      (a) => '<button class="chip ' + (a.key === areaKey ? "active" : "") + '" type="button" data-area="' + a.key + '">' + esc(a.label) + "</button>"
    ).join("");
    const a = window.PAD_AREAS.find((x) => x.key === areaKey) || window.PAD_AREAS[0];
    $("#areaDetail").innerHTML =
      '<div class="pad-hero"><img src="assets/' + a.img + '.jpg" alt="' + esc(a.title) + ' 도해" loading="lazy">' +
      '<div class="cap"><b>' + esc(a.title) + "</b>" +
      a.lines.map((l) => "<p>" + esc(l) + "</p>").join("") +
      '<span class="note">⚠️ ' + esc(a.note) + "</span></div></div>" +
      '<button class="btn btn-dark btn-block btn-sm" type="button" style="margin-top:10px" data-area-rec="' + a.key + '">이 부위로 세션 기록</button>';
  }

  /* ─────────── 탭 4: 스트레칭 ─────────── */
  const timers = {};
  function tState(id) {
    if (!timers[id]) {
      const st = window.STRETCHES[id];
      timers[id] = { remain: st.seconds, sets: 0, running: false, iv: null };
    }
    return timers[id];
  }
  function fmtClock(sec) {
    return pad2(Math.floor(sec / 60)) + ":" + pad2(sec % 60);
  }
  function feedback() {
    const fb = (state.settings && state.settings.fb) || "vibrate";
    if ((fb === "vibrate" || fb === "both") && navigator.vibrate) {
      try { navigator.vibrate([180, 90, 180]); } catch (e) {}
    }
    if (fb === "beep" || fb === "both") {
      try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return;
        const ctx = new Ctx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = 880;
        gain.gain.setValueAtTime(0.16, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.42);
      } catch (e) {}
    }
  }
  function paintTimer(id) {
    const st = window.STRETCHES[id];
    const t = tState(id);
    const val = $("#tval" + id);
    if (!val) return;
    val.textContent = fmtClock(t.remain);
    val.classList.toggle("running", t.running);
    $("#tset" + id).textContent = "완료 세트: " + t.sets + " / " + st.sets;
    const btn = $("#tbtn" + id);
    btn.textContent = t.running ? "일시정지" : t.sets >= st.sets ? "다시" : t.remain < st.seconds ? "계속" : "시작";
  }
  function stopTimer(id) {
    const t = tState(id);
    if (t.iv) clearInterval(t.iv);
    t.iv = null;
    t.running = false;
  }
  function startTimer(id) {
    const st = window.STRETCHES[id];
    const t = tState(id);
    if (t.sets >= st.sets) {
      t.sets = 0;
      t.remain = st.seconds;
    }
    if (t.running) {
      stopTimer(id);
      paintTimer(id);
      return;
    }
    t.running = true;
    paintTimer(id);
    t.iv = setInterval(() => {
      t.remain -= 1;
      if (t.remain <= 0) {
        feedback();
        t.sets += 1;
        if (t.sets >= st.sets) {
          stopTimer(id);
          t.remain = 0;
          paintTimer(id);
          toast(st.title + " " + st.sets + "세트 완료 · 다음 동작으로");
          return;
        }
        t.remain = st.seconds;
      }
      paintTimer(id);
    }, 1000);
  }
  function resetTimer(id) {
    const st = window.STRETCHES[id];
    const t = tState(id);
    stopTimer(id);
    t.remain = st.seconds;
    t.sets = 0;
    paintTimer(id);
  }

  function renderStretch() {
    const list = $("#stretchList");
    list.innerHTML = window.STRETCHES.map((st) => {
      const t = tState(st.id);
      return (
        '<div class="card st-card" data-sid="' + st.id + '">' +
        '<div class="st-head"><span class="num">' + (st.id + 1) + "</span>" +
        '<div class="t"><b>' + esc(st.title) + "</b><span>" + esc(st.step) + "</span></div>" +
        '<span class="arrow">▾</span></div>' +
        '<div class="st-body"><p class="sub">' + esc(st.sub) + "</p>" +
        '<div class="anim-box" id="anim' + st.id + '"><div class="anim-head"><span>움직임 예시</span>' +
        '<button class="anim-btn" type="button" data-anim="' + st.id + '">일시정지</button></div>' +
        SVGS[st.anim] +
        "</div>" +
        '<div class="timer-box"><div class="timer-left"><span class="timer-label">' + esc(st.timerLabel) + "</span>" +
        '<span class="timer-val" id="tval' + st.id + '">' + fmtClock(t.remain) + "</span>" +
        '<span class="timer-sets" id="tset' + st.id + '">완료 세트: ' + t.sets + " / " + st.sets + "</span></div>" +
        '<div class="timer-btns"><button class="btn btn-primary btn-sm" type="button" data-timer="' + st.id + '" id="tbtn' + st.id + '">시작</button>' +
        '<button class="btn btn-ghost btn-sm" type="button" data-reset="' + st.id + '">초기화</button></div></div>' +
        '<img class="st-photo" src="assets/' + st.img + '.jpg" alt="' + esc(st.title) + ' 일러스트" loading="lazy">' +
        "<ol class=\"st-steps\">" + st.steps.map((s) => "<li>" + s + "</li>").join("") + "</ol>" +
        '<div class="warn">⚠️ ' + esc(st.warn) + "</div></div></div>"
      );
    }).join("");
    $("#courseList").innerHTML = window.STRETCH_COURSE.map(
      (c) =>
        '<div class="course-item"><div class="ct">' + esc(c.title) + "</div>" +
        '<div class="cp"><b>' + esc(c.program) + "</b> · " + c.minutes + '분 <span style="color:#94a3b8">(' + esc(c.when) + ")</span></div>" +
        (c.alt ? '<div class="cw">또는 ' + esc(c.alt) + "</div>" : "") +
        '<div class="ca"><button type="button" data-map="' + esc(c.program) + '">패드 그림</button>' +
        '<button type="button" data-rec="' + esc(c.program) + '">＋ 기록</button></div></div>'
    ).join("");
    // feedback toggle
    $$("#fbToggle button").forEach((b) => b.classList.toggle("active", b.dataset.fb === state.settings.fb));
  }

  /* ─────────── 탭 5: 기록 ─────────── */
  let draftFeel = 3;
  let editingId = null;

  function fillSelects() {
    const areaSel = $("#fArea");
    const areas = window.PAD_AREAS.map((a) => a.label);
    areaSel.innerHTML = areas.map((a) => '<option value="' + esc(a) + '">' + esc(a) + "</option>").join("") + '<option value="전신">전신</option>';
    const progSel = $("#fProgram");
    let html = "";
    Object.keys(window.CAT_LABEL).forEach((cat) => {
      html += '<optgroup label="' + esc(window.CAT_LABEL[cat]) + '">';
      window.PROGRAMS.filter((p) => p.cat === cat).forEach((p) => {
        html += '<option value="' + esc(p.en) + '">' + esc(p.ko) + " — " + esc(p.en) + "</option>";
      });
      html += "</optgroup>";
    });
    progSel.innerHTML = html;
  }

  function setFeel(v) {
    draftFeel = v;
    $$("#feelBtns button").forEach((b) => b.classList.toggle("active", Number(b.dataset.v) === v));
  }

  function openLog(pre) {
    pre = pre || {};
    editingId = null;
    switchTab("tab-log");
    $("#logFormTitle").textContent = "➕ 세션 기록";
    $("#fDate").value = pre.date || todayISO();
    $("#fMinutes").value = pre.minutes || 20;
    $("#fIntensity").value = pre.intensity || "";
    $("#fMemo").value = pre.memo || "";
    $("#fArea").value = pre.area || (pre.program ? areaLabelFor(pre.program) : $("#fArea").options[0].value);
    if (pre.program && window.PROGRAM_BY_EN[pre.program]) $("#fProgram").value = pre.program;
    setFeel(pre.feel || 3);
    setTimeout(() => {
      const el = $("#tab-log");
      window.scrollTo({ top: Math.max(0, el.offsetTop - 8), behavior: "smooth" });
      $("#fIntensity").focus({ preventScroll: true });
    }, 80);
  }

  function weekSessions() {
    const mon = mondayOf();
    const start = isoDate(mon);
    return state.sessions.filter((s) => s.date >= start);
  }
  function renderStats() {
    const ws = weekSessions();
    const mins = ws.reduce((a, s) => a + (Number(s.minutes) || 0), 0);
    const ints = ws.filter((s) => s.intensity);
    const avg = ints.length ? (ints.reduce((a, s) => a + Number(s.intensity), 0) / ints.length).toFixed(1) : "–";
    $("#stSessions").textContent = ws.length;
    $("#stMinutes").textContent = mins;
    $("#stAvg").textContent = avg;

    // 부위별 빈도 (최근 28일)
    const since = new Date();
    since.setDate(since.getDate() - 27);
    const sinceIso = isoDate(since);
    const recent = state.sessions.filter((s) => s.date >= sinceIso);
    const counts = {};
    recent.forEach((s) => {
      counts[s.area || "기타"] = (counts[s.area || "기타"] || 0) + 1;
    });
    const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const max = entries.length ? entries[0][1] : 1;
    $("#freqList").innerHTML = entries.length
      ? '<div style="font-size:11.5px;color:#64748b;font-weight:700;margin:2px 0 7px">부위별 빈도 (최근 4주)</div>' +
        entries
          .map(
            ([k, v]) =>
              '<div class="freq-row"><span class="fn">' + esc(k) + '</span><span class="freq-bar"><i style="width:' +
              Math.round((v / max) * 100) + '%"></i></span><span class="fc">' + v + "</span></div>"
          )
          .join("")
      : '<div style="font-size:12px;color:#94a3b8">최근 4주 기록이 없습니다.</div>';

    // 헤더
    $("#wsSessions").textContent = ws.length;
    $("#wsMinutes").textContent = mins;
    $("#wsStreak").textContent = streak();
  }
  function streak() {
    const days = {};
    state.sessions.forEach((s) => (days[s.date] = 1));
    let n = 0;
    const d = new Date();
    if (!days[isoDate(d)]) d.setDate(d.getDate() - 1); // 오늘 아직 안 했으면 어제부터
    while (days[isoDate(d)]) {
      n += 1;
      d.setDate(d.getDate() - 1);
    }
    return n;
  }

  function renderLogs() {
    const rows = state.sessions.slice().sort((a, b) => (a.date === b.date ? (b.ts || 0) - (a.ts || 0) : b.date.localeCompare(a.date)));
    $("#logCount").textContent = rows.length ? "총 " + rows.length + "개" : "";
    if (!rows.length) {
      $("#logList").innerHTML = '<div class="empty"><span class="big">📝</span>아직 기록이 없습니다.<br>세션을 마치면 강도와 체감을 남겨 보세요.</div>';
      return;
    }
    $("#logList").innerHTML = rows
      .slice(0, 40)
      .map(
        (s) =>
          '<div class="log-item" data-id="' + esc(s.id) + '">' +
          '<button class="log-del" type="button" data-del="' + esc(s.id) + '" aria-label="기록 삭제">✕</button>' +
          '<div class="log-top"><span class="log-date">' + esc((s.date || "").slice(5).replace("-", "/")) + "</span>" +
          (s.area ? '<span class="log-area">' + esc(s.area) + "</span>" : "") + "</div>" +
          '<div class="log-prog">' + esc(window.PROGRAM_BY_EN[s.program] ? window.PROGRAM_BY_EN[s.program].ko : s.program) + "</div>" +
          '<div class="log-meta">' + (s.minutes || 0) + "분" + (s.intensity ? " · 강도 " + esc(s.intensity) : "") + " · 체감 " + "●".repeat(Number(s.feel) || 0) + "○".repeat(5 - (Number(s.feel) || 0)) + "</div>" +
          (s.memo ? '<div class="log-memo">' + esc(s.memo) + "</div>" : "") +
          "</div>"
      )
      .join("");
  }

  function saveLog() {
    const date = $("#fDate").value || todayISO();
    const area = $("#fArea").value;
    const program = $("#fProgram").value;
    const minutes = Math.max(1, Number($("#fMinutes").value) || 20);
    const intensity = $("#fIntensity").value ? Number($("#fIntensity").value) : null;
    const memo = $("#fMemo").value.trim();
    if (!program) {
      toast("프로그램을 선택해 주세요");
      return;
    }
    const rec = {
      id: "s" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
      date: date,
      area: area,
      program: program,
      minutes: minutes,
      intensity: intensity,
      feel: draftFeel,
      memo: memo,
      ts: Date.now()
    };
    state.sessions.push(rec);
    saveState();
    renderStats();
    renderLogs();
    toast("저장했습니다 · " + area + " " + minutes + "분");
    $("#fMemo").value = "";
    $("#fIntensity").value = "";
  }

  function exportJSON() {
    const payload = Object.assign({}, state, { app: "compex-manager", exportedAt: new Date().toISOString() });
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "compex-manager-backup-" + todayISO() + ".json";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(a.href);
      a.remove();
    }, 1500);
    toast("JSON 파일로 내보냈습니다");
  }
  function importJSON(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result));
        const before = state.sessions.length;
        if (Array.isArray(data.sessions)) {
          const ids = new Set(state.sessions.map((s) => s.id));
          data.sessions.forEach((s) => {
            if (s && s.id && !ids.has(s.id)) {
              state.sessions.push(s);
              ids.add(s.id);
            }
          });
        }
        if (data.goalNames && typeof data.goalNames === "object") Object.assign(state.goalNames, data.goalNames);
        if (Array.isArray(data.customGoals)) {
          const ids = new Set(state.customGoals.map((g) => g.id));
          data.customGoals.forEach((g) => {
            if (g && g.id && !ids.has(g.id)) state.customGoals.push(g);
          });
        }
        if (Array.isArray(data.active)) data.active.forEach((id) => { if (state.active.indexOf(id) < 0) state.active.push(id); });
        if (data.settings && data.settings.fb) state.settings.fb = data.settings.fb;
        saveState();
        renderAll();
        toast("불러왔습니다 · 세션 " + (state.sessions.length - before) + "개 추가");
      } catch (e) {
        toast("JSON 파일을 읽지 못했습니다");
      }
    };
    reader.readAsText(file);
  }

  /* ─────────── 목표 시트 (추가·수정) ─────────── */
  function openGoalSheet(goalId) {
    const isEdit = !!goalId;
    const g = isEdit ? findGoal(goalId) : null;
    const partKeys = Object.keys(window.PARTS);
    const curPart = isEdit ? (g.part || (g.parts && g.parts[0]) || "어깨") : "어깨";
    if (isEdit && g.builtin) {
      // 기본 목표: 이름 변경만
      openSheet("✏️ 목표 이름 수정", 
        '<div class="field"><label for="gsName">목표 이름</label><input id="gsName" type="text" value="' + esc(g.name) + '" maxlength="30"></div>' +
        '<p class="hint" style="margin:8px 0 12px;font-size:12px;color:#64748b">기본 목표의 주간 루틴은 그대로 두고 이름만 바꿉니다.</p>' +
        '<div class="btn-row"><button class="btn btn-primary" id="gsSave" type="button">저장</button>' +
        '<button class="btn btn-ghost" id="gsReset" type="button">원래 이름으로</button></div>'
      );
      $("#gsSave").onclick = () => {
        const n = $("#gsName").value.trim();
        if (n) state.goalNames[g.id] = n;
        else delete state.goalNames[g.id];
        saveState();
        renderGoals();
        renderWeek();
        closeSheet();
        toast("이름을 바꿨습니다");
      };
      $("#gsReset").onclick = () => {
        delete state.goalNames[g.id];
        saveState();
        renderGoals();
        renderWeek();
        closeSheet();
        toast("원래 이름으로 되돌렸습니다");
      };
      return;
    }
    const part = curPart;
    const preset = window.PARTS[part] || window.PARTS["어깨"];
    openSheet(isEdit ? "✏️ 목표 수정" : "🎯 목표 추가",
      '<div class="field"><label for="gsName">목표 이름</label><input id="gsName" type="text" value="' + esc(isEdit ? g.name : part + " 케어") + '" maxlength="30" placeholder="예: 오른쪽 어깨 집중 케어"></div>' +
      '<div class="field" style="margin-top:10px"><label for="gsPart">부위</label><select id="gsPart">' +
      partKeys.map((p) => '<option value="' + esc(p) + '"' + (p === part ? " selected" : "") + ">" + esc(p) + "</option>").join("") + "</select></div>" +
      '<div class="two" style="margin-top:10px"><div class="field"><label for="gsFreq">주 횟수</label><select id="gsFreq">' +
      [1, 2, 3, 4, 5, 6, 7].map((n) => '<option value="' + n + '"' + (n === (isEdit ? g.freq || 3 : 3) ? " selected" : "") + ">주 " + n + "회</option>").join("") +
      "</select></div>" +
      '<div class="field"><label for="gsMin">시간(분)</label><input id="gsMin" type="number" min="5" max="60" step="5" value="' + (isEdit ? g.minutes || 20 : preset.minutes) + '"></div></div>' +
      '<div class="field" style="margin-top:10px"><label for="gsProg">프로그램</label><select id="gsProg">' +
      window.PROGRAMS.map((p) => '<option value="' + esc(p.en) + '"' + (p.en === (isEdit ? g.program : preset.program) ? " selected" : "") + ">" + esc(p.ko) + " — " + esc(p.en) + "</option>").join("") +
      "</select></div>" +
      '<div class="field" style="margin-top:10px"><label for="gsInt">강도 기준</label><input id="gsInt" type="text" value="' + esc(isEdit ? g.intensity || "" : preset.intensity) + '" placeholder="예: 가볍게 톡톡 튀는 선"></div>' +
      '<div class="btn-row" style="margin-top:14px"><button class="btn btn-primary" id="gsSave" type="button">' + (isEdit ? "저장" : "목표 추가") + "</button>" +
      (isEdit ? '<button class="btn btn-ghost" id="gsDel" type="button" style="color:#b91c1c">삭제</button>' : "") + "</div>"
    );
    $("#gsPart").onchange = () => {
      const p = window.PARTS[$("#gsPart").value];
      if (!p) return;
      $("#gsMin").value = p.minutes;
      $("#gsInt").value = p.intensity;
      $("#gsProg").value = p.program;
      if (p.days) $("#gsFreq").value = String(Math.min(7, p.days.length));
      const nm = $("#gsName").value.trim();
      if (!nm || nm.slice(-2) === "케어") $("#gsName").value = $("#gsPart").value + " 케어";
    };
    $("#gsSave").onclick = () => {
      const name = $("#gsName").value.trim() || $("#gsPart").value + " 케어";
      const obj = {
        id: isEdit ? g.id : "c" + Date.now().toString(36),
        name: name,
        emoji: isEdit ? g.emoji || "🎯" : "🎯",
        part: $("#gsPart").value,
        freq: Number($("#gsFreq").value),
        minutes: Number($("#gsMin").value) || 20,
        program: $("#gsProg").value,
        intensity: $("#gsInt").value.trim(),
        tone: isEdit ? g.tone || "blue" : "blue",
        desc: $("#gsPart").value + " · 주 " + $("#gsFreq").value + "회"
      };
      if (isEdit) {
        const i = state.customGoals.findIndex((x) => x.id === g.id);
        if (i >= 0) state.customGoals[i] = obj;
      } else {
        state.customGoals.push(obj);
        if (state.active.indexOf(obj.id) < 0) state.active.push(obj.id);
      }
      saveState();
      renderGoals();
      renderWeek();
      closeSheet();
      toast(isEdit ? "목표를 저장했습니다" : "목표를 추가했습니다 · 주간 플랜에 반영");
    };
    if (isEdit) {
      $("#gsDel").onclick = () => {
        state.customGoals = state.customGoals.filter((x) => x.id !== g.id);
        state.active = state.active.filter((x) => x !== g.id);
        saveState();
        renderGoals();
        renderWeek();
        closeSheet();
        toast("목표를 삭제했습니다");
      };
    }
  }

  /* ─────────── 탭 이동 ─────────── */
  function switchTab(id) {
    $$(".tabpane").forEach((p) => p.classList.toggle("active", p.id === id));
    $$("#tabbar button").forEach((b) => b.classList.toggle("active", b.dataset.tab === id));
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  /* ─────────── 이벤트 ─────────── */
  $("#tabbar").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-tab]");
    if (b) switchTab(b.dataset.tab);
  });
  $("#quickRecord").addEventListener("click", () => openLog());
  $("#addGoalBtn").addEventListener("click", () => openSheet("🎯 목표 추가",
    '<div class="hint" style="font-size:12.5px;color:#64748b;margin:0 0 10px">부위를 고르고 이름·횟수만 정하면 주간 플랜에 자동으로 들어갑니다.</div>' +
    '<div class="part-chips" id="sheetParts">' + Object.keys(window.PARTS).map((p) => '<button class="chip soft" type="button" data-part="' + esc(p) + '">' + esc(p) + "</button>").join("") + "</div>" +
    '<div class="btn-row" style="margin-top:14px"><button class="btn btn-ghost" id="sheetCustom" type="button">직접 입력</button></div>'
  ));
  $("#sheetBody").addEventListener("click", (e) => {
    const p = e.target.closest("button[data-part]");
    if (p && $("#sheetParts")) {
      const part = p.dataset.part;
      const preset = window.PARTS[part];
      const obj = {
        id: "c" + Date.now().toString(36),
        name: part + " 케어",
        emoji: "🎯",
        part: part,
        freq: (preset.days || [1, 3, 5]).length,
        minutes: preset.minutes,
        program: preset.program,
        intensity: preset.intensity,
        tone: "blue",
        desc: part + " · 주 " + (preset.days || [1, 3, 5]).length + "회"
      };
      state.customGoals.push(obj);
      if (state.active.indexOf(obj.id) < 0) state.active.push(obj.id);
      saveState();
      renderGoals();
      renderWeek();
      closeSheet();
      toast(part + " 케어 목표를 추가했습니다");
      return;
    }
    if (e.target.id === "sheetCustom") {
      closeSheet();
      openGoalSheet(null);
    }
  });

  $("#goalList").addEventListener("click", (e) => {
    const edit = e.target.closest("button[data-edit]");
    if (edit) {
      openGoalSheet(edit.dataset.edit);
      return;
    }
    const row = e.target.closest(".goal-row");
    if (!row) return;
    const id = row.dataset.goal;
    const i = state.active.indexOf(id);
    if (i >= 0) state.active.splice(i, 1);
    else state.active.push(id);
    saveState();
    renderGoals();
    renderWeek();
  });
  $("#partChips").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-part]");
    if (!b) return;
    const part = b.dataset.part;
    const preset = window.PARTS[part];
    const obj = {
      id: "c" + Date.now().toString(36),
      name: part + " 케어",
      emoji: "🎯",
      part: part,
      freq: (preset.days || [1, 3, 5]).length,
      minutes: preset.minutes,
      program: preset.program,
      intensity: preset.intensity,
      tone: "blue",
      desc: part + " · 주 " + (preset.days || [1, 3, 5]).length + "회"
    };
    state.customGoals.push(obj);
    state.active.push(obj.id);
    saveState();
    renderGoals();
    renderWeek();
    toast(part + " 케어 목표를 주간 플랜에 넣었습니다");
  });
  $("#weekPlan").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-act]");
    if (!btn) return;
    const pi = btn.closest(".pi");
    const prog = pi.dataset.prog;
    if (btn.dataset.act === "map") openPadSheet(prog);
    else openLog({ program: prog, minutes: (window.PROGRAM_BY_EN[prog] || {}).type === "tens" ? 20 : 20, area: areaLabelFor(prog) });
  });

  $("#progSearch").addEventListener("input", renderPrograms);
  $("#catBar").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-cat]");
    if (!b) return;
    progCat = b.dataset.cat;
    renderCatBar();
    renderPrograms();
  });
  $("#progList").addEventListener("click", (e) => {
    const rec = e.target.closest("button[data-rec]");
    if (rec) {
      openLog({ program: rec.dataset.rec, area: areaLabelFor(rec.dataset.rec) });
      return;
    }
    const pill = e.target.closest(".diag-pills button[data-dkey]");
    if (pill) {
      const pid = pill.dataset.pid;
      progDiag[pid] = pill.dataset.dkey;
      $$('.diag-pills button[data-pid="' + pid + '"]').forEach((x) => x.classList.toggle("active", x === pill));
      const box = $('.pimg[data-pid="' + pid + '"]');
      if (box) box.innerHTML = diagramHTML(pill.dataset.dkey, window.DIAGRAM_LABELS[pill.dataset.dkey]);
      e.stopPropagation();
      return;
    }
    const head = e.target.closest(".prog-head");
    if (!head) return;
    const card = head.closest(".prog");
    const pid = card.dataset.pid;
    if (progOpen.has(pid)) progOpen.delete(pid);
    else progOpen.add(pid);
    card.classList.toggle("open", progOpen.has(pid));
  });

  $("#areaChips").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-area]");
    if (!b) return;
    areaKey = b.dataset.area;
    renderAreas();
  });
  $("#areaDetail").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-area-rec]");
    if (!b) return;
    const a = window.PAD_AREAS.find((x) => x.key === b.dataset.areaRec);
    if (a) openLog({ area: a.label });
  });

  $("#stretchList").addEventListener("click", (e) => {
    const head = e.target.closest(".st-head");
    if (head) {
      const card = head.closest(".st-card");
      card.classList.toggle("open");
      return;
    }
    const tb = e.target.closest("button[data-timer]");
    if (tb) { startTimer(Number(tb.dataset.timer)); return; }
    const rb = e.target.closest("button[data-reset]");
    if (rb) { resetTimer(Number(rb.dataset.reset)); toast("타이머를 초기화했습니다"); return; }
    const ab = e.target.closest("button[data-anim]");
    if (ab) {
      const box = $("#anim" + ab.dataset.anim);
      const paused = box.classList.toggle("paused");
      ab.textContent = paused ? "재생" : "일시정지";
    }
  });
  $("#courseList").addEventListener("click", (e) => {
    const map = e.target.closest("button[data-map]");
    if (map) { openPadSheet(map.dataset.map); return; }
    const rec = e.target.closest("button[data-rec]");
    if (rec) openLog({ program: rec.dataset.rec, area: areaLabelFor(rec.dataset.rec) });
  });
  $("#fbToggle").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-fb]");
    if (!b) return;
    state.settings.fb = b.dataset.fb;
    saveState();
    $$("#fbToggle button").forEach((x) => x.classList.toggle("active", x === b));
    toast(b.dataset.fb === "vibrate" ? "타이머 알림: 진동" : b.dataset.fb === "beep" ? "타이머 알림: 비프음" : "타이머 알림: 진동 + 비프음");
  });

  $("#feelBtns").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-v]");
    if (b) setFeel(Number(b.dataset.v));
  });
  $("#saveLog").addEventListener("click", saveLog);
  $("#resetLog").addEventListener("click", () => {
    $("#fDate").value = todayISO();
    $("#fMinutes").value = 20;
    $("#fIntensity").value = "";
    $("#fMemo").value = "";
    setFeel(3);
    toast("입력을 지웠습니다");
  });
  $("#logList").addEventListener("click", (e) => {
    const d = e.target.closest("button[data-del]");
    if (!d) return;
    state.sessions = state.sessions.filter((s) => s.id !== d.dataset.del);
    saveState();
    renderStats();
    renderLogs();
    toast("기록을 삭제했습니다");
  });
  $("#exportBtn").addEventListener("click", exportJSON);
  $("#importBtn").addEventListener("click", () => $("#importFile").click());
  $("#importFile").addEventListener("change", (e) => {
    const f = e.target.files && e.target.files[0];
    if (f) importJSON(f);
    e.target.value = "";
  });

  /* ─────────── 초기 렌더 ─────────── */
  function renderAll() {
    renderGoals();
    renderPartChips();
    renderWeek();
    renderCatBar();
    renderPrograms();
    renderAreas();
    renderStretch();
    renderStats();
    renderLogs();
  }
  function init() {
    fillSelects();
    setFeel(3);
    $("#fDate").value = todayISO();
    const d = new Date();
    const wd = ["일", "월", "화", "수", "목", "금", "토"][d.getDay()];
    $("#topSub").textContent = d.getMonth() + 1 + "월 " + d.getDate() + "일 " + wd + "요일 · 콤펙스 SP 4.0";
    renderAll();
    // 매니페스트 바로가기(?tab=) 지원
    try {
      const t = new URLSearchParams(location.search).get("tab");
      if (t === "log") { switchTab("tab-log"); }
      else if (t === "coach") { switchTab("tab-coach"); }
    } catch (e) {}
    // 서비스 워커
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("sw.js").catch(() => {});
      });
    }
  }
  init();
})();
