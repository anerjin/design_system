import { Icon } from './Icon';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stat } from './Stat';
import { Button } from './Button';
import { RadialProgress } from './RadialProgress';

const meta: Meta<typeof Stat> = {
  title: 'Data Display/Stat',
  component: Stat,
  parameters: {
    layout: 'padded',
    gallery: {
      description: '숫자 지표를 나란히 보여준다. 아이콘과 액션을 곁들일 수 있다.',
      daisyui: 'stats',
      props: [
        { name: 'items', type: 'StatItem[]', description: 'title · value · description · figure · actions' },
        { name: 'direction', type: 'horizontal | vertical', defaultValue: 'horizontal' },
        { name: 'shadow', type: 'boolean', defaultValue: 'true' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'select', options: ['horizontal', 'vertical'] },
    shadow: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { id: 'v', title: '방문자', value: '31.4K', description: '지난달 대비 +12%' },
      { id: 'o', title: '주문', value: '4,200', description: '오늘 +38건' },
      { id: 'r', title: '환불', value: '1.2%', description: '지난달 대비 -0.3%' },
    ],
  },
};

export const Vertical: Story = {
  args: {
    direction: 'vertical',
    items: [
      { id: 'a', title: '다운로드', value: '31K' },
      { id: 'b', title: '신규 사용자', value: '4,200' },
      { id: 'c', title: '신규 등록', value: '1,200' },
    ],
  },
};

export const WithFigure: Story = {
  render: () => (
    <Stat
      items={[
        {
          id: 'likes',
          figure: <Icon name="heart" size="1em" className="text-3xl text-secondary" />,
          title: '좋아요',
          value: '25.6K',
          description: '지난주 대비 +21%',
        },
        {
          id: 'views',
          figure: <Icon name="eye" size="1em" className="text-3xl text-primary" />,
          title: '조회수',
          value: '2.6M',
          description: '지난주 대비 +8%',
        },
        {
          id: 'tasks',
          figure: <RadialProgress value={86} size="3rem" color="primary" />,
          title: '완료율',
          value: '86%',
          description: '31개 중 27개',
        },
      ]}
    />
  ),
};

export const WithActions: Story = {
  render: () => (
    <Stat
      items={[
        {
          id: 'download',
          title: '이번 달 사용량',
          value: '86GB',
          description: '한도 100GB',
          actions: (
            <Button size="sm" color="primary">
              요금제 변경
            </Button>
          ),
        },
        {
          id: 'invite',
          title: '남은 초대권',
          value: '3장',
          actions: (
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                보기
              </Button>
              <Button size="sm" color="primary">
                초대
              </Button>
            </div>
          ),
        },
      ]}
    />
  ),
};

export const SingleValue: Story = {
  args: {
    items: [{ id: 'only', title: '총 매출', value: '₩128,400,000' }],
  },
};
