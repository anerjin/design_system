import React, { forwardRef } from 'react';
import { Icon } from './Icon';

export interface SpinnerProps {
  /**
   * Spinner size
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Spinner type
   * @default 'circular'
   */
  type?: 'circular' | 'dots' | 'pulse' | 'bars';

  /**
   * Color variant
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'white';

  /**
   * Label text
   */
  label?: React.ReactNode;

  /**
   * Label position
   * @default 'bottom'
   */
  labelPosition?: 'top' | 'right' | 'bottom' | 'left';

  /**
   * Whether to use Icon-based spinner
   * @default false
   */
  useIcon?: boolean;

  /**
   * Icon name for Icon-based spinner
   * @default 'loader-alt'
   */
  iconName?: string;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Inline display
   * @default false
   */
  inline?: boolean;

  /**
   * ARIA label
   */
  'aria-label'?: string;
}

export interface SpinnerOverlayProps {
  /**
   * Whether to show overlay
   * @default true
   */
  visible?: boolean;

  /**
   * Spinner props
   */
  spinnerProps?: SpinnerProps;

  /**
   * Label text
   */
  label?: React.ReactNode;

  /**
   * Whether overlay is fullscreen
   * @default false
   */
  fullScreen?: boolean;

  /**
   * Background color
   */
  backgroundColor?: string;

  /**
   * Z-index
   * @default 9999
   */
  zIndex?: number;

  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * BRICKS Spinner Component
 *
 * @example
 * ```tsx
 * <Spinner />
 * <Spinner type="dots" variant="success" />
 * <Spinner size="lg" label="Loading..." />
 * ```
 */
export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(({
  size = 'md',
  type = 'circular',
  variant = 'primary',
  label,
  labelPosition = 'bottom',
  useIcon = false,
  iconName = 'loader-alt',
  className,
  inline = false,
  'aria-label': ariaLabel,
  ...props
}, ref) => {
  const spinnerClasses = [
    'spinner',
    size !== 'md' ? `spinner--${size}` : '',
    variant !== 'primary' ? `spinner--${variant}` : '',
    type !== 'circular' ? `spinner--${type}` : '',
    inline ? 'spinner--inline' : '',
    className
  ].filter(Boolean).join(' ');

  const containerClasses = [
    'spinner-wrapper',
    label ? `spinner-wrapper--with-label` : '',
    label ? `spinner-wrapper--label-${labelPosition}` : ''
  ].filter(Boolean).join(' ');

  const renderSpinner = () => {
    if (useIcon) {
      const sizeMap = {
        xs: 16,
        sm: 20,
        md: 24,
        lg: 32,
        xl: 48
      };

      return (
        <div className={`spinner-icon spinner-icon--${size}`}>
          <Icon
            name={iconName}
            size={sizeMap[size]}
            className="bx-spin"
            color={variant === 'white' ? '#ffffff' : undefined}
          />
        </div>
      );
    }

    switch (type) {
      case 'dots':
        return (
          <div className={spinnerClasses}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        );
      case 'bars':
        return (
          <div className={spinnerClasses}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        );
      case 'pulse':
      case 'circular':
      default:
        return <div className={spinnerClasses} />;
    }
  };

  if (!label) {
    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        aria-label={ariaLabel || 'Loading'}
        {...props}
      >
        {renderSpinner()}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={containerClasses}
      role="status"
      aria-live="polite"
      aria-label={ariaLabel || 'Loading'}
      {...props}
    >
      {renderSpinner()}
      {label && <span className="spinner__label">{label}</span>}
    </div>
  );
});

Spinner.displayName = 'Spinner';

/**
 * BRICKS Spinner Overlay Component
 *
 * @example
 * ```tsx
 * <SpinnerOverlay visible={loading} label="Processing..." />
 * ```
 */
export const SpinnerOverlay = forwardRef<HTMLDivElement, SpinnerOverlayProps>(({
  visible = true,
  spinnerProps = {},
  label,
  fullScreen = false,
  backgroundColor = 'rgba(255, 255, 255, 0.9)',
  zIndex = 9999,
  className,
  ...props
}, ref) => {
  if (!visible) return null;

  const overlayClasses = [
    'spinner-overlay',
    fullScreen ? 'spinner-overlay--fullscreen' : '',
    className
  ].filter(Boolean).join(' ');

  const overlayStyle: React.CSSProperties = {
    backgroundColor,
    zIndex,
    ...(fullScreen ? {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    } : {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    })
  };

  return (
    <div
      ref={ref}
      className={overlayClasses}
      style={overlayStyle}
      aria-busy="true"
      {...props}
    >
      <div className="spinner-overlay__content">
        <Spinner {...spinnerProps} size={spinnerProps.size || 'lg'} />
        {label && <div className="spinner-overlay__label">{label}</div>}
      </div>
    </div>
  );
});

SpinnerOverlay.displayName = 'SpinnerOverlay';

export default Spinner;