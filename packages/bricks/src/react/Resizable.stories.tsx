import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle, usePanelRef } from './Resizable';
import { Button } from './Button';
import { Icon } from './Icon';
const meta: Meta<typeof ResizablePanelGroup> = {
  title: 'Layout/Resizable',
  component: ResizablePanelGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    gallery: {
      description:
        'react-resizable-panels 기반 패널 레이아웃. 구분선을 드래그하거나 방향키로 가로·세로 크기를 조절합니다. 최소 크기, 중첩 분할, 접기를 지원합니다.',
      props: [
        { name: 'orientation', type: 'horizontal | vertical', defaultValue: 'horizontal' },
        {
          name: 'onLayoutChanged',
          type: '(layout, meta) => void',
          description: '조절 완료 후 패널 ID별 비율 반환',
        },
        {
          name: 'defaultSize / minSize / maxSize',
          type: 'number | string',
          description: '숫자는 px, 비율은 "30%"처럼 명시',
        },
        { name: 'collapsible', type: 'boolean', defaultValue: 'false' },
        {
          name: 'panelRef',
          type: 'Ref<PanelImperativeHandle>',
          description: 'collapse() / expand() / resize()',
        },
        { name: 'withHandle', type: 'boolean', defaultValue: 'false', description: '구분선에 손잡이 표시' },
      ],
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  name: '가로 분할',
  render: () => (
    <ResizablePanelGroup className="doi-resizable-demo" style={{ height: 300 }}>
      <ResizablePanel defaultSize="30%" minSize="20%">
        <div className="doi-resizable-cell">
          <Icon name="folder" size={24} />
          <strong>사이드바</strong>
          <span className="text-xs opacity-60">최소 20%</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel minSize="30%">
        <div className="doi-resizable-cell">
          <strong>작업 영역</strong>
          <span className="text-sm opacity-60">구분선을 드래그해 보세요.</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};
export const Vertical: Story = {
  name: '세로 분할',
  render: () => (
    <ResizablePanelGroup orientation="vertical" className="doi-resizable-demo" style={{ height: 300 }}>
      <ResizablePanel defaultSize="60%" minSize="25%">
        <div className="doi-resizable-cell">편집기</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel minSize="20%">
        <div className="doi-resizable-cell">실행 결과</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};
export const Nested: Story = {
  name: '중첩 레이아웃',
  render: () => (
    <ResizablePanelGroup className="doi-resizable-demo" style={{ height: 360 }}>
      <ResizablePanel defaultSize="30%" minSize="20%">
        <div className="doi-resizable-cell">파일</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel minSize="40%">
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel defaultSize="60%" minSize="25%">
            <div className="doi-resizable-cell">코드 편집기</div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize="20%">
            <div className="doi-resizable-cell">터미널</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};
export const Collapsible: Story = {
  name: '패널 접기',
  render: function Collapse() {
    const panelRef = usePanelRef();
    return (
      <div className="grid gap-4">
        <div className="flex gap-2">
          <Button variant="surface" size="sm" onClick={() => panelRef.current?.collapse()}>
            사이드바 접기
          </Button>
          <Button variant="surface" size="sm" onClick={() => panelRef.current?.expand()}>
            사이드바 펼치기
          </Button>
        </div>
        <ResizablePanelGroup className="doi-resizable-demo" style={{ height: 300 }}>
          <ResizablePanel panelRef={panelRef} defaultSize="30%" minSize="20%" collapsible collapsedSize="0%">
            <div className="doi-resizable-cell">사이드바</div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize="30%">
            <div className="doi-resizable-cell">본문</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    );
  },
};
export const LayoutChange: Story = {
  name: '비율 확인',
  render: function Layout() {
    const [ratio, setRatio] = useState(50);
    return (
      <div className="grid gap-4">
        <ResizablePanelGroup
          className="doi-resizable-demo"
          style={{ height: 300 }}
          onLayoutChanged={(layout) => setRatio(Math.round(layout.left))}
        >
          <ResizablePanel id="left" defaultSize="50%" minSize="20%" maxSize="80%">
            <div className="doi-resizable-cell">왼쪽</div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel id="right" minSize="20%">
            <div className="doi-resizable-cell">오른쪽</div>
          </ResizablePanel>
        </ResizablePanelGroup>
        <p role="status" className="text-sm">
          왼쪽 {ratio}% · 오른쪽 {100 - ratio}%
        </p>
      </div>
    );
  },
};
