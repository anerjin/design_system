import { useId, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Modal } from './Modal';
import type { ModalPlacement, ModalSize } from './Modal';
import { Button } from './Button';
import { Icon } from './Icon';
import { Input } from './Input';
import { Label } from './Fieldset';

const SIZES: ModalSize[] = ['sm', 'md', 'lg', 'xl', 'fullscreen'];
const PLACEMENTS: ModalPlacement[] = ['top', 'middle', 'bottom', 'start', 'end'];

const meta: Meta<typeof Modal> = {
  title: 'Actions/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    gallery: {
      description:
        'Header · Body · Footer로 구성하는 모달. Header에는 제목과 닫기 버튼, Footer에는 액션을 배치합니다. Header와 Footer는 각각 생략할 수 있으며 긴 내용은 Body 안에서 스크롤됩니다.',
      daisyui: 'modal',
      props: [
        { name: 'open', type: 'boolean', description: '열림 여부' },
        { name: 'onClose', type: '() => void', description: '닫힐 때 호출' },
        { name: 'title', type: 'ReactNode', description: 'Header에 표시할 제목' },
        {
          name: 'header',
          type: 'ReactNode | false',
          description: '제목 영역 직접 구성. false 또는 null이면 Header 전체 생략',
        },
        { name: 'children', type: 'ReactNode', description: '스크롤 가능한 Body 내용' },
        { name: 'footer', type: 'ReactNode', description: '취소·삭제·확인 등 액션. 생략하면 Footer 없음' },
        { name: 'closable', type: 'boolean', defaultValue: 'true', description: 'Header의 닫기 버튼 표시' },
        { name: 'aria-label', type: 'string', description: 'Header를 생략할 때 모달의 접근 가능한 이름' },
        { name: 'size', type: 'sm | md | lg | xl | fullscreen', defaultValue: 'md' },
        {
          name: 'staticBackdrop',
          type: 'boolean',
          defaultValue: 'false',
          description: '배경 클릭으로 닫히지 않게',
        },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: SIZES },
    placement: { control: 'select', options: PLACEMENTS },
    closable: { control: 'boolean' },
    staticBackdrop: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** 모달은 열려 있어야 보이므로 스토리마다 여는 버튼을 함께 둔다 */
export const Default: Story = {
  name: '기본형 · Header + Body + Footer',
  render: function DefaultStory(args) {
    const [open, setOpen] = useState(false);
    const [deleted, setDeleted] = useState(false);

    return (
      <>
        <Button color="primary" onClick={() => setOpen(true)}>
          모달 열기
        </Button>
        {deleted && (
          <p role="status" className="text-sm">
            예제 프로젝트를 삭제했습니다.
          </p>
        )}
        <Modal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          title="프로젝트를 삭제할까요?"
          footer={
            <>
              <Button variant="surface" onClick={() => setOpen(false)}>
                취소
              </Button>
              <Button
                color="primary"
                onClick={() => {
                  setDeleted(true);
                  setOpen(false);
                }}
              >
                삭제
              </Button>
            </>
          }
        >
          <p>프로젝트와 연결된 파일이 함께 삭제됩니다. 삭제된 항목은 복구할 수 없습니다.</p>
          <div className="mt-4 flex items-center gap-3 rounded-lg border border-base-300 bg-base-200/40 p-4">
            <Icon name="folder" size={20} />
            <div>
              <p className="font-medium">웹사이트 리뉴얼</p>
              <p className="text-xs opacity-60">파일 12개 · 팀원 4명</p>
            </div>
          </div>
        </Modal>
      </>
    );
  },
};

/** header={false}를 주면 제목 영역과 닫기 버튼이 함께 생략됩니다. */
export const WithoutHeader: Story = {
  name: 'Header 없음 · Body + Footer',
  render: function WithoutHeaderStory() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Header 없는 모달
        </Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          header={false}
          aria-label="변경사항 저장 확인"
          footer={
            <>
              <Button variant="surface" onClick={() => setOpen(false)}>
                취소
              </Button>
              <Button color="primary" onClick={() => setOpen(false)}>
                확인
              </Button>
            </>
          }
        >
          <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-base-200">
            <Icon name="check" size={20} />
          </div>
          <h2 className="text-base font-semibold">변경사항을 저장했습니다</h2>
          <p className="mt-2 opacity-70">새로운 설정이 적용되었습니다. 이제 작업을 이어갈 수 있습니다.</p>
        </Modal>
      </>
    );
  },
};

/** Footer를 생략하면 하단 구분선과 버튼 영역도 렌더링하지 않습니다. */
export const WithoutFooter: Story = {
  name: 'Footer 없음 · Header + Body',
  render: function WithoutFooterStory() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Footer 없는 모달
        </Button>
        <Modal open={open} onClose={() => setOpen(false)} title="프로젝트 정보">
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-4">
            <dt className="opacity-60">프로젝트</dt>
            <dd>웹사이트 리뉴얼</dd>
            <dt className="opacity-60">담당 팀</dt>
            <dd>디자인팀</dd>
            <dt className="opacity-60">진행 상태</dt>
            <dd>디자인 검토 중</dd>
            <dt className="opacity-60">마지막 수정</dt>
            <dd>오늘 오후 2:30</dd>
          </dl>
        </Modal>
      </>
    );
  },
};

