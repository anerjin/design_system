/**
 * BRICKS Design System - Chart Component
 * Chart.js 기반 차트 컴포넌트 모듈
 */

import type { AlertOptions, ToastOptions } from '../types/index';

// Chart.js types - external dependency

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



(function(global: Window) {
    'use strict';

    // BRICKS 네임스페이스
    global.BRICKS = global.BRICKS || {} as any;

    /**
     * Chart Component
     */
    global.BRICKS.Chart = {
        charts: [],
        _initialized: false,

        // 기존 차트 인스턴스 파괴 (동일 캔버스 재사용 에러 방지)
        destroyIfExists: function(canvasEl: HTMLCanvasElement | null): void {
            if (!canvasEl) {
                return;
            }

            // Chart.js v3/v4 호환: Chart.getChart 사용 가능 시 우선 조회
            try {
                if (typeof Chart !== 'undefined' && typeof Chart.getChart === 'function') {
                    const existing = Chart.getChart(canvasEl) || Chart.getChart(canvasEl.id);
                    if (existing) {
                        existing.destroy();
                    }
                }
            } catch (e) {
                // 조용히 무시
            }

            // 배열에 보관된 인스턴스도 정리
            for (let i = this.charts.length - 1; i >= 0; i--) {
                const c = this.charts[i];
                if (c && c.canvas === canvasEl) {
                    try { c.destroy(); } catch (e) {}
                    this.charts.splice(i, 1);
                }
            }
        },

        // 테마별 색상 설정
        getThemeColors: function(): ThemeColors {
            const isDark: boolean = document.documentElement.getAttribute('data-theme') === 'dark';
            // 회색조 팔레트
            // Light: 어두운 회색 → 밝은 회색, Dark: 밝은 회색 → 어두운 회색
            const grayScaleLight: string[] = ['#111827', '#1F2937', '#374151', '#4B5563', '#6B7280', '#9CA3AF', '#D1D5DB', '#E5E7EB'];
            const grayScaleDark: string[] = ['#F3F4F6', '#E5E7EB', '#D1D5DB', '#9CA3AF', '#6B7280', '#4B5563', '#374151', '#1F2937'];

            return {
                text: isDark ? '#FFFFFF' : '#1A1A1A',
                subtext: isDark ? '#9CA3AF' : '#6B7280',
                grid: isDark ? '#374151' : '#E5E7EB',
                border: isDark ? '#4B5563' : '#D1D5DB',
                background: isDark ? '#111827' : '#FFFFFF',

                // 회색조 기반 포인트 컬러들
                primary: isDark ? '#E5E7EB' : '#111827',
                success: isDark ? '#D1D5DB' : '#1F2937',
                warning: isDark ? '#9CA3AF' : '#374151',
                danger: isDark ? '#6B7280' : '#4B5563',
                info: isDark ? '#F3F4F6' : '#6B7280',

                // 데이터셋 팔레트
                datasets: isDark ? grayScaleDark : grayScaleLight
            };
        },

        // 기본 차트 옵션
        getDefaultOptions: function(): any {
            const colors: ThemeColors = this.getThemeColors();
            return {
                responsive: true,
                maintainAspectRatio: false,
                resizeDelay: 0,
                plugins: {
                    legend: {
                        labels: {
                            color: colors.text,
                            font: {
                                family: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif'
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: colors.background,
                        titleColor: colors.text,
                        bodyColor: colors.subtext,
                        borderColor: colors.border,
                        borderWidth: 1
                    }
                },
                scales: {
                    x: {
                        ticks: { color: colors.subtext },
                        grid: { color: colors.grid, drawBorder: false }
                    },
                    y: {
                        ticks: { color: colors.subtext },
                        grid: { color: colors.grid, drawBorder: false }
                    }
                }
            };
        },

        // 차트 초기화
        init: function(): void {
            if (this._initialized) {
                // 이미 초기화된 경우 테마만 재적용하고 종료
                this.updateChartsTheme();
                return;
            }
            this._initialized = true;
            this.initLineChart();
            this.initBarChart();
            this.initDoughnutChart();
            this.initAreaChart();
            this.initRadarChart();
            this.initMixedChart();
            this.initPolarChart();
            this.initBubbleChart();
            this.initScatterChart();

            // 테마 변경 감지
            this.watchThemeChange();

            // 초기 로드 시에도 고대비 회색 팔레트 적용
            this.updateChartsTheme();

            // 동적 대응: 리사이즈/관찰자/DOM 변화 감시 설정
            this.setupResizeHandlers();
            this.setupResizeObserver();
            this.watchChartsInDom();
        },

        // 윈도우 리사이즈 디바운스 처리
        setupResizeHandlers: function(): void {
            const self = this;
            if (this._resizeHandlerRegistered) return;
            this._resizeHandlerRegistered = true;
            this._resizeTimer = null;
            window.addEventListener('resize', function() {
                if (self._resizeTimer) {
                    clearTimeout(self._resizeTimer);
                }
                self._resizeTimer = setTimeout(function() {
                    self.resizeAllCharts();
                }, 250);
            });
        },

        // 모든 차트 리사이즈
        resizeAllCharts: function(): void {
            this.charts.forEach(function(chart: any) {
                try { chart.resize(); } catch (e) {}
            });
        },

        // ResizeObserver로 캔버스 컨테이너 크기 변화 추적
        setupResizeObserver: function(): void {
            if (typeof ResizeObserver === 'undefined') return;
            const self = this;
            if (this._resizeObserver) return;
            this._resizeObserver = new ResizeObserver(function(entries: ResizeObserverEntry[]) {
                if (self._roTimer) {
                    clearTimeout(self._roTimer);
                }
                self._roTimer = setTimeout(function() {
                    entries.forEach(function(entry: ResizeObserverEntry) {
                        const target = entry.target as HTMLElement;
                        const canvas = target.tagName === 'CANVAS' ? target : target.querySelector && target.querySelector('canvas');
                        if (!canvas) return;
                        try {
                            const chart = (typeof Chart !== 'undefined' && typeof Chart.getChart === 'function') ? (Chart.getChart(canvas) || Chart.getChart(canvas.id)) : null;
                            if (chart) chart.resize();
                        } catch (e) {}
                    });
                }, 100);
            });

            // 현재 존재하는 차트 캔버스 관찰 시작
            this.getChartCanvasIds().forEach(function(id: string) {
                const el = document.getElementById(id);
                if (el && self._resizeObserver) {
                    self._resizeObserver.observe(el);
                }
            });
        },

        // DOM 변경으로 차트 캔버스가 추가되면 자동 초기화
        watchChartsInDom: function(): void {
            const self = this;
            if (this._domObserver) return;
            this._domObserver = new MutationObserver(function(mutations: MutationRecord[]) {
                let found = false;
                mutations.forEach(function(m: MutationRecord) {
                    if (m.addedNodes) {
                        m.addedNodes.forEach(function(node: Node) {
                            if (node.nodeType !== 1) return;
                            const element = node as HTMLElement;
                            self.getChartCanvasIds().forEach(function(id: string) {
                                if (element.id === id || (element.querySelector && element.querySelector('#' + id))) {
                                    found = true;
                                }
                            });
                        });
                    }
                    // 제거된 경우: charts 배열에서 파괴된 인스턴스 정리
                    if (m.removedNodes && m.removedNodes.length) {
                        self.charts = self.charts.filter(function(c: any){ return c && c.canvas && c.canvas.ownerDocument; });
                    }
                });
                if (found) {
                    // 필요한 차트만 개별 초기화
                    self.initNewlyAddedCharts();
                    // 관찰자에도 등록
                    self.setupResizeObserver();
                    // 테마 재적용
                    self.updateChartsTheme();
                }
            });
            this._domObserver.observe(document.body, { childList: true, subtree: true });
        },

        // 현재 DOM에서 존재하지만 인스턴스가 없는 차트만 초기화
        initNewlyAddedCharts: function(): void {
            const ids: string[] = this.getChartCanvasIds();
            const self = this;
            ids.forEach(function(id: string) {
                const el = document.getElementById(id);
                if (!el) return;
                // 이미 차트가 있으면 스킵, 있더라도 우리 destroy가 안전 처리
                if (id === 'lineChart') self.initLineChart();
                if (id === 'barChart') self.initBarChart();
                if (id === 'doughnutChart') self.initDoughnutChart();
                if (id === 'areaChart') self.initAreaChart();
                if (id === 'radarChart') self.initRadarChart();
                if (id === 'mixedChart') self.initMixedChart();
                if (id === 'polarChart') self.initPolarChart();
                if (id === 'bubbleChart') self.initBubbleChart();
                if (id === 'scatterChart') self.initScatterChart();
            });
        },

        // 관리하는 차트 캔버스 id 목록
        getChartCanvasIds: function(): string[] {
            return ['lineChart','barChart','doughnutChart','areaChart','radarChart','mixedChart','polarChart','bubbleChart','scatterChart'];
        },

        // Line Chart
        initLineChart: function(): void {
            const ctx = document.getElementById('lineChart') as HTMLCanvasElement | null;
            if (!ctx) return;
            if (!ctx.ownerDocument) return;

            const colors: ThemeColors = this.getThemeColors();
            this.destroyIfExists(ctx);
            const palette: string[] = colors.datasets;
            const isDark: boolean = document.documentElement.getAttribute('data-theme') === 'dark';
            const line1: string = isDark ? palette[1] : palette[5];
            const line2: string = isDark ? palette[2] : palette[4];
            const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: '매출',
                        data: [12, 19, 15, 25, 22, 30, 28, 35, 33, 40, 38, 45],
                        borderColor: line1,
                        backgroundColor: line1 + '33',
                        borderDash: [6, 4],
                        pointStyle: 'circle',
                        tension: 0.4,
                        borderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    }, {
                        label: '이익',
                        data: [8, 12, 10, 18, 15, 22, 20, 25, 24, 30, 28, 32],
                        borderColor: line2,
                        backgroundColor: line2 + '33',
                        borderDash: [6, 4],
                        pointStyle: 'circle',
                        tension: 0.4,
                        borderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    }]
                },
                options: this.getDefaultOptions()
            });
            this.charts.push(chart);
        },

        // Bar Chart
        initBarChart: function(): void {
            const ctx = document.getElementById('barChart') as HTMLCanvasElement | null;
            if (!ctx) return;
            if (!ctx.ownerDocument) return;

            const colors: ThemeColors = this.getThemeColors();
            this.destroyIfExists(ctx);
            const palette: string[] = colors.datasets;
            const chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                    datasets: [{
                        label: '2023',
                        data: [12, 19, 15, 25],
                        backgroundColor: palette[0]
                    }, {
                        label: '2024',
                        data: [18, 25, 20, 30],
                        backgroundColor: palette[palette.length - 2]
                    }]
                },
                options: this.getDefaultOptions()
            });
            this.charts.push(chart);
        },

        // Doughnut Chart
        initDoughnutChart: function(): void {
            const ctx = document.getElementById('doughnutChart') as HTMLCanvasElement | null;
            if (!ctx) return;
            if (!ctx.ownerDocument) return;

            const colors: ThemeColors = this.getThemeColors();
            this.destroyIfExists(ctx);
            const palette: string[] = colors.datasets;
            const isDark: boolean = document.documentElement.getAttribute('data-theme') === 'dark';
            const seq: number[] = isDark ? [1,3,5,7,6,4,2,0] : [0,2,4,6,7,5,3,1];

            const chart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Desktop', 'Mobile', 'Tablet', 'Other'],
                    datasets: [{
                        data: [45, 35, 15, 5],
                        backgroundColor: [palette[seq[0]], palette[seq[1]], palette[seq[2]], palette[seq[3]]],
                        borderWidth: 0,
                        cutout: '60%'
                    }]
                },
                options: {
                    ...this.getDefaultOptions(),
                    plugins: {
                        ...this.getDefaultOptions().plugins,
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
            this.charts.push(chart);
        },

        // Area Chart
        initAreaChart: function(): void {
            const ctx = document.getElementById('areaChart') as HTMLCanvasElement | null;
            if (!ctx) return;
            if (!ctx.ownerDocument) return;

            const colors: ThemeColors = this.getThemeColors();
            this.destroyIfExists(ctx);
            const palette: string[] = colors.datasets;
            const color: string = palette[2];

            const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Revenue',
                        data: [12, 19, 15, 25, 22, 30],
                        borderColor: color,
                        backgroundColor: color + '33',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: this.getDefaultOptions()
            });
            this.charts.push(chart);
        },

        // Radar Chart
        initRadarChart: function(): void {
            const ctx = document.getElementById('radarChart') as HTMLCanvasElement | null;
            if (!ctx) return;
            if (!ctx.ownerDocument) return;

            const colors: ThemeColors = this.getThemeColors();
            this.destroyIfExists(ctx);
            const palette: string[] = colors.datasets;

            const chart = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency'],
                    datasets: [{
                        label: 'Product A',
                        data: [80, 90, 70, 85, 75],
                        borderColor: palette[0],
                        backgroundColor: palette[0] + '55',
                        pointBackgroundColor: palette[0]
                    }, {
                        label: 'Product B',
                        data: [70, 85, 80, 90, 85],
                        borderColor: palette[3],
                        backgroundColor: palette[3] + '55',
                        pointBackgroundColor: palette[3]
                    }]
                },
                options: {
                    ...this.getDefaultOptions(),
                    scales: {
                        r: {
                            beginAtZero: true,
                            max: 100,
                            ticks: { color: colors.subtext },
                            grid: { color: colors.grid },
                            pointLabels: { color: colors.text }
                        }
                    }
                }
            });
            this.charts.push(chart);
        },

        // Mixed Chart
        initMixedChart: function(): void {
            const ctx = document.getElementById('mixedChart') as HTMLCanvasElement | null;
            if (!ctx) return;
            if (!ctx.ownerDocument) return;

            const colors: ThemeColors = this.getThemeColors();
            this.destroyIfExists(ctx);
            const palette: string[] = colors.datasets;

            const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Line Data',
                        type: 'line',
                        data: [12, 19, 15, 25, 22, 30],
                        borderColor: palette[1],
                        backgroundColor: palette[1] + '33',
                        tension: 0.4
                    }, {
                        label: 'Bar Data',
                        type: 'bar',
                        data: [8, 12, 10, 18, 15, 22],
                        backgroundColor: palette[4]
                    }]
                },
                options: this.getDefaultOptions()
            });
            this.charts.push(chart);
        },

        // Polar Chart
        initPolarChart: function(): void {
            const ctx = document.getElementById('polarChart') as HTMLCanvasElement | null;
            if (!ctx) return;
            if (!ctx.ownerDocument) return;

            const colors: ThemeColors = this.getThemeColors();
            this.destroyIfExists(ctx);
            const palette: string[] = colors.datasets;
            const isDark: boolean = document.documentElement.getAttribute('data-theme') === 'dark';
            const seq: number[] = isDark ? [1,3,5,7] : [0,2,4,6];

            const chart = new Chart(ctx, {
                type: 'polarArea',
                data: {
                    labels: ['Red', 'Green', 'Yellow', 'Grey'],
                    datasets: [{
                        data: [11, 16, 7, 3],
                        backgroundColor: seq.map(i => palette[i])
                    }]
                },
                options: {
                    ...this.getDefaultOptions(),
                    scales: {
                        r: {
                            ticks: { color: colors.subtext },
                            grid: { color: colors.grid }
                        }
                    }
                }
            });
            this.charts.push(chart);
        },

        // Bubble Chart
        initBubbleChart: function(): void {
            const ctx = document.getElementById('bubbleChart') as HTMLCanvasElement | null;
            if (!ctx) return;
            if (!ctx.ownerDocument) return;

            const colors: ThemeColors = this.getThemeColors();
            this.destroyIfExists(ctx);
            const palette: string[] = colors.datasets;

            const chart = new Chart(ctx, {
                type: 'bubble',
                data: {
                    datasets: [{
                        label: 'Dataset 1',
                        data: [{x: 20, y: 30, r: 15}, {x: 40, y: 10, r: 10}],
                        backgroundColor: palette[0] + '99',
                        borderColor: palette[0]
                    }, {
                        label: 'Dataset 2',
                        data: [{x: 10, y: 20, r: 12}, {x: 30, y: 25, r: 8}],
                        backgroundColor: palette[3] + '99',
                        borderColor: palette[3]
                    }]
                },
                options: this.getDefaultOptions()
            });
            this.charts.push(chart);
        },

        // Scatter Chart
        initScatterChart: function(): void {
            const ctx = document.getElementById('scatterChart') as HTMLCanvasElement | null;
            if (!ctx) return;
            if (!ctx.ownerDocument) return;

            const colors: ThemeColors = this.getThemeColors();
            this.destroyIfExists(ctx);
            const palette: string[] = colors.datasets;

            const chart = new Chart(ctx, {
                type: 'scatter',
                data: {
                    datasets: [{
                        label: 'Scatter Dataset',
                        data: [{x: -10, y: 0}, {x: 0, y: 10}, {x: 10, y: 5}],
                        backgroundColor: palette[2] + '99',
                        borderColor: palette[2]
                    }]
                },
                options: this.getDefaultOptions()
            });
            this.charts.push(chart);
        },

        // 테마 변경 감지
        watchThemeChange: function(): void {
            const self = this;
            const observer = new MutationObserver(function(mutations: MutationRecord[]) {
                mutations.forEach(function(mutation: MutationRecord) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                        self.updateChartsTheme();
                    }
                });
            });
            observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        },

        // 모든 차트의 테마 업데이트
        updateChartsTheme: function(): void {
            const colors: ThemeColors = this.getThemeColors();
            const palette: string[] = colors.datasets;
            const isDark: boolean = document.documentElement.getAttribute('data-theme') === 'dark';
            const order: number[] = isDark ? [0,1,2,3,4,5,6,7] : [7,6,5,4,3,2,1,0];

            this.charts.forEach((chart: any) => {
                if (!chart || !chart.options) return;

                // Update legend
                if (chart.options.plugins && chart.options.plugins.legend && chart.options.plugins.legend.labels) {
                    chart.options.plugins.legend.labels.color = colors.text;
                }

                // Update tooltip
                if (chart.options.plugins && chart.options.plugins.tooltip) {
                    chart.options.plugins.tooltip.backgroundColor = colors.background;
                    chart.options.plugins.tooltip.titleColor = colors.text;
                    chart.options.plugins.tooltip.bodyColor = colors.subtext;
                    chart.options.plugins.tooltip.borderColor = colors.border;
                }

                // Update scales
                if (chart.options.scales) {
                    ['x', 'y', 'r'].forEach((axis: string) => {
                        if (chart.options.scales[axis]) {
                            if (chart.options.scales[axis].ticks) {
                                chart.options.scales[axis].ticks.color = colors.subtext;
                            }
                            if (chart.options.scales[axis].grid) {
                                chart.options.scales[axis].grid.color = colors.grid;
                            }
                            if (chart.options.scales[axis].pointLabels) {
                                chart.options.scales[axis].pointLabels.color = colors.text;
                            }
                        }
                    });
                }

                // Update specific chart colors
                if (chart.config.type === 'line') {
                    chart.data.datasets.forEach((dataset: any, index: number) => {
                        dataset.borderDash = [6, 4];
                        dataset.pointStyle = 'circle';

                        if (dataset.fill === true) {
                            const c: string = palette[order[2]];
                            dataset.borderColor = c;
                            try {
                                const ctx2d = chart.ctx;
                                const h: number = (chart.chartArea && chart.chartArea.bottom - chart.chartArea.top) || 400;
                                const grad = ctx2d.createLinearGradient(0, 0, 0, h);
                                grad.addColorStop(0, c + '66');
                                grad.addColorStop(1, c + '00');
                                dataset.backgroundColor = grad;
                            } catch (e) {
                                dataset.backgroundColor = c + '33';
                            }
                            return;
                        }

                        let c: string;
                        if (chart.canvas && chart.canvas.id === 'lineChart') {
                            c = isDark ? (index === 0 ? palette[1] : palette[2]) : (index === 0 ? palette[5] : palette[4]);
                        } else {
                            c = palette[order[index % order.length]];
                        }
                        dataset.borderColor = c;
                        dataset.backgroundColor = c + '33';
                    });
                } else if (chart.config.type === 'radar') {
                    chart.data.datasets.forEach((dataset: any, index: number) => {
                        const c: string = palette[order[index % palette.length]];
                        dataset.borderColor = c;
                        dataset.backgroundColor = c + '55';
                    });
                } else if (chart.config.type === 'bar') {
                    if (chart.data && chart.data.datasets && chart.data.datasets.length >= 2) {
                        const darkest: string = palette[0];
                        const lighter: string = palette[palette.length - 2];
                        chart.data.datasets[0].backgroundColor = darkest;
                        chart.data.datasets[1].backgroundColor = lighter;
                        for (let i = 2; i < chart.data.datasets.length; i++) {
                            const c: string = palette[order[i % palette.length]];
                            chart.data.datasets[i].backgroundColor = c;
                        }
                    }
                } else if (chart.config.type === 'doughnut' || chart.config.type === 'polarArea') {
                    const seq: number[] = isDark ? [1,3,5,7,6,4,2,0] : [0,2,4,6,7,5,3,1];
                    chart.data.datasets.forEach((dataset: any) => {
                        if (Array.isArray(dataset.backgroundColor)) {
                            dataset.backgroundColor = dataset.data.map((_: any, i: number) => palette[seq[i % seq.length]]);
                        } else {
                            dataset.backgroundColor = palette[seq[0]] + 'B3';
                        }
                    });
                } else if (chart.config.type === 'bubble' || chart.config.type === 'scatter') {
                    chart.data.datasets.forEach((dataset: any, index: number) => {
                        const c: string = palette[order[index % palette.length]];
                        dataset.backgroundColor = c + '99';
                        dataset.borderColor = c;
                    });
                }

                try {
                    chart.update('none');
                } catch (e) {
                    // 캔버스가 분리되었거나 렌더 타이밍 이슈 시 무시
                }
            });
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            global.BRICKS.Chart.init();
        });
    } else {
        global.BRICKS.Chart.init();
    }

})(window);

export { ChartComponent, ThemeColors };