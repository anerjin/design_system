import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Steps } from './Steps';
import { Button } from './Button';
import { Icon } from './Icon';
import type { Color } from './utils';

const COLORS: Color[] = ['neutral', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'];

const checkout = ['장바구니', '배송지', '결제', '완료'];

const meta: Meta<typeof Steps> = {
  title: 'Navigation/Steps',
  component: Steps,
  parameters: {
    layout: 'padded',
    gallery: {
      description: '진행 단계를 나타낸다. 현재 단계까지 색이 채워진다.',
      daisyui: 'steps',
      props: [
        { name: 'steps', type: '(string | StepItem)[]', description: '문자열만 주면 라벨로 쓴다' },
        { name: 'currentStep', type: 'number', defaultValue: '0', description: '0부터 시작' },
        { name: 'color', type: 'neutral | primary | … | error', defaultValue: 'primary' },
        { name: 'direction', type: 'horizontal | vertical', defaultValue: 'horizontal' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    currentStep: { control: { type: 'number', min: 0, max: 3 } },
    color: { control: 'select', options: COLORS },
    direction: { control: 'select', options: ['horizontal', 'vertical'] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { steps: checkout, currentStep: 1 },
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {COLORS.map((color) => (
        <Steps key={color} steps={checkout} currentStep={2} color={color} />
      ))}
    </div>
  ),
};

export const Vertical: Story = {
  args: { steps: checkout, currentStep: 2, direction: 'vertical' },
};

/** `content`로 원 안의 표시를 바꾼다 */
export const CustomContent: Story = {
  render: () => (
    <Steps
      currentStep={2}
      color="success"
      steps={[
        { label: '가입', content: <Icon name="check" size={16} /> },
        { label: '이메일 인증', content: <Icon name="mail-check" size={16} /> },
        { label: '프로필 작성', content: <Icon name="user-round" size={16} /> },
        { label: '완료', content: <Icon name="flag" size={16} /> },
      ]}
    />
  ),
};

export const Interactive: Story = {
  render: function InteractiveStory() {
    const [step, setStep] = useState(0);

    return (
      <div className="flex flex-col gap-4">
        <Steps steps={checkout} currentStep={step} />
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
            이전
          </Button>
          <Button
            color="primary"
            size="sm"
            disabled={step === checkout.length - 1}
            onClick={() => setStep((s) => s + 1)}
          >
            다음
          </Button>
        </div>
      </div>
    );
  },
};
