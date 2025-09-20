// ========================================
// Widget Dashboard JavaScript
// Chart.js initialization and dark mode
// ========================================

(function() {
    'use strict';

    // Dark Mode Toggle
    const initDarkMode = () => {
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');

        if (!themeToggle) return;

        // Check current theme
        const currentTheme = document.documentElement.getAttribute('data-theme');
        updateThemeIcon(currentTheme === 'dark');

        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const newTheme = isDark ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('ds-theme', newTheme);
            updateThemeIcon(!isDark);

            // Update charts for new theme
            updateChartsTheme(newTheme === 'dark');
        });

        function updateThemeIcon(isDark) {
            if (themeIcon) {
                themeIcon.className = isDark ? 'bx bx-sun' : 'bx bx-moon';
            }
        }
    };

    // Chart color schemes
    const getChartColors = (isDark) => ({
        text: isDark ? '#FFFFFF' : '#000000',
        grid: isDark ? '#374151' : '#E5E7EB',
        primary: isDark ? '#FFFFFF' : '#000000',
        success: isDark ? '#FFFFFF' : '#000000',
        danger: isDark ? '#FFFFFF' : '#000000',
        warning: isDark ? '#FFFFFF' : '#000000',
        purple: isDark ? '#FFFFFF' : '#000000',
        pink: isDark ? '#FFFFFF' : '#000000',
        teal: isDark ? '#FFFFFF' : '#000000',
        indigo: isDark ? '#FFFFFF' : '#000000',
        chartBar: isDark ? '#FFFFFF' : '#000000',
        chartLine: isDark ? '#FFFFFF' : '#000000'
    });

    // Initialize all charts
    const initCharts = () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const colors = getChartColors(isDark);

        // Expenses Bar Chart
        const expensesCtx = document.getElementById('expensesChart');
        if (expensesCtx) {
            window.expensesChart = new Chart(expensesCtx, {
                type: 'bar',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        data: [1200, 1900, 1500, 2100, 1800, 2400, 2000],
                        backgroundColor: isDark ? '#FFFFFF' : '#000000',
                        borderRadius: 4,
                        barThickness: 12
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    resizeDelay: 0,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                            titleColor: isDark ? '#F3F4F6' : '#111827',
                            bodyColor: isDark ? '#D1D5DB' : '#6B7280',
                            borderColor: isDark ? '#374151' : '#E5E7EB',
                            borderWidth: 1,
                            padding: 8,
                            displayColors: false,
                            callbacks: {
                                label: (context) => '$' + context.parsed.y.toLocaleString()
                            }
                        }
                    },
                    scales: {
                        x: {
                            display: false,
                            grid: { display: false }
                        },
                        y: {
                            display: false,
                            grid: { display: false }
                        }
                    }
                }
            });
        }

        // Balance Line Chart
        const balanceCtx = document.getElementById('balanceChart');
        if (balanceCtx) {
            window.balanceChart = new Chart(balanceCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                    datasets: [{
                        data: [65000, 72000, 68000, 85000, 82000, 88000, 90745],
                        borderColor: isDark ? '#FFFFFF' : '#000000',
                        backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 0,
                        pointHoverRadius: 4,
                        pointBackgroundColor: isDark ? '#FFFFFF' : '#000000'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    resizeDelay: 0,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                            titleColor: isDark ? '#F3F4F6' : '#111827',
                            bodyColor: isDark ? '#D1D5DB' : '#6B7280',
                            borderColor: isDark ? '#374151' : '#E5E7EB',
                            borderWidth: 1,
                            padding: 8,
                            displayColors: false,
                            callbacks: {
                                label: (context) => '$' + context.parsed.y.toLocaleString()
                            }
                        }
                    },
                    scales: {
                        x: {
                            display: false,
                            grid: { display: false }
                        },
                        y: {
                            display: false,
                            grid: { display: false }
                        }
                    }
                }
            });
        }

        // Fine Tuning Chart (Vertical bars)
        const tuningCtx = document.getElementById('tuningChart');
        if (tuningCtx) {
            window.tuningChart = new Chart(tuningCtx, {
                type: 'bar',
                data: {
                    labels: ['', '', '', '', '', '', '', '', '', ''],
                    datasets: [{
                        data: [65, 45, 80, 55, 70, 40, 85, 60, 75, 50],
                        backgroundColor: isDark ?
                            ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'] :
                            ['#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000'],
                        borderRadius: 2,
                        barThickness: 8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    resizeDelay: 0,
                    plugins: {
                        legend: { display: false },
                        tooltip: { enabled: false }
                    },
                    scales: {
                        x: {
                            display: false,
                            grid: { display: false }
                        },
                        y: {
                            display: false,
                            grid: { display: false },
                            max: 100
                        }
                    }
                }
            });
        }

        // Completion Donut Chart
        const completionCtx = document.getElementById('completionChart');
        if (completionCtx) {
            window.completionChart = new Chart(completionCtx, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: [76, 24],
                        backgroundColor: [isDark ? '#FFFFFF' : '#000000', isDark ? '#374151' : '#E5E7EB'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    resizeDelay: 0,
                    cutout: '80%',
                    plugins: {
                        legend: { display: false },
                        tooltip: { enabled: false }
                    }
                }
            });
        }

        // Balance Area Chart (Wide)
        const balanceAreaCtx = document.getElementById('balanceAreaChart');
        if (balanceAreaCtx) {
            window.balanceAreaChart = new Chart(balanceAreaCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        data: [65000, 72000, 68000, 85000, 82000, 88000, 90745, 92000, 89000, 93000, 91000, 95000],
                        borderColor: isDark ? '#FFFFFF' : '#000000',
                        backgroundColor: createGradient(balanceAreaCtx, isDark ? '#FFFFFF' : '#000000'),
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 0,
                        pointHoverRadius: 6,
                        pointBackgroundColor: isDark ? '#FFFFFF' : '#000000',
                        pointBorderColor: '#FFFFFF',
                        pointBorderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    resizeDelay: 0,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                            titleColor: isDark ? '#F3F4F6' : '#111827',
                            bodyColor: isDark ? '#D1D5DB' : '#6B7280',
                            borderColor: isDark ? '#374151' : '#E5E7EB',
                            borderWidth: 1,
                            padding: 12,
                            displayColors: false,
                            callbacks: {
                                label: (context) => '$' + context.parsed.y.toLocaleString()
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                color: colors.grid,
                                drawBorder: false
                            },
                            ticks: {
                                color: colors.text,
                                font: { size: 11 }
                            }
                        },
                        y: {
                            grid: {
                                color: colors.grid,
                                drawBorder: false
                            },
                            ticks: {
                                color: colors.text,
                                font: { size: 11 },
                                callback: (value) => '$' + (value / 1000) + 'K'
                            }
                        }
                    }
                }
            });
        }
    };

    // Create gradient for area charts
    function createGradient(ctx, color) {
        const chart = ctx.getContext('2d');
        const gradient = chart.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, color + '40');
        gradient.addColorStop(1, color + '00');
        return gradient;
    }

    // Update all charts when theme changes
    function updateChartsTheme(isDark) {
        const colors = getChartColors(isDark);

        // Update each chart if it exists
        if (window.expensesChart) {
            window.expensesChart.data.datasets[0].backgroundColor = isDark ? '#FFFFFF' : '#000000';
            window.expensesChart.options.plugins.tooltip.backgroundColor = isDark ? '#1F2937' : '#FFFFFF';
            window.expensesChart.options.plugins.tooltip.titleColor = isDark ? '#F3F4F6' : '#111827';
            window.expensesChart.options.plugins.tooltip.bodyColor = isDark ? '#D1D5DB' : '#6B7280';
            window.expensesChart.options.plugins.tooltip.borderColor = isDark ? '#374151' : '#E5E7EB';
            window.expensesChart.update();
        }

        if (window.balanceChart) {
            window.balanceChart.data.datasets[0].borderColor = isDark ? '#FFFFFF' : '#000000';
            window.balanceChart.data.datasets[0].backgroundColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
            window.balanceChart.data.datasets[0].pointBackgroundColor = isDark ? '#FFFFFF' : '#000000';
            window.balanceChart.options.plugins.tooltip.backgroundColor = isDark ? '#1F2937' : '#FFFFFF';
            window.balanceChart.options.plugins.tooltip.titleColor = isDark ? '#F3F4F6' : '#111827';
            window.balanceChart.options.plugins.tooltip.bodyColor = isDark ? '#D1D5DB' : '#6B7280';
            window.balanceChart.options.plugins.tooltip.borderColor = isDark ? '#374151' : '#E5E7EB';
            window.balanceChart.update();
        }

        if (window.tuningChart) {
            const barColors = isDark ?
                ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'] :
                ['#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000'];
            window.tuningChart.data.datasets[0].backgroundColor = barColors;
            window.tuningChart.update();
        }

        if (window.completionChart) {
            window.completionChart.data.datasets[0].backgroundColor[0] = isDark ? '#FFFFFF' : '#000000';
            window.completionChart.data.datasets[0].backgroundColor[1] = isDark ? '#374151' : '#E5E7EB';
            window.completionChart.update();
        }

        if (window.balanceAreaChart) {
            window.balanceAreaChart.data.datasets[0].borderColor = isDark ? '#FFFFFF' : '#000000';
            window.balanceAreaChart.data.datasets[0].backgroundColor = createGradient(document.getElementById('balanceAreaChart'), isDark ? '#FFFFFF' : '#000000');
            window.balanceAreaChart.data.datasets[0].pointBackgroundColor = isDark ? '#FFFFFF' : '#000000';
            window.balanceAreaChart.options.plugins.tooltip.backgroundColor = isDark ? '#1F2937' : '#FFFFFF';
            window.balanceAreaChart.options.plugins.tooltip.titleColor = isDark ? '#F3F4F6' : '#111827';
            window.balanceAreaChart.options.plugins.tooltip.bodyColor = isDark ? '#D1D5DB' : '#6B7280';
            window.balanceAreaChart.options.plugins.tooltip.borderColor = isDark ? '#374151' : '#E5E7EB';
            window.balanceAreaChart.options.scales.x.grid.color = colors.grid;
            window.balanceAreaChart.options.scales.x.ticks.color = colors.text;
            window.balanceAreaChart.options.scales.y.grid.color = colors.grid;
            window.balanceAreaChart.options.scales.y.ticks.color = colors.text;
            window.balanceAreaChart.update();
        }
    }

    // Toggle switches are handled by BRICKS.Toggle component
    // No need for separate initialization

    // Handle window resize
    let resizeTimeout;
    const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Force all charts to resize
            if (window.expensesChart) {
                window.expensesChart.resize();
            }
            if (window.balanceChart) {
                window.balanceChart.resize();
            }
            if (window.tuningChart) {
                window.tuningChart.resize();
            }
            if (window.completionChart) {
                window.completionChart.resize();
            }
            if (window.balanceAreaChart) {
                window.balanceAreaChart.resize();
            }
        }, 250);
    };

    // Initialize ResizeObserver for chart containers
    const initResizeObserver = () => {
        if (typeof ResizeObserver !== 'undefined') {
            const chartContainers = document.querySelectorAll('.widget-chart-bar, .widget-chart-line, .widget-chart-area, .tuning-bars, .completion-chart');

            const resizeObserver = new ResizeObserver(entries => {
                // Debounce resize updates
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    entries.forEach(entry => {
                        const canvas = entry.target.querySelector('canvas');
                        if (canvas && canvas.chart) {
                            canvas.chart.resize();
                        }
                    });
                    handleResize();
                }, 100);
            });

            chartContainers.forEach(container => {
                resizeObserver.observe(container);
            });
        }
    };

    // Initialize everything when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        initDarkMode();
        initCharts();
        // Toggles are initialized by BRICKS.Toggle.init()

        // Add resize listener
        window.addEventListener('resize', handleResize);

        // Initialize ResizeObserver
        initResizeObserver();

        // Trigger initial resize after a short delay to ensure charts are rendered
        setTimeout(() => {
            handleResize();
        }, 100);
    });
})();