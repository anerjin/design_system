# BRICKS Design System 사용 가이드

`@bricks/core` 를 다른 프로젝트에서 사용하는 방법을 정리한 문서입니다.
저장소 구조와 개발 명령은 [README.md](./README.md) 를 참고하세요.

---

## 목차

- [설치 방법](#설치-방법)
- [기본 설정](#기본-설정)
- [컴포넌트 예제](#컴포넌트-예제)
- [CSS 만 사용하기](#css-만-사용하기)
- [디자인 토큰](#디자인-토큰)
- [다크 모드](#다크-모드)
- [TypeScript](#typescript)
- [문제 해결](#문제-해결)

---

## 설치 방법

이 패키지는 아직 npm 레지스트리에 배포되어 있지 않습니다. 아래 네 가지 중 상황에 맞는 방법을 선택하세요.

### 1. 로컬 tarball (권장 — 팀 내부 공유)

```bash
# 디자인 시스템 저장소에서
cd packages/bricks
npm run build:all
npm pack                    # bricks-core-1.0.0.tgz 생성

# 사용할 프로젝트에서
npm install ../private_project_design_system/packages/bricks/bricks-core-1.0.0.tgz
```

### 2. npm link (디자인 시스템을 함께 개발할 때)

```bash
# 디자인 시스템 저장소에서
cd packages/bricks
npm run build:all
npm link

# 사용할 프로젝트에서
npm link @bricks/core
```

소스 변경을 실시간으로 반영하려면 `npx tsc -p tsconfig.lib.json --watch` 를 함께 띄워두세요.
`npm run watch` 는 `dist/` 가 아니라 `core/scripts/` 로 출력하므로 이 용도에는 맞지 않습니다.

### 3. Git 서브모듈

```bash
git submodule add https://github.com/anerjin/private_project_design_system.git libs/bricks
```

```tsx
import { Button } from './libs/bricks/packages/bricks/src/react/Button';
import './libs/bricks/packages/bricks/core/styles/bundle.css';
```

### 4. npm 배포

공개 배포하려면 `packages/bricks/package.json` 의 `name` 을 실제 스코프로 바꾼 뒤:

```bash
cd packages/bricks
npm run build:all
npm publish --access public
```

> 이 저장소는 모노레포 루트이고 패키지는 `packages/bricks` 하위에 있습니다.
> `github:` 프로토콜로 바로 설치하려면 `packages/bricks` 를 별도 저장소로 분리해야 합니다.

---

## 기본 설정

### CSS 임포트

빌드 도구에 따라 세 가지 진입점 중 하나를 고르면 됩니다.

```tsx
// 1. @import 기반 (번들러가 CSS @import 를 처리할 때)
import '@bricks/core/styles';

// 2. 단일 파일로 합쳐진 버전
import '@bricks/core/styles/bundle';

// 3. 압축본 (프로덕션)
import '@bricks/core/styles/bundle.min';
```

필요한 부분만 쓰고 싶다면 개별 파일을 임포트합니다.

```tsx
import '@bricks/core/styles/base/reset.css';
import '@bricks/core/styles/tokens/colors.css';
import '@bricks/core/styles/atoms/button.css';
```

### 아이콘

`Icon` 컴포넌트와 버튼 아이콘은 [boxicons](https://boxicons.com/) 클래스명을 사용합니다.

```bash
npm install boxicons
```

```tsx
import 'boxicons/css/boxicons.min.css';
```

### Next.js (App Router)

```tsx
// app/layout.tsx
import '@bricks/core/styles/bundle';
import 'boxicons/css/boxicons.min.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
```

컴포넌트 대부분이 `useState` 등 클라이언트 훅을 사용하므로, 사용하는 파일 최상단에
`'use client'` 를 선언하세요. `packages/bricks/src/next/` 에 서버/클라이언트 래핑 예제가 있습니다.

`node_modules` 안의 소스를 트랜스파일해야 하는 경우:

```js
// next.config.js
module.exports = {
  transpilePackages: ['@bricks/core'],
};
```

### Vite / CRA

```tsx
// main.tsx
import '@bricks/core/styles/bundle';
import 'boxicons/css/boxicons.min.css';
```

---

## 컴포넌트 예제

### Button

```tsx
import { Button } from '@bricks/core';

<Button variant="primary">Primary</Button>
<Button variant="outline-danger" size="lg">Large Outline</Button>
<Button variant="secondary" leftIcon={<i className="bx bx-download" />}>다운로드</Button>
<Button variant="primary" loading>저장 중</Button>
<Button variant="primary" pill fullWidth>Pill</Button>
```

- `variant`: `primary | secondary | success | danger | warning | info | light | dark | link | ghost | outline-primary | outline-secondary | outline-success | outline-danger`
- `size`: `xs | sm | md | lg | xl`
- 그 외: `fullWidth`, `loading`, `iconOnly`, `pill`, `rounded`, `leftIcon`, `rightIcon`

### Card (복합 컴포넌트)

```tsx
import { Card, Badge, Button } from '@bricks/core';

<Card variant="elevated">
  <Card.Header>
    <Card.Title>사용자 정보</Card.Title>
    <Card.Subtitle>최근 업데이트 2일 전</Card.Subtitle>
  </Card.Header>
  <Card.Body>
    <p>본문 내용</p>
    <Badge variant="primary">NEW</Badge>
  </Card.Body>
  <Card.Footer>
    <Card.Actions>
      <Button variant="secondary">취소</Button>
      <Button variant="primary">저장</Button>
    </Card.Actions>
  </Card.Footer>
</Card>
```

### Modal

```tsx
import { Modal, Button } from '@bricks/core';
import { useState } from 'react';

function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>열기</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="제목"
        size="md"
        centered
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>취소</Button>
            <Button variant="primary">확인</Button>
          </>
        }
      >
        내용
      </Modal>
    </>
  );
}
```

`Card` 와 달리 `Modal` 은 서브 컴포넌트를 붙이지 않습니다. 헤더/푸터는 `title`, `header`,
`footer` prop 으로 넘기세요. (`ModalHeader` / `ModalTitle` / `ModalBody` / `ModalFooter` 가
모듈 안에 존재하긴 하지만 `@bricks/core` 최상위로 재export 되어 있지 않습니다.)

### Form

```tsx
import { Input, Select, Checkbox, Radio, RadioGroup, Toggle, DatePicker } from '@bricks/core';

<Input placeholder="이름을 입력하세요" required />
<Input placeholder="이메일" state="error" leftIcon={<i className="bx bx-envelope" />} />

<Select
  placeholder="국가를 선택하세요"
  options={[
    { value: 'kr', label: '대한민국' },
    { value: 'us', label: 'United States' },
  ]}
/>

<Checkbox label="약관에 동의합니다" />

<RadioGroup name="theme" label="테마">
  <Radio value="light" label="라이트" />
  <Radio value="dark" label="다크" />
</RadioGroup>

<Toggle checked={enabled} onChange={setEnabled} />
<DatePicker value={date} onChange={setDate} clearable />
```

`Input` 과 `Select` 에는 `label` prop 이 없습니다. 라벨이 필요하면 `<label>` 을 직접 작성하고
`htmlFor` 로 연결하세요. `Checkbox`, `Radio`, `RadioGroup`, `CheckboxGroup` 은 `label` 을 지원합니다.

### Table

```tsx
import { Table } from '@bricks/core';

<Table
  columns={[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email' },
    { key: 'status', label: 'Status' },
  ]}
  data={[
    { name: 'John Doe', email: 'john@example.com', status: 'active' },
    { name: 'Jane Smith', email: 'jane@example.com', status: 'active' },
  ]}
/>
```

### Alert / Toast

```tsx
import { Alert, toast } from '@bricks/core';

<Alert variant="success" title="성공" description="작업이 완료되었습니다." dismissible />
```

전체 컴포넌트와 모든 변형은 Storybook 에서 확인하세요.

```bash
npm run storybook   # http://localhost:6006
```

> `Tooltip` 은 현재 `@bricks/core` 최상위 export 에 포함되어 있지 않습니다.
> 필요하면 `packages/bricks/src/react/Tooltip` 에서 직접 임포트하세요.

---

## CSS 만 사용하기

React 없이 순수 HTML/CSS 로도 쓸 수 있습니다. 클래스명은 BEM 규칙을 따릅니다.

```html
<link rel="stylesheet" href="node_modules/@bricks/core/core/styles/bundle.min.css">
<link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet">

<button class="btn btn--primary btn--md">확인</button>
<span class="badge badge--success">완료</span>
<div class="card card--elevated">
  <div class="card__header"><h3 class="card__title">제목</h3></div>
  <div class="card__body">내용</div>
</div>
```

아코디언·모달·탭처럼 동작이 필요한 컴포넌트는 `html_markup/assets/js/components.js` 가
`data-*` 속성 기반으로 자동 초기화합니다. 마크업 예시는 `html_markup/` 문서 사이트에서
확인할 수 있습니다.

---

## 디자인 토큰

모든 토큰은 `--ds-` 접두사를 가진 CSS 변수입니다.

```css
.my-component {
  /* Colors */
  color: var(--ds-gray-900);
  background: var(--ds-gray-50);
  border-color: var(--ds-gray-300);

  /* Spacing */
  padding: var(--ds-space-4);
  margin-bottom: var(--ds-space-8);

  /* Border */
  border-width: var(--ds-border-width-1);
  border-radius: var(--ds-radius-md);

  /* Shadow */
  box-shadow: var(--ds-shadow-md);

  /* Typography */
  font-size: var(--ds-font-size-base);
  font-weight: var(--ds-font-weight-medium);
  line-height: var(--ds-line-height-normal);
}
```

| 그룹 | 정의 파일 | 예시 |
|------|-----------|------|
| Colors | `tokens/colors.css` | `--ds-prime`, `--ds-black`, `--ds-white`, `--ds-gray-0` ~ `--ds-gray-900` |
| Typography | `tokens/typography.css` | `--ds-font-size-*`, `--ds-font-weight-*`, `--ds-line-height-*` |
| Spacing | `tokens/spacing.css` | `--ds-space-0`, `--ds-space-px`, `--ds-space-0-5`, `--ds-space-1` … |
| Shadows | `tokens/shadows.css` | `--ds-shadow-sm` ~ `--ds-shadow-xl` |
| Borders | `tokens/borders.css` | `--ds-radius-*`, `--ds-border-width-*` |

Storybook 의 **Foundation** 카테고리에서 실제 값을 눈으로 확인할 수 있습니다.

---

## 다크 모드

루트 요소에 `data-theme="dark"` 를 설정하면 토큰 값이 다크 팔레트로 교체됩니다.

```html
<html data-theme="dark">
```

```js
document.documentElement.setAttribute('data-theme', 'dark');
```

컴포넌트별 추가 작업은 필요 없습니다. 모든 스타일이 토큰을 참조하기 때문입니다.

---

## TypeScript

모든 컴포넌트의 props 인터페이스가 함께 배포됩니다.

```tsx
import type { ButtonProps, ModalProps, TableColumn } from '@bricks/core';

const props: ButtonProps = {
  variant: 'primary',
  size: 'md',
  onClick: () => console.log('clicked'),
};
```

`tsconfig.json` 에 `"jsx": "react-jsx"` 가 설정되어 있어야 합니다.

---

## 문제 해결

**CSS 가 적용되지 않음**
`@bricks/core/styles` 는 `@import` 기반입니다. 번들러가 CSS `@import` 를 따라가지 못하면
단일 파일인 `@bricks/core/styles/bundle` 을 사용하세요.

**아이콘이 네모로 보임**
boxicons 스타일시트가 로드되지 않았습니다.

**Next.js 에서 hydration 오류**
컴포넌트를 쓰는 파일 최상단에 `'use client'` 를 추가하세요.

**스타일이 앱 CSS 에 덮어써짐**
BRICKS CSS 를 앱 CSS 보다 먼저 임포트하고, 오버라이드는 더 구체적인 선택자로 작성하세요.

**`@bricks/core` 를 찾을 수 없음**
`npm run build:all` 로 `dist/` 를 먼저 생성했는지 확인하세요. `dist/` 는 저장소에 커밋되지 않습니다.
