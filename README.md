# DOI INC Design System

**Tailwind CSS 4 + daisyUI 5** 위에 올린 React 디자인 시스템입니다.
컴포넌트 62종과 공유 토큰을 제공하고, `[data-theme]` 속성으로 테마를 전환합니다.

- **React 컴포넌트 62종** — `forwardRef` + 내보낸 props 인터페이스
- **daisyUI 테마** — `bricks-light`(기본) / `bricks-dark` + daisyUI 내장 35종
- **접근성** — `Modal`은 네이티브 `<dialog>`, `ContextMenu`·`Navbar`는 `@base-ui/react`
- **아이콘** — [Lucide](https://lucide.dev/) (`<Icon name="house" size={20} />`)
- **갤러리** — 카탈로그·문서·반응형 미리보기를 갖춘 Vite 앱

---

## 저장소 구조

```
bricks-monorepo/
├── packages/bricks/        # @bricks/core — 디자인 시스템 패키지
│   ├── src/react/          #   컴포넌트 + Storybook 스토리 (공개 API는 react/index.ts)
│   ├── src/styles/         #   Tailwind/daisyUI 진입점과 공유 토큰
│   ├── src/next/           #   Next.js 서버/클라이언트 컴포넌트 예제
│   ├── scripts/            #   CSS·JS 번들 빌드
│   └── .storybook/
├── apps/gallery/           # 카탈로그·문서 사이트 (Vite, 포트 5180)
├── html_markup/            # v1 시절 정적 문서 사이트 — 레거시, 아래 참고
└── .github/workflows/ci.yml
```

npm workspaces 모노레포입니다. 워크스페이스는 `packages/*`와 `apps/*`입니다.

---

## 빠른 시작

**요구 사항**: Node.js 22.18 이상 (CI는 Node 22)

```bash
git clone https://github.com/anerjin/design_system.git
cd design_system
npm install
```

### 갤러리 실행 — 권장 진입점

```bash
npm run gallery
```

http://localhost:5180/ 에서 모듈·컴포넌트 카탈로그와 사용 가이드를 봅니다.
`Ctrl`/`Cmd`+`K`로 검색합니다. 자세한 내용은 [갤러리 안내](apps/gallery/README.md).

컴포넌트 문서 상단의 PAGE ID(`DOI-C-BUTTON` 등)로 소스 위치를 찾을 수 있습니다.

```bash
node apps/gallery/scripts/locate-page.mjs DOI-C-BUTTON
node apps/gallery/scripts/locate-page.mjs --list
```

### Storybook 실행

```bash
npm run storybook     # http://localhost:6006
```

---

## npm 스크립트

### 루트

| 명령 | 설명 |
|------|------|
| `npm run gallery` | 갤러리 개발 서버 (포트 5180) |
| `npm run build:gallery` | 갤러리 정적 빌드 |
| `npm run storybook` | Storybook 개발 서버 (포트 6006) |
| `npm run build-storybook` | Storybook 정적 빌드 |
| `npm run build:bricks` | 타입 선언(`.d.ts`) 생성 → `dist/` |
| `npm run build:all` | 타입 선언 + CSS/JS 번들 |
| `npm run typecheck` | 패키지 타입 체크 |

### `packages/bricks`

| 명령 | 설명 |
|------|------|
| `npm run build` | `tsc` — **타입 선언만** 내보낸다(`emitDeclarationOnly`) |
| `npm run build:css` | Tailwind CLI → `dist/bricks.css`, `bricks.min.css`, `bricks-tokens.css` |
| `npm run build:js` | Vite 라이브러리 번들 → `dist/index.js`, `index.cjs`, `bricks.umd.js` |
| `npm run build:bundle` | `build:css` + `build:js` |
| `npm run build:all` | `build` + `build:bundle` (배포 전 전체) |

---

## 사용법

```tsx
import '@bricks/core/styles';
import { Button, Card, Modal } from '@bricks/core';

export function Example() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>안녕하세요</Card.Title>
      </Card.Header>
      <Card.Body>
        <Button color="primary" size="md">확인</Button>
      </Card.Body>
    </Card>
  );
}
```

설치 방법과 컴포넌트별 예제는 **[USAGE.md](./USAGE.md)** 를 참고하세요.

### 패키지 exports

| import 경로 | 대상 | 언제 쓰나 |
|-------------|------|-----------|
| `@bricks/core` | `dist/index.js` (ESM) / `dist/index.cjs` (CJS) | React 컴포넌트 |
| `@bricks/core/bundle` | `dist/bricks.umd.js` | 번들러 없이 쓸 때 |
| `@bricks/core/styles` | `dist/bricks.css` | **Tailwind를 쓰지 않는 프로젝트** — preflight + daisyUI + 테마 전체 |
| `@bricks/core/styles/min` | `dist/bricks.min.css` | 위의 압축본 |
| `@bricks/core/styles/tokens` | `dist/bricks-tokens.css` | **이미 Tailwind + daisyUI를 쓰는 프로젝트** — 토큰만 |

---

## 아키텍처

### 컴포넌트 패턴

`forwardRef` + 내보낸 props 인터페이스 + **리터럴 클래스 룩업 맵** + `displayName`.

```tsx
// Tailwind v4 스캐너는 템플릿 리터럴을 읽지 못한다.
// `btn-${color}`로 조립하면 해당 클래스가 산출 CSS에서 통째로 빠진다.
const COLOR: Record<ButtonColor, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  // …
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ color = 'neutral', size = 'md', ...props }, ref) => (
    <button ref={ref} className={cx('btn', COLOR[color], SIZE[size])} {...props} />
  ),
);
Button.displayName = 'Button';
```

`scripts/build-css.js`가 대표 클래스 목록을 검사해, 클래스가 산출물에서 빠지면
빌드를 실패시킵니다. 이 규칙을 어기면 CI에서 잡힙니다.

`Card`는 서브 컴포넌트를 붙인 복합 컴포넌트입니다 — `Card.Header`, `Card.Body`,
`Card.Footer`, `Card.Title` 등. `Modal`은 `title`/`header`/`footer` prop을 받습니다.

### 스타일

```
src/styles/
├── bricks.css            진입점 — Tailwind + daisyUI 플러그인 + 아래 파일 import
├── themes.css            bricks-light / bricks-dark 색 토큰
├── shape.css             --radius-field / --radius-selector / --radius-box
├── type.css              Pretendard, 16px rem 스케일 (@theme)
├── components.css        daisyUI 위에 얹는 보정
├── interactive.css · menu.css · navbar.css · alert.css · radial-progress.css
└── examples.css          갤러리 예제 전용
```

- **색은 daisyUI 시멘틱 토큰** — `--color-primary`, `--color-base-100/200/300`,
  `--color-base-content`, `info`/`success`/`warning`/`error`
- **테마 전환** — `[data-theme="bricks-dark"]`가 토큰 값을 재정의. 기본은 `bricks-light`
- **글자 크기** — 16px rem 기준. UI 본문은 `text-sm`(14px), 캡션은 `text-xs`(12px)
- 컴포넌트 클래스는 **daisyUI가 제공**합니다. 이 저장소의 CSS는 그 위의 보정입니다.

### 컴포넌트 모듈 62개

| 분류 | 컴포넌트 |
|------|----------|
| General | Accordion, Button, Collapse, Divider, Join, Stack, Swap |
| Feedback | Alert, Loading, Modal, Progress, RadialProgress, Skeleton, Toast, Tooltip |
| Data Display | Avatar, Badge, Card, Carousel, Chart, ChatBubble, Countdown, Diff, Indicator, Kbd, List, Mask, Mockup, Stat, Status, Table, Timeline |
| Navigation | Breadcrumb, Dock, Drawer, Fab, Footer, Hero, Link, Menu, Navbar, Pagination, Steps, Tabs |
| Data Entry | Checkbox, DatePicker, Dropdown, Fieldset, FileInput, Filter, Input, Radio, Range, Rating, Select, Toggle, Validator |
| Foundation | ContextMenu, Icon, Resizable, ThemeController, Typography |

공개 API는 `src/react/index.ts` 한 곳에서 관리합니다(모듈 62개). `src/index.ts`는 재export만 합니다.
`Mockup`은 `MockupBrowser`·`MockupCode`·`MockupPhone`·`MockupWindow` 4종을 제공합니다.

---

## CI

`main` 푸시와 모든 pull request에서 [`ci.yml`](./.github/workflows/ci.yml)이
Node 22로 검증합니다 — 패키지 타입 체크/컴파일, CSS·JS 번들, 갤러리 메타데이터
추출 테스트, 갤러리 빌드, Storybook 정적 빌드. 자동 배포는 하지 않습니다.

---

## `html_markup/`은 레거시입니다

v1 시절의 정적 문서 사이트입니다. `assets/styles/`의 BEM 번들(`--ds-*` 토큰)을
참조하며 **현재 패키지와 연결돼 있지 않습니다.** 문서는 `apps/gallery`가 대신합니다.
참고 목적으로만 남겨 두었고, 여기를 고쳐도 패키지에는 반영되지 않습니다.

---

## 알려진 공백

- `packages/bricks/tests/`가 비어 있습니다(`.gitkeep`만). 컴포넌트 단위 테스트가
  없고, 저장소의 유일한 테스트는 `apps/gallery/plugins/story-manifest.test.mjs`입니다.
- `src/next/`에는 예제 컴포넌트 2개(`ServerButton`, `ClientButton`)만 있습니다.
- `html_markup/`이 위와 같이 v1에 묶여 있습니다.

---

## 문서

- [USAGE.md](./USAGE.md) — 다른 프로젝트에서 사용하는 방법
- [apps/gallery/README.md](./apps/gallery/README.md) — 갤러리 구조·실행·검증
- [CHANGELOG.md](./CHANGELOG.md) — 변경 이력
- [CLAUDE.md](./CLAUDE.md) — Claude Code 작업 가이드

## 라이선스

MIT
