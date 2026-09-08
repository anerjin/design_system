import { Icon } from './Icon';
import React, { forwardRef, useEffect, useId, useRef } from 'react';
import { Button } from './Button';
import { cx } from './utils';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';
export type ModalPlacement = 'top' | 'middle' | 'bottom' | 'start' | 'end';

/** daisyUI `modal-box`의 기본 최대 폭을 유틸리티로 덮어쓴다 */
const SIZE: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: '',
  lg: 'max-w-2xl',
  xl: 'max-w-5xl',
  fullscreen: 'max-w-none w-screen h-screen max-h-none rounded-none',
};

const PLACEMENT: Record<ModalPlacement, string> = {
  top: 'modal-top',
  middle: 'modal-middle',
  bottom: 'modal-bottom',
  start: 'modal-start',
  end: 'modal-end',
};

export interface ModalProps extends Omit<React.DialogHTMLAttributes<HTMLDialogElement>, 'title' | 'onClose'> {
  /** 열림 여부 */
  open?: boolean;

  /**
   * 모달 크기
   * @default 'md'
   */
  size?: ModalSize;

  /**
   * 화면 안에서의 위치
   * @default 'middle'
   */
  placement?: ModalPlacement;

  /** 제목. `header`를 주면 무시된다 */
  title?: React.ReactNode;

  /** 헤더의 제목 영역. 닫기 버튼은 별도로 배치된다. false 또는 null이면 헤더 전체를 숨긴다. */
  header?: React.ReactNode;

  /** 하단 액션 영역. 생략하거나 false/null을 주면 푸터를 숨긴다. */
  footer?: React.ReactNode;

  /**
   * 헤더 안의 닫기 버튼 표시. 헤더가 없으면 표시되지 않는다.
   * @default true
   */
  closable?: boolean;

  /**
   * 배경을 눌러도 닫히지 않게 한다
   * @default false
   */
  staticBackdrop?: boolean;

  /**
   * ESC로 닫기를 막는다
   * @default false
   */
  disableEscapeKeyDown?: boolean;

  /** 닫힐 때 호출된다 */
  onClose?: () => void;

  /** 열릴 때 호출된다 */
  onOpen?: () => void;

  /** `modal-box`에 적용할 추가 클래스 */
  boxClassName?: string;

  children: React.ReactNode;
}

/**
 * DOI INC Modal — daisyUI `modal` + 네이티브 `<dialog>` 기반
 *
 * header / body / footer 중 body만 스크롤된다.
 * header={false}로 헤더를 숨기고, footer를 생략하면 푸터 없이 사용할 수 있다.
 *
 * @example
 * ```tsx
 * <Modal
 *   open={open}
 *   title="정말 삭제할까요?"
 *   onClose={() => setOpen(false)}
 *   footer={<Button color="primary" onClick={remove}>삭제</Button>}
 * >
 *   이 작업은 되돌릴 수 없습니다.
 * </Modal>
 * ```
 */
