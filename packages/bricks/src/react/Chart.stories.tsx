import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chart, type ChartDataPoint, type ChartProps } from './Chart';
import { Button } from './Button';
import { Select } from './Select';
import { Badge } from './Badge';
import { Link } from './Link';
import { Icon } from './Icon';

const TYPES: ChartProps['type'][] = ['bar', 'line', 'area', 'pie', 'doughnut', 'radar', 'polarArea'];
const THEMES: NonNullable<ChartProps['theme']>[] = ['default', 'pastel', 'vivid', 'dark'];
const monthly: ChartDataPoint[] = [
  { label: '1월', value: 65 },
  { label: '2월', value: 59 },
  { label: '3월', value: 80 },
  { label: '4월', value: 81 },
  { label: '5월', value: 56 },
  { label: '6월', value: 95 },
];
const share: ChartDataPoint[] = [
  { label: '데스크톱', value: 52 },
  { label: '모바일', value: 38 },
  { label: '태블릿', value: 10 },
];
const meta: Meta<typeof Chart> = {
  title: 'Extras/Chart',
  component: Chart,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    gallery: {
      description:
        'DOI INC 공식 차트 엔진은 Chart.js입니다. 반응형 캔버스, 툴팁, 클릭 가능한 범례, 다중 데이터와 라이트·다크 테마를 지원합니다.',
      props: [
        { name: 'type', type: 'bar | line | area | pie | doughnut | radar | polarArea' },
        { name: 'data', type: 'ChartDataPoint[]', description: 'label · value · color를 가진 간편 데이터' },
        { name: 'datasets / labels', type: 'ChartDataset[] / string[]', description: '여러 시리즈 비교' },
        { name: 'height', type: 'number | string', defaultValue: '400' },
        { name: 'showLegend / showTooltip / showGrid', type: 'boolean', defaultValue: 'true' },
        { name: 'animated / responsive', type: 'boolean', defaultValue: 'true' },
        {
          name: 'options',
          type: 'ChartOptions',
          description: 'Chart.js 공식 옵션: 누적 막대·축·플러그인 설정',
        },
        { name: 'onClick', type: '(dataPoint, index) => void', description: '실제 차트 요소의 클릭 결과' },
        { name: 'theme', type: 'default | pastel | vivid | dark', defaultValue: 'default' },
      ],
    },
  },
  argTypes: { type: { control: 'select', options: TYPES }, theme: { control: 'select', options: THEMES } },
};
export default meta;
type Story = StoryObj<typeof meta>;
/** 부드럽게 나타나는 라인 차트. 다시 재생하거나 점에 마우스를 올려 보세요. */
export const Default: Story = {
  name: '월별 매출 · 애니메이션',
  render: function AnimatedRevenueChart() {
    const [replay, setReplay] = useState(0);
    return (
      <div className="grid gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge variant="outline">Chart.js</Badge>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm" variant="surface" onClick={() => setReplay((value) => value + 1)}>
              <Icon name="refresh-cw" size={14} /> 다시 재생
            </Button>
            <Link href="https://www.chartjs.org/docs/latest/" target="_blank" rel="noreferrer">
              공식 문서 <Icon name="external-link" size={14} />
            </Link>
          </div>
        </div>
        <Chart
          key={replay}
          type="line"
          data={monthly}
          title="월별 매출 · 백만원"
          height={300}
          showLegend={false}
          animated
          options={{
            animation: { duration: 1000, easing: 'easeOutQuart' },
            interaction: { mode: 'index', intersect: false },
          }}
        />
      </div>
    );
  },
};
export const Types: Story = {
  name: '차트 유형',
  render: () => (
    <div className="grid gap-8 lg:grid-cols-2">
      {TYPES.map((type) => (
        <Chart
          key={type}
          type={type}
          data={['pie', 'doughnut', 'polarArea'].includes(type) ? share : monthly}
          title={type}
          height={260}
        />
      ))}
    </div>
  ),
};
export const MultiSeries: Story = {
  name: '다중 시리즈',
  render: () => (
    <Chart
      type="line"
      title="매출과 목표"
      labels={monthly.map((point) => point.label)}
      datasets={[
        { label: '매출', data: monthly.map((point) => point.value) },
        { label: '목표', data: [60, 65, 70, 75, 80, 90] },
      ]}
      height={300}
    />
  ),
};
/** 범례를 클릭하면 해당 시리즈를 숨기거나 다시 표시할 수 있습니다. */
export const Stacked: Story = {
  name: '누적 막대',
  render: () => (
    <Chart
      type="bar"
      title="채널별 주문"
      labels={['월', '화', '수', '목', '금']}
      datasets={[
        { label: '온라인', data: [32, 48, 41, 58, 66] },
        { label: '오프라인', data: [20, 25, 30, 22, 35] },
      ]}
      options={{
        scales: { x: { stacked: true, grid: { display: false } }, y: { stacked: true, beginAtZero: true } },
      }}
      height={300}
    />
  ),
};
export const Interactive: Story = {
  name: '실시간 변경과 클릭',
  render: function InteractiveChart() {
    const [type, setType] = useState<ChartProps['type']>('line');
    const [revision, setRevision] = useState(0);
    const [selected, setSelected] = useState('차트의 막대나 점을 클릭해 보세요.');
    return (
      <div className="grid gap-4">
        <div className="flex flex-wrap gap-3">
          <Select
            aria-label="차트 유형"
            size="sm"
            value={type}
            onChange={(event) => setType(event.target.value as ChartProps['type'])}
            options={['bar', 'line', 'area', 'doughnut'].map((value) => ({ value, label: value }))}
          />
          <Button size="sm" variant="surface" onClick={() => setRevision((value) => value + 1)}>
            데이터 갱신
          </Button>
        </div>
        <Chart
          type={type}
          title="실시간 매출"
          data={monthly.map((point, i) => ({ ...point, value: point.value + revision * (i + 1) * 3 }))}
          height={300}
          onClick={(point) =>
            setSelected(point ? `${point.label}: ${point.value}` : '빈 영역을 선택했습니다.')
          }
        />
        <p role="status" className="text-sm">
          {selected}
        </p>
        <p className="text-xs opacity-60">갱신 횟수: {revision}</p>
      </div>
    );
  },
};
export const Themes: Story = {
  name: '색상 테마',
  render: () => (
    <div className="grid gap-8 lg:grid-cols-2">
      {THEMES.map((theme) => (
        <Chart key={theme} type="doughnut" data={share} theme={theme} title={theme} height={260} />
      ))}
    </div>
  ),
};
export const Pie: Story = {
  name: '원형 차트',
  args: { type: 'pie', data: share, title: '기기별 접속 비율', height: 300 },
};
export const Doughnut: Story = {
  name: '도넛 차트',
  args: { type: 'doughnut', data: share, title: '기기별 접속 비율', height: 300 },
};
export const WithoutLegend: Story = {
  name: '간결한 추세',
  args: { type: 'area', data: monthly, showLegend: false, showGrid: false, height: 260 },
};
export const Empty: Story = {
  name: '빈 데이터',
  args: { type: 'bar', data: [], title: '집계 대기', height: 160, animated: false },
};
