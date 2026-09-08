import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Rating } from './Rating';
import type { RatingShape } from './Rating';
import type { Size } from './utils';

const SHAPES: RatingShape[] = ['star', 'star-2', 'heart', 'squircle', 'circle', 'diamond'];
const SIZES: Size[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const meta: Meta<typeof Rating> = {
  title: 'Data Input/Rating',
  component: Rating,
  parameters: {
    layout: 'padded',
    gallery: {
      description: '별점 등 점수 입력. 라디오 묶음이라 키보드로도 조작된다.',
      daisyui: 'rating',
      props: [
        { name: 'max', type: 'number', defaultValue: '5' },
        { name: 'shape', type: 'star | star-2 | heart | squircle | circle | diamond', defaultValue: 'star' },
        { name: 'color', type: 'string', defaultValue: "'bg-warning'", description: 'Tailwind 배경 클래스' },
        { name: 'half', type: 'boolean', defaultValue: 'false', description: '반 칸 단위' },
        { name: 'readOnly', type: 'boolean', defaultValue: 'false' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    shape: { control: 'select', options: SHAPES },
    size: { control: 'select', options: SIZES },
    max: { control: { type: 'number', min: 1, max: 10 } },
    half: { control: 'boolean' },
    readOnly: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { defaultValue: 4, color: 'bg-warning' },
};

export const Shapes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {SHAPES.map((shape) => (
        <div key={shape} className="flex items-center gap-4">
          <span className="w-20 text-xs opacity-60">{shape}</span>
          <Rating name={`shape-${shape}`} shape={shape} defaultValue={3} color="bg-warning" />
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {SIZES.map((size) => (
        <Rating key={size} name={`size-${size}`} size={size} defaultValue={4} color="bg-warning" />
      ))}
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(['bg-warning', 'bg-primary', 'bg-secondary', 'bg-accent', 'bg-error'] as const).map((color) => (
        <Rating key={color} name={`color-${color}`} color={color} defaultValue={4} />
      ))}
    </div>
  ),
};

/** 반 칸 단위로 고를 수 있다 */
export const HalfSteps: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Rating name="half-1" half defaultValue={3.5} color="bg-warning" />
      <Rating name="half-2" half defaultValue={4.5} color="bg-error" shape="heart" />
    </div>
  ),
};

/** 점수만 보여주고 바꿀 수 없게 한다 */
export const ReadOnly: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Rating name="ro" value={4} readOnly color="bg-warning" />
      <span className="text-sm opacity-60">4.0 (128개 평가)</span>
    </div>
  ),
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [score, setScore] = useState(0);

    return (
      <div className="flex flex-col gap-3">
        <Rating name="ctl" value={score} onChange={setScore} color="bg-warning" size="lg" />
        <p className="text-sm opacity-60">
          {score === 0 ? '아직 평가하지 않았습니다' : `${score}점을 주셨습니다`}
        </p>
      </div>
    );
  },
};
