# Shuriken UI 디자인 시스템 분석

## 개요

Shuriken UI는 Tailwind CSS v4와 Nuxt.js 기반의 현대적인 컴포넌트 라이브러리입니다. 접근성, 커스터마이징, 일관된 디자인 언어를 중심으로 구축되었습니다.

## 색상 시스템 (Color System)

### 주요 색상 팔레트 (Primary Palette)

Shuriken UI는 Violet을 기본 브랜드 색상으로 사용합니다:

```css
/* Primary - Violet */
--color-primary-50: #f5f3ff;
--color-primary-100: #ede9fe;
--color-primary-200: #ddd6fe;
--color-primary-300: #c4b5fd;
--color-primary-400: #a78bfa;
--color-primary-500: #8b5cf6; /* 기본값 */
--color-primary-600: #7c3aed;
--color-primary-700: #6d28d9;
--color-primary-800: #5b21b6;
--color-primary-900: #4c1d95;
--color-primary-950: #2e1065;
```

### 중립 색상 (Neutral/Muted Colors)

배경, 테두리, 텍스트에 사용되는 Slate 색상:

```css
/* Muted - Slate */
--color-muted-50: #f8fafc;
--color-muted-100: #f1f5f9;
--color-muted-200: #e2e8f0;
--color-muted-300: #cbd5e1;
--color-muted-400: #94a3b8;
--color-muted-500: #64748b; /* 기본값 */
--color-muted-600: #475569;
--color-muted-700: #334155;
--color-muted-800: #1e293b;
--color-muted-900: #0f172a;
--color-muted-950: #020617;
```

### 시맨틱 색상 (Semantic Colors)

#### 정보 (Info) - Sky
```css
--color-info-500: #0ea5e9; /* 기본값 */
/* sky-50 (#f0f9ff) ~ sky-950 (#082f49) */
```

#### 성공 (Success) - Teal
```css
--color-success-500: #14b8a6; /* 기본값 */
/* teal-50 (#f0fdfa) ~ teal-950 (#042f2e) */
```

#### 경고 (Warning) - Amber
```css
--color-warning-500: #f59e0b; /* 기본값 */
/* amber-50 (#fffbeb) ~ amber-950 (#451a03) */
```

#### 위험/오류 (Danger/Destructive) - Rose
```css
--color-danger-500: #f43f5e; /* 기본값 */
/* rose-50 (#fff1f2) ~ rose-950 (#4c0519) */
```

## 타이포그래피 시스템 (Typography)

### 폰트 패밀리
```css
--font-sans: system-ui, -apple-system, sans-serif;
--font-heading: var(--font-sans);
--font-alt: var(--font-sans);
--font-mono: 'Courier New', monospace;
```

### 텍스트 크기 및 굵기

#### 제목 (Headings)
- **H1**: `font-weight: 700` (Bold)
- **H2**: `font-weight: 700` (Bold)
- **H3**: `font-weight: 500` (Medium)
- **H4**: `font-weight: 500` (Medium)

#### 본문 텍스트
- **리스트**: `font-size: 1.15rem`, `padding: 0.35rem 0`
- **강조**: `font-size: 1.1rem`, `line-height: 1`
- **인용구**: `font-size: 1.1rem`, `line-height: 1.4`, `font-weight: 500`
- **코드**: `font-size: 0.95rem`, `font-weight: 600`, `padding: 0.35rem`

## 간격 시스템 (Spacing Scale)

4px 단위의 일관된 간격 시스템:

```css
--spacing-1: 4px;    /* 0.25rem */
--spacing-2: 8px;    /* 0.5rem */
--spacing-3: 12px;   /* 0.75rem */
--spacing-4: 16px;   /* 1rem */
--spacing-5: 20px;   /* 1.25rem */
--spacing-6: 24px;   /* 1.5rem */
--spacing-8: 32px;   /* 2rem */
--spacing-10: 40px;  /* 2.5rem */
--spacing-12: 48px;  /* 3rem */
--spacing-16: 64px;  /* 4rem */
--spacing-20: 80px;  /* 5rem */
--spacing-24: 96px;  /* 6rem */
```

### 컴포넌트별 간격

#### 버튼 크기
- **Small (sm)**: 높이 32px, 패딩 8px 12px
- **Medium (md)**: 높이 40px, 패딩 8px 16px
- **Large (lg)**: 높이 48px, 패딩 8px 24px
- **Extra Large (xl)**: 높이 56px, 패딩 16px 40px

## 모서리 둥글기 (Border Radius)

```css
--radius-none: 0;
--radius-sm: 2px;     /* 0.125rem */
--radius: 4px;        /* 0.25rem - 기본값 */
--radius-md: 6px;     /* 0.375rem */
--radius-lg: 8px;     /* 0.5rem */
--radius-xl: 12px;    /* 0.75rem */
--radius-2xl: 16px;   /* 1rem */
--radius-3xl: 24px;   /* 1.5rem */
--radius-full: 9999px;
```

