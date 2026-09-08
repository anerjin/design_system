import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from './Accordion';
import type { AccordionIcon, AccordionVariant } from './Accordion';

const VARIANTS: AccordionVariant[] = ['bordered', 'ghost', 'filled'];
const ICONS: AccordionIcon[] = ['arrow', 'plus', 'none'];

const faq = [
  { id: 'a', title: '계정은 어떻게 만드나요?', content: '가입 버튼을 누르고 이메일을 입력하면 됩니다.' },
  { id: 'b', title: '비밀번호를 잊었어요', content: '로그인 화면의 "비밀번호 찾기"에서 재설정 링크를 받을 수 있습니다.' },
  { id: 'c', title: '구독을 해지하려면?', content: '설정 → 결제 → 구독 해지에서 언제든 해지할 수 있습니다.' },
];

const meta: Meta<typeof Accordion> = {
  title: 'Data Display/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
    gallery: {
      description: '여러 항목을 접었다 펴는 목록. React가 열림 상태를 온전히 제어한다.',
      daisyui: 'collapse',
      props: [
        { name: 'items', type: 'AccordionItem[]', description: 'id · title · content' },
        { name: 'exclusive', type: 'boolean', defaultValue: 'false', description: '한 번에 하나만 열린다' },
        { name: 'variant', type: 'bordered | ghost | filled', defaultValue: 'bordered' },
        { name: 'icon', type: 'arrow | plus | none', defaultValue: 'arrow' },
        { name: 'activeIds', type: 'string[]', description: '제어 컴포넌트로 쓸 때' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
    icon: { control: 'select', options: ICONS },
    exclusive: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { items: faq, defaultActiveIds: ['a'] },
};

/** 한 번에 하나만 열린다 */
export const Exclusive: Story = {
  args: { items: faq, exclusive: true, defaultActiveIds: ['a'] },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {VARIANTS.map((variant) => (
        <div key={variant} className="flex flex-col gap-2">
          <span className="text-xs opacity-60">{variant}</span>
          <Accordion variant={variant} items={faq.slice(0, 2)} defaultActiveIds={['a']} />
        </div>
      ))}
    </div>
  ),
};

export const Icons: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {ICONS.map((icon) => (
        <div key={icon} className="flex flex-col gap-2">
          <span className="text-xs opacity-60">{icon}</span>
          <Accordion icon={icon} items={faq.slice(0, 2)} defaultActiveIds={['a']} />
        </div>
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    items: [
      ...faq.slice(0, 2),
      { id: 'locked', title: '관리자 전용 (비활성)', content: '보이지 않습니다.', disabled: true },
    ],
    defaultActiveIds: ['a'],
  },
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [open, setOpen] = useState<string[]>(['b']);

    return (
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <button className="btn btn-sm" onClick={() => setOpen(faq.map((f) => f.id))}>모두 열기</button>
          <button className="btn btn-sm" onClick={() => setOpen([])}>모두 닫기</button>
        </div>
        <Accordion items={faq} activeIds={open} onChange={setOpen} />
        <p className="text-sm opacity-60">열린 항목: {open.join(', ') || '없음'}</p>
      </div>
    );
  },
};
