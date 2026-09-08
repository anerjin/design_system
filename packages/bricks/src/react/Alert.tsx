import { Icon, type IconName } from './Icon';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { cx, type StatusColor } from './utils';

export type AlertVariant = 'solid' | 'outline' | 'dash' | 'soft';
export type AlertLayout = 'horizontal' | 'vertical';

const COLOR: Record<StatusColor, string> = {
  info: 'alert-info',
  success: 'alert-success',
  warning: 'alert-warning',
  error: 'alert-error',
};

const VARIANT: Record<AlertVariant, string> = {
  solid: '',
  outline: 'alert-outline',
  dash: 'alert-dash',
  soft: 'alert-soft',
};

const LAYOUT: Record<AlertLayout, string> = {
  horizontal: 'alert-horizontal',
  vertical: 'alert-vertical',
};

/** 색상별 기본 아이콘 (Lucide) */
const DEFAULT_ICON: Record<StatusColor, IconName> = {
  info: 'info',
  success: 'circle-check',
  warning: 'triangle-alert',
  error: 'circle-x',
};

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * 상태 아이콘 색상. 배경과 본문은 중립색을 유지한다.
   */
  color?: StatusColor;

  /**
   * 알림 스타일
   * @default 'solid'
   */
  variant?: AlertVariant;

  /**
   * 액션 배치 방향. 기본은 가로 배치이며, 공간이 부족하면 본문 아래로 줄바꿈한다.
   */
  layout?: AlertLayout;

  /** 제목 */
  title?: React.ReactNode;

  /** 설명 */
  description?: React.ReactNode;

  /**
   * 왼쪽 아이콘. `false`를 주면 기본 아이콘도 감춘다.
   */
  icon?: React.ReactNode | false;

  /** 액션 영역. 좁은 화면에서는 본문 아래로 배치된다. */
  actions?: React.ReactNode;

  /**
   * 닫기 버튼 표시
   * @default false
   */
  dismissible?: boolean;

  /** 지정한 밀리초 뒤 자동으로 닫는다 */
  autoClose?: number;

  /** 표시 여부 (제어 컴포넌트용) */
  visible?: boolean;

  /** 닫힐 때 호출된다 */
  onClose?: () => void;

  children?: React.ReactNode;
}

/**
 * DOI INC Alert — daisyUI `alert` 기반
 *
 * @example
 * ```tsx
 * <Alert color="success" title="저장 완료" description="변경사항이 반영되었습니다." />
 * <Alert color="error" variant="soft" dismissible onClose={handleClose}>
 *   업로드에 실패했습니다.
 * </Alert>
 * ```
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      color,
      variant = 'solid',
      layout,
      title,
      description,
      icon,
      actions,
      dismissible = false,
      autoClose,
      visible = true,
      onClose,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [isVisible, setIsVisible] = useState(visible);

    useEffect(() => setIsVisible(visible), [visible]);

    const handleClose = useCallback(() => {
      setIsVisible(false);
      onClose?.();
    }, [onClose]);

    useEffect(() => {
      if (!autoClose || !isVisible) return undefined;
      const timer = setTimeout(handleClose, autoClose);
      return () => clearTimeout(timer);
    }, [autoClose, isVisible, handleClose]);

    if (!isVisible) return null;

    const resolvedIcon =
      icon === false ? null : (icon ?? (color ? <Icon name={DEFAULT_ICON[color]} size="1em" /> : null));

    return (
      <div
        ref={ref}
        role="alert"
        className={cx(
          'alert bricks-alert',
          color && COLOR[color],
          VARIANT[variant],
          layout && LAYOUT[layout],
          className,
        )}
        {...props}
      >
        {resolvedIcon && (
          <span className="bricks-alert-icon" aria-hidden="true">
            {resolvedIcon}
          </span>
        )}

        <div className="bricks-alert-body">
          <div className="bricks-alert-content">
            {title && <h3 className="bricks-alert-title">{title}</h3>}
            {description && <div className="bricks-alert-description">{description}</div>}
            {children}
          </div>
          {actions && <div className="bricks-alert-actions">{actions}</div>}
        </div>

        {dismissible && (
          <button
            type="button"
            className="btn btn-ghost btn-sm btn-circle bricks-alert-close"
            aria-label="닫기"
            onClick={handleClose}
          >
            <Icon name="x" size="1em" aria-hidden="true" />
          </button>
        )}
      </div>
    );
  },
);

Alert.displayName = 'Alert';

export default Alert;
