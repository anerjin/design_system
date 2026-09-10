# DOI INC Design System 사용 가이드

`@bricks/core`(Tailwind CSS 4 + daisyUI 5)를 다른 프로젝트에서 쓰는 방법입니다.

## 목차

- [설치 방법](#설치-방법)
- [CSS 임포트 — 두 갈래](#css-임포트--두-갈래)
- [테마](#테마)
- [아이콘](#아이콘)
- [프레임워크별 설정](#프레임워크별-설정)
- [컴포넌트 예제](#컴포넌트-예제)

---

## 설치 방법

### 1. 모노레포에 흡수 (디자인 시스템을 함께 키울 때)

`packages/bricks`를 소비하는 쪽 모노레포로 가져오고, 번들러 alias로 **소스를 직접** 봅니다.
이 저장소의 `apps/gallery`가 쓰는 방식입니다. 컴포넌트를 고치면 즉시 반영되고 매번 빌드할
필요가 없습니다.

```ts
// vite.config.ts
resolve: {
  alias: { '@bricks/core': path.resolve(dirname, '../../packages/bricks/src/index.ts') },
}
```

```css
/* 앱의 CSS 진입점 */
@import '../../packages/bricks/src/styles/bricks.css';
@source "./";
```

`bricks.css`가 자기 컴포넌트(`@source "../react"`)를, `@source "./"`가 앱 소스를 스캔합니다.

### 2. 로컬 tarball (팀 내부 공유)

```bash
# 디자인 시스템 저장소에서
npm run build:all --workspace=packages/bricks
cd packages/bricks && npm pack

# 사용할 프로젝트에서
npm install ../design_system/packages/bricks/bricks-core-2.0.0.tgz
```

### 3. npm link (디자인 시스템을 함께 개발할 때)

```bash
# 디자인 시스템 저장소에서
cd packages/bricks && npm link

# 사용할 프로젝트에서
npm link @bricks/core
```

### 4. Git 서브모듈 / npm 배포

서브모듈로 두거나 레지스트리에 배포해 일반 의존성으로 설치합니다.
어느 쪽이든 `npm run build:all`로 만든 `dist/`를 소비합니다.

---

## CSS 임포트 — 두 갈래

소비하는 프로젝트가 Tailwind를 쓰는지에 따라 갈립니다.

### A. Tailwind를 쓰지 않는 프로젝트 — 완성본을 가져온다

```ts
import '@bricks/core/styles';       // dist/bricks.css
// 또는
import '@bricks/core/styles/min';   // 압축본
```

Tailwind preflight + daisyUI + 테마 35종 + 토큰이 모두 들어 있습니다. 설정이 필요 없는
대신 파일이 큽니다.

### B. 이미 Tailwind + daisyUI를 쓰는 프로젝트 — 토큰만 가져온다

```css
@import 'tailwindcss';
@plugin "daisyui";
@import '@bricks/core/styles/tokens';   /* dist/bricks-tokens.css */
@source "../node_modules/@bricks/core/dist";
```

`bricks-tokens.css`에는 `@theme`이 들어 있어 **소비자 쪽 Tailwind가 필요합니다.**
컴포넌트를 함께 쓴다면 `@source`로 패키지 산출물을 스캔해야 daisyUI 클래스가 누락되지
않습니다.

---

## 테마

`[data-theme]` 속성으로 전환합니다. 기본값은 `bricks-light`입니다.

```html
<html data-theme="bricks-dark">
```

```tsx
import { ThemeController } from '@bricks/core';

document.documentElement.dataset.theme = 'bricks-dark';
```

`dist/bricks.css`에는 daisyUI 내장 테마 35종(`cupcake`, `dracula`, `nord` 등)도
포함돼 있어 같은 방식으로 지정할 수 있습니다.

색 토큰은 daisyUI 시멘틱 이름을 씁니다 — `--color-primary`, `--color-base-100/200/300`,
`--color-base-content`, `--color-info` / `success` / `warning` / `error`.

---

## 아이콘

[Lucide](https://lucide.dev/)를 SVG로 렌더링합니다. 아이콘 폰트나 별도 CSS가 필요 없습니다.

```tsx
import { Icon } from '@bricks/core';

<Icon name="house" size={20} />
```

갤러리의 `DOI-C-ICON` 페이지에서 이름을 검색하고 코드를 복사할 수 있습니다.

---

## 프레임워크별 설정

### Vite

```ts
// vite.config.ts
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({ plugins: [react(), tailwindcss()] });
```

```ts
// main.tsx
import '@bricks/core/styles';
```

### Next.js (App Router)

```tsx
// app/layout.tsx
import '@bricks/core/styles';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" data-theme="bricks-light">
      <body>{children}</body>
    </html>
  );
}
```

상호작용이 있는 컴포넌트는 클라이언트 컴포넌트에서 씁니다.
`packages/bricks/src/next/`에 서버/클라이언트 예제가 있습니다.

---

## 컴포넌트 예제

### Button

```tsx
import { Button } from '@bricks/core';

<Button color="primary" size="md">확인</Button>
<Button color="error" variant="outline">삭제</Button>
<Button variant="ghost" shape="circle"><Icon name="x" size={16} /></Button>
```

`color`: `neutral | primary | secondary | accent | info | success | warning | error`
`variant`: `solid | surface | outline | dash | soft | ghost | link`
`size`: `xs | sm | md | lg | xl` · `shape`: `square | circle`

### Card (복합 컴포넌트)

```tsx
import { Card, Button } from '@bricks/core';

<Card>
  <Card.Header>
    <Card.Title>카드 제목</Card.Title>
  </Card.Header>
  <Card.Body>본문</Card.Body>
  <Card.Actions>
    <Button color="primary">확인</Button>
  </Card.Actions>
</Card>
```

서브 컴포넌트: `Card.Figure` · `Card.Header` · `Card.Body` · `Card.Title` ·
`Card.Actions` · `Card.Footer`.

### Modal

네이티브 `<dialog>` 기반이라 포커스 트랩과 Escape가 브라우저에서 동작합니다.

```tsx
import { Modal, Button } from '@bricks/core';

const [open, setOpen] = useState(false);

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="삭제할까요?"
  footer={<Button color="error" onClick={remove}>삭제</Button>}
>
  되돌릴 수 없습니다.
</Modal>
```

주요 prop: `open` · `size` · `placement` · `title` · `header` · `footer` ·
`closable` · `staticBackdrop` · `disableEscapeKeyDown` · `onClose` · `onOpen`.

---

전체 컴포넌트와 변형은 갤러리에서 확인하세요.

```bash
npm run gallery   # http://localhost:5180/
```

props 인터페이스는 모두 export되어 있어 타입으로 가져다 쓸 수 있습니다.
