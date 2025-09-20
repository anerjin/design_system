/**
 * BRICKS Design System - Chart Component
 * Chart.js 기반 차트 컴포넌트 모듈
 */

(function(global) {
    'use strict';

    // BRICKS 네임스페이스
    global.BRICKS = global.BRICKS || {};

    /**
     * Chart Component
     */
    global.BRICKS.Chart = {
        charts: [],
        _initialized: false,

        // 기존 차트 인스턴스 파괴 (동일 캔버스 재사용 에러 방지)
        destroyIfExists: function(canvasEl) {
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
        getThemeColors: function() {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            // 회색조 팔레트
            // Light: 어두운 회색 → 밝은 회색, Dark: 밝은 회색 → 어두운 회색
            const grayScaleLight = ['#111827', '#1F2937', '#374151', '#4B5563', '#6B7280', '#9CA3AF', '#D1D5DB', '#E5E7EB'];
            const grayScaleDark = ['#F3F4F6', '#E5E7EB', '#D1D5DB', '#9CA3AF', '#6B7280', '#4B5563', '#374151', '#1F2937'];

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
        getDefaultOptions: function() {
            const colors = this.getThemeColors();
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
        init: function() {
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
        setupResizeHandlers: function() {
            const self = this;
            if (this._resizeHandlerRegistered) return;
            this._resizeHandlerRegistered = true;
            this._resizeTimer = null;
            window.addEventListener('resize', function() {
                clearTimeout(self._resizeTimer);
                self._resizeTimer = setTimeout(function() {
                    self.resizeAllCharts();
                }, 250);
            });
        },

        // 모든 차트 리사이즈
        resizeAllCharts: function() {
            this.charts.forEach(function(chart) {
                try { chart.resize(); } catch (e) {}
            });
        },

        // ResizeObserver로 캔버스 컨테이너 크기 변화 추적
        setupResizeObserver: function() {
            if (typeof ResizeObserver === 'undefined') return;
            const self = this;
            if (this._resizeObserver) return;
            this._resizeObserver = new ResizeObserver(function(entries) {
                clearTimeout(self._roTimer);
                self._roTimer = setTimeout(function() {
                    entries.forEach(function(entry) {
                        const canvas = entry.target.tagName === 'CANVAS' ? entry.target : entry.target.querySelector && entry.target.querySelector('canvas');
                        if (!canvas) return;
                        try {
                            const chart = (typeof Chart !== 'undefined' && typeof Chart.getChart === 'function') ? (Chart.getChart(canvas) || Chart.getChart(canvas.id)) : null;
                            if (chart) chart.resize();
                        } catch (e) {}
                    });
                }, 100);
            });

            // 현재 존재하는 차트 캔버스 관찰 시작
            this.getChartCanvasIds().forEach(function(id) {
                const el = document.getElementById(id);
                if (el) {
                    self._resizeObserver.observe(el);
                }
            });
        },

        // DOM 변경으로 차트 캔버스가 추가되면 자동 초기화
        watchChartsInDom: function() {
            const self = this;
            if (this._domObserver) return;
            this._domObserver = new MutationObserver(function(mutations) {
                let found = false;
                mutations.forEach(function(m) {
                    m.addedNodes && m.addedNodes.forEach(function(node) {
                        if (node.nodeType !== 1) return;
                        self.getChartCanvasIds().forEach(function(id) {
                            if (node.id === id || (node.querySelector && node.querySelector('#' + id))) {
                                found = true;
                            }
                        });
                        // 제거된 경우: charts 배열에서 파괴된 인스턴스 정리
                        if (m.removedNodes && m.removedNodes.length) {
                            self.charts = self.charts.filter(function(c){ return c && c.canvas && c.canvas.ownerDocument; });
                        }
                    });
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
        initNewlyAddedCharts: function() {
            const ids = this.getChartCanvasIds();
            const self = this;
            ids.forEach(function(id) {
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
        getChartCanvasIds: function() {
            return ['lineChart','barChart','doughnutChart','areaChart','radarChart','mixedChart','polarChart','bubbleChart','scatterChart'];
        },

        // Line Chart
        initLineChart: function() {
            const ctx = document.getElementById('lineChart');
            if (!ctx) return;
            if (!ctx.ownerDocument) return;

            const colors = this.getThemeColors();
            this.destroyIfExists(ctx);
            const palette = colors.datasets;
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const line1 = isDark ? palette[1] : palette[5];
            const line2 = isDark ? palette[2] : palette[4];
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
        initBarChart: function() {
            const ctx = document.getElementById('barChart');
            if (!ctx) return;
            if (!ctx.ownerDocument) return;

            const colors = this.getThemeColors();
            this.destroyIfExists(ctx);
            const cDark = colors.datasets[0];
            const cLight = colors.datasets[colors.datasets.length - 2];
            const chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E', 'Product F'],
                    datasets: [{
                        label: '2023',
                        data: [65, 59, 80, 81, 56, 55],
                        backgroundColor: cDark,
                        borderRadius: 4
                    }, {
                        label: '2024',
                        data: [75, 69, 85, 91, 66, 70],
                        backgroundColor: cLight,
                        borderRadius: 4
                    }]
                },
                options: this.getDefaultOptions()
            });
            this.charts.push(chart);
        },

        // Doughnut Chart
        initDoughnutChart: function() {
            const ctx = document.getElementById('doughnutChart');
            if (!ctx) return;
            if (!ctx.ownerDocument) return;

            const colors = this.getThemeColors();
            this.destroyIfExists(ctx);
            const palette = colors.datasets;
            const order = [0, 2, 4, 6, 7, 5, 3, 1]; // 명도 차 큰 순서
            const bg = [0,1,2,3].map(i => palette[order[i % order.length]]);
            const chart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Desktop', 'Mobile', 'Tablet', 'Others'],
                    datasets: [{
                        data: [45, 35, 15, 5],
                        backgroundColor: bg,
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '60%',
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                color: colors.text,
                                padding: 15,
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
                    }
                }
            });
            this.charts.push(chart);
        },

        // Area Chart
        initAreaChart: function() {
            const ctx = document.getElementById('areaChart');
            if (!ctx) return;
            if (!ctx.ownerDocument) return;

            const colors = this.getThemeColors();
            const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, colors.primary + '40');
            gradient.addColorStop(1, colors.primary + '00');

            this.destroyIfExists(ctx);
            const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: '방문자 수',
                        data: [1200, 1900, 3000, 5000, 4200, 3200, 4500, 5200, 4800, 5500, 5200, 6000],
                        borderColor: colors.primary,
                        backgroundColor: gradient,
                        fill: true,
                        tension: 0.4,
                        borderWidth: 2,
                        pointRadius: 0,
                        pointHoverRadius: 4
                    }]
                },
                options: this.getDefaultOptions()
            });
            this.charts.push(chart);
        },

        // Radar Chart
        initRadarChart: function() {
            const ctx = document.getElementById('radarChart');
            if (!ctx) return;
            if (!ctx.ownerDocument) return;

            const colors = this.getThemeColors();
            this.destroyIfExists(ctx);
            const chart = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: ['디자인', '사용성', '성능', '보안', '접근성', '호환성'],
                    datasets: [{
                        label: 'Product A',
                        data: [85, 90, 75, 88, 92, 78],
                        borderColor: colors.primary,
                        backgroundColor: colors.primary + '20',
                        borderWidth: 2,
                        pointRadius: 4
                    }, {
                        label: 'Product B',
                        data: [78, 85, 88, 75, 80, 85],
                        borderColor: colors.success,
                        backgroundColor: colors.success + '20',
                        borderWidth: 2,
                        pointRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            labels: {
                                color: colors.text,
                                font: {
                                    family: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif'
                                }
                            }
                        }
                    },
                    scales: {
                        r: {
                            angleLines: { color: colors.grid },
                            grid: { color: colors.grid },
                            pointLabels: { color: colors.text },
                            ticks: { color: colors.subtext, backdropColor: 'transparent' }
                        }
                    }
                }
            });
            this.charts.push(chart);
        },

        // Mixed Chart
        initMixedChart: function() {
            const ctx = document.getElementById('mixedChart');
            if (!ctx) return;
            if (!ctx.ownerDocument) return;

            const colors = this.getThemeColors();
            this.destroyIfExists(ctx);
            const chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        type: 'bar',
                        label: '매출',
                        data: [12000, 19000, 15000, 25000, 22000, 30000],
                        backgroundColor: colors.primary,
                        borderRadius: 4,
                        order: 2
                    }, {
                        type: 'line',
                        label: '성장률',
                        data: [10, 15, 8, 25, 12, 18],
                        borderColor: colors.danger,
                        borderWidth: 2,
                        fill: false,
                        tension: 0.4,
                        yAxisID: 'y1',
                        order: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
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
                            type: 'linear',
                            display: true,
                            position: 'left',
                            ticks: { color: colors.subtext },
                            grid: { color: colors.grid, drawBorder: false }
                        },
                        y1: {
                            type: 'linear',
                            display: true,
                            position: 'right',
                            ticks: { color: colors.subtext },
                            grid: { drawOnChartArea: false }
                        }
                    }
                }
            });
            this.charts.push(chart);
        },

        // Polar Area Chart
        initPolarChart: function() {
            const ctx = document.getElementById('polarChart');
            if (!ctx) return;
            if (!ctx.ownerDocument) return;

            const colors = this.getThemeColors();
            this.destroyIfExists(ctx);
            const chart = new Chart(ctx, {
                type: 'polarArea',
                data: {
                    labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
                    datasets: [{
                        label: 'Dataset',
                        data: [11, 16, 7, 3, 14],
                        backgroundColor: [
                            colors.danger + '80',
                            colors.success + '80',
                            colors.warning + '80',
                            colors.subtext + '80',
                            colors.primary + '80'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                color: colors.text,
                                font: {
                                    family: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif'
                                }
                            }
                        }
                    },
                    scales: {
                        r: {
                            ticks: { color: colors.subtext, backdropColor: 'transparent' },
                            grid: { color: colors.grid }
                        }
                    }
                }
            });
            this.charts.push(chart);
        },

        // Bubble Chart
        initBubbleChart: function() {
            const ctx = document.getElementById('bubbleChart');
            if (!ctx) return;
            if (!ctx.ownerDocument) return;

            const colors = this.getThemeColors();
            this.destroyIfExists(ctx);
            const chart = new Chart(ctx, {
                type: 'bubble',
                data: {
                    datasets: [{
                        label: 'Dataset 1',
                        data: [
                            {x: 20, y: 30, r: 15},
                            {x: 40, y: 10, r: 10},
                            {x: 30, y: 20, r: 20},
                            {x: 10, y: 40, r: 8},
                            {x: 35, y: 35, r: 12}
                        ],
                        backgroundColor: colors.primary + '60',
                        borderColor: colors.primary
                    }, {
                        label: 'Dataset 2',
                        data: [
                            {x: 15, y: 20, r: 12},
                            {x: 25, y: 25, r: 8},
                            {x: 45, y: 30, r: 15},
                            {x: 35, y: 15, r: 10},
                            {x: 20, y: 35, r: 18}
                        ],
                        backgroundColor: colors.success + '60',
                        borderColor: colors.success
                    }]
                },
                options: this.getDefaultOptions()
            });
            this.charts.push(chart);
        },

        // Scatter Chart
        initScatterChart: function() {
            const ctx = document.getElementById('scatterChart');
            if (!ctx) return;
            if (!ctx.ownerDocument) return;

            const colors = this.getThemeColors();

            // Generate random data
            const generateData = (count) => {
                const data = [];
                for (let i = 0; i < count; i++) {
                    data.push({
                        x: Math.random() * 100,
                        y: Math.random() * 100
                    });
                }
                return data;
            };

            this.destroyIfExists(ctx);
            const chart = new Chart(ctx, {
                type: 'scatter',
                data: {
                    datasets: [{
                        label: 'Group A',
                        data: generateData(30),
                        backgroundColor: colors.primary + '80',
                        borderColor: colors.primary
                    }, {
                        label: 'Group B',
                        data: generateData(30),
                        backgroundColor: colors.success + '80',
                        borderColor: colors.success
                    }]
                },
                options: this.getDefaultOptions()
            });
            this.charts.push(chart);
        },

        // 테마 변경 감지 및 차트 업데이트
        watchThemeChange: function() {
            const observer = new MutationObserver(() => {
                this.updateChartsTheme();
            });

            observer.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['data-theme']
            });
        },

        // 차트 테마 업데이트
        updateChartsTheme: function() {
            const colors = this.getThemeColors();
            const palette = colors.datasets;
            const order = [0, 2, 4, 6, 7, 5, 3, 1]; // 명도 차를 크게 주는 순서

            this.charts = this.charts.filter(function(c){ return c && !c._destroyed; });

            this.charts.forEach(chart => {
                if (!chart || !chart.canvas || !chart.canvas.ownerDocument) return;

                // Update legend
                if (chart.options.plugins.legend) {
                    chart.options.plugins.legend.labels.color = colors.text;
                }

                // Update tooltip
                if (chart.options.plugins.tooltip) {
                    chart.options.plugins.tooltip.backgroundColor = colors.background;
                    chart.options.plugins.tooltip.titleColor = colors.text;
                    chart.options.plugins.tooltip.bodyColor = colors.subtext;
                    chart.options.plugins.tooltip.borderColor = colors.border;
                }

                // Update scales
                if (chart.options.scales) {
                    ['x', 'y', 'r'].forEach(axis => {
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
                    // 라인/에리어: 다크모드에 맞춰 명도 재배치 + 패턴 유지
                    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                    chart.data.datasets.forEach((dataset, index) => {
                        dataset.borderDash = [6, 4];
                        dataset.pointStyle = 'circle';

                        // 에리어 차트(채움) 처리
                        if (dataset.fill === true) {
                            const c = palette[order[2]]; // 중간 명도 톤
                            dataset.borderColor = c;
                            try {
                                const ctx2d = chart.ctx;
                                const h = (chart.chartArea && chart.chartArea.bottom - chart.chartArea.top) || 400;
                                const grad = ctx2d.createLinearGradient(0, 0, 0, h);
                                grad.addColorStop(0, c + '66');
                                grad.addColorStop(1, c + '00');
                                dataset.backgroundColor = grad;
                            } catch (e) {
                                dataset.backgroundColor = c + '33';
                            }
                            return;
                        }

                        // 일반 라인 차트(예: 매출/이익): 테마별로 은은한 두 톤
                        let c;
                        if (chart.canvas && chart.canvas.id === 'lineChart') {
                            c = isDark ? (index === 0 ? palette[1] : palette[2]) : (index === 0 ? palette[5] : palette[4]);
                        } else {
                            c = palette[order[index % order.length]];
                        }
                        dataset.borderColor = c;
                        dataset.backgroundColor = c + '33';
                    });
                } else if (chart.config.type === 'radar') {
                    // 레이더 차트는 회색 팔레트 적용
                    chart.data.datasets.forEach((dataset, index) => {
                        const c = palette[order[index % palette.length]];
                        dataset.borderColor = c;
                        dataset.backgroundColor = c + '55';
                    });
                } else if (chart.config.type === 'bar') {
                    // 막대형: 2개 데이터셋(2023, 2024)에 극단 명도 배치
                    if (chart.data && chart.data.datasets && chart.data.datasets.length >= 2) {
                        const darkest = palette[0];
                        const lighter = palette[palette.length - 2];
                        chart.data.datasets[0].backgroundColor = darkest;
                        chart.data.datasets[1].backgroundColor = lighter;
                        for (let i = 2; i < chart.data.datasets.length; i++) {
                            const c = palette[order[i % palette.length]];
                            chart.data.datasets[i].backgroundColor = c;
                        }
                    }
                } else if (chart.config.type === 'doughnut' || chart.config.type === 'polarArea') {
                    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                    const seq = isDark ? [1,3,5,7,6,4,2,0] : [0,2,4,6,7,5,3,1];
                    chart.data.datasets.forEach((dataset) => {
                        if (Array.isArray(dataset.backgroundColor)) {
                            dataset.backgroundColor = dataset.data.map((_, i) => palette[seq[i % seq.length]]);
                        } else {
                            dataset.backgroundColor = palette[seq[0]] + 'B3';
                        }
                    });
                } else if (chart.config.type === 'bubble' || chart.config.type === 'scatter') {
                    chart.data.datasets.forEach((dataset, index) => {
                        const c = palette[order[index % palette.length]];
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
            BRICKS.Chart.init();
        });
    } else {
        BRICKS.Chart.init();
    }

})(window);