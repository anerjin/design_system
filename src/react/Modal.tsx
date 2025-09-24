import React, { useEffect, useRef, forwardRef } from 'react';

export interface ModalProps {
  /**
   * 모달 표시 여부
   */
  open?: boolean;

  /**
   * 모달 크기
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';

  /**
   * 모달 제목
   */
  title?: React.ReactNode;

  /**
   * 모달 닫기 버튼 표시 여부
   * @default true
   */
  closable?: boolean;

  /**
   * 중앙 정렬
   * @default false
   */
  centered?: boolean;

  /**
   * 스크롤 가능
   * @default false
   */
  scrollable?: boolean;

  /**
   * 정적 백드롭 (외부 클릭으로 닫히지 않음)
   * @default false
   */
  staticBackdrop?: boolean;

  /**
   * ESC 키로 닫기 비활성화
   * @default false
   */
  disableEscapeKeyDown?: boolean;

  /**
   * 모달 닫기 이벤트
   */
  onClose?: () => void;

  /**
   * 모달 열기 이벤트
   */
  onOpen?: () => void;

  /**
   * 백드롭 클릭 이벤트
   */
  onBackdropClick?: () => void;

  /**
   * 모달 헤더 커스텀 렌더링
   */
  header?: React.ReactNode;

  /**
   * 모달 푸터 커스텀 렌더링
   */
  footer?: React.ReactNode;

  /**
   * 모달 내용
   */
  children: React.ReactNode;

  /**
   * 추가 CSS 클래스
   */
  className?: string;

  /**
   * 모달 다이얼로그 추가 CSS 클래스
   */
  dialogClassName?: string;
}

/**
 * BRICKS 디자인 시스템 Modal 컴포넌트
 *
 * @example
 * ```tsx
 * <ModalWithButton
 *   footer={<div style={{display: 'flex', gap: '8px', justifyContent: 'flex-end'}}><Button size="sm" variant="secondary">Cancel</Button><Button size="sm" variant="primary">Confirm</Button></div>}
 *   title="Default Modal"
 * >
 *   <div>
 *     <p>
 *       This is the modal content. You can add any content here.
 *     </p>
 *   </div>
 * </ModalWithButton>
 * ```
 */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(({
  open = false,
  size = 'md',
  title,
  closable = true,
  centered = false,
  scrollable = false,
  staticBackdrop = false,
  disableEscapeKeyDown = false,
  onClose,
  onOpen,
  onBackdropClick,
  header,
  footer,
  children,
  className,
  dialogClassName
}, ref) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const finalRef = (ref as React.RefObject<HTMLDivElement>) || modalRef;

  // 모달이 열릴 때 포커스 관리
  useEffect(() => {
    if (open) {
      // 모달이 열릴 때
      onOpen?.();

      // 첫 번째 포커스 가능한 요소에 포커스
      const focusableElements = finalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements?.[0] as HTMLElement;
      if (firstElement) {
        setTimeout(() => firstElement.focus(), 100);
      }

      // body 스크롤 방지
      document.body.style.overflow = 'hidden';
    } else {
      // 모달이 닫힐 때 body 스크롤 복원
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open, onOpen, finalRef]);

  // ESC 키 이벤트 처리
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
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
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      if (staticBackdrop) {
        // 정적 백드롭일 때 흔들림 효과
        finalRef.current?.classList.add('modal--static');
        setTimeout(() => {
          finalRef.current?.classList.remove('modal--static');
        }, 500);
      } else {
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

  return (
    <div
      ref={finalRef}
      className={modalClasses}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      onClick={handleBackdropClick}
    >
      <div className={dialogClasses}>
        {(title || header || closable) && (
          <div className="modal__header">
            {header || (
              <>
                {title && (
                  <h2 id="modal-title" className="modal__title">
                    {title}
                  </h2>
                )}
                {closable && (
                  <button
                    type="button"
                    className="modal__close"
                    aria-label="닫기"
                    onClick={onClose}
                  >
                    ×
                  </button>
                )}
              </>
            )}
          </div>
        )}

        <div className="modal__body">
          {children}
        </div>

        {footer && (
          <div className="modal__footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
});

Modal.displayName = 'Modal';

/**
 * Modal.Header 컴포넌트
 */
export const ModalHeader: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const classes = ['modal__header', className].filter(Boolean).join(' ');
  return <div className={classes}>{children}</div>;
};

ModalHeader.displayName = 'ModalHeader';

/**
 * Modal.Title 컴포넌트
 */
export const ModalTitle: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const classes = ['modal__title', className].filter(Boolean).join(' ');
  return <h2 id="modal-title" className={classes}>{children}</h2>;
};

ModalTitle.displayName = 'ModalTitle';

/**
 * Modal.Body 컴포넌트
 */
export const ModalBody: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const classes = ['modal__body', className].filter(Boolean).join(' ');
  return <div className={classes}>{children}</div>;
};

ModalBody.displayName = 'ModalBody';

/**
 * Modal.Footer 컴포넌트
 */
export const ModalFooter: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const classes = ['modal__footer', className].filter(Boolean).join(' ');
  return <div className={classes}>{children}</div>;
};

ModalFooter.displayName = 'ModalFooter';

// Type for Modal with compound components
type ModalComponent = typeof Modal & {
  Header: typeof ModalHeader;
  Title: typeof ModalTitle;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
};

// Compound Component 패턴
(Modal as ModalComponent).Header = ModalHeader;
(Modal as ModalComponent).Title = ModalTitle;
(Modal as ModalComponent).Body = ModalBody;
(Modal as ModalComponent).Footer = ModalFooter;

export default Modal as ModalComponent;