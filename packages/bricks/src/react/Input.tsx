import React, { forwardRef } from 'react';
import { cx, type Color, type Size } from './utils';

/** daisyUI 폼 컨트롤은 시맨틱 색상에 더해 `ghost`(배경 없음)를 지원한다 */
export type FieldColor = Color | 'ghost';

const INPUT_COLOR: Record<FieldColor, string> = {
  neutral: 'input-neutral',
  primary: 'input-primary',
  secondary: 'input-secondary',
  accent: 'input-accent',
  info: 'input-info',
  success: 'input-success',
  warning: 'input-warning',
  error: 'input-error',
  ghost: 'input-ghost',
};

const INPUT_SIZE: Record<Size, string> = {
  xs: 'input-xs',
  sm: 'input-sm',
  md: 'input-md',
  lg: 'input-lg',
  xl: 'input-xl',
};

const TEXTAREA_COLOR: Record<FieldColor, string> = {
  neutral: 'textarea-neutral',
  primary: 'textarea-primary',
  secondary: 'textarea-secondary',
  accent: 'textarea-accent',
  info: 'textarea-info',
  success: 'textarea-success',
  warning: 'textarea-warning',
  error: 'textarea-error',
  ghost: 'textarea-ghost',
};

const TEXTAREA_SIZE: Record<Size, string> = {
  xs: 'textarea-xs',
  sm: 'textarea-sm',
  md: 'textarea-md',
  lg: 'textarea-lg',
  xl: 'textarea-xl',
};

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * 색상. 검증 결과 표시에도 쓴다 (`color="error"` = 오류 상태).
   */
  color?: FieldColor;

  /**
   * 입력 필드 크기
   * @default 'md'
   */
  size?: Size;

  /** 필드 안쪽 왼쪽에 놓을 아이콘 */
  leftIcon?: React.ReactNode;

  /** 필드 안쪽 오른쪽에 놓을 아이콘 또는 짧은 텍스트 */
  rightIcon?: React.ReactNode;
}

/**
 * DOI INC Input — daisyUI `input` 기반
 *
 * 아이콘을 주면 daisyUI v5 방식대로 `<label class="input">`이 껍데기가 되고
 * 안쪽 `<input>`은 `grow`만 갖는다.
 *
 * 라벨을 붙이려면 `Fieldset`과 함께 쓰고, 버튼을 붙이려면 `join`으로 감싼다.
 *
 * @example
 * ```tsx
 * <Input placeholder="이름" />
 * <Input color="error" defaultValue="잘못된 값" />
 * <Input leftIcon={<Icon name="search" size="1em"  />} placeholder="검색" />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(({
  color,
  size = 'md',
  leftIcon,
  rightIcon,
  className,
  ...props
}, ref) => {
  const classes = cx(
    'input',
    color && INPUT_COLOR[color],
    INPUT_SIZE[size],
    className,
  );

  if (leftIcon || rightIcon) {
    return (
      <label className={classes}>
        {leftIcon}
        <input ref={ref} className="grow" {...props} />
        {rightIcon}
      </label>
    );
  }

  return <input ref={ref} className={classes} {...props} />;
});

Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** 색상. 검증 결과 표시에도 쓴다 */
  color?: FieldColor;

  /**
   * 크기
   * @default 'md'
   */
  size?: Size;
}

/**
 * DOI INC Textarea — daisyUI `textarea` 기반
 *
 * @example
 * ```tsx
 * <Textarea placeholder="메시지" rows={4} />
 * ```
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  color,
  size = 'md',
  className,
  ...props
}, ref) => (
  <textarea
    ref={ref}
    className={cx(
      'textarea',
      color && TEXTAREA_COLOR[color],
      TEXTAREA_SIZE[size],
      className,
    )}
    {...props}
  />
));

Textarea.displayName = 'Textarea';

export default Input;
