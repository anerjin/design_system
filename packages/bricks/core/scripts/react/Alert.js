import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, forwardRef, createElement } from 'react';
import { createRoot } from 'react-dom/client';
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
// 토스트 인스턴스 관리
const toastInstances = new Map();
/**
 * 토스트 알림을 생성하는 유틸리티 함수
 */
export const toast = {
    show: (props) => {
        const toastContainer = document.getElementById('toast-container') || (() => {
            const container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'toast-container';
            document.body.appendChild(container);
            return container;
        })();
        const toastId = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const toastElement = document.createElement('div');
        toastElement.id = toastId;
        toastElement.style.pointerEvents = 'auto';
        toastContainer.appendChild(toastElement);
        const root = createRoot(toastElement);
        const handleClose = () => {
            props.onClose?.();
            setTimeout(() => {
                root.unmount();
                toastElement.remove();
                toastInstances.delete(toastId);
            }, 300);
        };
        root.render(createElement(Alert, {
            ...props,
            toast: true,
            onClose: handleClose,
            visible: true
        }));
        toastInstances.set(toastId, { root, element: toastElement });
        return {
            id: toastId,
            close: handleClose
        };
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
    },
    closeAll: () => {
        toastInstances.forEach(({ root, element }) => {
            root.unmount();
            element.remove();
        });
        toastInstances.clear();
    }
};
export default Alert;
//# sourceMappingURL=Alert.js.map