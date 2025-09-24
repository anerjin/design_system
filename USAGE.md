# BRICKS Design System 사용 가이드

## 실제 프로젝트에서 사용하는 방법

### 방법 1: npm 패키지로 배포하여 사용 (권장)

#### 1. npm에 패키지 배포
```bash
# 1. npm 로그인
npm login

# 2. 패키지 빌드
npm run build

# 3. npm에 배포
npm publish
```

#### 2. 다른 프로젝트에서 설치
```bash
npm install @yourusername/bricks-design-system
```

#### 3. 프로젝트에서 사용
```tsx
// CSS 임포트 (필수)
import '@yourusername/bricks-design-system/dist/css/index.css';

// React 컴포넌트 임포트
import { Button, Card, Modal } from '@yourusername/bricks-design-system';

function App() {
  return (
    <Card>
      <Button variant="primary">Click me</Button>
    </Card>
  );
}
```

### 방법 2: 로컬 패키지로 연결 (개발 중)

#### 1. 디자인 시스템 빌드
```bash
# 디자인 시스템 프로젝트에서
npm run build
npm link
```

#### 2. 사용할 프로젝트에서 연결
```bash
# 사용할 프로젝트에서
npm link @yourusername/bricks-design-system
```

### 방법 3: GitHub 패키지로 설치

#### 1. package.json에 추가
```json
{
  "dependencies": {
    "@yourusername/bricks-design-system": "github:yourusername/private_project_design_system"
  }
}
```

#### 2. 설치
```bash
npm install
```

### 방법 4: 직접 파일 복사 (간단한 방법)

#### 1. 필요한 파일 복사
- `dist/` 폴더를 프로젝트로 복사
- `src/css/` 폴더를 프로젝트로 복사

#### 2. 프로젝트에서 임포트
```tsx
// CSS 임포트
import './bricks/css/index.css';

// 컴포넌트 임포트
import Button from './bricks/react/Button';
```

## 사용 예제

### React 프로젝트 설정

#### 1. 기본 설정
```tsx
// App.tsx 또는 index.tsx
import '@yourusername/bricks-design-system/dist/css/index.css';
import { ThemeProvider } from '@yourusername/bricks-design-system';

function App() {
  return (
    <ThemeProvider>
      {/* 앱 컴포넌트 */}
    </ThemeProvider>
  );
}
```

#### 2. 컴포넌트 사용 예제

##### Button
```tsx
import { Button } from '@yourusername/bricks-design-system';

function MyComponent() {
  return (
    <>
      <Button variant="primary">Primary Button</Button>
      <Button variant="secondary" size="lg">Large Button</Button>
      <Button variant="danger" disabled>Disabled Button</Button>
    </>
  );
}
```

##### Modal
```tsx
import { Modal, Button } from '@yourusername/bricks-design-system';
import { useState } from 'react';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Header>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Modal content goes here</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary">Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
```

##### Form Components
```tsx
import { Input, Select, Checkbox, DatePicker } from '@yourusername/bricks-design-system';
import { useState } from 'react';

function MyForm() {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    agree: false,
    date: null
  });

  return (
    <form>
      <Input
        label="Name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        placeholder="Enter your name"
      />

      <Select
        label="Country"
        value={formData.country}
        onChange={(e) => setFormData({...formData, country: e.target.value})}
        options={[
          { value: 'us', label: 'United States' },
          { value: 'kr', label: 'South Korea' },
          { value: 'jp', label: 'Japan' }
        ]}
      />

      <Checkbox
        label="I agree to terms"
        checked={formData.agree}
        onChange={(e) => setFormData({...formData, agree: e.target.checked})}
      />

      <DatePicker
        value={formData.date}
        onChange={(date) => setFormData({...formData, date})}
        placeholder="Select date"
      />
    </form>
  );
}
```

##### Table
```tsx
import { Table } from '@yourusername/bricks-design-system';

function MyTable() {
  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email' },
    { key: 'status', label: 'Status' }
  ];

  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' }
  ];

  return (
    <Table
      columns={columns}
      data={data}
      sortable
      selectable
      onRowClick={(row) => console.log('Clicked:', row)}
    />
  );
}
```

### Next.js 프로젝트 설정

#### 1. _app.tsx 설정
```tsx
// pages/_app.tsx
import '@yourusername/bricks-design-system/dist/css/index.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

#### 2. next.config.js 설정 (필요시)
```js
module.exports = {
  transpilePackages: ['@yourusername/bricks-design-system'],
};
```

### CSS 변수 사용

디자인 시스템의 CSS 변수를 직접 사용할 수 있습니다:

```css
.my-custom-component {
  /* Colors */
  color: var(--ds-gray-900);
  background-color: var(--ds-gray-50);

  /* Spacing */
  padding: var(--ds-space-4);
  margin-bottom: var(--ds-space-8);

  /* Border */
  border: var(--ds-border-width-1) solid var(--ds-gray-300);
  border-radius: var(--ds-radius-md);

  /* Shadow */
  box-shadow: var(--ds-shadow-md);

  /* Typography */
  font-size: var(--ds-font-size-base);
  font-weight: var(--ds-font-weight-medium);
  line-height: var(--ds-line-height-normal);
}
```

## TypeScript 지원

모든 컴포넌트는 TypeScript로 작성되어 있어 자동 타입 지원이 제공됩니다:

```tsx
import { ButtonProps, ModalProps } from '@yourusername/bricks-design-system';

// Props 타입 사용
const myButtonProps: ButtonProps = {
  variant: 'primary',
  size: 'md',
  onClick: () => console.log('clicked')
};
```

## Storybook 활용

개발 중 컴포넌트를 확인하려면 Storybook을 활용하세요:

```bash
# 디자인 시스템 프로젝트에서
npm run storybook
```

브라우저에서 http://localhost:6006 으로 접속하여 모든 컴포넌트와 문서를 확인할 수 있습니다.

## 문제 해결

### CSS가 적용되지 않는 경우
- CSS 파일이 제대로 임포트되었는지 확인
- 빌드 도구(webpack, vite 등)가 CSS를 처리하도록 설정되었는지 확인

### TypeScript 오류가 발생하는 경우
- `@types/react`가 설치되어 있는지 확인
- tsconfig.json의 `jsx` 옵션이 "react" 또는 "react-jsx"로 설정되어 있는지 확인

### 스타일이 덮어써지는 경우
- BRICKS CSS의 우선순위가 낮을 수 있습니다
- 더 구체적인 선택자를 사용하거나 CSS 모듈을 활용하세요