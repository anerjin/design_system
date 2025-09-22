import React, { forwardRef } from 'react';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * 라디오 버튼 크기
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * 라디오 버튼 변형 스타일
   */
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'dark';

  /**
   * 라디오 버튼 레이블
   */
  label?: React.ReactNode;

  /**
   * 설명 텍스트
   */
  description?: React.ReactNode;

  /**
   * 라디오 버튼 변경 이벤트
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface RadioGroupProps {
  /**
   * 그룹 이름 (name 속성)
   */
  name: string;

  /**
   * 그룹 레이블
   */
  label?: React.ReactNode;

  /**
   * 인라인 배치
   * @default false
   */
  inline?: boolean;

  /**
   * 선택된 값
   */
  value?: string;

  /**
   * 값 변경 이벤트
   */
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * 자식 요소
   */
  children: React.ReactNode;

  /**
   * 추가 CSS 클래스
   */
  className?: string;

  /**
   * 필수 선택
   */
  required?: boolean;

  /**
   * 비활성화
   */
  disabled?: boolean;
}

/**
 * BRICKS 디자인 시스템 Radio 컴포넌트
 *
 * @example
 * ```tsx
 * <Radio
 *   name="gender"
 *   value="male"
 *   label="남성"
 *   checked={gender === 'male'}
 *   onChange={(e) => setGender(e.target.value)}
 * />
 * ```
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(({
  size = 'md',
  variant,
  label,
  description,
  className,
  id,
  disabled,
  onChange,
  ...props
}, ref) => {
  const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;
  const descriptionId = description ? `${radioId}-description` : undefined;

  const containerClasses = [
    'radio',
    size !== 'md' ? `radio--${size}` : '',
    variant ? `radio--${variant}` : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <label className={containerClasses}>
      <input
        ref={ref}
        type="radio"
        id={radioId}
        className="radio__input"
        disabled={disabled}
        onChange={onChange}
        aria-describedby={descriptionId}
        {...props}
      />
      <div className="radio__circle">
        <div className="radio__dot"></div>
      </div>
      {label && (
        <span className="radio__label">
          {label}
          {description && (
            <span
              id={descriptionId}
              className="radio__description"
            >
              {description}
            </span>
          )}
        </span>
      )}
    </label>
  );
});

Radio.displayName = 'Radio';

/**
 * BRICKS 디자인 시스템 RadioGroup 컴포넌트
 *
 * @example
 * ```tsx
 * <RadioGroup
 *   name="theme"
 *   label="테마 선택"
 *   value={theme}
 *   onChange={(value) => setTheme(value)}
 * >
 *   <Radio value="light" label="라이트 모드" />
 *   <Radio value="dark" label="다크 모드" />
 *   <Radio value="auto" label="시스템 설정" />
 * </RadioGroup>
 * ```
 */
export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  label,
  inline = false,
  value,
  onChange,
  children,
  className,
  required = false,
  disabled = false
}) => {
  const groupClasses = [
    'radio-group',
    inline ? 'radio-group--inline' : '',
    className
  ].filter(Boolean).join(' ');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value, event);
    }
  };

  // children을 순회하면서 props 추가
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement<RadioProps>(child) && child.type === Radio) {
      return React.cloneElement(child, {
        name,
        checked: child.props.value === value,
        onChange: handleChange,
        disabled: disabled || child.props.disabled,
        ...child.props
      });
    }
    return child;
  });

  return (
    <fieldset className={groupClasses}>
      {label && (
        <legend className="radio-group__label">
          {label}
          {required && <span className="required-mark">*</span>}
        </legend>
      )}
      {enhancedChildren}
    </fieldset>
  );
};

RadioGroup.displayName = 'RadioGroup';

export default Radio;