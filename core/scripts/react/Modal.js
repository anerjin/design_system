import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, forwardRef } from 'react';
/**
 * BRICKS 디자인 시스템 Modal 컴포넌트
 *
 * @example
 * ```tsx
 * <Modal
 *   open={isOpen}
 *   title="확인"
 *   onClose={() => setIsOpen(false)}
 *   footer={
 *     <>
 *       <Button variant="secondary" onClick={() => setIsOpen(false)}>취소</Button>
 *       <Button variant="primary" onClick={handleSubmit}>확인</Button>
 *     </>
 *   }
 * >
 *   정말로 삭제하시겠습니까?
 * </Modal>
 * ```
 */
export const Modal = forwardRef(({ open = false, size = 'md', title, closable = true, centered = false, scrollable = false, staticBackdrop = false, disableEscapeKeyDown = false, onClose, onOpen, onBackdropClick, header, footer, children, className, dialogClassName }, ref) => {
    const modalRef = useRef(null);
    const finalRef = ref || modalRef;
    // 모달이 열릴 때 포커스 관리
    useEffect(() => {
        if (open) {
            // 모달이 열릴 때
            onOpen?.();
            // 첫 번째 포커스 가능한 요소에 포커스
            const focusableElements = finalRef.current?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            const firstElement = focusableElements?.[0];
            if (firstElement) {
                setTimeout(() => firstElement.focus(), 100);
            }
            // body 스크롤 방지
            document.body.style.overflow = 'hidden';
        }
        else {
            // 모달이 닫힐 때 body 스크롤 복원
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open, onOpen, finalRef]);
    // ESC 키 이벤트 처리
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape' && open && !disableEscapeKeyDown) {
                onClose?.();
            }
        };
        if (open) {
            document.addEventListener('keydown', handleEscape);
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [open, disableEscapeKeyDown, onClose]);
    // 백드롭 클릭 처리
    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {
            if (staticBackdrop) {
                // 정적 백드롭일 때 흔들림 효과
                finalRef.current?.classList.add('modal--static');
                setTimeout(() => {
                    finalRef.current?.classList.remove('modal--static');
                }, 500);
            }
            else {
                onBackdropClick?.();
                onClose?.();
            }
        }
    };
    const modalClasses = [
        'modal',
        open ? 'modal--open' : '',
        centered ? 'modal--centered' : '',
        className
    ].filter(Boolean).join(' ');
    const dialogClasses = [
        'modal__dialog',
        size !== 'md' ? `modal__dialog--${size}` : '',
        scrollable ? 'modal__dialog--scrollable' : '',
        dialogClassName
    ].filter(Boolean).join(' ');
    if (!open) {
        return null;
    }
    return (_jsx("div", { ref: finalRef, className: modalClasses, role: "dialog", "aria-modal": "true", "aria-labelledby": title ? 'modal-title' : undefined, onClick: handleBackdropClick, children: _jsxs("div", { className: dialogClasses, children: [(title || header || closable) && (_jsx("div", { className: "modal__header", children: header || (_jsxs(_Fragment, { children: [title && (_jsx("h2", { id: "modal-title", className: "modal__title", children: title })), closable && (_jsx("button", { type: "button", className: "modal__close", "aria-label": "\uB2EB\uAE30", onClick: onClose, children: "\u00D7" }))] })) })), _jsx("div", { className: "modal__body", children: children }), footer && (_jsx("div", { className: "modal__footer", children: footer }))] }) }));
});
Modal.displayName = 'Modal';
/**
 * Modal.Header 컴포넌트
 */
export const ModalHeader = ({ children, className }) => {
    const classes = ['modal__header', className].filter(Boolean).join(' ');
    return _jsx("div", { className: classes, children: children });
};
ModalHeader.displayName = 'ModalHeader';
/**
 * Modal.Title 컴포넌트
 */
export const ModalTitle = ({ children, className }) => {
    const classes = ['modal__title', className].filter(Boolean).join(' ');
    return _jsx("h2", { id: "modal-title", className: classes, children: children });
};
ModalTitle.displayName = 'ModalTitle';
/**
 * Modal.Body 컴포넌트
 */
export const ModalBody = ({ children, className }) => {
    const classes = ['modal__body', className].filter(Boolean).join(' ');
    return _jsx("div", { className: classes, children: children });
};
ModalBody.displayName = 'ModalBody';
/**
 * Modal.Footer 컴포넌트
 */
export const ModalFooter = ({ children, className }) => {
    const classes = ['modal__footer', className].filter(Boolean).join(' ');
    return _jsx("div", { className: classes, children: children });
};
ModalFooter.displayName = 'ModalFooter';
// Compound Component 패턴
Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
export default Modal;
//# sourceMappingURL=Modal.js.map