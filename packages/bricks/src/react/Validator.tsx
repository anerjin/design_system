import React, { forwardRef } from 'react';
import { cx } from './utils';

export interface ValidatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 검증에 실패했을 때 보여줄 안내.
   * 브라우저 기본 검증(`required`, `type="email"`, `pattern` 등)이 통과하면 숨겨진다.
   */
  hint?: React.ReactNode;

  /**
   * 안내 문구가 들어갈 자리를 미리 비워 둬 레이아웃이 흔들리지 않게 한다.
   *
   * daisyUI의 `validator-hint`는 기본이 `visibility: hidden`이라 자리를 차지한다.
   * 끄면 `hidden`을 붙여 자리까지 없애고, 오류일 때만 나타나게 한다.
   *
   * @default true
   */
  reserveSpace?: boolean;

  /** `validator` 클래스를 붙일 입력 요소 */
  children: React.ReactNode;
}

/**
 * DOI INC Validator — daisyUI `validator` 기반
 *
 * 브라우저 기본 폼 검증(HTML5)에 기대는 컴포넌트다. 별도 상태가 없다.
 * **안쪽 입력에 `className="validator"`를 붙여야** 동작한다.
 *
 * @example
 * ```tsx
 * <Validator hint="올바른 이메일을 입력하세요">
 *   <Input className="validator" type="email" required placeholder="me@example.com" />
 * </Validator>
 * ```
 */
export const Validator = forwardRef<HTMLDivElement, ValidatorProps>(({
  hint,
  reserveSpace = true,
  className,
  children,
  ...props
}, ref) => (
  <div ref={ref} className={cx('w-full', className)} {...props}>
    {children}
    {hint && (
      <p className={cx('validator-hint', !reserveSpace && 'hidden')}>{hint}</p>
    )}
  </div>
));

Validator.displayName = 'Validator';

export default Validator;
