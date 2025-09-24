import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { Icon } from './Icon';
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
export const Spinner = forwardRef(({ size = 'md', type = 'circular', variant = 'primary', label, labelPosition = 'bottom', useIcon = false, iconName = 'loader-alt', className, inline = false, 'aria-label': ariaLabel, ...props }, ref) => {
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
            return (_jsx("div", { className: `spinner-icon spinner-icon--${size}`, children: _jsx(Icon, { name: iconName, size: sizeMap[size], className: "bx-spin", color: variant === 'white' ? '#ffffff' : undefined }) }));
        }
        switch (type) {
            case 'dots':
                return (_jsxs("div", { className: spinnerClasses, children: [_jsx("span", {}), _jsx("span", {}), _jsx("span", {})] }));
            case 'bars':
                return (_jsxs("div", { className: spinnerClasses, children: [_jsx("span", {}), _jsx("span", {}), _jsx("span", {})] }));
            case 'pulse':
            case 'circular':
            default:
                return _jsx("div", { className: spinnerClasses });
        }
    };
    if (!label) {
        return (_jsx("div", { ref: ref, role: "status", "aria-live": "polite", "aria-label": ariaLabel || 'Loading', ...props, children: renderSpinner() }));
    }
    return (_jsxs("div", { ref: ref, className: containerClasses, role: "status", "aria-live": "polite", "aria-label": ariaLabel || 'Loading', ...props, children: [renderSpinner(), label && _jsx("span", { className: "spinner__label", children: label })] }));
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
export const SpinnerOverlay = forwardRef(({ visible = true, spinnerProps = {}, label, fullScreen = false, backgroundColor = 'rgba(255, 255, 255, 0.9)', zIndex = 9999, className, ...props }, ref) => {
    if (!visible)
        return null;
    const overlayClasses = [
        'spinner-overlay',
        fullScreen ? 'spinner-overlay--fullscreen' : '',
        className
    ].filter(Boolean).join(' ');
    const overlayStyle = {
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
    return (_jsx("div", { ref: ref, className: overlayClasses, style: overlayStyle, "aria-busy": "true", ...props, children: _jsxs("div", { className: "spinner-overlay__content", children: [_jsx(Spinner, { ...spinnerProps, size: spinnerProps.size || 'lg' }), label && _jsx("div", { className: "spinner-overlay__label", children: label })] }) }));
});
SpinnerOverlay.displayName = 'SpinnerOverlay';
export default Spinner;
//# sourceMappingURL=Spinner.js.map