# BRICK Design System 개발 가이드

## 🚨 중요 경고 (CRITICAL WARNING)

### ⛔ colors.css 파일 수정 금지
- **절대 금지**: `design-system\tokens\colors.css` 파일은 사용자의 명시적 요청 없이는 절대 수정, 추가, 삭제 금지
- **이유**: 이 파일은 전체 디자인 시스템의 핵심 색상 정의를 담고 있으며, 무단 수정 시 시스템 전체에 영향을 미침
- **허용 조건**: 오직 사용자가 "colors.css를 수정해줘" 또는 "색상을 추가/변경/삭제해줘" 등 명시적으로 요청한 경우에만 수정 가능
- **위반 시**: 디자인 시스템 일관성 파괴 및 예기치 않은 UI 오류 발생 가능

## 🚀 핵심 원칙

### BRICK Design System의 철학
1. **Pure Black & White**: 순수한 흑백 컬러 시스템으로 미니멀하고 현대적인 디자인
2. **No Hardcoding**: 모든 스타일값은 CSS 변수로 정의하고 사용
3. **External CSS Only**: 인라인 스타일 금지, 모든 스타일은 외부 CSS 파일에 정의
4. **Consistent Naming**: `--ds-` 접두사로 Design System 변수 네임스페이스 통일

## 📐 CSS 작성 규칙

### 1. 선택자 작성 규칙
- CSS는 상속 관계를 명확히 작성한다
- 선택자는 가능한 구체적으로 작성하여 우선순위 충돌을 방지한다

### 2. 코드 포맷팅
- CSS는 한 줄 단위로 작성한다
- 예시: `.header .tnbWrap .tnb .tools .tnbLeftItems .visitorInfo span i {font-size:12px;}`

### 3. 스타일 정의 규칙
- **필수**: 모든 속성값(색상, 여백, 크기 등)은 기존에 정의된 CSS 변수를 사용한다
- **허용**: 예제 페이지의 UI 구성을 위한 스타일은 해당 HTML 파일 내 `<style>` 태그에 작성 가능
- **금지**: 인라인 스타일 속성(style="...") 사용 금지
- **금지**: 하드코딩된 값 사용 금지 (모든 값은 CSS 변수 사용)

