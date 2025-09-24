import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, forwardRef } from 'react';
/**
 * BRICKS 디자인 시스템 Alert 컴포넌트
 *
 * @example
 * ```tsx
 * <Alert
 *   variant="success"
 *   title="성공"
 *   description="작업이 성공적으로 완료되었습니다."
 *   dismissible
 *   onClose={() => setAlertVisible(false)}
 *   icon={<CheckIcon />}
 * />
 * ```
 */
export const Alert = forwardRef(({ variant = 'primary', solid = false, size = 'md', dismissible = false, autoClose, accent, toast = false, position = 'top-right', title, description, icon, actions, list, onClose, children, className, visible = true }, ref) => {
    const [isVisible, setIsVisible] = useState(visible);
    const [isClosing, setIsClosing] = useState(false);
    // autoClose 처리
    useEffect(() => {
        if (autoClose && isVisible) {
            const timer = setTimeout(() => {
                handleClose();
            }, autoClose);
            return () => clearTimeout(timer);
        }
        return undefined;
    }, [autoClose, isVisible]);
    // visible prop 변경 처리
    useEffect(() => {
        setIsVisible(visible);
    }, [visible]);
    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsVisible(false);
            setIsClosing(false);
            onClose?.();
        }, 300); // 애니메이션 시간
    };
    if (!isVisible) {
        return null;
    }
    const alertClasses = [
        'alert',
        solid ? `alert--solid-${variant}` : `alert--${variant}`,
        size !== 'md' ? `alert--${size}` : '',
        dismissible ? 'alert--dismissible' : '',
        accent ? `alert--accent-${accent}` : '',
        toast ? 'alert--toast' : '',
        toast && position ? `alert--toast-${position.replace('-', ' alert--toast-')}` : '',
        isClosing ? 'alert--fade-out' : '',
        className
    ].filter(Boolean).join(' ');
    return (_jsxs("div", { ref: ref, className: alertClasses, role: "alert", children: [icon && (_jsx("div", { className: "alert__icon", children: icon })), _jsxs("div", { className: "alert__content", children: [title && (_jsx("div", { className: "alert__title", children: title })), description && (_jsx("div", { className: "alert__description", children: description })), children, list && list.length > 0 && (_jsx("ul", { className: "alert__list", children: list.map((item, index) => (_jsx("li", { children: item }, index))) })), actions && (_jsx("div", { className: "alert__actions", children: actions }))] }), dismissible && (_jsx("button", { type: "button", className: "alert__close", "aria-label": "\uB2EB\uAE30", onClick: handleClose, children: "\u00D7" }))] }));
});
Alert.displayName = 'Alert';
/**
 * 토스트 알림을 생성하는 유틸리티 함수
 */
export const toast = {
    show: (_props) => {
        const toastContainer = document.getElementById('toast-container') || (() => {
            const container = document.createElement('div');
            container.id = 'toast-container';
            container.style.cssText = `
        position: fixed;
        z-index: 1000;
        pointer-events: none;
      `;
            document.body.appendChild(container);
            return container;
        })();
        const toastElement = document.createElement('div');
        toastContainer.appendChild(toastElement);
        // React 컴포넌트를 DOM 요소에 렌더링하는 로직은
        // 실제 사용 시 ReactDOM.render 또는 createRoot를 사용해야 합니다.
        // 여기서는 구조만 제공합니다.
    },
    success: (message, options) => {
        return toast.show({
            variant: 'success',
            description: message,
            dismissible: true,
            autoClose: 5000,
            ...options
        });
    },
    error: (message, options) => {
        return toast.show({
            variant: 'danger',
            description: message,
            dismissible: true,
            autoClose: 5000,
            ...options
        });
    },
    warning: (message, options) => {
        return toast.show({
            variant: 'warning',
            description: message,
            dismissible: true,
            autoClose: 5000,
            ...options
        });
    },
    info: (message, options) => {
        return toast.show({
            variant: 'info',
            description: message,
            dismissible: true,
            autoClose: 5000,
            ...options
        });
    }
};
export default Alert;
//# sourceMappingURL=Alert.js.map