import React, { forwardRef, useState, useEffect } from 'react';

export interface ToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  /**
   * 토글 스위치 크기
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * 토글 스위치 변형 스타일
   */
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'pink' | 'mint' | 'yellow' | 'green' | 'lightblue' | 'blue' | 'dark';

  /**
   * 토글 스위치 활성화 상태
   */
  checked?: boolean;

  /**
   * 기본 활성화 상태 (비제어 컴포넌트)
   */
  defaultChecked?: boolean;

  /**
   * 토글 스위치 레이블
   */
  label?: React.ReactNode;

  /**
   * 아이콘 표시 여부
   */
  showIcons?: boolean;

  /**
   * 켜짐 상태 아이콘
   */
  onIcon?: React.ReactNode;

  /**
   * 꺼짐 상태 아이콘
   */
  offIcon?: React.ReactNode;

  /**
   * 토글 상태 변경 이벤트
   */
  onChange?: (checked: boolean, event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => void;
}

/**
 * BRICKS 디자인 시스템 Toggle 컴포넌트
 *
 * @example
 * ```tsx
 * <Toggle
 *   label="알림 설정"
 *   checked={notificationEnabled}
 *   onChange={(checked) => setNotificationEnabled(checked)}
 *   variant="success"
 * />
 * ```
 */
export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(({
  size = 'md',
  variant,
  checked,
  defaultChecked = false,
  label,
  showIcons = false,
  onIcon,
  offIcon,
  className,
  id,
  disabled,
  onChange,
  onKeyDown,
  onClick,
  ...props
}, ref) => {
  const [isChecked, setIsChecked] = useState(checked ?? defaultChecked);
  const isControlled = checked !== undefined;

  // 제어 컴포넌트에서 checked prop이 변경되면 상태 업데이트
  useEffect(() => {
    if (isControlled) {
      setIsChecked(checked);
    }
  }, [checked, isControlled]);

  const toggleId = id || `toggle-${Math.random().toString(36).substr(2, 9)}`;

  const containerClasses = [
    'toggle',
    size !== 'md' ? `toggle--${size}` : '',
    variant ? `toggle--${variant}` : '',
    isChecked ? 'toggle--active' : '',
    showIcons ? 'toggle--icons' : '',
    className
  ].filter(Boolean).join(' ');

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;

    const newChecked = !isChecked;

    if (!isControlled) {
      setIsChecked(newChecked);
    }

    onChange?.(newChecked, event);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleToggle(event);
    onClick?.(event);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    // Space, Enter, ArrowRight, ArrowLeft 키 처리
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      handleToggle(event);
    } else if (event.key === 'ArrowRight' && !isChecked) {
      event.preventDefault();
      handleToggle(event);
    } else if (event.key === 'ArrowLeft' && isChecked) {
      event.preventDefault();
      handleToggle(event);
    }

    onKeyDown?.(event);
  };

  return (
    <div className="toggle-wrapper" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
      <button
        ref={ref}
        id={toggleId}
        className={containerClasses}
        role="switch"
        aria-checked={isChecked}
        aria-disabled={disabled}
        disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        <span className="toggle__track" />
        <span className="toggle__thumb">
          {showIcons && (
            <>
              {onIcon && (
                <span className="toggle__icon toggle__icon--on">
                  {onIcon}
                </span>
              )}
              {offIcon && (
                <span className="toggle__icon toggle__icon--off">
                  {offIcon}
                </span>
              )}
            </>
          )}
        </span>
      </button>
      {label && (
        <label htmlFor={toggleId} style={{ cursor: disabled ? 'not-allowed' : 'pointer', userSelect: 'none' }}>
          {label}
        </label>
      )}
    </div>
  );
});

Toggle.displayName = 'Toggle';

export default Toggle;