### 4. 색상 시스템
- **필수**: 모든 색상은 `design-system\tokens\colors.css`의 CSS 변수만 사용한다
- **금지**: 하드코딩된 색상값(#000000, #FFFFFF, rgba(0,0,0,0.5) 등) 사용 금지
- **⚠️ 경고**: colors.css 파일 자체는 사용자 요청 없이 절대 수정 불가
- **사용 예시**:
  ```css
  background: var(--ds-black);
  color: var(--ds-text-primary);
  border: 1px solid var(--ds-color-border);
  box-shadow: var(--ds-shadow-md);
  ```

### 5. 카드 예제 디자인 규칙
- **필수**: 모든 카드 형태의 예제는 반드시 테두리(border)를 포함해야 한다
- **이유**: 흰색 배경의 카드는 테두리 없이는 경계를 구분할 수 없음
- **최소 스타일**:
  ```css
  border: 1px solid var(--ds-gray-200);  /* 또는 var(--ds-gray-100) */
  border-radius: var(--ds-radius-lg);    /* 선택적 */
  ```
- **적용 대상**:
  - 색상 팔레트 카드
  - 타이포그래피 예제 카드
  - 간격 데모 카드
  - 그림자 예제 박스
  - 테두리 예제 카드
  - 모든 데모/예제 컨테이너

#### 카드 컴포넌트 구조 가이드
- **기본 구조**: 모든 카드는 `.card` 클래스를 사용하며 다음 구조를 따른다:
  ```html
  <div class="card">
    <div class="card__header">  <!-- 선택적 -->
      <h3 class="card__title">카드 제목</h3>
      <p class="card__description">카드 설명</p>
    </div>
    <div class="card__body">
      <!-- 카드 내용 -->
    </div>
    <div class="card__footer">  <!-- 선택적 -->
      <!-- 푸터 내용 -->
    </div>
  </div>
  ```

- **카드 변형 클래스**:
  - `.card--elevated`: 그림자 효과가 있는 카드
  - `.card--bordered`: 두꺼운 테두리 강조 카드
  - `.card--flat`: 그림자 없는 플랫 카드
  - `.card--radius-[size]`: 모서리 라운딩 크기 조절

- **색상 예제 카드**: 디자인 토큰 페이지의 색상 샘플 표시
  ```html
  <div class="card" style="background: var(--ds-gray-100);">
    <div class="card__body text-center">
      <span class="color-name">Gray 100</span>
      <span class="color-value">#F5F5F5</span>
      <span class="color-var">--ds-gray-100</span>
    </div>
  </div>
  ```

- **레이아웃 그룹**: 여러 카드를 그룹으로 표시
  ```html
  <div class="card-group card-group--cols-2">  <!-- 2열 그리드 -->
    <div class="card">...</div>
    <div class="card">...</div>
  </div>
  ```

- **스타일 정의 위치**:
  - 카드 컴포넌트 기본 스타일: `components/molecules/card.css`
  - 페이지별 카드 레이아웃: 각 페이지의 `<style>` 태그 내부
  - 공통 그리드 레이아웃: `layout/css/layout-vitepress.css`

### 6. Borders (`design-system\tokens\borders.css`)
- **Border Width**:
  - `--ds-border-width-0`: 0
  - `--ds-border-width-1`: 1px
  - `--ds-border-width-2`: 2px
  - `--ds-border-width-4`: 4px
  - `--ds-border-width-8`: 8px
- **Border Radius**: `--ds-border-radius-` 접두사 (spacing.css와 동일)
- **Border Colors**: `--ds-border-color-` 접두사
- **Ring Utilities**: Focus ring 스타일 (Black only)

### 7. 아이콘 시스템
- 모든 아이콘은 `design-system\icon` 폴더의 SVG 아이콘을 사용한다
- 외부 아이콘 라이브러리 사용 금지

## 🎨 디자인 토큰 체계

### 1. Colors (`design-system\tokens\colors.css`)
- **Core Colors**:
  - `--ds-black`: #000000
  - `--ds-white`: #FFFFFF
- **Gray Scale (13 levels)**:
  - `--ds-gray-0`: #FFFFFF (Pure White)
  - `--ds-gray-50`: #FAFAFA
  - `--ds-gray-100` ~ `--ds-gray-900`
  - `--ds-gray-950`: #0A0A0A
  - `--ds-gray-1000`: #000000 (Pure Black)
- **Semantic UI Colors** (실제 색상값 사용):
  - `--ds-color-success`: #64a644 (Green - 성공, 완료)
  - `--ds-color-warning`: #fc6e51 (Orange - 경고, 주의)
  - `--ds-color-danger`: #ed5565 (Red - 위험, 오류)
  - `--ds-color-info`: #1cb6ed (Blue - 정보, 안내)
- **Extended Palette**:
  - `--ds-color-pink`: #ec87c0
  - `--ds-color-purple`: #ac92ec
  - `--ds-color-yellow`: #ffce54
  - `--ds-color-green`: #a0d468
  - `--ds-color-mint`: #48cfad
  - `--ds-color-lightblue`: #4fc1e9
  - `--ds-color-blue`: #5d9cec
  - `--ds-color-dark`: #434a54
  - `--ds-color-light`: #aab2bd
- **Layout Colors**:
  - Backgrounds: `--ds-color-background`, `--ds-color-surface`
  - Text: `--ds-text-primary`, `--ds-text-secondary`, `--ds-text-tertiary`
  - Borders: `--ds-color-border`, `--ds-color-border-subtle`, `--ds-color-border-strong`
  - Buttons: `--ds-button-primary-bg`, `--ds-button-secondary-bg`
- **Dark Mode**: 자동 반전 지원 (`[data-theme="dark"]`)

### 2. Typography (`design-system\tokens\typography.css`)
- **Font Families**:
  - `--ds-font-sans`: Pretendard 기반
  - `--ds-font-mono`: JetBrains Mono 기반
- **Font Sizes**:
  - `--ds-text-xs`: 0.75rem (12px)
  - `--ds-text-sm`: 0.875rem (14px)
  - `--ds-text-base`: 1rem (16px)
  - `--ds-text-lg` ~ `--ds-text-6xl`
- **Font Weights**:
  - `--ds-font-normal`: 400
  - `--ds-font-medium`: 500
  - `--ds-font-semibold`: 600
  - `--ds-font-bold`: 700
- **Line Heights**: `--ds-leading-none` ~ `--ds-leading-loose`

### 3. Spacing (`design-system\tokens\spacing.css`)
- **4px Grid System**:
  - `--ds-space-0`: 0
  - `--ds-space-1`: 0.25rem (4px)
  - `--ds-space-2`: 0.5rem (8px)
  - ... up to `--ds-space-40`: 10rem (160px)
- **Border Radius**:
  - `--ds-radius-none`: 0
  - `--ds-radius-sm` ~ `--ds-radius-3xl`
  - `--ds-radius-full`: 9999px
- **Container Widths**:
  - `--ds-container-xs` ~ `--ds-container-7xl`
  - `--ds-container-full`: 100%
- **Z-Index Scale**: `--ds-z-0` ~ `--ds-z-tooltip`

### 4. Shadows (`design-system\tokens\shadows.css`)
- **Box Shadows (Black only)**:
  - `--ds-shadow-xs`: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
  - `--ds-shadow-sm`: 0 2px 4px 0 rgba(0, 0, 0, 0.06)
  - `--ds-shadow-md`: 0 4px 8px 0 rgba(0, 0, 0, 0.08)
  - `--ds-shadow-lg`: 0 8px 16px 0 rgba(0, 0, 0, 0.10)
  - `--ds-shadow-xl`: 0 16px 32px 0 rgba(0, 0, 0, 0.12)
  - `--ds-shadow-2xl`: 0 24px 48px 0 rgba(0, 0, 0, 0.14)
- **Overlays**: `--ds-overlay-light`, `--ds-overlay-medium`, `--ds-overlay-dark`

## 📁 파일 구조 및 매핑

### HTML 페이지와 CSS 파일 대응 관계

```
pages/
├── design-tokens/
│   ├── colors.html        → design-system/tokens/colors.css [⛔ 수정 금지]
│   ├── typography.html    → design-system/tokens/typography.css
│   ├── spacing.html       → design-system/tokens/spacing.css
│   ├── shadows.html       → design-system/tokens/shadows.css
│   └── borders.html       → design-system/tokens/borders.css
│
└── [모든 페이지 공통 적용]
    ├── design-system/base/base.css      # 기본 리셋 및 베이스 스타일
    └── layout/css/layout-vitepress.css  # 레이아웃 및 페이지별 스타일
```

### CSS 파일 역할 정의

#### 1. Token CSS Files (디자인 토큰 정의)
- **`colors.css`**: 색상 변수 정의 (Core, Gray Scale, Semantic UI, Extended Palette) **[⛔ 수정 금지 파일]**
- **`typography.css`**: 타이포그래피 변수 및 유틸리티 클래스
- **`spacing.css`**: 간격, 크기, z-index 변수
- **`shadows.css`**: 그림자 효과 변수 (Black-only shadows)
- **`borders.css`**: 테두리 관련 변수 및 유틸리티 클래스

#### 2. Base CSS Files (기본 스타일)
- **`base.css`**: CSS 리셋, 기본 HTML 요소 스타일

#### 3. Layout CSS Files (레이아웃 및 컴포넌트)
- **`layout-vitepress.css`**:
  - VitePress 스타일 레이아웃
  - 사이드바, 헤더, 네비게이션
  - 페이지별 특수 스타일:
    * Typography 페이지 스타일
    * Spacing 페이지 스타일
    * Shadows 페이지 스타일
    * Borders 페이지 스타일
    * Colors 페이지 스타일

## 🔧 개발 체크리스트

### 페이지 작성 시 확인사항
- [ ] 모든 색상값이 CSS 변수를 사용하는가?
- [ ] 인라인 스타일이 없는가?
- [ ] `<style>` 태그가 HTML 내에 없는가?
- [ ] 모든 간격이 spacing 변수를 사용하는가?
- [ ] 그림자 효과가 shadow 변수를 사용하는가?
- [ ] 타이포그래피가 typography 변수를 사용하는가?
- [ ] 다크모드에서 정상 작동하는가?

### CSS 작성 시 확인사항
- [ ] `--ds-` 접두사를 사용했는가?
- [ ] 하드코딩된 값이 없는가?
- [ ] 적절한 CSS 파일에 정의했는가?
- [ ] 재사용 가능한 유틸리티 클래스로 작성했는가?

## 💡 Best Practices

### DO ✅
- CSS 변수를 최대한 활용
- 의미있는 클래스명 사용
- 재사용 가능한 컴포넌트 스타일 작성
- 모바일 퍼스트 반응형 디자인

### DON'T ❌
- 인라인 스타일 사용
- HTML 내 `<style>` 태그 사용
- 색상, 크기, 간격 하드코딩
- `!important` 남용
- 외부 CSS 프레임워크 의존

## 📚 참고 자료

### 주요 변수 접두사
- `--ds-`: Design System 전역 변수
- `--vp-`: VitePress 레이아웃 전용 변수

### 네이밍 컨벤션
- **Core Colors**: `--ds-black`, `--ds-white`
- **Gray Colors**: `--ds-gray-[level]` (0~1000)
- **Semantic Colors**: `--ds-color-[name]` (success, warning, danger, info)
- **Extended Colors**: `--ds-color-[name]` (pink, purple, yellow, etc.)
- **Typography**: `--ds-text-[size]`, `--ds-font-[weight]`
- **Spacing**: `--ds-space-[size]`, `--ds-radius-[size]`
- **Shadows**: `--ds-shadow-[size]`
- **Borders**: `--ds-border-width-[size]`, `--ds-border-color-[name]`

### 다크모드 구현
```css
/* Light mode (default) */
:root {
  --ds-black: #000000;
  --ds-white: #FFFFFF;
}

/* Dark mode */
[data-theme="dark"] {
  --ds-black: #FFFFFF;  /* 반전 */
  --ds-white: #000000;  /* 반전 */
}
```



