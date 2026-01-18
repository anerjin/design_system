# Showcase 컴포넌트 작성 가이드

## 개요

Showcase 앱에서 새로운 컴포넌트를 만들 때 따라야 하는 구조와 규칙입니다.

**핵심 원칙:**
- **BRICKS UI 컴포넌트**: 기본 UI 요소 (`Button`, `Input`, `Select` 등)는 `@bricks/core/bundle`에서 import
- **레이아웃 스타일**: 컴포넌트 배치/구성을 위한 CSS는 각 컴포넌트 폴더 내에 별도 파일로 관리

---

## 폴더 구조

```
apps/showcase/app/components/ui/{component-name}/
├── config.ts                    # 컴포넌트 메타데이터 설정
├── {component-name}.css         # 레이아웃/구성 스타일
├── page.tsx                     # 페이지 컴포넌트
└── examples/
    └── {component-name}.example.tsx  # 실제 구현 컴포넌트
```

---

## 파일별 작성 방법

### 1. `config.ts` - 컴포넌트 설정

```typescript
// {component-name} Component Configuration

export const config = {
  key: '{component-name}',           // URL 경로에 사용되는 키 (kebab-case)
  name: '{Component Name}',          // 표시 이름
  category: 'ui',                    // 카테고리: 'ui' | 'blocks'
  description: '컴포넌트 설명',
  variants: [
    {
      key: 'default',                // variant 키
      label: 'Default',              // variant 표시 이름
      description: 'variant 설명',
      tags: ['React', 'Tag1', 'Tag2'],
      preview: '/previews/{component-name}-default.png',
    },
    // 추가 variants...
  ],
};

export default config;
```

### 2. `{component-name}.css` - 레이아웃 스타일

BRICKS 디자인 토큰을 활용하여 레이아웃/구성 스타일만 정의합니다.

```css
/* {Component Name} Component Styles */

/* 컨테이너 */
.{component-name} {
  display: flex;
  flex-direction: column;
  gap: var(--ds-space-4);
  padding: var(--ds-space-4);
  background: var(--ds-white);
  border-radius: var(--ds-radius-lg);
}

/* 하위 요소들 - BEM 네이밍 사용 */
.{component-name}__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.{component-name}__title {
  margin: 0;
  font-size: var(--ds-text-lg);
  font-weight: var(--ds-font-semibold);
  color: var(--ds-text-primary);
}

.{component-name}__content {
  /* ... */
}

/* 반응형 */
@media (max-width: 768px) {
  .{component-name}__content {
    flex-direction: column;
  }
}
```

**스타일 작성 규칙:**
- BRICKS 디자인 토큰 사용 (`var(--ds-*)`)
- BEM 네이밍 컨벤션 (`block__element--modifier`)
- 기본 UI 요소(버튼, 인풋 등) 스타일은 BRICKS에 위임
- 레이아웃, 간격, 배치 관련 스타일만 정의

### 3. `examples/{component-name}.example.tsx` - 구현 컴포넌트

```tsx
'use client';

import { useState } from 'react';
import { Button, Input, Select, Icon } from '@bricks/core/bundle';
import '../{component-name}.css';

export default function {ComponentName}Example() {
  const [state, setState] = useState('');

  return (
    <div className="{component-name}">
      <div className="{component-name}__header">
        <h2 className="{component-name}__title">Title</h2>
        <Button variant="primary" size="sm">
          Action
        </Button>
      </div>

      <div className="{component-name}__content">
        <Input
          placeholder="Search..."
          value={state}
          onChange={(e) => setState(e.target.value)}
          leftIcon={<Icon name="search" size={18} />}
          size="sm"
        />
        {/* ... */}
      </div>
    </div>
  );
}
```

**컴포넌트 작성 규칙:**
- `'use client'` 디렉티브 필수 (상태 관리 시)
- BRICKS 컴포넌트를 `@bricks/core/bundle`에서 import
- 로컬 CSS 파일 import (`'../{component-name}.css'`)
- 의미 있는 상태 관리와 이벤트 핸들링 구현

### 4. `page.tsx` - 페이지 컴포넌트

```tsx
'use client';

import {ComponentName}Example from './examples/{component-name}.example';

export default function {ComponentName}Page() {
  return (
    <div style={{ padding: '24px', maxWidth: '900px', margin: '0 auto' }}>
      <{ComponentName}Example />
    </div>
  );
}
```

---

## components.ts에 등록

새 컴포넌트를 만들면 `app/config/components.ts`에 등록해야 합니다.

```typescript
// 상단에 import 추가
import {componentName}Config from '../components/ui/{component-name}/config';

// components 배열에 추가
export const components: ComponentConfig[] = [
  buildComponentConfig(formsConfig, 'ui'),
  buildComponentConfig({componentName}Config, 'ui'),  // 추가
];
```

---

## 사용 가능한 BRICKS UI 컴포넌트

```tsx
import {
  // Form Elements
  Input,
  Select,
  Checkbox,
  Radio,
  Toggle,
  DatePicker,

  // Buttons
  Button,

  // Display
  Card,
  Badge,
  Avatar,
  Icon,
  Typography,

  // Feedback
  Alert,
  Modal,
  Spinner,
  Progress,

  // Navigation
  Tabs,
  Breadcrumb,
  Pagination,
  Navbar,

  // Data
  Table,
  Accordion,

  // Layout
  Dropdown,
} from '@bricks/core/bundle';
```

---

## BRICKS 디자인 토큰 참조

### 색상
```css
var(--ds-white)
var(--ds-black)
var(--ds-gray-50) ~ var(--ds-gray-900)
var(--ds-prime)
var(--ds-text-primary)
var(--ds-text-secondary)
var(--ds-color-success)
var(--ds-color-warning)
var(--ds-color-danger)
var(--ds-color-info)
```

### 간격
```css
var(--ds-space-1) ~ var(--ds-space-12)
```

### 크기
```css
var(--ds-height-xs)
var(--ds-height-sm)
var(--ds-height-md)
var(--ds-height-lg)
var(--ds-height-xl)
```

### 테두리
```css
var(--ds-radius-sm)
var(--ds-radius-md)
var(--ds-radius-lg)
var(--ds-radius-xl)
var(--ds-radius-full)
```

### 그림자
```css
var(--ds-shadow-xs)
var(--ds-shadow-sm)
var(--ds-shadow-md)
var(--ds-shadow-lg)
```

### 타이포그래피
```css
var(--ds-text-xs)
var(--ds-text-sm)
var(--ds-text-base)
var(--ds-text-lg)
var(--ds-text-xl)
var(--ds-font-sans)
var(--ds-font-semibold)
```

### 트랜지션
```css
var(--ds-transition-all)
var(--ds-duration-200)
```

---

## 예시: Filter Bar 컴포넌트

실제 구현 예시는 다음 파일들을 참조하세요:

- `app/components/ui/filter-bar/config.ts`
- `app/components/ui/filter-bar/filter-bar.css`
- `app/components/ui/filter-bar/examples/filter-bar.example.tsx`
- `app/components/ui/filter-bar/page.tsx`
