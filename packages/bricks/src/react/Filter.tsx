import React, { forwardRef, useId } from 'react';
import { cx } from './utils';

export interface FilterOption {
  /** 값 */
  value: string;

  /** 표시할 글자 */
  label: string;
}

export interface FilterProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onChange'> {
  /** 선택지 목록 */
  options: FilterOption[];

  /** 선택된 값 (제어) */
  value?: string;

  /** 처음 선택될 값 (비제어) */
  defaultValue?: string;

  /** 라디오 그룹 이름 */
  name?: string;

  /**
   * 선택 해제 버튼의 글자
   * @default '×'
   */
  resetLabel?: string;

  /** 선택이 바뀔 때 호출된다. 해제하면 빈 문자열이 온다 */
  onChange?: (value: string) => void;
}

/**
 * DOI INC Filter — daisyUI `filter` 기반
 *
 * 고르면 나머지 선택지가 접히고 해제 버튼만 남는다.
 * 라디오 버튼이라 JS 없이도 동작한다.
 *
 * @example
 * ```tsx
 * <Filter
 *   options={[
 *     { value: 'svelte', label: 'Svelte' },
 *     { value: 'vue', label: 'Vue' },
 *     { value: 'react', label: 'React' },
 *   ]}
 *   onChange={setFramework}
 * />
 * ```
 */
export const Filter = forwardRef<HTMLFormElement, FilterProps>(({
  options,
  value,
  defaultValue,
  name,
  resetLabel = '×',
  onChange,
  className,
  ...props
}, ref) => {
  const autoName = useId();
  const groupName = name ?? autoName;
  const isControlled = value !== undefined;

  return (
    <form
      ref={ref}
      className={cx('filter', className)}
      onReset={() => onChange?.('')}
      {...props}
    >
      <input
        className="btn btn-square"
        type="reset"
        value={resetLabel}
        aria-label="선택 해제"
      />

      {options.map((option) => (
        <input
          key={option.value}
          className="btn"
          type="radio"
          name={groupName}
          aria-label={option.label}
          checked={isControlled ? value === option.value : undefined}
          defaultChecked={isControlled ? undefined : defaultValue === option.value}
          onChange={() => onChange?.(option.value)}
        />
      ))}
    </form>
  );
});

Filter.displayName = 'Filter';

export default Filter;
