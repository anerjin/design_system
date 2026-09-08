# Interactive components

DOI INC는 컨텍스트 메뉴에 [Base UI](https://base-ui.com/react/components/context-menu), 패널 분할에 [react-resizable-panels](https://github.com/bvaughn/react-resizable-panels), 공식 차트 엔진으로 [Chart.js](https://www.chartjs.org/docs/latest/)를 사용합니다. 패키지 의존성에 포함되어 별도의 CDN 스크립트는 필요하지 않습니다.

```tsx
import '@bricks/core/styles';
import {
  ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem,
  ResizablePanelGroup, ResizablePanel, ResizableHandle, Chart,
} from '@bricks/core';
```

## ContextMenu · DOI-C-CONTEXT-MENU

```tsx
<ContextMenu>
  <ContextMenuTrigger aria-label="파일 작업">파일을 우클릭하세요.</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem onClick={() => duplicateFile()}>복제</ContextMenuItem>
    <ContextMenuItem disabled>붙여넣기</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
```

우클릭·터치 길게 누르기·Shift+F10으로 열고, 방향키·Enter·Escape로 조작합니다. 화면에서 동일한 작업을 수행할 수 있는 버튼도 함께 제공하세요. `ContextMenuSub`, `ContextMenuCheckboxItem`, `ContextMenuRadioGroup` 등으로 구성할 수 있습니다. `ContextMenuShortcut`은 단축키 표시용이며 키 바인딩을 자동으로 등록하지 않습니다.

## Resizable · DOI-C-RESIZABLE

```tsx
<ResizablePanelGroup orientation="horizontal" style={{ height: 300 }}>
  <ResizablePanel defaultSize="30%" minSize="20%">사이드바</ResizablePanel>
  <ResizableHandle withHandle aria-label="사이드바 너비 조절" />
  <ResizablePanel minSize="30%">본문</ResizablePanel>
</ResizablePanelGroup>
```

그룹 또는 부모에 높이를 지정합니다. 패널 크기의 숫자는 px이고 비율은 `"30%"`처럼 표시합니다. `orientation="vertical"`로 세로 분할을 구성하며 `collapsible`, `panelRef`의 `collapse()`·`expand()`로 패널을 접습니다. `onLayoutChanged`는 조절 완료 후 ID별 비율을 반환합니다. 저장이 필요하면 이 콜백을 앱의 저장소에 연결합니다.

## Chart · DOI-C-CHART

```tsx
<Chart
  type="bar"
  title="월별 매출"
  data={[{ label: '1월', value: 65 }, { label: '2월', value: 80 }]}
  height={300}
/>
```

기존 `data`, `datasets`, `labels`, `theme` 사용법을 유지합니다. `bar`, `line`, `area`, `pie`, `doughnut`, `radar`, `polarArea`를 지원하며 `area`는 Chart.js의 채워진 line으로 변환됩니다. `options`에 공식 Chart.js 옵션을 전달할 수 있습니다. 표시 여부는 `showLegend`, `showTooltip`, `showGrid`로 지정합니다.

데이터 변경은 같은 인스턴스에서 반영하고 차트 유형 변경·컴포넌트 해제 시 이전 인스턴스를 정리합니다. 테마와 컨테이너 크기 변경을 따라가며, 스크린 리더용 데이터 표도 제공합니다. 캔버스의 범례를 클릭하면 시리즈 또는 원형 차트의 항목을 숨길 수 있습니다.
