# BRICK Design System - Black & White Color System

## 디자인 철학
BRICK 디자인 시스템은 순수한 Black & White 컬러 팔레트를 기반으로 합니다.
미니멀하고 현대적인 디자인 언어로 명확성과 가독성을 최우선으로 합니다.

## 개발 원칙
- 모든 예제 파일에서 예제에 필요한 UI 관련 CSS는 각 파일에 작성한다.
- 단, 공통 디자인 시스템 변수와 레이아웃 스타일은 외부 CSS 파일을 참조한다.
- 페이지별 특수한 스타일은 해당 HTML 파일 내에 `<style>` 태그로 포함할 수 있다.

## Core Colors

### Primary Colors
```css
/* Pure Black & White */
--brick-black: #000000;
--brick-white: #FFFFFF;
```

### Gray Scale (11단계)
```css
/* Light Mode Base */
--brick-gray-0: #FFFFFF;    /* Pure White */
--brick-gray-50: #FAFAFA;   /* Near White */
--brick-gray-100: #F5F5F5;  /* Lightest Gray */
--brick-gray-200: #E8E8E8;  /* Lighter Gray */
--brick-gray-300: #D4D4D4;  /* Light Gray */
--brick-gray-400: #A1A1A1;  /* Medium Light Gray */
--brick-gray-500: #787878;  /* Medium Gray */
--brick-gray-600: #525252;  /* Medium Dark Gray */
--brick-gray-700: #393939;  /* Dark Gray */
--brick-gray-800: #262626;  /* Darker Gray */
--brick-gray-900: #171717;  /* Darkest Gray */
--brick-gray-950: #0A0A0A;  /* Near Black */
--brick-gray-1000: #000000; /* Pure Black */
```

## Semantic Colors

### Light Mode
```css
/* Backgrounds */
--brick-bg-primary: #FFFFFF;      /* Main background */
--brick-bg-secondary: #FAFAFA;    /* Secondary sections */
--brick-bg-tertiary: #F5F5F5;     /* Cards, surfaces */
--brick-bg-elevated: #FFFFFF;     /* Elevated surfaces */
--brick-bg-hover: #F5F5F5;        /* Hover states */
--brick-bg-active: #E8E8E8;       /* Active/pressed states */

/* Text */
--brick-text-primary: #000000;    /* Primary text */
--brick-text-secondary: #525252;  /* Secondary text */
--brick-text-tertiary: #787878;   /* Tertiary text */
--brick-text-disabled: #A1A1A1;   /* Disabled text */
--brick-text-placeholder: #A1A1A1; /* Placeholder text */
--brick-text-inverse: #FFFFFF;    /* Inverse text */

/* Borders */
--brick-border-default: #E8E8E8;  /* Default borders */
--brick-border-subtle: #F5F5F5;   /* Subtle borders */
--brick-border-strong: #D4D4D4;   /* Strong borders */
--brick-border-focus: #000000;    /* Focus borders */

/* Interactive Elements */
--brick-button-primary-bg: #000000;
--brick-button-primary-text: #FFFFFF;
--brick-button-primary-hover: #262626;
--brick-button-primary-active: #171717;

--brick-button-secondary-bg: #FFFFFF;
--brick-button-secondary-text: #000000;
--brick-button-secondary-border: #D4D4D4;
--brick-button-secondary-hover: #F5F5F5;
--brick-button-secondary-active: #E8E8E8;

/* Status Colors (Monochrome) */
--brick-status-success: #262626;
--brick-status-warning: #525252;
--brick-status-error: #000000;
--brick-status-info: #787878;
```

### Dark Mode
```css
/* Backgrounds */
--brick-bg-primary: #000000;      /* Main background */
--brick-bg-secondary: #0A0A0A;    /* Secondary sections */
--brick-bg-tertiary: #171717;     /* Cards, surfaces */
--brick-bg-elevated: #262626;     /* Elevated surfaces */
--brick-bg-hover: #262626;        /* Hover states */
--brick-bg-active: #393939;       /* Active/pressed states */

/* Text */
--brick-text-primary: #FFFFFF;    /* Primary text */
--brick-text-secondary: #A1A1A1;  /* Secondary text */
--brick-text-tertiary: #787878;   /* Tertiary text */
--brick-text-disabled: #525252;   /* Disabled text */
--brick-text-placeholder: #525252; /* Placeholder text */
--brick-text-inverse: #000000;    /* Inverse text */

/* Borders */
--brick-border-default: #262626;  /* Default borders */
--brick-border-subtle: #171717;   /* Subtle borders */
--brick-border-strong: #393939;   /* Strong borders */
--brick-border-focus: #FFFFFF;    /* Focus borders */

/* Interactive Elements */
--brick-button-primary-bg: #FFFFFF;
--brick-button-primary-text: #000000;
--brick-button-primary-hover: #F5F5F5;
--brick-button-primary-active: #E8E8E8;

--brick-button-secondary-bg: #000000;
--brick-button-secondary-text: #FFFFFF;
--brick-button-secondary-border: #393939;
--brick-button-secondary-hover: #171717;
--brick-button-secondary-active: #262626;

/* Status Colors (Monochrome) */
--brick-status-success: #A1A1A1;
--brick-status-warning: #787878;
--brick-status-error: #FFFFFF;
--brick-status-info: #525252;
```

