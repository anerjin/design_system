import { forwardRef, useEffect, useId, useRef, useState } from 'react';
import ChartJS from 'chart.js/auto';
import { merge } from 'chart.js/helpers';
import type { ChartConfiguration, ChartOptions } from 'chart.js';

export type ChartKind = 'bar' | 'line' | 'pie' | 'doughnut' | 'radar' | 'polarArea';
export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}
export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string;
  borderWidth?: number;
  fill?: boolean;
  stack?: string;
}
export interface ChartProps {
  type: ChartKind | 'area';
  data?: ChartDataPoint[];
  datasets?: ChartDataset[];
  labels?: string[];
  title?: string;
  width?: number | string;
  height?: number | string;
  showLegend?: boolean;
  showGrid?: boolean;
  animated?: boolean;
  responsive?: boolean;
  showTooltip?: boolean;
  theme?: 'default' | 'pastel' | 'vivid' | 'dark';
  beginAtZero?: boolean;
  /** Chart.js options, merged with DOI INC defaults. */
  options?: ChartOptions<ChartKind>;
  className?: string;
  onClick?: (dataPoint: ChartDataPoint | undefined, index: number) => void;
}
/** Official Chart.js renderer, compatible with existing data/datasets callers. */
export const Chart = forwardRef<HTMLDivElement, ChartProps>(
  (
    {
      type = 'bar',
      data,
      datasets,
      labels,
      title,
      width = '100%',
      height = 400,
      showLegend = true,
      showGrid = true,
      animated = true,
      responsive = true,
      showTooltip = true,
      theme = 'default',
      beginAtZero = true,
      options,
      className,
      onClick,
    },
    ref,
  ) => {
    const canvas = useRef<HTMLCanvasElement>(null);
    const instance = useRef<ChartJS<ChartKind, number[], string> | null>(null);
    const click = useRef(onClick);
    click.current = onClick;
    const summaryId = useId();
    const [appearance, setAppearance] = useState('');
    const chartLabels = labels ?? data?.map((point) => point.label) ?? [];
    const hasData = datasets?.length
      ? datasets.some((set) => set.data.some(Number.isFinite))
      : !!data?.some((point) => Number.isFinite(point.value));
    useEffect(() => {
      const sync = () => {
        const style = getComputedStyle(canvas.current!);
        setAppearance(
          [
            '--color-base-100',
            '--color-base-content',
            '--color-base-300',
            '--color-primary',
            '--color-secondary',
          ]
            .map((key) => style.getPropertyValue(key))
            .join('|') + style.colorScheme,
        );
      };
      sync();
      const observer = new MutationObserver(sync);
      let node: HTMLElement | null = canvas.current;
      while (node) {
        observer.observe(node, { attributes: true, attributeFilter: ['data-theme', 'class', 'style'] });
        node = node.parentElement;
      }
      const media = matchMedia('(prefers-color-scheme: dark)');
      media.addEventListener('change', sync);
      return () => {
        observer.disconnect();
        media.removeEventListener('change', sync);
      };
    }, []);
    useEffect(
      () => () => {
        instance.current?.destroy();
        instance.current = null;
      },
      [],
    );
    useEffect(() => {
      if (!canvas.current) return;
      const style = getComputedStyle(canvas.current);
      const token = (name: string) => style.getPropertyValue(name).trim();
      const dark = style.colorScheme === 'dark';
      const palette =
        theme === 'pastel'
          ? ['#a78bfa', '#94a3b8', '#c4b5fd', '#a1a1aa', '#d4d4d8']
          : theme === 'vivid'
            ? ['#7c3aed', '#2563eb', '#15803d', '#b45309', '#dc2626']
            : theme === 'dark' || dark
              ? ['#fafafa', '#a78bfa', '#a1a1aa', '#d4d4d8', '#71717a']
              : [
                  token('--color-primary') || '#000',
                  token('--color-secondary') || '#7c3aed',
                  '#71717a',
                  '#a1a1aa',
                  '#d4d4d8',
                ];
      const round = ['pie', 'doughnut', 'polarArea'].includes(type);
      const radial = type === 'radar' || type === 'polarArea';
      const actualType: ChartKind = type === 'area' ? 'line' : type;
      const finite = (value: number) => (Number.isFinite(value) ? value : 0);
      const source: ChartDataset[] = datasets?.length
        ? datasets
        : [{ label: title || '데이터', data: data?.map((point) => point.value) ?? [] }];
      const chartData = {
        labels: chartLabels,
        datasets: source.map((set, index) => ({
          ...set,
          data: set.data.map(finite),
          backgroundColor:
            set.backgroundColor ??
            (round
              ? chartLabels.map((_, i) => data?.[i]?.color ?? palette[i % palette.length])
              : type === 'area'
                ? dark
                  ? '#27272a'
                  : '#e4e4e7'
                : data && !datasets && type === 'bar'
                  ? data.map((point) => point.color ?? palette[0])
                  : palette[index % palette.length]),
          borderColor:
            set.borderColor ?? (round ? token('--color-base-100') : palette[index % palette.length]),
          borderWidth: set.borderWidth ?? (type === 'bar' ? 0 : 2),
          borderRadius: type === 'bar' ? 4 : 0,
          fill: set.fill ?? type === 'area',
          tension: 0.3,
          pointRadius: 3,
          pointHoverRadius: 5,
          pointHitRadius: 12,
        })),
      };
      const foreground = token('--color-base-content') || '#18181b';
      const grid = token('--color-base-300') || '#e4e4e7';
      const font = { family: style.fontFamily, size: 12 };
      const scales: ChartOptions<ChartKind>['scales'] = radial
        ? {
            r: {
              beginAtZero,
              ticks: { color: foreground, backdropColor: 'transparent', font },
              grid: { display: showGrid, color: grid },
              angleLines: { color: grid },
              pointLabels: { color: foreground, font },
            },
          }
        : round
          ? {}
          : {
              x: { ticks: { color: foreground, font }, grid: { display: false }, border: { display: false } },
              y: {
                beginAtZero,
                ticks: { color: foreground, font },
                grid: { display: showGrid, color: grid },
                border: { display: false },
              },
            };
      merge(scales, options?.scales ?? {});
      const config: ChartConfiguration<ChartKind, number[], string> = {
        type: actualType,
        data: chartData,
        options: {
          responsive,
          maintainAspectRatio: false,
          animation: { duration: 300 },
          interaction: { mode: 'nearest', intersect: true },
          ...options,
          ...(!animated || matchMedia('(prefers-reduced-motion: reduce)').matches
            ? { animation: false as const }
            : {}),
          scales,
          onResize: (chart, size) => {
            // Stop an in-flight data animation before Chart.js recalculates pixel positions.
            chart.stop();
            options?.onResize?.(chart, size);
          },
          plugins: {
            ...options?.plugins,
            legend: {
              position: 'bottom',
              labels: { color: foreground, font, usePointStyle: true, boxWidth: 8, padding: 16 },
              ...options?.plugins?.legend,
              display: showLegend,
            },
            tooltip: {
              backgroundColor: token('--color-base-100'),
              titleColor: foreground,
              bodyColor: foreground,
              borderColor: grid,
              borderWidth: 1,
              padding: 12,
              titleFont: font,
              bodyFont: font,
              ...options?.plugins?.tooltip,
              enabled: showTooltip,
            },
          },
          onClick: (event, elements, chart) => {
            options?.onClick?.(event, elements, chart);
            const hit = elements[0];
            click.current?.(
              hit
                ? {
                    label: String(chart.data.labels?.[hit.index] ?? ''),
                    value: Number(chart.data.datasets[hit.datasetIndex].data[hit.index]),
                    color: data?.[hit.index]?.color,
                  }
                : undefined,
              hit?.index ?? -1,
            );
          },
        },
      };
      if (
        instance.current &&
        'type' in instance.current.config &&
        instance.current.config.type !== actualType
      ) {
        instance.current.destroy();
        instance.current = null;
      }
      if (instance.current) {
        instance.current.data = config.data;
        instance.current.options = config.options!;
        instance.current.update();
      } else instance.current = new ChartJS(canvas.current, config);
    }, [
      type,
      data,
      datasets,
      labels,
      title,
      showLegend,
      showGrid,
      animated,
      responsive,
      showTooltip,
      theme,
      beginAtZero,
      options,
      appearance,
    ]);
    return (
      <div
        ref={ref}
        className={['doi-chart', responsive ? 'max-w-full' : '', className].filter(Boolean).join(' ')}
        style={{ width }}
        data-chart-engine="chart.js"
      >
        {title && <h3 className="doi-chart-title">{title}</h3>}
        <div className="doi-chart-canvas" style={{ height }}>
          <canvas
            ref={canvas}
            width={typeof width === 'number' ? width : undefined}
            height={typeof height === 'number' ? height : undefined}
            role="img"
            aria-label={title || '차트'}
            aria-describedby={summaryId}
          />
        </div>
        {!hasData && <p className="doi-chart-empty">표시할 데이터가 없습니다.</p>}
        <table id={summaryId} className="sr-only">
          <caption>{title || '차트'} 데이터</caption>
          <thead>
            <tr>
              <th scope="col">항목</th>
              {(datasets?.length ? datasets : [{ label: '값' }]).map((set, i) => (
                <th scope="col" key={i}>
                  {set.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {chartLabels.map((label, i) => (
              <tr key={i}>
                <th scope="row">{label}</th>
                {datasets?.length ? (
                  datasets.map((set, j) => (
                    <td key={j}>{Number.isFinite(set.data[i]) ? set.data[i] : '—'}</td>
                  ))
                ) : (
                  <td>{Number.isFinite(data?.[i]?.value) ? data?.[i]?.value : '—'}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
);
Chart.displayName = 'Chart';
