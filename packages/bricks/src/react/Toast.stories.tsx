import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast, toast } from './Toast';
import type { ToastPlacement } from './Toast';
import { Alert } from './Alert';
import { Button } from './Button';

const PLACEMENTS: ToastPlacement[] = [
  'top-start', 'top-center', 'top-end',
  'middle-start', 'middle-center', 'middle-end',
  'bottom-start', 'bottom-center', 'bottom-end',
];

const meta: Meta<typeof Toast> = {
  title: 'Feedback/Toast',
  component: Toast,
  parameters: {
    layout: 'fullscreen',
    gallery: {
      description: '화면 모서리에 잠깐 뜨는 알림. 컴포넌트와 명령형 헬퍼를 모두 제공한다.',
      daisyui: 'toast',
      props: [
        { name: 'placement', type: 'top-start … bottom-end', defaultValue: 'bottom-end', description: '9방향' },
        { name: 'toast.show', type: '(options) => handle', description: '명령형으로 띄운다' },
        { name: 'toast.success', type: '(message, options?) => handle' },
        { name: 'toast.closeAll', type: '() => void' },
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

/** 컨테이너로 직접 배치하는 방식 */
export const Default: Story = {
  args: { placement: 'bottom-end' },
  render: (args) => (
    <div className="relative h-72 w-full">
      <Toast {...args} className="absolute">
        <Alert color="info" description="새 메시지가 도착했습니다" />
      </Toast>
    </div>
  ),
};

export const Placements: Story = {
  render: () => (
    <div className="relative h-96 w-full bg-base-200">
      {PLACEMENTS.map((placement) => (
        <Toast key={placement} placement={placement} className="absolute">
          <Alert color="info" variant="soft" description={placement} />
        </Toast>
      ))}
    </div>
  ),
};

/** 명령형 헬퍼로 띄우기 — 버튼을 눌러 확인한다 */
export const Imperative: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 p-6">
      <Button color="info" onClick={() => toast.info('정보 메시지입니다')}>info</Button>
      <Button color="success" onClick={() => toast.success('저장했습니다')}>success</Button>
      <Button color="warning" onClick={() => toast.warning('용량이 얼마 남지 않았습니다')}>warning</Button>
      <Button color="error" onClick={() => toast.error('업로드에 실패했습니다')}>error</Button>
      <Button
        variant="outline"
        onClick={() => toast.show({
          color: 'success',
          title: '배포 완료',
          description: 'main 브랜치가 배포되었습니다.',
          placement: 'top-center',
          autoClose: 0,
        })}
      >
        상단 중앙 · 자동 닫기 없음
      </Button>
      <Button variant="surface" onClick={() => toast.closeAll()}>모두 닫기</Button>
    </div>
  ),
};
