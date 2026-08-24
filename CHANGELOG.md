# 변경 로그

이 프로젝트의 모든 주요 변경 사항은 이 파일에 문서화됩니다.
형식은 [Keep a Changelog](https://keepachangelog.com/ko/1.0.0/)를 기반으로 하며,
이 프로젝트는 [Semantic Versioning](https://semver.org/spec/v2.0.0.html)을 준수합니다.

## [Unreleased]

### 🚀 추가됨
- TypeScript 지원 및 React 컴포넌트 라이브러리 (`@bricks/core`, 25종)
- 디자인 토큰 시스템 (`--ds-*` CSS 변수)
- `[data-theme="dark"]` 기반 다크/라이트 테마
- Storybook 문서화 (405개 스토리, Foundation 카테고리 포함)
- 루트 `README.md` 추가

### 🔄 변경됨
- npm workspaces 모노레포로 전환 — 디자인 시스템은 `packages/bricks` 로 이동
- 정적 HTML 문서 사이트를 `html_markup/` 으로 분리 (사이드바 + iframe 프레임셋 구조)
- CSS 구조 정리 — `core/styles/` 하위에 `base` → `tokens` → `layout` → `atoms` → `molecules` → `utilities`
- `CLAUDE.md` 를 실제 저장소 구조에 맞게 전면 재작성
- `USAGE.md` 를 실제 패키지명(`@bricks/core`)과 export 경로 기준으로 재작성
- GitHub Actions 워크플로우를 `deploy.yml` → `ci.yml` 로 교체 — 이 저장소는 private 이고
  Pages 가 활성화되어 있지 않아 배포가 불가능하므로, 빌드 검증(패키지 빌드 · CSS/JS 번들 ·
  Storybook 정적 빌드)만 수행. 액션은 `@v5`, Node 는 22 로 상향

### ❌ 삭제됨
- `apps/showcase` (Next.js 쇼케이스 앱) — 저장소에서 제거됨. 관련 npm 스크립트와 워크플로우 단계도 함께 정리
- `MIGRATION.md` — 이미 완료된 v1→v2 폴더 이동 가이드로, 현재 존재하지 않는 경로를 안내하고 있어 삭제
- 커밋되어 있던 `packages/bricks/core/scripts/` 생성물 289개 — `tsc` 산출물이므로 추적 해제 후 `.gitignore` 등록
- `html_markup` 의 미참조 파일 — `index.json`, `assets/js/navigation.js`, `assets/js/codeHighlighter.js`, `assets/css/codeHighlighter.css`

### 📦 의존성
- React 18.3.1 (peer: `^18.0.0 || ^19.0.0`)
- TypeScript 5.7.3
- Storybook 10.1.11 (`@storybook/react-vite`)
- Vite 5.4.11

## [1.0.0] - 2024-09-21

### 초기 릴리스
- BRICKS 디자인 시스템 기본 구조 구현
- HTML/CSS/JavaScript 기반 컴포넌트 라이브러리
- 기본 컴포넌트 세트:
  - **Atoms**: Button, Input, Badge, Checkbox, Radio, Toggle, Avatar, Progress, Spinner, Select
  - **Molecules**: Card, Alert, Modal, Dropdown, Tabs, Accordion, Datepicker, Pagination, Breadcrumb, Navbar, Table, Chart
- 레이아웃 시스템 (Grid, Container, Flexbox)
- 유틸리티 클래스 (Display, Position, Overflow)
- 인터랙티브 문서 사이트
- 템플릿 예제 (Dashboard, Settings, Widget)

## [0.9.0] - 2024-09-19

### 베타 릴리스
- 프로젝트 초기 설정
- 기본 폴더 구조 생성
- CSS 토큰 시스템 구현
- 기본 컴포넌트 프로토타입

---

## 버전 관리 가이드

### 버전 번호 형식
- **Major (X.0.0)**: 하위 호환성이 없는 API 변경
- **Minor (0.X.0)**: 하위 호환성 있는 기능 추가
- **Patch (0.0.X)**: 하위 호환성 있는 버그 수정

### 변경 유형
- 🚀 **추가됨** (Added): 새로운 기능
- 🔄 **변경됨** (Changed): 기존 기능 변경
- 🗑️ **제거됨** (Deprecated): 곧 제거될 기능
- ❌ **삭제됨** (Removed): 제거된 기능
- 🐛 **수정됨** (Fixed): 버그 수정
- 🔒 **보안** (Security): 보안 취약점 수정



⏺ 🎯 BRICKS 디자인 시스템 사용 방법

  방법 1: 직접 복사 (가장 간단)

  # 프로젝트의 components 폴더에 직접 복사
  cp -r src/react/* YOUR_PROJECT/components/
  cp -r core/styles/* YOUR_PROJECT/styles/

  방법 2: Git Submodule

  # 프로젝트에 서브모듈로 추가
  git submodule add https://github.com/anerjin/private_project_design_system.git libs/bricks

  # 사용하기
  import { Button } from './libs/bricks/src/react/Button';
  import './libs/bricks/core/styles/bundle.css';

  방법 3: NPM 로컬 패키지

  # BRICKS 폴더에서
  npm run build:lib
  npm pack

  # 프로젝트 폴더에서
  npm install ../private_project_design_system/yourusername-bricks-design-system-1.0.0.tgz

  방법 4: NPM 배포 (공개 배포시)

  # package.json의 name을 수정 (@yourusername → 실제 사용자명)
  # NPM 로그인
  npm login

  # 배포
  npm publish --access public

  # 다른 프로젝트에서 설치
  npm install @yourusername/bricks-design-system

  Next.js 프로젝트에서 사용 예시:

  // app/layout.tsx
  import '@yourusername/bricks-design-system/core/styles/bundle.css';
  import 'boxicons/css/boxicons.min.css';

  // app/page.tsx
  import { Button, Card } from '@yourusername/bricks-design-system';

  export default function Home() {
    return (
      <Card>
        <Button variant="primary">Click me</Button>
      </Card>
    );
  }

  React (CRA) 프로젝트에서 사용:

  // index.tsx
  import '@yourusername/bricks-design-system/core/styles/bundle.css';
  import 'boxicons/css/boxicons.min.css';

  // App.tsx
  import { Button, Input } from '@yourusername/bricks-design-system';

  추천 방법:
  - 개인 프로젝트: 방법 1 (직접 복사) 또는 방법 2 (Git Submodule)
  - 팀 프로젝트: 방법 3 (NPM 로컬) 또는 방법 4 (NPM 배포)