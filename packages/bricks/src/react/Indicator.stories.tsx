import { Icon } from './Icon';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Indicator } from './Indicator';
import type { IndicatorPlacement } from './Indicator';
import { Badge } from './Badge';
import { Button } from './Button';
import { Avatar } from './Avatar';
import { Status } from './Status';

const PLACEMENTS: IndicatorPlacement[] = [
  'top-start',
  'top-center',
  'top-end',
  'middle-start',
  'middle-center',
  'middle-end',
  'bottom-start',
  'bottom-center',
  'bottom-end',
];

const POSITION_LABELS = [
  '왼쪽 위',
  '위 가운데',
  '오른쪽 위',
  '왼쪽 가운데',
  '정중앙',
  '오른쪽 가운데',
  '왼쪽 아래',
  '아래 가운데',
  '오른쪽 아래',
];

const meta: Meta<typeof Indicator> = {
  title: 'Layout/Indicator',
  component: Indicator,
  parameters: {
    layout: 'centered',
    gallery: {
      description:
        '버튼과 아바타 위에 알림 수나 상태를 표시합니다. 무채색 표면 위에서 필요한 정보만 강조합니다.',
      daisyui: 'indicator',
      props: [
        { name: 'item', type: 'ReactNode', description: '모서리에 띄울 내용' },
        { name: 'placement', type: 'top-start … bottom-end', defaultValue: 'top-end', description: '9방향' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placement: { control: 'select', options: PLACEMENTS },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function InboxStory(args) {
    const [unread, setUnread] = useState(12);
    return (
      <section className="indicator-example indicator-example-panel rounded-box" aria-label="알림 수 예제">
        <h2>받은편지함</h2>
        <p className="indicator-description">새 메시지를 숫자 배지로 표시합니다.</p>
        <div className="indicator-example-stage">
          <Indicator
            {...args}
            item={
              unread > 0 ? (
                <Badge color="primary" size="sm">
                  {unread}
                </Badge>
              ) : undefined
            }
          >
            <Button
              variant="surface"
              aria-label={`받은편지함, 읽지 않은 메시지 ${unread}개`}
              onClick={() => setUnread((count) => (count > 0 ? 0 : 12))}
            >
              <Icon name="mail" size="1em" aria-hidden="true" />
              {unread > 0 ? '메시지 확인' : '알림 다시 표시'}
            </Button>
          </Indicator>
        </div>
        <p className="indicator-example-hint" role="status">
          {unread > 0 ? '읽지 않은 메시지 12개' : '모든 메시지를 확인했습니다.'}
        </p>
      </section>
    );
  },
};

export const Placements: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="indicator-example indicator-position-grid">
      {PLACEMENTS.map((placement, index) => (
        <figure className="indicator-position" key={placement}>
          <Indicator
            placement={placement}
            item={<span className="indicator-position-dot" aria-hidden="true" />}
          >
            <div className="indicator-position-target rounded-box">
              <Icon name="layout-grid" size="1em" aria-hidden="true" />
            </div>
          </Indicator>
          <figcaption>
            <strong>{POSITION_LABELS[index]}</strong>
            <code>{placement}</code>
          </figcaption>
        </figure>
      ))}
    </div>
  ),
};

export const OnAvatar: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <section
      className="indicator-example indicator-example-panel indicator-member-list rounded-box"
      aria-label="멤버 상태 예제"
    >
      <h2>팀 멤버</h2>
      <p className="indicator-description">상태 점과 설명을 함께 표시합니다.</p>
      {[
        { name: '김서준', initials: '김', status: '활동 중', online: true },
        { name: '이하린', initials: '이', status: '오프라인', online: false },
      ].map((member) => (
        <div className="indicator-member" key={member.name}>
          <Indicator
            className="indicator-avatar"
            placement="bottom-end"
            item={
              <Status
                color={member.online ? 'secondary' : undefined}
                size="md"
                label={member.status}
                className={member.online ? undefined : 'indicator-muted-dot'}
              />
            }
          >
            <Avatar initials={member.initials} size="sm" />
          </Indicator>
          <div className="indicator-member-copy">
            <strong>{member.name}</strong>
            <span>{member.status}</span>
          </div>
        </div>
      ))}
    </section>
  ),
};

export const OnButton: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="indicator-example indicator-button-grid">
      <figure className="indicator-button-example rounded-box">
        <div className="indicator-example-stage">
          <Indicator
            item={
              <Badge color="primary" size="sm">
                99+
              </Badge>
            }
          >
            <Button variant="surface" shape="square" size="lg" aria-label="알림 99개 이상">
              <Icon name="bell" size="1em" aria-hidden="true" />
            </Button>
          </Indicator>
        </div>
        <figcaption>
          <strong>알림 수</strong>
          <span>많은 알림은 99+로 축약</span>
        </figcaption>
      </figure>
      <figure className="indicator-button-example rounded-box">
        <div className="indicator-example-stage">
          <Indicator
            item={
              <Badge color="secondary" size="sm">
                2
              </Badge>
            }
          >
            <Button variant="surface" aria-label="장바구니, 상품 2개">
              <Icon name="shopping-bag" size="1em" aria-hidden="true" />
              장바구니
            </Button>
          </Indicator>
        </div>
        <figcaption>
          <strong>상품 수</strong>
          <span>보조 강조에는 바이올렛</span>
        </figcaption>
      </figure>
    </div>
  ),
};
