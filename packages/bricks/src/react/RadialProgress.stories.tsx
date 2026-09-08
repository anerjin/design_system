import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from './Icon';
import { Button } from './Button';
import { Range } from './Range';
import { RadialProgress } from './RadialProgress';
import type { Color } from './utils';

const COLORS: Color[] = ['neutral', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'];
const meta: Meta<typeof RadialProgress> = {
  title: 'Feedback/RadialProgress',
  component: RadialProgress,
  parameters: {
    layout: 'padded',
    gallery: {
      description:
        '회색 배경 링 위에 진행률을 표시합니다. 하나의 SVG 선으로 양 끝을 둥글고 균일하게 그립니다.',
      props: [
        { name: 'value', type: 'number', defaultValue: '0', description: '0~100' },
        { name: 'color', type: 'neutral | primary | … | error', defaultValue: 'primary' },
        { name: 'size', type: 'string', defaultValue: "'5rem'", description: '지름 (CSS 길이)' },
        { name: 'thickness', type: 'string', description: '링 두께 (CSS 길이), 기본값은 지름의 1/14' },
        { name: 'showValue', type: 'boolean', defaultValue: 'true', description: '중앙 퍼센트 표시' },
        { name: 'children', type: 'ReactNode', description: '중앙에 표시할 내용' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    color: { control: 'select', options: COLORS },
    showValue: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '진행률 조절',
  args: { value: 70, color: 'primary' },
  render: function ProgressExample(args) {
    const [value, setValue] = useState(args.value ?? 70);
    useEffect(() => setValue(args.value ?? 70), [args.value]);
    return (
      <div className="radial-example-panel rounded-box bg-base-100">
        <div className="radial-example-summary">
          <RadialProgress
            {...args}
            value={value}
            size={args.size ?? '6rem'}
            aria-label="파일 동기화 진행률"
          />
          <div>
            <h3>파일 동기화</h3>
            <p>
              {value === 100
                ? '모든 파일이 최신 상태입니다.'
                : value === 0
                  ? '동기화를 시작할 준비가 되었습니다.'
                  : '작업의 진행 상태를 한눈에 확인하세요.'}
            </p>
          </div>
        </div>
        <div className="radial-example-control">
          <label htmlFor="radial-demo-value">진행률</label>
          <Range
            id="radial-demo-value"
            value={value}
            min={0}
            max={100}
            step={1}
            color="primary"
            size="sm"
            onChange={(event) => setValue(Number(event.target.value))}
          />
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          <Button size="sm" variant="surface" onClick={() => setValue(0)}>
            초기화
          </Button>
          <Button
            size="sm"
            color="primary"
            disabled={value === 100}
            onClick={() => setValue(Math.min(100, value + 10))}
          >
            10% 진행
          </Button>
        </div>
      </div>
    );
  },
};

export const States: Story = {
  name: '시작 · 진행 · 완료',
  render: () => (
    <div className="radial-example-grid">
      {[0, 1, 25, 70, 99, 100].map((value) => (
        <div className="radial-example-item" key={value}>
          <RadialProgress value={value} aria-label={`${value}% 진행 상태`} />
          <span>{value === 0 ? '시작 전' : value === 100 ? '완료' : `${value}% 진행`}</span>
        </div>
      ))}
    </div>
  ),
};

export const Colors: Story = {
  name: '강조 색상',
  render: () => (
    <div className="radial-example-grid">
      {(
        [
          ['primary', '프라임'],
          ['secondary', '서브'],
          ['neutral', '뉴트럴'],
        ] as const
      ).map(([color, label]) => (
        <div key={color} className="radial-example-item">
          <RadialProgress value={70} color={color} aria-label={`${label} 진행률`} />
          <span>{label}</span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  name: '크기',
  render: () => (
    <div className="radial-example-grid items-end">
      {['3rem', '4rem', '5rem', '7rem', '9rem'].map((size) => (
        <div key={size} className="radial-example-item">
          <RadialProgress value={65} size={size} aria-label={`${size} 진행률`} />
          <span>{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const Thickness: Story = {
  name: '선 두께',
  render: () => (
    <div className="radial-example-grid">
      {['2px', '4px', '6px', '8px'].map((thickness) => (
        <div key={thickness} className="radial-example-item">
          <RadialProgress value={70} size="6rem" thickness={thickness} aria-label={`${thickness} 선 두께`} />
          <span>{thickness}</span>
        </div>
      ))}
    </div>
  ),
};

export const CustomContent: Story = {
  name: '지표 · 사용량 · 완료 표시',
  render: () => (
    <div className="radial-example-grid">
      <div className="radial-example-item">
        <RadialProgress value={82} size="7rem" aria-label="목표 달성률">
          <span className="flex flex-col items-center gap-1">
            <span className="text-xl font-semibold">82</span>
            <span className="text-xs font-normal opacity-60">/ 100</span>
          </span>
        </RadialProgress>
        <span>목표 달성</span>
      </div>
      <div className="radial-example-item">
        <RadialProgress value={45} size="7rem" color="secondary" aria-label="저장 공간 사용률">
          <span className="flex flex-col items-center gap-1">
            <Icon name="hard-drive" size={20} />
            <span className="text-xs font-normal">45 GB</span>
          </span>
        </RadialProgress>
        <span>저장 공간</span>
      </div>
      <div className="radial-example-item">
        <RadialProgress value={100} size="7rem" showValue={false} aria-label="설정 완료">
          <Icon name="check" size={24} />
        </RadialProgress>
        <span>설정 완료</span>
      </div>
    </div>
  ),
};
