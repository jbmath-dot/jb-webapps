# 우리집 식단 & 장보기 (PWA)

주소: https://jbmath-dot.github.io/jb-webapps/family-meals/

## 기능
- 플랜 A(가성비), B(영양균형), C(초간편) 식단과 7일 아침·휴일 점심·저녁 레시피
- 어린이집 휴원일/방학 등록 → 가정 점심 추가 및 쇼핑 중량 재계산
- 금요일 주문, 토요일 오전 배송, 주간 장보기 체크·단가 입력·남는 재료 계산
- 사용 중인 기기 로컬 저장, JSON 내보내기/가져오기
- 설치 가능한 PWA, 첫 접속 이후 오프라인 기본 식단

## 동기화 구조
앱은 시작 시 `weekly-plans.json`을 HTTP로 읽는다. `version: 1`, `week_start: YYYY-MM-DD`, `catalog` 및 `plans`를 만족하고, 사용자가 보고 있는 주의 토요일 날짜와 week_start가 동일하면 A/B/C 식단을 화면에 반영한다. `catalog`는 식재료 코드별 {name,pack,category}, `plans`는 A/B/C별 {theme,B:[7],L:[7],D:[7]}. 각 레시피는 {title,mins,ingredients:{code:grams},steps:[...],prep?:string}. 불일치·네트워크 끊김·검증 실패 시 번들 안의 기본 예시 식단을 유지한다. 키트/둘째 이유식은 별도로 관리한다.

**중요:** ChatGPT 정기 보고서는 앱의 JSON을 자동 변경하지 않는다. 주간 파일을 GitHub 커밋으로 갱신해야 자동 수신된다. 연결 도입 후 금요일 보고서가 이 경로를 갱신하도록 별도 설정할 수 있다.

## 배포
저장소 Settings → Pages에서 main/(root) 배포가 활성화되어야 하며, 브라우저에서 주소 접속 후 홈 화면에 추가로 설치할 수 있다.
