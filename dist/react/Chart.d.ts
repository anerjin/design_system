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
export declare const Chart: import("react").ForwardRefExoticComponent<ChartProps & import("react").RefAttributes<HTMLDivElement>>;
export default Chart;
//# sourceMappingURL=Chart.d.ts.map