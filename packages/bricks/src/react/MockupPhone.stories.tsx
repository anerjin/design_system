import { Icon } from './Icon';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MockupPhone } from './Mockup';
import { Dock } from './Dock';
import { ChatBubble } from './ChatBubble';
import { Avatar } from './Avatar';

const meta: Meta<typeof MockupPhone> = {
  title: 'Mockup/Phone',
  component: MockupPhone,
  parameters: {
    layout: 'padded',
    gallery: {
      description: '휴대폰 틀. 모바일 화면을 그대로 넣어 보여준다.',
      daisyui: 'mockup-phone',
      props: [{ name: 'children', type: 'ReactNode', description: 'mockup-phone-display 안에 들어간다' }],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <MockupPhone>
      <div className="grid h-full place-content-center bg-base-200">앱 화면</div>
    </MockupPhone>
  ),
};

/** 안에 실제 컴포넌트를 넣어 화면을 보여준다 */
export const WithChat: Story = {
  render: () => (
    <MockupPhone>
      <div className="flex h-full flex-col bg-base-100">
        <div className="border-b border-base-300 p-4 text-center font-semibold">대화</div>
        <div className="flex-1 overflow-y-auto p-3">
          <ChatBubble side="start" avatar={<Avatar initials="서준" size="xs" color="primary" />}>
            지금 어디세요?
          </ChatBubble>
          <ChatBubble side="end" color="primary">
            거의 도착했어요!
          </ChatBubble>
          <ChatBubble side="start" avatar={<Avatar initials="서준" size="xs" color="primary" />}>
            네 천천히 오세요.
          </ChatBubble>
        </div>
      </div>
    </MockupPhone>
  ),
};

export const WithDock: Story = {
  render: () => (
    <MockupPhone>
      <div className="relative h-full bg-base-200">
        <div className="p-6 text-sm opacity-60">본문 영역</div>
        <Dock
          size="sm"
          className="absolute"
          items={[
            {
              id: 'home',
              icon: <Icon name="house" size="1em" className="text-lg" />,
              label: '홈',
              active: true,
            },
            { id: 'search', icon: <Icon name="search" size="1em" className="text-lg" />, label: '검색' },
            { id: 'me', icon: <Icon name="user-round" size="1em" className="text-lg" />, label: '내 정보' },
          ]}
        />
      </div>
    </MockupPhone>
  ),
};
