/**
 * BRICKS Design System - Chart Component
 * Chart.js 기반 차트 컴포넌트 모듈
 */
interface ThemeColors {
    text: string;
    subtext: string;
    grid: string;
    border: string;
    background: string;
    primary: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
    datasets: string[];
}
interface ChartComponent {
    charts: any[];
    _initialized: boolean;
    _resizeHandlerRegistered?: boolean;
    _resizeTimer?: number | null;
    _resizeObserver?: ResizeObserver;
    _roTimer?: number;
    _domObserver?: MutationObserver;
    destroyIfExists(canvasEl: HTMLCanvasElement | null): void;
    getThemeColors(): ThemeColors;
    getDefaultOptions(): any;
    init(): void;
    setupResizeHandlers(): void;
    resizeAllCharts(): void;
    setupResizeObserver(): void;
    watchChartsInDom(): void;
    initNewlyAddedCharts(): void;
    getChartCanvasIds(): string[];
    initLineChart(): void;
    initBarChart(): void;
    initDoughnutChart(): void;
    initAreaChart(): void;
    initRadarChart(): void;
    initMixedChart(): void;
    initPolarChart(): void;
    initBubbleChart(): void;
    initScatterChart(): void;
    watchThemeChange(): void;
    updateChartsTheme(): void;
}
export { ChartComponent, ThemeColors };
//# sourceMappingURL=chart.d.ts.map