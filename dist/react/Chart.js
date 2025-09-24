import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useEffect, useRef } from 'react';
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
export const Chart = forwardRef(({ type = 'bar', data, datasets, labels, title, width = '100%', height = 400, showLegend = true, showGrid = true, animated = true, responsive = true, showTooltip = true, theme = 'default', beginAtZero = true, className, onClick, ...props }, ref) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
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
            if (!canvasRef.current || !containerRef.current)
                return;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (!ctx)
                return;
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
                        }
                        else {
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
        const handleClick = (e) => {
            if (!onClick || !data || !canvasRef.current)
                return;
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
    return (_jsxs("div", { ref: ref, className: chartClasses, style: { width, height: typeof height === 'number' ? `${height}px` : height }, ...props, children: [title && _jsx("div", { className: "chart-title", children: title }), _jsx("div", { ref: containerRef, className: "chart-wrapper", style: { position: 'relative', width: '100%', height: typeof height === 'number' ? `${height}px` : height }, children: _jsx("canvas", { ref: canvasRef, style: { display: 'block', width: '100%', height: '100%' } }) }), showLegend && data && data.length > 0 && (_jsx("div", { className: "chart-legend", children: data.map((point, index) => (_jsxs("div", { className: "chart-legend__item", children: [_jsx("span", { className: "chart-legend__color", style: {
                                backgroundColor: point.color || getThemeColors()[index % getThemeColors().length]
                            } }), _jsx("span", { className: "chart-legend__label", children: point.label })] }, index))) }))] }));
});
Chart.displayName = 'Chart';
export default Chart;
//# sourceMappingURL=Chart.js.map