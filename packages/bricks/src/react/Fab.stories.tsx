import { Icon } from './Icon';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fab } from './Fab';

const meta: Meta<typeof Fab> = {
  title: 'Actions/Fab',
  component: Fab,
  parameters: {
    layout: 'padded',
    gallery: {
      description: '화면 모서리에 떠 있는 실행 버튼. 포커스가 들어오면 하위 동작이 펼쳐진다.',
      daisyui: 'fab',
      props: [
        { name: 'icon', type: 'ReactNode', description: '접혀 있을 때 보이는 아이콘' },
        { name: 'actions', type: 'FabAction[]', description: '펼쳤을 때 나오는 버튼들' },
        { name: 'closeIcon', type: 'ReactNode', description: '펼친 상태의 닫기 버튼' },
        { name: 'flower', type: 'boolean', defaultValue: 'false', description: '부채꼴로 펼친다' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    flower: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** 버튼을 눌러(포커스를 줘) 펼친다. 위치는 `className`으로 잡는다 */
export const Default: Story = {
  render: () => (
    <div className="relative h-72 rounded-box bg-base-200">
      <Fab
        className="absolute bottom-6 end-6"
        label="빠른 작업"
        icon={<Icon name="plus" size="1em" className="text-2xl" />}
        actions={[
          { id: 'note', icon: <Icon name="sticky-note" size="1em" className="text-xl" />, label: '메모' },
          { id: 'photo', icon: <Icon name="image" size="1em" className="text-xl" />, label: '사진' },
          { id: 'file', icon: <Icon name="file" size="1em" className="text-xl" />, label: '파일' },
        ]}
      />
    </div>
  ),
};

/** 펼쳤을 때 메인 버튼 자리에 닫기 버튼을 둔다 */
export const WithCloseButton: Story = {
  render: () => (
    <div className="relative h-72 rounded-box bg-base-200">
      <Fab
        className="absolute bottom-6 end-6"
        label="빠른 작업"
        icon={<Icon name="plus" size="1em" className="text-2xl" />}
        closeIcon={<Icon name="x" size="1em" className="text-2xl" />}
        actions={[
          { id: 'note', icon: <Icon name="sticky-note" size="1em" className="text-xl" />, label: '메모' },
          { id: 'photo', icon: <Icon name="image" size="1em" className="text-xl" />, label: '사진' },
        ]}
      />
    </div>
  ),
};

/** 펼쳤을 때 주요 동작을 그 자리에서 바로 실행한다 */
export const WithMainAction: Story = {
  render: () => (
    <div className="relative h-72 rounded-box bg-base-200">
      <Fab
        className="absolute bottom-6 end-6"
        label="글쓰기"
        icon={<Icon name="pencil" size="1em" className="text-2xl" />}
        mainAction={{
          id: 'write',
          icon: <Icon name="check" size="1em" className="text-2xl" />,
          label: '작성',
        }}
        actions={[
          { id: 'draft', icon: <Icon name="save" size="1em" className="text-xl" />, label: '임시 저장' },
          { id: 'discard', icon: <Icon name="trash-2" size="1em" className="text-xl" />, label: '버리기' },
        ]}
      />
    </div>
  ),
};

/** 부채꼴로 펼친다 */
export const Flower: Story = {
  render: () => (
    <div className="relative h-72 rounded-box bg-base-200">
      <Fab
        flower
        className="absolute bottom-6 end-6"
        label="공유"
        icon={<Icon name="share-2" size="1em" className="text-2xl" />}
        actions={[
          { id: 'a', icon: <Icon name="link" size="1em" className="text-xl" /> },
          { id: 'b', icon: <Icon name="mail" size="1em" className="text-xl" /> },
          { id: 'c', icon: <Icon name="message-circle" size="1em" className="text-xl" /> },
        ]}
      />
    </div>
  ),
};
