import type { Meta, StoryObj } from '@storybook/react';
import Tooltip, { TooltipShortcut } from '../react/Tooltip';

const meta = {
  title: 'Molecules/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Tooltip은 마우스 오버나 키보드 포커스 시 추가 정보를 제공하는 보조 컴포넌트입니다. 접근성을 고려한 ARIA 속성과 다양한 위치, 테마를 지원합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'Tooltip 내용',
    },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Tooltip 위치',
    },
    theme: {
      control: 'radio',
      options: ['dark', 'light'],
      description: '테마 스타일',
    },
    disabled: {
      control: 'boolean',
      description: 'Tooltip 비활성화 여부',
    },
    delay: {
      control: 'number',
      description: '표시 지연 시간 (ms)',
    },
    interactive: {
      control: 'boolean',
      description: 'Tooltip에 마우스 오버 시 유지 여부',
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: '계정 설정을 열어 프로필과 보안 옵션을 확인하세요.',
    placement: 'top',
    theme: 'dark',
    children: (
      <button className="btn btn--ghost">
        <i className='bx bx-cog' aria-hidden="true"></i>
        계정 설정
      </button>
    ),
  },
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(2, 1fr)', minWidth: '300px' }}>
      <Tooltip content="Top placement" placement="top">
        <button className="btn btn--ghost">Top</button>
      </Tooltip>
      <Tooltip content="Bottom placement" placement="bottom">
        <button className="btn btn--ghost">Bottom</button>
      </Tooltip>
      <Tooltip content="Left placement" placement="left">
        <button className="btn btn--ghost">Left</button>
      </Tooltip>
      <Tooltip content="Right placement" placement="right">
        <button className="btn btn--ghost">Right</button>
      </Tooltip>
    </div>
  ),
};

export const Themes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <Tooltip content="Dark theme tooltip" theme="dark">
        <button className="btn btn--ghost">Dark Theme</button>
      </Tooltip>
      <Tooltip content="Light theme tooltip" theme="light">
        <button className="btn btn--ghost">Light Theme</button>
      </Tooltip>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <Tooltip content="계정 설정을 열어 프로필과 보안 옵션을 확인하세요.">
        <button className="btn btn--ghost">
          <i className='bx bx-cog' aria-hidden="true"></i>
          계정 설정
        </button>
      </Tooltip>
      <Tooltip content="신규 공지를 확인하세요.">
        <a href="#" className="btn btn--ghost">
          <i className='bx bx-bell' aria-hidden="true"></i>
          알림
        </a>
      </Tooltip>
      <Tooltip content="도움말 문서를 확인하세요.">
        <button className="btn btn--ghost">
          <i className='bx bx-help-circle' aria-hidden="true"></i>
          도움말
        </button>
      </Tooltip>
    </div>
  ),
};

export const WithShortcut: Story = {
  args: {
    content: <TooltipShortcut label="새 메모" keys={['⌘', 'Shift', 'N']} />,
    theme: 'light',
    children: (
      <button className="btn btn--ghost">
        <i className='bx bx-command' aria-hidden="true"></i>
        단축키
      </button>
    ),
  },
};

export const WithDelay: Story = {
  args: {
    content: '500ms 후에 표시됩니다',
    delay: 500,
    children: <button className="btn btn--primary">Hover me (500ms delay)</button>,
  },
};

export const Interactive: Story = {
  args: {
    content: (
      <div>
        <p>이 Tooltip은 마우스를 올려도 사라지지 않습니다.</p>
        <a href="#" style={{ color: 'var(--ds-prime-400)' }}>클릭 가능한 링크</a>
      </div>
    ),
    interactive: true,
    theme: 'light',
    children: <button className="btn btn--secondary">Interactive Tooltip</button>,
  },
};

export const Disabled: Story = {
  args: {
    content: '이 Tooltip은 비활성화되어 있습니다',
    disabled: true,
    children: <button className="btn btn--ghost">Disabled Tooltip</button>,
  },
};

export const LongContent: Story = {
  args: {
    content: '이것은 매우 긴 Tooltip 내용입니다. Tooltip은 최대 너비가 제한되어 있어 긴 텍스트는 자동으로 줄바꿈됩니다. 모바일에서는 더 작은 최대 너비가 적용됩니다.',
    placement: 'bottom',
    children: <button className="btn btn--primary">Long Content</button>,
  },
};

export const CustomContent: Story = {
  args: {
    content: (
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🎯</div>
        <strong>커스텀 콘텐츠</strong>
        <p style={{ margin: '0.5rem 0 0' }}>React 노드를 사용한 풍부한 콘텐츠</p>
      </div>
    ),
    theme: 'light',
    placement: 'right',
    children: <button className="btn btn--secondary">Custom Content</button>,
  },
};

export const OnLinks: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Tooltip content="홈으로 이동">
        <a href="#" className="link">홈</a>
      </Tooltip>
      <Tooltip content="프로필 페이지로 이동">
        <a href="#" className="link">프로필</a>
      </Tooltip>
      <Tooltip content="설정 페이지로 이동">
        <a href="#" className="link">설정</a>
      </Tooltip>
    </div>
  ),
};

export const AccessibilityExample: Story = {
  render: () => (
    <div style={{ padding: '2rem' }}>
      <h3 style={{ marginBottom: '1rem' }}>접근성 기능</h3>
      <ul style={{ marginBottom: '2rem', textAlign: 'left' }}>
        <li>키보드 Tab으로 포커스 이동 시 Tooltip 표시</li>
        <li>Escape 키로 Tooltip 닫기</li>
        <li>aria-describedby로 스크린 리더 지원</li>
        <li>role="tooltip"으로 역할 명시</li>
      </ul>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Tooltip content="Tab 키로 포커스하면 표시됩니다">
          <button className="btn btn--primary">포커스 가능</button>
        </Tooltip>
        <Tooltip content="Escape 키를 누르면 닫힙니다">
          <button className="btn btn--secondary">Esc로 닫기</button>
        </Tooltip>
      </div>
    </div>
  ),
};