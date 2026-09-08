import React, { forwardRef } from 'react';
import { cx } from './utils';

export interface FieldsetProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  /** 묶음 제목 */
  legend?: React.ReactNode;

  /** 아래쪽 보조 설명 */
  hint?: React.ReactNode;

  /**
   * 테두리와 배경을 준다
   * @default false
   */
  bordered?: boolean;

  children: React.ReactNode;
}

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * 필수 표시(*)를 붙인다
   * @default false
   */
  required?: boolean;

  children: React.ReactNode;
}

export interface FloatingLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** 떠오르는 라벨 글자 */
  label: React.ReactNode;

  /** 감쌀 입력 요소 */
  children: React.ReactNode;
}

/**
 * DOI INC Fieldset — daisyUI `fieldset` 기반
 *
 * 라벨 + 입력 + 설명을 한 묶음으로 감싼다.
 * daisyUI에서 폼 필드에 라벨을 붙이는 표준 방식이다.
 *
 * @example
 * ```tsx
 * <Fieldset legend="계정" bordered>
 *   <Label htmlFor="account-email" required>이메일</Label>
 *   <Input id="account-email" type="email" required aria-describedby="email-hint" />
 *   <Fieldset.Hint id="email-hint">로그인에 사용됩니다</Fieldset.Hint>
 * </Fieldset>
 * ```
 */
const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
  ({ legend, hint, bordered = false, className, children, ...props }, ref) => (
    <fieldset
      ref={ref}
      className={cx('fieldset bricks-fieldset', bordered && 'bricks-fieldset-bordered', className)}
      {...props}
    >
      {legend && <legend className="fieldset-legend">{legend}</legend>}
      <div className="fieldset-content">
        {children}
        {hint && <p className="fieldset-label">{hint}</p>}
      </div>
    </fieldset>
  ),
);

Fieldset.displayName = 'Fieldset';

/** Fieldset.Hint — 입력 아래 보조 설명 */
export const FieldsetHint = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => (
    <p ref={ref} className={cx('fieldset-label', className)} {...props}>
      {children}
    </p>
  ),
);

FieldsetHint.displayName = 'FieldsetHint';

/**
 * DOI INC Label — daisyUI `label` 기반
 *
 * @example
 * ```tsx
 * <Label htmlFor="email" required>이메일</Label>
 * ```
 */
export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ required = false, className, children, ...props }, ref) => (
    <label ref={ref} className={cx('label', className)} {...props}>
      {children}
      {required && (
        <span className="text-error" aria-hidden="true">
          *
        </span>
      )}
    </label>
  ),
);

Label.displayName = 'Label';

/**
 * DOI INC FloatingLabel — daisyUI `floating-label` 기반
 *
 * 값이 입력되면 라벨이 입력칸 위로 떠오른다.
 * 안쪽 입력에는 `placeholder`가 있어야 동작한다.
 *
 * @example
 * ```tsx
 * <FloatingLabel label="이름">
 *   <Input placeholder="이름" />
 * </FloatingLabel>
 * ```
 */
export const FloatingLabel = forwardRef<HTMLLabelElement, FloatingLabelProps>(
  ({ label, className, children, ...props }, ref) => (
    <label ref={ref} className={cx('floating-label', className)} {...props}>
      <span>{label}</span>
      {children}
    </label>
  ),
);

FloatingLabel.displayName = 'FloatingLabel';

export interface FieldsetComponent extends React.ForwardRefExoticComponent<
  FieldsetProps & React.RefAttributes<HTMLFieldSetElement>
> {
  Hint: typeof FieldsetHint;
}

const FieldsetWithSubcomponents = Fieldset as FieldsetComponent;
FieldsetWithSubcomponents.Hint = FieldsetHint;

export { FieldsetWithSubcomponents as Fieldset };
export default FieldsetWithSubcomponents;
