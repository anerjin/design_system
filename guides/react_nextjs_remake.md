## 목표
네이티브(HTML/CSS/JS) 기반 디자인 시스템을 React/Next.js로 이관하면서, 재사용 가능한 컴포넌트 라이브러리와 문서/샘플 사이트(Next)를 분리하여 점진적으로 전환합니다.

## 전체 전략
- **분리**: CSS/토큰은 그대로 유지(최소 변경), 컴포넌트는 React로 작성, 문서/샘플은 Next.js로 제공
- **점진 이관**: 우선 BEM 클래스와 CSS를 그대로 사용하며 React 컴포넌트화 → 이후 필요시 CSS Modules/Vanilla-Extract로 캡슐화

## 리포 구조 제안
- 모노레포(예: `packages`에 CSS/React, `apps`에 Next 문서 사이트)로 구성하는 것을 권장

## 1) CSS/토큰 전략
- **그대로 재사용**: `tokens`를 글로벌 CSS 변수로 유지, `atoms/molecules` BEM 클래스도 유지
- **번들링**: `bricks-css`는 PostCSS(autoprefixer, minify)로 빌드해 배포
- **테마**: 현재 `data-theme`/`localStorage` 방식을 유지하고 Next에서 `ThemeProvider`로 래핑

## 2) React 컴포넌트 설계
### 원칙
- 공통: `className`, `style`, `id`, `disabled`, `aria-*` 지원
- `forwardRef`, `as`(polymorphic) 패턴 검토
- `size`, `variant`는 클래스 토글로 매핑(`.btn--sm`, `.toggle--dark` 등)
- 접근성: 역할/키보드 패턴을 props로 노출

### 아이콘
- Boxicons Regular 유지. 간단히 `<i className="bx bx-*" />` 래퍼 제공 또는 React Icons 패키지화

## 3) JS 동작 이관(브라우저 이벤트 → React)
- 기존 `bricks/js/bricks_core.js` 로직을 **훅/컴포넌트 내부 상태**로 변환
  - Dropdown: focus trap, `Esc`, 방향키, 외부 클릭 닫기 → `useDropdown`
  - Toggle: `checked`/`onChange`, `role="switch"`, 좌/우 화살표 처리 → `useToggle`
  - Navbar: 모바일 토글, 문서 클릭 닫기, 스크롤 고정 등 → `useNavbar`
- 문서 전역에서 붙이던 리스너 제거, 컴포넌트 단위로 캡슐화

## 4) Next.js 통합
- **앱 라우터**: `app/` 구조, 공통 CSS를 `app/globals.css`에서 import
- **클라이언트 컴포넌트**: 상호작용(토글/드롭다운 등)은 `'use client'`
- **ThemeProvider**: 초기 렌더 시 깜빡임 방지를 위해 `data-theme`를 서버/클라이언트 동기화
- **코드 샘플/문서**: MDX(Next + Contentlayer) 또는 Storybook 별도 운영

## 5) 테스트/품질
- 유닛/접근성: React Testing Library + Jest/Vitest, `@testing-library/jest-dom`, `jest-axe`
- E2E: Playwright로 키보드 내비게이션, 스크롤/포커스 시나리오 검증
- 스냅샷/비주얼: Chromatic 또는 Percy(선택)

## 6) 배포/패키징
- `bricks-react`: tsup/rollup으로 `cjs`/`esm` 빌드, 타입 선언 포함
- `peerDependencies`: `react`, `react-dom`, `next`는 peer로
- `apps/docs-next`는 Vercel 배포, 컴포넌트는 로컬 워크스페이스 참조

## 7) 컴포넌트 변환 가이드 (예: Toggle)
- **API 초안**: `checked`, `defaultChecked`, `onChange`, `size('sm'|'md'|'lg')`, `variant('success'|'info'|'dark'...)`, `icons({ on, off })`, `disabled`, `aria-label`
- **클래스 매핑**: `size → .toggle--sm|--lg`, `variant → .toggle--{variant}`, `icons → .toggle--icons`
- **접근성**: `role="switch"`, `aria-checked`, `Space/Enter/ArrowLeft/ArrowRight` 핸들
- **예시 사용**:
```tsx
<Toggle
  variant="dark"
  size="sm"
  checked={dark}
  onChange={setDark}
  icons={{ on: <i className="bx bx-moon" />, off: <i className="bx bx-sun" /> }}
  aria-label="Dark mode"
/>
```

## 8) Next에 적용 예시
- `app/layout.tsx`: 글로벌 CSS 로드, `ThemeProvider` 적용
- `app/page.tsx`: 각 컴포넌트 데모 렌더
- Boxicons CSS는 `layout.tsx`에 한 번만 링크 또는 `docs-next`에서만 주입

## 9) 문서화
- 컴포넌트별: 목적, Props 테이블, 접근성 섹션(키보드/ARIA), 사용 예제, 디자인 토큰 링크
- 변경 로그: 토큰/클래스명 변경 시 파급효과 명시

## 10) 이관 순서 제안
- 토큰/기초 CSS → 버튼/토글 등 원자 컴포넌트 → 입력류 → 복합 컴포넌트(드롭다운/탭/아코디언/네비) → 레이아웃 → 유틸리티 → 문서 페이지

## 초기 구현 체크리스트
- [ ] 패키지 세팅: TS, ESLint, Prettier, tsup/rollup, changeset
- [ ] 글로벌 CSS: `tokens`, `base`, `utilities` import 검증
- [ ] Boxicons Regular: CDN 또는 로컬 에셋 결정
- [ ] 핵심 컴포넌트 3종: `Button`, `Toggle`, `Dropdown`부터 React 변환
- [ ] 접근성 회귀 테스트: 키보드/포커스/Escape/스크롤
