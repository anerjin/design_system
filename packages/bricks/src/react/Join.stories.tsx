import { Icon } from './Icon';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Join } from './Join';
import { Button } from './Button';
import { Input } from './Input';
import { Select } from './Select';

const meta: Meta<typeof Join> = {
  title: 'Layout/Join',
  component: Join,
  parameters: {
    layout: 'padded',
    gallery: {
      description: '여러 요소를 붙여 한 덩어리로 보이게 한다. 자식에 join-item이 있어야 한다.',
      daisyui: 'join',
      props: [
        { name: 'direction', type: 'horizontal | vertical', defaultValue: 'horizontal' },
        { name: 'children', type: 'ReactNode', description: '각 자식에 join-item 클래스가 필요하다' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'select', options: ['horizontal', 'vertical'] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** 자식에 `join-item`이 있어야 모서리가 정리된다 */
export const Default: Story = {
  render: () => (
    <Join>
      <Button className="join-item">이전</Button>
      <Button className="join-item">1</Button>
      <Button className="join-item" color="primary">
        2
      </Button>
      <Button className="join-item">3</Button>
      <Button className="join-item">다음</Button>
    </Join>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Join direction="vertical">
      <Button className="join-item">위</Button>
      <Button className="join-item">가운데</Button>
      <Button className="join-item">아래</Button>
    </Join>
  ),
};

/** 검색창처럼 입력과 버튼을 붙이는 것이 가장 흔한 쓰임이다 */
export const SearchBar: Story = {
  render: () => (
    <Join>
      <Input className="join-item" placeholder="검색어" />
      <Button className="join-item" color="primary">
        검색
      </Button>
    </Join>
  ),
};

export const MixedControls: Story = {
  render: () => (
    <Join>
      <Select
        className="join-item"
        options={[
          { value: 'all', label: '전체' },
          { value: 'name', label: '이름' },
        ]}
      />
      <Input className="join-item" placeholder="검색어" />
      <Button className="join-item" color="primary" shape="square" aria-label="검색">
        <Icon name="search" size="1em" />
      </Button>
    </Join>
  ),
};

/** `Join.Item`으로 임의 요소를 감쌀 수 있다 */
export const WithJoinItem: Story = {
  render: () => (
    <Join>
      <Join.Item className="bg-base-200 px-4 py-2 text-sm">https://</Join.Item>
      <Input className="join-item" placeholder="example.com" />
    </Join>
  ),
};
