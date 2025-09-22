# 변경 로그

이 프로젝트의 모든 주요 변경 사항은 이 파일에 문서화됩니다.
형식은 [Keep a Changelog](https://keepachangelog.com/ko/1.0.0/)를 기반으로 하며,
이 프로젝트는 [Semantic Versioning](https://semver.org/spec/v2.0.0.html)을 준수합니다.

## [Unreleased]

### 🚀 추가됨
- TypeScript 지원 추가
- React 컴포넌트 라이브러리 초기 버전
- 디자인 토큰 시스템 구현
- 다크/라이트 테마 자동 전환 기능
- 접근성 개선 (WCAG 2.1 AA 준수)

### 🔄 변경됨
- 프로젝트 구조 대규모 개선
  - `bricks/` → `core/` 폴더명 변경
  - `pages/` → `docs/` 폴더명 변경
  - `theme/` → `templates/` 폴더명 변경
  - `_guide/` → `guides/` 폴더명 변경
- CSS 구조 개선
  - `core/css/` → `core/styles/` 경로 변경
  - `core/js/` → `core/scripts/` 경로 변경
- 빌드 시스템 개선
  - TypeScript 컴파일 설정 추가
  - npm 스크립트 업데이트

### 🐛 수정됨
- 컴포넌트 JavaScript 파일들의 타입 안정성 향상
- 경로 참조 오류 수정

### 📦 의존성
- React 19.1.1 추가
- TypeScript 5.9.2 추가
- @types/react, @types/react-dom 추가

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