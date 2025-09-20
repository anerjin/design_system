# BRICK Design System - HTML/CSS/JS Mapping Guide

## 🏗️ System Architecture

### 📄 index.html - Dynamic Content Loading
- **핵심 기능**: 각 HTML 파일의 `<div class="vp-doc">` 영역을 동적으로 로드
- **SPA 방식**: 페이지 전환 시 콘텐츠만 교체, 레이아웃 유지
- **라우팅**: URL 해시 기반 네비게이션 (`#/pages/...`)

### 🎨 CSS Management
| File | Purpose | Description |
|------|---------|-------------|
| `layout/css/index.css` | **CSS Bundle Manager** | 모든 CSS 파일을 import하는 중앙 관리 파일<br>CSS 추가/삭제 시 이 파일만 수정 |
| `layout/css/layout.css` | **Global Layout** | 디자인 시스템 전체 레이아웃 정의<br>헤더, 사이드바, 메인 콘텐츠 영역 |
| `layout/css/template.css` | **Page Template** | 페이지 상세 내용의 공통 요소<br>타이포그래피, 코드 블록, 테이블 스타일 |

### 🔧 JavaScript Management
| File | Purpose | Description |
|------|---------|-------------|
| `bricks/js/bricks_loader.js` | **JS Module Loader** | 모든 컴포넌트 JS를 import하는 중앙 관리 파일<br>JS 추가/삭제 시 이 파일만 수정 |
| `bricks/js/bricks_core.js` | **Core Library** | 공통 유틸리티 함수 및 헬퍼 메서드 |

### 🔄 파일 관리 워크플로우
```
CSS 추가/삭제 → layout/css/index.css 수정
JS 추가/삭제 → bricks/js/bricks_loader.js 수정
레이아웃 변경 → layout/css/layout.css 수정
페이지 스타일 → layout/css/template.css 수정
```

## 📁 Directory Structure
```
bricks/
├── css/
│   ├── tokens/       # Design Tokens (디자인 토큰)
│   ├── base/         # Base Styles & Semantic Tokens (기본 스타일 및 시맨틱 토큰)
│   ├── atoms/        # Atomic Components (원자 컴포넌트)
│   ├── molecules/    # Molecular Components (분자 컴포넌트)
│   └── utilities/    # Utility Classes (유틸리티 클래스)
└── js/
    ├── bricks_core.js    # Core JavaScript (핵심 라이브러리)
    ├── bricks_loader.js  # Component Loader (컴포넌트 로더)
    └── components/       # Component Scripts (컴포넌트 스크립트)
```

## 🎨 Design Tokens
| CSS File | HTML Page | JS File | Description |
|----------|-----------|---------|-------------|
| `bricks/css/tokens/colors.css` | `pages/design-tokens/colors.html` | - | 색상 시스템 |
| `bricks/css/tokens/typography.css` | `pages/design-tokens/typography.html` | - | 타이포그래피 시스템 |
| `bricks/css/tokens/spacing.css` | `pages/design-tokens/spacing.html` | - | 간격 시스템 |
| `bricks/css/tokens/shadows.css` | `pages/design-tokens/shadows.html` | - | 그림자 효과 |
| `bricks/css/tokens/borders.css` | `pages/design-tokens/borders.html` | - | 테두리 스타일 |

## 🔧 Base Styles
| CSS File | HTML Page | JS File | Description |
|----------|-----------|---------|-------------|
| `bricks/css/base/reset.css` | - | - | CSS Reset (브라우저 기본 스타일 초기화) |
| `bricks/css/base/base.css` | - | - | 기본 스타일 & 시맨틱 토큰 |

## ⚛️ Atoms (기본 요소)
| CSS File | HTML Page | JS File | Description |
|----------|-----------|---------|-------------|
| `bricks/css/atoms/button.css` | `pages/elements/button.html` | - | 버튼 컴포넌트 |
| `bricks/css/atoms/input.css` | `pages/elements/input.html` | - | 입력 필드 |
| `bricks/css/atoms/select.css` | `pages/elements/select.html` | - | 선택 박스 |
| `bricks/css/atoms/checkbox.css` | `pages/elements/checkbox.html` | `bricks/js/components/checkbox.js` | 체크박스 |
| `bricks/css/atoms/radio.css` | `pages/elements/radio.html` | - | 라디오 버튼 |
| `bricks/css/atoms/toggle.css` | `pages/elements/toggle.html` | `bricks/js/components/toggle.js` | 토글 스위치 |
| `bricks/css/atoms/badge.css` | `pages/elements/badge.html` | - | 배지/라벨 |
| `bricks/css/atoms/avatar.css` | `pages/elements/avatar.html` | - | 아바타/프로필 이미지 |
| `bricks/css/atoms/progress.css` | `pages/elements/progress.html` | - | 진행률 표시 |
| `bricks/css/atoms/spinner.css` | `pages/elements/spinner.html` | - | 로딩 스피너 |
| - | `pages/elements/typography.html` | - | ⚠️ 타이포그래피 (CSS 파일 필요) |
| - | `pages/elements/icon.html` | - | ⚠️ 아이콘 (CSS 파일 필요) |

