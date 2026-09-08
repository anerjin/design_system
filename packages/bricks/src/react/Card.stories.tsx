import { useId, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';
import type { CardVariant } from './Card';
import { Button } from './Button';
import { Badge } from './Badge';
import { Icon } from './Icon';
import { Input } from './Input';
import { Label } from './Fieldset';
import type { Size } from './utils';

const VARIANTS: CardVariant[] = ['normal', 'border', 'dash', 'ghost'];
const SIZES: Size[] = ['xs', 'sm', 'md', 'lg', 'xl'];

/**
 * 데모용 커버.
 *
 * 색을 직접 박지 않고 테마 색으로 칠한다 — 툴바에서 테마를 바꾸면 함께 바뀐다.
 * `Card.Figure`는 이미지뿐 아니라 어떤 요소든 감쌀 수 있다.
 */
const Cover = ({ className = 'h-40 w-full' }: { className?: string }) => (
  <div className={`bg-primary ${className}`} />
);

const meta: Meta<typeof Card> = {
  title: 'Data Display/Card',
  component: Card,
  parameters: {
    layout: 'padded',
    gallery: {
      description:
        'Header · Body · Footer로 구성하는 카드. Header에는 제목과 보조 동작, Body에는 본문, Footer에는 취소·확인 등의 액션을 배치합니다. Header와 Footer는 각각 생략할 수 있습니다.',
      daisyui: 'card',
      props: [
        { name: 'variant', type: 'normal | border | dash | ghost', defaultValue: 'normal' },
        { name: 'size', type: 'xs | sm | md | lg | xl', defaultValue: 'md', description: '안쪽 여백' },
        { name: 'side', type: 'boolean', defaultValue: 'false', description: '이미지를 옆에 붙인다' },
        { name: 'Card.Header', type: 'ReactNode', description: '선택 영역. 제목·설명·닫기 버튼 등' },
        { name: 'Card.Body', type: 'ReactNode', description: '본문 영역. Header와 Footer의 형제로 배치' },
        { name: 'Card.Footer', type: 'ReactNode', description: '선택 영역. 취소·삭제·확인 등 하단 액션' },
        { name: 'Card.Footer.align', type: 'start | center | end | between', defaultValue: 'center' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
    size: { control: 'select', options: SIZES },
    side: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '기본형 · Header + Body + Footer',
  render: function DefaultCard(args) {
    const [visible, setVisible] = useState(true);
    const [confirmed, setConfirmed] = useState(false);
    if (!visible)
      return (
        <Button variant="surface" onClick={() => setVisible(true)}>
          카드 다시 보기
        </Button>
      );
    return (
      <Card {...args} className="w-full max-w-md">
        <Card.Header>
          <Card.Title>프로젝트 검토</Card.Title>
          <Button
            variant="ghost"
            size="sm"
            shape="circle"
            aria-label="카드 닫기"
            onClick={() => setVisible(false)}
          >
            <Icon name="x" size={16} />
          </Button>
        </Card.Header>
        <Card.Body>
          <p>웹사이트 리뉴얼의 최종 시안을 확인하고 검토를 완료해 주세요.</p>
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
            <dt className="opacity-60">담당 팀</dt>
            <dd>디자인팀</dd>
            <dt className="opacity-60">검토 항목</dt>
            <dd>화면 12개 · 컴포넌트 8개</dd>
          </dl>
          {confirmed && (
            <p role="status" className="text-sm">
              검토를 완료했습니다.
            </p>
          )}
        </Card.Body>
        <Card.Footer>
          <Button variant="surface" onClick={() => setConfirmed(false)}>
            취소
          </Button>
          <Button color="primary" onClick={() => setConfirmed(true)} disabled={confirmed}>
            확인
          </Button>
        </Card.Footer>
      </Card>
    );
  },
};

/** Card.Header를 생략하면 Body부터 시작합니다. */
export const WithoutHeader: Story = {
  name: 'Header 없음 · Body + Footer',
  render: function WithoutHeaderCard() {
    const [saved, setSaved] = useState(false);
    return (
      <Card className="w-full max-w-md">
        <Card.Body>
          <div className="flex size-10 items-center justify-center rounded-full bg-base-200">
            <Icon name="folder" size={20} />
          </div>
          <Card.Title>새 프로젝트를 시작하세요</Card.Title>
          <p className="opacity-70">작업과 파일을 한곳에 모으고 팀원과 함께 진행할 수 있습니다.</p>
          {saved && <p role="status">예제 프로젝트가 생성되었습니다.</p>}
        </Card.Body>
        <Card.Footer>
          <Button variant="surface" onClick={() => setSaved(false)}>
            취소
          </Button>
          <Button color="primary" onClick={() => setSaved(true)} disabled={saved}>
            프로젝트 만들기
          </Button>
        </Card.Footer>
      </Card>
    );
  },
};

/** Card.Footer가 없으면 하단 구분선과 액션 영역도 없습니다. */
export const WithoutFooter: Story = {
  name: 'Footer 없음 · Header + Body',
  render: () => (
    <Card className="w-full max-w-md">
      <Card.Header>
        <Card.Title>프로젝트 정보</Card.Title>
        <Badge variant="outline" size="sm">
          진행 중
        </Badge>
      </Card.Header>
      <Card.Body>
        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm">
          <dt className="opacity-60">프로젝트</dt>
          <dd>웹사이트 리뉴얼</dd>
          <dt className="opacity-60">담당 팀</dt>
          <dd>디자인팀</dd>
          <dt className="opacity-60">참여 인원</dt>
          <dd>4명</dd>
        </dl>
      </Card.Body>
    </Card>
  ),
};

export const BodyOnly: Story = {
  name: 'Body만 사용',
  render: () => (
    <Card className="w-full max-w-sm">
      <Card.Body>
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm opacity-70">이번 달 완료한 작업</span>
          <Icon name="check" size={18} />
        </div>
        <strong className="text-3xl font-semibold tracking-tight">
          128<span className="ml-1 text-sm font-normal opacity-60">개</span>
        </strong>
        <p className="text-sm opacity-70">지난달보다 24개 더 완료했습니다.</p>
      </Card.Body>
    </Card>
  ),
};

/** Body의 폼과 Footer의 제출 버튼을 form 속성으로 연결합니다. */
export const EditForm: Story = {
  name: '입력 폼 · 취소와 저장',
  render: function EditCard() {
    const formId = useId();
    const inputId = useId();
    const [saved, setSaved] = useState('웹사이트 리뉴얼');
    const [name, setName] = useState(saved);
    const [message, setMessage] = useState('');
    return (
      <Card className="w-full max-w-md">
        <Card.Header>
          <Card.Title>프로젝트 설정</Card.Title>
        </Card.Header>
        <Card.Body>
          <form
            id={formId}
            className="grid gap-3"
            onSubmit={(event) => {
              event.preventDefault();
              if (!name.trim()) return;
              setSaved(name.trim());
              setName(name.trim());
              setMessage('프로젝트 이름을 저장했습니다.');
            }}
          >
            <Label htmlFor={inputId}>프로젝트 이름</Label>
            <Input
              id={inputId}
              className="w-full"
              required
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setMessage('');
              }}
            />
            <p className="text-sm opacity-70">팀원에게 표시되는 이름입니다.</p>
            {message && (
              <p role="status" className="text-sm">
                {message}
              </p>
            )}
          </form>
        </Card.Body>
        <Card.Footer>
          <Button
            variant="surface"
            onClick={() => {
              setName(saved);
              setMessage('변경사항을 취소했습니다.');
            }}
          >
            취소
          </Button>
          <Button color="primary" type="submit" form={formId} disabled={!name.trim()}>
            저장
          </Button>
        </Card.Footer>
      </Card>
    );
  },
};

export const Variants: Story = {
  name: '표면과 테두리',
  render: () => (
    <div className="flex flex-wrap gap-4">
      {VARIANTS.map((variant) => (
        <Card key={variant} variant={variant} className="w-64">
          <Card.Header>
            <Card.Title>{variant}</Card.Title>
          </Card.Header>
          <Card.Body>
            <p className="text-sm opacity-70">variant=&quot;{variant}&quot;</p>
          </Card.Body>
          <Card.Footer>
            <Badge variant="outline" size="sm">
              {variant}
            </Badge>
          </Card.Footer>
        </Card>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  name: '영역별 여백',
  render: () => (
    <div className="flex flex-wrap items-start gap-4">
      {SIZES.map((size) => (
        <Card key={size} variant="border" size={size} className="w-52">
          <Card.Header>
            <Card.Title>{size}</Card.Title>
          </Card.Header>
          <Card.Body>
            <p>여백이 달라집니다.</p>
          </Card.Body>
          <Card.Footer>
            <span className="text-xs opacity-60">{size} 여백</span>
          </Card.Footer>
        </Card>
      ))}
    </div>
  ),
};

export const WithImage: Story = {
  name: '커버와 세 영역',
  render: () => (
    <Card className="w-full max-w-96">
      <Card.Figure>
        <Cover />
      </Card.Figure>
      <Card.Header>
        <Card.Title>
          신제품 출시
          <Badge color="secondary" size="sm">
            NEW
          </Badge>
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <p>이미지는 Card.Figure로 감쌉니다.</p>
      </Card.Body>
      <Card.Footer>
        <Button color="primary">자세히</Button>
      </Card.Footer>
    </Card>
  ),
};

/** 이미지를 옆에 붙이는 가로 배치 */
export const Side: Story = {
  name: '가로 배치',
  render: () => (
    <Card side variant="border" className="w-full max-w-lg">
      <Card.Figure>
        <Cover className="h-full w-16 sm:w-32" />
      </Card.Figure>
      <div className="flex min-w-0 flex-1 flex-col">
        <Card.Header>
          <Card.Title>가로 배치</Card.Title>
        </Card.Header>
        <Card.Body>
          <p>커버 옆에 Header · Body · Footer를 배치합니다.</p>
        </Card.Body>
        <Card.Footer>
          <Badge variant="outline" size="sm">
            디자인 가이드
          </Badge>
        </Card.Footer>
      </div>
    </Card>
  ),
};

export const ActionAlignment: Story = {
  name: 'Footer 액션 정렬',
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(['start', 'center', 'end', 'between'] as const).map((align) => (
        <Card key={align} variant="border" className="w-64">
          <Card.Header>
            <Card.Title>{align}</Card.Title>
          </Card.Header>
          <Card.Body>
            <p className="text-sm opacity-70">Footer 버튼 정렬</p>
          </Card.Body>
          <Card.Footer align={align}>
            <Button size="sm" variant="surface">
              취소
            </Button>
            <Button size="sm" color="primary">
              확인
            </Button>
          </Card.Footer>
        </Card>
      ))}
    </div>
  ),
};
