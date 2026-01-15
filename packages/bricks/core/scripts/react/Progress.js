import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
/**
 * BRICKS Progress Component
 *
 * @example
 * ```tsx
 * <Progress value={60} />
 * ```
 */
export const Progress = forwardRef(({ value = 0, max = 100, min = 0, size = 'md', variant = 'primary', striped = false, animated = false, indeterminate = false, label, showLabel = false, labelPosition = 'inside', className, barClassName, formatLabel, 'aria-label': ariaLabel, ...props }, ref) => {
    const percentage = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);
    const progressClasses = [
        'progress',
        size !== 'md' ? `progress--${size}` : '',
        variant !== 'primary' ? `progress--${variant}` : '',
        striped ? 'progress--striped' : '',
        animated ? 'progress--animated' : '',
        indeterminate ? 'progress--indeterminate' : '',
        className
    ].filter(Boolean).join(' ');
    const barClasses = [
        'progress__bar',
        barClassName
    ].filter(Boolean).join(' ');
    const renderLabel = () => {
        if (!showLabel && !label)
            return null;
        const labelContent = label || (formatLabel ? formatLabel(value, max) : `${Math.round(percentage)}%`);
        if (labelPosition === 'outside') {
            return (_jsx("div", { className: "progress__label progress__label--outside", children: labelContent }));
        }
        return _jsx("span", { className: "progress__label", children: labelContent });
    };
    return (_jsxs("div", { className: "progress-wrapper", children: [labelPosition === 'outside' && renderLabel(), _jsx("div", { ref: ref, className: progressClasses, role: "progressbar", "aria-valuenow": value, "aria-valuemin": min, "aria-valuemax": max, "aria-label": ariaLabel || `Progress: ${Math.round(percentage)}%`, ...props, children: _jsx("div", { className: barClasses, style: !indeterminate ? { width: `${percentage}%` } : undefined, children: labelPosition === 'inside' && renderLabel() }) })] }));
});
Progress.displayName = 'Progress';
/**
 * BRICKS Circular Progress Component
 *
 * @example
 * ```tsx
 * <CircularProgress value={75} />
 * ```
 */
export const CircularProgress = forwardRef(({ value = 0, size = 'md', strokeWidth = 3, variant = 'primary', showLabel = true, label, indeterminate = false, className, formatLabel, ...props }, ref) => {
    const sizeMap = {
        sm: 40,
        md: 60,
        lg: 80
    };
    const svgSize = sizeMap[size];
    const radius = (svgSize - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (value / 100) * circumference;
    const circularClasses = [
        'progress-circular',
        size !== 'md' ? `progress-circular--${size}` : '',
        variant !== 'primary' ? `progress-circular--${variant}` : '',
        indeterminate ? 'progress-circular--indeterminate' : '',
        className
    ].filter(Boolean).join(' ');
    const renderLabel = () => {
        if (!showLabel && !label)
            return null;
        const labelContent = label || (formatLabel ? formatLabel(value) : `${Math.round(value)}%`);
        return _jsx("span", { className: "progress-circular__text", children: labelContent });
    };
    return (_jsxs("div", { ref: ref, className: circularClasses, role: "progressbar", "aria-valuenow": value, "aria-valuemin": 0, "aria-valuemax": 100, ...props, children: [_jsxs("svg", { className: "progress-circular__svg", width: svgSize, height: svgSize, viewBox: `0 0 ${svgSize} ${svgSize}`, children: [_jsx("circle", { className: "progress-circular__bg", cx: svgSize / 2, cy: svgSize / 2, r: radius, fill: "none", stroke: "currentColor", strokeWidth: strokeWidth }), _jsx("circle", { className: "progress-circular__bar", cx: svgSize / 2, cy: svgSize / 2, r: radius, fill: "none", stroke: "currentColor", strokeWidth: strokeWidth, strokeDasharray: circumference, strokeDashoffset: indeterminate ? undefined : strokeDashoffset, strokeLinecap: "round", transform: `rotate(-90 ${svgSize / 2} ${svgSize / 2})` })] }), !indeterminate && renderLabel()] }));
});
CircularProgress.displayName = 'CircularProgress';
/**
 * BRICKS Multi-Step Progress Component
 *
 * @example
 * ```tsx
 * <MultiStepProgress
 *   currentStep={1}
 *   steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']}
 * />
 * ```
 */
export const MultiStepProgress = forwardRef(({ currentStep, steps, variant = 'primary', className, showStepNumbers = false, ...props }, ref) => {
    const percentage = (currentStep / (steps.length - 1)) * 100;
    const wrapperClasses = [
        'multi-step-progress',
        className
    ].filter(Boolean).join(' ');
    return (_jsxs("div", { ref: ref, className: wrapperClasses, ...props, children: [_jsx("div", { className: "step-labels", children: steps.map((step, index) => (_jsxs("span", { className: [
                        'step-label',
                        index < currentStep ? 'step-label--completed' : '',
                        index === currentStep ? 'step-label--active' : '',
                        index > currentStep ? 'step-label--pending' : ''
                    ].filter(Boolean).join(' '), children: [showStepNumbers && _jsx("span", { className: "step-label__number", children: index + 1 }), step] }, index))) }), _jsx(Progress, { value: percentage, variant: variant, "aria-label": `Step ${currentStep + 1} of ${steps.length}` })] }));
});
MultiStepProgress.displayName = 'MultiStepProgress';
export default Progress;
//# sourceMappingURL=Progress.js.map