/** Header와 Footer를 모두 생략한 안내형. 배경 클릭 또는 Escape로 닫습니다. */
export const BodyOnly: Story = {
  name: 'Body만 사용',
  render: function BodyOnlyStory() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Body만 있는 모달
        </Button>
        <Modal open={open} onClose={() => setOpen(false)} header={false} size="sm" aria-label="동기화 완료">
          <div className="py-4 text-center">
            <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-full bg-primary text-primary-content">
              <Icon name="check" size={24} />
            </div>
            <h2 className="text-base font-semibold" tabIndex={-1} autoFocus>
              모든 파일이 최신 상태입니다
            </h2>
            <p className="mt-2 opacity-70">팀의 변경사항을 모두 동기화했습니다.</p>
            <p className="mt-6 text-xs opacity-60">바깥 영역을 누르거나 Esc 키로 닫을 수 있습니다.</p>
          </div>
        </Modal>
      </>
    );
  },
};

/** Body의 폼과 Footer의 제출 버튼은 form 속성으로 연결합니다. */
export const EditForm: Story = {
  name: '입력 폼 · 취소와 저장',
  render: function EditFormStory() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('웹사이트 리뉴얼');
    const [saved, setSaved] = useState('웹사이트 리뉴얼');
    const formId = useId();
    const inputId = useId();
    return (
      <div className="grid justify-items-center gap-3">
        <Button
          variant="outline"
          onClick={() => {
            setName(saved);
            setOpen(true);
          }}
        >
          프로젝트 수정
        </Button>
        <p role="status" className="text-sm">
          프로젝트: {saved}
        </p>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="프로젝트 수정"
          footer={
            <>
              <Button variant="surface" onClick={() => setOpen(false)}>
                취소
              </Button>
              <Button color="primary" type="submit" form={formId} disabled={!name.trim()}>
                저장
              </Button>
            </>
          }
        >
          <form
            id={formId}
            className="grid gap-3"
            onSubmit={(event) => {
              event.preventDefault();
              if (!name.trim()) return;
              setSaved(name.trim());
              setOpen(false);
            }}
          >
            <p className="mb-2 opacity-70">팀원에게 표시되는 프로젝트 이름을 변경합니다.</p>
            <Label htmlFor={inputId}>프로젝트 이름</Label>
            <Input
              id={inputId}
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="w-full"
            />
          </form>
        </Modal>
      </div>
    );
  },
};

export const Sizes: Story = {
  name: '크기',
  render: function SizesStory() {
    const [size, setSize] = useState<ModalSize | null>(null);

    return (
      <>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <Button key={s} variant="outline" onClick={() => setSize(s)}>
              {s}
            </Button>
          ))}
        </div>
        <Modal
          open={size !== null}
          size={size ?? 'md'}
          onClose={() => setSize(null)}
          title={`size="${size}"`}
          footer={
            <Button variant="surface" onClick={() => setSize(null)}>
              닫기
            </Button>
          }
        >
          모달 상자의 최대 폭이 달라집니다.
        </Modal>
      </>
    );
  },
};

export const Placements: Story = {
  name: '화면 내 위치',
  render: function PlacementsStory() {
    const [placement, setPlacement] = useState<ModalPlacement | null>(null);

    return (
      <>
        <div className="flex flex-wrap gap-2">
          {PLACEMENTS.map((p) => (
            <Button key={p} variant="outline" onClick={() => setPlacement(p)}>
              {p}
            </Button>
          ))}
        </div>
        <Modal
          open={placement !== null}
          placement={placement ?? 'middle'}
          onClose={() => setPlacement(null)}
          title={`placement="${placement}"`}
        >
          화면 안에서 모달이 놓이는 위치가 달라집니다.
        </Modal>
      </>
    );
  },
};

/** 배경을 눌러도, ESC를 눌러도 닫히지 않는다 */
export const StaticBackdrop: Story = {
  name: '명시적 확인으로 닫기',
  render: function StaticStory() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button color="primary" onClick={() => setOpen(true)}>
          필수 확인 모달
        </Button>
        <Modal
          open={open}
          staticBackdrop
          disableEscapeKeyDown
          closable={false}
          onClose={() => setOpen(false)}
          title="변경사항 확인"
          footer={
            <>
              <Button variant="surface" onClick={() => setOpen(false)}>
                취소
              </Button>
              <Button color="primary" onClick={() => setOpen(false)}>
                확인
              </Button>
            </>
          }
        >
          변경사항을 검토한 뒤 취소 또는 확인을 선택하세요. 이 예제는 배경 클릭과 Esc로 닫히지 않습니다.
        </Modal>
      </>
    );
  },
};

/** 서브컴포넌트로 내부를 직접 구성한다 */
export const Composed: Story = {
  name: '섹션 직접 구성',
  render: function ComposedStory() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>
          직접 구성한 모달
        </Button>
        <Modal open={open} onClose={() => setOpen(false)} size="lg">
          <Modal.Title>배포 요약</Modal.Title>
          <Modal.Body>
            <ul className="list-disc ps-5 text-sm">
              <li>커밋 12개</li>
              <li>변경 파일 34개</li>
              <li>테스트 통과</li>
            </ul>
          </Modal.Body>
          <Modal.Actions>
            <Button variant="surface" onClick={() => setOpen(false)}>
              닫기
            </Button>
            <Button color="primary" onClick={() => setOpen(false)}>
              배포
            </Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  },
};

/** Header와 Footer는 고정되고 Body만 스크롤됩니다. */
export const LongContent: Story = {
  name: '긴 내용 · Body 스크롤',
  render: function LongStory() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>긴 내용</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="이용약관"
          footer={
            <>
              <Button variant="surface" onClick={() => setOpen(false)}>
                취소
              </Button>
              <Button color="primary" onClick={() => setOpen(false)}>
                확인
              </Button>
            </>
          }
        >
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i} className="mb-3 text-sm">
              제{i + 1}조 — 본 약관은 서비스 이용에 관한 사항을 규정합니다.
            </p>
          ))}
        </Modal>
      </>
    );
  },
};
