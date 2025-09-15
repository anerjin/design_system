# BRICK Design System - CSS & HTML Mapping Guide

## 📁 Directory Structure
```
bricks/
└── css/
    ├── tokens/       # Design Tokens (디자인 토큰)
    ├── base/         # Base Styles (기본 스타일)
    ├── atoms/        # Atomic Components (원자 컴포넌트)
    ├── molecules/    # Molecular Components (분자 컴포넌트)
    ├── layout/       # Layout System (레이아웃 시스템)
    └── utilities/    # Utility Classes (유틸리티 클래스)
```

## 🎨 Design Tokens
| CSS File | HTML Page | Description |
|----------|-----------|-------------|
| `bricks/css/tokens/colors.css` | `pages/design-tokens/colors.html` | 색상 시스템 |
| `bricks/css/tokens/typography.css` | `pages/design-tokens/typography.html` | 타이포그래피 시스템 |
| `bricks/css/tokens/spacing.css` | `pages/design-tokens/spacing.html` | 간격 시스템 |
| `bricks/css/tokens/shadows.css` | `pages/design-tokens/shadows.html` | 그림자 효과 |
| `bricks/css/tokens/borders.css` | `pages/design-tokens/borders.html` | 테두리 스타일 |

## 🔧 Base Styles
| CSS File | HTML Page | Description |
|----------|-----------|-------------|
| `bricks/css/base/reset.css` | - | CSS Reset (브라우저 기본 스타일 초기화) |

## ⚛️ Atoms (기본 요소)
| CSS File | HTML Page | Description |
|----------|-----------|-------------|
| `bricks/css/atoms/button.css` | `pages/elements/button.html` | 버튼 컴포넌트 |
| `bricks/css/atoms/input.css` | `pages/elements/input.html` | 입력 필드 |
| `bricks/css/atoms/select.css` | `pages/elements/select.html` | 선택 박스 |
| `bricks/css/atoms/checkbox.css` | `pages/elements/checkbox.html` | 체크박스 |
| `bricks/css/atoms/radio.css` | `pages/elements/radio.html` | 라디오 버튼 |
| `bricks/css/atoms/toggle.css` | `pages/elements/toggle.html` | 토글 스위치 |
| `bricks/css/atoms/badge.css` | `pages/elements/badge.html` | 배지/라벨 |
| `bricks/css/atoms/avatar.css` | `pages/elements/avatar.html` | 아바타/프로필 이미지 |
| `bricks/css/atoms/progress.css` | `pages/elements/progress.html` | 진행률 표시 |
| `bricks/css/atoms/spinner.css` | `pages/elements/spinner.html` | 로딩 스피너 |

## 🧩 Molecules (복합 컴포넌트)
| CSS File | HTML Page | Description |
|----------|-----------|-------------|
| `bricks/css/molecules/alert.css` | `pages/components/alert.html` | 알림 메시지 |
| `bricks/css/molecules/card.css` | `pages/components/card.html` | 카드 컴포넌트 |
| `bricks/css/molecules/modal.css` | `pages/components/modal.html` | 모달 다이얼로그 |
| `bricks/css/molecules/dropdown.css` | `pages/components/dropdown.html` | 드롭다운 메뉴 |
| `bricks/css/molecules/tabs.css` | `pages/components/tabs.html` | 탭 네비게이션 |
| `bricks/css/molecules/accordion.css` | `pages/components/accordion.html` | 아코디언 |
| `bricks/css/molecules/pagination.css` | `pages/components/pagination.html` | 페이지네이션 |
| `bricks/css/molecules/breadcrumb.css` | `pages/components/breadcrumb.html` | 브레드크럼 |
| `bricks/css/molecules/navbar.css` | `pages/components/navbar.html` | 네비게이션 바 |
| `bricks/css/molecules/table.css` | `pages/components/table.html` | 테이블 |
| `bricks/css/molecules/form-group.css` | - | 폼 그룹 레이아웃 |

## 📐 Layout (별도 관리)
| CSS File | HTML Page | Description |
|----------|-----------|-------------|
| `layout/css/container.css` | `pages/layout/container.html` | 컨테이너 시스템 |
| `layout/css/grid.css` | `pages/layout/grid.html` | 그리드 시스템 |
| `layout/css/flexbox.css` | `pages/layout/flexbox.html` | 플렉스박스 레이아웃 |
| `layout/css/layout-vitepress.css` | `index-vitepress.html` | VitePress 스타일 레이아웃 |
| `layout/css/index.css` | - | 전체 CSS 번들 (모든 스타일 통합) |

## 🛠 Utilities
| CSS File | HTML Page | Description |
|----------|-----------|-------------|
| `bricks/css/utilities/display.css` | `pages/utilities/display.html` | 디스플레이 유틸리티 |
| `bricks/css/utilities/position.css` | `pages/utilities/position.html` | 포지션 유틸리티 |
| `bricks/css/utilities/overflow.css` | `pages/utilities/overflow.html` | 오버플로우 유틸리티 |

## 📝 Getting Started Pages
| HTML Page | Description |
|-----------|-------------|
| `pages/getting-started/introduction.html` | 소개 |
| `pages/getting-started/installation.html` | 설치 가이드 |
| `pages/getting-started/configuration.html` | 설정 방법 |

## 🎯 CSS Import Order
올바른 CSS import 순서 (index-vitepress.html에서):

```html
<!-- 1. Design Tokens (디자인 토큰) -->
<link rel="stylesheet" href="bricks/css/tokens/colors.css">
<link rel="stylesheet" href="bricks/css/tokens/typography.css">
<link rel="stylesheet" href="bricks/css/tokens/spacing.css">
<link rel="stylesheet" href="bricks/css/tokens/shadows.css">
<link rel="stylesheet" href="bricks/css/tokens/borders.css">

<!-- 2. Base Styles (기본 스타일) -->
<link rel="stylesheet" href="bricks/css/base/reset.css">

<!-- 3. Layout (레이아웃 - 별도 폴더) -->
<link rel="stylesheet" href="layout/css/layout-vitepress.css">
<link rel="stylesheet" href="layout/css/container.css">
<link rel="stylesheet" href="layout/css/grid.css">
<link rel="stylesheet" href="layout/css/flexbox.css">

<!-- 4. Atoms (원자 컴포넌트) -->
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

<!-- 5. Molecules (분자 컴포넌트) -->
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
<link rel="stylesheet" href="bricks/css/molecules/form-group.css">

<!-- 6. Utilities (유틸리티) -->
<link rel="stylesheet" href="bricks/css/utilities/display.css">
<link rel="stylesheet" href="bricks/css/utilities/position.css">
<link rel="stylesheet" href="bricks/css/utilities/overflow.css">
```

## 🚀 Bundle Option
모든 CSS를 하나로 통합한 번들 파일 사용:

```html
<!-- Complete Bundle (전체 번들) -->
<link rel="stylesheet" href="layout/css/index.css">
```

## 📌 Notes
- 컴포넌트 CSS는 `bricks/css/` 디렉토리에 구조적으로 정리됨
- 레이아웃 CSS는 `layout/css/` 디렉토리에 별도 관리됨
- 각 CSS 파일은 대응하는 HTML 문서 페이지를 가지고 있음
- index-vitepress.html은 동적 컨텐츠 로딩을 위해 모든 CSS를 미리 import해야 함
- CSS 파일명과 HTML 파일명은 일관성 있게 매칭됨