import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChatBubble } from './ChatBubble';
import { Avatar } from './Avatar';
import type { Color } from './utils';

const COLORS: Color[] = [
  'neutral', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error',
];

const meta: Meta<typeof ChatBubble> = {
  title: 'Data Display/ChatBubble',
  component: ChatBubble,
  parameters: {
    layout: 'padded',
    gallery: {
      description: '대화 말풍선. 아바타·머리말·꼬리말을 붙일 수 있다.',
      daisyui: 'chat',
      props: [
        { name: 'side', type: 'start | end', defaultValue: 'start', description: '상대는 start, 나는 end' },
        { name: 'color', type: 'neutral | primary | … | error' },
        { name: 'avatar', type: 'ReactNode' },
        { name: 'header', type: 'ReactNode', description: '이름·시각' },
        { name: 'footer', type: 'ReactNode', description: '읽음·전송 상태' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    side: { control: 'select', options: ['start', 'end'] },
    color: { control: 'select', options: COLORS },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: '안녕하세요!' },
};

export const Conversation: Story = {
  render: () => (
    <div className="w-full max-w-lg">
      <ChatBubble
        side="start"
        avatar={<Avatar initials="서준" size="xs" color="primary" />}
        header={<>김서준 <time className="text-xs opacity-50">12:45</time></>}
        footer="전달됨"
      >
        배포 준비 다 됐나요?
      </ChatBubble>

      <ChatBubble
        side="end"
        color="primary"
        avatar={<Avatar initials="나" size="xs" color="accent" />}
        header={<>나 <time className="text-xs opacity-50">12:46</time></>}
        footer="읽음"
      >
        네, 테스트까지 통과했습니다.
      </ChatBubble>

      <ChatBubble
        side="start"
        avatar={<Avatar initials="서준" size="xs" color="primary" />}
        header={<>김서준 <time className="text-xs opacity-50">12:46</time></>}
      >
        좋아요, 바로 올릴게요.
      </ChatBubble>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="w-full max-w-lg">
      {COLORS.map((color, i) => (
        <ChatBubble key={color} side={i % 2 === 0 ? 'start' : 'end'} color={color}>
          {color}
        </ChatBubble>
      ))}
    </div>
  ),
};

/** 아바타·머리말 없이 말풍선만 */
export const BubbleOnly: Story = {
  render: () => (
    <div className="w-full max-w-lg">
      <ChatBubble side="start">이것도 되나요?</ChatBubble>
      <ChatBubble side="end" color="primary">네, 됩니다.</ChatBubble>
    </div>
  ),
};
