import { Icon } from './Icon';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './Alert';
import type { AlertVariant } from './Alert';
import { Button } from './Button';
import type { StatusColor } from './utils';

const COLORS: StatusColor[] = ['info', 'success', 'warning', 'error'];
const VARIANTS: AlertVariant[] = ['solid', 'outline', 'dash', 'soft'];
const STATUS_COPY: Record<StatusColor, { title: string; description: string }> = {
  info: { title: '업데이트 안내', description: '새 버전이 준비되었습니다. 편한 시간에 업데이트하세요.' },
  success: { title: '저장 완료', description: '변경사항이 정상적으로 반영되었습니다.' },
  warning: {
    title: '저장 공간 확인',
    description: '사용 가능한 공간이 부족합니다. 불필요한 파일을 정리하세요.',
  },
  error: { title: '업로드 실패', description: '파일 크기가 10MB를 넘습니다. 더 작은 파일을 선택하세요.' },
};

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
    gallery: {
      description:
        '중립적인 배경과 상태 아이콘으로 안내하는 알림. 좁은 영역에서는 액션이 본문 아래로 배치된다.',
      daisyui: 'alert',
      props: [
        { name: 'color', type: 'info | success | warning | error' },
        { name: 'variant', type: 'solid | outline | dash | soft', defaultValue: 'solid' },
        { name: 'title', type: 'ReactNode' },
        { name: 'description', type: 'ReactNode' },
        { name: 'actions', type: 'ReactNode', description: '버튼을 묶어 반응형으로 배치' },
        {
          name: 'layout',
          type: 'horizontal | vertical',
          description: 'vertical은 액션을 항상 본문 아래에 배치',
        },
        { name: 'dismissible', type: 'boolean', defaultValue: 'false' },
        { name: 'autoClose', type: 'number', description: '지정한 ms 뒤 자동으로 닫는다' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: COLORS },
    variant: { control: 'select', options: VARIANTS },
    layout: { control: 'select', options: [undefined, 'horizontal', 'vertical'] },
    dismissible: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: 'info',
    ...STATUS_COPY.info,
    className: 'max-w-3xl',
  },
};

/** 상태는 제목과 아이콘으로 구분하고, 배경은 중립색을 유지한다. */
export const Colors: Story = {
  render: () => (
    <div className="flex w-full max-w-3xl flex-col gap-4">
      <Alert title="기본 안내" description="계정 설정에서 알림 수신 방법을 변경할 수 있습니다." />
      {COLORS.map((color) => (
        <Alert key={color} color={color} {...STATUS_COPY[color]} />
      ))}
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex w-full max-w-3xl flex-col gap-5">
      {VARIANTS.map((variant) => (
        <div key={variant} className="flex flex-col gap-2">
          <span className="text-xs opacity-60">{variant}</span>
          <Alert
            variant={variant}
            color="info"
            title="업데이트 안내"
            description="상태색은 아이콘에만 적용하고, 배경과 테두리로 스타일을 구분합니다."
          />
        </div>
      ))}
    </div>
  ),
};

export const WithTitle: Story = {
  render: () => (
    <div className="flex w-full max-w-3xl flex-col gap-4">
      <Alert color="success" title="저장 완료" description="변경사항이 정상적으로 반영되었습니다." />
      <Alert color="error" variant="soft" title="업로드 실패" description="파일 크기가 10MB를 넘습니다." />
    </div>
  ),
};

export const WithActions: Story = {
  render: function ActionsExample() {
    const [result, setResult] = useState<'saved' | 'discarded' | null>(null);
    const [showFeatures, setShowFeatures] = useState(false);
    return (
      <div className="flex w-full max-w-3xl flex-col gap-4">
        <Alert
          color={result ? 'success' : 'warning'}
          title={
            result === 'saved'
              ? '저장 완료'
              : result === 'discarded'
                ? '변경사항 취소'
                : '저장하지 않은 변경사항'
          }
          description={
            result
              ? '아래 버튼으로 예제를 다시 실행할 수 있습니다.'
              : '페이지를 벗어나면 변경사항이 사라집니다.'
          }
          actions={
            result ? (
              <Button size="sm" variant="surface" onClick={() => setResult(null)}>
                다시 실행
              </Button>
            ) : (
              <>
                <Button size="sm" variant="surface" onClick={() => setResult('discarded')}>
                  취소
                </Button>
                <Button size="sm" color="primary" onClick={() => setResult('saved')}>
                  저장
                </Button>
              </>
            )
          }
        />
        <Alert
          color="info"
          layout="vertical"
          title="새 기능 안내"
          description={
            showFeatures
              ? '화이트·다크 모드와 다양한 테마를 선택할 수 있습니다. Theme Controller 예제에서 확인하세요.'
              : '작업 환경에 맞는 테마를 선택해 보세요.'
          }
          actions={
            <Button
              size="sm"
              color="primary"
              aria-expanded={showFeatures}
              onClick={() => setShowFeatures(!showFeatures)}
            >
              {showFeatures ? '안내 접기' : '기능 살펴보기'}
            </Button>
          }
        />
      </div>
    );
  },
};

export const Dismissible: Story = {
  render: function DismissibleExample() {
    const [manualVisible, setManualVisible] = useState(true);
    const [autoVisible, setAutoVisible] = useState(false);
    return (
      <div className="flex w-full max-w-3xl flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="surface" disabled={manualVisible} onClick={() => setManualVisible(true)}>
            닫기 알림 다시 표시
          </Button>
          <Button size="sm" color="primary" disabled={autoVisible} onClick={() => setAutoVisible(true)}>
            3초 알림 표시
          </Button>
        </div>
        <Alert
          color="info"
          title="직접 닫는 알림"
          dismissible
          visible={manualVisible}
          onClose={() => setManualVisible(false)}
          description="오른쪽 닫기 버튼을 누르세요. 위 버튼으로 다시 표시할 수 있습니다."
        />
        {autoVisible && (
          <Alert
            color="success"
            variant="soft"
            title="저장 완료"
            dismissible
            autoClose={3000}
            onClose={() => setAutoVisible(false)}
            description="버튼을 누른 시점부터 3초 뒤에 닫힙니다."
          />
        )}
        <p className="text-xs opacity-60" role="status">
          {autoVisible
            ? '자동 닫기 알림이 표시 중입니다.'
            : '3초 알림 표시 버튼을 눌러 자동 닫기를 확인하세요.'}
        </p>
      </div>
    );
  },
};

/** `icon={false}`로 기본 아이콘을 끌 수 있다 */
export const Icons: Story = {
  render: () => (
    <div className="flex w-full max-w-3xl flex-col gap-4">
      <Alert color="info" description="기본 아이콘" />
      <Alert color="info" icon={false} description="아이콘 없음" />
      <Alert color="info" icon={<Icon name="rocket" size="1em" />} description="직접 지정한 아이콘" />
    </div>
  ),
};
