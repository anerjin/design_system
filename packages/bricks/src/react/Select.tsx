import React, { forwardRef } from 'react';
import { cx, type Size } from './utils';
import type { FieldColor } from './Input';

const COLOR: Record<FieldColor, string> = {
  neutral: 'select-neutral',
  primary: 'select-primary',
  secondary: 'select-secondary',
  accent: 'select-accent',
  info: 'select-info',
  success: 'select-success',
  warning: 'select-warning',
  error: 'select-error',
  ghost: 'select-ghost',
};

const SIZE: Record<Size, string> = {
  xs: 'select-xs',
  sm: 'select-sm',
  md: 'select-md',
  lg: 'select-lg',
  xl: 'select-xl',
};

export interface SelectOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** 색상. 검증 결과 표시에도 쓴다 (`color="error"` = 오류 상태) */
  color?: FieldColor;

  /**
   * 크기
   * @default 'md'
   */
  size?: Size;

  /** 옵션 목록. 주지 않으면 `children`을 그대로 렌더한다 */
  options?: SelectOption[];

  /** 선택 전 안내 문구. 비활성 옵션으로 맨 앞에 놓인다 */
  placeholder?: string;

  children?: React.ReactNode;
}

/**
 * DOI INC Select — daisyUI `select` 기반
 *
 * @example
 * ```tsx
 * <Select
 *   placeholder="국가를 선택하세요"
 *   options={[
 *     { value: 'kr', label: '대한민국' },
 *     { value: 'us', label: '미국' },
 *   ]}
 * />
 * ```
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  color,
  size = 'md',
  options,
  placeholder,
  children,
  className,
  defaultValue,
  value,
  ...props
}, ref) => (
  <select
    ref={ref}
    className={cx('select', color && COLOR[color], SIZE[size], className)}
    // placeholder를 쓰면서 값이 지정되지 않았다면 안내 문구가 선택된 상태로 시작한다
    defaultValue={defaultValue ?? (placeholder && value === undefined ? '' : undefined)}
    value={value}
    {...props}
  >
    {placeholder && <option value="" disabled>{placeholder}</option>}
    {options
      ? options.map((option) => (
        <option key={option.value} value={option.value} disabled={option.disabled}>
          {option.label}
        </option>
      ))
      : children}
  </select>
));

Select.displayName = 'Select';

/** Select 안에서 직접 옵션을 작성할 때 쓴다 */
export const Option: React.FC<React.OptionHTMLAttributes<HTMLOptionElement>> = ({
  children,
  ...props
}) => <option {...props}>{children}</option>;

Option.displayName = 'Option';

/** Select 안에서 옵션을 묶을 때 쓴다 */
export const OptGroup: React.FC<React.OptgroupHTMLAttributes<HTMLOptGroupElement>> = ({
  children,
  ...props
}) => <optgroup {...props}>{children}</optgroup>;

OptGroup.displayName = 'OptGroup';

export default Select;
