# BRICKS 디자인 시스템

BRICKS는 HTML/CSS/JS 기반의 모던한 디자인 시스템으로, TypeScript와 React를 지원하며 다크·라이트 테마를 제공합니다. 컴포넌트 기반 아키텍처로 문서화·프로토타이핑·빠른 UI 개발을 지원합니다.

## ✨ 주요 특징

- 🎨 **다크/라이트 테마** - 자동 테마 전환 지원
- 📦 **모듈식 구조** - Atomic Design 패턴 적용
- 🔧 **TypeScript 지원** - 완전한 타입 정의
- ⚛️ **React 컴포넌트** - React 버전 제공
- 📚 **종합 문서** - 인터랙티브 카탈로그 제공
- ♿ **접근성** - WCAG 2.1 AA 준수

## 📁 프로젝트 구조

```
private_project_design_system/
├── core/                  # 핵심 디자인 시스템
│   ├── styles/           # CSS 스타일
│   │   ├── tokens/       # 디자인 토큰 (색상, 타이포그래피 등)
│   │   ├── base/         # 리셋 및 기본 스타일
│   │   ├── atoms/        # 기본 컴포넌트
│   │   ├── molecules/    # 복합 컴포넌트
│   │   ├── layout/       # 레이아웃 시스템
│   │   ├── utilities/    # 유틸리티 클래스
│   │   └── bundle.css    # 번들된 CSS
│   └── scripts/          # JavaScript/TypeScript
│       └── components/   # 컴포넌트 스크립트
│
├── src/                  # 소스 코드
│   ├── components/       # TypeScript 컴포넌트
│   ├── react/           # React 컴포넌트
│   ├── types/           # TypeScript 타입 정의
│   └── next/            # Next.js 컴포넌트
│
├── docs/                 # 문서 및 데모
│   ├── components/       # 컴포넌트 데모
│   ├── design-tokens/    # 토큰 문서
│   ├── getting-started/  # 시작 가이드
│   └── utilities/        # 유틸리티 문서
│
├── templates/            # 템플릿 예제
│   ├── dashboard/        # 대시보드 템플릿
│   ├── setting/         # 설정 페이지
│   └── widget/          # 위젯 템플릿
│
├── dist/                # 빌드 결과물
├── tests/               # 테스트 파일
├── scripts/             # 빌드/배포 스크립트
└── guides/              # 프로젝트 가이드
```

## 🚀 시작하기

### NPM 패키지로 사용하기

React 프로젝트에서 BRICKS 디자인 시스템을 사용하는 방법:

```bash
# npm으로 설치
npm install @ultraworks/bricks-design-system

# 또는 yarn
yarn add @ultraworks/bricks-design-system

# peer dependencies도 함께 설치
npm install react react-dom boxicons
```

**사용 예시:**

```tsx
// 1. CSS 스타일 임포트 (앱의 최상위에서 한 번만)
import '@ultraworks/bricks-design-system/styles';

// 2. 컴포넌트 임포트
import { Button, Input, Modal, Card } from '@ultraworks/bricks-design-system';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Card>
        <Card.Header>
          <Card.Title>환영합니다</Card.Title>
        </Card.Header>
        <Card.Body>
          <Input placeholder="이름을 입력하세요" />
          <Button
            variant="primary"
            onClick={() => setIsOpen(true)}
          >
            모달 열기
          </Button>
        </Card.Body>
      </Card>

      <Modal open={isOpen} onClose={() => setIsOpen(false)} title="알림">
        <p>BRICKS 디자인 시스템을 사용해주셔서 감사합니다!</p>
      </Modal>
    </div>
  );
}
```

**개별 스타일 파일 임포트:**

```tsx
// 특정 스타일만 임포트 (선택적)
import '@ultraworks/bricks-design-system/styles/base/reset.css';
import '@ultraworks/bricks-design-system/styles/tokens/colors.css';
```

### 로컬 개발

프로젝트를 클론하여 로컬에서 개발하는 방법:

```bash
# 저장소 클론
git clone https://github.com/anerjin/private_project_design_system.git

# 의존성 설치
npm install

# 스토리북 실행
npm run storybook

# 또는 정적 서버 실행
npm run serve
```

브라우저에서 `http://localhost:6006` (스토리북) 또는 `http://localhost:8000` (정적 서버)으로 접속하여 카탈로그를 확인합니다.

### TypeScript 빌드

```bash
# TypeScript 컴파일
npm run build

# 파일 변경 감지 모드
npm run watch

# 전체 빌드 (CSS + TypeScript)
npm run build:all
```

## 💻 개발 가이드

### CSS 작성 규칙
- **네이밍**: BEM 방법론 사용 (`.block__element--modifier`)
- **들여쓰기**: 2 스페이스
- **구조**: 토큰 → 베이스 → 컴포넌트 → 유틸리티 순서
- **변수**: CSS 커스텀 속성 활용 (`--ds-*` 프리픽스)

### TypeScript/JavaScript
- **네임스페이스**: `BRICKS` 글로벌 네임스페이스 사용
- **타입 정의**: `src/types/index.d.ts`에 인터페이스 정의
- **컴포넌트**: `src/components/`에 TypeScript 버전 작성
- **React**: `src/react/`에 React 컴포넌트 작성

### 컴포넌트 개발
1. `src/components/`에 TypeScript 파일 생성
2. `src/types/`에 타입 정의 추가
3. `docs/components/`에 데모 페이지 작성
4. 테스트 작성 및 검증

## 🧪 테스트

```bash
# 단위 테스트 실행 (추가 예정)
npm test

# E2E 테스트 (추가 예정)
npm run test:e2e
```

수동 테스트 체크리스트:
- ✅ 라이트/다크 테마 전환
- ✅ 키보드 접근성 (Tab, Enter, Escape)
- ✅ 반응형 레이아웃
- ✅ 크로스 브라우저 호환성

## 📦 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build:all

# 정리
npm run clean
```

## 🤝 기여하기

### 브랜치 전략
- `main` - 프로덕션 브랜치
- `develop` - 개발 브랜치
- `feature/*` - 기능 개발
- `fix/*` - 버그 수정

### 커밋 메시지
```
type(scope): description

예시:
feat(button): Add loading state
fix(modal): Fix focus trap issue
docs(readme): Update installation guide
```

### Pull Request
- 간단한 설명과 변경 사항 포함
- 시각적 변경 시 스크린샷 첨부
- 관련 이슈 번호 연결

## 📚 문서

- [시작 가이드](docs/getting-started/introduction.html)
- [컴포넌트 카탈로그](index.html)
- [마이그레이션 가이드](MIGRATION.md)
- [변경 로그](CHANGELOG.md)

## 🔗 관련 링크

- [GitHub Repository](https://github.com/anerjin/private_project_design_system)
- [이슈 트래커](https://github.com/anerjin/private_project_design_system/issues)

## 📄 라이선스

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일을 참고하세요.

---

<p align="center">
  Made with ❤️ by BRICKS Team
</p>