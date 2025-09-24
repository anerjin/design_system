import React, { forwardRef } from 'react';

export interface SelectOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /**
   * 선택 필드 크기
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * 선택 필드 상태
   */
  state?: 'success' | 'warning' | 'error';

  /**
   * 옵션 목록
   */
  options?: SelectOption[];

  /**
   * 플레이스홀더 옵션
   */
  placeholder?: string;

  /**
   * 선택 필드 전 요소 (select-group)
   */
  prepend?: React.ReactNode;

  /**
   * 선택 필드 후 요소 (select-group)
   */
  append?: React.ReactNode;

  /**
   * 자식 요소 (options 대신 직접 작성하는 경우)
   */
  children?: React.ReactNode;
}

/**
 * BRICKS 디자인 시스템 Select 컴포넌트
 *
 * @example
 * ```tsx
 * <Select
 *   size="md"
 *   placeholder="국가를 선택하세요"
 *   options={[
 *     { value: 'kr', label: '대한민국' },
 *     { value: 'us', label: '미국' },
 *     { value: 'jp', label: '일본' }
 *   ]}
 *   value={selectedCountry}
 *   onChange={(e) => setSelectedCountry(e.target.value)}
 * />
 * ```
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  size = 'md',
  state,
  options,
  placeholder,
  prepend,
  append,
  children,
  className,
  disabled,
  multiple,
  ...props
}, ref) => {
  const baseClasses = 'select';
  const sizeClass = `select--${size}`;
  const stateClass = state ? `select--${state}` : '';

  const selectClasses = [
    baseClasses,
    sizeClass,
    stateClass,
    className
  ].filter(Boolean).join(' ');

  // 그룹이 있는 경우
  const hasGroup = prepend || append;

  const selectElement = (
    <select
      ref={ref}
      className={selectClasses}
      disabled={disabled}
      multiple={multiple}
      {...props}
    >
      {placeholder && !multiple && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options ? (
        options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))
      ) : (
        children
      )}
    </select>
  );

  if (hasGroup) {
    return (
      <div className="select-group">
        {prepend && (
          <div className="select-group__prepend">
            {prepend}
          </div>
        )}
        {selectElement}
        {append && (
          <div className="select-group__append">
            {append}
          </div>
        )}
      </div>
    );
  }

  return selectElement;
});

Select.displayName = 'Select';

/**
 * SelectOption 컴포넌트 - Select 컴포넌트 내부에서 사용
 */
export const Option: React.FC<React.OptionHTMLAttributes<HTMLOptionElement>> = ({
  children,
  ...props
}) => {
  return <option {...props}>{children}</option>;
};

Option.displayName = 'Option';

/**
 * OptGroup 컴포넌트 - Select 컴포넌트 내부에서 사용
 */
export const OptGroup: React.FC<React.OptgroupHTMLAttributes<HTMLOptGroupElement>> = ({
  children,
  ...props
}) => {
  return <optgroup {...props}>{children}</optgroup>;
};

OptGroup.displayName = 'OptGroup';

export default Select;