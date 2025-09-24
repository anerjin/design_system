import React, { forwardRef } from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * 입력 필드 크기
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * 입력 필드 상태
   */
  state?: 'success' | 'warning' | 'error';

  /**
   * 왼쪽 아이콘
   */
  leftIcon?: React.ReactNode;

  /**
   * 오른쪽 아이콘
   */
  rightIcon?: React.ReactNode;

  /**
   * 입력 필드 전 요소 (input-group)
   */
  prepend?: React.ReactNode;

  /**
   * 입력 필드 후 요소 (input-group)
   */
  append?: React.ReactNode;
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * 텍스트 영역 상태
   */
  state?: 'success' | 'warning' | 'error';
}

/**
 * BRICKS 디자인 시스템 Input 컴포넌트
 *
 * @example
 * ```tsx
 * <Input
 *   size="md"
 *   placeholder="이름을 입력하세요"
 *   state="success"
 *   leftIcon={<SearchIcon />}
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(({
  size = 'md',
  state,
  leftIcon,
  rightIcon,
  prepend,
  append,
  className,
  disabled,
  readOnly,
  ...props
}, ref) => {
  const baseClasses = 'input';
  const sizeClass = `input--${size}`;
  const stateClass = state ? `input--${state}` : '';

  const inputClasses = [
    baseClasses,
    sizeClass,
    stateClass,
    className
  ].filter(Boolean).join(' ');

  // 아이콘 및 그룹이 있는 경우
  const hasIcons = leftIcon || rightIcon;
  const hasGroup = prepend || append;

  if (hasGroup) {
    return (
      <div className="input-group">
        {prepend && (
          <div className="input-group__prepend">
            {prepend}
          </div>
        )}
        <input
          ref={ref}
          className={inputClasses}
          disabled={disabled}
          readOnly={readOnly}
          {...props}
        />
        {append && (
          <div className="input-group__append">
            {append}
          </div>
        )}
      </div>
    );
  }

  if (hasIcons) {
    const iconContainerClasses = [
      'input-icon',
      leftIcon ? 'input-icon--left' : '',
      rightIcon ? 'input-icon--right' : ''
    ].filter(Boolean).join(' ');

    return (
      <div className={iconContainerClasses}>
        {leftIcon && (
          <div className="input-icon__icon input-icon__icon--left">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          className={inputClasses}
          disabled={disabled}
          readOnly={readOnly}
          {...props}
        />
        {rightIcon && (
          <div className="input-icon__icon input-icon__icon--right">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }

  return (
    <input
      ref={ref}
      className={inputClasses}
      disabled={disabled}
      readOnly={readOnly}
      {...props}
    />
  );
});

Input.displayName = 'Input';

/**
 * BRICKS 디자인 시스템 Textarea 컴포넌트
 *
 * @example
 * ```tsx
 * <Textarea
 *   placeholder="메시지를 입력하세요"
 *   state="error"
 *   rows={4}
 * />
 * ```
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  state,
  className,
  disabled,
  readOnly,
  ...props
}, ref) => {
  const baseClasses = 'textarea';
  const stateClass = state ? `input--${state}` : '';

  const textareaClasses = [
    baseClasses,
    stateClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <textarea
      ref={ref}
      className={textareaClasses}
      disabled={disabled}
      readOnly={readOnly}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

export default Input;