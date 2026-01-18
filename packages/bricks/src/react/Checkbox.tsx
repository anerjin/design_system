import React, { forwardRef, useEffect, useRef } from 'react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * 체크박스 크기
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * 체크박스 변형 스타일
   */
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'dark';

  /**
   * 체크박스 레이블
   */
  label?: React.ReactNode;

  /**
   * 설명 텍스트
   */
  description?: React.ReactNode;

  /**
   * 불확정 상태 (indeterminate)
   */
  indeterminate?: boolean;

  /**
   * 체크박스 변경 이벤트
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface CheckboxGroupProps {
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
   * 에러 상태
   */
  error?: boolean;

  /**
   * 에러 메시지
   */
  errorMessage?: React.ReactNode;

  /**
   * 필수 선택
   */
  required?: boolean;

  /**
   * 자식 요소
   */
  children: React.ReactNode;

  /**
   * 추가 CSS 클래스
   */
  className?: string;
}

/**
 * BRICKS 디자인 시스템 Checkbox 컴포넌트
 *
 * @example
 * ```tsx
 * <Checkbox
 *   label="동의합니다"
 *   description="개인정보 처리방침에 동의합니다"
 *   checked={agreed}
 *   onChange={(e) => setAgreed(e.target.checked)}
 * />
 * ```
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  size = 'md',
  variant,
  label,
  description,
  indeterminate = false,
  className,
  id,
  disabled,
  onChange,
  ...props
}, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const finalRef = (ref as React.RefObject<HTMLInputElement>) || inputRef;

  // indeterminate 상태 설정
  useEffect(() => {
    if (finalRef.current) {
      finalRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate, finalRef]);

  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  const descriptionId = description ? `${checkboxId}-description` : undefined;

  const containerClasses = [
    'checkbox',
    size !== 'md' ? `checkbox--${size}` : '',
    variant ? `checkbox--${variant}` : '',
    className
  ].filter(Boolean).join(' ');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // indeterminate 상태에서 변경 시 indeterminate 해제
    if (indeterminate && finalRef.current) {
      finalRef.current.indeterminate = false;
    }

    onChange?.(event);
  };

  return (
    <label className={containerClasses}>
      <input
        ref={finalRef}
        type="checkbox"
        id={checkboxId}
        className="checkbox__input"
        disabled={disabled}
        aria-describedby={descriptionId}
        onChange={handleChange}
        {...props}
      />
      <div className="checkbox__box">
        <div className="checkbox__checkmark"></div>
      </div>
      {label && (
        <span className="checkbox__label">
          {label}
          {description && (
            <span
              id={descriptionId}
              className="checkbox__description"
            >
              {description}
            </span>
          )}
        </span>
      )}
    </label>
  );
});

Checkbox.displayName = 'Checkbox';

/**
 * BRICKS 디자인 시스템 CheckboxGroup 컴포넌트
 *
 * @example
 * ```tsx
 * <CheckboxGroup
 *   label="관심 분야"
 *   error={hasError}
 *   errorMessage="최소 1개 이상 선택해주세요"
 * >
 *   <Checkbox label="프론트엔드" value="frontend" />
 *   <Checkbox label="백엔드" value="backend" />
 *   <Checkbox label="디자인" value="design" />
 * </CheckboxGroup>
 * ```
 */
export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  inline = false,
  error = false,
  errorMessage,
  required = false,
  children,
  className
}) => {
  const groupClasses = [
    'checkbox-group',
    inline ? 'checkbox-group--inline' : '',
    error ? 'checkbox-group--error' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <fieldset className={groupClasses} data-required={required || undefined}>
      {label && (
        <legend className="checkbox-group__label">
          {label}
          {required && <span className="required-mark">*</span>}
        </legend>
      )}
      {children}
      {error && errorMessage && (
        <div className="checkbox-group__error" role="alert">
          {errorMessage}
        </div>
      )}
    </fieldset>
  );
};

CheckboxGroup.displayName = 'CheckboxGroup';

export default Checkbox;