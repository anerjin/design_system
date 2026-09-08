import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip, TooltipShortcut } from './Tooltip';
import type { TooltipPlacement } from './Tooltip';
import { Button } from './Button';
import type { Color } from './utils';

const PLACEMENTS: TooltipPlacement[] = ['top', 'bottom', 'left', 'right'];
const COLORS: Color[] = [
  'neutral', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error',
];

const meta: Meta<typeof Tooltip> = {
  title: 'Feedback/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    gallery: {
      description: '순수 CSS 툴팁. 위치를 재는 JS가 없는 대신 delay·interactive는 없다.',
      daisyui: 'tooltip',
      props: [
        { name: 'content', type: 'ReactNode', description: '문자열이면 data-tip, 아니면 tooltip-content' },
        { name: 'placement', type: 'top | bottom | left | right', defaultValue: 'top' },
        { name: 'color', type: 'neutral | primary | … | error' },
        { name: 'open', type: 'boolean', defaultValue: 'false', description: '항상 열어 둔다' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placement: { control: 'select', options: PLACEMENTS },
    color: { control: 'select', options: COLORS },
    open: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { content: '저장합니다' },
  render: (args) => (
    <Tooltip {...args}>
      <Button>마우스를 올려보세요</Button>
    </Tooltip>
  ),
};

/** `open`으로 강제로 열어 둘 수 있다 */
export const Placements: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-16 py-20">
      {PLACEMENTS.map((placement) => (
        <Tooltip key={placement} content={placement} placement={placement} open>
          <Button variant="outline">{placement}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};

export const Colors: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap items-center gap-6 py-16">
      {COLORS.map((color) => (
        <Tooltip key={color} content={color} color={color} open>
          <Button variant="outline" size="sm">{color}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};

/** 문자열이 아니면 `tooltip-content` 영역으로 렌더된다 */
export const RichContent: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap items-center gap-8 py-24">
      <Tooltip
        open
        color="primary"
        content={<TooltipShortcut label="저장" keys={['⌘', 'S']} />}
      >
        <Button color="primary">저장</Button>
      </Tooltip>

      <Tooltip
        open
        placement="bottom"
        content={(
          <div className="text-left">
            <div className="font-bold">배포 상태</div>
            <div className="text-xs opacity-80">3분 전 · main 브랜치</div>
          </div>
        )}
      >
        <Button variant="outline">배포</Button>
      </Tooltip>
    </div>
  ),
};

/** `disabled`면 자식만 그대로 렌더된다 */
export const Disabled: Story = {
  render: () => (
    <Tooltip content="보이지 않습니다" disabled>
      <Button variant="ghost">툴팁 없음</Button>
    </Tooltip>
  ),
};
