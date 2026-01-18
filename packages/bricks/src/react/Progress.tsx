import React, { forwardRef } from 'react';

export interface ProgressProps {
  /**
   * Progress value (0-100)
   * @default 0
   */
  value?: number;

  /**
   * Maximum value
   * @default 100
   */
  max?: number;

  /**
   * Minimum value
   * @default 0
   */
  min?: number;

  /**
   * Progress bar size
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Color variant
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark';

  /**
   * Whether to show stripes
   * @default false
   */
  striped?: boolean;

  /**
   * Whether to animate stripes
   * @default false
   */
  animated?: boolean;

  /**
   * Whether progress is indeterminate
   * @default false
   */
  indeterminate?: boolean;

  /**
   * Label to display
   */
  label?: React.ReactNode;

  /**
   * Whether to show label inside bar
   * @default false
   */
  showLabel?: boolean;

  /**
   * Label position
   * @default 'inside'
   */
  labelPosition?: 'inside' | 'outside';

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Bar CSS class
   */
  barClassName?: string;

  /**
   * Custom formatter for label
   */
  formatLabel?: (value: number, max: number) => React.ReactNode;

  /**
   * ARIA label
   */
  'aria-label'?: string;
}

export interface CircularProgressProps {
  /**
   * Progress value (0-100)
   * @default 0
   */
  value?: number;

  /**
   * Circle size
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Stroke width
   * @default 3
   */
  strokeWidth?: number;

  /**
   * Color variant
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark';

  /**
   * Whether to show percentage label
   * @default true
   */
  showLabel?: boolean;

  /**
   * Custom label
   */
  label?: React.ReactNode;

  /**
   * Whether progress is indeterminate
   * @default false
   */
  indeterminate?: boolean;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Custom formatter for label
   */
  formatLabel?: (value: number) => React.ReactNode;
}

export interface MultiStepProgressProps {
  /**
   * Current step (0-indexed)
   */
  currentStep: number;

  /**
   * Step labels
   */
  steps: string[];

  /**
   * Progress bar variant
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark';

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Whether to show step numbers
   * @default false
   */
  showStepNumbers?: boolean;
}

/**
 * BRICKS Progress Component
 *
 * @example
 * ```tsx
 * <Progress value={60} />
 * ```
 */
export const Progress = forwardRef<HTMLDivElement, ProgressProps>(({
  value = 0,
  max = 100,
  min = 0,
  size = 'md',
  variant = 'primary',
  striped = false,
  animated = false,
  indeterminate = false,
  label,
  showLabel = false,
  labelPosition = 'inside',
  className,
  barClassName,
  formatLabel,
  'aria-label': ariaLabel,
  ...props
}, ref) => {
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
    if (!showLabel && !label) return null;

    const labelContent = label || (formatLabel ? formatLabel(value, max) : `${Math.round(percentage)}%`);

    if (labelPosition === 'outside') {
      return (
        <div className="progress__label progress__label--outside">
          {labelContent}
        </div>
      );
    }

    return <span className="progress__label">{labelContent}</span>;
  };

  return (
    <div className="progress-wrapper">
      {labelPosition === 'outside' && renderLabel()}
      <div
        ref={ref}
        className={progressClasses}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={ariaLabel || `Progress: ${Math.round(percentage)}%`}
        {...props}
      >
        <div
          className={barClasses}
          style={!indeterminate ? { width: `${percentage}%` } : undefined}
        >
          {labelPosition === 'inside' && renderLabel()}
        </div>
      </div>
    </div>
  );
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
export const CircularProgress = forwardRef<HTMLDivElement, CircularProgressProps>(({
  value = 0,
  size = 'md',
  strokeWidth = 4,
  variant = 'primary',
  showLabel = true,
  label,
  indeterminate = false,
  className,
  formatLabel,
  ...props
}, ref) => {
  const sizeMap = {
    sm: 48,
    md: 80,
    lg: 120
  };

  const strokeWidthMap = {
    sm: 4,
    md: 5,
    lg: 6
  };

  const svgSize = sizeMap[size];
  const actualStrokeWidth = strokeWidthMap[size];
  const radius = (svgSize - actualStrokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  const circularClasses = [
    'progress-circular',
    `progress-circular--${size}`,
    indeterminate ? 'progress-circular--spinner' : '',
    className
  ].filter(Boolean).join(' ');

  const barClasses = [
    'progress-circular__bar',
    variant !== 'primary' ? `progress-circular__bar--${variant}` : ''
  ].filter(Boolean).join(' ');

  const renderLabel = () => {
    if (!showLabel && !label) return null;

    const labelContent = label || (formatLabel ? formatLabel(value) : `${Math.round(value)}%`);

    return <span className="progress-circular__text">{labelContent}</span>;
  };

  return (
    <div
      ref={ref}
      className={circularClasses}
      style={{ width: svgSize, height: svgSize }}
      role="progressbar"
      aria-valuenow={indeterminate ? undefined : value}
      aria-valuemin={0}
      aria-valuemax={100}
      {...props}
    >
      <svg
        className="progress-circular__svg"
        width={svgSize}
        height={svgSize}
        viewBox={`0 0 ${svgSize} ${svgSize}`}
      >
        <circle
          className="progress-circular__bg"
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={radius}
          strokeWidth={actualStrokeWidth}
        />
        <circle
          className={barClasses}
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={radius}
          strokeWidth={actualStrokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={indeterminate ? circumference * 0.75 : strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${svgSize / 2} ${svgSize / 2})`}
        />
      </svg>
      {!indeterminate && renderLabel()}
    </div>
  );
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
export const MultiStepProgress = forwardRef<HTMLDivElement, MultiStepProgressProps>(({
  currentStep,
  steps,
  variant = 'primary',
  className,
  showStepNumbers = false,
  ...props
}, ref) => {
  const percentage = (currentStep / (steps.length - 1)) * 100;

  const wrapperClasses = [
    'multi-step-progress',
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={wrapperClasses} {...props}>
      <div className="step-labels">
        {steps.map((step, index) => (
          <span
            key={index}
            className={[
              'step-label',
              index < currentStep ? 'step-label--completed' : '',
              index === currentStep ? 'step-label--active' : '',
              index > currentStep ? 'step-label--pending' : ''
            ].filter(Boolean).join(' ')}
          >
            {showStepNumbers && <span className="step-label__number">{index + 1}</span>}
            {step}
          </span>
        ))}
      </div>
      <Progress
        value={percentage}
        variant={variant}
        aria-label={`Step ${currentStep + 1} of ${steps.length}`}
      />
    </div>
  );
});

MultiStepProgress.displayName = 'MultiStepProgress';

export default Progress;