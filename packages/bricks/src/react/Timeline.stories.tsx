import { Icon } from './Icon';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Timeline } from './Timeline';

const history = [
  { id: '1', start: '1984', end: '매킨토시 출시', done: true },
  { id: '2', start: '1998', end: 'iMac 출시', done: true },
  { id: '3', start: '2001', end: 'iPod 출시', done: true },
  { id: '4', start: '2007', end: 'iPhone 출시' },
  { id: '5', start: '2015', end: 'Apple Watch 출시' },
];

const meta: Meta<typeof Timeline> = {
  title: 'Data Display/Timeline',
  component: Timeline,
  parameters: {
    layout: 'padded',
    gallery: {
      description: '시간 순서를 따라가는 목록. 가로·세로 모두 가능하다.',
      daisyui: 'timeline',
      props: [
        { name: 'items', type: 'TimelineItem[]', description: 'start · end · icon · done · box' },
        { name: 'direction', type: 'vertical | horizontal', defaultValue: 'vertical' },
        { name: 'compact', type: 'boolean', defaultValue: 'false', description: '한쪽으로 몰아 붙인다' },
        {
          name: 'snapIcon',
          type: 'boolean',
          defaultValue: 'false',
          description: '표식을 선 시작점에 붙인다',
        },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'select', options: ['vertical', 'horizontal'] },
    compact: { control: 'boolean' },
    snapIcon: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { items: history },
};

export const Horizontal: Story = {
  args: { items: history, direction: 'horizontal' },
};

/** 좁은 폭에서 한쪽으로 몰아 붙인다 */
export const Compact: Story = {
  args: { items: history, compact: true, snapIcon: true },
};

/** 표식을 직접 지정한다 */
export const CustomIcons: Story = {
  render: () => (
    <Timeline
      items={[
        {
          id: '1',
          start: '10:04',
          end: '주문 접수',
          done: true,
          icon: <Icon name="receipt" size="1em" className="text-lg text-primary" />,
        },
        {
          id: '2',
          start: '10:22',
          end: '결제 완료',
          done: true,
          icon: <Icon name="credit-card" size="1em" className="text-lg text-primary" />,
        },
        {
          id: '3',
          start: '11:40',
          end: '배송 준비 중',
          icon: <Icon name="package" size="1em" className="text-lg opacity-40" />,
        },
        {
          id: '4',
          start: '—',
          end: '배송 완료',
          icon: <Icon name="house" size="1em" className="text-lg opacity-40" />,
        },
      ]}
    />
  ),
};

/** 한쪽에만 내용을 두는 구성 */
export const OneSided: Story = {
  render: () => (
    <Timeline
      items={[
        { id: '1', end: '저장소 생성', done: true },
        { id: '2', end: 'daisyUI 도입', done: true },
        { id: '3', end: '컴포넌트 전환' },
        { id: '4', end: '문서 정리' },
      ]}
    />
  ),
};

/** 상자를 없애고 글자만 남긴다 */
export const WithoutBox: Story = {
  render: () => <Timeline items={history.map((item) => ({ ...item, box: false }))} />,
};
