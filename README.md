# JB WebApps · 나의 웹앱 모음

수학 수업·게임, 학급 운영, 학교 행정, 파일·유틸리티 등 직접 만든 웹앱을 한 페이지에서 검색하고 실행하는 **독립형 웹앱 포털**입니다.

## 사이트
- 배포 예정 주소: https://jbmath-dot.github.io/jb-webapps/
- 원본 웹앱: https://jbmath-dot.github.io/math-class-webtools/
- 앱 포털 코드는 이 저장소의 `index.html` 한 파일입니다. 기존 수학 웹툴 저장소를 수정하지 않습니다.

## 기능
- 앱 78개 등록, 74개 개별 연결 / 나머지는 주소 등록 대상으로 표시
- 앱 이름과 설명 검색, 카테고리별 필터링, 즐겨찾기, 밝은/어두운 테마
- 앱 URL 등록 및 개인 웹앱 추가, JSON 백업·복원
- PC·태블릿·모바일 반응형

## 수록 범위
학생 성적 산출, 수행평가, 채점 등 **학생 평가 관련 웹앱은 제외**했습니다. 수학 게임의 문제 풀이·정오답 확인 기능은 교실 활동용 게임으로 포함했습니다.

## 어깨 재활 가이드 (`rehab/`)
- 주소: https://jbmath-dot.github.io/jb-webapps/rehab/
- `rehab/index.html`이 홈 화면이고, `compex.html`(콤펙스 SP 4.0 모드·패드 부착 가이드)과 `stretching.html`(어깨 스트레칭 가이드)을 연다. 두 가이드는 이미지가 파일 안에 들어 있는 단일 HTML 그대로이며, 상단에 `← 재활 홈` 링크만 추가했다.
- 설치형 웹앱(PWA): `manifest.json` + `icon-192.png` / `icon-512.png`(#2563eb 바탕 흰색 덤벨), 서비스 워커 `sw.js`가 홈과 이미 연 가이드를 캐시해 네트워크가 없어도 열린다. 안드로이드 크롬에서 **⋮ → 홈 화면에 추가**로 설치한다.
- 가이드 내용을 고칠 때는 캐시 이름 `rehab-v1`(`sw.js`)을 올려 저장본을 갱신한다.

## GitHub Pages 공개 방법
이 저장소의 **Settings → Pages**에서:
1. **Build and deployment → Source**를 `Deploy from a branch`로 설정합니다.
2. 브랜치는 `main`, 폴더는 `/(root)`를 선택하고 **Save**합니다.
3. **Actions**에서 `pages build and deployment` 작업이 성공하면 위 주소에 접속합니다.

GitHub Pages가 비활성화된 상태라면 파일을 올려도 방문 시 404 오류가 날 수 있습니다.

## 주의
- 앱 추가·즐겨찾기·링크 수정 정보는 사용 중인 브라우저의 localStorage에만 저장됩니다. JSON으로 내보내기/가져오기를 이용하세요.
- 실행 주소가 등록된 웹앱은 원래의 저장소 또는 외부 주소에서 열립니다.
- 학급 공동구매는 관리자 페이지에서 생성한 참여 초대 링크를 이용해야 합니다.
- 동영상 용량 줄이기는 Windows 로컬 보조 프로그램이 필요합니다.
