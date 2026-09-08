import React, { forwardRef } from 'react';
import { cx, type Color } from './utils';

export type StepsDirection = 'horizontal' | 'vertical';

const COLOR: Record<Color, string> = {
  neutral: 'step-neutral',
  primary: 'step-primary',
  secondary: 'step-secondary',
  accent: 'step-accent',
  info: 'step-info',
  success: 'step-success',
  warning: 'step-warning',
  error: 'step-error',
};

const DIRECTION: Record<StepsDirection, string> = {
  horizontal: 'steps-horizontal',
  vertical: 'steps-vertical',
};

export interface StepItem {
  /** 단계 라벨 */
  label: React.ReactNode;

  /**
   * 원 안에 표시할 내용. 생략하면 순번이 들어간다.
   * Lucide 아이콘이나 짧은 문자열을 넣을 수 있다.
   */
  content?: React.ReactNode;
}

export interface StepsProps extends React.HTMLAttributes<HTMLUListElement> {
  /** 단계 목록. 문자열만 주면 라벨로 쓰인다 */
  steps: (string | StepItem)[];

  /**
   * 현재 단계 (0부터 시작). 이 단계까지 완료 색이 칠해진다.
   * @default 0
   */
  currentStep?: number;

  /**
   * 완료된 단계의 색상
   * @default 'primary'
   */
  color?: Color;

  /**
   * 배치 방향
   * @default 'horizontal'
   */
  direction?: StepsDirection;
}

/**
 * DOI INC Steps — daisyUI `steps` 기반
 *
 * 이전 `MultiStepProgress`를 대체한다.
 *
 * @example
 * ```tsx
 * <Steps currentStep={1} steps={['장바구니', '배송지', '결제', '완료']} />
 * ```
 */
export const Steps = forwardRef<HTMLUListElement, StepsProps>(
  ({ steps, currentStep = 0, color = 'primary', direction = 'horizontal', className, ...props }, ref) => (
    <ul ref={ref} className={cx('steps', DIRECTION[direction], className)} {...props}>
      {steps.map((step, index) => {
        const item: StepItem = typeof step === 'string' ? { label: step } : step;

        return (
          <li
            key={index}
            className={cx('step', index <= currentStep && COLOR[color])}
            data-content={typeof item.content === 'string' ? item.content : undefined}
            aria-current={index === currentStep ? 'step' : undefined}
          >
            {item.content != null && typeof item.content !== 'string' && (
              <span className="step-icon">{item.content}</span>
            )}
            {item.label}
          </li>
        );
      })}
    </ul>
  ),
);

Steps.displayName = 'Steps';

export default Steps;
