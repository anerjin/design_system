import { useRef, useState, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuGroup,
  ContextMenuLabel,
} from './ContextMenu';
import { Button } from './Button';
import { Icon } from './Icon';

const meta: Meta<typeof ContextMenu> = {
  title: 'Actions/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    gallery: {
      description:
        'Base UI 기반 컨텍스트 메뉴. 우클릭·길게 누르기·Shift+F10으로 열고 방향키와 Enter로 실행합니다. 중첩 메뉴, 체크·라디오 항목을 지원합니다.',
      props: [
        { name: 'open / defaultOpen', type: 'boolean', description: '제어 / 비제어 열림 상태' },
        { name: 'onOpenChange', type: '(open, details) => void' },
        { name: 'disabled', type: 'boolean', defaultValue: 'false' },
        {
          name: 'ContextMenuContent.side',
          type: 'top | bottom | left | right | inline-start | inline-end',
          description: '화면 경계에 맞춰 자동 배치',
        },
        { name: 'ContextMenuItem.onClick', type: 'function', description: '항목 실행' },
        {
          name: 'ContextMenuCheckboxItem.checked',
          type: 'boolean',
          description: 'onCheckedChange로 상태 변경',
        },
        {
          name: 'ContextMenuRadioGroup.value',
          type: 'string',
          description: 'onValueChange로 단일 선택 변경',
        },
      ],
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

function MenuExample({ children, disabled = false }: { children: ReactNode; disabled?: boolean }) {
  const trigger = useRef<HTMLDivElement>(null);
  return (
    <ContextMenu disabled={disabled}>
      <ContextMenuTrigger ref={trigger} className="doi-context-demo" aria-label="파일 작업 영역">
        <Icon name="folder" size={28} />
        <strong>프로젝트 파일</strong>
        <span className="text-sm opacity-60">우클릭 또는 길게 누르기 · Shift+F10</span>
        <Button
          size="sm"
          variant="surface"
          disabled={disabled}
          onClick={() => {
            const rect = trigger.current!.getBoundingClientRect();
            trigger.current!.dispatchEvent(
              new MouseEvent('contextmenu', {
                bubbles: true,
                cancelable: true,
                clientX: rect.left + 24,
                clientY: rect.top + 48,
              }),
            );
          }}
        >
          메뉴 열기
        </Button>
      </ContextMenuTrigger>
      <ContextMenuContent>{children}</ContextMenuContent>
    </ContextMenu>
  );
}
export const Default: Story = {
  name: '파일 작업',
  render: function Basic() {
    const [action, setAction] = useState('파일을 선택해 작업을 실행해 보세요.');
    return (
      <div className="grid gap-4">
        <MenuExample>
          <ContextMenuGroup>
            <ContextMenuLabel>파일 작업</ContextMenuLabel>
            <ContextMenuItem onClick={() => setAction('파일을 복제했습니다.')}>
              <Icon name="copy" size={16} />
              복제
            </ContextMenuItem>
            <ContextMenuItem onClick={() => setAction('이름 변경을 선택했습니다.')}>
              <Icon name="pencil" size={16} />
              이름 변경
            </ContextMenuItem>
            <ContextMenuItem disabled>붙여넣기</ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuItem variant="destructive" onClick={() => setAction('파일을 휴지통으로 이동했습니다.')}>
            <Icon name="trash-2" size={16} />
            휴지통으로 이동
          </ContextMenuItem>
        </MenuExample>
        <p role="status" className="text-sm opacity-70">
          {action}
        </p>
      </div>
    );
  },
};
/** 오른쪽 방향키로 하위 메뉴를 열고 Escape로 상위 메뉴로 돌아갑니다. */
export const Submenu: Story = {
  name: '중첩 메뉴',
  render: function Nested() {
    const [action, setAction] = useState('내보낼 형식을 선택하세요.');
    return (
      <div className="grid gap-4">
        <MenuExample>
          <ContextMenuItem onClick={() => setAction('미리보기를 선택했습니다.')}>미리보기</ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>내보내기</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem onClick={() => setAction('PDF 형식을 선택했습니다.')}>
                PDF 문서
              </ContextMenuItem>
              <ContextMenuItem onClick={() => setAction('PNG 형식을 선택했습니다.')}>
                PNG 이미지
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </MenuExample>
        <p role="status">{action}</p>
      </div>
    );
  },
};
export const Checkboxes: Story = {
  name: '표시 설정',
  render: function Checks() {
    const [grid, setGrid] = useState(true);
    const [guides, setGuides] = useState(false);
    return (
      <div className="grid gap-4">
        <MenuExample>
          <ContextMenuGroup>
            <ContextMenuLabel>화면 표시</ContextMenuLabel>
            <ContextMenuCheckboxItem checked={grid} onCheckedChange={setGrid}>
              그리드
            </ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem checked={guides} onCheckedChange={setGuides}>
              안내선
            </ContextMenuCheckboxItem>
          </ContextMenuGroup>
        </MenuExample>
        <p role="status">
          그리드 {grid ? '켜짐' : '꺼짐'} · 안내선 {guides ? '켜짐' : '꺼짐'}
        </p>
      </div>
    );
  },
};
export const Radio: Story = {
  name: '정렬 선택',
  render: function Sort() {
    const [sort, setSort] = useState('이름순');
    return (
      <div className="grid gap-4">
        <MenuExample>
          <ContextMenuGroup>
            <ContextMenuLabel>정렬 기준</ContextMenuLabel>
            <ContextMenuRadioGroup value={sort} onValueChange={setSort}>
              {['이름순', '수정일순', '크기순'].map((value) => (
                <ContextMenuRadioItem key={value} value={value}>
                  {value}
                </ContextMenuRadioItem>
              ))}
            </ContextMenuRadioGroup>
          </ContextMenuGroup>
        </MenuExample>
        <p role="status">현재 정렬: {sort}</p>
      </div>
    );
  },
};
/** Shortcut은 표시용 힌트입니다. 실제 단축키 바인딩은 사용하는 화면에서 연결합니다. */
export const Shortcuts: Story = {
  name: '단축키 표시',
  render: () => (
    <MenuExample>
      <ContextMenuItem>
        뒤로<ContextMenuShortcut>Alt+←</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem>
        새로고침<ContextMenuShortcut>Ctrl+R</ContextMenuShortcut>
      </ContextMenuItem>
    </MenuExample>
  ),
};
export const Disabled: Story = {
  name: '비활성 영역',
  render: () => (
    <MenuExample disabled>
      <ContextMenuItem>실행</ContextMenuItem>
    </MenuExample>
  ),
};
