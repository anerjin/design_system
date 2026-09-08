import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Collapse } from './Collapse';
import type { CollapseIcon, CollapseVariant } from './Collapse';
import { Button } from './Button';

const ICONS: CollapseIcon[] = ['arrow', 'plus', 'none'];
const VARIANTS: CollapseVariant[] = ['bordered', 'ghost', 'filled'];

const meta: Meta<typeof Collapse> = {
  title: 'Data Display/Collapse',
  component: Collapse,
  parameters: {
    layout: 'padded',
    gallery: {
      description: '하나만 접었다 펴는 영역. 여러 항목을 묶으려면 Accordion을 쓴다.',
      daisyui: 'collapse',
      props: [
        { name: 'title', type: 'ReactNode', description: '제목 줄' },
        { name: 'icon', type: 'arrow | plus | none', defaultValue: 'arrow' },
        { name: 'variant', type: 'bordered | ghost | filled', defaultValue: 'bordered' },
        { name: 'defaultOpen', type: 'boolean', defaultValue: 'false' },
        { name: 'open', type: 'boolean', description: '제어 컴포넌트로 쓸 때' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    icon: { control: 'select', options: ICONS },
    variant: { control: 'select', options: VARIANTS },
    defaultOpen: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '자세히 보기',
    children: '접혀 있던 내용입니다. 여러 항목을 묶어 관리하려면 Accordion을 쓰세요.',
    defaultOpen: true,
  },
  render: (args) => <div className="w-full max-w-96"><Collapse {...args} /></div>,
};

export const Icons: Story = {
  render: () => (
    <div className="flex w-full max-w-96 flex-col gap-3">
      {ICONS.map((icon) => (
        <Collapse key={icon} icon={icon} title={`icon="${icon}"`} defaultOpen>
          펼침 표시가 달라집니다.
        </Collapse>
      ))}
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex w-full max-w-96 flex-col gap-3">
      {VARIANTS.map((variant) => (
        <Collapse key={variant} variant={variant} title={variant} defaultOpen>
          배경과 테두리가 달라집니다.
        </Collapse>
      ))}
    </div>
  ),
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [open, setOpen] = useState(false);

    return (
      <div className="flex w-full max-w-96 flex-col gap-3">
        <Button size="sm" variant="outline" onClick={() => setOpen((v) => !v)}>
          바깥에서 {open ? '닫기' : '열기'}
        </Button>
        <Collapse title="제어되는 항목" open={open} onOpenChange={setOpen}>
          바깥 버튼으로도, 제목을 눌러서도 열고 닫을 수 있습니다.
        </Collapse>
      </div>
    );
  },
};
