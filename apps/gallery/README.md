# DOI Gallery

DOI INC 디자인 시스템의 모듈, 컴포넌트 카탈로그와 사용 가이드입니다.
shadcn/ui의 문서 탐색 구조와 절제된 시각적 위계를 참고했습니다.

## 실행

저장소 루트에서:

~~~sh
npm install
npm run gallery
~~~

기본 주소: http://localhost:5180/

- `#/` 또는 `#/modules`: 전체 화면 너비를 사용하는 반응형 모듈 그리드
- `#/layout`: 레이아웃을 추가할 빈 페이지
- `#/components`: 실제 컴포넌트 미리보기, 검색 및 카테고리 필터
- `#/docs`: 설치, 개발 환경, 테마
- `#/c/button`: 컴포넌트 문서
- `#/preview/button/Default`: 격리된 예제 프레임

Ctrl/Cmd+K로 검색을 열고, 방향키와 Enter로 이동합니다. 모바일 메뉴와
검색은 native dialog를 사용해 포커스 이동과 Escape를 처리합니다.

## 페이지 ID로 위치 찾기

컴포넌트 문서 상단의 PAGE ID 옆 복사 버튼은 `DOI-C-BUTTON` 같은 ID만 복사합니다.
사용자가 이 ID를 전달하면 다음 명령으로 페이지 URL, 컴포넌트 소스, 스토리 소스를 확인합니다.
이름과 소스 파일이 다른 경우도 실제 import를 따라 찾습니다.

~~~sh
node apps/gallery/scripts/locate-page.mjs DOI-C-BUTTON
node apps/gallery/scripts/locate-page.mjs DOI-C-BROWSER
node apps/gallery/scripts/locate-page.mjs --list
~~~

Node.js 22.18 이상이 필요합니다. ID는 기존 페이지 경로에서 생성하므로 카테고리나 정렬 순서에
영향받지 않습니다. 갤러리 검색창과 카탈로그에서도 ID로 검색할 수 있습니다.

## 소스 구조

- `src/pages`: 홈, 카탈로그, 상세, 가이드, 예제 렌더러
- `src/components`: 검색, 탐색, 코드 복사, 반응형 미리보기
- `src/registry`: 컴포넌트 메타데이터와 지연 로딩
- `plugins/story-manifest.ts`: TypeScript AST로 스토리 메타데이터/소스 추출
- `src/styles.css`: 문서와 모듈의 레이아웃
- `src/pages/Modules.tsx`: 모듈 등록 목록과 구현. 목록에 항목을 추가하면 그리드에 자동 배치
- `../../packages/bricks/src/styles`: 공유 색상, 모서리, 타이포그래피

스토리는 계속 단일 원본입니다. 빌드/개발 서버가 메타데이터를 읽으며,
브라우저는 선택한 스토리와 Storybook 런타임을 필요할 때만 불러옵니다.
스토리 파일 변경·추가·삭제는 개발 서버의 메타데이터에도 반영됩니다.

예제는 같은 출처의 iframe에서 실행합니다. 모달, 타이머, 테마 변경을
문서 셸과 분리하고, 출처와 송신 프레임을 확인한 메시지로 높이를 맞춥니다.
상세 페이지의 예제 아코디언은 기본으로 모두 열려 있습니다. 사용자가 접으면 해당 예제 렌더링을 해제합니다.

카탈로그의 각 카드에도 첫 번째 스토리를 표시합니다. 화면 주변의 미리보기만 마운트하고,
멀리 벗어나면 해제하여 많은 컴포넌트를 탐색할 때 프레임 수를 제한합니다.
미리보기에서 직접 조작할 수 있으며, 카드 하단을 누르면 상세 문서로 이동합니다.
화면 밖으로 멀리 스크롤한 미리보기의 임시 입력 상태는 다시 진입할 때 초기화됩니다.

예제 내부의 카드·패널·알림·메뉴 등 박스에는 `packages/bricks/src/styles/examples.css`를
공통으로 적용합니다. Stack의 앞쪽 카드와 같은 1px 회색 테두리와 중간 그림자를 사용하며,
갤러리와 Storybook에 동일하게 반영됩니다. 미리보기 외곽과 입력 컨트롤에는 적용하지 않습니다.

Fieldset은 `bordered`일 때 흰색/다크 표면, 둥근 모서리와 내부 여백을 적용합니다.
기본형은 테두리 없는 입력 묶음이며, 예제 공통 그림자도 박스형에만 적용됩니다.
제목/라벨/설명은 18/16/14px이고, 여러 입력은 `fieldset-field`로 묶어 간격을 맞춥니다.

Menu의 공통 디자인은 `packages/bricks/src/styles/menu.css`에서 관리합니다.
흰색/다크 표면, 기본 16px 항목, 프라임 선택 상태, 회색 배지·그룹 구분선을 사용합니다.
메뉴 예제는 항목 선택과 하위 메뉴 접기를 실제로 조작할 수 있습니다.

Indicator 예제는 프라임 숫자 배지, 9방향 배치 비교, 무채색 아바타와 상태 점,
버튼 배지로 구성합니다. 배지 경계와 아바타 위치 보정은 `styles/examples.css`에서 관리합니다.

## 디자인

- 공통 기본 테마: `bricks-light`, `bricks-dark`
- 기본 글자 크기: 18px; 모듈 본문·버튼 14~16px, 작은 보조 문구 최소 12px
- 버튼/입력: 0.5rem, 카드: 0.75rem 모서리
- 문서 셸: 화이트·다크 바탕, 회색 농도로 구분하는 표면·박스·테두리
- 프라임: 검정 (라이트 #000000 / 다크 #fafafa), 주요 동작·핵심 데이터
- 서브: 바이올렛 (라이트 #7c3aed / 다크 #a78bfa), 보조 강조·중요 지표
- 확인·삭제·저장은 `Button color="primary"`, 취소·닫기·나가기는 `Button variant="surface"`로 통일
- `surface`는 라이트에서 흰색, 다크에서 어두운 표면과 회색 테두리를 사용하며 공통 버튼 라운드를 따름
- 회색은 영역 구분에, 프라임·서브 컬러는 중요한 요소에만 사용
- 예제 배경과 차트 면은 그라데이션 없이 단색을 사용하며, Diff의 오른쪽 비교 영역은 프라임 컬러로 표시
- 갤러리 테마 저장 키: `doi-appearance`
- 컴포넌트 테마 저장 키: `bricks-theme`

모듈의 계정 생성, 결제 저장, 팀 초대는 로컬 상태만 바꾸는 예제입니다.
서버에 입력을 전송하거나 실제 계정/결제를 만들지 않습니다.

## 검증

~~~sh
npm run build:gallery
npm run typecheck
npm run build:all
npm run build-storybook
node --test apps/gallery/plugins/story-manifest.test.mjs
~~~

마지막 AST 회귀 테스트는 Node.js 22.18 이상에서 실행합니다.
JSX, 문자열, 주석 속 중괄호와 메타데이터 참조, 선언 순서를 검증합니다.

브라우저 검증: 1440px/768px/390px 레이아웃, 검색 키보드 탐색, 필터,
코드 복사, 미리보기 크기, 모달 Escape, 테마 격리, 폼 상호작용과
64개 컴포넌트의 기본 예제 렌더링을 확인했습니다.
전체 338개 변형에 대한 접근성 인증이나 회귀 검증을 의미하지는 않습니다.
