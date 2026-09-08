import React, { forwardRef, useEffect, useRef } from 'react';
import { cx, type Color, type Size } from './utils';

const COLOR: Record<Color, string> = {
  neutral: 'checkbox-neutral',
  primary: 'checkbox-primary',
  secondary: 'checkbox-secondary',
  accent: 'checkbox-accent',
  info: 'checkbox-info',
  success: 'checkbox-success',
  warning: 'checkbox-warning',
  error: 'checkbox-error',
};

const SIZE: Record<Size, string> = {
  xs: 'checkbox-xs',
  sm: 'checkbox-sm',
  md: 'checkbox-md',
  lg: 'checkbox-lg',
  xl: 'checkbox-xl',
};

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** 색상 */
  color?: Color;

  /**
   * 크기
   * @default 'md'
   */
  size?: Size;

  /** 라벨 텍스트. 주면 클릭 가능한 라벨로 감싼다 */
  label?: React.ReactNode;

  /** 라벨 아래 보조 설명 */
  description?: React.ReactNode;

  /**
   * 부분 선택 상태
   * @default false
   */
  indeterminate?: boolean;
}

/**
 * DOI INC Checkbox — daisyUI `checkbox` 기반
 *
 * daisyUI 체크박스는 네이티브 `<input type="checkbox">`에 클래스만 얹는다.
 * (이전 DOI INC의 `checkbox__box` / `checkbox__checkmark` 대체 마크업은 없어졌다.)
 *
 * @example
 * ```tsx
 * <Checkbox label="약관에 동의합니다" color="primary" />
 * <Checkbox indeterminate />
 * ```
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  color,
  size = 'md',
  label,
  description,
  indeterminate = false,
  className,
  ...props
}, ref) => {
  const innerRef = useRef<HTMLInputElement | null>(null);

  // indeterminate는 속성이 아니라 DOM 프로퍼티라 직접 지정해야 한다
  useEffect(() => {
    if (innerRef.current) {
      innerRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const setRefs = (node: HTMLInputElement | null) => {
    innerRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
  };

  const input = (
    <input
      ref={setRefs}
      type="checkbox"
      className={cx('checkbox', color && COLOR[color], SIZE[size], className)}
      {...props}
    />
  );

  if (!label) return input;

  return (
    <label className="label cursor-pointer items-start justify-start gap-3 whitespace-normal">
      {input}
      <span className="flex min-w-0 flex-col items-start">
        <span>{label}</span>
        {description && <span className="text-xs opacity-60">{description}</span>}
      </span>
    </label>
  );
});

Checkbox.displayName = 'Checkbox';

export interface CheckboxGroupProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  /** 그룹 제목 */
  label?: React.ReactNode;

  /**
   * 가로 배치
   * @default false
   */
  inline?: boolean;

  /** 오류 메시지. 주면 오류 상태로 표시된다 */
  error?: React.ReactNode;

  /**
   * 필수 표시
   * @default false
   */
  required?: boolean;

  children: React.ReactNode;
}

/**
 * DOI INC CheckboxGroup — daisyUI `fieldset` 기반
 *
 * @example
 * ```tsx
 * <CheckboxGroup label="관심 분야" error="하나 이상 선택하세요">
 *   <Checkbox label="프론트엔드" value="fe" />
 *   <Checkbox label="백엔드" value="be" />
 * </CheckboxGroup>
 * ```
 */
export const CheckboxGroup = forwardRef<HTMLFieldSetElement, CheckboxGroupProps>(({
  label,
  inline = false,
  error,
  required = false,
  className,
  children,
  ...props
}, ref) => (
  <fieldset ref={ref} className={cx('fieldset', className)} {...props}>
    {label && (
      <legend className="fieldset-legend">
        {label}
        {required && <span className="text-error">*</span>}
      </legend>
    )}
    <div className={inline ? 'flex flex-wrap items-center gap-4' : 'flex flex-col gap-1'}>
      {children}
    </div>
    {error && (
      <p className="fieldset-label text-error" role="alert">{error}</p>
    )}
  </fieldset>
));

CheckboxGroup.displayName = 'CheckboxGroup';

export default Checkbox;
