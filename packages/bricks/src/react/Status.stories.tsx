import type { Meta, StoryObj } from '@storybook/react-vite';
import { Status } from './Status';
import type { Color, Size } from './utils';

const COLORS: Color[] = [
  'neutral', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error',
];
const SIZES: Size[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const meta: Meta<typeof Status> = {
  title: 'Data Display/Status',
  component: Status,
  parameters: {
    layout: 'centered',
    gallery: {
      description: '점 하나로 상태를 나타낸다. 글자를 곁들이려면 Badge를 쓴다.',
      daisyui: 'status',
      props: [
        { name: 'color', type: 'neutral | primary | … | error' },
        { name: 'size', type: 'xs | sm | md | lg | xl', defaultValue: 'md' },
        { name: 'pulse', type: 'boolean', defaultValue: 'false', description: '깜박이게 한다' },
        { name: 'label', type: 'string', description: '스크린리더용 설명' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: COLORS },
    size: { control: 'select', options: SIZES },
    pulse: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { color: 'success', label: '온라인' },
};

/**
 * 점은 가장 큰 것도 12px이라 그것만 늘어놓으면 무엇이 무엇인지 알 수 없다.
 * 예제에서는 이름을 함께 적는다 — `label`은 스크린리더용이라 화면에 나오지 않는다.
 */
export const Colors: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap items-center gap-5">
      {(['기본', ...COLORS] as const).map((color) => (
        <div key={color} className="flex flex-col items-center gap-1.5">
          <Status color={color === '기본' ? undefined : color} label={color} />
          <span className="text-xs opacity-60">{color}</span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap items-end gap-5">
      {SIZES.map((size) => (
        <div key={size} className="flex flex-col items-center gap-1.5">
          <Status size={size} color="success" label={size} />
          <span className="text-xs opacity-60">{size}</span>
        </div>
      ))}
    </div>
  ),
};

/** 진행 중임을 나타낼 때 깜박이게 한다 */
export const Pulse: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap items-center gap-5">
      {([['success', '연결됨'], ['warning', '배포 중'], ['error', '장애']] as const).map(
        ([color, text]) => (
          <div key={text} className="flex items-center gap-2 text-sm">
            <Status color={color} pulse label={text} />
            {text}
          </div>
        ),
      )}
    </div>
  ),
};

/** 글자와 함께 쓰는 것이 보통이다 */
export const WithText: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <ul className="flex flex-col gap-2 text-sm">
      {([
        ['success', '운영 중', false],
        ['warning', '배포 중', true],
        ['error', '장애 발생', true],
        ['neutral', '중지됨', false],
      ] as const).map(([color, text, pulse]) => (
        <li key={text} className="flex items-center gap-2">
          <Status color={color} pulse={pulse} label={text} />
          {text}
        </li>
      ))}
    </ul>
  ),
};