## 🧩 Molecules (복합 컴포넌트)
| CSS File | HTML Page | JS File | Description |
|----------|-----------|---------|-------------|
| `bricks/css/molecules/alert.css` | `pages/components/alert.html` | `bricks/js/components/alert.js` | 알림 메시지 |
| `bricks/css/molecules/card.css` | `pages/components/card.html` | - | 카드 컴포넌트 |
| `bricks/css/molecules/modal.css` | `pages/components/modal.html` | `bricks/js/components/modal.js` | 모달 다이얼로그 |
| `bricks/css/molecules/dropdown.css` | `pages/components/dropdown.html` | `bricks/js/components/dropdown.js` | 드롭다운 메뉴 |
| `bricks/css/molecules/tabs.css` | `pages/components/tabs.html` | `bricks/js/components/tabs.js` | 탭 네비게이션 |
| `bricks/css/molecules/accordion.css` | `pages/components/accordion.html` | `bricks/js/components/accordion.js` | 아코디언 |
| `bricks/css/molecules/pagination.css` | `pages/components/pagination.html` | `bricks/js/components/pagination.js` | 페이지네이션 |
| `bricks/css/molecules/breadcrumb.css` | `pages/components/breadcrumb.html` | `bricks/js/components/breadcrumb.js` | 브레드크럼 |
| `bricks/css/molecules/navbar.css` | `pages/components/navbar.html` | `bricks/js/components/navbar.js` | 네비게이션 바 |
| `bricks/css/molecules/table.css` | `pages/components/table.html` | `bricks/js/components/table.js` | 테이블 |
| `bricks/css/molecules/datepicker.css` | `pages/components/datepicker.html` | `bricks/js/components/datepicker.js` | 날짜 선택기 |

## 🛠 Utilities
| CSS File | HTML Page | JS File | Description |
|----------|-----------|---------|-------------|
| `bricks/css/utilities/display.css` | `pages/utilities/display.html` | - | 디스플레이 유틸리티 |
| `bricks/css/utilities/position.css` | `pages/utilities/position.html` | - | 포지션 유틸리티 |
| `bricks/css/utilities/overflow.css` | `pages/utilities/overflow.html` | - | 오버플로우 유틸리티 |


## 📝 Getting Started Pages
| HTML Page | JS File | Description |
|-----------|---------|-------------|
| `pages/getting-started/introduction.html` | - | 소개 |
| `pages/getting-started/installation.html` | - | 설치 가이드 |
| `pages/getting-started/configuration.html` | - | 설정 방법 |
| `pages/getting-started/template.html` | - | 템플릿 페이지 |

## 🚀 JavaScript Components

### Core Scripts
- **`bricks_core.js`**: 핵심 JavaScript 라이브러리 및 유틸리티 함수
- **`bricks_loader.js`**: 컴포넌트 자동 로딩 및 초기화

### Interactive Components (JS 필요)
| Component | File | Purpose |
|-----------|------|----------|
| Accordion | `accordion.js` | 확장/축소 애니메이션 |
| Alert | `alert.js` | 닫기 버튼, 자동 사라짐 |
| Breadcrumb | `breadcrumb.js` | 동적 경로 업데이트 |
| Checkbox | `checkbox.js` | 커스텀 체크박스 동작 |
| Datepicker | `datepicker.js` | 날짜 선택 인터페이스 |
| Dropdown | `dropdown.js` | 열기/닫기 토글 |
| Modal | `modal.js` | 모달 열기/닫기 |
| Navbar | `navbar.js` | 모바일 메뉴 토글 |
| Pagination | `pagination.js` | 페이지 전환 |
| Table | `table.js` | 정렬, 필터링 기능 |
| Tabs | `tabs.js` | 탭 전환 |
| Toggle | `toggle.js` | 온/오프 상태 전환 |

### Static Components (JS 불필요)
- Button, Input, Select, Radio: 네이티브 HTML 동작 사용
- Badge, Avatar, Progress, Spinner, Card: 정적 표시 요소

## 🎯 CSS Import Order
올바른 CSS import 순서 (index.html에서):

