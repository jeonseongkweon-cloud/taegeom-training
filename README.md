# TAEGEOM Digital Training System v1.3

세계태권검도연맹(WTKF) 태권검도 전용 웹 기반 디지털 트레이닝 시스템입니다.

## v1.3 핵심 업데이트
- 메인 대문 버전 표기 v1.3 반영
- `태권검도 알아보기` 버튼 공식 소개 페이지 연결
  - https://ipma1822-png.github.io/taekwonkumdo/
- `태검월드` 버튼 신규 추가
  - https://ipma1822-png.github.io/taegeom-world/
- 창시자·시스템 개발자 전성권 프로필 영역 개편
- 사용자가 제공한 창시자 사진을 소형 개발자 프로필로 적용
- 기존 베기·막기·찌르기·반응훈련·콤보·수련기록 기능 유지

## GitHub Pages 업로드
ZIP 압축을 푼 뒤 폴더 안의 모든 파일과 `assets` 폴더를 저장소 최상위(root)에 업로드합니다.
기존 파일과 같은 이름은 덮어쓰면 됩니다. GitHub Pages 설정은 기존 `main / (root)` 그대로 사용합니다.

## 파일 구조
- `index.html` — 공식 메인 포털
- `portal.css` — 메인 포털 디자인
- `training.html` — 디지털 트레이닝 화면
- `training.css` — 트레이닝 디자인
- `app.js` — 트레이닝 기능 및 기록
- `assets/wtkf-logo.webp` — WTKF 로고
- `assets/taegeom-hero.webp` — 메인 히어로 이미지
- `assets/taegeom-honor.webp` — 태권검도 홍보 이미지
- `assets/founder-jeon.webp` — 창시자·개발자 전성권 프로필 이미지

## 다음 개발 방향
v1.4 이후 실제 기술 영상, 음성 코칭, 레벨 인증, 회원 ID, 모바일 센서 기반 검선 각도·속도 판정 기능으로 확장할 예정입니다.
