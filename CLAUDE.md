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
| `budget.html` | GitHub Pages | 예결산 확인 (회계용/행정용 탭) + 카드 펼침 (계정과목 raw 내역) |
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

### 회계용 시트 (사용자 입력 raw)

`index.html`에서 사용자가 입력. 각 부서 스프레드시트의 `회계용` 시트:

```
A: 계정과목  B: 지출날짜  C: 적요  D: 지출금액  E: 수입금액
F: 지원금/자부담  G: 사용자  H: 입금확인  I: 지출결의날짜
```

### 행정용 시트 (자동 입력 raw)

별개 프로젝트 `igw-steward-tools`의 `sync_admin_sheets.py`가 매월 회계팀 엑셀에서 자동 입력. 각 부서 스프레드시트의 `행정용` 시트:

```
A: 계정과목  B: 날짜  C: 전표번호  D: 회계단위  E: .(프로젝트)
F: 지원금/자부담  G: 내용(적요)  H: 지출금액  I: 수입금액
```

회계용/행정용 컬럼 위치가 다르지만 백엔드 `SHEET_COLUMNS` dict (`complete_departments_script_ordered.js` 상단)이 흡수.

행정용 시트가 아직 생성 안 된 부서도 있음 (sync 주기 영향). `getTransactions` API가 `sheetMissing: true` 플래그로 안내.

## 개발 워크플로우

1. **로컬 편집** — `budget.html` 등 직접 수정
2. **로컬 테스트** — `python3 -m http.server 8000` → http://localhost:8000 에서 확인
3. **커밋 & 푸시** — `git add`, `git commit`, `git push origin main`
4. **GitHub Pages 자동 배포** — 1~2분 후 라이브 반영
5. **Apps Script 변경 시**:
   - 로컬 수정 → `pbcopy < complete_departments_script_ordered.js` 로 클립보드 복사
   - Apps Script 에디터 (소년1부 → 확장 프로그램 → Apps Script, 프로젝트명 `IGW_예산관리_웹앱`) → 코드.gs 전체 선택(`Cmd+A`) → 붙여넣기 → 저장(`Cmd+S`)
   - **배포 → 배포 관리** → 활성 배포 옆 **연필 아이콘** → **버전 → "새 버전"** → **배포**
   - SCRIPT_URL 유지된 채 코드만 갱신됨. "새 배포"로 만들면 URL이 바뀌어서 `budget.html`의 `SCRIPT_URL`도 같이 수정해야 함 — 추천 X.

## 알려진 함정

- **사용자 입력 도중 Apps Script 배포 위험** — 입력 데이터 꼬일 수 있음. 새벽 또는 공지 후 작업.
- **iOS Safari 날짜 input 크기 문제** — CSS로 `height: 52px !important` 강제 고정 (해결됨).
- **iOS Safari 캐시 강함** — 테스트는 시크릿 모드 권장.
- **PWA Service Worker** — 네트워크 우선 / 캐시 폴백. 캐시명 변경 시 버전 올리기.

## Recent changes

### 2026-05-21 — 예결산 확인 회계용/행정용 탭 추가

- `budget.html`: 탭 UI(회계용/행정용), CSS 변수 기반 색상 테마 전환(보라 ↔ 주황), 카드별 차이 배지 + 탭 라벨 차이 건수 배지
- `complete_departments_script_ordered.js`: git에 첫 추가 (Apps Script 백업). `getBudget`이 두 영역 모두 파싱해서 `{accounting, admin}` 반환
  - boundary 탐지는 **코드에선 A열(부서명)이 빈 행 뒤에 다시 등장하는 지점** 사용 중 (위 "데이터 구조" 섹션의 B열 '계정과목' 기준 설명과 차이 — 동작은 정상이지만 정리 시 통일 필요)
  - 응답 구조가 바뀌었으므로 백엔드 변경 시 프론트와 동시 배포 필요
- 차이 계산은 프론트엔드(`computeDiffs`)에서: **양쪽에 동시에 있는 계정과목만** `행정용 지출 − 회계용 지출` 비교, 매칭 안 되는 항목은 `console.warn` 만 남기고 차이 카운트에서 제외 (시트 입력 실수 가능성이 높아 사용자에게 잘못된 신호 안 주려고)
- 자부담 영역 녹색(#4caf50)은 탭과 독립된 의미축이라 테마 전환에서 제외함

### 2026-05-27 — 계정과목 내역 보기 (카드 펼침)

- `complete_departments_script_ordered.js`: `getTransactions` API 추가 (`doGet` 안 `getBudget` 라우팅 다음 위치)
  - 파일 상단에 `SHEET_COLUMNS` 매핑 dict — 회계용/행정용 컬럼 차이 흡수
  - 회계용/행정용 raw 데이터를 통합 모델(`{category, date, description, amount, fundType}`)로 추출
  - `"yyyy. M. d"` 명시적 정규식 파싱 + 임시 `_sortDate` 필드로 최신순 정렬 (`new Date("yyyy-M-d")` 환경 의존성 회피)
  - 행정용 시트 미존재 부서엔 `sheetMissing: true` 플래그
- `budget.html`: 카드 클릭 → 카드 아래 raw 지출 내역 인라인 펼침. 회계용/행정용 탭 둘 다 동작
  - 캐시: JS 메모리만 (`transactionsCache = { accounting, admin }`), sessionStorage 안 씀 — 새로고침 시 의도적 초기화 (회계가 방금 입력한 거 못 보는 사고 방지)
  - 중복 fetch 방지: `transactionsFetching` in-flight Promise 공유 — 여러 카드 동시 첫 펼침 시 fetch 1번만
  - 카드 영역 vs fundType 필터링: 지원금 카드(`.budget-item` — `self` 클래스 없음) → `fundType === '지원금'`만, 자부담 카드(`.budget-item.self`) → `fundType === '자부담'`만. 카드 집계 금액과 펼친 행 합이 정확히 일치.
  - `toggleCard` → `loadTransactions` → `renderTransactions`에 `cardType`(`'support'`/`'self'`) 인자 흐름
  - 동시 펼침 허용
- Apps Script 배포 워크플로우 정립 (위 "개발 워크플로우" 5번 참조)

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
