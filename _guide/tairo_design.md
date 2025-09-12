# Tairo Design System

## 개요

Tairo는 Nuxt.js와 Tailwind CSS 기반의 현대적인 대시보드 디자인 시스템입니다. Shuriken UI 컴포넌트 라이브러리를 활용하여 유연하고 확장 가능한 UI를 제공합니다.

## 핵심 기술 스택

- **Framework**: Nuxt.js
- **Styling**: Tailwind CSS
- **Component Library**: Shuriken UI
- **Font System**: @nuxt/fonts
- **Theme**: CSS Variables 기반

## 색상 시스템 (Color System)

### 테마 설정

CSS 변수를 통한 커스터마이징 지원:

```css
@theme {
  --color-primary-50: var(--color-sky-50);
  --color-primary-100: var(--color-sky-100);
  --color-primary-200: var(--color-sky-200);
  --color-primary-300: var(--color-sky-300);
  --color-primary-400: var(--color-sky-400);
  --color-primary-500: var(--color-sky-500);
  --color-primary-600: var(--color-sky-600);
  --color-primary-700: var(--color-sky-700);
  --color-primary-800: var(--color-sky-800);
  --color-primary-900: var(--color-sky-900);
}
```

### 색상 모드

- Light Mode / Dark Mode 지원
- 자동 테마 전환 기능
- 사용자 설정 저장

## 타이포그래피 (Typography)

### 폰트 설정

```css
--font-sans: Inter, sans-serif;
```

### 텍스트 스타일

- 헤딩: h1 ~ h6 레벨별 크기 및 굵기 설정
- 본문: 가독성 최적화된 line-height와 letter-spacing
- 캡션: 작은 크기의 보조 텍스트

## 간격 시스템 (Spacing)

### 기본 간격 단위

```css
--spacing: 0.275rem;
```

### 간격 스케일

- xs: 0.25rem
- sm: 0.5rem
- md: 1rem
- lg: 1.5rem
- xl: 2rem
- 2xl: 3rem

## 레이아웃 패턴 (Layout Patterns)

### 1. Sidenav Layout

- 고정된 사이드 네비게이션
- 메인 콘텐츠 영역
- 반응형 축소/확장

### 2. Sidebar Layout

- 유연한 사이드바 너비
- 토글 가능한 메뉴
- 중첩 메뉴 지원

### 3. Collapse Layout

- 접이식 네비게이션
- 아이콘 전용 모드
- 호버시 확장

### 4. Topnav Layout

- 상단 고정 네비게이션
- 드롭다운 메뉴
- 모바일 햄버거 메뉴

## 컴포넌트 (Components)

### 버튼 (Buttons)

```vue
<BaseButton color="primary" size="md">
  클릭
</BaseButton>
```

**변형 (Variants)**:

- **색상**: primary, secondary, success, danger, warning, info
- **크기**: xs, sm, md, lg, xl
- **상태**: default, hover, active, disabled, loading

### 카드/패널 (Cards/Panels)

```vue
<BaseCard>
  <template #header>
    <h3>카드 제목</h3>
  </template>
  <template #default>
    카드 내용
  </template>
</BaseCard>
```

**스타일 속성**:

- 그림자: shadow-sm, shadow-md, shadow-lg
- 모서리: rounded-md, rounded-lg, rounded-xl
- 패딩: p-4, p-6, p-8

### 폼 요소 (Form Elements)

#### 입력 필드 (Input Fields)

```vue
<BaseInput 
  v-model="value"
  type="text"
  label="라벨"
  placeholder="플레이스홀더"
/>
```

#### 선택 박스 (Select)

```vue
<BaseSelect 
  v-model="selected"
  :options="options"
  label="선택하세요"
/>
```

#### 체크박스 (Checkbox)

```vue
<BaseCheckbox 
  v-model="checked"
  label="동의합니다"
/>
```

#### 라디오 버튼 (Radio)

```vue
<BaseRadio 
  v-model="radio"
  :options="radioOptions"
  name="radioGroup"
/>
```

### 네비게이션 (Navigation)

```vue
<BaseNavigation>
  <BaseNavItem to="/dashboard" icon="dashboard">
    대시보드
  </BaseNavItem>
  <BaseNavItem to="/users" icon="users">
    사용자
  </BaseNavItem>
</BaseNavigation>
```

