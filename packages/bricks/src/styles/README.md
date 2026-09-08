# DOI INC component design

공통 컴포넌트의 시각적 기준은 [shadcn/ui New York](https://github.com/shadcn-ui/ui/tree/main/apps/v4/registry/new-york-v4/ui)의 비율과 상태 표현을 참고합니다. React API와 네이티브 컨트롤 동작은 기존 `@bricks/core` 구현을 사용합니다.

| 요소                    | xs   | sm   | md (기본) | lg   | xl   |
| ----------------------- | ---- | ---- | --------- | ---- | ---- |
| 버튼·입력창·셀렉트 높이 | 24px | 32px | 36px      | 40px | 48px |
| 체크박스·라디오         | 12px | 14px | 16px      | 20px | 24px |
| 스위치 높이             | 16px | 18px | 20px      | 24px | 28px |

- 일반 UI 텍스트는 14px, 설명·배지는 12px, 카드 제목은 16px입니다.
- 화이트·다크 바탕에 회색 테두리로 영역을 구분하고, 프라임은 검정/다크 모드의 밝은색, 서브는 바이올렛입니다.
- `themes.css`는 색상, `shape.css`는 모양, `type.css`는 글자 크기, `components.css`는 컨트롤의 크기·상태·그림자를 관리합니다.
- 예제의 박스는 `examples.css`에서 같은 `--doi-shadow-panel`을 사용합니다. 별도 모듈 CSS에서 공통 컨트롤의 외형을 덮어쓰지 않습니다.
- 포커스·오류·비활성 상태를 함께 유지합니다. 체크박스와 라디오는 라벨도 클릭할 수 있고, 스위치 손잡이는 모든 크기에서 원형입니다.
- 아이콘은 Lucide를 사용합니다. 셀렉트의 배경 아이콘도 공식 `ChevronDown` SVG에서 생성했습니다.

이 스타일은 갤러리, Storybook, 배포용 CSS와 `bricks-tokens.css`에 함께 포함됩니다.