```html
<!-- 1. Design Tokens (디자인 토큰) -->
<link rel="stylesheet" href="bricks/css/tokens/colors.css">
<link rel="stylesheet" href="bricks/css/tokens/typography.css">
<link rel="stylesheet" href="bricks/css/tokens/spacing.css">
<link rel="stylesheet" href="bricks/css/tokens/shadows.css">
<link rel="stylesheet" href="bricks/css/tokens/borders.css">

<!-- 2. Base Styles (기본 스타일 & 시맨틱 토큰) -->
<link rel="stylesheet" href="bricks/css/base/reset.css">
<link rel="stylesheet" href="bricks/css/base/base.css">

<!-- 3. Atoms (원자 컴포넌트) -->
<link rel="stylesheet" href="bricks/css/atoms/button.css">
<link rel="stylesheet" href="bricks/css/atoms/input.css">
<link rel="stylesheet" href="bricks/css/atoms/select.css">
<link rel="stylesheet" href="bricks/css/atoms/checkbox.css">
<link rel="stylesheet" href="bricks/css/atoms/radio.css">
<link rel="stylesheet" href="bricks/css/atoms/toggle.css">
<link rel="stylesheet" href="bricks/css/atoms/badge.css">
<link rel="stylesheet" href="bricks/css/atoms/avatar.css">
<link rel="stylesheet" href="bricks/css/atoms/progress.css">
<link rel="stylesheet" href="bricks/css/atoms/spinner.css">

<!-- 4. Molecules (분자 컴포넌트) -->
<link rel="stylesheet" href="bricks/css/molecules/alert.css">
<link rel="stylesheet" href="bricks/css/molecules/card.css">
<link rel="stylesheet" href="bricks/css/molecules/modal.css">
<link rel="stylesheet" href="bricks/css/molecules/dropdown.css">
<link rel="stylesheet" href="bricks/css/molecules/tabs.css">
<link rel="stylesheet" href="bricks/css/molecules/accordion.css">
<link rel="stylesheet" href="bricks/css/molecules/pagination.css">
<link rel="stylesheet" href="bricks/css/molecules/breadcrumb.css">
<link rel="stylesheet" href="bricks/css/molecules/navbar.css">
<link rel="stylesheet" href="bricks/css/molecules/table.css">
<link rel="stylesheet" href="bricks/css/molecules/datepicker.css">

<!-- 5. Utilities (유틸리티) -->
<link rel="stylesheet" href="bricks/css/utilities/display.css">
<link rel="stylesheet" href="bricks/css/utilities/position.css">
<link rel="stylesheet" href="bricks/css/utilities/overflow.css">
```

## 🎯 Import Management

### CSS Import (layout/css/index.css에서 관리)
```css
/* layout/css/index.css */
@import url('./layout.css');        /* 전체 레이아웃 */
@import url('./template.css');      /* 페이지 템플릿 */
@import url('../../bricks/css/tokens/colors.css');
@import url('../../bricks/css/tokens/typography.css');
/* ... 모든 CSS 파일 import ... */
```

### JavaScript Import (bricks/js/bricks_loader.js에서 관리)
```javascript
/* bricks/js/bricks_loader.js */
import './components/accordion.js';
import './components/alert.js';
import './components/breadcrumb.js';
/* ... 모든 컴포넌트 JS import ... */
```

### HTML에서 사용
```html
<!-- index.html -->
<link rel="stylesheet" href="layout/css/index.css">  <!-- 모든 CSS -->
<script src="bricks/js/bricks_core.js"></script>     <!-- 코어 라이브러리 -->
<script src="bricks/js/bricks_loader.js"></script>   <!-- 모든 컴포넌트 -->
```

## 📌 Notes

### 파일 구조
- **CSS 관리**: `layout/css/index.css`에서 모든 CSS import 중앙 관리
- **JS 관리**: `bricks/js/bricks_loader.js`에서 모든 JS import 중앙 관리
- **동적 로딩**: `index.html`이 각 페이지의 `<div class="vp-doc">` 콘텐츠를 동적 로드
- **컴포넌트**: 인터랙티브 컴포넌트만 JavaScript 파일 필요

### 현재 상태
- ✅ **완전 매핑**: Design Tokens, Base Styles, 대부분의 Atoms & Molecules
- ⚠️ **CSS 필요**: typography, icon (atoms)
- 📌 **정적 컴포넌트**: button, input, select, radio, badge, avatar, progress, spinner, card
- 🔧 **동적 컴포넌트**: accordion, alert, breadcrumb, checkbox, datepicker, dropdown, modal, navbar, pagination, table, tabs, toggle

### 통합 파일
- **semantic.css** 내용을 **base.css**로 통합
- **form-group.css** 제거 (불필요)