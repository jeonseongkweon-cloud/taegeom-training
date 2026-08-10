# TAEGEOM Digital Training System v1.2

세계태권검도연맹(WTKF) 태권검도 전용 웹 기반 디지털 트레이닝 시스템입니다.

## v1.2 핵심 업데이트
- 공식 메인(대문) 페이지 추가
- `index.html` = 브랜드/소개/개발자/버전/입장 포털
- `training.html` = 실제 수련 시스템
- 창시자·개발자: 전성권 (JEON SEONG KWEON)
- WTKF 로고 및 태권검도 홍보 이미지 반영
- 현재 버전을 메인/수련장/푸터에 명확히 표시
- 기존 v1.1의 베기·막기·찌르기·반응훈련·콤보·기록 기능 유지

## GitHub Pages 업로드
ZIP 압축을 푼 뒤 폴더 안의 모든 파일과 `assets` 폴더를 저장소 최상위(root)에 업로드합니다.
기존 파일이 있다면 덮어쓰면 됩니다. GitHub Pages 설정은 `main / (root)`를 사용합니다.

## 파일 구조
- index.html — 공식 메인 포털
- portal.css — 메인 포털 디자인
- training.html — 디지털 트레이닝 화면
- training.css — 트레이닝 디자인
- app.js — 트레이닝 기능 및 기록
- assets/ — WTKF/태권검도 이미지

## 다음 개발 방향
실제 기술 영상, 음성 코칭, 레벨 인증, 회원 ID, 모바일 자이로/가속도 센서 기반 각도·속도 측정 기능으로 확장 예정입니다.