### 테이블 (Tables)

```vue
<BaseTable :data="tableData" :columns="columns">
  <template #cell-actions="{ row }">
    <BaseButton size="sm">편집</BaseButton>
  </template>
</BaseTable>
```

**테이블 스타일**:

- 줄무늬 행: striped
- 호버 효과: hover
- 테두리: bordered
- 콤팩트: compact

### 모달/다이얼로그 (Modals/Dialogs)

```vue
<BaseModal v-model="isOpen" size="md">
  <template #header>
    모달 제목
  </template>
  <template #default>
    모달 내용
  </template>
  <template #footer>
    <BaseButton @click="isOpen = false">닫기</BaseButton>
  </template>
</BaseModal>
```

**크기 옵션**: sm, md, lg, xl, full

### 배지/태그 (Badges/Tags)

```vue
<BaseBadge color="primary" size="sm">
  신규
</BaseBadge>
```

**스타일 변형**:

- 색상: primary, success, warning, danger, info
- 크기: xs, sm, md
- 모양: rounded, pill

### 알림/토스트 (Alerts/Notifications)

```vue
<BaseAlert type="success" dismissible>
  성공적으로 저장되었습니다.
</BaseAlert>
```

**타입**: success, info, warning, error

## 반응형 디자인 (Responsive Design)

### 브레이크포인트

- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

### 모바일 최적화

- 터치 친화적 인터페이스
- 스와이프 제스처 지원
- 적응형 레이아웃

## 접근성 (Accessibility)

### WCAG 준수

- 키보드 네비게이션
- 스크린 리더 지원
- ARIA 레이블
- 포커스 관리

### 색상 대비

- AA 레벨 대비율 준수
- 고대비 모드 지원

## 애니메이션 & 트랜지션

### 기본 트랜지션

```css
transition: all 0.2s ease-in-out;
```

### 애니메이션 프리셋

- fade-in
- slide-up
- scale
- rotate

## 아이콘 시스템

### 아이콘 라이브러리

- Material Icons
- Heroicons
- Custom SVG 지원

### 사용 예시

```vue
<Icon name="dashboard" size="24" />
```

## 그림자 시스템 (Shadow System)

### 그림자 레벨

- shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05)
- shadow: 0 1px 3px rgba(0, 0, 0, 0.1)
- shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1)
- shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1)
- shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1)

## 보더 시스템 (Border System)

### 보더 반경

- rounded-sm: 0.125rem
- rounded: 0.25rem
- rounded-md: 0.375rem
- rounded-lg: 0.5rem
- rounded-xl: 0.75rem
- rounded-2xl: 1rem
- rounded-full: 9999px

### 보더 스타일

- border: 1px solid
- border-2: 2px solid
- border-dashed: 대시 스타일
- border-dotted: 점선 스타일

## 유틸리티 클래스

### 디스플레이

- flex, grid, block, inline-block
- hidden, visible

### 포지셔닝

- relative, absolute, fixed, sticky
- top, right, bottom, left

### 오버플로우

- overflow-hidden, overflow-auto, overflow-scroll

## 커스터마이징 가이드

### CSS 변수 오버라이드

```css
:root {
  --color-primary-500: #3B82F6;
  --font-sans: 'Pretendard', sans-serif;
  --spacing: 0.25rem;
}
```

### Tailwind 설정 확장

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: '#FF6B6B'
      }
    }
  }
}
```

## 성능 최적화

### 코드 스플리팅

- 컴포넌트 레이지 로딩
- 라우트별 번들 분리

### 최적화 기법

- PurgeCSS로 미사용 CSS 제거
- 이미지 최적화
- 폰트 서브셋팅

## 베스트 프랙티스

1. **일관성 유지**: 디자인 토큰 활용
2. **재사용성**: 컴포넌트 기반 개발
3. **접근성**: WCAG 가이드라인 준수
4. **성능**: 번들 크기 최적화
5. **반응형**: 모바일 퍼스트 접근

## 참고 링크

- [Tairo Dashboard](https://tairo.cssninja.io/dashboards)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Nuxt.js Documentation](https://nuxt.com/docs)
- [Shuriken UI](https://github.com/shuriken-ui)