import { Icon } from './Icon';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { List } from './List';
import { Avatar } from './Avatar';
import { Button } from './Button';
import { Badge } from './Badge';

const meta: Meta<typeof List> = {
  title: 'Data Display/List',
  component: List,
  parameters: {
    layout: 'padded',
    gallery: {
      description: '한 줄에 여러 칸을 배치하는 목록. 남는 폭은 지정한 칸이 차지한다.',
      daisyui: 'list',
      props: [
        { name: 'items', type: 'ListItem[]', description: 'leading · content · wrapped · trailing' },
        { name: 'title', type: 'ReactNode', description: '목록 위 제목' },
      ],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <List
      className="w-full max-w-96"
      title="최근 재생"
      items={[
        {
          id: '1',
          leading: <Avatar initials="DL" color="primary" size="xs" shape="squircle" />,
          content: (
            <>
              <div className="font-semibold">Dio Lupa</div>
              <div className="text-xs opacity-60">Remaining Reason</div>
            </>
          ),
          trailing: (
            <Button variant="ghost" shape="circle" size="sm" aria-label="재생">
              <Icon name="play" size="1em" />
            </Button>
          ),
        },
        {
          id: '2',
          leading: <Avatar initials="EW" color="accent" size="xs" shape="squircle" />,
          content: (
            <>
              <div className="font-semibold">Ellie Beilish</div>
              <div className="text-xs opacity-60">Bears of a fever</div>
            </>
          ),
          trailing: (
            <Button variant="ghost" shape="circle" size="sm" aria-label="재생">
              <Icon name="play" size="1em" />
            </Button>
          ),
        },
      ]}
    />
  ),
};

/** `wrapped`는 다음 줄로 넘어간다 */
export const WithWrappedContent: Story = {
  render: () => (
    <List
      className="w-full max-w-96"
      items={[
        {
          id: '1',
          leading: <span className="text-4xl font-thin tabular-nums opacity-30">01</span>,
          content: (
            <>
              <div className="font-semibold">배포 실패</div>
              <div className="text-xs uppercase opacity-60">3분 전</div>
            </>
          ),
          wrapped: '빌드 단계에서 타입 오류가 발생했습니다. 로그를 확인하세요.',
          trailing: (
            <Button variant="ghost" shape="circle" size="sm" aria-label="자세히">
              <Icon name="chevron-right" size="1em" />
            </Button>
          ),
        },
      ]}
    />
  ),
};

export const WithBadges: Story = {
  render: () => (
    <List
      className="w-full max-w-96"
      title="팀 멤버"
      items={[
        {
          id: '1',
          leading: <Avatar initials="서준" color="primary" size="xs" />,
          content: <div className="font-semibold">김서준</div>,
          trailing: (
            <Badge color="success" variant="soft" size="sm">
              활성
            </Badge>
          ),
        },
        {
          id: '2',
          leading: <Avatar initials="하윤" color="secondary" size="xs" />,
          content: <div className="font-semibold">이하윤</div>,
          trailing: (
            <Badge color="warning" variant="soft" size="sm">
              초대됨
            </Badge>
          ),
        },
      ]}
    />
  ),
};

/** `items` 대신 직접 `li`를 작성할 수도 있다 */
export const CustomChildren: Story = {
  render: () => (
    <List className="w-full max-w-96">
      <li className="p-4 pb-2 text-xs opacity-60">직접 작성</li>
      <li className="list-row">
        <Icon name="folder" size="1em" className="text-2xl" />
        <div className="list-col-grow">문서</div>
        <span className="text-xs opacity-60">12개</span>
      </li>
      <li className="list-row">
        <Icon name="image" size="1em" className="text-2xl" />
        <div className="list-col-grow">사진</div>
        <span className="text-xs opacity-60">340개</span>
      </li>
    </List>
  ),
};