const Modal = forwardRef<HTMLDialogElement, ModalProps>(
  (
    {
      open = false,
      size = 'md',
      placement = 'middle',
      title,
      header,
      footer,
      closable = true,
      staticBackdrop = false,
      disableEscapeKeyDown = false,
      onClose,
      onOpen,
      onCancel,
      className,
      boxClassName,
      children,
      ...props
    },
    ref,
  ) => {
    const innerRef = useRef<HTMLDialogElement | null>(null);
    const titleId = useId();
    // Existing compound sections become siblings instead of nesting inside the body.
    const sections = React.Children.toArray(children);
    const composedTitle = sections.find((child) => React.isValidElement(child) && child.type === ModalTitle);
    const composedActions = sections.find(
      (child) => React.isValidElement(child) && child.type === ModalActions,
    );
    const body = sections.filter(
      (child) => !React.isValidElement(child) || (child.type !== ModalTitle && child.type !== ModalActions),
    );
    const heading = header !== undefined ? header : (title ?? composedTitle);
    const hasHeading = heading !== undefined && heading !== null && heading !== false;
    const hasHeader = header !== false && header !== null && (hasHeading || closable);
    const actions = footer !== undefined ? footer : composedActions;
    const hasFooter = actions !== undefined && actions !== null && actions !== false;

    const setRefs = (node: HTMLDialogElement | null) => {
      innerRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDialogElement | null>).current = node;
    };

    // open prop과 <dialog>의 실제 상태를 맞춘다
    useEffect(() => {
      const dialog = innerRef.current;
      if (!dialog) return;

      if (open && !dialog.open) {
        dialog.showModal();
        onOpen?.();
      } else if (!open && dialog.open) {
        dialog.close();
      }
    }, [open, onOpen]);

    return (
      <dialog
        ref={setRefs}
        className={cx('modal', PLACEMENT[placement], className)}
        aria-labelledby={hasHeader && hasHeading ? titleId : undefined}
        aria-label={!hasHeader || !hasHeading ? '모달' : undefined}
        onClose={() => onClose?.()}
        onCancel={(event) => {
          onCancel?.(event);
          // cancel은 ESC로 닫힐 때 발생한다
          if (disableEscapeKeyDown) event.preventDefault();
        }}
        {...props}
      >
        <div className={cx('modal-box doi-modal-box', SIZE[size], boxClassName)}>
          {hasHeader && (
            <header className="doi-modal-header">
              <div id={hasHeading ? titleId : undefined} className="doi-modal-heading">
                {header !== undefined || composedTitle === heading ? (
                  heading
                ) : (
                  <ModalTitle>{heading}</ModalTitle>
                )}
              </div>
              {closable && (
                <Button
                  size="sm"
                  shape="circle"
                  variant="ghost"
                  aria-label="닫기"
                  onClick={() => innerRef.current?.close()}
                >
                  <Icon name="x" size={16} />
                </Button>
              )}
            </header>
          )}

          {body.length === 1 && React.isValidElement(body[0]) && body[0].type === ModalBody ? (
            body[0]
          ) : (
            <ModalBody>{body}</ModalBody>
          )}

          {hasFooter &&
            (React.isValidElement(actions) && actions.type === ModalActions ? (
              actions
            ) : (
              <ModalActions>{actions}</ModalActions>
            ))}
        </div>

        {/* 배경 클릭으로 닫기 — staticBackdrop이면 이 폼을 두지 않는다 */}
        {!staticBackdrop && (
          <form method="dialog" className="modal-backdrop">
            <button type="submit" tabIndex={-1} aria-label="배경을 눌러 닫기">
              close
            </button>
          </form>
        )}
      </dialog>
    );
  },
);

Modal.displayName = 'Modal';

export interface ModalSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

/** Modal.Title — 헤더를 직접 구성할 때 쓴다 */
export const ModalTitle = forwardRef<HTMLHeadingElement, ModalSectionProps>(
  ({ className, children, ...props }, ref) => (
    <h2 ref={ref} className={cx('doi-modal-title', className)} {...props}>
      {children}
    </h2>
  ),
);

ModalTitle.displayName = 'ModalTitle';

/** Modal.Body */
export const ModalBody = forwardRef<HTMLDivElement, ModalSectionProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cx('doi-modal-body', className)} {...props}>
      {children}
    </div>
  ),
);

ModalBody.displayName = 'ModalBody';

/** Modal.Actions — daisyUI `modal-action` */
export const ModalActions = forwardRef<HTMLDivElement, ModalSectionProps>(
  ({ className, children, ...props }, ref) => (
    <footer ref={ref} className={cx('modal-action doi-modal-footer', className)} {...props}>
      {children}
    </footer>
  ),
);

ModalActions.displayName = 'ModalActions';

export interface ModalComponent extends React.ForwardRefExoticComponent<
  ModalProps & React.RefAttributes<HTMLDialogElement>
> {
  Title: typeof ModalTitle;
  Body: typeof ModalBody;
  Actions: typeof ModalActions;
}

const ModalWithSubcomponents = Modal as ModalComponent;

ModalWithSubcomponents.Title = ModalTitle;
ModalWithSubcomponents.Body = ModalBody;
ModalWithSubcomponents.Actions = ModalActions;

export { ModalWithSubcomponents as Modal };
export default ModalWithSubcomponents;
