import React, { createContext, forwardRef, useContext } from 'react';
import { cx, type Color, type Size } from './utils';

const COLOR: Record<Color, string> = {
  neutral: 'radio-neutral',
  primary: 'radio-primary',
  secondary: 'radio-secondary',
  accent: 'radio-accent',
  info: 'radio-info',
  success: 'radio-success',
  warning: 'radio-warning',
  error: 'radio-error',
};

const SIZE: Record<Size, string> = {
  xs: 'radio-xs',
  sm: 'radio-sm',
  md: 'radio-md',
  lg: 'radio-lg',
  xl: 'radio-xl',
};

interface RadioGroupContextValue {
  name?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * RadioGroup이 자식 Radio에 name/선택값을 내려주는 통로.
 *
 * 이전 구현은 `cloneElement`로 주입하면서 `...child.props`를 나중에 펼쳐
 * 주입한 값이 도로 덮이는 문제가 있었다. 컨텍스트로 바꿔 그 문제를 없앴다.
 */
const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
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
}

/**
 * DOI INC Radio — daisyUI `radio` 기반
 *
 * @example
 * ```tsx
 * <Radio name="plan" value="basic" label="베이직" />
 * ```
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(({
  color,
  size = 'md',
  label,
  description,
  className,
  name,
  checked,
  onChange,
  value,
  ...props
}, ref) => {
  const group = useContext(RadioGroupContext);

  const resolvedName = name ?? group?.name;
  const resolvedChecked = checked
    ?? (group && group.value !== undefined ? group.value === value : undefined);

  const input = (
    <input
      ref={ref}
      type="radio"
      className={cx('radio', color && COLOR[color], SIZE[size], className)}
      name={resolvedName}
      value={value}
      checked={resolvedChecked}
      onChange={onChange ?? group?.onChange}
      {...props}
    />
  );

  if (!label) return input;

  return (
    <label className="label cursor-pointer items-start justify-start gap-3">
      {input}
      <span className="flex flex-col items-start">
        <span>{label}</span>
        {description && <span className="text-xs opacity-60">{description}</span>}
      </span>
    </label>
  );
});

Radio.displayName = 'Radio';

export interface RadioGroupProps extends Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
  /** 그룹 제목 */
  label?: React.ReactNode;

  /** 자식 Radio가 공유할 name */
  name?: string;

  /** 선택된 값 (제어 컴포넌트) */
  value?: string;

  /** 선택 변경 이벤트 */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

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
 * DOI INC RadioGroup — daisyUI `fieldset` 기반
 *
 * @example
 * ```tsx
 * <RadioGroup label="요금제" name="plan" value={plan} onChange={(e) => setPlan(e.target.value)}>
 *   <Radio value="basic" label="베이직" />
 *   <Radio value="pro" label="프로" />
 * </RadioGroup>
 * ```
 */
export const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(({
  label,
  name,
  value,
  onChange,
  inline = false,
  error,
  required = false,
  className,
  children,
  ...props
}, ref) => (
  <RadioGroupContext.Provider value={{ name, value, onChange }}>
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
  </RadioGroupContext.Provider>
));

RadioGroup.displayName = 'RadioGroup';

export default Radio;
