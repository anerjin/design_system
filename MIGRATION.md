# 마이그레이션 가이드

이 문서는 BRICKS 디자인 시스템의 이전 버전에서 새 버전으로 마이그레이션하는 방법을 설명합니다.

## 📋 목차
- [v1.0.0에서 v2.0.0으로](#v100에서-v200으로)
- [폴더 구조 변경](#폴더-구조-변경)
- [경로 업데이트](#경로-업데이트)
- [TypeScript 마이그레이션](#typescript-마이그레이션)
- [React 컴포넌트 사용](#react-컴포넌트-사용)

---

## v1.0.0에서 v2.0.0으로

### 주요 변경 사항 요약
- 폴더 구조 전면 개편
- TypeScript 지원 추가
- React 컴포넌트 라이브러리 제공
- 빌드 시스템 개선

## 폴더 구조 변경

### 이전 구조 → 새 구조

| 이전 경로 | 새 경로 | 설명 |
|-----------|---------|------|
| `bricks/` | `core/` | 핵심 디자인 시스템 |
| `bricks/css/` | `core/styles/` | CSS 스타일 파일 |
| `bricks/js/` | `core/scripts/` | JavaScript 파일 |
| `pages/` | `docs/` | 문서 및 데모 페이지 |
| `theme/` | `templates/` | 템플릿 예제 |
| `_guide/` | `guides/` | 프로젝트 가이드 |
| `layout/css/index.css` | `core/styles/bundle.css` | 번들된 CSS |

### 마이그레이션 스크립트

기존 프로젝트를 새 구조로 변경하려면:

```bash
# 1. 백업 생성
git checkout -b migration-backup
git add . && git commit -m "Backup before migration"

# 2. 폴더 이름 변경
mv bricks core
mv pages docs
mv theme templates
mv _guide guides

# 3. 내부 구조 정리
mv core/css core/styles
mv core/js core/scripts

# 4. CSS 번들 이동
mkdir -p core/styles
mv layout/css/index.css core/styles/bundle.css
rm -rf layout
```

## 경로 업데이트

### HTML 파일에서

#### CSS 참조 변경
```html
<!-- 이전 -->
<link rel="stylesheet" href="bricks/css/atoms/button.css">
<link rel="stylesheet" href="layout/css/index.css">

<!-- 새로운 -->
<link rel="stylesheet" href="core/styles/atoms/button.css">
<link rel="stylesheet" href="core/styles/bundle.css">
```

#### JavaScript 참조 변경
```html
<!-- 이전 -->
<script src="bricks/js/bricks_loader.js"></script>

<!-- 새로운 -->
<script src="core/scripts/bricks_loader.js"></script>
```

### CSS 파일에서

#### @import 경로 변경
```css
/* 이전 */
@import url('../../bricks/css/tokens/colors.css');

/* 새로운 */
@import url('../tokens/colors.css');
```

### JavaScript/TypeScript에서

#### 모듈 경로 변경
```javascript
// 이전
import { Component } from './bricks/js/components/button.js';

// 새로운
import { Component } from './core/scripts/components/button.js';
```

## TypeScript 마이그레이션

### JavaScript를 TypeScript로 변환

1. **파일 확장자 변경**
   ```bash
   # .js → .ts 변경
   mv component.js component.ts
   ```

2. **타입 추가**
   ```typescript
   // 이전 (JavaScript)
   function createButton(text, options) {
     // ...
   }

   // 새로운 (TypeScript)
   interface ButtonOptions {
     variant?: 'primary' | 'secondary';
     size?: 'sm' | 'md' | 'lg';
   }

   function createButton(text: string, options?: ButtonOptions): HTMLButtonElement {
     // ...
   }
   ```

3. **타입 정의 파일 활용**
   ```typescript
   import type { ButtonOptions } from '../types/index';
   ```

### 빌드 설정

1. **tsconfig.json 업데이트**
   ```json
   {
     "compilerOptions": {
       "outDir": "./core/scripts",
       "rootDir": "./src",
       "jsx": "react-jsx"
     }
   }
   ```

2. **npm 스크립트 사용**
   ```bash
   npm run build    # TypeScript 컴파일
   npm run watch    # 파일 감지 모드
   ```

## React 컴포넌트 사용

### 설치

```bash
npm install react react-dom
```

### 기본 사용법

```tsx
// React 컴포넌트 import
import { Button } from '@bricks/react';

// 사용
function App() {
  return (
    <Button
      variant="primary"
      size="md"
      onClick={() => console.log('clicked')}
    >
      Click me
    </Button>
  );
}
```

### CSS 클래스 매핑

React 컴포넌트는 기존 CSS 클래스를 그대로 사용합니다:

```tsx
// React props → CSS classes
<Button variant="primary" size="lg" />
// → <button class="bricks-btn bricks-btn-primary bricks-btn-lg">
```

## 호환성 유지

### 이전 버전과의 호환성

이전 경로를 유지하려면 심볼릭 링크를 생성할 수 있습니다:

```bash
# 심볼릭 링크 생성 (선택사항)
ln -s core bricks
ln -s docs pages
ln -s templates theme
```

### 점진적 마이그레이션

1. **Phase 1**: 폴더 구조만 변경
2. **Phase 2**: TypeScript 파일 하나씩 변환
3. **Phase 3**: React 컴포넌트 도입
4. **Phase 4**: 빌드 최적화

## 문제 해결

### 일반적인 문제

#### 1. CSS가 적용되지 않음
- 경로가 올바른지 확인
- `core/styles/bundle.css`가 존재하는지 확인
- 브라우저 캐시 삭제

#### 2. JavaScript 오류
- TypeScript 컴파일 확인: `npm run build`
- 콘솔에서 경로 오류 확인
- BRICKS 네임스페이스 초기화 확인

#### 3. TypeScript 컴파일 오류
- `tsconfig.json` 설정 확인
- 타입 정의 파일 확인
- React 타입 설치: `npm install @types/react`

### 도움 받기

문제가 지속되면:
1. [GitHub Issues](https://github.com/anerjin/private_project_design_system/issues)에 문의
2. [문서](docs/getting-started/introduction.html) 참조
3. [CHANGELOG.md](CHANGELOG.md)에서 변경 사항 확인

## 체크리스트

마이그레이션 완료 확인:

- [ ] 폴더 구조 변경 완료
- [ ] 모든 경로 참조 업데이트
- [ ] TypeScript 컴파일 성공
- [ ] 개발 서버 정상 작동
- [ ] 컴포넌트 데모 페이지 확인
- [ ] 테마 전환 기능 작동
- [ ] 빌드 스크립트 테스트
- [ ] 문서 업데이트

---

**참고**: 이 가이드는 v2.0.0 기준으로 작성되었습니다. 최신 버전은 [GitHub](https://github.com/anerjin/private_project_design_system)에서 확인하세요.


React 컴포넌트가 완전히 없는 것들:
1. Pagination (docs/components/pagination.html)
2. Table (docs/components/table.html)
3. Avatar (docs/elements/avatar.html)
4. Progress (docs/elements/progress.html)
5. Icon (docs/elements/icon.html)
6. Spinner (docs/elements/spinner.html)


 컴포넌트는 있지만 스토리가 없는 것:

  1. Navbar (Navbar.tsx는 있지만 Navbar.stories.tsx가 없음)

  📝 디자인 토큰 (별도 구현 필요):

  1. Typography (docs/elements/typography.html) - 디자인 시스템 요소