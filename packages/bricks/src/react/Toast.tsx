import React, { createElement, forwardRef } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { Alert, type AlertProps } from './Alert';
import { cx } from './utils';

export type ToastPlacement =
  | 'top-start' | 'top-center' | 'top-end'
  | 'middle-start' | 'middle-center' | 'middle-end'
  | 'bottom-start' | 'bottom-center' | 'bottom-end';

const PLACEMENT: Record<ToastPlacement, string> = {
  'top-start': 'toast-top toast-start',
  'top-center': 'toast-top toast-center',
  'top-end': 'toast-top toast-end',
  'middle-start': 'toast-middle toast-start',
  'middle-center': 'toast-middle toast-center',
  'middle-end': 'toast-middle toast-end',
  'bottom-start': 'toast-bottom toast-start',
  'bottom-center': 'toast-bottom toast-center',
  'bottom-end': 'toast-bottom toast-end',
};

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 화면 안에서의 위치
   * @default 'bottom-end'
   */
  placement?: ToastPlacement;

  children?: React.ReactNode;
}

/**
 * DOI INC Toast — daisyUI `toast` 기반
 *
 * 알림을 화면 모서리에 띄우는 컨테이너다. 안에는 보통 `Alert`를 넣는다.
 * 명령형으로 띄우려면 이 모듈의 `toast` 헬퍼를 쓴다.
 *
 * @example
 * ```tsx
 * <Toast placement="top-end">
 *   <Alert color="success" description="저장되었습니다" />
 * </Toast>
 * ```
 */
export const Toast = forwardRef<HTMLDivElement, ToastProps>(({
  placement = 'bottom-end',
  className,
  children,
  ...props
}, ref) => (
  <div ref={ref} className={cx('toast', PLACEMENT[placement], className)} {...props}>
    {children}
  </div>
));

Toast.displayName = 'Toast';

/* ------------------------------------------------------------------ */
/* 명령형 API                                                          */
/* ------------------------------------------------------------------ */

export interface ToastOptions extends Omit<AlertProps, 'visible' | 'dismissible'> {
  /**
   * 화면 안에서의 위치
   * @default 'bottom-end'
   */
  placement?: ToastPlacement;

  /**
   * 닫기 버튼 표시
   * @default true
   */
  dismissible?: boolean;

  /**
   * 자동으로 닫히기까지의 시간(ms). `0`이면 자동으로 닫지 않는다.
   * @default 4000
   */
  autoClose?: number;
}

interface ToastHandle {
  id: string;
  close: () => void;
}

/** 위치별 컨테이너를 한 번만 만들어 재사용한다 */
const containers = new Map<ToastPlacement, HTMLDivElement>();
const mounted = new Map<string, { root: Root; element: HTMLDivElement }>();

function getContainer(placement: ToastPlacement): HTMLDivElement {
  const existing = containers.get(placement);
  if (existing?.isConnected) return existing;

  const container = document.createElement('div');
  container.className = cx('toast', PLACEMENT[placement]);
  container.dataset.bricksToast = placement;
  document.body.appendChild(container);
  containers.set(placement, container);
  return container;
}

function unmount(id: string) {
  const entry = mounted.get(id);
  if (!entry) return;
  mounted.delete(id);
  // 렌더 중 unmount를 피하려고 다음 틱으로 미룬다
  setTimeout(() => {
    entry.root.unmount();
    entry.element.remove();
  }, 0);
}

function show({
  placement = 'bottom-end',
  dismissible = true,
  autoClose = 4000,
  onClose,
  ...alertProps
}: ToastOptions): ToastHandle {
  const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  const element = document.createElement('div');
  getContainer(placement).appendChild(element);

  const root = createRoot(element);
  mounted.set(id, { root, element });

  const close = () => {
    onClose?.();
    unmount(id);
  };

  root.render(createElement(Alert, {
    ...alertProps,
    dismissible,
    autoClose: autoClose > 0 ? autoClose : undefined,
    onClose: close,
  }));

  return { id, close };
}

const withColor = (color: AlertProps['color']) =>
  (message: React.ReactNode, options: ToastOptions = {}): ToastHandle =>
    show({ color, description: message, ...options });

/**
 * 명령형 토스트 헬퍼.
 *
 * @example
 * ```ts
 * toast.success('저장했습니다');
 * toast.error('업로드에 실패했습니다', { placement: 'top-center' });
 * toast.closeAll();
 * ```
 */
export const toast = {
  show,
  info: withColor('info'),
  success: withColor('success'),
  warning: withColor('warning'),
  error: withColor('error'),
  closeAll: () => {
    Array.from(mounted.keys()).forEach(unmount);
  },
};

export default Toast;