## Shadows & Overlays

### Light Mode Shadows
```css
--brick-shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--brick-shadow-sm: 0 2px 4px 0 rgba(0, 0, 0, 0.06);
--brick-shadow-md: 0 4px 8px 0 rgba(0, 0, 0, 0.08);
--brick-shadow-lg: 0 8px 16px 0 rgba(0, 0, 0, 0.10);
--brick-shadow-xl: 0 16px 32px 0 rgba(0, 0, 0, 0.12);
--brick-shadow-2xl: 0 24px 48px 0 rgba(0, 0, 0, 0.14);
```

### Dark Mode Shadows
```css
--brick-shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.8);
--brick-shadow-sm: 0 2px 4px 0 rgba(0, 0, 0, 0.9);
--brick-shadow-md: 0 4px 8px 0 rgba(0, 0, 0, 1);
--brick-shadow-lg: 0 8px 16px 0 rgba(0, 0, 0, 1);
--brick-shadow-xl: 0 16px 32px 0 rgba(0, 0, 0, 1);
--brick-shadow-2xl: 0 24px 48px 0 rgba(0, 0, 0, 1);
```

### Overlays
```css
/* Light Mode */
--brick-overlay-light: rgba(255, 255, 255, 0.95);
--brick-overlay-medium: rgba(255, 255, 255, 0.75);
--brick-overlay-dark: rgba(0, 0, 0, 0.5);

/* Dark Mode */
--brick-overlay-light: rgba(0, 0, 0, 0.95);
--brick-overlay-medium: rgba(0, 0, 0, 0.75);
--brick-overlay-dark: rgba(0, 0, 0, 0.85);
```

## Opacity Scale
```css
--brick-opacity-0: 0;
--brick-opacity-5: 0.05;
--brick-opacity-10: 0.1;
--brick-opacity-20: 0.2;
--brick-opacity-30: 0.3;
--brick-opacity-40: 0.4;
--brick-opacity-50: 0.5;
--brick-opacity-60: 0.6;
--brick-opacity-70: 0.7;
--brick-opacity-80: 0.8;
--brick-opacity-90: 0.9;
--brick-opacity-100: 1;
```

## Usage Guidelines

### 계층 구조 (Hierarchy)
1. **Primary Actions**: Pure black/white for maximum contrast
2. **Secondary Actions**: Gray-700/Gray-300
3. **Tertiary Actions**: Gray-500
4. **Disabled States**: Gray-400

### 대비 비율 (Contrast Ratios)
- **Large Text (18pt+)**: Minimum 3:1
- **Normal Text**: Minimum 4.5:1
- **UI Components**: Minimum 3:1
- **WCAG AAA**: 7:1 for normal text

### 적용 예시
```css
/* Card Component */
.card {
  background: var(--brick-bg-tertiary);
  border: 1px solid var(--brick-border-default);
  box-shadow: var(--brick-shadow-sm);
}

/* Primary Button */
.btn-primary {
  background: var(--brick-button-primary-bg);
  color: var(--brick-button-primary-text);
}

/* Text Hierarchy */
.heading {
  color: var(--brick-text-primary);
}
.body {
  color: var(--brick-text-secondary);
}
.caption {
  color: var(--brick-text-tertiary);
}
```

## Implementation Notes
- 모든 컬러는 CSS 변수로 정의하여 일관성 유지
- 다크모드는 자동으로 전환되도록 `[data-theme="dark"]` 속성 사용
- 접근성을 위해 WCAG 2.1 AA 기준 충족
- 브랜드 컬러가 필요한 경우 black/white 톤으로 대체