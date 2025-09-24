import { forwardRef, useEffect, useRef } from 'react';

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
}

export interface ChartProps {
  /**
   * 차트 타입
   */
  type: 'bar' | 'line' | 'pie' | 'doughnut' | 'area' | 'radar' | 'polar';

  /**
   * 차트 데이터 (간단한 데이터 포인트 배열)
   */
  data?: ChartDataPoint[];

  /**
   * 차트 데이터셋 (복잡한 다중 데이터셋)
   */
  datasets?: ChartDataset[];

  /**
   * X축 레이블 (datasets 사용 시)
   */
  labels?: string[];

  /**
   * 차트 제목
   */
  title?: string;

  /**
   * 너비
   */
  width?: number | string;

  /**
   * 높이
   */
  height?: number | string;

  /**
   * 범례 표시 여부
   * @default true
   */
  showLegend?: boolean;

  /**
   * 그리드 표시 여부
   * @default true
   */
  showGrid?: boolean;

  /**
   * 애니메이션 활성화
   * @default true
   */
  animated?: boolean;

  /**
   * 반응형 여부
   * @default true
   */
  responsive?: boolean;

  /**
   * 툴팁 표시 여부
   * @default true
   */
  showTooltip?: boolean;

  /**
   * 색상 테마
   * @default 'default'
   */
  theme?: 'default' | 'pastel' | 'vivid' | 'dark';

  /**
   * Y축 시작점을 0으로 고정
   * @default true
   */
  beginAtZero?: boolean;

  /**
   * 추가 CSS 클래스
   */
  className?: string;

  /**
   * 클릭 이벤트
   */
  onClick?: (dataPoint: ChartDataPoint | undefined, index: number) => void;
}

/**
 * BRICKS 디자인 시스템 Chart 컴포넌트
 *
 * @example
 * ```tsx
 * <Chart
 *   type="bar"
 *   data={[
 *     { label: 'Jan', value: 65 },
 *     { label: 'Feb', value: 59 },
 *     { label: 'Mar', value: 80 }
 *   ]}
 *   title="Monthly Sales"
 * />
 * ```
 */
