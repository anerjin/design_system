import React, { useEffect, useState, forwardRef, createElement } from 'react';
import { createRoot, Root } from 'react-dom/client';

export interface AlertProps {
  /**
   * 알림 변형 스타일
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

  /**
   * 솔리드 스타일 사용 여부
   * @default false
   */
  solid?: boolean;

  /**
   * 알림 크기
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * 닫기 가능 여부
   * @default false
   */
  dismissible?: boolean;

  /**
   * 자동 닫기 시간 (밀리초)
   */
  autoClose?: number;

  /**
   * 강조선 위치
   */
  accent?: 'left' | 'top';

  /**
   * 토스트 모드 (플로팅)
   * @default false
   */
  toast?: boolean;

  /**
   * 토스트 위치
   */
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

  /**
   * 알림 제목
   */
  title?: React.ReactNode;

  /**
   * 알림 설명
   */
  description?: React.ReactNode;

  /**
   * 왼쪽 아이콘
   */
  icon?: React.ReactNode;

  /**
   * 액션 버튼들
   */
  actions?: React.ReactNode;

  /**
   * 리스트 아이템들
   */
  list?: React.ReactNode[];

  /**
   * 알림 닫기 이벤트
   */
  onClose?: () => void;

  /**
   * 알림 내용
   */
  children?: React.ReactNode;

  /**
   * 추가 CSS 클래스
   */
  className?: string;

  /**
   * 표시 여부 (제어 컴포넌트용)
   */
  visible?: boolean;
}

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
export const Alert = forwardRef<HTMLDivElement, AlertProps>(({
  variant = 'primary',
  solid = false,
  size = 'md',
  dismissible = false,
  autoClose,
  accent,
  toast = false,
  position = 'top-right',
  title,
  description,
  icon,
  actions,
  list,
  onClose,
  children,
  className,
  visible = true
}, ref) => {
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

  return (
    <div
      ref={ref}
      className={alertClasses}
      role="alert"
    >
      {icon && (
        <div className="alert__icon">
          {icon}
        </div>
      )}

      <div className="alert__content">
        {title && (
          <div className="alert__title">
            {title}
          </div>
        )}

        {description && (
          <div className="alert__description">
            {description}
          </div>
        )}

        {children}

        {list && list.length > 0 && (
          <ul className="alert__list">
            {list.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}

        {actions && (
          <div className="alert__actions">
            {actions}
          </div>
        )}
      </div>

      {dismissible && (
        <button
          type="button"
          className="alert__close"
          aria-label="닫기"
          onClick={handleClose}
        >
          ×
        </button>
      )}
    </div>
  );
});

Alert.displayName = 'Alert';

// 토스트 인스턴스 관리
const toastInstances: Map<string, { root: Root; element: HTMLDivElement }> = new Map();

/**
 * 토스트 알림을 생성하는 유틸리티 함수
 */
export const toast = {
  show: (props: Omit<AlertProps, 'toast'>) => {
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

    root.render(
      createElement(Alert, {
        ...props,
        toast: true,
        onClose: handleClose,
        visible: true
      })
    );

    toastInstances.set(toastId, { root, element: toastElement });

    return {
      id: toastId,
      close: handleClose
    };
  },

  success: (message: string, options?: Partial<AlertProps>) => {
    return toast.show({
      variant: 'success',
      description: message,
      dismissible: true,
      autoClose: 5000,
      ...options
    });
  },

  error: (message: string, options?: Partial<AlertProps>) => {
    return toast.show({
      variant: 'danger',
      description: message,
      dismissible: true,
      autoClose: 5000,
      ...options
    });
  },

  warning: (message: string, options?: Partial<AlertProps>) => {
    return toast.show({
      variant: 'warning',
      description: message,
      dismissible: true,
      autoClose: 5000,
      ...options
    });
  },

  info: (message: string, options?: Partial<AlertProps>) => {
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