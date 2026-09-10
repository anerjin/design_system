# 변경 로그

이 프로젝트의 모든 주요 변경 사항은 이 파일에 문서화됩니다.
형식은 [Keep a Changelog](https://keepachangelog.com/ko/1.0.0/)를 기반으로 하며,
이 프로젝트는 [Semantic Versioning](https://semver.org/spec/v2.0.0.html)을 준수합니다.

## [2.0.0] — 2026-09-08

BEM + 자체 CSS 토큰 체계를 버리고 **Tailwind CSS 4 + daisyUI 5** 위에 다시 만들었습니다.
(`8bb9a80`, `99d7ac2`)

### 💥 호환성이 깨지는 변경

- **CSS 아키텍처 교체** — `core/styles/`(base → tokens → layout → atoms → molecules →
  utilities)와 BEM 클래스(`.btn--primary`)를 폐기했습니다. 컴포넌트 클래스는 이제
  daisyUI가 제공하고(`.btn`, `.btn-primary`), 이 저장소의 CSS는 그 위의 보정입니다.
- **토큰 이름 교체** — `--ds-*`(`--ds-prime`, `--ds-gray-500`, `--ds-space-4`)를
  daisyUI 시멘틱 토큰(`--color-primary`, `--color-base-100/200/300`,
  `--color-base-content`)으로 바꿨습니다.
- **테마 이름 변경** — `[data-theme="dark"]` → `bricks-light`(기본) / `bricks-dark`.
  daisyUI 내장 테마 35종도 함께 사용할 수 있습니다.
- **패키지 exports 변경**

  | 이전 | 현재 |
  |------|------|
  | `@bricks/core/styles` → `core/styles/bundle.css` | `dist/bricks.css` |
  | `@bricks/core/styles/bundle` | `@bricks/core/styles` |
  | `@bricks/core/styles/bundle.min` | `@bricks/core/styles/min` |
  | `@bricks/core/styles/*` (개별 CSS) | 제거 |
  | — | `@bricks/core/styles/tokens` → `dist/bricks-tokens.css` (신규) |

- **`src/components/`(바닐라 TS 클래스) 제거.**
- **Button props 변경** — `variant="primary"`가 색을 뜻하던 것을 `color`/`variant`로
  나눴습니다. `color`는 시멘틱 색, `variant`는 `solid | surface | outline | dash |
  soft | ghost | link`입니다.

### 🚀 추가됨

- **`apps/gallery`** — 카탈로그·문서·반응형 미리보기 Vite 앱(포트 5180).
  해시 라우팅, `Ctrl`/`Cmd`+`K` 검색, PAGE ID로 소스를 찾는
  `scripts/locate-page.mjs`, 스토리 메타데이터를 AST로 추출하는 `story-manifest` 플러그인.
- **컴포넌트 확대** — 25종 → **모듈 62개**. Carousel, ChatBubble, Collapse, ContextMenu,
  Countdown, Diff, Dock, Drawer, Fab, Fieldset, FileInput, Filter, Hero, Indicator, Join,
  Kbd, List, Mask, Mockup, Range, Rating, Resizable, Stack, Status, Steps, Swap,
  ThemeController, Timeline, Toast, Validator 등.
- **접근성** — `Modal`을 네이티브 `<dialog>` + `showModal()` 기반으로 다시 만들어
  포커스 트랩·Escape를 브라우저에 맡깁니다. `ContextMenu`·`Navbar`는 `@base-ui/react`를 씁니다.
- **`dist/bricks-tokens.css`** — 이미 Tailwind + daisyUI를 쓰는 프로젝트가 토큰만
  가져갈 수 있는 산출물.
- **빌드 안전장치** — `scripts/build-css.js`가 대표 클래스를 검사해, 컴포넌트가 클래스를
  템플릿 리터럴로 조립해 산출 CSS에서 빠지면 빌드를 실패시킵니다.
- **`src/next/`** — Next.js 서버/클라이언트 컴포넌트 예제.
- CI에 갤러리 메타데이터 추출 테스트와 갤러리 빌드를 추가했습니다.

### 🔄 변경됨

- 워크스페이스에 `apps/*` 추가.
- Storybook 10, Vite 5.4, TypeScript 5.7, Node 22 기준.
- React는 peer로 18 또는 19를 허용합니다.

### 📝 문서

- README·CLAUDE.md·USAGE.md를 v2 기준으로 다시 썼습니다. v2 코드가 들어온 뒤에도
  이 문서들이 v1(BEM·`--ds-*`·25종)을 설명하고 있었습니다.

### ⚠️ 남은 것

- **`html_markup/`은 v1 구조에 묶여 있습니다.** `assets/styles/`의 BEM 번들을 참조하며
  현재 패키지와 연결돼 있지 않습니다. 문서는 `apps/gallery`가 대신합니다.
- **컴포넌트 테스트가 없습니다.** `packages/bricks/tests/`는 비어 있고, 유일한 테스트는
  `apps/gallery/plugins/story-manifest.test.mjs`입니다.

## [1.x] — 모노레포 전환 (v1, 별도 릴리스 없음)

> 아래는 v1 시절의 기록입니다. 현재 구조는 위 2.0.0 항목을 보세요.

### 🚀 추가됨
- TypeScript 지원 및 React 컴포넌트 라이브러리 (`@bricks/core`, 25종)
- 디자인 토큰 시스템 (`--ds-*` CSS 변수)
- `[data-theme="dark"]` 기반 다크/라이트 테마
- Storybook 문서화 (405개 스토리, Foundation 카테고리 포함)
- 루트 `README.md` 추가

### 🔄 변경됨
- npm workspaces 모노레포로 전환 — 디자인 시스템은 `packages/bricks` 로 이동
- 정적 HTML 문서 사이트를 `html_markup/` 으로 분리 (사이드바 + iframe 프레임셋 구조)
- CSS 구조 정리 — `core/styles/` 하위에 `base` → `tokens` → `layout` → `atoms` → `molecules` → `utilities`
- `CLAUDE.md` 를 실제 저장소 구조에 맞게 전면 재작성
- `USAGE.md` 를 실제 패키지명(`@bricks/core`)과 export 경로 기준으로 재작성
- GitHub Actions 워크플로우를 `deploy.yml` → `ci.yml` 로 교체 — 이 저장소는 private 이고
  Pages 가 활성화되어 있지 않아 배포가 불가능하므로, 빌드 검증(패키지 빌드 · CSS/JS 번들 ·
  Storybook 정적 빌드)만 수행. 액션은 `@v5`, Node 는 22 로 상향

### ❌ 삭제됨
- `apps/showcase` (Next.js 쇼케이스 앱) — 저장소에서 제거됨. 관련 npm 스크립트와 워크플로우 단계도 함께 정리
- `MIGRATION.md` — 이미 완료된 v1→v2 폴더 이동 가이드로, 현재 존재하지 않는 경로를 안내하고 있어 삭제
- 커밋되어 있던 `packages/bricks/core/scripts/` 생성물 289개 — `tsc` 산출물이므로 추적 해제 후 `.gitignore` 등록
- `html_markup` 의 미참조 파일 — `index.json`, `assets/js/navigation.js`, `assets/js/codeHighlighter.js`, `assets/css/codeHighlighter.css`

### 📦 의존성
- React 18.3.1 (peer: `^18.0.0 || ^19.0.0`)
- TypeScript 5.7.3
- Storybook 10.1.11 (`@storybook/react-vite`)
- Vite 5.4.11

## [1.0.0] - 2024-09-21

### 초기 릴리스
- DOI INC 디자인 시스템 기본 구조 구현
- HTML/CSS/JavaScript 기반 컴포넌트 라이브러리
- 기본 컴포넌트 세트:
  - **Atoms**: Button, Input, Badge, Checkbox, Radio, Toggle, Avatar, Progress, Spinner, Select
  - **Molecules**: Card, Alert, Modal, Dropdown, Tabs, Accordion, Datepicker, Pagination, Breadcrumb, Navbar, Table, Chart
- 레이아웃 시스템 (Grid, Container, Flexbox)
- 유틸리티 클래스 (Display, Position, Overflow)
- 인터랙티브 문서 사이트
- 템플릿 예제 (Dashboard, Settings, Widget)

## [0.9.0] - 2024-09-19

### 베타 릴리스
- 프로젝트 초기 설정
- 기본 폴더 구조 생성
- CSS 토큰 시스템 구현
- 기본 컴포넌트 프로토타입

---

## 버전 관리 가이드

### 버전 번호 형식
- **Major (X.0.0)**: 하위 호환성이 없는 API 변경
- **Minor (0.X.0)**: 하위 호환성 있는 기능 추가
- **Patch (0.0.X)**: 하위 호환성 있는 버그 수정

### 변경 유형
- 🚀 **추가됨** (Added): 새로운 기능
- 🔄 **변경됨** (Changed): 기존 기능 변경
- 🗑️ **제거됨** (Deprecated): 곧 제거될 기능
- ❌ **삭제됨** (Removed): 제거된 기능
- 🐛 **수정됨** (Fixed): 버그 수정
- 🔒 **보안** (Security): 보안 취약점 수정



⏺ 🎯 DOI INC 디자인 시스템 사용 방법

  방법 1: 직접 복사 (가장 간단)

  # 프로젝트의 components 폴더에 직접 복사
  cp -r src/react/* YOUR_PROJECT/components/
  cp -r core/styles/* YOUR_PROJECT/styles/

  방법 2: Git Submodule

  # 프로젝트에 서브모듈로 추가
  git submodule add https://github.com/anerjin/private_project_design_system.git libs/bricks

  # 사용하기
  import { Button } from './libs/bricks/src/react/Button';
  import './libs/bricks/core/styles/bundle.css';

  방법 3: NPM 로컬 패키지

  # DOI INC 폴더에서
  npm run build:lib
  npm pack

  # 프로젝트 폴더에서
  npm install ../private_project_design_system/yourusername-bricks-design-system-1.0.0.tgz

  방법 4: NPM 배포 (공개 배포시)

  # package.json의 name을 수정 (@yourusername → 실제 사용자명)
  # NPM 로그인
  npm login

  # 배포
  npm publish --access public

  # 다른 프로젝트에서 설치
  npm install @yourusername/bricks-design-system

  Next.js 프로젝트에서 사용 예시:

  // app/layout.tsx
  import '@yourusername/bricks-design-system/core/styles/bundle.css';
  import 'boxicons/css/boxicons.min.css';

  // app/page.tsx
  import { Button, Card } from '@yourusername/bricks-design-system';

  export default function Home() {
    return (
      <Card>
        <Button variant="primary">Click me</Button>
      </Card>
    );
  }

  React (CRA) 프로젝트에서 사용:

  // index.tsx
  import '@yourusername/bricks-design-system/core/styles/bundle.css';
  import 'boxicons/css/boxicons.min.css';

  // App.tsx
  import { Button, Input } from '@yourusername/bricks-design-system';

  추천 방법:
  - 개인 프로젝트: 방법 1 (직접 복사) 또는 방법 2 (Git Submodule)
  - 팀 프로젝트: 방법 3 (NPM 로컬) 또는 방법 4 (NPM 배포)