import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon, type IconName } from './Icon';
import { ICON_NAMES } from './icon-registry';
import { Button } from './Button';

const KEYWORDS: Partial<Record<IconName, string>> = {
  house: '홈 집',
  'user-round': '사용자 프로필 회원',
  users: '사용자 팀 멤버',
  settings: '설정',
  search: '검색 찾기',
  bell: '알림',
  mail: '메일 이메일',
  heart: '좋아요 하트',
  star: '별 즐겨찾기',
  'trash-2': '삭제 휴지통',
  pencil: '수정 편집',
  download: '다운로드 저장',
  upload: '업로드',
  camera: '사진 카메라',
  image: '이미지 사진',
  calendar: '달력 날짜',
  clock: '시간 시계',
  lock: '잠금 보안',
  check: '확인 완료',
  x: '닫기 취소',
  plus: '추가',
  folder: '폴더',
  file: '파일 문서',
  'credit-card': '카드 결제',
  paperclip: '첨부',
  'chevron-left': '이전 왼쪽',
  'chevron-right': '다음 오른쪽',
  sun: '라이트 밝게',
  moon: '다크 어둡게',
};
const meta: Meta<typeof Icon> = {
  title: 'Extras/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    gallery: {
      description:
        'DOI INC 공식 아이콘은 Lucide입니다. SVG 기반으로 크기·선 두께·색상을 일관되게 조절합니다.',
      props: [
        { name: 'name', type: 'IconName', description: '검색 목록의 Lucide 이름' },
        { name: 'size', type: 'number | string', defaultValue: '20' },
        { name: 'strokeWidth', type: 'number', defaultValue: '2', description: '선 두께' },
        { name: 'color', type: 'string', defaultValue: 'currentColor' },
        { name: 'aria-label', type: 'string', description: '단독으로 의미를 전달할 때 지정' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'select', options: ICON_NAMES },
    size: { control: 'number' },
    strokeWidth: { control: { type: 'range', min: 1, max: 3, step: 0.5 } },
    color: { control: 'color' },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { name: 'house', size: 20, 'aria-label': '홈' } };

export const Gallery: Story = {
  name: 'Lucide 아이콘 검색 · 코드 복사',
  parameters: { layout: 'padded' },
  render: function IconBrowser() {
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState<IconName>('house');
    const [size, setSize] = useState(24);
    const [stroke, setStroke] = useState(2);
    const [page, setPage] = useState(0);
    const [message, setMessage] = useState('');
    const found = ICON_NAMES.filter((name) =>
      `${name} ${KEYWORDS[name] ?? ''}`.includes(query.trim().toLowerCase()),
    );
    const pageCount = Math.max(1, Math.ceil(found.length / 24));
    const code = `<Icon name="${selected}" size={${size}} strokeWidth={${stroke}} />`;
    const copy = async (value: string) => {
      try {
        await navigator.clipboard.writeText(value);
        setMessage('복사했습니다.');
      } catch {
        setMessage('복사하지 못했습니다. 아래 코드를 선택해 복사하세요.');
      }
    };
    return (
      <div className="icon-browser">
        <div className="icon-browser-heading">
          <div>
            <h2>Lucide Icons</h2>
            <p>{ICON_NAMES.length}개의 프로젝트 공통 아이콘</p>
          </div>
          <a href="https://lucide.dev/icons/" target="_blank" rel="noreferrer">
            전체 아이콘 <Icon name="arrow-up-right" size={16} />
          </a>
        </div>
        <label className="icon-browser-search">
          <Icon name="search" size={18} />
          <input
            aria-label="아이콘 검색"
            placeholder="이름 또는 용도로 검색 (예: camera, 사진)"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(0);
            }}
          />
        </label>
        <div className="icon-browser-controls">
          <label>
            크기{' '}
            <select aria-label="아이콘 크기" value={size} onChange={(e) => setSize(Number(e.target.value))}>
              {[16, 20, 24, 32].map((n) => (
                <option key={n} value={n}>
                  {n}px
                </option>
              ))}
            </select>
          </label>
          <label>
            선 두께{' '}
            <select
              aria-label="아이콘 선 두께"
              value={stroke}
              onChange={(e) => setStroke(Number(e.target.value))}
            >
              {[1, 1.5, 2, 2.5].map((n) => (
                <option key={n} value={n}>
                  {n}px
                </option>
              ))}
            </select>
          </label>
          <span>{found.length}개 검색됨</span>
        </div>
        <div className="icon-browser-grid">
          {found.slice(page * 24, (page + 1) * 24).map((name) => (
            <button
              type="button"
              key={name}
              aria-label={name}
              aria-pressed={selected === name}
              onClick={() => {
                setSelected(name);
                setMessage('');
              }}
            >
              <Icon name={name} size={size} strokeWidth={stroke} />
              <span>{name}</span>
            </button>
          ))}
        </div>
        {!found.length && (
          <p className="icon-browser-empty">일치하는 아이콘이 없습니다. 다른 이름으로 검색해 보세요.</p>
        )}
        <div className="icon-browser-pagination">
          <Button size="sm" variant="surface" disabled={page === 0} onClick={() => setPage(page - 1)}>
            <Icon name="chevron-left" size={16} />
            이전
          </Button>
          <span>
            {page + 1} / {pageCount}
          </span>
          <Button
            size="sm"
            variant="surface"
            disabled={page + 1 >= pageCount}
            onClick={() => setPage(page + 1)}
          >
            다음
            <Icon name="chevron-right" size={16} />
          </Button>
        </div>
        <div className="icon-browser-selection">
          <Icon name={selected} size={32} strokeWidth={stroke} />
          <strong>{selected}</strong>
          <div>
            <Button size="sm" variant="surface" onClick={() => copy(selected)}>
              이름 복사
            </Button>
            <Button size="sm" color="primary" onClick={() => copy(code)}>
              <Icon name="copy" size={16} />
              코드 복사
            </Button>
          </div>
        </div>
        <pre className="icon-browser-code">
          <code>{code}</code>
        </pre>
        <p role="status" className="icon-browser-message">
          {message || '아이콘을 선택하면 사용할 코드를 확인할 수 있습니다.'}
        </p>
      </div>
    );
  },
};
export const Sizes: Story = {
  name: '크기',
  render: () => (
    <div className="flex flex-wrap items-end gap-8">
      {[16, 20, 24, 32].map((size) => (
        <div key={size} className="flex flex-col items-center gap-3">
          <Icon name="camera" size={size} />
          <span className="text-xs opacity-60">{size}px</span>
        </div>
      ))}
    </div>
  ),
};
export const StrokeWidths: Story = {
  name: '선 두께',
  render: () => (
    <div className="flex flex-wrap gap-8">
      {[1, 1.5, 2, 2.5].map((strokeWidth) => (
        <div key={strokeWidth} className="flex flex-col items-center gap-3">
          <Icon name="house" size={28} strokeWidth={strokeWidth} />
          <span className="text-xs opacity-60">{strokeWidth}px</span>
        </div>
      ))}
    </div>
  ),
};
export const InContext: Story = {
  name: '버튼과 상태 안내',
  render: () => (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-3">
        <Button color="primary">
          <Icon name="plus" size={16} />새 프로젝트
        </Button>
        <Button variant="surface">
          <Icon name="download" size={16} />
          다운로드
        </Button>
        <Button variant="surface" shape="circle" aria-label="설정">
          <Icon name="settings" size={18} />
        </Button>
      </div>
      <p className="flex items-center gap-2 text-sm">
        <Icon name="circle-check" size={18} />
        변경사항이 반영되었습니다.
      </p>
      <p className="flex items-center gap-2 text-sm">
        <Icon name="sparkles" size={18} color="var(--color-secondary)" />
        중요한 안내에만 보조 색상을 사용합니다.
      </p>
    </div>
  ),
};
