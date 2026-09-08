import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from './Divider';
import type { Color } from './utils';

const COLORS: Color[] = [
  'neutral', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error',
];

const meta: Meta<typeof Divider> = {
  title: 'Layout/Divider',
  component: Divider,
  parameters: {
    layout: 'padded',
    gallery: {
      description: '영역을 가르는 선. 가운데에 글자를 넣을 수 있다.',
      daisyui: 'divider',
      props: [
        { name: 'direction', type: 'vertical | horizontal', defaultValue: 'vertical', description: 'horizontal은 좌우 사이의 세로선' },
        { name: 'placement', type: 'start | center | end', defaultValue: 'center', description: '글자 위치' },
        { name: 'color', type: 'neutral | primary | … | error' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'select', options: ['vertical', 'horizontal'] },
    placement: { control: 'select', options: ['start', 'center', 'end'] },
    color: { control: 'select', options: COLORS },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: '또는' },
  render: (args) => (
    <div className="w-full max-w-96">
      <div className="rounded-box bg-base-200 p-4">위쪽</div>
      <Divider {...args} />
      <div className="rounded-box bg-base-200 p-4">아래쪽</div>
    </div>
  ),
};

export const WithoutText: Story = {
  render: () => (
    <div className="w-full max-w-96">
      <div className="rounded-box bg-base-200 p-4">위쪽</div>
      <Divider />
      <div className="rounded-box bg-base-200 p-4">아래쪽</div>
    </div>
  ),
};

/** `horizontal`은 좌우로 놓인 요소 사이의 **세로선**이다 */
export const Horizontal: Story = {
  render: () => (
    <div className="flex w-full max-w-96">
      <div className="grid flex-grow place-items-center rounded-box bg-base-200 p-4">왼쪽</div>
      <Divider direction="horizontal">또는</Divider>
      <div className="grid flex-grow place-items-center rounded-box bg-base-200 p-4">오른쪽</div>
    </div>
  ),
};

export const Placement: Story = {
  render: () => (
    <div className="flex w-full max-w-96 flex-col">
      {(['start', 'center', 'end'] as const).map((placement) => (
        <Divider key={placement} placement={placement}>{placement}</Divider>
      ))}
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex w-full max-w-96 flex-col">
      {COLORS.map((color) => (
        <Divider key={color} color={color}>{color}</Divider>
      ))}
    </div>
  ),
};
