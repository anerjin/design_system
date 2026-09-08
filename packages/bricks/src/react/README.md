# DOI INC Design System - React Components

이 디렉토리는 DOI INC 디자인 시스템의 React 컴포넌트들을 포함합니다.

## 🎯 개요

기존 TypeScript 컴포넌트와 CSS 스타일을 기반으로 제작된 React 컴포넌트 라이브러리입니다. 모든 컴포넌트는 DOI INC CSS 클래스를 사용하여 일관된 스타일링을 제공합니다.

## 📦 컴포넌트 목록

### Form Components
- **Input** (`Input.tsx`) - 텍스트 입력 필드와 텍스트 영역
- **Checkbox** (`Checkbox.tsx`) - 체크박스와 체크박스 그룹
- **Radio** (`Radio.tsx`) - 라디오 버튼과 라디오 그룹
- **Toggle** (`Toggle.tsx`) - 토글 스위치
- **Select** (`Select.tsx`) - 선택 드롭다운

### Layout Components
- **Card** (`Card.tsx`) - 카드 컨테이너와 서브 컴포넌트
- **Modal** (`Modal.tsx`) - 모달 다이얼로그

### Feedback Components
- **Alert** (`Alert.tsx`) - 알림/토스트 컴포넌트

### Data Display Components
- **Badge** (`Badge.tsx`) - 뱃지, 레이블, 태그, 칩 컴포넌트
- **Tabs** (`Tabs.tsx`) - 탭 네비게이션

### Interactive Components
- **Button** (`Button.tsx`) - 버튼 컴포넌트 (기존)

## 🚀 사용법

```tsx
import { Input, Button, Card, Alert } from './src/react';

// 또는 개별 import
import { Input } from './src/react/Input';
import { Card } from './src/react/Card';
```

## ✨ 주요 특징

### 1. TypeScript 지원
모든 컴포넌트는 완전한 TypeScript 지원을 제공합니다.

```tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  state?: 'success' | 'warning' | 'error';
  // ...
}
```

### 2. 접근성 (Accessibility)
- ARIA 속성 자동 설정
- 키보드 네비게이션 지원
- 스크린 리더 친화적

### 3. 제어/비제어 컴포넌트
대부분의 form 컴포넌트는 제어 및 비제어 모드를 모두 지원합니다.

```tsx
// 제어 컴포넌트
<Toggle checked={isEnabled} onChange={setIsEnabled} />

// 비제어 컴포넌트
<Toggle defaultChecked={true} />
```

### 4. Compound Component 패턴
복잡한 컴포넌트는 서브 컴포넌트를 제공합니다.

```tsx
<Card>
  <Card.Header>
    <Card.Title>제목</Card.Title>
  </Card.Header>
  <Card.Body>내용</Card.Body>
  <Card.Footer>
    <Card.Actions>액션 버튼들</Card.Actions>
  </Card.Footer>
</Card>
```

### 5. 일관된 API
모든 컴포넌트는 일관된 prop 네이밍과 구조를 따릅니다.

```tsx
// 공통 패턴
size?: 'sm' | 'md' | 'lg'
variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'
disabled?: boolean
className?: string
```

## 🎨 스타일링

컴포넌트들은 `core/styles/` 디렉토리의 DOI INC CSS 클래스를 사용합니다:

- `atoms/` - 기본 컴포넌트 스타일
- `molecules/` - 복합 컴포넌트 스타일

## 📝 예제

### 기본 Form
```tsx
<form>
  <Input
    label="이름"
    placeholder="이름을 입력하세요"
    required
  />

  <CheckboxGroup label="관심 분야">
    <Checkbox label="Frontend" value="frontend" />
    <Checkbox label="Backend" value="backend" />
  </CheckboxGroup>

  <RadioGroup name="theme" label="테마">
    <Radio value="light" label="라이트" />
    <Radio value="dark" label="다크" />
  </RadioGroup>

  <Button type="submit" variant="primary">
    제출
  </Button>
</form>
```

### 알림 시스템
```tsx
<Alert
  variant="success"
  title="성공"
  description="작업이 완료되었습니다."
  dismissible
  autoClose={5000}
/>
```

### 데이터 표시
```tsx
<Card variant="elevated">
  <Card.Header>
    <Card.Title>사용자 정보</Card.Title>
    <Card.Badge position="right">
      <Badge variant="primary">NEW</Badge>
    </Card.Badge>
  </Card.Header>
  <Card.Body>
    <p>사용자 세부 정보...</p>
  </Card.Body>
</Card>
```

## 🔧 개발 가이드

### 새 컴포넌트 추가 시
1. 기존 CSS 클래스 확인
2. TypeScript 인터페이스 정의
3. 접근성 고려사항 구현
4. forwardRef 패턴 사용
5. 적절한 이벤트 핸들러 제공

### 네이밍 규칙
- 컴포넌트: PascalCase (`Button`, `CardHeader`)
- Props: camelCase (`variant`, `onClick`)
- CSS 클래스: BEM + kebab-case (`card__header--dense`)