## 그림자 시스템 (Shadow System)

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
--shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
```

## 컴포넌트 스타일 패턴

### 버튼 변형 (Button Variants)

1. **default**: 중립 색상 테두리와 배경
2. **primary**: Primary 색상 배경에 흰색 텍스트
3. **muted**: 연한 배경에 중립 색상
4. **ghost**: 투명 배경, 호버 효과
5. **destructive**: Rose 색상 배경 (위험/삭제 액션)
6. **dark**: 다크/라이트 모드 반전 색상
7. **link**: 텍스트 기반, 호버시 밑줄

### 입력 필드 스타일

- 기본 높이: 40px
- 테두리: 1px solid muted-300
- 포커스: primary-500 테두리
- 배경: 흰색 (다크모드: muted-900)
- 패딩: 12px 16px
- 폰트 크기: 14px

### 카드 컴포넌트

- 배경: 흰색 (다크모드: muted-800)
- 테두리: 1px solid muted-200
- 그림자: shadow-md
- 패딩: 24px
- 모서리: radius-lg (8px)

## 애니메이션 & 트랜지션

### 기본 트랜지션
```css
--transition-duration: 300ms;
--transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
```

### 상태별 효과
- **Disabled**: opacity 60%
- **Hover**: 그림자 변화, 색상 변화
- **Loading**: 회전 스피너 애니메이션
- **Focus**: 링 효과 (1px solid)

## 반응형 브레이크포인트

```css
--breakpoint-xs: 0px;      /* 모바일 */
--breakpoint-sm: 640px;    /* 큰 모바일 */
--breakpoint-md: 768px;    /* 태블릿 */
--breakpoint-lg: 1024px;   /* 데스크톱 */
--breakpoint-xl: 1280px;   /* 큰 데스크톱 */
--breakpoint-2xl: 1536px;  /* 초대형 화면 */
```

### 특수 브레이크포인트
- **태블릿 세로**: 768px-1024px (portrait)
- **태블릿 가로**: 768px-1024px (landscape)

## 접근성 & 포커스

### 포커스 링
```css
.focus-ring {
  outline: none;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.5);
  border-color: var(--color-primary-500);
}
```

### 다크 모드
- `.dark` 클래스를 통한 수동 제어
- 시스템 설정 자동 감지 지원
- 모든 컴포넌트의 다크 테마 변형 제공

## 레이아웃 원칙

### 컨테이너
```css
--container-xs: 475px;
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;
```

### 그리드 시스템
- 12 컬럼 그리드
- 갭: 16px (기본), 24px (lg), 32px (xl)
- 반응형 컬럼 조정

## 디자인 원칙

1. **일관성**: 모든 컴포넌트에서 동일한 디자인 토큰 사용
2. **접근성**: WCAG 2.1 AA 기준 준수
3. **커스터마이징**: CSS 변수를 통한 쉬운 테마 변경
4. **성능**: "Less JS, more CSS" 접근 방식
5. **모듈성**: 독립적이고 재사용 가능한 컴포넌트
6. **반응형**: 모바일 우선 접근 방식

## 구현 특징

- **57개 컴포넌트**: 포괄적인 컴포넌트 라이브러리
- **TypeScript 지원**: 강력한 타입 지원
- **프레임워크 독립적**: 핵심은 프레임워크 중립적
- **Nuxt.js 최적화**: Nuxt.js와의 완벽한 통합
- **테마 시스템**: CSS 변수 기반 중앙 집중식 테마 관리

## 적용 가이드

### 색상 적용
```css
/* Primary 색상 사용 */
.element {
  background-color: var(--color-primary-500);
  color: white;
}

/* 호버 상태 */
.element:hover {
  background-color: var(--color-primary-600);
}
```

### 간격 적용
```css
/* 일관된 간격 사용 */
.container {
  padding: var(--spacing-6); /* 24px */
  margin-bottom: var(--spacing-4); /* 16px */
}
```

### 그림자 적용
```css
/* 카드 컴포넌트 */
.card {
  box-shadow: var(--shadow-md);
}

.card:hover {
  box-shadow: var(--shadow-lg);
}
```

### 반응형 디자인
```css
/* 모바일 우선 접근 */
.element {
  padding: var(--spacing-4);
}

@media (min-width: 768px) {
  .element {
    padding: var(--spacing-6);
  }
}

@media (min-width: 1024px) {
  .element {
    padding: var(--spacing-8);
  }
}
```

## 참고 사항

- 모든 색상 값은 CSS 변수로 정의하여 테마 변경 용이
- 간격은 4px 배수로 일관성 유지
- 컴포넌트별 특성을 고려한 적절한 그림자 사용
- 다크 모드를 항상 고려한 디자인 구현
- 접근성을 위한 충분한 색상 대비 유지