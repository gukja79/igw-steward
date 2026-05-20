# 푸른회계 (igw-steward)

높은뜻푸른교회 부서별 예산/지출 관리 시스템. GitHub Pages + Google Apps Script.

## 배포 환경

- **프론트엔드**: GitHub Pages (`gukja79/igw-steward`)
- **백엔드**: Google Apps Script (소년1부 시트에 부속)
- **데이터**: 42개 부서별 Google Sheets
- **사이트 URL**: https://gukja79.github.io/igw-steward/

## 주요 파일

| 파일 | 위치 | 역할 |
|------|------|------|
| `index.html` | GitHub Pages | 메인 — 지출 입력 |
| `budget.html` | GitHub Pages | 예결산 확인 (회계용/행정용 탭) |
| `result.html` | GitHub Pages | 지출결의 확인 |
| `complete_departments_script_ordered.js` | Apps Script (수동 복붙) | 백엔드 전체 |
| `manifest.json`, `service-worker.js`, `icon-*.png` | GitHub Pages | PWA |

Apps Script 파일은 git으로 추적하지만 **배포는 수동**으로 함 (Google이 API 배포를 안 열어줘서). 코드 수정 후 Apps Script 편집기에 복붙 → 새 배포 또는 기존 배포 수정.

## 데이터 구조

각 부서 Google Sheets에 `예결산` 시트가 있음. 구조:

- **상단 영역 (회계용)**: 행1~N에 회계용 테이블
- **빈 행 + 안내 문구** "아래는 지출결의서를 제출 후 교회서 정산한 내역입니다. 참고용입니다. ^^"
- **하단 영역 (행정용)**: B열에 '계정과목' 텍스트가 두 번째 등장하는 행이 행정용 헤더

부서마다 행 번호가 다르므로 행 번호 하드코딩 금지. B열 '계정과목' 텍스트로 경계 탐지.

열 구조 (회계용/행정용 동일):
```
A: 항 (부서명)  B: 계정과목  C: 빈 열  D: 2026년 예산
E: 지원금 지출  F: 지원금 잔액  G: 결산율
H: 빈 열  I: 자부담 수입  J: 자부담 지출  K: 자부담 잔액
```

## 개발 워크플로우

1. **로컬 편집** — `budget.html` 등 직접 수정
2. **로컬 테스트** — `python3 -m http.server 8000` → http://localhost:8000 에서 확인
3. **커밋 & 푸시** — `git add`, `git commit`, `git push origin main`
4. **GitHub Pages 자동 배포** — 1~2분 후 라이브 반영
5. **Apps Script 변경 시** — 편집기에서 코드 복붙 → 배포 → 새 배포 또는 기존 배포 수정

## 알려진 함정

- **사용자 입력 도중 Apps Script 배포 위험** — 입력 데이터 꼬일 수 있음. 새벽 또는 공지 후 작업.
- **iOS Safari 날짜 input 크기 문제** — CSS로 `height: 52px !important` 강제 고정 (해결됨).
- **iOS Safari 캐시 강함** — 테스트는 시크릿 모드 권장.
- **PWA Service Worker** — 네트워크 우선 / 캐시 폴백. 캐시명 변경 시 버전 올리기.

## TODO (handover 문서 기준)

- [ ] 데이터 수정 기능 (타임스탬프 기반)
- [ ] 결산율 색상 경고 (90% 주황, 100%+ 빨강)
- [ ] 접근 제한 (비밀번호)
- [ ] 43번째 부서 추가 가능 구조

## 부서 목록

총 42개 부서. 분류:
- **예배/찬양** (6): 예배사역통합, 찬양사역통합, 2부찬양팀, 3부찬양팀, 수요기도회, 금요기도회
- **초장/장년** (11): 푸른초장, 에벤에셀, 교육훈련부, 중보기도사역부, 장년새가족, 예배안내1부, 예배안내2부, 친교봉사부, 솔리데오찬양대, 차량안내부, 상례부
- **차세대** (13): 차세대통합, 영아1부/2부, 유아1부/2부, 유치1부/2부, 유년1부/2부, 소년1부/2부, 청소년1부/2부
- **청년부** (8): 청년부통합, LIKE/ON/WITH/IN/BY JESUS, 청년새가족, 예배서포터즈
- **선교** (3): 세계선교부, 의료선교부, 통일선교부
- **나눔** (1): 푸른나눔

전체 spreadsheetId는 `complete_departments_script_ordered.js`의 `DEPARTMENTS` 객체 참조.