export const Chart = forwardRef<HTMLDivElement, ChartProps>(({
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
  className,
  onClick,
  ...props
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const chartClasses = [
    'chart-container',
    responsive ? 'chart-container--medium' : '',
    className
  ].filter(Boolean).join(' ');

  const getThemeColors = () => {
    // 회색조 팔레트 (기존 vanilla JS와 동일)
    const grayScaleLight = ['#111827', '#1F2937', '#374151', '#4B5563', '#6B7280', '#9CA3AF', '#D1D5DB', '#E5E7EB'];
    const grayScaleDark = ['#F3F4F6', '#E5E7EB', '#D1D5DB', '#9CA3AF', '#6B7280', '#4B5563', '#374151', '#1F2937'];

    switch (theme) {
      case 'dark':
        return grayScaleDark;
      case 'pastel':
        return ['#D1D5DB', '#E5E7EB', '#F3F4F6', '#9CA3AF', '#6B7280', '#F9FAFB'];
      case 'vivid':
        return ['#111827', '#1F2937', '#374151', '#4B5563', '#6B7280', '#9CA3AF'];
      default:
        return grayScaleLight;
    }
  };

  useEffect(() => {
    const renderChart = () => {
      if (!canvasRef.current || !containerRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size
      const containerWidth = containerRef.current.offsetWidth || 600;
      const containerHeight = typeof height === 'number' ? height : parseInt(height) || 400;

      canvas.width = containerWidth;
      canvas.height = containerHeight;

    const colors = getThemeColors();

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Simple rendering for demonstration
    // In production, you would use a charting library like Chart.js
    if (data && data.length > 0) {
      const maxValue = Math.max(...data.map(d => d.value));
      const padding = 40;
      const chartWidth = canvas.width - padding * 2;
      const chartHeight = canvas.height - padding * 2;

      // Draw grid
      if (showGrid) {
        ctx.strokeStyle = '#E5E7EB';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 5; i++) {
          const y = padding + (chartHeight / 5) * i;
          ctx.beginPath();
          ctx.moveTo(padding, y);
          ctx.lineTo(canvas.width - padding, y);
          ctx.stroke();
        }
      }

      // Draw bars for bar chart
      if (type === 'bar') {
        const barWidth = chartWidth / data.length * 0.6;
        const gap = chartWidth / data.length * 0.4;

        data.forEach((point, index) => {
          const barHeight = (point.value / maxValue) * chartHeight;
          const x = padding + (barWidth + gap) * index + gap / 2;
          const y = canvas.height - padding - barHeight;

          ctx.fillStyle = point.color || colors[index % colors.length];
          ctx.fillRect(x, y, barWidth, barHeight);

          // Draw label
          ctx.fillStyle = '#6B7280';
          ctx.font = '12px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(point.label, x + barWidth / 2, canvas.height - padding + 20);
        });
      }

      // Draw line for line chart
      if (type === 'line' || type === 'area') {
        const pointSpacing = chartWidth / (data.length - 1);

        ctx.strokeStyle = colors[0];
        ctx.lineWidth = 2;
        ctx.beginPath();

        data.forEach((point, index) => {
          const x = padding + pointSpacing * index;
          const y = canvas.height - padding - (point.value / maxValue) * chartHeight;

          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });

        if (type === 'area') {
          ctx.lineTo(canvas.width - padding, canvas.height - padding);
          ctx.lineTo(padding, canvas.height - padding);
          ctx.closePath();
          ctx.fillStyle = colors[0] + '40';
          ctx.fill();
        }

        ctx.stroke();

        // Draw points
        data.forEach((point, index) => {
          const x = padding + pointSpacing * index;
          const y = canvas.height - padding - (point.value / maxValue) * chartHeight;

          ctx.fillStyle = colors[0];
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // Draw pie/doughnut chart
      if (type === 'pie' || type === 'doughnut') {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(chartWidth, chartHeight) / 2 * 0.8;
        const total = data.reduce((sum, point) => sum + point.value, 0);
        let currentAngle = -Math.PI / 2;

        data.forEach((point, index) => {
          const sliceAngle = (point.value / total) * Math.PI * 2;

          ctx.fillStyle = point.color || colors[index % colors.length];
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
          ctx.closePath();
          ctx.fill();

          if (type === 'doughnut') {
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius * 0.5, 0, Math.PI * 2);
            ctx.fill();
          }

          currentAngle += sliceAngle;
        });
      }

      }
    };

    // Handle click events
    const handleClick = (e: MouseEvent) => {
      if (!onClick || !data || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      // const y = e.clientY - rect.top; // Not used for bar chart click detection

      // Simple click detection for bar chart
      if (type === 'bar') {
        const padding = 40;
        const chartWidth = canvas.width - padding * 2;
        const barWidth = chartWidth / data.length * 0.6;
        const gap = chartWidth / data.length * 0.4;

        data.forEach((point, index) => {
          const barX = padding + (barWidth + gap) * index + gap / 2;
          if (x >= barX && x <= barX + barWidth) {
            onClick(point, index);
          }
        });
      }
    };

    // Render the chart
    renderChart();

    // Add event listener if canvas exists
    if (canvasRef.current) {
      canvasRef.current.addEventListener('click', handleClick);
    }

    // Use setTimeout to ensure DOM is ready
    const timer = setTimeout(renderChart, 10);

    return () => {
      clearTimeout(timer);
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('click', handleClick);
      }
    };
  }, [type, data, datasets, labels, title, showGrid, theme, onClick, height, width]);

  return (
    <div
      ref={ref}
      className={chartClasses}
      style={{ width, height: typeof height === 'number' ? `${height}px` : height }}
      {...props}
    >
      {title && <div className="chart-title">{title}</div>}
      <div ref={containerRef} className="chart-wrapper" style={{ position: 'relative', width: '100%', height: typeof height === 'number' ? `${height}px` : height }}>
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
      </div>
      {showLegend && data && data.length > 0 && (
        <div className="chart-legend">
          {data.map((point, index) => (
            <div key={index} className="chart-legend__item">
              <span
                className="chart-legend__color"
                style={{
                  backgroundColor: point.color || getThemeColors()[index % getThemeColors().length]
                }}
              />
              <span className="chart-legend__label">{point.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

Chart.displayName = 'Chart';

export default Chart;