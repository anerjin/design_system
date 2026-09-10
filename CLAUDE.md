# CLAUDE.md

Claude Code가 이 저장소에서 작업할 때 참고하는 안내입니다.

## 무엇인가

**Tailwind CSS 4 + daisyUI 5** 기반 React 디자인 시스템(`@bricks/core` v2.0.0)과
그 카탈로그 사이트(`apps/gallery`)를 담은 npm workspaces 모노레포입니다.

> **v1과 헷갈리지 않기.** 2026-09-08의 `8bb9a80`에서 BEM + `--ds-*` 토큰 + `core/styles/`
> 구조를 버리고 Tailwind + daisyUI로 다시 만들었습니다. `core/styles/`와
> `src/components/`는 삭제됐습니다. `html_markup/`만 v1 구조에 남아 있습니다.

## 저장소 구조

- **`packages/bricks`** (`@bricks/core`) — 디자인 시스템 패키지
  - `src/react/` — 컴포넌트 + Storybook 스토리. **공개 API는 `src/react/index.ts` 한 곳**
  - `src/styles/` — Tailwind/daisyUI 진입점(`bricks.css`)과 공유 토큰
  - `src/next/` — Next.js 서버/클라이언트 예제 2개
  - `scripts/` — `build-css.js`, `build-js.js`
  - `tests/` — **비어 있음**(`.gitkeep`만)
- **`apps/gallery`** — 카탈로그·문서 Vite 앱(포트 5180). 구조는 `apps/gallery/README.md`
- **`html_markup/`** — v1 정적 문서 사이트. **레거시이며 현재 패키지와 연결돼 있지 않다**
- **`.github/workflows/ci.yml`** — 빌드 검증만. 자동 배포 없음

## 명령

### 루트

| 명령 | 설명 |
|------|------|
| `npm run gallery` | 갤러리 개발 서버 (5180) |
| `npm run build:gallery` | 갤러리 정적 빌드 |
| `npm run storybook` | Storybook (6006) |
| `npm run build-storybook` | Storybook 정적 빌드 |
| `npm run build:bricks` | 타입 선언(`.d.ts`) 생성 → `dist/` |
| `npm run build:all` | 타입 선언 + CSS/JS 번들 |
| `npm run typecheck` | 패키지 타입 체크 |

### `packages/bricks`

`build` · `build:css` · `build:js` · `build:bundle` · `build:all` · `typecheck` · `watch`.

## 아키텍처

### 컴포넌트 패턴

`forwardRef` + 내보낸 props 인터페이스 + **리터럴 클래스 룩업 맵** + `displayName`.

```tsx
const COLOR: Record<ButtonColor, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ color = 'neutral', size = 'md', ...props }, ref) => (
    <button ref={ref} className={cx('btn', COLOR[color], SIZE[size])} {...props} />
  ),
);
Button.displayName = 'Button';
```

> ⚠️ **클래스를 템플릿 리터럴로 조립하지 마세요.** Tailwind v4 스캐너는 `btn-${color}`를
> 읽지 못해 해당 클래스가 산출 CSS에서 통째로 빠집니다. 반드시 리터럴 룩업 맵을 씁니다.
> `scripts/build-css.js`가 대표 클래스를 검사해 빌드를 실패시킵니다.

### 스타일

- 컴포넌트 클래스는 **daisyUI가 제공**합니다. `src/styles/*.css`는 그 위의 보정입니다.
- 진입점은 `src/styles/bricks.css` — `@import 'tailwindcss' source(none)`,
  `@source "../react"`, `@plugin "daisyui"`, 그리고 나머지 CSS import.
- 색 토큰은 daisyUI 시멘틱(`--color-primary`, `--color-base-100/200/300`,
  `--color-base-content`, info/success/warning/error).
- 테마는 `themes.css`의 `bricks-light`(기본) / `bricks-dark`. `[data-theme]`로 전환.
- 글자 크기는 16px rem 기준. UI 본문 `text-sm`(14px), 캡션 `text-xs`(12px). Pretendard.
- 모양 토큰은 `shape.css` — `--radius-field` `--radius-selector` `--radius-box`.
  `.btn`은 `--radius-field: 9999px`로 알약 모양입니다(`.btn-square` 제외).
- **CSS 파일을 추가하면 `src/styles/bricks.css`의 import 목록에 등록**하고,
  소비자에게 내보낼 토큰이면 `scripts/build-css.js`의 `TOKEN_FILES`에도 넣습니다.

### 빌드 산출물

| 파일 | 내용 |
|------|------|
| `dist/bricks.css` / `.min.css` | Tailwind preflight + daisyUI + 테마 35종 + 토큰 |
| `dist/bricks-tokens.css` | 토큰만. 이미 Tailwind+daisyUI를 쓰는 소비자용 |
| `dist/index.js` / `.cjs` / `bricks.umd.js` | Vite 라이브러리 번들 (ESM/CJS/UMD) |
| `dist/*.d.ts` | `tsc`가 내보내는 타입 선언 — `build`는 JS를 내보내지 않는다 |

### 접근성

- `Modal`은 네이티브 `<dialog>` + `showModal()`. 포커스 트랩·Escape가 브라우저에서 나옵니다.
  `aria-labelledby`/`aria-label`을 상황에 따라 붙입니다.
- `ContextMenu`·`Navbar`는 `@base-ui/react`를 씁니다.
- 갤러리의 모바일 메뉴·검색도 native dialog입니다.

## 규칙

- 컴포넌트: `PascalCase.tsx` (`packages/bricks/src/react/`)
- 스토리: 같은 폴더의 `PascalCase.stories.tsx`. 제목은 `분류/컴포넌트`
- 크기 변형: `xs | sm | md | lg | xl`
- **모든 props 인터페이스를 export**합니다
- TypeScript strict + `noUnusedLocals` / `noUnusedParameters` / `noImplicitReturns`
- 새 컴포넌트는 `src/react/index.ts`에 등록해야 공개 API가 됩니다

## 알려진 공백

- **컴포넌트 테스트가 없습니다.** `packages/bricks/tests/`는 비어 있고, 저장소의 유일한
  테스트는 `apps/gallery/plugins/story-manifest.test.mjs`입니다.
- **`html_markup/`이 v1에 묶여 있습니다.** `assets/styles/`의 BEM 번들을 참조하며
  패키지와 동기화되지 않습니다. 고쳐도 패키지에 반영되지 않습니다.
- `src/next/`에는 예제 2개뿐입니다.

## 환경

Node.js 22.18 이상(CI는 Node 22). 패키지 매니저는 npm(workspaces).
React는 peer로 18 또는 19를 허용하며 개발 의존성은 18입니다.
