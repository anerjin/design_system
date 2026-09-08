# DOI INC Design System

> **현재 갤러리 개발 안내**: DOI 갤러리는 `apps/gallery`에 있습니다.
> `npm run gallery`로 실행하고 http://localhost:5180/ 에서 확인하세요.
> 모듈, 컴포넌트 검색, 사용 가이드와 반응형 미리보기를 제공합니다.
> 현재 공유 스타일은 `packages/bricks/src/styles`의 `bricks-light` / `bricks-dark`
> 테마와 18px 기본 글자 크기를 사용합니다.
> 페이지 ID(`DOI-C-BUTTON` 등)를 전달받으면
> `node apps/gallery/scripts/locate-page.mjs DOI-C-BUTTON`으로 화면과 소스 위치를 찾을 수 있습니다.
> 구조·실행·검증에 관한 최신 내용은 [갤러리 안내](apps/gallery/README.md)를 참고하세요.
> 아래의 `core/styles`, 25개 컴포넌트, BEM 관련 설명은 이전 구조에 대한 기록입니다.

텍스트 기반의 미니멀한 디자인 시스템입니다. CSS 디자인 토큰과 React 컴포넌트를 함께 제공하며,
다크/라이트 테마를 지원합니다.

- **React 컴포넌트 25종** — `forwardRef` + TypeScript 인터페이스
- **CSS 디자인 토큰** — `--ds-*` 접두사, `[data-theme="dark"]` 로 다크모드 전환
- **BEM 기반 CSS** — React 없이 순수 HTML/CSS 로도 사용 가능
- **Storybook** — 405개 스토리로 모든 컴포넌트와 변형을 문서화

---

## 저장소 구조

```
private_project_design_system/
├── packages/
│   └── bricks/              # @bricks/core — 디자인 시스템 패키지
│       ├── core/styles/     # CSS (토큰 → atoms → molecules → utilities)
│       ├── src/react/       # React 컴포넌트 + Storybook 스토리
│       ├── src/components/  # 프레임워크 비의존 바닐라 TS 컴포넌트
│       ├── src/stories/     # Foundation(색상·간격·그림자·테두리) 스토리
│       ├── scripts/         # CSS/JS 번들 빌드 스크립트
│       └── .storybook/      # Storybook 설정
├── html_markup/             # 정적 HTML 문서 사이트 (React 불필요)
└── .github/workflows/       # GitHub Pages 배포
```

npm workspaces 모노레포이며, 현재 워크스페이스는 `packages/bricks` 하나입니다.

---

## 빠른 시작

**요구 사항**: Node.js 20 이상

```bash
git clone https://github.com/anerjin/private_project_design_system.git
cd private_project_design_system
npm install
```

### Storybook 실행

```bash
npm run storybook
```

http://localhost:6006 에서 모든 컴포넌트를 확인할 수 있습니다.

### 정적 HTML 문서 사이트 보기

`html_markup/index.html` 을 브라우저로 열거나, 로컬 서버로 서빙합니다.

```bash
npx serve html_markup
```

---

## npm 스크립트

### 루트

| 명령 | 설명 |
|------|------|
| `npm run storybook` | Storybook 개발 서버 (포트 6006) |
| `npm run build-storybook` | Storybook 정적 빌드 |
| `npm run build:bricks` | `@bricks/core` TypeScript 컴파일 → `dist/` |

### `packages/bricks`

| 명령 | 설명 |
|------|------|
| `npm run build` | `tsc -p tsconfig.lib.json` → `dist/` (배포용 타입 + JS) |
| `npm run build:css` | CSS 번들 생성 → `core/styles/bundle.built.css`, `bundle.min.css` |
| `npm run build:js` | Vite 라이브러리 번들 → `dist/bundle/bricks.{es,umd}.js` |
| `npm run build:bundle` | `build:css` + `build:js` |
| `npm run build:all` | `build` + `build:bundle` |
| `npm run watch` | `tsc --watch` (출력: `core/scripts/`) |
| `npm run storybook` | Storybook 개발 서버 |
| `npm run build-storybook` | Storybook 정적 빌드 |

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
        <Button variant="primary" size="md">확인</Button>
      </Card.Body>
    </Card>
  );
}
```

설치 방법(로컬 패키지·Git 서브모듈·npm 배포)과 컴포넌트별 예제는 **[USAGE.md](./USAGE.md)** 를 참고하세요.

### 패키지 exports

| import 경로 | 대상 |
|-------------|------|
| `@bricks/core` | `dist/index.js` — React 컴포넌트 |
| `@bricks/core/bundle` | `dist/bundle/bricks.es.js` (ESM) / `bricks.umd.js` (UMD) |
| `@bricks/core/styles` | `core/styles/bundle.css` — `@import` 기반 |
| `@bricks/core/styles/bundle` | `core/styles/bundle.built.css` — 단일 파일 |
| `@bricks/core/styles/bundle.min` | `core/styles/bundle.min.css` — 압축본 |
| `@bricks/core/styles/*` | 개별 CSS 파일 |

> 공식 아이콘은 [Lucide](https://lucide.dev/)입니다. `<Icon name="house" size={20} />`처럼 사용하며,
> 별도의 아이콘 폰트나 CSS 로딩 없이 SVG로 표시됩니다. DOI-C-ICON에서 이름 검색과 코드 복사를 지원합니다.

---

## 아키텍처

### 컴포넌트 패턴

모든 React 컴포넌트는 `forwardRef` + 내보낸 props 인터페이스 + BEM 클래스 조립 + `displayName` 형태입니다.

```tsx
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', ...props }, ref) => {
    const classes = ['btn', `btn--${variant}`, `btn--${size}`].filter(Boolean).join(' ');
    return <button ref={ref} className={classes} {...props} />;
  }
);
Button.displayName = 'Button';
```

`Card` 는 서브 컴포넌트를 속성으로 붙인 복합 컴포넌트입니다 — `Card.Header`, `Card.Body`,
`Card.Footer`, `Card.Title`, `Card.Subtitle`, `Card.Actions`, `Card.Badge`, `Card.Image`.
`Modal` 은 서브 컴포넌트 대신 `title` / `header` / `footer` prop 을 받습니다.

### CSS

```
core/styles/
├── base/        reset.css, base.css
├── tokens/      colors, typography, spacing, shadows, borders
├── layout/      container, grid, flexbox
├── atoms/       button, input, checkbox, radio, toggle, badge, avatar, progress, spinner, select
├── molecules/   card, modal, alert, dropdown, tabs, accordion, pagination,
│                breadcrumb, table, navbar, tooltip, chart, datepicker
└── utilities/   display, position, overflow, text
```

- **BEM** — `.btn`, `.btn--primary`, `.btn__icon`
- **디자인 토큰** — `--ds-prime`, `--ds-gray-500`, `--ds-space-4`, `--ds-radius-md`, `--ds-shadow-md`
- **다크모드** — `[data-theme="dark"]` 셀렉터가 토큰 값을 재정의
- CSS 와 React 는 서로 독립적입니다. 컴포넌트를 바꾸려면 `src/react/*.tsx` 와
  `core/styles/**/*.css` 를 **둘 다** 수정해야 합니다.

### 컴포넌트 목록

| 분류 | 컴포넌트 |
|------|----------|
| General | Accordion, Button |
| Feedback | Alert, Modal, Spinner, Tooltip |
| Data Display | Avatar, Badge, Card, Chart, Progress, Table |
| Navigation | Breadcrumb, Navbar, Pagination, Tabs |
| Data Entry | Checkbox, DatePicker, Dropdown, Input, Radio, Select, Toggle |
| Foundation | Typography, Icon |

---

## CI

`main` 푸시와 모든 pull request 에서 [`.github/workflows/ci.yml`](./.github/workflows/ci.yml) 이
빌드가 깨지지 않는지 검증합니다 — 패키지 타입 체크/컴파일, CSS·JS 번들, Storybook 정적 빌드.

자동 배포는 하지 않습니다. 문서 사이트를 호스팅하려면 아래 산출물을 직접 배포하세요.

```bash
npm run build-storybook --workspace=packages/bricks -- -o _site/storybook
cp -r html_markup/. _site/
```

`_site/` 를 정적 호스팅에 올리면 `/` 는 `html_markup` 문서 사이트, `/storybook/` 은
Storybook 이 됩니다. (`_site/` 는 `.gitignore` 에 등록되어 있습니다.)

---

## 문서

- [USAGE.md](./USAGE.md) — 다른 프로젝트에서 사용하는 방법
- [CHANGELOG.md](./CHANGELOG.md) — 변경 이력
- [CLAUDE.md](./CLAUDE.md) — Claude Code 작업 가이드

## 라이선스

MIT
